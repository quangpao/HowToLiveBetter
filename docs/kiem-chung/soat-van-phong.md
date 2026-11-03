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

## Chương 13 — Codex 15 câu, áp 15

`codex exec -c model_reasoning_effort=medium` chạy 25 phút, in ra 988 dòng transcript (dội lại nội dung file) rồi mới ra bảng ở cuối — **30 dòng thô, 15 dòng duy nhất**. Bài học: với Codex phải trích bảng bằng cách đọc **các dòng bắt đầu bằng `|` có đủ 4 cột**, không đọc 20 dòng cuối file.

Áp **15/15**:
- Hai câu mở chương bỏ lối nói về việc viết ("mỗi mục ở đây phải trả lời được…", "Mỗi mục sẽ nói rõ…") → nói thẳng với người đọc.
- Mười câu "**Mục này không có nghĩa là…**" → "**Bạn không cần…** / **Không phải…**", giữ nguyên nội dung phủ định nhưng bỏ mục sách làm chủ thể. Đây là lần thứ tư phải sửa cùng một mẫu câu; mẫu này lọt vào đề bài vì tôi viết nó trong brief.
- Bốn câu lỗi cụ thể: "sập ở ba chỗ" (2 chỗ) → "thường mắc lỗi ở ba việc sau"; "người sặc là nguy cơ viêm phổi sặc" → "người bệnh có nguy cơ viêm phổi nếu bị sặc"; "cả hai đều hỏng phần đứt" → "cả hai đều **làm** hỏng"; "tay vẫn làm" → "đồng thời tiếp tục ép tim và thổi ngạt".

Hai dòng đáng cân nhắc nhưng vẫn áp: mục 46 đổi "không có chuyện để ngủ cho tỉnh" thành "Không để người say ngủ một mình; phải có người trông trong lúc ngủ" (mất sắc thái khẩu ngữ, được sự rõ ràng vì đứng cạnh vế "không để ngủ một mình" đọc thành mâu thuẫn); mục 47 giữ nguyên nội dung nhưng bỏ lối "Mục này không có nghĩa là… thì thôi".

Sau khi áp: `check-plain --numbers` 444 mục **0 chỗ chưa đạt** · `check-refs` 327 chỗ, **không có "Cần xem tay"**.

## Chương 13 — Claude 39 câu, áp 36

`claude -p --allowedTools Read` chạy khoảng 40 phút, ra **39 dòng, 39 dòng duy nhất** — không có dòng trùng, khác Codex (30 dòng thô, 15 duy nhất).

Áp **36/39**. Ba dòng không áp được vì **Codex đã sửa đúng chỗ đó ở lượt trước** (mục 1 "Mục này không có nghĩa là phải học xong…", mục 3 "người sặc là nguy cơ…", mục 30 "sập ở ba chỗ") — dấu hiệu hai công cụ độc lập cùng chỉ ra một lỗi, nên lượt sau chỉ cần áp một lần.

Nhóm sửa lớn nhất:
- **Bỏ lối nói về việc viết/việc dịch**: "Chương gốc dùng số của hệ thống cấp cứu một nước khác…" → "Những số cấp cứu của nước khác thì ở Việt Nam **không phải** số cấp cứu."
- **Bỏ "tôi" của người soạn lọt vào chính văn** (mục 17): "và tôi chưa mở được bản toàn văn Quyết định 5481/QĐ-BYT" → "bản toàn văn … chưa đối chiếu được". Đây là lỗi loại nặng: người đọc không cần biết người soạn mở được tệp nào.
- **Chủ thể hành động**: "hệ thống chỉ mở được mạch trong một khoảng thời gian" → "**bác sĩ** chỉ mở được mạch…"; "quyết định tiêm hay không" → "**bác sĩ** quyết định tiêm hay không".
- **Từ Hán-Việt và từ lạ**: "bóc tách động mạch chủ" → "**lóc tách** động mạch chủ"; "đắp thuốc lá" → "đắp **lá thuốc**"; "buộc chặt" → "buộc **ga-rô**".

Sau khi áp: `check-plain --numbers` 444 mục **0 chỗ chưa đạt** · `check-refs` **328 chỗ**, không có "Cần xem tay".

Tổng chương 13: **Codex 15 + Claude 36 = 51 câu soát cho 48 mục** — tỉ lệ cao nhất từ đầu sách, vì chương này có nhiều câu mệnh lệnh ngắn dễ cụt chủ ngữ.

## Chương 14 — Codex 17 câu, áp 17/17

34 dòng thô, **17 dòng duy nhất**, áp đủ 17.

Nhóm sửa lớn nhất: **10 câu thuộc mẫu "Mục này không có nghĩa là…"** — lần thứ **năm** phải sửa cùng một mẫu. Nguyên nhân lần này là **đề bài của tôi tự mâu thuẫn**: một dòng cấm cụm "Mục này không có nghĩa là…", một dòng khác lại yêu cầu "phải có câu nói rõ mục này không có nghĩa là gì". Agent làm theo dòng thứ hai.

Cách sửa đề bài từ chương 15: yêu cầu **"nói rõ giới hạn của mục bằng câu khẳng định dành cho người đọc"**, kèm ví dụ đúng ("Bạn không cần…", "Không phải…"), và **không** dùng chữ "không có nghĩa là" ở bất cứ đâu trong đề bài để agent khỏi chép lại.

Ba lỗi logic thật đáng chú ý:
- Mục 12: câu "Xong mới huỷ số cũ, rồi rà lại…" **mâu thuẫn** với chính yêu cầu giữ số cũ đến khi đổi xong — huỷ trước rồi mới rà là huỷ khi chưa rà. Đã đảo lại: rà hết, cập nhật hết, rồi mới huỷ.
- Mục 2: "Hộp thư thì không có ai báo hộ" đứng cạnh "Điều 29 khoản 6 buộc nền tảng… công khai" đọc thành tự phủ định.
- Mục 4: "mọi mật khẩu đều lấy lại được bằng tin nhắn" — sai, mâu thuẫn với mục 2 nói hộp thư lấy lại qua hộp thư dự phòng.

