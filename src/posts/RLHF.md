---
title: RLHF
created_at: '2026-11-23'
updated_at: '2026-11-23'
---
## 1. Tổng quan về RLHF

**Reinforcement Learning from Human Feedback (RLHF)** là phương pháp căn chỉnh (alignment) hành vi mô hình AI bằng cách dùng **sở thích so sánh** của con người làm tín hiệu huấn luyện thay vì chỉ dựa vào nhãn cố định hay quy tắc cứng.

* **Bản chất:** Khi đánh giá câu trả lời mở (đối thoại, giải thích, lập luận, độ an toàn), thường không có đáp án duy nhất tối ưu. RLHF học khuynh hướng ưu tiên từ các cặp so sánh $y_w \succ y_l$ (câu trả lời thắng so với câu trả lời thua cho cùng prompt $x$).
* **Cột mốc phát triển:** Từ học phần thưởng dựa trên so sánh cặp (Christiano et al., 2017) đến **InstructGPT** (Ouyang et al., 2022), nơi mô hình 1,3B tham số được đánh giá tốt hơn GPT-3 175B về khả năng làm theo chỉ dẫn — cho thấy căn chỉnh hành vi quan trọng không kém quy mô tham số.
* **Vị trí trong pipeline:** **Pretraining** tạo năng lực ngôn ngữ/tri thức $\rightarrow$ **SFT** định hình cách làm theo chỉ dẫn từ ví dụ mẫu $\rightarrow$ **RLHF** điều chỉnh hành vi theo sở thích con người.

---

## 2. Quy trình hoạt động

Kiến trúc RLHF kinh điển (như ở InstructGPT) vận hành qua **3 giai đoạn** chính:

1. **Supervised Fine-Tuning (SFT):** Tinh chỉnh mô hình nền trên tập cặp `(prompt, câu trả lời mẫu)` bằng Cross-Entropy Loss để tạo mô hình nền tảng $\pi_{\text{ref}}$ biết tuân theo chỉ dẫn.
2. **Reward Model (RM) Training:** Sinh nhiều phản hồi cho cùng prompt, thu thập lựa chọn ưu tiên $D = \{(x, y_w, y_l)\}$ từ người đánh giá, rồi huấn luyện mô hình cho điểm vô hướng $r_\phi(x, y)$ dự đoán mức độ được ưa chuộng.
3. **Reinforcement Learning Optimization (thường dùng PPO):** Dùng $r_\phi(x, y)$ làm tín hiệu thưởng để cập nhật **Policy Model** $\pi_\theta$, đồng thời áp phạt KL divergence so với $\pi_{\text{ref}}$ nhằm giữ sự ổn định.

---

## 3. Chi tiết toán học & thuật toán

### Mô hình hóa sở thích & Hàm mất mát Reward Model

Dưới mô hình **Bradley–Terry**, xác suất người đánh giá chọn $y_w$ hơn $y_l$ trên prompt $x$ là:

$$P(y_w \succ y_l \mid x) = \sigma\left(r_\phi(x, y_w) - r_\phi(x, y_l)\right), \quad \sigma(z) = \frac{1}{1 + e^{-z}}$$

Reward Model được huấn luyện bằng **Pairwise Ranking Loss** (Negative Log-Likelihood):

$$\mathcal{L}_{RM}(\phi) = -\mathbb{E}_{(x, y_w, y_l) \sim D}\left[\log \sigma\left(r_\phi(x, y_w) - r_\phi(x, y_l)\right)\right]$$

### Mục tiêu tối ưu có ràng buộc KL

Để tránh việc $\pi_\theta$ lệch quá xa $\pi_{\text{ref}}$ hoặc khai thác lỗ hổng của RM, mục tiêu kết hợp phần thưởng kỳ vọng và phạt KL với hệ số $\beta$:

