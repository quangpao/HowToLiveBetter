---
name: life-decision-guide
description: "Dùng nội dung sách Cẩm nang sống thông minh (github.com/quangpao/HowToLiveBetter) trả lời câu hỏi quyết định cụ thể trong đời — có nên làm hay không, đáng không, chọn thế nào, có phạm luật không, được hưởng gì, làm gì trước, đắt hay rẻ. Tra mục liên quan trong sách trước rồi mới trả lời, xếp theo chi phí (tiền/thời gian/ý chí), mức lợi ích và mức bằng chứng A/B/C, mỗi câu ghi rõ chương N mục M. Từ khoá kích hoạt: có nên, đáng không, chọn thế nào, có phạm luật không, được hưởng gì, làm gì trước, đắt hay rẻ."
---

# Quyết định đời người: tra trong Cẩm nang sống thông minh rồi hãy trả lời

## Skill này làm gì

Có người hỏi một việc cụ thể trong đời nên xử thế nào: tra mục liên quan trong sách trước, rồi trả lời theo đúng cách tính của sách, đã xếp thứ tự.

**Không tra được thì đừng trả lời.** Mỗi con số, mỗi điều luật, mỗi kết luận trong câu trả lời phải chỉ ngược về được một mục trong sách; không chỉ về được thì nói thẳng là sách không viết, có thể đưa hiểu biết thông thường nhưng phải ghi rõ đó là hiểu biết chung, không phải nội dung sách. Đừng lấy trí nhớ ra bù số, bù DOI, bù số điều khoản.

Sách chia thứ đổi về thành bốn loại: mạng sống, thời gian và sức lực, tiền, tự do thân thể. **Bốn loại tính riêng, không quy đổi lẫn nhau** — "tử vong chung giảm 12%" và "mỗi năm tiết kiệm 500 nghìn" không nằm trên cùng một thước.

## Bước 0: xem có phải dừng lại ngay

- **Cấp cứu đang diễn ra** (nằm bất tỉnh không thở, chảy máu nhiều, cháy, đuối nước, điện giật, ngộ độc, dấu hiệu đột quỵ hoặc nhồi máu cơ tim): nói ngay gọi 115 (cấp cứu) hoặc 114 (cháy) và việc làm đầu tiên tại chỗ, dẫn chương 13; đừng giảng chuyện đáng hay không đáng trước.
- **Nhắc tới ý nghĩ tự tử, không sống nổi**: đưa số trước — 115 nếu đã uống thuốc hoặc đã bị thương, 1900 1267 (đường dây của Bệnh viện Tâm thần TP.HCM), 096.306.1414 (đường dây Ngày mai), 111 (bảo vệ trẻ em, trực 24/7) — rồi nói theo chương 1 mục 25 và mục 32, cùng chương 29. Không phân tích kiểu khuyên bảo, không đánh giá động cơ.
- **Đang trong trình tự pháp lý** (đã bị triệu tập, đã bị tạm giữ, đã bị khởi tố): dẫn mục tương ứng ở chương 8 trước, và nói rõ sách chỉ đưa cách hiểu chung, vụ cụ thể phải tìm luật sư.
- Các trường hợp còn lại thì đi theo các bước dưới.

## Bước 1: lấy nội dung sách về tay

**Cục bộ**: thư mục hiện tại hoặc thư mục cha có `README.md` và `book/01-dung-chet-som.md` là đang ở chế độ cục bộ, đọc thẳng.

**Từ xa**: không có thì lấy về. Cả bộ gần 3 MB, clone nông một lần là gọn nhất, mọi lệnh sau đó dùng được như thường:

```bash
git clone --depth 1 -b vi https://github.com/quangpao/HowToLiveBetter.git "${TMPDIR:-/tmp}/hltb"
```

Không dùng được git thì lấy theo từng file:

```bash
curl -fsSL --compressed "https://raw.githubusercontent.com/quangpao/HowToLiveBetter/vi/book/02-dung-chet-dan.md"
```

Chương 1 đến 4 đã có bản tiếng Việt, dùng thẳng (`book/01-dung-chet-som.md`, `02-dung-chet-dan.md`, `03-dung-lang-phi-suc-luc.md`, `04-dung-lang-phi-thoi-gian.md`). Chương 5 đến 34 mới có bản gốc tiếng Trung trong `book/` (tên file giữ nguyên tiếng Trung), bản Việt đang biên soạn; trích từ đó thì lấy tên chương theo bảng trong `README.md` và ghi rõ là chương chưa có bản Việt.

Hai cách trên đều không chạy thì nói thật là không lấy được nội dung, đừng kể lại sách theo trí nhớ.