Sau khi áp: `check-plain` 456 mục **0 chỗ chưa đạt**, `check-refs` 340 chỗ, không có "Cần xem tay".

**Claude không chạy được cho chương này:** hết hạn mức 5 giờ, resets 02:50. Ghi lại để không tưởng là đã soát hai lượt.

## Chương 15 — Codex 15 câu, áp 15/15

30 dòng thô, **15 dòng duy nhất**, áp đủ 15. Codex lại dội nguyên chương trước khi ra bảng (356 KB) — bảng nằm ở cuối, phải đọc theo dòng `^|`.

Hai lỗi nặng:
- **Mục 16 và 17 lọt ghi chú quy trình vào sách**: "trong lượt tra này tôi chưa mở được văn bản đang áp dụng" và "đây là câu phủ định, và cách kiểm là…". Người đọc không cần biết người soạn mở được tệp nào. Đây là lần thứ hai lỗi này xuất hiện (chương 13 mục 17).
- **Mục 18**: "Bạn không cần từ chối nhận nhà để giữ quyền" đọc thành *cứ ký khi còn lỗi* — sai hướng an toàn. Đã đổi thành điều kiện: nếu nhận nhà khi còn lỗi thì ghi từng lỗi vào biên bản.

Một câu bị sửa vì **khẳng định tuyệt đối**: mở chương viết "trước khi ký là lúc **duy nhất** bạn còn quyền từ chối" — sau khi ký vẫn còn quyền từ chối nghiệm thu, kiện, không nhận nhà.

Sau khi áp: `check-plain` 474 mục **0 chỗ chưa đạt**, `check-refs` 359 chỗ, không có "Cần xem tay", grep "tôi chưa mở / lượt tra này" = **0**.

## Chương 14 — Claude 40 câu, áp 40/40

40 dòng, **40 dòng duy nhất** (không trùng), áp đủ 40 — tỉ lệ cao nhất từ đầu sách, vì chương này câu ngắn và nhiều câu cụt chủ ngữ.

Mẫu lặp nhiều nhất: **câu vô chủ** ("Cái mất là một buổi tối…", "Cái mất thêm là…", "Khoản đắt là…") — 9 câu. Claude đổi hết sang "Bạn mất…".

Lỗi đọc ngược nghĩa (nguy hiểm hơn lỗi văn phong):
- Mục 3: "đừng để tin nhắn… " đọc thành tin nhắn là bên đọc.
- Mục 5: "Hai: để vài tháng mới làm tra soát, **vì** 60 ngày là mức sàn buộc ngân hàng phải cho" — chữ "vì" biến lời cảnh báo thành lời biện hộ cho việc chậm.
- Mục 12: "Đổi số đúng thứ tự không có nghĩa là phải bỏ số cũ" → "Làm đúng thứ tự…" vì "đổi số" đọc thành hành động đã xong.

Ba câu nói về **chính việc viết**, đã bỏ: "Phạm vi hẹp hơn tiêu đề…", "nên để B là đúng sức chứng cứ", "có điều khoản rõ ràng và đã đọc nguyên văn".

**Một câu Claude thêm vào là suy luận của nó, tôi đã bỏ:** nó viết "mốc phản hồi tính bằng ngày làm việc, mốc làm xong tính bằng ngày" — đó là diễn giải của người soát, không phải câu trong nguồn. Tôi đổi thành câu không khẳng định đơn vị: "các mốc đều đếm được trên lịch, nhưng hạn trả lời và hạn làm xong tính khác đơn vị nhau, nên đọc kỹ đơn vị của từng mốc". Bài học: **góp ý văn phong không được thêm khẳng định pháp lý mới** — chương 15 và 16 đã ghi ràng buộc "không thêm số" vào đề bài soát.

Sau khi áp: `check-plain` 474 mục **0 chỗ chưa đạt**, `check-refs` 359 chỗ, không có "Cần xem tay".

## Chương 16 — Codex 13 câu, áp 13/13

26 dòng thô, **13 dòng duy nhất**, áp đủ 13.

**Câu quan trọng nhất là lỗi y tế, không phải lỗi văn phong:** mục 14 viết "chờ 30 giây mới hít liều sau" — đọc thành *phải hít thêm một liều*, sai với thuốc hít COPD. Đã thêm điều kiện "nếu đơn yêu cầu hít tiếp". Bốn chữ, đổi hẳn nghĩa.

Sáu câu ở phần mở chương đều nói về **chương sách** thay vì nói với người đọc; câu tệ nhất kể thao tác tra cứu của người soạn ("Mọi câu về liều… đều dẫn văn bản của Bộ Y tế") thay vì khuyên hỏi bác sĩ.

Hai câu nói về quá trình biên soạn đã bỏ: "Bản in của hướng dẫn còn một chỗ câu chữ mâu thuẫn nhau…" (mục 12) và từ nội bộ "mở thuốc" (mục 13).

Bài học: **đề bài soát phải đặt ràng buộc an toàn lên trước ràng buộc văn phong** — nếu chỉ dặn "sửa câu cho gọn", lỗi y tế sẽ nằm giữa bảng và bị xử lý sau cùng.

Sau khi áp: `check-plain` 488 mục **0 chỗ chưa đạt**, `check-refs` 374 chỗ, không "Cần xem tay".

## Chương 16 — Claude 40 câu: 28 áp, 10 gắn cờ, 2 trùng Codex

40 dòng, 40 dòng duy nhất. Áp 28 câu có bản thay thế; 10 câu chỉ gắn cờ "nghi ngờ nguồn / cần kiểm số" (tự xử bên dưới); 2 câu nhắm chỗ Codex đã sửa trước nên không khớp.

