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
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import coverAsset from "@/assets/cover.png.asset.json";
import anNhienAsset from "@/assets/staff/an-nhien.jpg.asset.json";
import minhAnhAsset from "@/assets/staff/minh-anh.jpg.asset.json";
import linhChiAsset from "@/assets/staff/linh-chi.jpg.asset.json";
import giaHanAsset from "@/assets/staff/gia-han.jpg.asset.json";
import thaoVyAsset from "@/assets/staff/thao-vy.jpg.asset.json";
import ngocMaiAsset from "@/assets/staff/ngoc-mai.jpg.asset.json";
import haMyAsset from "@/assets/staff/ha-my.jpg.asset.json";
import thanhTrucAsset from "@/assets/staff/thanh-truc.jpg.asset.json";
import installerAsset from "@/assets/nguoi-cai-agent.png.asset.json";

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
    description: "Lên chiến lược nội dung, viết kịch bản và vận hành lịch đăng đều đặn cho thương hiệu.",
    features: ["Lập lịch nội dung 30 ngày", "Viết kịch bản theo ngành", "Phân tích chủ đề tiềm năng"],
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
    description: "Biến tư liệu thô thành video ngắn chỉn chu, có phụ đề, nhạc và nhịp dựng phù hợp.",
    features: ["Cắt ghép tự động", "Chèn phụ đề và nhạc", "Xuất đúng tỉ lệ nền tảng"],
    price: 599000,
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
    price: 799000,
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
    price: 499000,
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
    price: 699000,
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
    price: 299000,
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

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-script text-3xl leading-none text-primary">Thương Mai</span>
          <span className="hidden font-display text-base font-bold uppercase text-foreground sm:inline">Tuyển Nhân sự AI</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#nganh-nghe" className="transition-colors hover:text-primary">Ngành nghề</a>
          <a href="#nhan-su" className="transition-colors hover:text-primary">Nhân sự AI</a>
          <a href="#combo" className="transition-colors hover:text-primary">Combo 999K</a>
          <a href="#nguoi-cai" className="transition-colors hover:text-primary">Người cài</a>
        </nav>
        <Button asChild className="rounded-full px-5">
          <a href="#nhan-su">Tuyển ngay</a>
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

