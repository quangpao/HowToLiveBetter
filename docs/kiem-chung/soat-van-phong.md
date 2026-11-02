# Soát văn phong bằng CLI ngoài — nhật ký

Mục đích: sau khi nội dung và số liệu đã kiểm, nhờ hai công cụ khác đọc lại **văn phong và nghĩa câu chữ** cho người Việt. Nguyên tắc: **CLI chỉ đọc và báo cáo**, không sửa file; người điều phối là người áp bản sửa để cả cuốn sách giữ một giọng.

| | Codex CLI | Claude Code |
|---|---|---|
| Phiên bản | `codex-cli 0.162.1`, model `gpt-6.1-sol`, sandbox read-only | `2.1.316`, tài khoản `ddquangbao@gmail.com` |
| Cách gọi | `codex exec --skip-git-repo-check -C <repo> "<prompt>" > /tmp/review-codex-<ch>.md` | `claude -p "<prompt>" --allowedTools Read > /tmp/review-claude-<ch>.md` |
| Đầu ra | trace + **bảng markdown** ở cuối file (cần `grep "^|"` để lấy) | báo cáo gọn + bảng markdown ngay đầu file (chạy ~45 phút, `-p` chỉ ghi khi xong) |
| Phạm vi đã giao | chương 1 (48 mục) | chương 3 (27 mục) |

## Chương 1 — kết quả

- Codex trả **180 góp ý / 48 mục**: mỗi mục 2–8 dòng, 4 cột *mục · câu hiện tại · vấn đề · đề xuất*.
- Lọc tự động: **164** câu trích khớp nguyên văn trong file; **6** bị loại vì đề xuất chèn số mới; **10** không khớp (Codex trích có dấu `[]` hoặc gộp hai câu).
- Sau khi bỏ trùng còn **82** cặp sửa; áp được **80** (2 cặp bị bỏ vì câu xuất hiện 2 lần, không dám sửa mù).
- **16 mục vượt trần 235 ký tự** của "Nói dễ hiểu" sau khi áp → đã **khôi phục nguyên dòng gốc** cho đúng 16 mục đó (3, 9, 13, 15, 25, 26, 28, 30, 31, 33, 36, 38, 40, 43, 45, 46), giữ nguyên các sửa ở dòng Lợi ích/Ghi chú của cùng mục. Việc viết lại gọn cho 16 mục này để lượt sau.

### Lỗi do chính bản sửa sinh ra (đã sửa lại)

1. **"và Hãy nói rõ nguyên nhân…"** — Codex nối câu làm chữ "Hãy" viết hoa giữa câu (mục 25, Ghi chú). Đã trả về câu gốc.
2. **"giả nhược"** — lỗi gõ có sẵn trong sách (đúng là **"giả dược"**); Codex sửa 1 chỗ, còn 3 chỗ khác. Đã sửa cả **4 chỗ** trong chương 1.
3. **Ba tiêu đề mục bị đổi** (32, 43, 44) — đọc lại thấy đổi theo hướng rõ hơn, không sai nghĩa, nên giữ.

### Loại góp ý đáng áp / không đáng áp

- **Đáng áp**: câu mơ hồ vì thiếu đối tượng ("buồn ngủ … thì tăng 3,4 lần" → nói rõ *nguy cơ tai nạn của tài xế*), lặp từ ("người chở người ngồi sau"), kết hợp từ sai ("vùng ung thư cao", "khỏi vi rút", "băng trong mới kết").
- **Không áp**: góp ý chỉ đổi giọng văn mà không rõ hơn; góp ý kéo dài câu quá trần 235 ký tự; góp ý chèn số/năm mới (6 trường hợp).

## Quy trình chuẩn cho các chương còn lại

1. Chạy CLI với prompt có **đúng 4 ràng buộc**: chỉ đọc · không sửa file · không thêm số · không bàn về nguồn.
2. Lấy bảng bằng `sed -n '/^| mục/,$p'`, rồi lọc: câu trích phải **khớp nguyên văn** trong file, đề xuất **không chứa số mới**.
3. Áp xong **bắt buộc** chạy `check-plain --numbers` — bản sửa của CLI hay làm "Nói dễ hiểu" vượt 235 ký tự; mục nào vượt thì khôi phục dòng gốc, đừng nới trần.
4. Đọc lại diff tìm lỗi do bản sửa sinh ra (viết hoa giữa câu, lặp từ, sai dấu) — đã gặp thật ở chương 1.