**Chín trong mười cờ là lỗi an toàn y tế** — loại nguy hiểm nhất vì câu chữ vẫn trôi chảy:
- "Đừng tự kết luận, đừng tự mua thuốc hạ acid uric" — chỉ nói điều cấm, **thiếu bước đi khám**.
- "kéo dài 5–7 ngày rồi tự giảm, nên hết đau không có nghĩa là khỏi" — đọc thành **cứ chờ cho qua cơn**.
- "Khám đều không thấy bệnh thì có thể giãn ra 2 năm" — thiếu chủ thể **bác sĩ xem xét**.
- "khó thở không đỡ thì đòi đổi thuốc" — bỏ mất bước **kiểm tra kỹ thuật hít**.
- "tập phục hồi chức năng trên 20 buổi" — đọc thành **tự tập**.
- "một lần xét nghiệm bất thường chưa cần lo" — đọc thành **chờ đợi**.

**Ba khẳng định tuyệt đối bị hạ:** "Mọi xét nghiệm phải làm lại", "quyền duy nhất", "ngưỡng 420" (thiếu "ở nam, nữ có ngưỡng riêng"), "chưa có bệnh võng mạc 3-6 tháng" (mâu thuẫn QĐ 5481 nói 1–2 năm → ghi rõ nhịp đó là **của QĐ 2558**).

**Bốn câu tôi tự bỏ vì không có nguồn** (Claude chỉ gắn cờ, không cho câu thay): kết luận "đơn giấy đang lưu hành là đơn đã có mã"; "không có cơ chế gửi thư tới từng người"; "mất luôn phần bảo hiểm đã tính cho đơn cũ"; "trạm có hợp đồng BHYT là chuyện phải có". Hai con số không căn cứ ("mười năm", "vài trăm nghìn") đổi thành "nhiều năm" và "một khoản không nhỏ".

Tổng soát chương 16: **Codex 13 + Claude 40 = 53 câu / 14 mục** — cao nhất từ đầu sách (ch13: 51).

Sau khi áp: `check-plain` 488 mục **0 chỗ chưa đạt**, `check-refs` 374, không "Cần xem tay".

## Chương 17 — Codex 7 câu, áp 7/7

197.714 byte nhưng chỉ **14 dòng thô, 7 dòng duy nhất** — ít nhất từ đầu sách, vì chương này viết bằng câu khẳng định có chủ ngữ ngay từ đề bài (bài học từ ch14).

Hai câu đáng chú ý đều ở mục 11 (nhà dưỡng lão): "không văn bản nào đặt trần khoản trả trước, nên giữ hợp đồng và biên nhận" — thay vì để người đọc hiểu rằng cứ tự quyết khoản trả trước; và "dùng mẫu hợp đồng trong phụ lục nghị định nhưng cần đọc từng điều khoản", thay vì "cứ điền giá và thời hạn vào mẫu".

Hai câu sửa lỗi ghép từ: "mất việc tự chăm mình" (đọc thành mất việc làm), "được tính là lẫn" (không tự nhiên khi nói về cách gia đình nhìn nhận).

Một câu bỏ lối nói về chính mục sách: "cái mục này không đo được là mất bao nhiêu ngày công" → "chưa có thống kê Việt Nam về số ngày người lao động phải nghỉ để chăm cha mẹ già".

Sau khi áp: `check-plain` 501 mục **0 chỗ chưa đạt**, `check-refs` 392 chỗ, không "Cần xem tay".

## Chương 17 — Claude 40 câu: 36 áp, 2 cờ, 2 trùng Codex

**Mười hai câu đầu bảng đều là lỗi an toàn tiền bạc và giấy tờ** — đúng ràng buộc riêng của chương:
- "hỏi bốn câu… đủ giấy là được đưa tiền" → phải nói **thiếu một câu là dừng**.
- "Bạn không cần công chứng để di chúc có giá trị" → đọc thành **đừng công chứng**; đổi sang câu nêu điều kiện.
- "Bạn không cần công chứng mọi giấy uỷ quyền" → cùng bệnh: phủ định mở đầu dễ đọc ngược.
- "Mọi lệnh rút phải có sự đồng ý của cả hai" → "mọi" tuyệt đối, trong khi thoả thuận khác có thể.
- "uỷ quyền lại phải cùng hình thức" → **bỏ mất điều kiện phải được bên uỷ quyền đồng ý**.
- "loại thứ ba không làm mất nhà" → tuyệt đối, phải thêm điều kiện hợp đồng.
- "không văn bản nào đặt trần, nên gia đình tự quyết" → đọc thành **trả bao nhiêu cũng được**; đổi thành nghĩa vụ ghi rõ số tiền và điều kiện hoàn trả trước khi đưa tiền.
- "không có hợp đồng thì không có gì để trình báo" → đọc thành **khỏi trình báo**; đổi thành "rất thiếu chứng cứ".

**Hai câu mâu thuẫn nội bộ do chính tôi viết ở phần mở chương:**
- "chỉ làm được khi còn tỉnh và **còn ký được**" — mâu thuẫn mục 2 (người không ký được vẫn lập được di chúc, chỉ cần công chứng) → đổi thành "còn minh mẫn".
- "**Mọi** mục về tiền đều quay về một câu" — không đúng với chính chương → đổi thành "Chốt đầu tiên về tiền nằm ở mục 4".

**Hai câu bỏ lối nói về việc viết:** "lần này có mốc đọc được", "điều mục này khẳng định… là một khẳng định phủ định".

**Hai cờ tự xử:** "nhóm bị nhắm tới nhiều nhất" → "một trong những nhóm"; và ghi chú mục 11 nói "giữ một bản" trong khi Lợi ích nói mỗi bên giữ 02 bản.

Sau khi áp: mục 7 `Nói dễ hiểu` vượt trần **236/235** → cắt còn 233; `check-plain` 501 mục 0 chỗ chưa đạt, `check-refs` 393 chỗ.

