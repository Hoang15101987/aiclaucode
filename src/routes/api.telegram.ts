import { createFileRoute } from "@tanstack/react-router";

type TelegramLead = {
  name?: unknown;
  contact?: unknown;
  selection?: unknown;
  delivery?: unknown;
  note?: unknown;
  website?: unknown;
};

const readText = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export const Route = createFileRoute("/api/telegram")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: TelegramLead;

        try {
          payload = (await request.json()) as TelegramLead;
        } catch {
          return Response.json({ error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
        }

        // Trường ẩn chống bot tự động. Người dùng thật sẽ luôn để trống.
        if (readText(payload.website, 200)) {
          return Response.json({ ok: true });
        }

        const name = readText(payload.name, 80);
        const contact = readText(payload.contact, 120);
        const selection = readText(payload.selection, 120) || "Chưa chọn nhân sự";
        const delivery = readText(payload.delivery, 120) || "Chưa chọn hình thức";
        const note = readText(payload.note, 800) || "Không có";

        if (!name || !contact) {
          return Response.json(
            { error: "Vui lòng nhập họ tên và thông tin liên hệ." },
            { status: 400 },
          );
        }

        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!token || !chatId) {
          console.error(
            "Telegram is not configured: missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID",
          );
          return Response.json(
            { error: "Bot Telegram chưa được cấu hình. Vui lòng liên hệ quản trị viên." },
            { status: 503 },
          );
        }

        const message = [
          "🔔 YÊU CẦU TUYỂN NHÂN SỰ AI MỚI",
          "",
          `👤 Khách hàng: ${name}`,
          `📞 Liên hệ: ${contact}`,
          `🤖 Lựa chọn: ${selection}`,
          `📦 Hình thức: ${delivery}`,
          `📝 Yêu cầu: ${note}`,
          "",
          `🕒 Thời gian: ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}`,
        ].join("\n");

        try {
          const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: message }),
          });

          if (!telegramResponse.ok) {
            const details = await telegramResponse.text();
            console.error("Telegram API error", telegramResponse.status, details);
            return Response.json(
              { error: "Không thể gửi yêu cầu đến Telegram. Vui lòng thử lại." },
              { status: 502 },
            );
          }

          return Response.json({ ok: true });
        } catch (error) {
          console.error("Telegram request failed", error);
          return Response.json(
            { error: "Không thể kết nối Telegram. Vui lòng thử lại." },
            { status: 502 },
          );
        }
      },
    },
  },
});
