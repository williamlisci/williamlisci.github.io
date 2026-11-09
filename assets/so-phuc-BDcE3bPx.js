var e=`---
title: So Phuc
created_at: '2026-11-09'
updated_at: '2026-11-09'
---
**Số phức** đóng vai trò cốt lõi và là công cụ không thể thiếu trong nhiều ngành khoa học kỹ thuật. Nhờ sự kết hợp giữa phần thực và phần ảo — trong đó phép nhân với đơn vị ảo $j$ tương ứng với phép quay 90° — số phức giúp biểu diễn đồng thời biên độ và pha, từ đó đơn giản hóa nhiều bài toán vốn rất phức tạp nếu chỉ dùng số thực.\r
\r
Dưới đây là các **ứng dụng** quan trọng nhất của số phức trong kỹ thuật.\r
\r
---\r
\r
### 1. Kỹ thuật điện và điện tử (điện xoay chiều – AC)\r
\r
Đây là ứng dụng kinh điển và phổ biến nhất của số phức trong thực tiễn:\r
\r
- **Biểu diễn dòng điện xoay chiều:** Trong mạch điện AC, điện áp và dòng điện là các đại lượng hình sin biến đổi theo thời gian. Với mạch tuyến tính ở chế độ xoay chiều hình sin dừng, kỹ sư sử dụng **số phức dạng phasor** để biểu diễn các đại lượng này theo biên độ và pha, thay vì phải giải trực tiếp các phương trình vi phân phức tạp.\r
- **Tổng trở (impedance – $Z$):** Tổng trở trong mạch điện xoay chiều được biểu diễn bằng số phức:\r
  $$Z = R + jX$$\r
  trong đó $R$ là **điện trở thuần**, $X$ là **điện kháng** (gồm cảm kháng và dung kháng; tùy quy ước có thể viết $X = X_L - X_C$).\r
- **Tính toán mạch điện:** Định luật Ohm và các định luật Kirchhoff vẫn giữ nguyên dạng khi chuyển sang mạch xoay chiều bằng cách dùng số phức, giúp việc phân tích mạch gồm điện trở, tụ điện và cuộn cảm trở nên thuận lợi tương tự như tính toán với điện trở thuần.\r
\r
---\r
\r
### 2. Xử lý tín hiệu và viễn thông\r
\r
- **Biến đổi Fourier và Laplace:** Các phép biến đổi toán học cốt lõi trong xử lý tín hiệu, như biến đổi Fourier, sử dụng hàm mũ phức $e^{j\\omega t}$ theo công thức Euler. Chúng cho phép phân tích tín hiệu từ miền thời gian sang miền tần số.\r
- **Lọc tín hiệu:** Các kỹ sư thiết kế bộ lọc số dựa trên mặt phẳng phức (mặt phẳng $z$) để xác định vị trí các “cực” (poles) và “không” (zeros), từ đó kiểm soát độ lợi và đáp ứng tần số của bộ lọc trong các thiết bị âm thanh, viễn thông và radar.\r
\r
---\r
\r
### 3. Cơ học lượng tử và vật lý hiện đại\r
\r
- **Hàm sóng Schrödinger:** Phương trình cơ bản của cơ học lượng tử là phương trình Schrödinger, trong đó hàm sóng $\\psi$ mô tả trạng thái của hạt. Trong lý thuyết chuẩn, hàm sóng thường nhận giá trị phức; xác suất tìm thấy hạt là số thực và được tính từ bình phương môđun của hàm sóng, $|\\psi|^2$. Mặc dù trong một số trường hợp đặc biệt có thể biểu diễn bằng hàm thực, nền tảng toán học tổng quát của cơ học lượng tử vẫn dựa trên số phức.\r
\r
---\r
\r
### 4. Cơ học lưu chất và khí động lực học\r
\r
- **Dòng chảy tiềm năng (potential flow):** Khi nghiên cứu dòng chảy của chất lỏng hoặc không khí xung quanh vật thể, ví dụ trong thiết kế cánh máy bay hoặc tàu thủy, các kỹ sư có thể sử dụng **biến đổi phức** và **ánh xạ bảo giác** (conformal mapping). Phương pháp này giúp biến đổi hình học phức tạp thành hình dạng đơn giản hơn, như hình tròn, để tính toán vận tốc và áp suất dòng chảy thuận lợi hơn. Tuy nhiên, mô hình dòng chảy tiềm năng là mô hình lý tưởng, chủ yếu áp dụng cho **dòng 2D, không nhớt, không xoáy và không nén được**; không thay thế mô tả đầy đủ cho mọi dòng chảy thực.\r
\r
---\r
\r
### 5. Hệ thống điều khiển tự động\r
\r
- **Độ ổn định của hệ thống:** Trong tự động hóa, để kiểm tra xem một hệ thống điều khiển như hệ thống lái tự động hoặc robot công nghiệp có dao động quá mức hay mất ổn định hay không, kỹ sư xét nghiệm của phương trình đặc trưng trên mặt phẳng phức.\r
  - Với **hệ liên tục tuyến tính bất biến (LTI)**, hệ ổn định nếu mọi nghiệm nằm ở **nửa trái mặt phẳng $s$**; nghiệm nằm trên trục ảo là trường hợp biên giới.\r
  - Với **hệ rời rạc**, hệ ổn định nếu mọi nghiệm nằm **trong đường tròn đơn vị** trên mặt phẳng $z$.\r
\r
`;export{e as default};