Tổng soát chương 17: **Codex 7 + Claude 40 = 47 câu / 13 mục.**

## Chương 18 — Codex 11 + Claude 40 = 51 câu (7 mục)

**Codex bắt lỗi nặng nhất không phải ở câu mà ở tiêu đề**: "Nuôi con: có đáng không" vi phạm chính luật tôi viết trong đề bài (cấm dùng "đáng", "lãi", "lỗ" về một đứa trẻ). Đã đổi tên chương thành **"Nuôi con: tiền bạc và thời gian"**, đổi tên tệp `18-nuoi-con-tien-bac-va-thoi-gian.md`, sửa liên kết README.

Claude 40 câu: áp 26, **10 cờ "nghi ngờ nguồn" tự xử**, 3 câu trùng chỗ Codex đã sửa.

Sáu cờ tự xử đáng kể:
- "khoản 3 dành cho trường hợp **hai bên thoả thuận chấm dứt**" — sai Điều 41: khoản 3 là **người sử dụng lao động không muốn nhận lại và người lao động đồng ý**.
- "trường công tự chủ được thu **gấp 2 lần hoặc 2,5 lần** mức trần" — mâu thuẫn với chính sách miễn học phí công lập; đổi thành "cơ sở công lập vẫn được thu các khoản ngoài học phí".
- "**ba khoản còn lại**" trong khi cùng đoạn liệt kê năm khoản → "các khoản ngoài học phí".
- "con thu nhập thấp thì kỳ vọng đó không thành quyền" → "mức cấp dưỡng theo đó cũng thấp" (Điều 111 không nói về thu nhập của con).
- "Khoản **không có trong bất kỳ văn bản nào**" → "không do văn bản nào ấn định".
- "**toàn bộ** hồ sơ mà Điều 41 cần" → "những gì Điều 41 cần để đòi quyền".

Lỗi đọc ngược nghĩa đáng chú ý (cả ba đã sửa): "dồn nghỉ vào tháng thứ ba là mất phần **đã** nghỉ" (đúng: phần **chưa** nghỉ); "một quyết định sai chỉ cần **rơi vào** một trong ba điều" (đúng: **trái** một điều); "Cái mất thêm là 60 phút mỗi ngày **được nghỉ**" (quyền bị viết thành khoản mất).

Ba con số bị đọc thành tiền mặt: 74,4 triệu và 1,8 triệu của giảm trừ gia cảnh là **thu nhập tính thuế**, không phải tiền thuế — đã ghi rõ.

Cổng bắt mục 3 vượt trần sau khi sửa (260/235) → viết lại còn 228.

Sau khi áp: `check-plain` 508 mục **0 chỗ chưa đạt**, `check-refs` 400 chỗ.

## Chương 19 — Codex 4 câu, áp 4/4

240 KB transcript nhưng **chỉ 8 dòng thô, 4 dòng duy nhất** — thấp nhất từ đầu sách. Chương viết bằng câu có chủ ngữ và số đọc được ngay từ bản đầu, nên không còn gì để bắt.

Cả bốn câu đều ở hai mục cuối (điều chuyển công việc, cho thuê lại lao động), và cả bốn cùng một lỗi: **câu liệt kê "cái mất" lại trộn vào một quyền lợi** —
- "Thứ nhất là 15% lương" trong khi luật chỉ cho **giảm tối đa 15%**;
- "Thứ hai là 30 ngày làm việc" trong khi 30 ngày đó là **quãng được giữ nguyên lương cũ**;
- "Cái mất khi làm sai là chỗ làm" — quy việc mất việc cho hành động sai, trong khi hết 12 tháng thì quan hệ **tự chấm dứt theo luật**, không phải do ai làm sai.

Câu thứ ba: "Chuyển tạm thời tối đa 60 ngày một năm, phải báo trước 03 ngày" thiếu chủ thể → đọc thành người lao động tự chuyển mình. Đã thêm "Công ty chuyển bạn".

Sau khi áp: `check-plain` 532 mục **0 chỗ chưa đạt**, `check-refs` 428 chỗ, không "Cần xem tay".

**Tổng soát chương 19: Codex 4 câu** — thấp nhất từ đầu sách, và đó là kết quả của việc đề bài chương này viết bằng câu khẳng định có chủ ngữ, đúng bài học từ chương 14.

## Chương 19 — Claude 40 câu: 29 áp, 10 cờ, 1 trùng Codex

**Phát hiện lớn nhất là một con số mâu thuẫn nội bộ mà cả 4 agent viết nháp đều không thấy:** mục 6, 16 nói thời hiệu trọng tài là **09 tháng**, còn mục 8 và 17 nói **02 tháng**. Tra lại **Điều 190 BLLĐ**: 06 tháng cho hoà giải viên, **09 tháng cho hội đồng trọng tài**, 01 năm cho toà án. Vậy "02 tháng" sai — đã sửa cả ba chỗ. Đây đúng là loại lỗi chỉ lộ ra khi đọc cả chương, không phải từng mục.

**Sáu câu lỗi an toàn thân thể, xếp đầu bảng:**
- mục 12: "cách đúng là yêu cầu công ty tạm ứng bằng tin nhắn" → phải **cấp cứu trước, không chờ tiền công ty**.
- mục 10: "quá 05 ngày làm việc không quay lại thì mất phần bảo vệ đó" đọc thành **phải quay lại chỗ nguy hiểm** → đổi thành "nguy cơ chưa được khắc phục thì chưa phải quay lại".
- mục 10: câu mở đầu thu hẹp quyền so với phần Lợi ích (thiếu "nghiêm trọng").
- mục 1: "trừ thiên tai, dịch bệnh" đọc thành gặp thiên tai là buộc phải làm → thêm "nếu việc đó nguy hiểm đến tính mạng thì vẫn được từ chối".
- mục 6: "cách đúng là tiếp tục làm, gửi văn bản phản đối" → đảo thứ tự: gửi văn bản trước, làm tiếp chỉ khi nơi làm việc còn đủ điều kiện.
- mục 16: "bị ngược đãi thì được nghỉ ngay" thiếu bước **giữ chứng cứ trước**.