$$\max_{\theta}\; \mathbb{E}_{y \sim \pi_\theta(\cdot\vert{}x)}\left[r_\phi(x, y)\right] - \beta\, D_{KL}\left(\pi_\theta(\cdot\vert{}x) \,\Vert{}\, \pi_{\text{ref}}(\cdot\vert{}x)\right)$$

Trong sinh chuỗi token $y = (y_1, \dots, y_T)$, phạt KL theo từng bước thường được gộp cùng phần thưởng cuối chuỗi $r_\phi(x, y)$:

$$r_t^{KL} = -\beta \log \frac{\pi_\theta(y_t \mid x, y_{<t})}{\pi_{\text{ref}}(y_t \mid x, y_{<t})}, \quad R_T = r_\phi(x, y) + \sum_{t=1}^T r_t^{KL}$$

### Thuật toán PPO & Critic

Trong PPO, ở bước $t$, trạng thái là $s_t = (x, y_{<t})$ và hành động là $a_t = y_t$. Tỷ lệ xác suất chính sách mới so với chính sách lấy mẫu cũ là $\rho_t(\theta) = \frac{\pi_\theta(a_t\vert{}s_t)}{\pi_{\theta_{\text{old}}}(a_t\vert{}s_t)}$. Lợi thế $\hat{A}_t$ thường ước lượng qua **GAE** kết hợp **Value Model (Critic)** $V_\psi(s_t)$, và tham số $\theta$ được cập nhật qua hàm mục tiêu cắt xén:

$$L^{CLIP}(\theta) = \mathbb{E}_t\left[\min\left(\rho_t(\theta)\hat{A}_t,\; \operatorname{clip}(\rho_t(\theta), 1-\epsilon, 1+\epsilon)\hat{A}_t\right)\right]$$

*Lưu ý phân vai:* **PPO clipping** giới hạn bước cập nhật so với $\pi_{\theta_{\text{old}}}$, còn **KL penalty** kiềm chế độ lệch so với $\pi_{\text{ref}}$.

---

## 4. Ứng dụng trong LLM, hạn chế & hướng phát triển

* **Ứng dụng chính:** Tăng khả năng làm theo chỉ dẫn (*instruction following*), tính hữu ích (*helpfulness*), tính an toàn (*harmlessness*), chất lượng hội thoại đa lượt, và điều chỉnh hành vi cho tác vụ chuyên biệt (lập trình, tóm tắt, dịch thuật, giáo dục).
* **Hạn chế & thách thức:** Điểm RM chỉ là phép xấp xỉ sở thích chủ quan (không đồng nhất với chân lý khách quan hay ý kiến chuyên gia), dễ gặp **Reward Hacking** (định luật Goodhart khi tối ưu quá mức RM không hoàn hảo — Gao et al., 2023), **distribution shift** khi policy thay đổi, thiên kiến dữ liệu gắn nhãn, và chi phí/độ phức tạp cao của hệ thống đa mô hình (Actor, Critic, Reference, RM).
* **Hướng phát triển (DPO & RLAIF):**

| Tiêu chí | RLHF cổ điển (PPO) | DPO | RLAIF |
| --- | --- | --- | --- |
| **Nguồn tín hiệu** | Sở thích con người | Sở thích con người / dữ liệu ưu tiên | Phản hồi từ mô hình AI đánh giá |
| **Reward Model riêng & RL loop** | Có (RM + PPO) | Không (tối ưu trực tiếp trên cặp so sánh) | Có thể dùng RM hoặc preference optimization |
| **Độ phức tạp triển khai** | Cao, nhiều thành phần & nhạy siêu tham số | Gọn hơn, tránh vòng lặp RL phức tạp | Dễ mở rộng quy mô, giảm chi phí gắn nhãn |

*Tóm lại:* RLHF biến sở thích định tính thành tín hiệu tối ưu có ràng buộc ổn định, nhưng luôn cần đi kèm đánh giá độc lập (con người, benchmark, kiểm tra reward hacking) vì mô hình chỉ tối ưu hóa **phép xấp xỉ phần thưởng** chứ không tự hiểu đúng – sai.
