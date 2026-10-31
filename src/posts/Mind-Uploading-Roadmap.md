---
title: Mind Uploading Roadmap
date: '2026-10-29'
---
# Lộ trình nghiên cứu Mind Uploading đến năm 2050

**Phiên bản:** 3.5  
**Ngày cập nhật:** 30/10/2026  
**Trạng thái tài liệu:** Lộ trình nghiên cứu định hướng

---

## 1. Tóm tắt điều hành

### 1.1 Mục tiêu đến năm 2050

Thành lập và thực thi một lộ trình có thể kiểm tra định lượng theo từng cổng quyết định, hướng tới việc **đưa Whole Brain Emulation (WBE) của con người thành một dịch vụ thương mại được quản lý, có thể tái lập và có ranh giới tuyên bố minh bạch trước năm 2050**. Mục tiêu chỉ đạt khi thỏa mãn đồng thời 3 điều kiện:

1. **Khoa học:** Mô hình tái dựng từ dữ liệu thần kinh cá nhân vượt qua bài kiểm tra cấu trúc, động lực, hành vi và khả năng dự đoán ngoài mẫu (out-of-sample); làm tốt hơn hẳn các mô hình AI chỉ học dựa trên tương quan dữ liệu hành vi.
2. **Kỹ thuật và Vận hành:** Quy trình bảo quản, quét, phân đoạn, phục hồi mô hình, mô phỏng và kiểm thử có thể lặp lại với chi phí, độ tin cậy, thời gian và năng lượng tiêu thụ được công bố rõ ràng.
3. **Đạo đức và Pháp lý:** Được sự đồng thuận tự nguyện hợp lệ của chủ thể, có cơ chế giám sát độc lập, bảo vệ dữ liệu thần kinh tuyệt đối, có quy định về quyền của bản sao/mô phỏng và quy trình kiểm soát nguy cơ trải nghiệm.

### 1.2 Quan điểm lập kế hoạch

- Không suy diễn rằng việc tăng số lượng neuron theo cấp số nhân sẽ tự động tạo ra bản sao tâm trí hoàn chỉnh.
- Ưu tiên ghép nối dữ liệu **cấu trúc + hoạt động + phân tử + hành vi** thay vì chỉ tối ưu dung lượng ảnh hay sức mạnh tính toán thô.
- Phân định rõ 5 cấp độ sản phẩm (L0 đến L4) để tránh truyền thông gây hiểu nhầm.
- Phát triển các sản phẩm trung gian có giá trị thương mại trong y học, dược phẩm và nghiên cứu thần kinh để duy trì nguồn lực; không lấy doanh thu này làm bằng chứng thành công của WBE.
- Áp dụng cơ chế cổng quyết định Go/No-Go độc lập với tiêu chí đăng ký trước (pre-registered benchmarks).

### 1.3 Tóm tắt các giai đoạn

| Giai đoạn | Đích nghiên cứu | Đích ứng dụng/thương mại | Rủi ro chủ đạo |
|---|---|---|---|
| **2026–2030** | Benchmark mở; mô hình mạch thần kinh sinh vật nhỏ; tiêu chuẩn ghép cấu trúc–chức năng | Công cụ phân tích connectome, phần mềm phân đoạn AI, quản lý dữ liệu thần kinh | Mô hình chỉ khớp dữ liệu huấn luyện, không dự đoán được chức năng |
| **2031–2035** | Tái dựng mạch thần kinh quy mô động vật có vú; tự động hóa quy trình phân đoạn | Phần mềm/phần cứng nghiên cứu; mô hình vùng nổi bật phục vụ sàng lọc dược phẩm | Quét và suy luận chức năng synapse không mở rộng tương ứng với quy mô mô |
| **2036–2040** | Mô phỏng toàn não động vật có vú; mở rộng bộ dữ liệu vùng não người | Nền tảng mô phỏng bệnh lý, thử thuốc và digital twin thần kinh có giới hạn | Nhầm lẫn mô hình chức năng vùng não với mô phỏng toàn bộ tâm trí |
| **2041–2045** | Tái dựng vùng não người quy mô lớn; kiểm tra đa cá thể; chuẩn hóa bảo quản | Ứng dụng y sinh được thẩm định; dịch vụ lưu trữ/phân tích dữ liệu thần kinh chuyên sâu | Mẫu dữ liệu người không đại diện; vi phạm đồng thuận hoặc quyền riêng tư |
| **2046–2050** | Chỉ tiến tới WBE cá nhân khi qua toàn bộ cổng kiểm duyệt khoa học và pháp lý | Dịch vụ WBE cá nhân được quản lý, có ranh giới tuyên bố minh bạch | Không khả thi về mặt khoa học; không thể xác nhận tính liên tục của bản ngã |

---