## Chương 3 — Claude Code

- **131 góp ý / 27 mục + 3 góp ý cho đoạn mở đầu**; chất lượng cao hơn Codex ở chỗ bắt **lỗi ngữ nghĩa**, không chỉ lỗi câu: sai dấu hệ số, hiểu sai odds ratio, tiêu đề mâu thuẫn ghi chú.
- Lọc: **98** câu trích khớp nguyên văn; **4** bị loại vì chèn số mới; **29** không khớp (Claude trích có `\"` hoặc cắt giữa câu). Áp được **96**.
- **2 mục vượt trần 235 ký tự** (18, 27) → viết lại gọn tay, không khôi phục dòng gốc, vì bản gốc cũng đang có lỗi.

### Bốn lỗi ráp hỏng do áp bản sửa (đã sửa lại)

| Hiện tượng | Nơi | Cách sửa |
|---|---|---|
| Cụm lặp đôi do hai góp ý chồng lên nhau | “vừa lái xe vừa nghe điện thoại **vừa nghe điện thoại**”; “cụ thể mỗi tối **cụ thể mỗi tối**”; mục 27 lặp cả mệnh đề “trong thử nghiệm lớn nó không giảm biến cố tim mạch” | cắt phần lặp |
| **Chữ của người soát lọt vào sách** | “hãy chia đôi con số trong đầu — **Bỏ vế này..**” | xoá dấu vết, giữ câu đúng |
| Hai dấu chấm liền | “đừng đem so với các mục còn lại**..**” | sửa thành một dấu chấm |
| Gạch nối bị ráp thành chuỗi lạ | mục 23: `Loại **làm cơ thể dịu xuống" / "làm cơ thể hưng phấn hơn**` | trả về “Loại **làm cơ thể dịu xuống**” |

### Hai lỗi nội dung Claude bắt được (đáng giá nhất)

1. **Mục 23, dấu của hệ số**: sách ghi `g = 0,63` nhưng khoảng tin cậy là `−0,82 đến −0,43` — dấu không khớp. Đã sửa thành **`g = −0,63`** kèm chú “dấu âm là chiều giảm cơn giận”.
2. **Mục 25, hiểu sai odds ratio**: sách ghi “thuốc mạnh hơn giả dược **gấp 4,37 lần**”, trong khi **OR = 4,37** chỉ là tỷ số odds; chính mục đó có phép đổi ra tỷ lệ (18% → 45–53%), tức chênh khoảng 2,5 lần chứ không phải 4,37. Đã viết lại theo tỷ lệ.

## Kiểm tra bắt buộc sau mỗi lần áp bản sửa

```bash
node tools/check-plain.mjs --numbers   # trần 235 + số mới trong "Nói dễ hiểu"
python3 -c "import re,sys;s=open(sys.argv[1],encoding='utf-8').read();print([m.group(0) for m in re.finditer(r'\b((?:\S+\s+){3}\S+)\s+\1',s)])" book/0X-*.md
```
Cụm lặp 4 từ, hai dấu chấm liền, và các cụm kiểu “Bỏ vế này” là **dấu hiệu áp bản sửa hỏng** — chương 1 và chương 3 đều đã gặp.

## Chương 2 — Codex

**88 góp ý / 47 mục**; 86 câu trích khớp nguyên văn, 2 đề xuất chèn số mới. Áp **41** câu (bảng có mỗi dòng hai lần nên số cặp thật ít hơn số dòng).

