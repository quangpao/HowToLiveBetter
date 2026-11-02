### Claude Code chương 12 (35 câu)

42 dòng → **35 câu áp 35**, 6 dòng trích câu đã bị Codex sửa trước nên không còn khớp. Tổng chương 12: **48 câu** trên 28 mục.

**Bốn câu vượt trần sau khi áp**: mục 8 (236), 14 (238), 15 (239), 26 (276). Mục 26 phải viết lại cả câu — đề xuất của Claude dài hơn câu gốc 37 ký tự, chủ yếu do thêm "vốn chủ sở hữu" và "Ủy ban Chứng khoán Nhà nước" đầy đủ. Đã cắt còn 231 mà vẫn giữ đủ 30 tỷ · 100 nhà đầu tư · 10% · 90 ngày · 2 triệu.

Đây là lần thứ **ba liên tiếp** áp góp ý làm vượt trần. Quy tắc đã ghi từ chương 10 vẫn đúng: chạy `check-plain` **ngay sau mỗi lượt áp**, đừng đợi cuối chương.

## Chương 12 — Codex (13 câu)

**Codex**: 31 dòng bảng → **13 cặp thật** (mỗi dòng lặp hai lần như các chương trước), áp **13/13**, 3 dòng không khớp câu gốc. Không câu nào vượt trần 235 sau khi áp.

Xu hướng tiếp tục: **17 → 14 → 13 câu** qua ba chương. Đề bài chương 12 cấm sẵn bốn mẫu câu và cấm cả "nói về chính việc viết", nên phần lớn câu agent viết đã đúng ngay từ bản nháp.

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

### Claude Code (32 câu) — và một bài học về thời điểm chạy soát

**Claude**: 42 dòng → **32 câu áp 32**, 7 dòng trích câu không còn khớp, 1 dòng dính số của chính đoạn văn đang sửa. Tổng chương 10: **49 câu** trên 23 mục.

**7 dòng không khớp có nguyên nhân rõ**: tôi khởi động Codex và Claude **trước** khi tự sửa hai chỗ (hạ mục 1 từ A xuống B, viết lại đoạn thang bằng chứng A/B/C ở phần mở đầu). Claude đọc bản cũ, nên các câu nó trích trong đoạn mở đầu không còn tồn tại — riêng một dòng còn khẳng định "1 mục hạng C là mục 16" trong khi bản đúng là mục 8. Luật rút ra: **soát văn phong phải chạy sau khi xong mọi sửa nội dung**, kể cả sửa hạng và sửa đoạn mở đầu; nếu chạy trước thì phải tự đọc lại phần mở đầu bằng mắt, đừng tin "không khớp là do agent trích sai".

**3 câu sau khi áp bị vượt trần 235** (mục 8: 254, mục 18: 237, mục 22: 239) — vì câu đề xuất của Claude dài hơn câu gốc. Đã tự cắt lại; cổng `check-plain --numbers` phải chạy lại **sau mỗi lần áp góp ý**, không chỉ trước.

### Claude Code chương 11 (33 câu)

**Claude**: 42 dòng → **33 câu áp 33**, 7 dòng trích câu đã bị Codex sửa trước nên không còn khớp. Tổng chương 11: **47 câu** trên 21 mục.

**Một câu sau khi áp vượt trần**: mục 20 lên **250 ký tự** — câu đề xuất dài hơn câu gốc. Đã tự cắt còn **210**. Đây là lần thứ hai liên tiếp (chương 10 và 11) việc áp góp ý làm vượt trần 235, nên từ nay `check-plain` phải chạy **ngay sau mỗi lượt áp**, không đợi đến cuối.

## Chương 11 — Codex (14 câu)

**Codex**: 33 dòng bảng → **14 cặp thật** (mỗi dòng lặp hai lần), áp **14/14**. Không dòng nào chèn số mới, không câu nào vượt trần 235 sau khi áp.

Lần này Codex sửa cả **hai câu mở đầu chương**, không chỉ trong mục: "Điều dễ sai nhất ở Việt Nam là cơ chế quản lý không giống…" → "Bạn dễ hiểu nhầm vì cơ chế quản lý ở Việt Nam khác…". Đúng hướng — câu mở đầu cũng phải có người nói và người đọc, không phải câu tuyên bố của người biên soạn.

Vẫn đúng bốn mẫu câu đã thành luật trong đề bài (câu cụt thiếu chủ thể, mở đầu bằng nhãn, nói về chính việc viết) — nghĩa là **đề bài chương 11 đã chặn được phần lớn**, số câu phải sửa giảm từ 17–62 xuống 14.

## Chương 10 — Codex (17 câu)

**Codex**: 34 dòng dữ liệu (mỗi dòng lặp 2 lần → 17 cặp), áp **17/17**, không dòng nào chèn số mới, không dòng chỉ dẫn, không câu nào vượt trần 235.

