import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  Clock,
  Headset,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import coverAsset from "@/assets/agent-cover.png.asset.json";
import anNhienAsset from "@/assets/staff/an-nhien.jpg.asset.json";
import minhAnhAsset from "@/assets/staff/minh-anh.jpg.asset.json";
import linhChiAsset from "@/assets/staff/linh-chi.jpg.asset.json";
import giaHanAsset from "@/assets/staff/gia-han.jpg.asset.json";
import thaoVyAsset from "@/assets/staff/thao-vy.jpg.asset.json";
import ngocMaiAsset from "@/assets/staff/ngoc-mai.jpg.asset.json";
import haMyAsset from "@/assets/staff/ha-my.jpg.asset.json";
import thanhTrucAsset from "@/assets/staff/thanh-truc.jpg.asset.json";

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
        content: "Chọn nhân sự theo chuyên môn, chạy trên ChatGPT hoặc Claude, bàn giao trong 24 giờ.",
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
  price: string;
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
    description: "Lên chiến lược nội dung, viết kịch bản và vận hành lịch đăng đều đặn cho thương hiệu.",
    features: ["Lập lịch nội dung 30 ngày", "Viết kịch bản theo ngành", "Phân tích chủ đề tiềm năng"],
    price: "999.000đ",
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
    price: "999.000đ",
    industries: ["Thời trang", "Mỹ phẩm", "Nhà hàng – F&B", "Kinh doanh online"],
    image: minhAnhAsset.url,
  },
  {
    id: "edit-video",
    name: "Linh Chi AI",
    role: "Chuyên viên Edit video",
    specialty: "Short video · Reels · TikTok",
    description: "Biến tư liệu thô thành video ngắn chỉn chu, có phụ đề, nhạc và nhịp dựng phù hợp.",
    features: ["Cắt ghép tự động", "Chèn phụ đề và nhạc", "Xuất đúng tỉ lệ nền tảng"],
    price: "599.000đ",
    industries: ["Du lịch", "Sức khỏe", "Kinh doanh online", "Giáo dục"],
    image: linhChiAsset.url,
  },
  {
    id: "tao-trang-ban-hang",
    name: "Gia Hân AI",
    role: "Chuyên viên Trang bán hàng",
    specialty: "Landing page · Nội dung chuyển đổi",
    description: "Lên cấu trúc, viết nội dung và hoàn thiện trang bán hàng theo nhận diện thương hiệu.",
    features: ["Bố cục theo ngành hàng", "Nội dung bán hàng", "Nút gọi hành động và biểu mẫu"],
    price: "799.000đ",
    industries: ["Thời trang", "Mỹ phẩm", "Bất động sản", "Giáo dục"],
    image: giaHanAsset.url,
  },
  {
    id: "san-xuat-hinh-anh",
    name: "Thảo Vy AI",
    role: "Chuyên viên Hình ảnh",
    specialty: "Ảnh sản phẩm · Social · Thương hiệu",
    description: "Sản xuất bộ ảnh đồng bộ phong cách, phù hợp bán hàng và truyền thông đa nền tảng.",
    features: ["Ảnh sản phẩm thu hút", "Bộ ảnh social đồng bộ", "Tùy biến phong cách thương hiệu"],
    price: "499.000đ",
    industries: ["Mỹ phẩm", "Thời trang", "Nhà hàng – F&B"],
    image: thaoVyAsset.url,
  },
  {
    id: "tao-video",
    name: "Ngọc Mai AI",
    role: "Chuyên viên Tạo video",
    specialty: "Video quảng cáo · Video giới thiệu",
    description: "Chuyển ý tưởng hoặc bài viết thành video quảng cáo hoàn chỉnh với giọng đọc tự nhiên.",
    features: ["Video từ ý tưởng", "Giọng đọc AI tiếng Việt", "Nhiều phiên bản thử nghiệm"],
    price: "699.000đ",
    industries: ["Mỹ phẩm", "Bất động sản", "Du lịch", "Kinh doanh online"],
    image: ngocMaiAsset.url,
  },
  {
    id: "cham-soc-khach-hang",
    name: "Hà My AI",
    role: "Chuyên viên Chăm sóc khách hàng",
    specialty: "Giải đáp · Tra cứu · Chăm sóc sau bán",
    description: "Phản hồi khách nhanh chóng, tra cứu thông tin và chăm sóc sau bán như một nhân sự trực tuyến.",
    features: ["Phản hồi tức thì", "Tra cứu đơn và nhắc lịch", "Chăm sóc sau bán định kỳ"],
    price: "799.000đ",
    industries: ["Thời trang", "Nhà hàng – F&B", "Sức khỏe", "Bất động sản"],
    image: haMyAsset.url,
  },
  {
    id: "nhan-tin-hang-loat",
    name: "Thanh Trúc AI",
    role: "Chuyên viên Nhắn tin hàng loạt",
    specialty: "Chăm sóc · Remarketing · Phân nhóm",
    description: "Gửi đúng nội dung đến đúng nhóm khách hàng theo lịch trình, đồng thời theo dõi phản hồi.",
    features: ["Phân nhóm khách tự động", "Gửi theo lịch trình", "Báo cáo tỉ lệ phản hồi"],
    price: "299.000đ",
    industries: ["Kinh doanh online", "Giáo dục", "Mỹ phẩm", "Sức khỏe"],
    image: thanhTrucAsset.url,
  },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-script text-3xl leading-none text-primary">Thương Mai</span>
          <span className="hidden font-display text-base font-bold text-foreground uppercase sm:inline">Tuyển Nhân sự AI</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#nganh-nghe" className="transition-colors hover:text-primary">Ngành nghề</a>
          <a href="#nhan-su" className="transition-colors hover:text-primary">Nhân sự AI</a>
          <a href="#combo" className="transition-colors hover:text-primary">Combo 999K</a>
        </nav>
        <Button asChild className="rounded-full px-5">
          <a href="#nhan-su">Tuyển ngay</a>
        </Button>
      </div>
    </header>
  );
}