function SearchSection({ query, setQuery, industry, setIndustry }: {
  query: string;
  setQuery: (value: string) => void;
  industry: string | null;
  setIndustry: (value: string | null) => void;
}) {
  return (
    <section id="nganh-nghe" className="border-y border-border/60 bg-card">
      <div className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6 sm:py-12">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Tìm nhân sự AI theo ngành nghề</h2>
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

function AgentDetail({ agent, directInstall, setDirectInstall, onClose }: {
  agent: AgentProfile;
  directInstall: boolean;
  setDirectInstall: (value: boolean) => void;
  onClose: () => void;
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
          <img src={agent.image} alt={`${agent.name} – ${agent.role}`} className="h-full w-full object-cover object-top" />
        </div>
        <div className="flex flex-col p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-gold">{agent.role}</p>
          <h3 className="mt-1 font-display text-3xl font-black text-foreground">{agent.name}</h3>
          <p className="mt-1 text-sm font-semibold text-primary">{agent.specialty}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{agent.description}</p>
          <ul className="mt-4 space-y-2">
            {agent.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm font-medium text-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{feature}
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <p className="text-xs font-medium text-muted-foreground">Chạy trên nền tảng</p>
            <div className="mt-2 flex gap-2">
              <span className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary"><Bot className="h-3.5 w-3.5" />ChatGPT</span>
              <span className="inline-flex items-center gap-1 rounded-md border border-gold/60 bg-gold/10 px-2.5 py-1 text-xs font-semibold text-foreground"><Sparkles className="h-3.5 w-3.5 text-gold" />Claude</span>
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
                      <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${active ? "border-primary bg-primary" : "border-border"}`}>
                        {active && <Check className="h-3 w-3 text-primary-foreground" />}
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-foreground">{option.label}</span>
                        <span className="block text-xs text-muted-foreground">{option.desc}</span>
                      </span>
                    </span>
                    <span className="shrink-0 font-display text-lg font-black text-primary">{formatVnd(optionPrice)}</span>
                  </button>
                );
              })}
            </div>
            <Button className="mt-4 w-full rounded-full">Tuyển ngay<ArrowRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentHall({ query, industry, directInstall, setDirectInstall }: {
  query: string;
  industry: string | null;
  directInstall: boolean;
  setDirectInstall: (value: boolean) => void;
}) {
  const [selected, setSelected] = useState<AgentProfile | null>(null);
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
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Tuyển nhân sự AI theo chuyên môn</h2>
        <p className="mx-auto mt-3 max-w-xl font-semibold text-primary">Bấm vào từng nhân sự để xem hồ sơ chi tiết</p>
      </div>
      <div className="mt-8 flex justify-center">
        <div className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-border bg-card p-1 shadow-sm" role="group" aria-label="So sánh hai mức giá">
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
        <p className="mt-12 text-center text-muted-foreground">Không tìm thấy nhân sự phù hợp — hãy thử từ khóa khác.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((agent) => (
            <article
              key={agent.id}
              className="group flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
              onClick={() => setSelected(agent)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img src={agent.image} alt={`${agent.name} – ${agent.role}`} width={720} height={960} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-gold" /> Sẵn sàng làm việc
                </span>
              </div>
              <div className="px-5 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">{agent.role}</p>
                <h3 className="mt-0.5 font-display text-2xl font-bold text-foreground">{agent.name}</h3>
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
                    {directInstall ? `Gói + video: ${formatVnd(agent.price)}` : `Cài trực tiếp: ${formatVnd(Math.round(agent.price * 1.1))}`}
                  </p>
                </div>
                <Button size="sm" variant="outline" className="rounded-full">Xem hồ sơ<ArrowRight className="h-4 w-4" /></Button>
              </div>
            </article>
          ))}
        </div>
      )}
      {selected && <AgentDetail agent={selected} directInstall={directInstall} setDirectInstall={setDirectInstall} onClose={() => setSelected(null)} />}
    </section>
  );
}

function ComboSection() {
  const combos: { title: string; icon: LucideIcon; includes: string[]; members: { name: string; image: string }[] }[] = [
    {
      title: "Combo Xây Kênh",
      icon: Sparkles,
      includes: ["Chiến lược nội dung 30 ngày", "Kịch bản video theo ngành", "Hình ảnh và video đồng bộ"],
      members: [
        { name: "An Nhiên AI", image: anNhienAsset.url },
        { name: "Linh Chi AI", image: linhChiAsset.url },
        { name: "Thảo Vy AI", image: thaoVyAsset.url },
      ],
    },
    {
      title: "Combo Sale",
      icon: ShoppingBag,
      includes: ["Tư vấn và chốt đơn 24/7", "Chăm sóc khách hàng tự động", "Nhắn tin remarketing đúng lịch"],
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
          <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">TUYỂN CẢ ĐỘI, TỐI ƯU CHI PHÍ</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {combos.map((combo) => {
            const Icon = combo.icon;
            return (
              <article key={combo.title} className="rounded-lg border border-band-red-foreground/20 bg-band-red-foreground/10 p-7">
                <div className="grid grid-cols-3 gap-1.5 overflow-hidden rounded-md border border-band-red-foreground/25 bg-band-red-foreground/10 p-1.5">
                  {combo.members.map((member) => (
                    <img key={member.name} src={member.image} alt={member.name} loading="lazy" className="aspect-[3/4] w-full rounded-sm object-cover object-top" />
                  ))}
                </div>
                <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wide text-band-red-foreground/70">
                  {combo.members.map((member) => member.name).join(" · ")}
                </p>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground"><Icon className="h-6 w-6" /></div>
                  <div className="text-right"><p className="text-xs text-band-red-foreground/70">Trọn gói chỉ</p><p className="font-display text-3xl font-black text-gold">999.000đ</p></div>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">{combo.title}</h3>
                <ul className="mt-4 space-y-2">
                  {combo.includes.map((item) => <li key={item} className="flex items-center gap-2 text-sm font-medium"><Check className="h-4 w-4 shrink-0 text-gold" />{item}</li>)}
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

function InstallerSection() {
  const steps = [
    { title: "Gửi yêu cầu tuyển", desc: "Chọn nhân sự AI hoặc combo phù hợp với công việc của bạn." },
    { title: "Tư vấn và chốt hồ sơ", desc: "Đối chiếu ngành nghề và nền tảng cần dùng: ChatGPT hoặc Claude." },
    { title: "Người cài Agent triển khai", desc: "Cài đặt, kết nối dữ liệu và nạp kịch bản làm việc cho từng nhân sự." },
    { title: "Bàn giao trong 24 giờ", desc: "Nhân sự bắt đầu làm việc, kèm hướng dẫn sử dụng ngắn gọn." },
  ];
  return (
    <section id="nguoi-cai" className="bg-band-cream px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="relative">
          <div className="overflow-hidden rounded-lg border border-border shadow-md">
            <img src={installerAsset.url} alt="Người cài Agent trực tiếp thiết lập nhân sự AI" className="aspect-[4/5] w-full object-cover" />
          </div>
          <p className="absolute bottom-3 left-3 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground shadow">Người cài Agent</p>
        </div>
        <div>
          <p className="font-script text-3xl text-primary">Giới thiệu ngắn</p>
          <h2 className="mt-1 font-display text-3xl font-bold text-foreground sm:text-4xl">CÓ NGƯỜI CÀI LO TỪ A ĐẾN Z</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Mỗi nhân sự AI đều do người cài Agent trực tiếp thiết lập: chọn đúng nền tảng ChatGPT hoặc Claude, nạp kịch bản theo ngành và chạy thử trước khi bàn giao. Bạn chỉ cần tuyển và nhận kết quả, phần cài đặt đã có người lo.
          </p>
          <ol className="mt-6 space-y-3">
            {steps.map((step, index) => (
              <li key={step.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold font-display text-sm font-black text-gold-foreground">{index + 1}</span>
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
        <div className="text-center"><h2 className="font-display text-3xl font-bold text-band-gold-foreground sm:text-4xl">ĐỘI NGŨ GỌN HƠN, CÔNG VIỆC NHANH HƠN</h2></div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, title }) => (
            <div key={title} className="rounded-lg border border-band-gold-foreground/15 bg-background/40 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-4 font-display text-xl font-bold text-band-gold-foreground">{title}</h3>
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
        <p className="text-xs text-background/50">© 2026 Tuyển Nhân sự AI. All rights reserved.</p>
      </div>
    </footer>
  );
}

function Index() {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState<string | null>(null);
  const [directInstall, setDirectInstall] = useState(false);
  return (
    <div id="top" className="min-h-screen bg-background">
      <Header />
      <Hero />
      <SearchSection query={query} setQuery={setQuery} industry={industry} setIndustry={setIndustry} />
      <AgentHall query={query} industry={industry} directInstall={directInstall} setDirectInstall={setDirectInstall} />
      <ComboSection />
      <InstallerSection />
      <WhyBand />
      <Footer />
    </div>
  );
}
