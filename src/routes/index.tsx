import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Youtube,
  ShoppingBag,
  Clapperboard,
  Globe,
  ImagePlus,
  Video,
  Headset,
  Send,
  Search,
  Check,
  ArrowRight,
  Clock,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import coverAsset from "@/assets/agent-cover.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nhân Sự Agent – Sàn dịch vụ Cài Agent & Mua bán Agent tự động" },
      {
        name: "description",
        content:
          "Sàn dịch vụ cài đặt và mua bán Agent tự động làm việc: xây kênh, bán hàng, edit video, tạo trang bán hàng, sản xuất hình ảnh, tạo video, chăm sóc khách hàng, nhắn tin hàng loạt.",
      },
      {
        property: "og:title",
        content: "Nhân Sự Agent – Sàn dịch vụ Cài Agent & Mua bán Agent tự động",
      },
      {
        property: "og:description",
        content:
          "Nghề giá cao, không bao giờ 'lỗi thời'. Chọn Agent theo ngành nghề và để chúng tự chạy việc cho bạn 24/7.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type AgentCategory = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  price: string;
  industries: string[];
  icon: LucideIcon;
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

const CATEGORIES: AgentCategory[] = [
  {
    id: "xay-kenh",
    title: "Xây kênh",
    tagline: "Chuyên gia xây kênh TikTok, YouTube, Facebook",
    description:
      "Agent lập kế hoạch nội dung, viết kịch bản, đăng bài theo khung giờ vàng và tối ưu kênh hoàn toàn tự động.",
    features: ["Lịch đăng nội dung tự động", "Viết kịch bản theo ngành", "Phân tích & đề xuất từ khóa"],
    price: "2.900.000đ",
    industries: ["Kinh doanh online", "Giáo dục", "Du lịch", "Sức khỏe"],
    icon: Youtube,
  },
  {
    id: "ban-hang",
    title: "Bán hàng",
    tagline: "Nhân sự bán hàng chốt đơn 24/7",
    description:
      "Agent tư vấn, chốt đơn và đẩy giỏ hàng suốt cả ngày lẫn đêm, không bỏ sót một tin nhắn khách nào.",
    features: ["Tư vấn theo kịch bản bán hàng", "Chốt đơn & lên đơn tự động", "Báo cáo khách tiềm năng mỗi ngày"],
    price: "3.500.000đ",
    industries: ["Thời trang", "Mỹ phẩm", "Nhà hàng – F&B", "Kinh doanh online"],
    icon: ShoppingBag,
  },
  {
    id: "edit-video",
    title: "Edit video",
    tagline: "Dàn dựng video chuyên nghiệp theo yêu cầu",
    description:
      "Cắt ghép, chèn phụ đề, nhạc nền và chỉnh màu video tự động — đưa bạn chỉ cần ra prompt và nhận video hoàn chỉnh.",
    features: ["Cắt ghép & chèn phụ đề tự động", "Đồng bộ nhạc và hiệu ứng", "Xuất đúng tỉ lệ từng nền tảng"],
    price: "1.900.000đ",
    industries: ["Du lịch", "Sức khỏe", "Kinh doanh online", "Giáo dục"],
    icon: Clapperboard,
  },
  {
    id: "tao-trang-ban-hang",
    title: "Tạo trang bán hàng",
    tagline: "Landing page ra mắt chỉ trong vài phút",
    description:
      "Sinh trang bán hàng theo đúng màu sắc thương hiệu của bạn: layout, hình ảnh, nội dung và nút CTA đều được xử lý sẵn.",
    features: ["Layout theo ngành hàng", "Hình ảnh & nội dung tự viết", "Gắn CTA và form đơn hàng"],
    price: "2.500.000đ",
    industries: ["Thời trang", "Mỹ phẩm", "Bất động sản", "Giáo dục"],
    icon: Globe,
  },
  {
    id: "san-xuat-hinh-anh",
    title: "Sản xuất hình ảnh",
    tagline: "Bộ ảnh thương hiệu sản xuất hàng loạt",
    description:
      "Ảnh sản phẩm, ảnh mẫu, ảnh social đồng bộ phong cách thương hiệu — số lượng không giới hạn trong một cú bấm.",
    features: ["Ảnh sản phẩm đúng màu thật", "Bộ ảnh social đồng bộ", "Tùy biến phong cách theo prompt"],
    price: "1.500.000đ",
    industries: ["Mỹ phẩm", "Thời trang", "Nhà hàng – F&B"],
    icon: ImagePlus,
  },
  {
    id: "tao-video",
    title: "Tạo video",
    tagline: "Ý tưởng trở thành video quảng cáo",
    description:
      "Biến bài viết hoặc ý tưởng thành video quảng cáo, video giới thiệu sản phẩm với giọng đọc AI chuẩn Việt Nam.",
    features: ["Video quảng cáo từ bài viết", "Giọng đọc AI tự nhiên", "Đa phiên bản để chạy thử nghiệm"],
    price: "2.200.000đ",
    industries: ["Mỹ phẩm", "Bất động sản", "Du lịch", "Kinh doanh online"],
    icon: Video,
  },
  {
    id: "cham-soc-khach-hang",
    title: "Chăm sóc khách hàng",
    tagline: "Phòng CSKH không bao giờ ngủ",
    description:
      "Trả lời, tra cứu đơn, nhắc lịch và chăm sóc sau bán trên mọi kênh chat — trải nghiệm như có nhân sự thật trực máy.",
    features: ["Trả lời tức thì mọi kênh chat", "Tra cứu đơn & nhắc lịch", "Chăm sóc sau bán định kỳ"],
    price: "2.900.000đ",
    industries: ["Thời trang", "Nhà hàng – F&B", "Sức khỏe", "Bất động sản"],
    icon: Headset,
  },
  {
    id: "nhan-tin-hang-loat",
    title: "Nhắn tin hàng loạt",
    tagline: "Chạm hàng nghìn khách trong một phút",
    description:
      "Gửi tin nhắn chăm sóc và remarketing hàng nghìn khách mỗi ngày — đúng giờ, đúng đối tượng, đúng nội dung.",
    features: ["Chia nhóm đối tượng tự động", "Gửi đúng giờ lịch trình", "Báo cáo tỉ lệ phản hồi"],
    price: "1.800.000đ",
    industries: ["Kinh doanh online", "Giáo dục", "Mỹ phẩm", "Sức khỏe"],
    icon: Send,
  },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-script text-3xl leading-none text-primary">Thương Mai</span>
          <span className="font-display text-lg font-bold tracking-wide text-foreground uppercase">
            Nhân Sự Agent
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#nganh-nghe" className="transition-colors hover:text-primary">
            Ngành nghề
          </a>
          <a href="#san-agent" className="transition-colors hover:text-primary">
            Sảnh Agent
          </a>
          <a href="#cach-hoat-dong" className="transition-colors hover:text-primary">
            Cách hoạt động
          </a>
        </nav>
        <a
          href="#san-agent"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/30"
        >
          Đặt Agent ngay
        </a>
      </div>
    </header>
  );
}