- Giữ nguyên: đề xuất đổi `- Chi phí: Không tốn tiền.` thành “Có thể tốn tiền thuốc hỗ trợ.” và đề xuất rút phép quy đổi *“1 đơn vị cồn = 10 g, tương đương 1 lon bia 330 ml hoặc 1 chén rượu 30 ml”* thành câu chung chung. Cả hai đều **làm người đọc biết ít hơn**.
- Đã áp phần lớn còn lại: bỏ kết hợp từ sai (“nguy cơ tử vong tăng dần rồi dừng lại” → “lợi ích chững ở”), cắt câu lặp, làm rõ đối tượng so sánh.

## Chương 5 — Codex, và một quyết định biên tập

**120 góp ý / 51 mục**; 116 câu trích khớp, 4 chèn số mới. **Chỉ áp 8 câu**, không áp hàng loạt — khác hai chương trên.

Lý do: Codex đọc chương này như đọc bản quảng cáo nên **đề nghị làm mềm đúng những câu sắc bén nhất**, tức là bỏ mất giọng của sách:

| Câu trong sách | Codex đề nghị | Đánh giá |
|---|---|---|
| “Ai cam kết 20%/năm thì khoản chênh ấy không đến từ tài giỏi, mà từ tiền của người vào sau” | “Cam kết 20%/năm là dấu hiệu đáng ngờ” | **bỏ**, mất cách giải thích |
| “Cửa còn lại là con bạn, và cửa đó hẹp dần theo tuổi” | “Khả năng yêu cầu hoàn tiền … giảm dần theo tuổi” | **bỏ**, mất hình ảnh |
| “Nên cái gạch đó là chỗ để kiểm tra, không phải chỗ để tin” | “Hãy kiểm tra giá bị gạch có phải giá từng bán” | **bỏ**, mất nhịp |
| “Tiền chia lãi … không phải cam kết của công ty bảo hiểm” | “… không phải lúc nào cũng được đảm bảo” | **bỏ**, làm yếu một sự thật pháp lý |

8 câu đã áp là loại **lỗi thật**, không phải khẩu vị:
1. Mục 8: “Cửa còn lại là con bạn” → “Cách còn lại là đòi hoàn tiền cho giao dịch của con”.
2. Mục 12: “cùng hàm lượng, cùng hàm lượng đóng gói” (lặp + sai kết hợp từ) → “cùng quy cách đóng gói”.
3. Mục 15: “còn bạn **hưởng** rủi ro” → “**chịu** rủi ro”.
4. Mục 16: “công ty chứng khoán bán **hàng** của bạn” → “bán **chứng khoán** của bạn”.
5. Mục 24: “**cái gạch** đó” → “**giá bị gạch**”.
6. Mục 26: “phần vượt **lấy từ nhà bạn**” (đọc được thành bị lấy nhà) → “phần vượt **do bạn tự trả**”.
7. Mục 29: gộp tiền bồi thường với việc sàn gỡ hàng → tách hai vế.
8. Mục 37: “bán đúng cái mình đang tin” → “bán khi lý do mua không còn đúng” (khớp với câu (4) cùng mục).

**Nguyên tắc rút ra**: với mục đã do người viết tay (chương 5), lời góp ý của CLI phải qua bộ lọc “có làm người đọc biết **nhiều hơn** hoặc **đúng hơn** không”; nếu chỉ để trơn tru hơn thì bỏ. Với chương dịch cũ (1–2) thì ngược lại — ở đó câu máy dịch nhiều, nhận phần lớn.

## Chương 4 — Codex (chương cuối)

**64 góp ý / 18 mục** (mỗi dòng lặp hai lần → 32 cặp thật), tất cả trích khớp nguyên văn. **Áp 9**, bỏ 23.

Đây cũng là mục viết tay nên lọc theo cùng nguyên tắc như chương 5: chỉ nhận chỗ **sai hoặc tối nghĩa thật**.

