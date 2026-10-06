import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  Clock,
  Headset,
  LoaderCircle,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const coverAsset = { url: "/assets/cover.png" };
const agentCoverAsset = { url: "/assets/agent-cover.png" };
const skillVestCoverAsset = { url: "/assets/skill-vest-cover.png" };
const anNhienAsset = { url: "/assets/staff/an-nhien.jpg" };
const minhAnhAsset = { url: "/assets/staff/minh-anh.jpg" };
const linhChiAsset = { url: "/assets/staff/linh-chi.jpg" };
const giaHanAsset = { url: "/assets/staff/gia-han.jpg" };
const thaoVyAsset = { url: "/assets/staff/thao-vy.jpg" };
const ngocMaiAsset = { url: "/assets/staff/ngoc-mai.jpg" };
const haMyAsset = { url: "/assets/staff/ha-my.jpg" };
const thanhTrucAsset = { url: "/assets/staff/thanh-truc.jpg" };
const installerAsset = { url: "/assets/nguoi-cai-agent.png" };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tuyển Nhân sự AI – Nhân sự tự động cho doanh nghiệp" },
      {
        name: "description",
        content:
          "Tuyển Nhân sự AI chuyên xây kênh, bán hàng, edit video, tạo trang bán hàng, sản xuất hình ảnh, chăm sóc khách hàng và nhắn tin hàng loạt.",
      },
      { property: "og:title", content: "Tuyển Nhân sự AI – Làm việc 24/7" },
      {
        property: "og:description",
        content:
          "Chọn nhân sự theo chuyên môn, chạy trên ChatGPT hoặc Claude, bàn giao trong 24 giờ.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type AgentProfile = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  description: string;
  features: string[];
  price: number;
  industries: string[];
  image: string;
};

const INDUSTRIES = [
  "Thời trang",
  "Mỹ phẩm",
  "Nhà hàng – F&B",
  "Bất động sản",
  "Giáo dục",
  "Sức khỏe",
  "Du lịch",
  "Kinh doanh online",
];

