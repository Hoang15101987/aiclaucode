---
name: video-editor-phong-menly
description: Sử dụng skill này khi anh muốn edit video talking-head theo phong cách nền tối chuyên nghiệp. Kích hoạt khi anh nói "edit video này", "thêm slide vào video", "xử lý video cho tôi", hoặc kéo file .mp4 vào Claude Code. Skill tự động transcribe, phát hiện chỗ cần thêm slide, tạo animation Remotion, ghép webcam trái + slide phải, xuất file video hoàn chỉnh — anh không cần làm gì thêm.
---

# Video Editor — Phong Menly Style

## Mục tiêu
Nhận 1 file video .mp4 (anh nói chuyện vào camera) → xuất ra 1 file video hoàn chỉnh theo phong cách:
- **Webcam anh**: bên trái, chiếm ~40% chiều ngang
- **Slide minh họa**: bên phải, chiếm ~60% chiều ngang
- **Nền**: #0D1117 (navy đen)
- **Màu chủ đạo**: tím #7C3AED → hồng #EC4899 (gradient)
- **Slide tự động xuất hiện** đúng lúc anh nói nội dung liên quan
- **Không có chuột, không có click effect**

---

## Bước 1 — Cài đặt môi trường (chỉ làm 1 lần)

```bash
# Kiểm tra Node.js
node --version  # Cần >= 18

# Cài ffmpeg nếu chưa có
# Mac:
brew install ffmpeg
# Windows: tải từ https://ffmpeg.org/download.html

# Tạo thư mục project
mkdir remotion-video && cd remotion-video
npm init -y
npm install remotion @remotion/cli @remotion/bundler @remotion/renderer react react-dom
```

---

## Bước 2 — Transcribe video (tự động)

```bash
# Dùng Whisper để transcribe có timestamp
pip install openai-whisper --break-system-packages
whisper input.mp4 --output_format json --output_dir ./transcript --language Vietnamese
```

File output: `./transcript/input.json`
Format quan trọng: mỗi segment có `start`, `end`, `text`

---

## Bước 3 — Phân tích transcript → tìm chỗ cần slide

### Nguyên tắc quan trọng nhất
**Slide chỉ chiếm tối đa 25% tổng thời lượng video.**
Video 7 phút = 420 giây → slide xuất hiện tối đa 105 giây.
Agent phải tính tổng thời gian slide sau khi chọn xong — nếu vượt 25% thì cắt bớt, chỉ giữ những đoạn quan trọng nhất.

**Mặc định là KHÔNG thêm slide.** Chỉ thêm khi đáp ứng đủ cả 2 điều kiện:
1. Nội dung có dạng cấu trúc rõ ràng (so sánh / số liệu / danh sách / quy trình)
2. Người xem sẽ hiểu nhanh hơn và nhớ lâu hơn khi nhìn thấy slide

### Khi nào ĐƯỢC thêm slide
| Tình huống | Điều kiện bắt buộc | Loại slide |
|---|---|---|
| So sánh 2 thứ | Có ít nhất 3 điểm khác nhau rõ ràng | Bảng so sánh 2 cột |
| Liệt kê | Từ 3 điểm trở lên, mỗi điểm có nội dung riêng | Card grid |
| Số liệu / con số | Số liệu cụ thể, không phải ước tính | Badge + số |
| Tóm tắt cuối video | Chỉ 1 lần duy nhất, cuối video | Summary card |

### Khi nào KHÔNG thêm slide (hầu hết thời gian)
- Anh đang kể chuyện, chia sẻ kinh nghiệm
- Đang giải thích bằng lời đã đủ rõ
- Đang thao tác màn hình
- Đoạn chuyển tiếp, intro, outro
- Câu ngắn < 10 giây
- Nội dung cảm xúc, câu chốt triết lý
- Bất kỳ đoạn nào mà slide không thêm giá trị thật sự

### Kiểm tra trước khi confirm danh sách scenes
```
Tổng thời gian slide = tổng (endSec - startSec) của tất cả scenes
Nếu > 25% tổng video → xóa bớt scenes ít quan trọng nhất
Chỉ giữ lại 2-4 scenes cho video 7 phút
```

---

## Bước 4 — Tạo cấu trúc scenes JSON

Agent tự tạo file `scenes.json` từ transcript:

```json
[
  {
    "id": "scene_001",
    "type": "comparison",
    "startSec": 12.5,
    "endSec": 28.0,
    "data": {
      "title": "CLAUDE.md vs Skills",
      "left": {
        "label": "CLAUDE.md",
        "badge": "✗",
        "badgeColor": "#EF4444",
        "points": ["Load toàn bộ mỗi lần", "~1,000 tokens", "Dù cần hay không"]
      },
      "right": {
        "label": "Skills",
        "badge": "✓",
        "badgeColor": "#10B981",
        "points": ["Chỉ load tên + mô tả", "~50 tokens", "Mở khi cần dùng"]
      },
      "footer": "Skills tiết kiệm 20x token so với CLAUDE.md"
    }
  },
  {
    "id": "scene_002",
    "type": "cards_grid",
    "startSec": 45.0,
    "endSec": 72.0,
    "data": {
      "label": "TÓM TẮT",
      "title": "4 Điểm Quan Trọng Nhất",
      "cards": [
        {
          "number": "1",
          "heading": "Cắt bớt CLAUDE.md",
          "headingColor": "#7C3AED",
          "body": "Chỉ giữ 5% — những thứ AI thật sự không thể tự biết"
        },
        {
          "number": "2",
          "heading": "Dùng Skills đúng cách",
          "headingColor": "#7C3AED",
          "body": "Progressive Disclosure — AI chỉ load tên+mô tả khi bình thường"
        },
        {
          "number": "3",
          "heading": "Build Skill từ Context thật",
          "headingColor": "#EC4899",
          "body": "Chạy workflow trước → iterate → Fail = data quý → Cập nhật skill"
        },
        {
          "number": "4",
          "heading": "Scale chậm — từ 1 Agent",
          "headingColor": "#EC4899",
          "body": "Hiểu rõ trước khi mở rộng. Build từ dưới lên luôn tốt hơn"
        }
      ]
    }
  },
  {
    "id": "scene_003",
    "type": "text_card",
    "startSec": 90.0,
    "endSec": 115.0,
    "data": {
      "title": "Khái niệm cần biết",
      "heading": "Context Window là gì?",
      "rows": [
        { "icon": "🤖", "label": "System Prompt", "value": "~8K tokens", "color": "#7C3AED" },
        { "icon": "💬", "label": "Lịch sử hội thoại", "value": "tăng dần...", "color": "#EC4899" },
        { "icon": "📄", "label": "Code / Tài liệu", "value": "biến thiên", "color": "#06B6D4" },
        { "icon": "🔧", "label": "Tools & Skills", "value": "~5-15K tokens", "color": "#F59E0B" }
      ],
      "footer": "Tổng ngay từ đầu (chưa làm gì): 20-30K tokens"
    }
  }
]
```