**Ba câu mâu thuẫn với chính phần Lợi ích của cùng mục** (mục 3, 8, 17) — kiểu lỗi do viết Chi phí trước rồi viết Lợi ích sau mà không đọc lại cặp.

**Câu mở chương tự phủ định:** "mức phạt hành chính thì chương ghi nguyên tắc chứ không nêu số" — trong khi hầu hết mục đều nêu số. Đã viết lại thành "lấy theo nghị định xử phạt vừa được sửa năm 2026".

Cổng bắt 4 mục vượt trần sau khi áp (1, 7, 10, 22) → viết lại, tất cả ≤235.

Sau khi áp: `check-plain` 532 mục **0 chỗ chưa đạt**, `check-refs` 428 chỗ, `check-split` 54 file.

**Tổng soát chương 19: Codex 4 + Claude 40 = 44 câu / 24 mục.**

## Chương 20 — Codex 5 + Claude 40 = 45 câu (17 mục)

**Mười câu đầu bảng của Claude đều là lỗi an toàn trẻ**, và bảy trong số đó cùng một lỗi: chữ **"trong ngày"**.
- "Bốn dấu hiệu phải đi viện **ngay trong ngày**" → đọc thành **còn chờ được đến hôm sau**; đổi thành "đi viện ngay".
- "đưa trẻ đi khám **trong ngày**" → "đi khám ngay" (ba chỗ).
- Mục 7 lại nói chi phí là "một chuyến quay lại trong **vài ngày**" — mâu thuẫn với chính mục 8.
- "phải bế trẻ đi tiêm **trong tháng đầu**" → đọc thành cả tháng vẫn kịp; đổi thành "đi tiêm sớm, không chờ tới lịch tháng sau".
- "từ **tháng thứ 6**" → "từ khi trẻ **tròn 6 tháng**".

**Hai câu mâu thuẫn ở phần dẫn chương do chính tôi viết:**
- "**phần lớn** các mốc an toàn không nằm trong văn bản Việt Nam" — sai, vì 10/17 mục hạng B → "**nhiều** mốc".
- "**không mục nào** được nêu liều thuốc" — sai, mục 7 và 16 có nêu → "liều ghi trong các mục không phải liều tự chọn".

**Chỗ hạng bằng chứng phải hạ theo nền thật** (ba agent tự bác đề bài): rung lắc trẻ = **C** (không có văn bản Việt Nam nào nhắc), tã = không có quy chuẩn phủ (mã 9619 bãi bỏ 2019), vitamin D = **hai bảng Việt Nam chênh nhau** 200 IU và 400 IU.

**Chữ dịch máy bị bắt**: "chi phí đổi bản chất" (2 chỗ), "chuồng chơi" → "quây chơi", "văn bản không **giả vờ** rằng", "quầy thu ngân" cho chuyện chọn vắc-xin, "đậu phộ" cụt từ (2 chỗ).

Cổng bắt mục 13 vượt trần sau khi áp (237/235) → viết lại còn 220.

Sau khi áp: `check-plain` 549 mục **0 chỗ chưa đạt**, `check-refs` 447 chỗ, `check-split` 55 file.

## Chương 21 — Codex 7 câu, áp 7/7

Câu nặng nhất là lỗi **đọc thành cho phép**: mục 13 viết "Hàng **không thuộc diện miễn** thì vẫn đi được, nhưng phải khai báo" — cụm đó bao gồm cả **hàng cấm**, nên câu đọc thành *mang thịt về, khai là xong*. Đã đổi thành "với hàng **được phép mang theo** nhưng không thuộc diện miễn, bạn phải khai báo".

Hai câu nhân hoá / sai kết hợp từ: "hạn mức của Việt Nam **không đi cùng bạn**", "Nghị định **nhận** thuốc trong hành lý là…".

Hai câu nói về việc viết: "thứ mình chuẩn bị trước không phải một lời hứa cứu, mà là **nguyên liệu để một cơ chế có thật chạy được**".

Một câu mơ hồ chủ thể: "hộ chiếu **có tên mình**" → "hộ chiếu do Nhà nước cấp".

Sau khi áp: `check-plain` 562 mục **0 chỗ chưa đạt**, `check-refs` 460 chỗ.

## Chương 21 — Claude 39 câu: 30 áp, 9 cờ

**Câu nguy hiểm nhất đã sửa ở mục 6:** "Không có hạn mức cộng dồn theo năm cho cá nhân rút hay mang tiền" — đọc thành **gợi ý chia nhỏ tiền nhiều chuyến để né khai**. Nay: "Không có hạn mức cộng dồn **không có nghĩa là được chia nhỏ tiền**".

**Mục 3 hứa quá thẩm quyền:** câu "nêu ý kiến với cơ quan chức năng sở tại" đọc thành **cơ quan đại diện tác động được**. Đổi thành "đề nghị họ đối xử đúng luật nước sở tại".

**Hai chỗ mâu thuẫn với Quỹ bảo hộ công dân** (mục 3, 11): mục 3 nói "không khoản nào được lo", trong khi chính mục 3 liệt kê Quỹ ứng tiền **có đặt cọc**. Đã thống nhất: ứng được, **nhưng phải có đặt cọc hoặc cam kết hoàn trả**, và tiền ứng phải hoàn lại.

**"Nước bạn" ba chỗ** (mục 12, 13) — đọc thành nước của người đọc thay vì nước đến/xuất khẩu. Đã đổi hết.

**Câu nói về việc in sách** (mục 5): "bản in sau ngày đó phải đọc lại" → "sau ngày đó bạn phải đối chiếu lại theo luật mới".

