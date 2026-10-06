# Hướng dẫn chạy website

## Chạy trên máy

1. Mở thư mục dự án trong Terminal.
2. Cài thư viện bằng lệnh `npm install`.
3. Khởi động website bằng lệnh `npm run dev`.
4. Mở địa chỉ `http://127.0.0.1:8080/` trong trình duyệt.

## Kết nối Telegram

1. Nhắn `@BotFather` trên Telegram để tạo bot và lấy Bot Token.
2. Nhắn một tin cho bot, sau đó lấy Chat ID của tài khoản hoặc nhóm nhận thông báo.
3. Sao chép `.env.example` thành `.env.local`.
4. Điền `TELEGRAM_BOT_TOKEN` và `TELEGRAM_CHAT_ID` vào `.env.local`.
5. Khởi động lại website bằng `npm run dev`.

Bot Token chỉ được sử dụng phía máy chủ và không xuất hiện trong mã chạy trên trình duyệt.

## Kiểm tra bản hoàn chỉnh

- Chạy kiểm thử: `npm test`
- Tạo bản dựng: `npm run build`

Toàn bộ ảnh dùng trên trang đã được lưu trong thư mục `public/assets`, vì vậy website không còn phụ thuộc vào đường dẫn ảnh riêng của Lovable.