Lỗi chính vẫn là câu cụt thiếu người thực hiện ("Cái phải bỏ ra là thời gian…", "Cái phải bỏ thật là cảm giác…") và câu mở đầu bằng nhãn giáo trình ("Quan niệm sai đang sửa là…") — **kiểu lỗi thứ tư liên tiếp ở bốn chương 7, 8, 9, 10**. Đáng ghi vào đề bài cho các chương sau, thay vì sửa lại từng chương: đề bài nên cấm luôn hai mẫu câu này.

## Chương 9 — Codex (19 câu) + Claude Code

**Codex**: 38 dòng dữ liệu (mỗi dòng lặp 2 lần → 19 cặp thật), áp **19/19** trên 9 mục + 2 câu ở phần mở đầu chương. Không có dòng nào chèn số mới, không có dòng chỉ dẫn.

**Claude Code (2.1.316)**: 42 dòng → **36 câu áp 36**, 4 dòng trích câu đã bị Codex sửa trước nên không còn khớp. Tổng chương 9: **55 câu** trên 22 mục.

Claude bắt được **lớp lỗi mới ở chương này: nhãn thang điểm lọt vào chính văn**. Chín mục có câu mở đầu bằng "**Vì sao B**:" hoặc "**Vì sao C**:" — đó là ghi chú của người biên soạn giải thích vì sao mục này ở hạng nào, người đọc không cần đọc chữ "C". Claude đề nghị đổi thành "**Vì sao chưa chắc**", tôi chọn cách khác: viết thành "**Vì sao mức B**" / "**Vì sao mức C**" để chữ cái có nghĩa (chương đã định nghĩa A/B/C ở phần mở đầu).

**Và bắt được một chỗ tôi làm sai**: mục 9 tôi nâng C → B nhưng quên sửa câu "**Vì sao C**: … nên mức chắc chắn không cao" — trái hẳn với hạng mới. Đã viết lại: phần hành chính cố định (4–6 triệu), phần hình sự mới phụ thuộc giám định. Đây là loại lỗi không cổng nào bắt: đổi `- Mức bằng chứng:` mà không đọc lại "Ghi chú" của chính mục đó.

Vẫn là lỗi câu cụt thiếu người thực hiện — đây là lỗi phổ biến nhất của cả ba chương gần đây:
- "Cái phải bỏ ra là một phút trước khi bấm chuyển…" → "Bạn cần dành một phút trước khi bấm chuyển…"
- "Cái phải bỏ ra là một câu không nói…" → "Bạn cần nhịn nói một câu…"
- "Quan niệm sai đang sửa là …" → "Bạn đừng nghĩ rằng …"

Sau khi áp: 0 câu vượt trần 235 (khác chương 8 phải sửa 2 câu), 0 cụm lặp, 0 dấu `.,`.

## Chương 8 — Codex (chạy 2 lần) + Claude Code

**Lần 1 — báo cáo tốt nhất, nhưng suýt bị tôi đọc thành "hỏng"**: lúc tôi kiểm, `codex exec` vẫn đang chạy nên file mới có 1 dòng bảng và 488 KB dội lại nguyên văn chương. Tôi kết luận "hỏng, phải chạy lại" — sai: khi tiến trình xong, file có **108 dòng bảng**. Bài học: **kiểm `pgrep -f 'codex exec'` trước khi kết luận một báo cáo là hỏng**; đếm `grep -c '^|'` chỉ có nghĩa sau khi tiến trình đã thoát.

**Lần 2** (chạy song song, `-c model_reasoning_effort=medium`, prompt "đọc một lần, chỉ in bảng ≤40 dòng"): **36 dòng → 18 câu**.

**Kết quả cuối**: áp **18 câu từ lần 2 + 44 câu từ lần 1 = 62 câu**, trên 20 mục. Bốn dòng của lần 1 là **chỉ dẫn chứ không phải câu thay thế** ("Đổi “tang trữ” thành “tàng trữ”") — nếu áp thẳng thì câu gốc bị thay bằng đúng câu chỉ dẫn đó; đã lọc bằng luật "đề xuất bắt đầu bằng Đổi/Thay/Bỏ/Sửa hoặc ngắn hơn nửa câu gốc thì bỏ", rồi sửa tay 4 chỗ thuật ngữ (tàng trữ, tạm hoãn xuất cảnh, chứng từ chuyển khoản, "cái chết của chính người được bảo hiểm").

Sau khi áp, mục 18 vượt trần 235 ký tự (236) — đúng như skill đã ghi: **bản sửa của CLI luôn dài hơn**, phải chạy lại `check-plain --numbers` và viết lại câu cho gọn (207 ký tự).



