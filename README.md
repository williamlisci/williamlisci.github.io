### Phương trình Lissajous trong không gian 3D.

The project is developed by Gemini AI and overseen by William.

### Hướng dẫn tùy chỉnh Tham số Lissajous (params)

Các thông số Lissajous trong code được sử dụng để điều chỉnh hình dạng và chuyển động của đường cong trong không gian 3D. Bằng cách thay đổi các giá trị này, bạn có thể tạo ra vô số hình thù và hiệu ứng khác nhau.

Bạn có thể tùy chỉnh các tham số này trực tiếp trong file `LuminousJellyfish.tsx` ở dòng `params.current = {...}`.

---

### 1. Tần số: `a`, `b`, `c`

* **Ý nghĩa:** Tỉ lệ tần số giữa các trục là yếu tố quan trọng nhất quyết định hình dạng cơ bản của đường cong. Khi tỉ lệ tần số là một số hữu tỉ (ví dụ: `2/3`, `3/4`), đường cong sẽ là một hình khép kín. Khi tỉ lệ này là số vô tỉ, đường cong sẽ lấp đầy không gian.
* **Cách tùy chỉnh:**
    * **Tạo hình đơn giản:** Hãy thử các tỉ lệ số nguyên nhỏ như `a=1, b=2, c=3` để tạo ra một hình xoắn ốc có trật tự.
    * **Tạo hình phức tạp hơn:** Tăng giá trị của `a`, `b`, `c` (ví dụ: `a=5, b=6, c=7`) để tạo ra một đường cong phức tạp hơn với nhiều vòng xoắn.
    * **Tạo hình không khép kín:** Sử dụng các giá trị không phải số nguyên hoặc số vô tỉ (ví dụ: `a=1.2, b=2.5, c=3.1`) để đường cong liên tục thay đổi hình dạng, tạo cảm giác chuyển động.
    * **Gợi ý:** Để tạo một đường cong Lissajous 2D, bạn chỉ cần đặt một trong ba biên độ `ampX`, `ampY` hoặc `ampZ` về 0. Ví dụ, đặt `ampZ=0` sẽ tạo ra một đường cong chỉ hiển thị trên mặt phẳng XY.

---

### 2. Biên độ: `ampX`, `ampY`, `ampZ`

* **Ý nghĩa:** Các tham số này xác định kích thước hoặc độ lớn của đường cong theo mỗi trục.
* **Cách tùy chỉnh:**
    * **Thay đổi tỉ lệ:** Để tạo ra một hình thuôn dài hoặc dẹt, hãy đặt các giá trị biên độ khác nhau. Ví dụ: `ampX=2.0, ampY=0.5, ampZ=2.0` sẽ làm cho hình dẹt theo trục Y.
    * **Điều chỉnh kích thước tổng thể:** Tăng hoặc giảm cả ba giá trị `ampX, ampY, ampZ` cùng lúc để làm cho đường cong lớn hơn hoặc nhỏ hơn.

---

### 3. Độ lệch pha: `d`, `e`

* **Ý nghĩa:** Độ lệch pha (`delta` trong phương trình) quyết định hình dạng và sự xoay của đường cong.
* **Cách tùy chỉnh:**
    * **Tạo hình tròn hoặc elip:** Khi `a=b` (tần số bằng nhau) và độ lệch pha là `90` độ ($\pi$/2 radian), đường cong sẽ là một hình tròn hoặc elip.
    * **Tạo hình đường thẳng:** Khi `a=b` và độ lệch pha là `0` hoặc `180` độ ($\pi$ radian), đường cong sẽ là một đường thẳng.
    * **Thay đổi độ lệch pha:** Tăng hoặc giảm giá trị của `d` và `e` để xem đường cong thay đổi như thế nào. Ví dụ, thay đổi `d` từ `0` đến `3.14` ($\pi$) sẽ làm cho đường cong xoay tròn.

## Thank 

free