function SearchSection({
  query,
  setQuery,
  industry,
  setIndustry,
}: {
  query: string;
  setQuery: (v: string) => void;
  industry: string | null;
  setIndustry: (v: string | null) => void;
}) {
  return (
    <section id="nganh-nghe" className="border-y border-border/60 bg-card">
      <div className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6 sm:py-12">
        <p className="font-script text-3xl text-primary">Tìm đúng người — không phải đón đúng giờ</p>
        <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Tìm Agent theo ngành nghề
        </h2>
        <div className="mt-7 flex items-center gap-3 rounded-full border border-border bg-background px-5 py-3 shadow-sm focus-within:border-primary/60">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm agent theo ngành nghề hoặc công việc..."
            className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {INDUSTRIES.map((name) => {
            const active = industry === name;
            return (
              <button
                key={name}
                onClick={() => setIndustry(active ? null : name)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-primary"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AgentHall({
  query,
  industry,
}: {
  query: string;
  industry: string | null;
}) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORIES.filter((c) => {
      const matchesQuery =
        q === "" ||
        c.title.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.industries.some((i) => i.toLowerCase().includes(q));
      const matchesIndustry = industry === null || c.industries.includes(industry);
      return matchesQuery && matchesIndustry;
    });
  }, [query, industry]);

  return (
    <section id="san-agent" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
      <div className="text-center">
        <p className="font-script text-3xl text-primary">Sảnh lựa chọn</p>
        <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Chọn Agent cho từng công việc
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Mỗi Agent là một nhân sự chuyên trách. Bạn chọn công việc, chúng tôi cài đặt và bàn giao trong 24 giờ.
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          Không tìm thấy agent phù hợp — hãy thử ngành nghề hoặc từ khóa khác.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.id}
                className="group flex flex-col rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-foreground">{c.title}</h3>
                <p className="mt-1 text-sm font-medium text-gold">{c.tagline}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {c.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Giá cài đặt từ</p>
                    <p className="font-display text-lg font-bold text-primary">{c.price}</p>
                  </div>
                  <button className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all group-hover:gap-2.5">
                    Đặt Agent
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function WhyBand() {
  const stats = [
    { icon: Clock, title: "24/7", desc: "Agent làm việc liên tục, không nghỉ lễ, không nghỉ tối" },
    { icon: ShieldCheck, title: "Cài đặt trong 24 giờ", desc: "Chọn Agent xong, chúng tôi cài và bàn giao ngay" },
    { icon: Wallet, title: "Chi phí nhân sự thật", desc: "Giá cài rõ ràng, không phát sinh phí ẩn hàng tháng" },
    { icon: ShoppingBag, title: "20+ ngành nghề", desc: "Từ mỹ phẩm, thời trang đến bất động sản, giáo dục" },
  ];
  return (
    <section className="bg-band-gold py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <p className="font-script text-3xl text-band-gold-foreground/80">Vì sao chọn Nhân Sự Agent</p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-band-gold-foreground sm:text-4xl">
            NGHỀ GIÁ CAO — KHÔNG BAO GIỜ "LỖI THỜI"
          </h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="rounded-3xl border border-band-gold-foreground/15 bg-background/40 p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-band-gold-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-band-gold-foreground/80">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Chọn Agent",
      desc: "Duyệt Sảnh Agent theo ngành nghề hoặc công việc, chọn đúng Agent bạn cần.",
    },
    {
      n: "02",
      title: "Cài đặt & bàn giao",
      desc: "Chúng tôi cài Agent vào hệ thống của bạn, cấu hình kịch bản theo ngành hàng riêng.",
    },
    {
      n: "03",
      title: "Agent tự chạy việc",
      desc: "Agent bắt đầu làm việc 24/7. Bạn theo dõi báo cáo và điều chỉnh khi cần.",
    },
  ];
  return (
    <section id="cach-hoat-dong" className="bg-band-red py-14 text-band-red-foreground sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <p className="font-script text-3xl text-band-red-foreground/80">Chỉ ba bước</p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            CÁCH HOẠT ĐỘNG
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-3xl border border-band-red-foreground/20 bg-band-red-foreground/10 p-7">
              <p className="font-display text-4xl font-black text-gold">{s.n}</p>
              <h3 className="mt-3 font-display text-2xl font-bold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-band-red-foreground/85">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="bg-band-cream py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="font-script text-4xl text-primary">Nhân sự không bao giờ "lỗi thời"</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Bắt đầu với Agent đầu tiên của bạn
        </h2>
        <p className="mt-3 text-muted-foreground">
          Chọn công việc cần thuê ngay hôm nay — Agent sẽ trực cho bạn trong vòng 24 giờ.
        </p>
        <a
          href="#san-agent"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:shadow-xl hover:shadow-primary/30"
        >
          Đặt Agent ngay
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground py-10 text-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center sm:px-6">
        <p className="flex items-baseline gap-2">
          <span className="font-script text-3xl text-gold">Thương Mai</span>
          <span className="font-display text-base font-bold tracking-wide uppercase">Nhân Sự Agent</span>
        </p>
        <p className="max-w-md text-sm text-background/70">
          Sàn dịch vụ cài đặt và mua bán Agent tự động làm việc — xây kênh, bán hàng, edit video, chăm sóc khách hàng
          và hơn thế nữa.
        </p>
        <p className="text-xs text-background/50">© 2026 Nhân Sự Agent. All rights reserved.</p>
      </div>
    </footer>
  );
}

function Index() {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState<string | null>(null);

  return (
    <div id="top" className="min-h-screen bg-background">
      <Header />

      {/* Ảnh bìa */}
      <section className="relative w-full">
        <img
          src={coverAsset.url}
          alt="Thương Mai – Nhân Sự Agent: Nghề giá cao, không bao giờ lỗi thời"
          className="w-full object-cover"
        />
      </section>

      <SearchSection query={query} setQuery={setQuery} industry={industry} setIndustry={setIndustry} />
      <AgentHall query={query} industry={industry} />
      <WhyBand />
      <HowItWorks />
      <CtaBand />
      <Footer />
    </div>
  );
}
