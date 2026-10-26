# CuaHangXanh

Hệ thống quản lý cửa hàng Tạp Hóa Xanh (Giao diện chuẩn SaaS).

## 🚀 Hướng dẫn khởi chạy dự án

Dự án là ứng dụng Web tĩnh (HTML5, CSS3, Vanilla JavaScript), có thể chạy nhanh qua các cách sau:

### Cách 1: Sử dụng Python (Khuyên dùng trên macOS/Linux)
Mở Terminal tại thư mục dự án và chạy:
```bash
python3 -m http.server 3000
```
Truy cập trình duyệt: [http://localhost:3000](http://localhost:3000)

### Cách 2: Sử dụng Node.js (npx serve)
```bash
npx serve . -p 3000
```
Truy cập: [http://localhost:3000](http://localhost:3000)

### Cách 3: Sử dụng VS Code Live Server
- Chuột phải vào file `login.html` -> chọn **Open with Live Server**.

---

## 🔑 Tài khoản đăng nhập thử nghiệm

| Vai trò | Tên đăng nhập | Mật khẩu | Phạm vi quyền hạn |
| :--- | :--- | :--- | :--- |
| **Chủ cửa hàng (Admin)** | `admin` | `123` | Xem toàn bộ báo cáo doanh thu, lợi nhuận, quản lý hàng hóa, nhà cung cấp, khách hàng, nhân viên, cài đặt hệ thống |
| **Nhân viên bán hàng** | `mylinh` | `123` | Bán hàng POS, tạo hóa đơn, đổi trả hàng, tra cứu tồn kho, trang thông tin cá nhân |