Đã áp:
- Mục 1: “Gộp 94 phép kiểm định độc lập, người viết sẵn câu…” thiếu vị ngữ → “Tổng hợp … cho thấy:”.
- Mục 4: “họ đoán 48,6 ngày — **vẫn trễ**” (đọc được thành dự đoán muộn) → “vẫn **ít hơn thực tế**”.
- Mục 7: “việc chia nhỏ mà chỉ nghĩ trong đầu” → thêm “không viết ra giấy”.
- Mục 8: “Cả ba đều giải được bằng một ngày cụ thể **cộng một người biết**” (tối nghĩa) → “hãy ấn định ngày làm và nhờ một người hỏi lại tiến độ”.
- Mục 9: “cách đối phó **kém thích ứng**” (thuật ngữ dịch) → “cách ứng phó không phù hợp”.
- Mục 10: “vài giây đó là thứ đang làm việc” → “chính sự bất tiện đó khiến bạn bớt dùng”; “công sức cảm nhận” → “vì thấy lấy đồ tốn công hơn”.
- Mục 12: “Lỡ một ngày không hỏng quá trình” → “Bỏ lỡ một ngày không làm hỏng thói quen”.
- Mục 17: “Bỏ một lần thời gian học phím tắt” (sai trật tự) → “Dành thời gian học phím tắt”.
- Mục 14: **mâu thuẫn tự phát hiện** — sách viết “chỉ **2,0%** tự nêu … tức là **không ai** nghĩ tới” → “**gần như** không ai”.

## Chương 6 — Codex (chương do agent viết)

**76 dòng / 35 mục** (mỗi dòng lặp hai lần → 38 cặp thật). 19 mục có góp ý (3, 7, 8, 11, 13, 14, 15, 17, 20, 21, 23, 24, 27, 28, 29, 30, 31, 33, 35). Tất cả 38 câu trích khớp **nguyên văn**, **0** đề xuất chèn số mới → áp hết 38 câu, không phải lọc tay lần nào.

- **2 câu phải khôi phục dòng gốc** sau khi áp: mục 7 (“Nói dễ hiểu” phình 257 ký tự) và mục 17 (272) → khôi phục đúng dòng `- Nói dễ hiểu:` của hai mục đó, giữ nguyên các sửa ở Lợi ích/Ghi chú. Đúng như dự đoán trong quy trình: bản viết lại của CLI luôn dài hơn.
- **Không sinh lỗi ráp**: 0 cụm 4 từ lặp, 0 dấu vết người soát lọt vào sách, 0 gạch nối ráp; 2 chỗ `..` còn lại là dấu lược trong tên bài JAMA (đúng nguyên văn nguồn).
- Loại góp ý gặp ở chương này: thiếu đối tượng (“quá tải” → “quá tải tuần hoàn”), sai sắc thái từ (“bị bác sĩ chỉ định”), thiếu vị ngữ (“Có nghiên cứu 86%…” → “Có nghiên cứu cho thấy…”), đọc được thành nghĩa khác (“chạy dài nhiều tháng” → hiểu là phải chạy bộ).

**Khác 5 chương trước**: chương 6 cho tỉ lệ áp **38/38 = 100%**, cao nhất trong cả sách. Lý do: đây là chương do 3 agent viết theo cùng một gói ngữ cảnh, câu văn đồng đều nhưng máy móc hơn người viết tay — CLI bắt được nhiều chỗ "đọc được thành nghĩa khác" mà không phải chỉnh giọng. Ngược lại chương 5 (viết tay) chỉ áp 8/120.

## Tổng kết 6 chương

| Chương | Người soát | Góp ý | Áp | Ghi chú |
|---|---|---|---|---|
| 1 | Codex | 180 | 80 | + sửa “giả nhược” → “giả dược” 4 chỗ |
| 2 | Codex | 88 | 41 | giữ phép quy đổi đơn vị cồn |
| 3 | Claude Code | 131 | 96 | bắt 2 lỗi nội dung (dấu `g`, hiểu sai OR) |
| 4 | Codex | 64 | 9 | mục viết tay, chỉ nhận lỗi thật |
| 5 | Codex | 120 | 8 | mục viết tay, từ chối làm mềm giọng |
| 6 | Codex | 76 | 36 | agent viết, áp 100% cặp thật; 2 dòng khôi phục do vượt trần |
| **Tổng** | | **659** | **270** | |

Cả 6 chương đều qua `check-plain` (226 mục, 0 lỗi), `check-split`, `check-refs`, `sync-stats` và không còn cụm từ lặp sau khi áp.