const AGENTS: AgentProfile[] = [
  {
    id: "xay-kenh",
    name: "An Nhiên AI",
    role: "Chuyên viên Xây kênh",
    specialty: "TikTok · YouTube · Facebook",
    description:
      "Lên chiến lược nội dung, viết kịch bản và vận hành lịch đăng đều đặn cho thương hiệu.",
    features: [
      "Lập lịch nội dung 30 ngày",
      "Viết kịch bản theo ngành",
      "Phân tích chủ đề tiềm năng",
    ],
    price: 999000,
    industries: ["Kinh doanh online", "Giáo dục", "Du lịch", "Sức khỏe"],
    image: anNhienAsset.url,
  },
  {
    id: "ban-hang",
    name: "Minh Anh AI",
    role: "Chuyên viên Bán hàng",
    specialty: "Tư vấn · Chốt đơn · Theo sát khách",
    description: "Tư vấn và theo sát khách hàng suốt ngày đêm theo đúng kịch bản bán hàng của bạn.",
    features: ["Tư vấn đúng nhu cầu", "Chốt đơn tự động", "Tổng hợp khách tiềm năng"],
    price: 999000,
    industries: ["Thời trang", "Mỹ phẩm", "Nhà hàng – F&B", "Kinh doanh online"],
    image: minhAnhAsset.url,
  },
  {
    id: "edit-video",
    name: "Linh Chi AI",
    role: "Chuyên viên Edit video",
    specialty: "Short video · Reels · TikTok",
    description:
      "Biến tư liệu thô thành video ngắn chỉn chu, có phụ đề, nhạc và nhịp dựng phù hợp.",
    features: ["Cắt ghép tự động", "Chèn phụ đề và nhạc", "Xuất đúng tỉ lệ nền tảng"],
    price: 599000,
    industries: ["Du lịch", "Sức khỏe", "Kinh doanh online", "Giáo dục"],
    image: linhChiAsset.url,
  },
  {
    id: "viral-facebook-reel-maker",
    name: "Viral Reel Maker",
    role: "Skill Xây kênh & Edit video",
    specialty: "Facebook Reels · Video 9:16 · Lên lịch",
    description:
      "Phân tích kênh mẫu, chọn tư liệu chưa dùng, dựng Reel có chữ, nhạc và logo, kiểm tra chất lượng và chuẩn bị lịch đăng.",
    features: [
      "Phân tích cấu trúc nội dung hiệu quả",
      "Dựng video 1080x1920 có caption",
      "Chuẩn bị caption và lịch đăng Facebook",
    ],
    price: 100000,
    industries: [
      "Kinh doanh online",
      "Thời trang",
      "Mỹ phẩm",
      "Nhà hàng – F&B",
      "Giáo dục",
      "Du lịch",
    ],
    image: agentCoverAsset.url,
  },
  {
    id: "hoan-doi-nhan-vat-thuong-hieu",
    name: "Hoán Đổi Nhân Vật",
    role: "Skill Hình ảnh thương hiệu",
    specialty: "Face Lock · Outfit Lock · Ảnh tham chiếu",
    description:
      "Đưa nhân vật thương hiệu vào bối cảnh ảnh tham chiếu, giữ ổn định gương mặt, trang phục, bố cục, góc máy và ánh sáng.",
    features: [
      "Khóa gương mặt và trang phục thương hiệu",
      "Bám sát bối cảnh và góc máy gốc",
      "Tạo bộ ảnh nhất quán từ nhiều tham chiếu",
    ],
    price: 100000,
    industries: ["Thời trang", "Mỹ phẩm", "Du lịch", "Kinh doanh online"],
    image: skillVestCoverAsset.url,
  },
  {
    id: "multishot-gpt-image-2",
    name: "Multishot GPT Image 2",
    role: "Skill Storyboard & Multishot",
    specialty: "9 góc quay · Storyboard · Video prompt",
    description:
      "Tạo nhiều góc quay 9:16 hoặc storyboard điện ảnh nhất quán từ một ảnh, có khóa gương mặt, trang phục và bối cảnh.",
    features: [
      "Tạo Multishot nhiều góc quay riêng",
      "Storyboard có trình tự hành động rõ ràng",
      "Prompt video cho Omni hoặc Seedance",
    ],
    price: 100000,
    industries: ["Thời trang", "Mỹ phẩm", "Du lịch", "Kinh doanh online"],
    image: skillVestCoverAsset.url,
  },
  {
    id: "product-photo-concept-creator",
    name: "Product Poster Creator",
    role: "Skill Poster sản phẩm",
    specialty: "10 poster · Quảng cáo · Ảnh sản phẩm",
    description:
      "Phân tích sản phẩm như một art director và tạo bộ 10 poster chuyên nghiệp, đa dạng bố cục nhưng giữ nguyên bao bì, logo và nhãn.",
    features: [
      "Bộ 10 concept poster đồng nhất",
      "Khóa hình dáng, bao bì và logo sản phẩm",
      "Đa dạng ánh sáng và mục tiêu bán hàng",
    ],
    price: 100000,
    industries: ["Mỹ phẩm", "Thời trang", "Nhà hàng – F&B", "Kinh doanh online"],
    image: skillVestCoverAsset.url,
  },
  {
    id: "san-xuat-video-google-flow",
    name: "Video Google Flow",
    role: "Skill Sản xuất video",
    specialty: "Storyboard · Flow/Veo · Ghép cảnh",
    description:
      "Biến storyboard và ảnh khóa nhân vật hoặc sản phẩm thành các clip liên tục trong Google Flow, kèm prompt theo từng cảnh.",
    features: [
      "Phân tích từng panel storyboard",
      "Viết prompt riêng cho từng cảnh",
      "Kiểm tra continuity và ghép video",
    ],
    price: 100000,
    industries: ["Mỹ phẩm", "Thời trang", "Du lịch", "Giáo dục", "Kinh doanh online"],
    image: skillVestCoverAsset.url,
  },
  {
    id: "facebook-comment-natural-reply",
    name: "Chăm Sóc Bình Luận",
    role: "Skill Chăm sóc khách hàng",
    specialty: "Facebook · Phản hồi tự nhiên · Không lặp",
    description:
      "Hỗ trợ trả lời hàng loạt bình luận Facebook bằng giọng tự nhiên, đa dạng và phù hợp từng loại câu hỏi của khách hàng.",
    features: [
      "Phân loại lời khen, câu hỏi và xin tài liệu",
      "Phản hồi đa dạng, tránh lặp khuôn mẫu",
      "Không tự bịa link, giá hoặc chính sách",
    ],
    price: 100000,
    industries: ["Kinh doanh online", "Giáo dục", "Mỹ phẩm", "Thời trang"],
    image: skillVestCoverAsset.url,
  },
  {
    id: "content-research-ideas",
    name: "Nghiên Cứu Nội Dung",
    role: "Skill Nghiên cứu chủ đề",
    specialty: "Trend · Đối thủ · Ý tưởng tuần/tháng",
    description:
      "Nghiên cứu chủ đề, xu hướng và kênh đối thủ để tạo danh sách ý tưởng cụ thể cho Facebook và YouTube.",
    features: [
      "Tìm chủ đề và xu hướng phù hợp",
      "Phân tích nội dung của đối thủ",
      "Lập danh sách ý tưởng theo tuần hoặc tháng",
    ],
    price: 100000,
    industries: ["Kinh doanh online", "Giáo dục", "Du lịch", "Sức khỏe"],
    image: skillVestCoverAsset.url,
  },
  {
    id: "youtube-full-seo",
    name: "SEO YouTube Toàn Diện",
    role: "Skill SEO YouTube",
    specialty: "Tiêu đề · Mô tả · Từ khóa · Timeline",
    description:
      "Chuẩn hóa và tối ưu video YouTube từ tiêu đề, mô tả, từ khóa đến timeline, thẻ, màn hình kết thúc và hashtag.",
    features: [
      "SEO đầy đủ cho video mới",
      "Chuẩn hóa mô tả và khối liên hệ",
      "Tối ưu từ khóa, thẻ và màn hình kết thúc",
    ],
    price: 100000,
    industries: ["Kinh doanh online", "Giáo dục", "Du lịch", "Sức khỏe"],
    image: skillVestCoverAsset.url,
  },
  {
    id: "social-photo-content-publisher",
    name: "Social Photo Publisher",
    role: "Skill Xây kênh hình ảnh",
    specialty: "TikTok · Facebook · Ảnh & Caption",
    description:
      "Phân tích kênh, tạo bài ảnh từ tư liệu thật, chèn chữ, viết caption, chọn nhạc và chuẩn bị đăng hoặc lên lịch.",
    features: [
      "Phân tích kênh và định dạng nội dung",
      "Tạo ảnh bài đăng và caption tự nhiên",
      "Chuẩn bị nhạc, lịch đăng và duyệt bài",
    ],
    price: 100000,
    industries: ["Thời trang", "Mỹ phẩm", "Nhà hàng – F&B", "Du lịch", "Kinh doanh online"],
    image: skillVestCoverAsset.url,
  },
  {
    id: "subagent-tao-video",
    name: "Subagent Tạo Video",
    role: "Skill Tạo video tự động",
    specialty: "Google Flow · Cameo · TVC không thoại",
    description:
      "Tự vận hành Google Flow từ ảnh Cameo và bối cảnh để tạo, kiểm tra và mở các video TVC không thoại cho người dùng.",
    features: [
      "Tạo hoặc tiếp tục dự án Google Flow",
      "Khóa nhận diện Cameo và bối cảnh",
      "Kiểm tra chất lượng và tạo lại cảnh lỗi",
    ],
    price: 100000,
    industries: ["Mỹ phẩm", "Thời trang", "Du lịch", "Kinh doanh online"],
    image: skillVestCoverAsset.url,
  },
  {
    id: "uyen-linh-model",
    name: "Uyên Linh Model",
    role: "Skill Thương hiệu cá nhân",
    specialty: "Poster · Banner · Thumbnail · Landing page",
    description:
      "Xây dựng hệ hình ảnh thương mại nhất quán cho thương hiệu cá nhân, từ poster và thumbnail đến bộ ảnh trang bán hàng.",
    features: [
      "Khóa nhân vật và phong cách thương hiệu",
      "Tạo poster, banner và thumbnail",
      "Định hướng hình ảnh cho landing page",
    ],
    price: 100000,
    industries: ["Giáo dục", "Thời trang", "Mỹ phẩm", "Kinh doanh online"],
    image: skillVestCoverAsset.url,
  },
  {
    id: "videoviral",
    name: "Video Viral",
    role: "Skill Video dọc viral",
    specialty: "TikTok · Reels · Shorts · MP4",
    description:
      "Biến ý tưởng, văn bản hoặc URL thành video dọc hoàn chỉnh có tư liệu thật, phụ đề rõ, dữ kiện có nguồn và motion nhẹ.",
    features: [
      "Video tin tức, review hoặc giới thiệu",
      "Phụ đề karaoke và chữ tiếng Việt chuẩn",
      "Xuất MP4 dọc 1080x1920 chất lượng cao",
    ],
    price: 100000,
    industries: ["Du lịch", "Giáo dục", "Sức khỏe", "Kinh doanh online"],
    image: skillVestCoverAsset.url,
  },
  {
    id: "tao-trang-ban-hang",
    name: "Gia Hân AI",
    role: "Chuyên viên Trang bán hàng",
    specialty: "Landing page · Nội dung chuyển đổi",
    description:
      "Lên cấu trúc, viết nội dung và hoàn thiện trang bán hàng theo nhận diện thương hiệu.",
    features: ["Bố cục theo ngành hàng", "Nội dung bán hàng", "Nút gọi hành động và biểu mẫu"],
    price: 799000,
    industries: ["Thời trang", "Mỹ phẩm", "Bất động sản", "Giáo dục"],
    image: giaHanAsset.url,
  },
  {
    id: "san-xuat-hinh-anh",
    name: "Thảo Vy AI",
    role: "Chuyên viên Hình ảnh",
    specialty: "Ảnh sản phẩm · Social · Thương hiệu",
    description:
      "Sản xuất bộ ảnh đồng bộ phong cách, phù hợp bán hàng và truyền thông đa nền tảng.",
    features: ["Ảnh sản phẩm thu hút", "Bộ ảnh social đồng bộ", "Tùy biến phong cách thương hiệu"],
    price: 499000,
    industries: ["Mỹ phẩm", "Thời trang", "Nhà hàng – F&B"],
    image: thaoVyAsset.url,
  },
  {
    id: "tao-video",
    name: "Ngọc Mai AI",
    role: "Chuyên viên Tạo video",
    specialty: "Video quảng cáo · Video giới thiệu",
    description:
      "Chuyển ý tưởng hoặc bài viết thành video quảng cáo hoàn chỉnh với giọng đọc tự nhiên.",
    features: ["Video từ ý tưởng", "Giọng đọc AI tiếng Việt", "Nhiều phiên bản thử nghiệm"],
    price: 699000,
    industries: ["Mỹ phẩm", "Bất động sản", "Du lịch", "Kinh doanh online"],
    image: ngocMaiAsset.url,
  },
  {
    id: "cham-soc-khach-hang",
    name: "Hà My AI",
    role: "Chuyên viên Chăm sóc khách hàng",
    specialty: "Giải đáp · Tra cứu · Chăm sóc sau bán",
    description:
      "Phản hồi khách nhanh chóng, tra cứu thông tin và chăm sóc sau bán như một nhân sự trực tuyến.",
    features: ["Phản hồi tức thì", "Tra cứu đơn và nhắc lịch", "Chăm sóc sau bán định kỳ"],
    price: 299000,
    industries: ["Thời trang", "Nhà hàng – F&B", "Sức khỏe", "Bất động sản"],
    image: haMyAsset.url,
  },
  {
    id: "nhan-tin-hang-loat",
    name: "Thanh Trúc AI",
    role: "Chuyên viên Nhắn tin hàng loạt",
    specialty: "Chăm sóc · Remarketing · Phân nhóm",
    description:
      "Gửi đúng nội dung đến đúng nhóm khách hàng theo lịch trình, đồng thời theo dõi phản hồi.",
    features: ["Phân nhóm khách tự động", "Gửi theo lịch trình", "Báo cáo tỉ lệ phản hồi"],
    price: 299000,
    industries: ["Kinh doanh online", "Giáo dục", "Mỹ phẩm", "Sức khỏe"],
    image: thanhTrucAsset.url,
  },
];

