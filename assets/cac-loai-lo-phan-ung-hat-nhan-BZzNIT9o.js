var e=`---
title: Cac Loai Lo Phan Ung Hat Nhan
date: '2026-09-10'
---

Lò phản ứng phân hạch được phân loại chủ yếu dựa vào **năng lượng neutron** duy trì phản ứng dây chuyền: lò phản ứng nhiệt (neutron chậm) và lò phản ứng neutron nhanh.

## 1. Lò phản ứng nhiệt (phổ biến nhất)

Dùng **chất làm chậm** (moderator) để giảm tốc neutron, giúp phân hạch dễ xảy ra hơn nên chỉ cần làm giàu nhiên liệu thấp (2–5% U-235).

**Các loại chính:**

- **PWR (lò nước áp lực)** – Loại phổ biến nhất thế giới. Nước làm mát ở áp suất cao nên không sôi trong lò; nhiệt được truyền qua bộ sinh hơi sang vòng thứ cấp để quay turbine. Ban đầu phát triển cho tàu ngầm hạt nhân.
- **BWR (lò nước sôi)** – Phổ biến thứ hai. Nước sôi ngay trong lõi, hơi nước tạo ra trực tiếp quay turbine (không cần vòng thứ cấp riêng).
- **HWR/PHWR (lò nước nặng áp lực)** – Dùng D₂O làm chất làm mát/chất làm chậm. Hấp thụ neutron ít hơn nước thường nên có thể dùng uranium tự nhiên (không cần làm giàu), bù lại chi phí nước nặng đắt hơn. Điển hình: CANDU (Canada).
- **SCWR (lò nước siêu tới hạn)** – Vận hành trên điểm tới hạn nhiệt động của nước (~374°C, 22 MPa), nước không còn phân biệt pha lỏng/hơi. Hiệu suất nhiệt cao hơn, thiết kế đơn giản hơn, nhưng vẫn đang trong giai đoạn nghiên cứu (thế hệ IV).
- **GCR/AGR (lò làm mát bằng khí)** – Dùng CO₂ hoặc khí trơ làm mát, graphite làm chất làm chậm.
- **RBMK** – Chất làm chậm graphite, làm mát bằng nước nhẹ (loại lò Chernobyl).

## 2. Lò phản ứng neutron nhanh (Fast reactor)

Không dùng chất làm chậm, tận dụng neutron năng lượng cao để phân hạch, đòi hỏi nhiên liệu làm giàu cao (≥20%). Đắt và phức tạp hơn nhưng có hai ưu điểm lớn:

- **Lò tái sinh nhanh (Fast Breeder Reactor – FBR):** có thể "nhân giống" thêm nhiên liệu phân hạch (biến U-238 thành Pu-239), tận dụng nhiên liệu hiệu quả hơn nhiều.
- **Lò đốt nhanh (Fast burner):** dùng để "đốt" (giảm) chất thải hạt nhân tồn dư (actinide nặng), giảm khối lượng và thời gian tồn tại của chất thải phóng xạ.

Chất làm mát thường là **kim loại lỏng** (natri, chì, hoặc hợp kim chì-bismuth) thay vì nước, vì nước sẽ làm chậm neutron.

## Thế hệ lò phản ứng tiên tiến (Gen IV)

Ngoài phân loại theo neutron, còn có nhóm lò thế hệ mới đáng nhắc tới:
- **Lò muối nóng chảy (MSR)** – nhiên liệu hòa tan trong muối fluoride nóng chảy, an toàn thụ động cao, có thể dùng chu trình Thori.
- **Lò làm mát bằng khí nhiệt độ cao (HTGR/VHTR)** – dùng heli làm mát, nhiên liệu TRISO chịu nhiệt cực tốt.
- **SMR (lò phản ứng module nhỏ)** – không phải một công nghệ riêng mà là xu hướng thiết kế: công suất nhỏ (<300MW), chế tạo sẵn trong nhà máy, đang được nhiều nước phát triển (NuScale, Rolls-Royce SMR...).
`;export{e as default};