## 2. Định nghĩa và ranh giới mục tiêu

### 2.1 Mind Uploading và Whole Brain Emulation

**Mind Uploading** là ý tưởng chuyển thông tin tâm trí sang nền tảng nhân tạo. Thuật ngữ kỹ thuật cốt lõi trong tài liệu này là **Whole Brain Emulation (WBE)**: quy trình đo đạc hệ thần kinh, tái dựng mô hình tính toán chi tiết và thực thi mô hình đó trên phần cứng chuyên dụng.

Quy trình WBE tiêu chuẩn gồm 7 bước:

1. **Thu nhận/Bảo quản:** Giữ lại thông tin cấu trúc và trạng thái sinh học. 
2. **Chụp & Tái dựng:** Thu thập dữ liệu hình ảnh, phân đoạn tế bào, sợi trục, dendrite và synapse.
3. **Suy ra trạng thái:** Ước lượng loại tế bào, đặc tính synapse, chất dẫn truyền và cơ chế dẻo thần kinh.
4. **Lập mô hình:** Xây dựng mô hình động lực học thần kinh, glia và tương tác sinh học.
5. **Thực thi:** Chạy mô hình trên phần cứng với độ trễ và mức năng lượng tối ưu.
6. **Kiểm chứng:** So sánh phản ứng của mô hình với dữ liệu thực nghiệm độc lập.
7. **Vận hành có trách nhiệm:** Đảm bảo an ninh dữ liệu, quản lý phiên bản và quản trị rủi ro đạo đức.

### 2.2 Phân cấp sản phẩm (L0 - L4)

| Cấp | Tên gọi | Chứng minh được điều gì? | Không chứng minh được điều gì? |
|---|---|---|---|
| **L0** | Hồ sơ thần kinh / Mô não | Dữ liệu mô học/thần kinh đã thu thập và lưu trữ | Không phải là mô phỏng hay thực thi hoạt động |
| **L1** | Connectome | Bản đồ sơ đồ kết nối giữa các neuron | Không tự chứng minh độ mạnh synapse, động lực hay ý thức |
| **L2** | Mô hình mạch thần kinh | Một mạch thần kinh dự đoán đúng phản ứng trong phạm vi hẹp | Không đồng nghĩa với việc tái tạo toàn bộ não hay cá tính |
| **L3** | Digital Twin / AI cá nhân | Mô hình dự đoán một số thói quen, biểu cảm hay hành vi cá nhân | Có thể chỉ học tương quan bề mặt; không phải WBE cơ chế |
| **L4** | WBE cá nhân | Mô hình toàn não được tái dựng và kiểm chứng đa miền từ dữ liệu một người | Chưa tự động chứng minh bản sao có ý thức hay sự liên tục của bản ngã |

**Quy tắc:** Chỉ gọi một sản phẩm là "WBE/Mind Uploading" khi đạt cấp độ **L4** và công bố đầy đủ giới hạn.

---

## 3. Điểm xuất phát khoa học và nút thắt cốt lõi

### 3.1 Nền tảng khoa học hiện có

- **Sinh vật nhỏ (*C. elegans*, Ruồi giấm):** Đã lập bản đồ connectome hoàn chỉnh. Mô hình tính toán bước đầu đưa ra được các dự đoán về mạch cảm giác–vận động nhưng chưa giải quyết triệt để mọi cơ chế dẻo thần kinh và điều biến.
- **Mô hình vỏ não động vật có vú (Chuột - MICrONS):** Ghép nối thành công dữ liệu hoạt động của hàng chục nghìn neuron với ảnh EM trong thể tích cỡ $1\text{ mm}^3$.
- **Mô não người:** Đã tái dựng siêu cấu trúc một phần mẫu vỏ não thái dương ($1\text{ mm}^3$, tạo ra $\sim 1.4\text{ PB}$ dữ liệu thô).

### 3.2 Các nút thắt kỹ thuật chính

1. **Thông lượng quét & Dung lượng:** Việc mở rộng từ $1\text{ mm}^3$ lên toàn bộ thể tích não người ($\sim 1.2 - 1.4 \times 10^6\text{ mm}^3$) có thể tạo ra dữ liệu thô ở cấp độ Zettabyte.
2. **Sai số phân đoạn AI:** Lỗi phân đoạn nhỏ khi tích lũy trên hàng tỷ neuron có thể làm sai lệch hoàn toàn tính chất mạng lưới.
3. **Suy luận chức năng Synapse:** Hình thái siêu cấu trúc chưa cho biết đầy đủ trọng số, độ mạnh và trạng thái động lực của synapse.
4. **Mức chi tiết sinh học tối thiểu:** Chưa xác định được cần mô phỏng sâu đến cấp độ phân tử, kênh ion, hay chỉ dừng ở cấp độ neuron/glia.
5. **Bảo quản mô không tổn thất:** Chưa có phương pháp bảo quản đảo ngược hoàn toàn chứng minh giữ nguyên 100% thông tin chức năng cho não người.
6. **Thách thức kiểm chứng:** Thiếu các công cụ kiểm tra tính liên tục của trải nghiệm chủ quan và ý thức.