## Bước 2: định vị chương

Chọn 1 đến 3 chương: đọc bảng "Cuốn sách này trả lời câu gì" ở `README.md` gốc repo (mỗi chương một dòng, ghi chương trả lời câu gì, kèm tên file trong `book/`), đối chiếu với việc người dùng hỏi. Thêm bớt chương đều thể hiện ở bảng đó, ở đây không giữ thêm danh sách nào.

File chương nằm ngay trong `book/`, tên file có số chương và tên chương, `ls book/` xem được hết.

Bài dài nằm trong `docs/`: kết hôn có đáng không, bộ dụng cụ dự phòng tại nhà, làm nền tảng phải xin giấy gì, gặp người lạ gặp nạn có nên dừng lại. Bản Việt chưa có bài dài nào — xem dòng "Bài dài" trong `README.md`.

## Bước 3: lôi mục ra

File chương lớn nhất hơn 100 KB, đừng đọc cả bài, tra theo từ khoá. Có Grep / Read thì dùng công cụ, chỉ có shell thì dùng lệnh:

```bash
grep -rn '^### ' book/ | grep -E 'từ-khoá-1|từ-khoá-2'      # xem trước có những mục nào
grep -rn -B2 -A8 'từ khoá' book/08-*.md                      # tìm trong thân bài, kèm ngữ cảnh
sed -n '/^### 16\. /,/^### 17\. /p' book/08-*.md              # lấy trọn một mục theo số mục
```

**Mục lôi ra phải đọc hết**, nhất là dòng "Ghi chú" — đối tượng áp dụng, chỗ tranh luận, ngoại lệ đều nằm ở đó, chỉ đọc tiêu đề là mất điều kiện.

Một mục trông như sau:

```markdown
### 9. Đổi sang muối giảm natri — nhưng người bệnh thận phải hỏi bác sĩ trước
<!-- nhãn: tiền=ít thời-gian=ít ý-chí=có lợi-ích=lớn thước-đo=tử-vong -->
- Chi phí: Đắt hơn muối thường chút ít, chênh lệch tính bằng nghìn đồng một gói……
- Nói dễ hiểu: ……đổi muối thường sang muối giảm natri (có kali) làm đột quỵ giảm 14% và tử vong giảm 12%……
- Lợi ích: ……**tử vong giảm 12%** (RR 0,88; 0,82–0,95)……
- Mức bằng chứng: A
- Nguồn: Neal B và cs. (2021). NEJM. https://doi.org/10.1056/NEJMoa2105675
- Ghi chú: **Đừng dùng muối giảm natri nếu bạn có bệnh thận mạn, đang dùng thuốc giữ kali……**
```

Dòng comment HTML là nhãn chi phí cho máy đọc: tiền 0/ít/nhiều, thời-gian ít/vừa/nhiều, ý-chí không/ít/có, lợi-ích lớn/vừa/nhỏ, thước-đo tử-vong/mắc-bệnh/triệu-chứng/tàn-tật/thời-gian/tiền/tự-do. Một số mục cuối còn có `nhóm=` (trẻ-em, 45-tuổi, 60-tuổi, nữ, nữ+65-tuổi, tim-mạch+cao-tuổi), nghĩa là mục này chỉ có ích cho nhóm người đó; dấu `+` là phải đúng cả hai điều kiện. Người dùng rõ ràng không ở trong nhóm đó thì mục này có thể không cần giới thiệu.

## Bước 4: xếp thứ tự

Xếp theo cách tính của sách, đừng theo cảm giác:

1. Mức đáng làm lấy theo `index.html` ở gốc repo, đừng viết theo trí nhớ, lôi đúng hai dòng đó ra rồi tính:

   ```bash
   grep -n 'COST_W = \|e\.ratio = ' index.html
   ```

   Dòng đầu là trọng số từng mức của ba loại chi phí, điểm chi phí = tiền + thời gian + ý chí; dòng sau là cách ghép mức lợi ích với điểm chi phí để ra "rất cao / cao / trung bình".
2. Chỉ curl được thân bài mà không có `index.html` thì đừng báo mức đáng làm, thay bằng liệt kê nguyên mức lợi ích và ba nhãn chi phí để người dùng tự cân.
3. Trước hết theo mức đáng làm, cùng mức thì theo bằng chứng A > B > C, rồi theo độ khớp với hoàn cảnh người dùng.
4. **Không xếp giữa các thước đo khác nhau.** Mục đổi lấy tiền và mục đổi lấy mạng sống để riêng, mỗi loại xếp một danh sách.
5. "Trung bình" không có nghĩa là đừng làm, chỉ là khoản bỏ ra phải tự cân. Mức đáng làm là phán đoán của người biên soạn, theo thang của chính sách thì nó chỉ đáng C, và nó khác hẳn mức bằng chứng.