Loại lỗi Codex bắt được ở chương này: câu mở đầu bằng "Cái phải bỏ ra là…" (thiếu người thực hiện), "Quan niệm sai đang sửa là…" (giọng giáo trình, không phải câu cho người đọc), và câu phủ định bị viết vòng ("ngân hàng không tự bắt máy ai gọi đến mà phong tỏa" → "không phong tỏa chỉ vì có người gọi điện yêu cầu").

**Claude Code (2.1.316)**: 144 dòng → **94 câu áp 94**, trên **42 mục**. Trong 144 dòng: 10 dòng là chỉ dẫn chứ không phải bản thay thế (bị lọc), 1 dòng chèn số mới (bị loại), **39 dòng trích câu mà Codex đã sửa xong** (không còn khớp — dấu hiệu hai CLI bắt trùng vùng, khoảng 27%).

Claude bắt được lớp lỗi Codex bỏ qua ở chương này: câu mở đầu bằng nhãn đếm "(2)…" rồi mới tới nội dung, câu khẳng định tuyệt đối không có ngoại lệ ("Mọi vụ lừa đảo đều khép lại ở một bước" → "Nhiều vụ…"), và câu văn nói về bản thân việc viết ("Ba cái bẫy Việt Nam." → "Ba cái bẫy hay gặp.").

**Tổng chương 8**: Codex **62 câu** + Claude **94 câu** = **156 câu sửa** trên 46 mục. Sau khi áp: mục 18 vượt trần 235 (236) và mục 20 vượt (236) → viết lại còn 207 và 202, chạy lại `check-plain` mới xanh.

## Chương 7 — Codex + Claude Code (lần đầu chạy song song)

Chương đầu tiên chạy **hai CLI cùng lúc trên cùng một chương** để có đối chứng chéo, thay vì chia chương cho từng CLI như chương 1–6.

**Codex (0.162.1)**: 84 dòng / 23 mục → **42 cặp thật** (mỗi dòng lặp hai lần). Cả 42 câu trích khớp **nguyên văn**, **0** đề xuất chèn số mới → áp hết 42 câu trên 21 mục, không phải lọc tay lần nào. **Không câu nào làm "Nói dễ hiểu" vượt trần 235 ký tự** — lần đầu tiên trong cả sách không phải khôi phục dòng gốc.
- Bốn loại lỗi thật gặp ở cả 42 câu: **(1) thiếu đối tượng hoặc chủ ngữ** — nhiều nhất, kiểu "cái phải bỏ ra là…", "người vào", "thu nhập chọn", "khám nội trú"; **(2) câu đọc ngược nghĩa hoặc tự phủ định** — "đòi được thì mới đi" (ngược với lời khuyên đi đòi ngay), "không phải tiền" ngay sau khi nói mất tiền công, "không có nghĩa là phải khai man"; **(3) ẩn dụ dịch máy** — "ba cửa thật", "cửa cuối", "dùng làm việc chữa cháy" (đọc thành chữa cháy thật); **(4) lặp từ sát nhau** ("xác định… xác định", "vào… vào").
- Không sinh lỗi ráp: 0 cụm 4 từ lặp, 0 `.,`, 0 chữ của người soát lọt vào sách.

**Claude Code (2.1.316)**: 118 dòng → **88 câu áp được** trên cả 23 mục, cộng **30 câu** mà Codex đã sửa trước đó nên không còn khớp (0 câu bị loại vì chèn số mới, 0 câu trích sai).

So với Codex, Claude bắt được **hai lớp lỗi Codex không thấy**:

1. **Nhãn biên tập lọt vào chính văn** — "Chặn cách đọc ngược", "Câu chặn đọc sai": đây là câu hướng dẫn viết, không phải câu cho người đọc. Kiểm cả sách: **chương 5 có 51 chỗ, chương 6 có 30, chương 7 có 10** → đã đổi hết thành **"Đừng hiểu ngược"** (91 chỗ), và ghi thành luật trong skill.
2. **Câu mâu thuẫn nội bộ trong cùng một mục** — tiêu đề nói một đằng, phần Chi phí/Lợi ích nói khác: mục 2 (án phí: kiện đòi lương được miễn), mục 4 và 21 (mục 4 nói "đến thẳng cơ sở" trong khi mục 21 nói "gọi công an xã trước, đừng tự đến đứng ngoài cổng"), mục 9 ("vài chục nghìn một tháng" lệch với con số ở Chi phí), mục 15 ("trần 20%/năm, tức 100%/năm" đọc như 20% bằng 100%), mục 18 (mức phải đóng bị đọc thành mức được giảm 70%).

Kết luận về việc chạy 2 CLI song song: **giữ**. Codex mạnh ở câu cụt/thiếu đối tượng (42 câu, áp 100%, không câu nào làm vượt trần 235); Claude mạnh ở mâu thuẫn nghĩa và nhãn biên tập. Chạy một CLI thì mỗi chương mất đúng một nửa số lỗi này.

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