---

## 4. Định nghĩa "Hoàn thiện thương mại đến 2050"

Một dịch vụ WBE cá nhân chỉ được xem là **thương mại hóa hoàn thiện** khi đáp ứng 8 tiêu chí:

1. Quy trình thu nhận dữ liệu có chỉ số mất mát dữ liệu được công bố rõ.
2. Quy trình tái dựng có thể lặp lại độc lập bởi bên thứ ba.
3. Vượt qua bộ kiểm thử ngoài mẫu được đăng ký trước.
4. Công bố hồ sơ giới hạn chức năng minh bạch.
5. Mô hình chi phí, năng lượng và vận hành được kiểm toán công khai.
6. Khung pháp lý về đồng thuận, quản lý phiên bản và quyền chủ thể đầy đủ.
7. Có cơ chế giám sát và dừng an toàn nếu phát hiện nguy cơ mô hình chịu khổ/có trải nghiệm ngoài kiểm soát.
8. Không tiếp thị gây hiểu nhầm (không cam kết "bất tử" hay "đã chứng minh ý thức").

---

## 5. Lộ trình công nghệ 2026–2050

```
2026 ------------------ 2030 ------------------ 2035 ------------------ 2040 ------------------ 2045 ------------------ 2050
  | Giai đoạn I: G1       | Giai đoạn II: G2-G3   | Giai đoạn III: G4     | Giai đoạn IV: G5      | Giai đoạn V: G6-G7    |
  | Vòng lặp Cấu trúc     | Hệ thần kinh          | Mô phỏng động vật    | Tái dựng vùng        | Thử nghiệm WBE        |
  | -> Chức năng          | động vật có vú        | có vú & Mô người     | não người lớn        | thương mại hạn chế    |
```

### Giai đoạn I (2026–2030): Vòng lặp Cấu trúc → Chức năng
- **Mục tiêu:** Xây dựng benchmark chuẩn hóa; phân đoạn AI có độ tin cậy cao; kiểm chứng khả năng dự đoán chức năng từ cấu trúc trên sinh vật nhỏ.
- **Cổng G1 (2029):** Đánh giá xem dữ liệu cấu trúc có cải thiện rõ rệt khả năng dự đoán hoạt động ngoài mẫu so với các mô hình thống kê baseline hay không.

### Giai đoạn II (2031–2035): Mở rộng sang Động vật có vú
- **Mục tiêu:** Tích hợp dữ liệu đa tầng (cấu trúc, hoạt động, biểu hiện phân tử) ở chuột; tự động hóa quy trình phân đoạn và đo đạc.
- **Cổng G2 (2032) & G3 (2035):** Xác nhận việc giảm chi phí/thời gian quét mà không làm suy giảm độ chính xác và độ tin cậy của mô hình.

### Giai đoạn III (2036–2040): Mô phỏng quy mô lớn & Dữ liệu người
- **Mục tiêu:** Mô phỏng các hệ thần kinh lớn ở động vật có vú; đánh giá tác động của chất điều biến và tính dẻo; chuẩn hóa bảo quản mô não người phẫu thuật/tử thi.
- **Cổng G4 (2040):** Đánh giá mức độ trung thực của mô hình động vật có vú trên các bài kiểm tra can thiệp phức tạp trước khi chuyển sang mô hình người.

### Giai đoạn IV (2041–2045): Mô hình Vùng não người & Chuẩn bị Quản trị
- **Mục tiêu:** Tái dựng nhiều vùng não người tích hợp; so sánh biến thiên đa cá thể; hoàn thiện mô hình quản trị an ninh, đồng thuận và bảo vệ dữ liệu.
- **Cổng G5 (2045):** Phê duyệt nền tảng khoa học và khung pháp lý trước khi tiến hành thử nghiệm WBE người toàn phần.

### Giai đoạn V (2046–2050): Tích hợp WBE & Triển khai có điều kiện
- **Mục tiêu:** Tích hợp pipeline đầu-cuối cho WBE cá nhân; thử nghiệm trong môi trường kiểm soát; kiểm toán toàn diện.
- **Cổng G6 (2047) & G7 (2049):** Kiểm tra độ trung thực chức năng đa miền và cấp phép thương mại hóa có hạn chế.

---

## 6. Bảng ra quyết định