function SearchSection({ query, setQuery, industry, setIndustry }: {
  query: string;
  setQuery: (value: string) => void;
  industry: string | null;
  setIndustry: (value: string | null) => void;
}) {
  return (
    <section id="nganh-nghe" className="border-y border-border/60 bg-card">
      <div className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6 sm:py-12">
        <p className="font-script text-3xl text-primary">Đúng người, đúng chuyên môn</p>
        <h2 className="mt-1 font-display text-3xl font-bold text-foreground sm:text-4xl">Tìm nhân sự AI theo ngành nghề</h2>
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

function AgentHall({ query, industry }: { query: string; industry: string | null }) {
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return AGENTS.filter((agent) => {
      const matchesQuery =
        normalized === "" ||
        [agent.name, agent.role, agent.specialty, agent.description, ...agent.industries]
          .some((value) => value.toLowerCase().includes(normalized));
      return matchesQuery && (industry === null || agent.industries.includes(industry));
    });
  }, [query, industry]);

  return (
    <section id="nhan-su" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
      <div className="text-center">
        <p className="font-script text-3xl text-primary">Đội ngũ sẵn sàng</p>
        <h2 className="mt-1 font-display text-3xl font-bold text-foreground sm:text-4xl">Tuyển nhân sự AI theo chuyên môn</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Mỗi nhân sự có chuyên môn riêng, làm việc trên ChatGPT hoặc Claude và được bàn giao trong 24 giờ.
        </p>
      </div>
      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">Không tìm thấy nhân sự phù hợp — hãy thử từ khóa khác.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((agent) => (
            <article key={agent.id} className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img src={agent.image} alt={`${agent.name} – ${agent.role}`} width={720} height={960} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-gold" /> Sẵn sàng làm việc
                </span>
                <div className="absolute inset-x-0 bottom-0 bg-background/35 p-4 pt-10 backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent,black_45%)]">
                  <p className="text-xs font-semibold uppercase text-gold drop-shadow-sm">{agent.role}</p>
                  <h3 className="mt-0.5 font-display text-2xl font-bold text-foreground drop-shadow-sm">{agent.name}</h3>
                  <p className="mt-0.5 text-sm font-medium text-primary">{agent.specialty}</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{agent.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {agent.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 border-t border-border pt-4">
                  <p className="text-xs font-medium text-muted-foreground">Chọn nền tảng vận hành</p>
                  <div className="mt-2 flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary"><Bot className="h-3.5 w-3.5" />ChatGPT</span>
                    <span className="inline-flex items-center gap-1 rounded-md border border-gold/60 bg-gold/10 px-2.5 py-1 text-xs font-semibold text-foreground"><Sparkles className="h-3.5 w-3.5 text-gold" />Claude</span>
                  </div>
                </div>
                <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                  <div>
                    <p className="text-xs text-muted-foreground">Phí tuyển dụng</p>
                    <p className="font-display text-xl font-bold text-primary">{agent.price}</p>
                  </div>
                  <Button size="sm" className="rounded-full">Tuyển ngay<ArrowRight className="h-4 w-4" /></Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function ComboSection() {
  const combos: { title: string; icon: LucideIcon; description: string; includes: string[] }[] = [
    {
      title: "Combo Xây Kênh",
      icon: Sparkles,
      description: "Bộ nhân sự AI giúp bạn xây và vận hành kênh nội dung từ ý tưởng đến xuất bản.",
      includes: ["Chiến lược nội dung 30 ngày", "Kịch bản video theo ngành", "Hình ảnh và video đồng bộ"],
    },
    {
      title: "Combo Sale",
      icon: ShoppingBag,
      description: "Bộ nhân sự AI theo sát hành trình bán hàng, từ tư vấn đến chăm sóc sau mua.",
      includes: ["Tư vấn và chốt đơn 24/7", "Chăm sóc khách hàng tự động", "Nhắn tin remarketing đúng lịch"],
    },
  ];
  return (
    <section id="combo" className="bg-band-red py-14 text-band-red-foreground sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <p className="font-script text-3xl text-gold">Hai combo chủ chốt</p>
          <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">TUYỂ CẢ ĐỘI, TỐI ƯU CHI PHÍ</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {combos.map((combo) => {
            const Icon = combo.icon;
            return (
              <article key={combo.title} className="rounded-lg border border-band-red-foreground/20 bg-band-red-foreground/10 p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground"><Icon className="h-6 w-6" /></div>
                  <div className="text-right"><p className="text-xs text-band-red-foreground/70">Trọn gói chỉ</p><p className="font-display text-3xl font-black text-gold">999.000đ</p></div>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">{combo.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-band-red-foreground/80">{combo.description}</p>
                <ul className="mt-5 space-y-2">
                  {combo.includes.map((item) => <li key={item} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 shrink-0 text-gold" />{item}</li>)}
                </ul>
                <Button asChild variant="secondary" className="mt-6 w-full rounded-full"><a href="#nhan-su">Chọn combo này<ArrowRight className="h-4 w-4" /></a></Button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyBand() {
  const stats = [
    { icon: Clock, title: "Làm việc 24/7", desc: "Luôn sẵn sàng xử lý công việc, kể cả ngoài giờ hành chính" },
    { icon: ShieldCheck, title: "Bàn giao trong 24 giờ", desc: "Cài đặt, cấu hình và hướng dẫn vận hành rõ ràng" },
    { icon: Wallet, title: "Từ 299K", desc: "Chi phí minh bạch, phù hợp cả cá nhân lẫn doanh nghiệp" },
    { icon: Bot, title: "2 nền tảng", desc: "Linh hoạt lựa chọn ChatGPT hoặc Claude theo nhu cầu" },
  ];
  return (
    <section className="bg-band-gold py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center"><p className="font-script text-3xl text-band-gold-foreground/80">Vì sao nên tuyển nhân sự AI</p><h2 className="mt-1 font-display text-3xl font-bold text-band-gold-foreground sm:text-4xl">ĐỘI NGŨ GỌN HƠN, CÔNG VIỆC NHANH HƠN</h2></div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-lg border border-band-gold-foreground/15 bg-background/40 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-4 font-display text-xl font-bold text-band-gold-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-band-gold-foreground/80">{desc}</p>
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
        <p className="flex items-baseline gap-2"><span className="font-script text-3xl text-gold">Thương Mai</span><span className="font-display text-base font-bold uppercase">Tuyển Nhân sự AI</span></p>
        <p className="max-w-lg text-sm text-background/70">Nơi bạn tìm và tuyển đúng nhân sự AI cho từng công việc — làm việc 24/7 trên ChatGPT hoặc Claude.</p>
        <p className="text-xs text-background/50">© 2026 Tuyển Nhân sự AI. All rights reserved.</p>
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
      <section className="bg-band-cream px-4 py-5 sm:px-6 sm:py-7">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-border bg-card shadow-md">
          <img src={coverAsset.url} alt="Tuyển Nhân sự AI – Nghề giá cao, không bao giờ lỗi thời" className="block max-h-[420px] w-full object-contain" />
        </div>
      </section>
      <SearchSection query={query} setQuery={setQuery} industry={industry} setIndustry={setIndustry} />
      <AgentHall query={query} industry={industry} />
      <ComboSection />
      <WhyBand />
      <Footer />
    </div>
  );
}