**Hai chỗ đọc ngược nghĩa:** "bản chụp **không làm** giấy tờ mất đi" (ý đúng: không miễn việc nộp đơn), và "nộp đơn báo mất **đúng** 02 ngày làm việc" (đọc thành phải nộp vào đúng 2 ngày đó).

**Chữ dịch máy:** "cái đỡ tay" → "chỗ dựa", "phần đối ứng" → "khi không mua".

Sau khi áp và sửa tay 2 chỗ mâu thuẫn (Bộ Nội vụ / tên cũ trong luật; "sản phẩm động vật" thay cho danh sách tự thêm), cổng bắt 2 mục vượt trần (3: 256, 9: 249) → viết lại còn 229 và 219.

Sau khi áp: `check-plain` 562 mục **0 chỗ chưa đạt**, `check-refs` 460 chỗ, `check-split` 55 file, `sync-stats` đạt.

**Tổng soát chương 21: Codex 7 + Claude 39 = 46 câu / 13 mục.**

## Chương 22 — Codex 12 + Claude 40 = 52 câu (12 mục)

**46 câu áp, 4 cờ "nghi ngờ nguồn" để nguyên (không tự sửa), 2 câu trùng — và cổng bắt 4 mục vượt trần sau khi áp.**

**Codex sửa đúng lớp lỗi quen thuộc của chương này: câu nói về khái niệm thay vì nói với người đọc.** Mười hai câu, gần hết là đổi chủ thể: "Cái phải trả là chuyện xã hội" → "Bạn có thể ngại làm mất vui"; "Đo cây quanh nhà, không đo số lần bạn đi công viên" → "Nghiên cứu đo cây xanh quanh nhà…".
- Đoạn mở chương do tôi viết cũng bị sửa: "Chương này trả lời hai câu khác nhau…" → nói thẳng vào việc người đọc phải làm.

**Claude bắt ba chỗ đọc ngược nghĩa — loại lỗi nguy hiểm nhất ở chương an toàn:**
- Mục 11: "Đừng đọc thành *đừng bao giờ tắm nóng*" → viết lại thành "Không phải lúc nào bạn cũng cần kiêng tắm nóng, nhưng vẫn cần…" — câu gốc vừa cảnh báo vừa mở đường hiểu sai theo hướng kiêng hết.
- Mục 5: "Luật Việt Nam không cấm hẳn" → "không cấm" (bỏ chữ "hẳn" làm nhẹ mức khẳng định).
- Mục 12: "không có luật nào bắt đội mũ" → viết rõ là với patin, trượt ván, xe đạp địa hình.

**Bốn mục bị đẩy vượt trần 235 ký tự sau khi áp** (5: 255, 6: 236, 7: 249, 11: 244) — rút câu ngay tại mục đó, không nới trần. Ba lượt rút mới xuống (226, 226, 225, 230).

Cổng cuối: `check-plain` 574 mục **0 chỗ chưa đạt**, `check-refs` 477 chỗ, `check-split` 56 file, `sync-stats` đạt.

## Chương 23 — Codex 8 + Claude 40 = 48 câu (25 mục)

**47 câu áp, 1 câu lệch vì đoạn gốc đã bị chính lượt áp trước sửa mất (mục 25), không áp lại được — không phải lỗi nội dung.** Codex chỉ ra 8 câu nhưng đúng chỗ: phần lớn là câu nói về "con số trung bình" như thể là lời hứa cho một người, hoặc câu khuyên quá tay.

**Cổng bắt 1 mục vượt trần sau khi áp** (mục 7: 242 ký tự) — rút tại chỗ còn 217, không nới trần.

Một chỗ đáng ghi vì nó lặp lại ở mọi chương: Claude sửa câu "Đường chuẩn để so mọi khoá học" thành câu nói thẳng vào người đọc, nhưng bản sửa **dài hơn** bản gốc 7 ký tự — nên luôn kiểm lại độ dài sau khi áp, không tin bản sửa của máy là ngắn hơn.

## Chương 24 — Codex 14 + Claude 36 = 50 câu (15 mục)

**50 câu áp, 3 câu của Claude lệch vì Codex đã sửa đúng đoạn đó trước (không phải lỗi nội dung), 1 cờ "nghi ngờ nguồn" ở mục 10 (thẩm quyền cấp giấy xác nhận khuyết tật — cùng mục ghi là chưa mở được văn bản).**

**Cổng bắt 3 mục vượt trần sau khi áp** (mục 3: 242, mục 6: 239, mục 7: 246) → rút tại chỗ còn 215/210/201. Lần thứ hai liên tiếp bản sửa của máy **dài hơn** bản gốc — đừng tin, luôn đo lại.

Codex sửa lớp lỗi quen thuộc: câu khẳng định tuyệt đối ("quỹ chỉ trả cho thuốc cấp tại cơ sở có hợp đồng") trong khi cùng mục đã nêu ngoại lệ thuốc hiếm/thiết bị C, D; và cặp "nói ba nhưng liệt kê bốn" ở mục 14 — Codex đổi thành "Bốn cái bẫy" thay vì bỏ một ý.

## Chương 25 — Codex 14 + Claude 34 = 48 câu (12 mục)

**48 câu áp, 5 câu của Claude lệch vì Codex đã sửa đúng đoạn đó trước, 0 cờ nghi ngờ nguồn.** Lần đầu tiên một chương không có mục nào vượt trần sau khi áp — nhưng vẫn kiểm lại lần cuối trước khi in.

Codex sửa cả hai câu trong đoạn mở chương, đúng chỗ hay sai nhất. Điểm chung của các câu bị sửa: **câu khẳng định một thủ tục là bắt buộc khi luật chỉ dùng chữ "được"**, và câu biến "thực tế hành chính" thành "quy định pháp luật" — hai lỗi này ở chương di sản gây thiệt hại thật, không chỉ gây khó đọc.

