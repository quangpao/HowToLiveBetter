# ID, bảng tra cứu và căn cứ pháp luật

Markdown trong `book/` vẫn là nguồn nội dung duy nhất. Số chương và số mục phục vụ việc đọc; ID cố định phục vụ liên kết. Web, HTML offline, PDF và EPUB sinh bảng Tra nhanh của từng chương từ chính các mục đó, với số mục, tiêu đề bấm được và mức bằng chứng. Cả bốn đầu ra bỏ phần “Nhóm mục” cùng danh sách nhóm nhiều đoạn ở đầu chương để không lặp với bảng; vẫn giữ phần giới thiệu, bằng chứng và bối cảnh Việt Nam, kể cả đoạn nằm sau danh sách nhóm. Quy tắc bỏ nhóm dùng chung trong `assets/book-references.js`; Markdown gốc được giữ nguyên.

## Sửa và thêm mục

Mỗi mục có neo ngay sau nhãn chi phí:

```html
<a name="entry-ten-id-co-dinh" data-legacy="2-2"></a>
```

- Giữ nguyên ID khi sửa tiêu đề, đổi số hoặc chuyển chương. Chuyển cả neo và nhãn cùng mục.
- `data-legacy` là địa chỉ số ở lần chuyển đổi đầu tiên, không phải số hiện tại. Không sửa hay cấp lại cho mục mới. Nó giữ link `#e-2-2`, vị trí đọc dở và GUID/ID Anki đã phát hành.
- Mục mới chưa có neo: chạy `node tools/references.mjs --assign`. ID ban đầu lấy từ tiêu đề, sau đó cố định.
- Sau khi di chuyển hoặc đổi số, chạy `node tools/references.mjs` để cập nhật nhãn liên kết, đường dẫn và `data/entries.json`.
- Xóa mục: xử lý từng liên kết đang trỏ vào mục đó trước. Không tái sử dụng ID. `data/entry-aliases.json` giữ alias, ID đã cấp và ID đã xóa; không xóa lịch sử để làm kiểm tra xanh.
- `--init` chỉ dành cho lần chuyển đổi đầu tiên; không chạy lại. `--migrate` dùng để chuyển tham chiếu số mới viết sang Markdown sau khi đã đối chiếu ý nghĩa.

Tham chiếu mới dùng liên kết Markdown bình thường:

```markdown
[mục 2](02-dung-chet-dan.md#entry-id-co-dinh)
```

Danh sách số có một link cho mỗi đích. Một khoảng liên tục có thể dùng tiêu đề `"refs:id-a,id-b,id-c"` để cố định toàn bộ nhóm; Web giữ cả nhóm, GitHub/PDF/EPUB có liên kết chính tới mục đầu. Công cụ cập nhật số hiển thị theo ID và báo lỗi khi mất đích. Bảng `docs/doi-chieu-muc.md` vẫn phải được đọc khi thay đổi cấu trúc.

`assets/book-references.js` là lõi dùng chung của Web và các bộ dựng. PDF/EPUB có neo từng mục. Trang tự kiểm và bản offline cũng dùng cùng ID; vị trí đọc dở lưu ID, đồng thời nhận dữ liệu lưu cũ.

## Trích dẫn pháp luật

Web thu gọn đầy đủ trường pháp luật của mọi mục; hover/focus phần tiêu đề xem trước **diễn giải trong cẩm nang**, nhấn để mở đủ nội dung. Tìm kiếm vẫn đọc cả phần đang đóng và tự mở khi khớp từ khóa. Markdown, PDF và EPUB giữ toàn bộ trường pháp luật.

`data/legal-references.json` chỉ chứa trích đoạn nguyên văn đã đối chiếu. Mỗi bản ghi có ID, văn bản, điều/khoản/điểm, phiên bản, ngày đối chiếu, URL và vị trí trong nguồn chính thức, nguyên văn, phạm vi đối chiếu. `bindings` gắn **ID mục + tên trường + chuỗi chính xác**. Không suy ra văn bản từ điều khoản đứng gần, không dùng diễn giải của sách làm nguyên văn, không coi ngày đối chiếu đoạn trích là xác nhận hiệu lực toàn văn.

Khi sửa câu nguồn làm binding không còn khớp đúng một lần, kiểm tra sẽ đỏ. Đối chiếu lại và cập nhật binding. Đoạn chưa kiểm giữ nguyên cách đọc và nguồn hiện có; không tự sinh nguyên văn. Đợt đầu có **hai trích đoạn** tại chương 2 mục 2: Điều 11 Luật 09/2012/QH13 và khoản 1 Điều 24 Nghị định 90/2026/NĐ-CP. Các căn cứ còn lại chưa được chuyển thành trích nguyên văn.

Web dùng nút trích dẫn: hover/focus xem trước, nhấn mở hộp có đủ nguyên văn, phiên bản và nguồn; Escape đóng, điện thoại mở cùng nội dung. Bản offline nhúng cả registry, không gọi mạng khi xem. Nếu tải registry thất bại, nội dung pháp luật gốc vẫn đọc được. PDF/EPUB thêm ký hiệu ghi chú cùng một phụ lục, có link qua lại; in giấy vẫn đọc được nguyên văn và địa chỉ nguồn.

## Kiểm tra

```sh
node tools/references.mjs --check
node tools/test-references.mjs
node tools/check-refs.mjs --check
node tools/test-reader.mjs
node tools/check-selfcheck.mjs
node tools/test-citations.mjs
node tools/offline/build.mjs
node tools/test-offline.mjs
```

Sau đó chạy các kiểm tra nội dung và bốn bộ dựng như workflow. Với UI, kiểm cả ba cách xem, bảng tra chương, link số cũ, link ID, đọc dở, tìm trong luật, bàn phím và màn hình nhỏ.

## Đối chiếu lần chuyển đổi

36 chương, 785 mục và 5.174 trường được đối chiếu trước/sau. Sau khi bỏ cú pháp neo/link mới, cả 36 file chương và bài dài trong README giống từng byte với bản trước; không đổi chữ, số liệu, nguồn, nhãn hay thứ tự. Thêm 785 ID và giữ 785 alias cũ. Bộ quét nhận 927 đích thay vì 741: đã mở rộng dấu kết câu và danh sách nhiều số.

740 đích cũ giữ nguyên. Một đích từng bị bộ quét hiểu nhầm được sửa: chương 29 mục 12 viết “chương 17 mục 1 và mục 2”; “mục 2” cùng thuộc chương 17, trước đây báo nhầm chương 29 mục 2. Có kiểm thử riêng cho trường hợp này. Mở rộng bộ quét không đồng nghĩa xác minh lại ý nghĩa của mọi lời khuyên hoặc hiệu lực của mọi căn cứ pháp luật.
