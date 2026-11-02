# Skill quyết định đời người (life-decision-guide)

Cho trợ lý AI trả lời câu hỏi cụ thể theo cuốn "Cẩm nang sống thông minh": có nên làm hay không, đáng không, chọn thế nào, chuyện xảy ra rồi thì làm gì trước, được hưởng khoản nào, làm thế có phạm luật không.

Nó chỉ làm đúng một việc: **tra mục liên quan trong sách trước, rồi trả lời theo cách tính của sách, đã xếp thứ tự**, mỗi câu ghi rõ "chương N mục M". Không tra được thì nói không tra được, không lấy trí nhớ ra bịa số.

Toàn bộ quy tắc nằm trong [SKILL.md](SKILL.md), hai công cụ dùng chung một file, không nuôi hai bản.

## Cài vào Claude Code

Mở Claude Code ngay trong repo này thì không phải cài — `.claude/skills/life-decision-guide/` đã trỏ về bộ quy tắc này.

Muốn dùng được ở mọi thư mục thì chép vào thư mục skill cá nhân:

```bash
mkdir -p ~/.claude/skills/life-decision-guide && curl -fsSL -o ~/.claude/skills/life-decision-guide/SKILL.md "https://raw.githubusercontent.com/quangpao/HowToLiveBetter/vi/skills/life-decision-guide/SKILL.md"
```

Sau đó hỏi thẳng "đi làm xa hai tiếng mỗi ngày có đáng không", "bạn nhờ mình đứng ra bảo lãnh, có nên ký" là skill tự kích hoạt; cũng có thể nói rõ "trả lời bằng life-decision-guide".

## Cài vào Codex

Mở Codex ngay trong repo này thì không phải cài — `AGENTS.md` ở gốc repo đã chỉ tới nó.

Muốn dùng được ở mọi thư mục thì chép vào thư mục skill cá nhân của Codex, `~/.agents/skills`:

```bash
mkdir -p ~/.agents/skills/life-decision-guide && curl -fsSL -o ~/.agents/skills/life-decision-guide/SKILL.md "https://raw.githubusercontent.com/quangpao/HowToLiveBetter/vi/skills/life-decision-guide/SKILL.md"
```

Sau đó cứ hỏi là nó tự kích hoạt theo phần mô tả, cũng có thể gõ `$life-decision-guide` để gọi thẳng. Chú ý là `$` chứ không phải `/`: Codex bản mới gõ `/life-decision-guide` sẽ báo `Unrecognized command`. Không thấy gì thì khởi động lại Codex một lần.

Codex bản cũ chưa có skill, chỉ dùng được prompt tự tạo: đặt file vào `~/.codex/prompts/life-decision-guide.md` rồi gọi bằng `/life-decision-guide`. Codex đã thông báo bỏ cách này ([openai/codex#10848](https://github.com/openai/codex/issues/10848)), bản mới dùng cách cài bằng skill ở trên.

## Nội dung sách lấy từ đâu

Máy đang có repo này thì đọc `book/` ngay tại chỗ; không có thì lấy về:

```bash
git clone --depth 1 -b vi https://github.com/quangpao/HowToLiveBetter.git "${TMPDIR:-/tmp}/hltb"
```

Cả bộ gần 3 MB, clone nông mất vài giây. Không vào được mạng thì nói thật là không lấy được, không thay bằng nội dung khác.

## Ghi chú khi sửa

Trong SKILL.md không giữ danh sách hay con số nào trôi theo nội dung sách: danh sách chương thì đọc bảng "Cuốn sách này trả lời câu gì" trong README, cách tính mức đáng làm thì đọc hai dòng `COST_W` và `e.ratio` trong `index.html`. Vì vậy thêm bớt chương hay đổi quy tắc xếp mức đều không phải sửa thư mục này.