## Chương 26 — Codex 7 câu (13 mục), soát một vế vì Claude hết hạn mức

Claude Code hết hạn mức 5 giờ (reset 16:50 ngày 3/11) nên chương này **chỉ có bản soát của Codex**. Ghi lại để người sau biết đây là chương thiếu một vế, chứ không phải đã soát đủ hai máy.

**7/7 câu áp, 0 lệch, 0 cờ.** Cổng sạch ngay, không mục nào vượt trần.

Codex sửa đúng lớp lỗi nguy hiểm nhất của chương: câu làm **hai cửa thông báo khác nhau thành một** — "bị tấn công mạng" (cửa an ninh mạng) và "lộ dữ liệu cá nhân" (cửa bảo vệ dữ liệu) trả lời cho hai cơ quan khác nhau và hai mốc khác nhau; gộp lại là dạy người đọc báo sai chỗ.

## Chương 27 — Codex 17 câu (20 mục), soát một vế

Claude vẫn trong hạn mức 5 giờ tới 16:50 → chương này **chỉ có bản Codex**. 17/17 câu áp, 0 lệch, 0 cờ; cổng sạch; sau khi áp vẫn **0 chuỗi 120/110** và 13 chỗ dùng 115.

Chương 27 là chương đầu tiên có **mục hạng A** sau nhiều chương toàn B: axit folic trước khi có thai và vaccine cúm khi mang thai. Cả hai đều có thử nghiệm thật, không phải suy luận từ văn bản.

**Bài học riêng của chương này (đáng đưa vào quy trình chung):** ba luật an toàn do tôi đặt ra đã chặn nhầm thứ đáng dẫn — cấm chuỗi "110" chặn luôn Điều 110 Luật KBCB; cấm "nêu liều" chặn luôn ngưỡng chẩn đoán đái tháo đường thai kỳ; cấm "mọi số không có trong văn bản Việt Nam" làm mất mốc WHO (42 ngày, 18 tháng). Đã sửa cách phát biểu trong `references/pitfalls.md`.

## Chương 28 — Codex 7 câu (10 mục), soát một vế

Claude vẫn trong hạn mức 5 giờ → **chỉ có bản Codex**. 7/7 câu áp, 0 lệch, 0 cờ; cổng sạch.

Lớp lỗi Codex sửa ở chương này là **câu dạy người đọc đi hỏi một tờ giấy không tồn tại** ("bác sĩ chỉnh nha", "chứng chỉ hành nghề") và **câu biến việc kiểm tra thành việc tin vào biển hiệu**. Chương 28 là chương đầu tiên trong bộ sách mà một thuật ngữ pháp lý cũ bị thay đổi giữa đời sống và luật: từ 01/01/2024 là "giấy phép hành nghề", không còn "chứng chỉ hành nghề" — độc giả vẫn thấy chữ cũ trên tờ rơi, nên chương phải nói cả hai.

## Chương 29 — Codex 9 câu (14 mục), soát một vế

Claude vẫn trong hạn mức 5 giờ → **chỉ có bản Codex**. 9/9 câu áp, 0 lệch, 0 cờ.

**Bản soát này chạy bằng đề bài viết lại từ template sạch**, không dùng file đề bài tích luỹ: file cũ đã phình lên 12 dòng "ràng buộc" trùng nhau qua mỗi lần sao chép từ chương trước, nhiều dòng mâu thuẫn nhau. Template mới có 7 ràng buộc không trùng, chỉ thay hai chỗ: tên file và một ràng buộc rủi ro của riêng chương.

Sau khi áp, cổng bắt **mục 14 = 236 ký tự** (trần 235) → rút còn **234**, giữ nguyên ý "buổi kể lại một lần ngay sau biến cố không phòng được sang chấn; có thử nghiệm thấy triệu chứng nặng hơn". Đây là lần thứ năm liên tiếp bản sửa của máy **dài hơn** bản gốc — luôn đo lại sau khi áp.

Hai lỗi dẫn chiếu phát hiện trong lượt này đã ghi sang `docs/kiem-chung/cho-va.md`: chương 07 (đã phát hành) dẫn NĐ 161/2026 "Điều 2" cho mức tiền, đúng là **Điều 3 khoản 2**; chương 24 (chưa phát hành) đã sửa ngay hai chỗ của Luật KBCB.

## Chương 30 — Codex 5 câu (21 mục), soát một vế

Claude vẫn trong hạn mức 5 giờ → **chỉ có bản Codex**. 5/5 câu áp, 0 lệch, 0 cờ.

Đề bài sạch (template 7 ràng buộc) cho ra **ít câu hơn hẳn** các chương trước nhưng đúng chỗ hơn: chương này 21 mục mà chỉ 5 câu, trong khi ch25 (12 mục) từng ra 48 câu với đề bài tích luỹ. Sau khi áp vẫn **0 cỗ máy-free**: 704 mục, 0 lỗi trần, 633 chỗ neo, `111` xuất hiện 36 lần, `115` 11 lần, không có 120/110.

Lỗi nặng nhất của lượt này không do người soát bắt mà do **báo cáo của agent**: tên **"Luật Giao thông đường bộ" đã hết hiệu lực 01/01/2025**, thay bằng **Luật Trật tự, an toàn giao thông đường bộ 36/2024/QH15**. Tên cũ nằm trong **đoạn mở chương do chính người điều phối viết** — lần thứ bảy liên tiếp đoạn mở là chỗ sai. Đã sửa, đã ghi `legal-vn.md`.

## Chương 31 — Codex 17 câu (17 mục), soát một vế

17/17 câu áp, **0 lệch**, 0 cờ. Sau khi áp: 0 chỗ vượt trần, 652 chỗ neo. Năm chỗ chứa chuỗi `120` đều là **10.120.000 đồng** và **120 tháng vay**, không có số điện thoại nào.

