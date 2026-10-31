var e=`---
title: Qubit
date: '2026-10-31'
---
# Các công nghệ phần cứng dùng để chế tạo qubit\r
\r
**Bản đã rà soát, kiểm chứng và cập nhật:** 2.2  \r
**Ngày cập nhật thông tin:** 31/10/2026  \r
\r
---\r
\r
## 1. Khái niệm nền tảng: qubit là gì?\r
\r
Qubit (quantum bit – bit lượng tử) là đơn vị thông tin cơ bản của máy tính lượng tử. Khác với bit cổ điển chỉ nhận một trong hai giá trị $0$ hoặc $1$ tại một thời điểm, một qubit có thể ở trạng thái chồng chập lượng tử:\r
\r
$$\r
|\\psi\\rangle = \\alpha |0\\rangle + \\beta |1\\rangle,\r
\\qquad |\\alpha|^2 + |\\beta|^2 = 1.\r
$$\r
\r
Ở đây, $\\alpha$ và $\\beta$ là các biên độ xác suất phức. Khi đo qubit trong cơ sở tính toán, ta thu được $0$ hoặc $1$ với xác suất tương ứng là $|\\alpha|^2$ và $|\\beta|^2$.\r
\r
**Điểm quan trọng:** qubit không nhất thiết phải là một hạt riêng lẻ. Nó có thể được tạo ra từ trạng thái lượng tử của một ion, nguyên tử trung hòa, photon, spin của electron, hoặc một mạch điện siêu dẫn được thiết kế như một hệ lượng tử nhân tạo. Vì thế, các công nghệ chế tạo qubit khác nhau chủ yếu ở hệ vật lý được dùng để **lưu trữ, điều khiển và đo** thông tin lượng tử.\r
\r
---\r
\r
## 2. Sáu nhóm nền tảng phần cứng quan trọng\r
\r
Cách phân nhóm dưới đây là cách trình bày thực dụng: sáu họ nền tảng tiêu biểu, đang được nghiên cứu hoặc phát triển tích cực. Một số họ có quan hệ gần nhau về vật lý; ví dụ, qubit spin bán dẫn và qubit spin tại tâm khuyết tật đều khai thác spin, nhưng sử dụng vật liệu và kiến trúc khác nhau.\r
\r
### 2.1. Mạch siêu dẫn (Superconducting Circuits)\r
\r
**Nguyên lý hoạt động**\r
\r
- Sử dụng các mạch điện siêu dẫn được chế tạo trên chip, thường có những thành phần phi tuyến quan trọng như tiếp giáp Josephson.\r
- Khi được làm lạnh xuống nhiệt độ cực thấp (thường cỡ $10\\text{--}20\\text{ mK}$ trong các hệ thống phổ biến), mạch có các mức năng lượng lượng tử rời rạc.\r
- Hai mức năng lượng được chọn để mã hóa $|0\\rangle$ và $|1\\rangle$. Loại qubit thường gặp nhất là **transmon**.\r
- Xung vi sóng được dùng để điều khiển trạng thái qubit; các qubit tương tác thông qua bộ ghép (coupler) hoặc cấu trúc mạch được thiết kế phù hợp.\r
\r
**Ưu điểm**\r
\r
- Thời gian thực hiện cổng lượng tử thường rất nhanh (cỡ nano giây) so với nhiều nền tảng nguyên tử.\r
- Có thể chế tạo bằng các quy trình vi chế tạo bán dẫn và tích hợp nhiều thành phần trên chip.\r
- Hệ sinh thái kỹ thuật, thiết kế mạch, điều khiển và đo lường đang phát triển mạnh.\r
\r
**Thách thức**\r
\r
- Trạng thái lượng tử nhạy với nhiễu điện từ, dao động vật liệu, tổn hao và tương tác không mong muốn.\r
- Cần hệ thống làm lạnh sâu, dây dẫn điều khiển, thiết bị đo và hiệu chuẩn phức tạp.\r
- Khi tăng số qubit, việc hạn chế xuyên nhiễu, đồng nhất chất lượng linh kiện và quản lý hệ thống điều khiển trở nên khó hơn.\r
\r
**Ví dụ cập nhật**\r
\r
- **Google – Willow:** Bộ xử lý siêu dẫn thế hệ mới, được chế tạo ở cả cấu hình 72 qubit và 105 qubit, đã chứng minh sửa lỗi lượng tử dưới ngưỡng với mã bề mặt (surface code). Trên chip 105 qubit, mã khoảng cách 7 (distance-7) đạt tỷ lệ lỗi logic $0{,}143\\%$ mỗi chu kỳ; khi tăng khoảng cách mã từ 3 lên 5 rồi 7, tỷ lệ lỗi logic giảm với hệ số $\\Lambda \\approx 2{,}14$. Kết quả công bố trực tuyến trên *Nature* ngày 09/12/2024 và in trong tập 638 (2025). [1]\r
- **IBM:** Tháng 11/2025, IBM giới thiệu **Nighthawk** (120 qubit, 218 bộ ghép điều chỉnh được, kết nối mỗi qubit với 4 lân cận gần nhất trong mạng lưới vuông) và **Loon** (112 qubit, chip thử nghiệm tích hợp các thành phần cho tính toán chịu lỗi). [2] Lộ trình công bố của IBM dự kiến **Kookaburra** (mô-đun đầu tiên kết hợp bộ nhớ lượng tử và logic) vào 2026, và **Starling** (mục tiêu khoảng 200 qubit logic, 100 triệu cổng) vào 2029. Đây là mục tiêu của hãng, chưa phải kết quả đã đạt. [3]\r
\r
### 2.2. Ion bị bẫy (Trapped-Ion Qubits)\r
\r
**Nguyên lý hoạt động**\r
\r
- Dùng các nguyên tử đã bị ion hóa (tức là nguyên tử mang điện), rồi giữ chúng trong buồng chân không bằng trường điện từ.\r
- Bẫy Paul thường sử dụng điện trường tần số vô tuyến; bẫy Penning kết hợp điện trường và từ trường. Vì vậy, cách nói "bẫy điện từ" có thể dùng ở mức khái quát, nhưng không nên hiểu rằng mọi bẫy đều dùng cùng một cấu hình điện–từ.\r
- Các trạng thái nội tại của ion, thường là các mức siêu tinh tế hoặc mức điện tử, mã hóa $|0\\rangle$ và $|1\\rangle$.\r
- Laser hoặc vi sóng dùng để điều khiển và đọc trạng thái. Các ion có thể tương tác thông qua chuyển động tập thể của chuỗi ion, thường được mô tả bằng các mode dao động (phonon).\r
\r
**Ưu điểm**\r
\r
- Các ion có thể duy trì trạng thái lượng tử trong thời gian dài.\r
- Các phép cổng lượng tử có độ trung thực cao đã được chứng minh trong nhiều hệ thống.\r
- Trong kiến trúc phù hợp (ví dụ QCCD – quantum charge-coupled device), các ion được di chuyển giữa vùng lưu trữ và vùng thao tác, cho phép kết nối linh hoạt giữa các qubit.\r
\r
**Thách thức**\r
\r
- Một số phép cổng hai qubit và chu trình điều khiển có thể chậm hơn so với mạch siêu dẫn.\r
- Hệ thống cần chân không cao, laser ổn định, quang học chính xác và kiểm soát chuyển động ion.\r
- Khi mở rộng, việc định tuyến, vận chuyển ion, ổn định laser và điều khiển đồng thời nhiều vùng là những bài toán kỹ thuật đáng kể.\r
\r
**Ví dụ**\r
\r
- **Quantinuum Helios:** Helios là hệ thống ion bị bẫy 98 qubit dựa trên kiến trúc QCCD, ra mắt cuối năm 2025 và có bài báo bình duyệt trên *Nature* (tập 655, 2026). Hệ dùng ion bari $^{137}\\mathrm{Ba}^{+}$ làm qubit tính toán và ion ytterbi để làm lạnh cộng hưởng. Chip bẫy là cấu trúc điện cực bề mặt với "nút giao" (junction) bốn nhánh để di chuyển ion giữa các vùng. Độ trung thực cổng hai qubit được báo cáo đạt trung bình khoảng $99{,}92\\%$ (infidelity $7{,}9 \\times 10^{-4}$). Việc chuyển từ ytterbi sang bari giúp dùng laser ánh sáng nhìn thấy thay cho laser tử ngoại. [4]\r
\r
### 2.3. Nguyên tử trung hòa (Neutral-Atom Qubits)\r
\r
**Nguyên lý hoạt động**\r
\r
- Sử dụng các nguyên tử trung hòa về điện, chẳng hạn rubidi, cesi, stronti hoặc ytterbi.\r
- Các nguyên tử được làm lạnh bằng laser và giữ tại những vị trí xác định bằng nhíp quang học (optical tweezers) hoặc mạng quang học (optical lattices).\r
- Các trạng thái siêu tinh tế hoặc trạng thái nội tại khác của nguyên tử có thể mã hóa qubit.\r
- Để tạo tương tác hai qubit, nhiều hệ thống kích thích nguyên tử lên trạng thái Rydberg. Tương tác mạnh giữa các nguyên tử Rydberg tạo ra cơ chế thường gọi là **Rydberg blockade**, hỗ trợ thực hiện cổng vướng víu.\r
\r
**Ưu điểm**\r
\r
- Có thể sắp xếp thành mảng hai chiều hoặc ba chiều và tái cấu hình vị trí nguyên tử.\r
- Có tiềm năng mở rộng số lượng nguyên tử trong mảng lớn.\r
- Các nguyên tử cùng loại về bản chất là giống hệt nhau, tạo lợi thế cho việc xây dựng hệ thống nhiều qubit.\r
- Hệ thống (buồng chân không, quang học, điều khiển) hoạt động ở nhiệt độ môi trường, không cần tủ lạnh pha loãng; nguyên tử được làm lạnh bằng laser.\r
\r
**Thách thức**\r
\r
- Phải kiểm soát chính xác laser, nhiệt độ nguyên tử, vị trí nguyên tử và trạng thái Rydberg.\r
- Nguyên tử có thể bị mất khỏi bẫy; việc phát hiện, thay thế và hiệu chỉnh nguyên tử mất là một phần của kiến trúc.\r
- Mảng có hàng trăm hoặc hàng nghìn nguyên tử không đồng nghĩa với việc đã có cùng số lượng qubit logic chất lượng cao. Độ trung thực của cổng, đọc trạng thái, kết nối và sửa lỗi vẫn quyết định năng lực tính toán thực tế.\r
\r
**Các mốc đáng chú ý (2025–2026)**\r
\r
- **Caltech:** Mảng 6.100 nguyên tử cesi trong nhíp quang học; thời gian chồng chập khoảng 13 giây và độ chính xác thao tác qubit đơn khoảng $99{,}98\\%$ (*Nature*, 09/2025). Nghiên cứu này chưa trình diễn cổng hai qubit trên toàn mảng; trọng tâm là chứng minh khả năng duy trì chất lượng ở quy mô lớn. [5]\r
- **Harvard / MIT / QuEra:** Hệ tới 448 nguyên tử rubidi thực hiện các thành phần chính của kiến trúc tính toán chịu lỗi, gồm sửa lỗi dưới ngưỡng, cổng logic và tạo trạng thái "magic" (*Nature*, công bố trực tuyến 11/2025, xuất bản in 01/2026). Cùng nhóm cũng báo cáo vận hành liên tục một hệ khoảng 3.000 nguyên tử trong hơn hai giờ nhờ bổ sung nguyên tử bị mất. [6]\r
\r
### 2.4. Qubit photon và điện toán lượng tử quang tử (Photonic Quantum Computing)\r
\r
**Nguyên lý hoạt động**\r
\r
- Thông tin lượng tử được mã hóa vào các đặc tính của photon, ví dụ phân cực, đường đi, thời điểm đến (time-bin), tần số hoặc các trạng thái quang học khác (như trạng thái nén hoặc mã GKP).\r
- Photon được điều khiển bằng các phần tử quang học như bộ chia chùm tia, bộ dịch pha, mạch quang tử tích hợp và các linh kiện điều biến.\r
- Photon được phát hiện bằng detector đơn photon hoặc detector phân giải số photon.\r
- Một số kiến trúc dùng phép đo và kỹ thuật fusion để tạo trạng thái vướng víu và xây dựng tính toán quang tử quy mô lớn.\r
\r
**Ưu điểm**\r
\r
- Photon tương tác yếu với môi trường nên có thể truyền thông tin lượng tử qua sợi quang hoặc không gian tương đối thuận lợi.\r
- Nhiều linh kiện quang học có thể hoạt động ở nhiệt độ phòng.\r
- Có tiềm năng tận dụng công nghệ quang tử tích hợp và hạ tầng viễn thông để xây dựng hệ thống mô-đun, kết nối từ xa.\r
\r
**Thách thức**\r
\r
- Mất photon (optical loss) là một trong những trở ngại trọng yếu: photon bị thất thoát có thể làm hỏng phép tính hoặc khiến xác suất hoàn tất phép tính giảm mạnh.\r
- Nguồn photon đồng nhất, hiệu suất phát, detector, đồng bộ thời gian và tích hợp hàng loạt linh kiện vẫn là các bài toán khó.\r
- Không phải mọi cổng hai qubit quang tử đều xác định (deterministic) và dễ thực hiện như cổng điện tử cổ điển; nhiều kiến trúc dựa vào phép đo xác suất, tài nguyên vướng víu và cơ chế heralding.\r
\r
**Ví dụ**\r
\r
- **Xanadu Aurora** (*Nature* 638, 2025) là mô hình quy mô nhỏ gồm 35 chip quang tử, 12 qubit vật lý, nối bằng khoảng 13 km sợi quang; nhóm tác giả mô tả đây là hệ "chưa đạt hiệu năng tối ưu" (sub-performant scale model). [7]\r
- **PsiQuantum** công bố nền tảng chip quang tử silicon có thể sản xuất được (manufacturable platform) tại xưởng bán dẫn thương mại (GlobalFoundries), với các mô-đun tích hợp để tạo, điều khiển, kết nối và phát hiện photon (*Nature*, 2025). [8]\r
\r
### 2.5. Qubit spin bán dẫn (Semiconductor Spin Qubits)\r
\r
**Nguyên lý hoạt động**\r
\r
- Dùng điện cực nano để giữ một electron hoặc lỗ trống (hole) trong một vùng rất nhỏ của vật liệu bán dẫn, thường tạo thành chấm lượng tử (quantum dot).\r
- Trạng thái spin của hạt, ví dụ hai hướng spin được chọn làm $|0\\rangle$ và $|1\\rangle$, mã hóa thông tin lượng tử.\r
- Có thể dùng xung vi sóng, trường điện kết hợp tương tác spin–quỹ đạo, hoặc các cơ chế điều khiển khác để thao tác spin.\r
- Các qubit có thể tương tác thông qua tương tác trao đổi (exchange interaction) hoặc cơ chế ghép nối được thiết kế.\r
\r
**Ưu điểm**\r
\r
- Kích thước linh kiện nhỏ (dưới khoảng $1\\ \\mu\\mathrm{m}^2$ mỗi qubit), có tiềm năng mật độ tích hợp cao.\r
- Silicon và một số vật liệu bán dẫn có thể tương thích với quy trình chế tạo vi điện tử hiện có (CMOS, FD-SOI).\r
- Một số thiết kế có thể hoạt động ở nhiệt độ cao hơn mạch siêu dẫn (từ khoảng $0{,}5\\text{ K}$ đến cỡ $1\\text{ K}$), thuận lợi hơn cho việc đặt điện tử điều khiển gần qubit.\r
- Có triển vọng tích hợp qubit với mạch điều khiển điện tử ở quy mô lớn.\r
\r
**Thách thức**\r
\r
- Chất lượng qubit nhạy với sai khác ở kích thước, vị trí, thành phần vật liệu và môi trường điện tích tại từng thiết bị.\r
- Vẫn cần nhiệt độ rất thấp (dưới cỡ $1\\text{ K}$) và điều khiển điện tử có độ chính xác cao.\r
- Ghép nối nhiều qubit, đọc trạng thái nhanh và đồng nhất, cũng như tích hợp hàng loạt thiết bị vẫn là những thách thức đang được nghiên cứu. Số qubit đã trình diễn còn nhỏ so với các nền tảng khác (ví dụ imec và Diraq báo cáo mảng 8 qubit spin silicon MOS trên wafer 300 mm tương thích CMOS, 07/2026). [9]\r
\r
### 2.6. Qubit spin tại tâm khuyết tật trong chất rắn (Solid-State Defect / Color-Center Qubits)\r
\r
**Nguyên lý hoạt động**\r
\r
- Một số tinh thể có khuyết tật cấu trúc hoặc nguyên tử tạp chất tạo ra những mức năng lượng lượng tử có thể kiểm soát. Các khuyết tật này thường được gọi là **tâm màu** (color centers).\r
- Ví dụ nổi tiếng là tâm nitơ–vacancy (NV) trong kim cương: một nguyên tử nitơ thay thế vị trí carbon và nằm cạnh một vị trí carbon bị khuyết.\r
- Trong nền tảng NV, qubit thường được mã hóa bằng spin điện tử của tâm khuyết tật. Các spin hạt nhân lân cận có thể được dùng làm bộ nhớ lượng tử hoặc các qubit phụ trong một thanh ghi lượng tử.\r
- Ánh sáng laser thường được dùng để khởi tạo và đọc trạng thái; vi sóng được dùng để điều khiển spin. Photon có thể đóng vai trò giao diện truyền vướng víu giữa các nút lượng tử.\r
\r
**Ưu điểm**\r
\r
- Một số tâm khuyết tật có thời gian kết hợp spin dài và có thể được điều khiển bằng quang học.\r
- Một số cấu hình NV trong kim cương có thể hoạt động ở nhiệt độ phòng, đặc biệt phù hợp cho nghiên cứu cảm biến lượng tử và các nút mạng lượng tử.\r
- Có khả năng kết nối trạng thái spin với photon, hữu ích cho nghiên cứu mạng lượng tử.\r
\r
**Thách thức**\r
\r
- Độ đồng nhất giữa các tâm khuyết tật, hiệu suất thu photon, chất lượng đọc trạng thái và khả năng ghép nối nhiều tâm vẫn là các vấn đề lớn.\r
- Một tâm NV đơn lẻ có thể hữu ích cho thí nghiệm, cảm biến hoặc nút lượng tử, nhưng điều đó không đồng nghĩa đã có bộ xử lý lượng tử phổ dụng quy mô lớn.\r
- Các loại tâm màu khác nhau có đặc tính quang học và yêu cầu nhiệt độ khác nhau (nhiều loại tâm màu như SiV, SnV cần làm lạnh); không thể suy rộng mọi đặc tính của NV kim cương cho toàn bộ họ tâm khuyết tật.\r
\r
---\r
\r
## 3. qubit tô-pô (Topological Qubits)\r
\r
**Ý tưởng:** Mã hóa thông tin lượng tử vào các trạng thái tô-pô của hệ nhiều hạt, chẳng hạn thông qua các mode không Abel (non-Abelian) hoặc mode zero Majorana trong những cấu trúc vật liệu lai siêu dẫn–bán dẫn. Về lý thuyết, thông tin được mã hóa theo cách có thể làm nó ít nhạy hơn với một số nhiễu cục bộ.\r
\r
**Tiềm năng:** Nếu hiện thực hóa được qubit tô-pô đúng nghĩa và điều khiển được các thao tác cần thiết, nền tảng này có thể cung cấp một mức bảo vệ vật lý bổ sung trước một số loại lỗi.\r
\r
**Tình trạng (tính đến 10/2026)**\r
\r
- Microsoft công bố chip **Majorana 1** (02/2025), mô tả là chip dựa trên "qubit tô-pô" trong cấu trúc dây indi arsenide–nhôm siêu dẫn, rồi giới thiệu **Majorana 2** (06/2026) và đặt mục tiêu máy tính lượng tử có khả năng mở rộng vào năm 2029.\r
\r
---\r
\r
## 4. Bảng so sánh khái quát\r
\r
| Nền tảng | Hệ vật lý lưu trữ qubit | Điểm mạnh thường được nhắc đến | Nút thắt kỹ thuật chính | Đơn vị tiêu biểu |\r
| --- | --- | --- | --- | --- |\r
| Mạch siêu dẫn | Mức năng lượng lượng tử của mạch điện siêu dẫn | Cổng nhanh, chế tạo trên chip, hệ sinh thái công nghiệp mạnh | Làm lạnh sâu, nhiễu, xuyên nhiễu, hiệu chuẩn và dây điều khiển | Google, IBM |\r
| Ion bị bẫy | Trạng thái nội tại của ion mang điện | Thời gian kết hợp dài, cổng có độ trung thực cao | Tốc độ cổng, laser, chân không, vận chuyển và định tuyến ion | Quantinuum, IonQ |\r
| Nguyên tử trung hòa | Trạng thái nội tại của nguyên tử trung hòa | Mảng lớn, tái cấu hình, kết nối linh hoạt | Độ trung thực cổng, mất nguyên tử, laser và hiệu chỉnh hệ thống | QuEra, Atom Computing, Pasqal |\r
| Photon / quang tử | Trạng thái lượng tử của photon | Truyền thông tin xa, tích hợp quang học, nhiều linh kiện vận hành ở nhiệt độ phòng | Mất photon, nguồn photon, detector và phép toán xác định | PsiQuantum, Xanadu |\r
| Spin bán dẫn | Spin electron hoặc lỗ trống trong chấm lượng tử / cấu trúc bán dẫn | Kích thước nhỏ, tiềm năng tương thích CMOS | Độ đồng nhất thiết bị, nhiệt độ thấp, đọc và ghép nối qubit | Diraq, Quobly, Intel |\r
| Tâm khuyết tật / tâm màu | Spin điện tử và/hoặc spin hạt nhân tại khuyết tật tinh thể | Có thể kết hợp spin với photon; một số cấu hình hoạt động ở nhiệt độ phòng | Độ đồng nhất, thu photon, đọc và ghép nối nhiều tâm | Các nhóm nghiên cứu, công ty mạng lượng tử |\r
| Tô-pô (đang tranh luận) | Trạng thái tô-pô của hệ lượng tử nhiều hạt | Tiềm năng bảo vệ thông tin trước một số nhiễu cục bộ | Chưa được cộng đồng công nhận là đã chứng minh qubit tô-pô vận hành đáng tin cậy | Microsoft |\r
\r
*Bảng trên chỉ nêu xu hướng tổng quát. Hiệu năng thực tế phụ thuộc vào từng thiết kế, quy trình chế tạo, cách hiệu chuẩn và thước đo được chọn.*\r
\r
---\r
\r
## 5. Vì sao chưa có một công nghệ qubit thắng tuyệt đối?\r
\r
Mỗi nền tảng tối ưu những yếu tố khác nhau. Khi đánh giá một bộ xử lý lượng tử, không thể chỉ nhìn vào số lượng qubit được quảng bá. Cần xem xét đồng thời:\r
\r
- **Số qubit vật lý (physical qubits):** số hệ lượng tử vật lý được điều khiển trong thiết bị.\r
- **Độ trung thực cổng (gate fidelity):** mức độ thao tác thực tế gần với phép toán lượng tử mong muốn.\r
- **Thời gian kết hợp (coherence time):** khoảng thời gian trạng thái lượng tử còn giữ được thông tin pha cần thiết.\r
- **Tốc độ cổng và đo lường:** thao tác nhanh hay chậm, đọc trạng thái mất bao lâu.\r
- **Kết nối (connectivity):** một qubit có thể tương tác trực tiếp với những qubit nào và cần bao nhiêu bước để kết nối các cặp xa nhau.\r
- **Khả năng mở rộng:** có thể chế tạo, điều khiển, kết nối và hiệu chuẩn số lượng lớn qubit với chất lượng đồng đều hay không.\r
- **Sửa lỗi lượng tử (quantum error correction):** có thể kết hợp qubit vật lý thành qubit logic với tỷ lệ lỗi giảm khi tăng tài nguyên hay không.\r
- **Chi phí và độ phức tạp toàn hệ thống:** hệ làm lạnh, laser, chân không, detector, điện tử điều khiển, năng lượng, diện tích và bảo trì.\r
\r
### Phân biệt qubit vật lý và qubit logic\r
\r
Một **qubit vật lý** là hệ lượng tử cụ thể được chế tạo bằng một trong các nền tảng kể trên. Nhưng qubit vật lý vẫn có lỗi do nhiễu, thao tác không hoàn hảo hoặc đọc sai.\r
\r
Một **qubit logic** (logical qubit) được mã hóa bằng nhiều qubit vật lý cùng với quy trình đo và sửa lỗi. Mục tiêu là phát hiện và sửa lỗi để thông tin lượng tử được bảo vệ tốt hơn. Do đó:\r
\r
- $1.000$ qubit vật lý **không** có nghĩa là có $1.000$ qubit logic.\r
- Số qubit logic đạt được, tỷ lệ lỗi logic và khả năng thực hiện cổng logic đáng tin cậy thường quan trọng hơn một con số qubit vật lý đứng riêng lẻ.\r
- Chi phí chuyển từ qubit vật lý sang qubit logic phụ thuộc vào nền tảng, chất lượng phần cứng, mã sửa lỗi và mức độ lỗi mục tiêu; không có một tỷ lệ cố định áp dụng cho mọi máy tính lượng tử.\r
\r
---\r
\r
## 6. Xu hướng: có thể tồn tại kiến trúc lai\r
\r
Không nhất thiết toàn bộ máy tính lượng tử tương lai phải dựa trên duy nhất một loại qubit. Các kiến trúc lai có thể tận dụng điểm mạnh của từng hệ:\r
\r
- Một nền tảng có thể đảm nhiệm tính toán cục bộ.\r
- Photon có thể đảm nhiệm truyền vướng víu hoặc kết nối các mô-đun ở xa.\r
- Một hệ spin hoặc nguyên tử có thể được nghiên cứu cho vai trò lưu trữ lượng tử.\r
\r
Đây là hướng kiến trúc có cơ sở nghiên cứu. Việc chuyển đổi trạng thái lượng tử giữa các hệ vật lý cũng là bài toán kỹ thuật khó.\r
\r
---\r
\r
## 7. Kết luận\r
\r
Hiện nay, sáu họ nền tảng đáng chú ý gồm mạch siêu dẫn, ion bị bẫy, nguyên tử trung hòa, photon/quang tử, spin bán dẫn và spin tại tâm khuyết tật. Bên cạnh đó, qubit tô-pô là hướng nghiên cứu có tiềm năng nhưng còn tranh luận và chưa đạt mức trưởng thành tương đương.\r
\r
Không có nền tảng nào vượt trội trên mọi tiêu chí. Mạch siêu dẫn nổi bật về tốc độ thao tác và khả năng chế tạo chip; ion bị bẫy có ưu thế về thời gian kết hợp và độ trung thực cao; nguyên tử trung hòa hấp dẫn nhờ mảng nguyên tử lớn, có thể tái cấu hình; photon phù hợp cho truyền thông và kiến trúc quang tử; spin bán dẫn có triển vọng tích hợp với công nghệ vi điện tử; còn tâm khuyết tật có tiềm năng kết hợp spin với giao diện quang học.\r
\r
Thước đo cuối cùng không phải là có bao nhiêu qubit được đặt lên chip hay trong bẫy, mà là có thể tạo ra bao nhiêu **qubit logic đáng tin cậy**, thực hiện được bao nhiêu phép tính hữu ích và mở rộng hệ thống với chi phí hợp lý hay không.\r
\r
---\r
\r
## Tài liệu tham khảo\r
\r
[1] Google Quantum AI and collaborators, "Quantum error correction below the surface code," *Nature* **638** (2025). Published online 09 December 2024.\r
\r
[2] IBM Research, "Nighthawk and Loon: Next-generation quantum processors," IBM Technical Report (November 2025).\r
\r
[3] IBM Quantum Roadmap, publicly available at ibm.com/quantum/roadmap (accessed October 2026).\r
\r
[4] Quantinuum and collaborators, "High-fidelity quantum computing with trapped barium ions," *Nature* **655** (2026).\r
\r
[5] Caltech Quantum Optics Group, "Coherent control of 6,100 cesium atoms in optical tweezers," *Nature* (September 2025).\r
\r
[6] Harvard/MIT/QuEra collaboration, "Fault-tolerant quantum computing with neutral atoms," *Nature* (online November 2025, print January 2026).\r
\r
[7] Xanadu and collaborators, "Aurora: A modular photonic quantum processor," *Nature* **638** (2025).\r
\r
[8] PsiQuantum and GlobalFoundries, "Manufacturable silicon photonic platform for quantum computing," *Nature* (2025).\r
\r
[9] imec and Diraq, "CMOS-compatible 8-qubit silicon spin array on 300 mm wafer," Technical Report (July 2026).\r
\r
[10] H. Legg et al., "Reanalysis of Majorana transport data," *Nature* (June 2026); see also Microsoft response in the same issue.\r
\r
---
`;export{e as default};