const PRICE_OPTIONS = [
  { label: "Gói mua + Video hướng dẫn cài", desc: "Nhận gói Agent kèm video hướng dẫn tự cài đặt" },
  { label: "Cài trực tiếp", desc: "Người cài Agent thiết lập trọn gói cho bạn, thêm 10%" },
];

function formatVnd(amount: number) {
  return `${amount.toLocaleString("vi-VN")}đ`;
}

function OrderDialog({
  selection,
  directInstall,
  onClose,
}: {
  selection: string;
  directInstall: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const delivery = directInstall ? "Cài trực tiếp (+10%)" : "Gói mua + Video hướng dẫn cài";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, contact, selection, delivery, note, website }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Không thể gửi yêu cầu. Vui lòng thử lại.");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Không thể gửi yêu cầu. Vui lòng thử lại.",
      );
    }
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Gửi yêu cầu qua Telegram"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng biểu mẫu"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-border"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "success" ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-7 w-7" />
            </div>
            <h2 className="mt-5 font-display text-3xl font-bold text-foreground">Đã gửi yêu cầu</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Thông tin đã được chuyển đến Telegram. Đội ngũ sẽ liên hệ với bạn sớm nhất.
            </p>
            <Button type="button" onClick={onClose} className="mt-6 rounded-full px-8">
              Hoàn tất
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-xs font-bold uppercase tracking-wider text-gold">
              Gửi thẳng đến Telegram
            </p>
            <h2 className="mt-1 pr-8 font-display text-3xl font-bold text-foreground">
              Đăng ký tuyển nhân sự AI
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Điền thông tin, yêu cầu sẽ được gửi ngay cho người phụ trách.
            </p>

            <div className="mt-5 rounded-lg border border-primary/20 bg-primary/5 p-3">
              <p className="text-xs font-semibold text-muted-foreground">Đang chọn</p>
              <p className="font-bold text-foreground">{selection}</p>
              <p className="mt-0.5 text-xs text-primary">{delivery}</p>
            </div>

            <div className="mt-5 grid gap-4">
              <label className="grid gap-1.5 text-sm font-semibold text-foreground">
                Họ và tên
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={80}
                  placeholder="Tên của bạn"
                  className="rounded-lg border border-border bg-background px-4 py-3 font-normal outline-none transition-colors focus:border-primary"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold text-foreground">
                Số điện thoại hoặc tài khoản Telegram
                <input
                  required
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  maxLength={120}
                  placeholder="Ví dụ: 0901 234 567 hoặc @ten_telegram"
                  className="rounded-lg border border-border bg-background px-4 py-3 font-normal outline-none transition-colors focus:border-primary"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold text-foreground">
                Yêu cầu của bạn
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  maxLength={800}
                  rows={4}
                  placeholder="Mô tả công việc hoặc mong muốn của bạn..."
                  className="resize-none rounded-lg border border-border bg-background px-4 py-3 font-normal outline-none transition-colors focus:border-primary"
                />
              </label>
              <input
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                aria-hidden="true"
                className="hidden"
              />
            </div>

            {status === "error" && (
              <p
                role="alert"
                className="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
              >
                {errorMessage}
              </p>
            )}

            <Button
              type="submit"
              disabled={status === "sending"}
              className="mt-5 w-full rounded-full"
            >
              {status === "sending" ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {status === "sending" ? "Đang gửi..." : "Gửi yêu cầu qua Telegram"}
            </Button>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              Thông tin chỉ được dùng để liên hệ tư vấn yêu cầu này.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Header({ onOrder }: { onOrder: () => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-baseline">
          <span className="font-script text-3xl font-bold leading-none text-primary">
            Thi Thi Model AI
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#nganh-nghe" className="transition-colors hover:text-primary">
            Ngành nghề
          </a>
          <a href="#nhan-su" className="transition-colors hover:text-primary">
            Nhân sự AI
          </a>
          <a href="#combo" className="transition-colors hover:text-primary">
            Combo 999K
          </a>
          <a href="#nguoi-cai" className="transition-colors hover:text-primary">
            Người cài
          </a>
        </nav>
        <Button
          type="button"
          onClick={onOrder}
          className="rounded-full bg-pink-500 px-5 text-white hover:bg-pink-600"
        >
          Mua Ngay
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-band-cream px-4 py-5 sm:px-6 sm:py-7">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-border shadow-md">
        <img
          src={coverAsset.url}
          alt="Nhân Sự Agent – Quên Ăn Quên Ngủ Vì Sếp"
          className="block w-full"
        />
        {/* Lớp phủ tan biến phía trên để chữ nổi bật */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-background/85 via-background/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4 sm:pb-5">
          <p className="rounded-full bg-primary px-5 py-1.5 font-display text-sm font-black uppercase tracking-wide text-primary-foreground shadow-lg sm:text-base">
            Tuyển Nhân sự AI · Làm việc 24/7 · Chỉ từ 299K
          </p>
        </div>
      </div>
    </section>
  );
}

function SearchSection({
  query,
  setQuery,
  industry,
  setIndustry,
}: {
  query: string;
  setQuery: (value: string) => void;
  industry: string | null;
  setIndustry: (value: string | null) => void;
}) {
  return (
    <section id="nganh-nghe" className="border-y border-border/60 bg-card">
      <div className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6 sm:py-12">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Tìm nhân sự AI theo ngành nghề
        </h2>
        <div className="mt-7 flex items-center gap-3 rounded-full border border-border bg-background px-5 py-3 shadow-sm focus-within:border-primary/60">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm theo chuyên môn, công việc hoặc ngành nghề..."
            aria-label="Tìm nhân sự AI"
            className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {INDUSTRIES.map((name) => {
            const active = industry === name;
            return (
              <Button
                key={name}
                type="button"
                size="sm"
                variant={active ? "default" : "outline"}
                onClick={() => setIndustry(active ? null : name)}
                className="rounded-full"
              >
                {name}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AgentDetail({
  agent,
  directInstall,
  setDirectInstall,
  onClose,
  onOrder,
}: {
  agent: AgentProfile;
  directInstall: boolean;
  setDirectInstall: (value: boolean) => void;
  onClose: () => void;
  onOrder: (selection: string) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Hồ sơ ${agent.name}`}
      onClick={onClose}
    >
      <div
        className="relative grid w-full max-w-3xl overflow-hidden rounded-lg bg-card shadow-2xl md:grid-cols-2"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/85 text-foreground shadow-md backdrop-blur transition-colors hover:bg-background"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="relative max-h-[320px] overflow-hidden bg-muted md:max-h-none">
          <img
            src={agent.image}
            alt={`${agent.name} – ${agent.role}`}
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div className="flex flex-col p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-gold">{agent.role}</p>
          <h3 className="mt-1 font-display text-3xl font-black text-foreground">{agent.name}</h3>
          <p className="mt-1 text-sm font-semibold text-primary">{agent.specialty}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{agent.description}</p>
          <ul className="mt-4 space-y-2">
            {agent.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm font-medium text-foreground"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <p className="text-xs font-medium text-muted-foreground">Chạy trên nền tảng</p>
            <div className="mt-2 flex gap-2">
              <span className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary">
                <Bot className="h-3.5 w-3.5" />
                ChatGPT
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border border-gold/60 bg-gold/10 px-2.5 py-1 text-xs font-semibold text-foreground">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                Claude
              </span>
            </div>
          </div>
          <div className="mt-auto pt-6">
            <p className="text-xs font-semibold text-muted-foreground">Chọn hình thức nhận</p>
            <div className="mt-2 grid gap-2">
              {PRICE_OPTIONS.map((option, index) => {
                const active = (index === 1) === directInstall;
                const optionPrice = index === 0 ? agent.price : Math.round(agent.price * 1.1);
                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setDirectInstall(index === 1)}
                    className={`flex items-center justify-between gap-3 rounded-lg border p-3 text-left transition-colors ${active ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/50"}`}
                  >
                    <span className="flex items-start gap-2">
                      <span
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${active ? "border-primary bg-primary" : "border-border"}`}
                      >
                        {active && <Check className="h-3 w-3 text-primary-foreground" />}
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-foreground">
                          {option.label}
                        </span>
                        <span className="block text-xs text-muted-foreground">{option.desc}</span>
                      </span>
                    </span>
                    <span className="shrink-0 font-display text-lg font-black text-primary">
                      {formatVnd(optionPrice)}
                    </span>
                  </button>
                );
              })}
            </div>
            <Button
              type="button"
              onClick={() => {
                onClose();
                onOrder(agent.name);
              }}
              className="mt-4 w-full rounded-full bg-pink-500 text-white hover:bg-pink-600"
            >
              Mua Ngay
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentHall({
  query,
  industry,
  directInstall,
  setDirectInstall,
  onOrder,
}: {
  query: string;
  industry: string | null;
  directInstall: boolean;
  setDirectInstall: (value: boolean) => void;
  onOrder: (selection: string) => void;
}) {
  const [selected, setSelected] = useState<AgentProfile | null>(null);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return AGENTS.filter((agent) => {
      const matchesQuery =
        normalized === "" ||
        [agent.name, agent.role, agent.specialty, agent.description, ...agent.industries].some(
          (value) => value.toLowerCase().includes(normalized),
        );
      return matchesQuery && (industry === null || agent.industries.includes(industry));
    });
  }, [query, industry]);

  return (
    <section id="nhan-su" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Tuyển nhân sự AI theo chuyên môn
        </h2>
        <p className="mx-auto mt-3 max-w-xl font-semibold text-primary">
          Bấm vào từng nhân sự để xem hồ sơ chi tiết
        </p>
      </div>
      <div className="mt-8 flex justify-center">
        <div
          className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-border bg-card p-1 shadow-sm"
          role="group"
          aria-label="So sánh hai mức giá"
        >
          {[
            { label: "Gói mua + Video hướng dẫn cài", value: false },
            { label: "Cài trực tiếp (+10%)", value: true },
          ].map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => setDirectInstall(option.value)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors sm:text-sm ${directInstall === option.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          Không tìm thấy nhân sự phù hợp — hãy thử từ khóa khác.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((agent) => (
            <article
              key={agent.id}
              className="group flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
              onClick={() => setSelected(agent)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={agent.image}
                  alt={`${agent.name} – ${agent.role}`}
                  width={720}
                  height={960}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-gold" /> Sẵn sàng làm việc
                </span>
              </div>
              <div className="px-5 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                  {agent.role}
                </p>
                <h3 className="mt-0.5 font-display text-2xl font-bold text-foreground">
                  {agent.name}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-primary">{agent.specialty}</p>
              </div>
              <div className="mt-auto flex items-end justify-between gap-3 px-5 pb-5 pt-4">
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-muted-foreground">
                    {directInstall ? "Cài trực tiếp" : "Gói mua + Video hướng dẫn cài"}
                  </p>
                  <p className="font-display text-xl font-black text-primary">
                    {formatVnd(directInstall ? Math.round(agent.price * 1.1) : agent.price)}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {directInstall
                      ? `Gói + video: ${formatVnd(agent.price)}`
                      : `Cài trực tiếp: ${formatVnd(Math.round(agent.price * 1.1))}`}
                  </p>
                </div>
                <Button size="sm" variant="outline" className="rounded-full">
                  Xem hồ sơ
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
      {selected && (
        <AgentDetail
          agent={selected}
          directInstall={directInstall}
          setDirectInstall={setDirectInstall}
          onClose={() => setSelected(null)}
          onOrder={onOrder}
        />
      )}
    </section>
  );
}

function ComboSection({ onOrder }: { onOrder: (selection: string) => void }) {
  const combos: {
    title: string;
    icon: LucideIcon;
    includes: string[];
    members: { name: string; image: string }[];
  }[] = [
    {
      title: "Combo Xây Kênh",
      icon: Sparkles,
      includes: [
        "Chiến lược nội dung 30 ngày",
        "Kịch bản video theo ngành",
        "Hình ảnh và video đồng bộ",
      ],
      members: [
        { name: "An Nhiên AI", image: anNhienAsset.url },
        { name: "Linh Chi AI", image: linhChiAsset.url },
        { name: "Thảo Vy AI", image: thaoVyAsset.url },
      ],
    },
    {
      title: "Combo Sale",
      icon: ShoppingBag,
      includes: [
        "Tư vấn và chốt đơn 24/7",
        "Chăm sóc khách hàng tự động",
        "Nhắn tin remarketing đúng lịch",
      ],
      members: [
        { name: "Minh Anh AI", image: minhAnhAsset.url },
        { name: "Hà My AI", image: haMyAsset.url },
        { name: "Thanh Trúc AI", image: thanhTrucAsset.url },
      ],
    },
  ];
  return (
    <section id="combo" className="bg-band-red py-14 text-band-red-foreground sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <p className="font-script text-3xl text-gold">Hai combo chủ chốt</p>
          <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
            TUYỂN CẢ ĐỘI, TỐI ƯU CHI PHÍ
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {combos.map((combo) => {
            const Icon = combo.icon;
            return (
              <article
                key={combo.title}
                className="rounded-lg border border-band-red-foreground/20 bg-band-red-foreground/10 p-7"
              >
                <div className="grid grid-cols-3 gap-1.5 overflow-hidden rounded-md border border-band-red-foreground/25 bg-band-red-foreground/10 p-1.5">
                  {combo.members.map((member) => (
                    <img
                      key={member.name}
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="aspect-[3/4] w-full rounded-sm object-cover object-top"
                    />
                  ))}
                </div>
                <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wide text-band-red-foreground/70">
                  {combo.members.map((member) => member.name).join(" · ")}
                </p>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-band-red-foreground/70">Trọn gói chỉ</p>
                    <p className="font-display text-3xl font-black text-gold">999.000đ</p>
                  </div>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">{combo.title}</h3>
                <ul className="mt-4 space-y-2">
                  {combo.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm font-medium">
                      <Check className="h-4 w-4 shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => onOrder(combo.title)}
                  className="mt-6 w-full rounded-full"
                >
                  Chọn combo này
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function InstallerSection() {
  const steps = [
    {
      title: "Gửi yêu cầu tuyển",
      desc: "Chọn nhân sự AI hoặc combo phù hợp với công việc của bạn.",
    },
    {
      title: "Tư vấn và chốt hồ sơ",
      desc: "Đối chiếu ngành nghề và nền tảng cần dùng: ChatGPT hoặc Claude.",
    },
    {
      title: "Người cài Agent triển khai",
      desc: "Cài đặt, kết nối dữ liệu và nạp kịch bản làm việc cho từng nhân sự.",
    },
    {
      title: "Bàn giao trong 24 giờ",
      desc: "Nhân sự bắt đầu làm việc, kèm hướng dẫn sử dụng ngắn gọn.",
    },
  ];
  return (
    <section id="nguoi-cai" className="bg-band-cream px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="relative">
          <div className="overflow-hidden rounded-lg border border-border shadow-md">
            <img
              src={installerAsset.url}
              alt="Người cài Agent trực tiếp thiết lập nhân sự AI"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <p className="absolute bottom-3 left-3 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground shadow">
            Người cài Agent
          </p>
        </div>
        <div>
          <p className="font-script text-3xl text-primary">Giới thiệu ngắn</p>
          <h2 className="mt-1 font-display text-3xl font-bold text-foreground sm:text-4xl">
            CÓ NGƯỜI CÀI LO TỪ A ĐẾN Z
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Mỗi nhân sự AI đều do người cài Agent trực tiếp thiết lập: chọn đúng nền tảng ChatGPT
            hoặc Claude, nạp kịch bản theo ngành và chạy thử trước khi bàn giao. Bạn chỉ cần tuyển
            và nhận kết quả, phần cài đặt đã có người lo.
          </p>
          <ol className="mt-6 space-y-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold font-display text-sm font-black text-gold-foreground">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-bold text-foreground">{step.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function WhyBand() {
  const stats = [
    { icon: Clock, title: "Làm việc 24/7" },
    { icon: ShieldCheck, title: "Bàn giao trong 24 giờ" },
    { icon: Wallet, title: "Chỉ từ 299K" },
    { icon: Bot, title: "ChatGPT hoặc Claude" },
  ];
  return (
    <section className="bg-band-gold py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-band-gold-foreground sm:text-4xl">
            ĐỘI NGŨ GỌN HƠN, CÔNG VIỆC NHANH HƠN
          </h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="rounded-lg border border-band-gold-foreground/15 bg-background/40 p-6 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-band-gold-foreground">
                {title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground py-10 text-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center sm:px-6">
        <p className="font-script text-3xl font-bold text-primary">Thi Thi Model AI</p>
        <p className="text-xs text-background/50">© 2026 Thi Thi Model AI. All rights reserved.</p>
      </div>
    </footer>
  );
}

function Index() {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState<string | null>(null);
  const [directInstall, setDirectInstall] = useState(false);
  const [orderSelection, setOrderSelection] = useState<string | null>(null);
  return (
    <div id="top" className="min-h-screen bg-background">
      <Header onOrder={() => setOrderSelection("Tư vấn chọn nhân sự AI")} />
      <Hero />
      <SearchSection
        query={query}
        setQuery={setQuery}
        industry={industry}
        setIndustry={setIndustry}
      />
      <AgentHall
        query={query}
        industry={industry}
        directInstall={directInstall}
        setDirectInstall={setDirectInstall}
        onOrder={setOrderSelection}
      />
      <ComboSection onOrder={setOrderSelection} />
      <InstallerSection />
      <WhyBand />
      <Footer />
      {orderSelection && (
        <OrderDialog
          selection={orderSelection}
          directInstall={directInstall}
          onClose={() => setOrderSelection(null)}
        />
      )}
    </div>
  );
}