**Bài học về đề bài do máy sinh:** lần chạy đầu dùng đề bài ghi `book/31-sau-18-tuoi.md` trong khi file thật là `book/31-sau-18-tuoi-co-may-duong.md`. Codex không đọc được file đích nhưng vẫn in ra 244.090 ký tự, trong đó **chỉ 1 dòng bắt đầu bằng `|`** — nếu đếm dòng bảng một cách mù quáng thì kết luận sẽ là "0 câu, chương sạch". Phải kiểm **tên file trong đề bài khớp tên file thật** trước khi chạy, và kiểm **khối codex cuối cùng có nhắc đúng tên file** trước khi tin kết quả.

**Rủi ro thứ hai:** hai tiến trình Codex cùng ghi vào `/tmp/review-codex-ch31.md` (bản chạy sai và bản chạy lại) → file trộn hai lần xuất. Chỉ an toàn nhờ bước áp kiểm `s.count(câu gốc)==1`: dòng rác không khớp thì bị bỏ, không sửa nhầm. Từ đây mỗi lần chạy lại phải dùng **tên file output riêng**.

## Chương 32 — Codex 20 câu (12 mục), soát một vế

20/20 câu áp, **0 lệch**, 0 cờ. Sau khi áp: 0 chỗ vượt trần, 691 chỗ neo. Chuỗi `110` duy nhất trong chương là **2.110 bảng** (phí visa + phụ phí y tế của Anh), không phải số điện thoại.

Ba lần liên tiếp đề bài sạch cho số câu vừa phải và đúng chỗ: ch29 ra 9, ch30 ra 5, ch31 ra 17, ch32 ra 20 — trong khi đề bài tích luỹ cũ từng ra **48 câu cho 12 mục**.

## Chương 33 — Codex 7 câu (21 mục), soát một vế

7/7 câu áp, **0 lệch**, 0 cờ. Kiểm an toàn sau khi áp: **0 chuỗi `120`/`110`**, `115` mười bốn lần.

**Lần thứ sáu liên tiếp bản sửa của máy dài hơn bản gốc:** ba câu (mục 19, 20, 21) sau khi áp vượt trần — 266, 255, 246 ký tự — và phải cắt tay hai lượt (mục 19 về 234). Quy trình từ nay: **áp xong phải chạy `check-plain --numbers --verbose` ngay**, không tin là đã sạch vì `check-draft` đã xanh trước đó (cổng nháp không đo trần câu này theo cùng ngưỡng).

## Chương 34 — Codex 10 câu (13 mục), soát một vế

10/10 câu áp, **0 lệch**, 0 cờ. Kiểm an toàn sau khi áp: **0 chuỗi `120`/`110`**, **0 `mg/kg`**; bốn con số `mg` còn lại đều là **nồng độ sản phẩm** (80 mg/0,8 ml; 160 mg/5 ml; 40 mg/1 ml; 20 mg/1 ml) đặt trong câu giải thích "cùng một chữ trên nhãn, khác nồng độ".

**Lần thứ bảy liên tiếp bản sửa của máy dài hơn bản gốc:** mục 11 lên 246 ký tự sau khi áp, phải cắt còn 216. Đây không còn là sự cố ngẫu nhiên — coi là quy luật: **mọi lượt áp bản soát đều phải chạy `check-plain --numbers --verbose` ngay sau đó.**

## Tổng kết 34 chương

Sách đủ **767 mục · 34 chương · A 127 · B 536 · C 104**. `check-plain` 0 chỗ chưa đạt, `check-refs` 707 chỗ có neo, `check-split` 67 file, `sync-stats` đạt, selfcheck đạt, `updates.json` khớp. Bốn định dạng đã dựng lại sau lượt soát cuối: HTML, EPUB, Anki 767 thẻ, PDF 10,4 MB.

**Chương 22–34 chỉ có một vế soát (Codex).** Claude Code hết hạn mức ngày 3/11; vế thứ hai chưa chạy cho ch22–ch34, và **ch15 vẫn chưa có vế Claude**. Đây là chỗ hở lớn nhất còn lại trước khi in.

## Vế Claude cho ch15 + ch22–ch32 — 360 câu, áp 360, 0 lệch

Claude chạy trên cùng file nhưng **ghi ra `/tmp/review-claude-chNN-r1.md`**, không ghi đè bản Codex; chỉ áp sau khi so hai vế.

**Ba loại hỏng do bản sửa gây ra, cổng bắt được hết:**
1. **9 câu vượt trần 235** (ch22 mục 6 = 290, ch26 mục 4 = 297 ký tự). Đã cắt tay từng câu, giữ nguyên mọi con số.
2. **ch25 đầu chương**: "ba chỗ" bị đổi thành "**các mục dưới đây**" → thay bằng "mục 5 (khai tử và xoá đăng ký thường trú), mục 9 (tiền gửi) và mục 12 (thứ tự giấy tờ)".
3. **ch32 mục 5**: "mục 263(b)" và "mục 262" là **điều của luật nhập cư Mỹ**, bị cổng đọc thành mục của sách → đổi thành "điều 263(b)", "điều 262".

**Phép kiểm số:** so tập hợp số giữa `git show HEAD` và bản hiện tại cho ch15 và ch22 (hai chương đã có trong git) — **không mất số nào**, chỉ đổi một ký tự (`32%` → `32%,`). Chín chương còn lại chưa có trong git nên không so được bằng HEAD; chúng đã qua `check-plain`/`check-refs`.

**Ch33 và ch34 chưa có vế Claude** — chạm hạn mức 5 giờ đúng ở ch33 (hai lần liên tiếp, 14:5x và 15:0x).

**Cổng sau lượt áp:** `check-plain` 0 chỗ chưa đạt · `check-refs` 709 chỗ có neo, 0 "Cần xem tay" · `sync-stats` đạt.