---

## Bước 5 — Viết code Remotion

Agent tạo file `src/VideoComposition.tsx`:

### Layout cố định (không thay đổi)
```
┌─────────────────────────────────────────────────────┐
│  WEBCAM (40%)          │  SLIDE (60%)               │
│                        │                            │
│  [mặt anh nói]         │  [animation theo nội dung] │
│                        │                            │
│  nền: #0D1117          │  nền: #0D1117              │
└─────────────────────────────────────────────────────┘
```

### Quy tắc animation
- Slide **fade in** trong 0.3 giây khi bắt đầu đoạn
- Slide **fade out** trong 0.3 giây khi kết thúc đoạn
- Các phần tử trong slide **xuất hiện lần lượt** từ trên xuống, delay 0.15s mỗi cái
- Chữ highlight màu tím hoặc hồng — **không bao giờ dùng vàng hoặc đỏ**
- Badge (✓/✗) có nền tối, viền mỏng

### Design tokens
```css
--bg: #0D1117
--surface: #161B27
--surface-2: #1E2538
--purple: #7C3AED
--pink: #EC4899
--cyan: #06B6D4
--green: #10B981
--red: #EF4444
--text-primary: #FFFFFF
--text-secondary: #94A3B8
--border: rgba(255,255,255,0.08)
--radius: 12px
--font: 'Inter', sans-serif
```

---

## Bước 6 — Render và ghép video

```bash
# Render từng scene animation (không có audio)
npx remotion render src/index.ts VideoComposition ./renders/scene_001.mp4 \
  --props='{"sceneId":"scene_001"}' \
  --frames=0-450

# Ghép webcam + slide bằng ffmpeg
# Layout: webcam trái 40%, slide phải 60%
ffmpeg -i input.mp4 -i renders/scene_001.mp4 \
  -filter_complex "
    [0:v]scale=768:1080,setpts=PTS-STARTPTS[webcam];
    [1:v]scale=1152:1080,setpts=PTS-STARTPTS[slide];
    [webcam][slide]hstack=inputs=2[v]
  " \
  -map "[v]" -map "0:a" \
  -ss 12.5 -to 28.0 \
  -c:v libx264 -c:a aac \
  output_scene_001.mp4

# Ghép tất cả scenes lại thành 1 video hoàn chỉnh
# (Agent tự tạo script ffmpeg concat từ scenes.json)
ffmpeg -f concat -safe 0 -i concat_list.txt \
  -c:v libx264 -c:a aac \
  final_output.mp4
```

---

## Bước 7 — Kiểm tra trước khi xuất

Agent tự kiểm tra:
- [ ] Slide xuất hiện đúng timestamp với lời nói
- [ ] Không có slide nào che đoạn thao tác màn hình
- [ ] Webcam anh luôn hiển thị bên trái, rõ mặt
- [ ] Audio từ video gốc không bị cắt hay bị lệch
- [ ] File output đúng resolution 1920x1080

---

## Các loại slide Agent có thể tạo

### 1. `comparison` — So sánh 2 cột
Dùng khi: "X vs Y", "khác với", "tốt hơn/tệ hơn"
Badge ✗ đỏ bên trái (cái sai), Badge ✓ xanh bên phải (cái đúng)

### 2. `cards_grid` — Grid 2x2
Dùng khi: liệt kê 3-4 điểm quan trọng, tóm tắt cuối video
Label nhỏ phía trên (màu tím), tiêu đề lớn, 4 card bo góc

### 3. `text_card` — Card text + rows
Dùng khi: giải thích khái niệm có nhiều thành phần
Mỗi row có icon + label + value, màu accent khác nhau

### 4. `highlight_statement` — Câu nổi bật
Dùng khi: kết luận mạnh, câu chốt quan trọng
Chữ lớn, 1-2 từ highlight màu tím hoặc hồng

### 5. `flow_diagram` — Sơ đồ luồng
Dùng khi: giải thích quy trình, các bước theo thứ tự
Các box nối nhau bằng mũi tên →

---

## Lệnh anh dùng trong Claude Code

```
"Edit video này cho tôi" + kéo file .mp4 vào
```

Hoặc:

```
"Xử lý video input.mp4, chủ đề là [tên chủ đề]"
```

Agent sẽ tự làm hết — anh chỉ cần chờ và nhận file `final_output.mp4`