| Cổng | Năm | Tăng tốc (Go) khi | Đổi hướng / Dừng (No-Go) khi |
|---|---|---|---|
| **G1** | 2029 | Dữ liệu cấu trúc giúp dự đoán chức năng vượt trội mô hình baseline | Mô hình cấu trúc không mang lại giá trị dự đoán bổ sung |
| **G2** | 2032 | Tự động hóa giúp giảm chi phí và tỷ lệ lỗi phân đoạn đạt chuẩn | Lỗi phân đoạn tích lũy không thể kiểm soát tự động |
| **G3** | 2035 | Thông lượng quét tăng mà vẫn giữ nguyên chất lượng mô | Độ suy giảm chất lượng dữ liệu vượt ngưỡng cho phép |
| **G4** | 2040 | Mô hình động vật có vú dự đoán chính xác phản ứng can thiệp ngoài mẫu | Mô hình thất bại trên các bài kiểm tra can thiệp dẻo thần kinh |
| **G5** | 2045 | Khung đạo đức, đồng thuận và dữ liệu người sẵn sàng | Chưa có giải pháp pháp lý/đạo đức cho rủi ro trải nghiệm |
| **G6** | 2047 | Mô hình WBE cá nhân vượt qua các benchmark kiểm thử đa miền | Mô hình chỉ bắt chước hành vi bề mặt, thất bại ở cơ chế sâu |
| **G7** | 2049 | Đạt toàn bộ kiểm toán an ninh, vận hành, tài chính và quyền lợi chủ thể | Rủi ro pháp lý, rò rỉ dữ liệu hoặc an toàn chưa giải quyết |

---

## 7. Các dòng công việc song song (W1 – W10)

1. **W1 (Bảo quản mô):** Phát triển các kỹ thuật cố định và bảo quản lạnh không làm mất thông tin synapse.
2. **W2 (Quét & Tạo dữ liệu):** Mở rộng thông lượng EM đa chùm, X-ray nano-CT.
3. **W3 (Phân đoạn AI):** Tối ưu hóa các mô hình thị giác máy tính nhận dạng cấu trúc thần kinh.
4. **W4 (Suy luận Synapse):** Kết hợp dữ liệu sinh lý và phân tử để suy ra trọng số kết nối.
5. **W5 (Sinh học Đa tầng):** Tích hợp vai trò của glia, kênh ion và chất điều biến thần kinh.
6. **W6 (Mô phỏng & Phần cứng):** Phát triển phần cứng Neuromorphic và hạ tầng tính toán năng lượng thấp.
7. **W7 (Kiểm chứng & Benchmark):** Xây dựng các bộ bài kiểm tra holdout độc lập.
8. **W8 (Đạo đức & Pháp lý):** Thiết lập chính sách đồng thuận, quyền cá nhân và quản trị rủi ro trải nghiệm.
9. **W9 (An ninh Dữ liệu):** Mã hóa neurodata, phân quyền và chống tái nhận dạng trái phép.
10. **W10 (Thương mại hóa):** Xây dựng mô hình kinh doanh cho các sản phẩm trung gian (L1–L3).

---

## 8. Đạo đức, Pháp lý và Quyền chủ thể

- **Đồng thuận tự nguyện & Quyền rút lui:** Chủ thể có quyền quy định phạm vi sử dụng dữ liệu thần kinh và giới hạn hoạt động của mô phỏng.
- **Quyền riêng tư Neurodata:** Dữ liệu thần kinh được xếp vào loại dữ liệu sinh học nhạy cảm nhất, cấm sử dụng để phân biệt đối xử trong lao động, bảo hiểm hay tín dụng.
- **Giám sát Nguy cơ Trải nghiệm (Sentience Risk):** Nếu mô hình WBE thể hiện các dấu hiệu cho thấy có khả năng nhận thức hoặc chịu khổ, cần lập tức kích hoạt quy trình giám sát độc lập và sẵn sàng phương án dừng an toàn.
- **Minh bạch Truyền thông:** Nghiêm cấm việc tiếp thị WBE như một giải pháp "bất tử tử thi" hay cam kết chuyển giao ý thức khi chưa có căn cứ khoa học xác định.

---

## 9. Quản trị Chương trình & Báo cáo

- **Báo cáo Thường niên:** Công bố công khai chỉ số tiến độ, các phép thử thất bại, chi phí tài nguyên và các cập nhật cổng Go/No-Go.
- **Hội đồng Kiểm toán Độc lập:** Bao gồm các nhà khoa học thần kinh, chuyên gia AI, nhà đạo đức học, luật sư và đại diện công chúng không có xung đột lợi ích tài chính với dự án.
- **Quy tắc Dừng:** Sẵn sàng đóng cửa hoặc chuyển hướng nhánh nghiên cứu nếu chi phí/rủi ro vượt quá lợi ích khoa học thu được.

---