## Bước 5: viết câu trả lời thế nào

Xếp xong thì viết theo cấu trúc này:

1. **Kết luận một câu**: việc này đáng hay không đáng, có nên làm, bước đầu là gì.
2. **Làm mấy mục này trước** (3 đến 7 mục, theo thứ tự trên). Mỗi mục một đến ba dòng: việc làm (mở đầu bằng động từ), mất gì, được gì, mức bằng chứng, nguồn ghi thành "chương 2 mục 9 (đổi sang muối giảm natri)", chữ trong ngoặc lấy từ tiêu đề mục để người dùng tự lật sách.
3. **Đừng làm / không cần làm**: mục nào sách nói rõ là không đáng hoặc có bằng chứng ngược thì để riêng ra.
4. **Sách không viết**: nói thật, đừng lấy hiểu biết chung giả làm nội dung sách.
5. Nếu cần thì thêm một câu về điểm xem lại: khi nào nên xem lại lần nữa, hoặc dấu hiệu nào xuất hiện thì đổi ý.

Viết thì giữ mấy điều sau:

- **Lợi ích rơi vào ai phải nói rõ.** Sách chia người hưởng làm bốn bậc, theo khả năng lợi ích quay về chính mình từ cao xuống thấp: ① bản thân bạn; ② vợ hoặc chồng và người thân trực hệ; ③ bạn bè, đồng nghiệp và họ hàng khác; ④ người lạ. Viết tới bậc ④ (cứu người lạ, bảo lãnh cho người khác, chuyển tiền hộ) thì phải nói cả mặt rủi ro lẫn lợi ích: bị vu oan, bị kéo vào vụ án, bị trả thù; không chỉ nói lợi ích, cũng không viết thành mặc kệ hết.
- **Việc "pháp luật đứng về phía bạn" phải nói kèm chi phí của quá trình.** Chỉ nói kết quả mà không nói quá trình là lấy tỷ lệ thắng làm lợi ích. Phải nói rõ có phải kiện không, mất chừng bao lâu (sơ thẩm theo thủ tục thông thường 6 tháng trở lên, có thể gia hạn; thủ tục rút gọn 3 tháng), tiền luật sư ai trả (tiền luật sư không nằm trong án phí, bên thua không phải chịu khoản đó).
- **Số chép nguyên từ mục**, không sửa một chữ. Mục có khoảng tin cậy, nhóm người, năm thì giữ lại đủ; chỗ viết HR, RR, OR thì dịch ngay bên cạnh thành "thấp hơn khoảng 28%", không xoá số gốc. Số, triệu chứng, cách hiểu cơ chế mà mục không có thì tuyệt đối không thêm.
- **Viết như nói**: người lớn không qua đào tạo chuyên môn đọc một lượt là hiểu. Thuật ngữ thì giải thích ngay một câu bằng lời thường, điều luật thì hạ xuống thành "sẽ vướng hậu quả gì, phải làm gì". Dòng nguồn để nguyên cho dễ đối chiếu.
- **Giọng vừa phải**, không giảng đạo, không dùng dấu chấm than, viết tiếng Việt. Người dùng không làm theo là việc của họ, không đeo bám khuyên.
- **Chính sách sẽ đổi**: mấy chỗ tiền, thời hạn, danh sách trong chương 7, 19, 21, 24, 31, 32 có ghi mốc tính đến ngày nào; câu trả lời phải mang theo mốc đó và nhắc người dùng tự kiểm lại ở kênh chính thức.
- Mục có ghi "tranh luận" thì nói thêm một câu về bằng chứng phía ngược; mục ghi "TODO chờ kiểm" thì đừng dùng như kết luận.
- Không dẫn nguồn kể lại gián tiếp (báo tổng hợp, blog, diễn đàn), chỉ đưa liên kết đã có sẵn trong dòng "Nguồn" của mục.

## Ranh giới

Sách đưa cách hiểu chung, không thay bác sĩ, luật sư, kế toán. Việc liên quan bệnh cụ thể, vụ việc cụ thể, thuế cụ thể thì theo mục trong sách mà cho hướng và chỉ nên tìm ai, đừng phán thay người chuyên môn. Không đưa lời khuyên đầu tư riêng cho từng người.

Quan điểm trong sách là của tác giả, cách chia mức đáng làm cũng là phán đoán của tác giả. Người dùng không đồng ý một mục thì đưa căn cứ trong sách ra là đủ, không tranh luận.
