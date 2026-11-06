# Cẩm nang sống thông minh · Quy tắc bản Việt

Áp dụng cho nhánh `vi`. Hướng dẫn và lịch sử của bản gốc được lưu tại [hồ sơ 05/11/2026](docs/kiem-chung/huong-dan-goc-2026-11-05.md), chỉ để tham khảo. Yêu cầu hiện tại của người dùng và quy tắc bản Việt dưới đây được ưu tiên.

## Mục tiêu

Giúp người đọc tìm việc phù hợp, hiểu điều kiện và biết bước tiếp theo. Không yêu cầu làm hết danh sách, không xếp giá trị của con người theo khả năng đem lại lợi ích. Chi phí, lợi ích và bằng chứng là các thông tin riêng; không quy đổi các thước đo thành một điểm chung.

## Nội dung và nguồn

- `book/*.md` là bản chuẩn. README giữ lời dẫn, mục lục, thuật ngữ. Mọi định dạng sinh từ cùng nguồn; không sửa tay bản dựng để che lỗi nguồn.
- Đọc [STYLEGUIDE.vi.md](STYLEGUIDE.vi.md) trước khi sửa câu. Viết tiếng Việt tự nhiên; giữ đối tượng, thời gian, phạm vi, ngoại lệ, phủ định và mức chắc chắn.
- Mỗi mục có Chi phí, Nói dễ hiểu, Lợi ích, Mức bằng chứng, Nguồn và Ghi chú. Pháp luật Việt Nam là trường tùy chọn sau Lợi ích. Giữ mỗi trường trên một dòng Markdown; bộ dựng chia đoạn để đọc.
- Bản ngắn phải tự đủ nghĩa và không hướng dẫn khác phần chi tiết. Điều kiện làm thay đổi hành động, liều, đối tượng hoặc hạn chót phải ở ngay phần đầu.
- Số liệu nghiên cứu, thiết kế và khoảng tin cậy giữ ở Lợi ích/Nguồn. Bản ngắn không chứa HR/RR/OR/SMD, g/d/r, odds hoặc độ lệch chuẩn. Không tự quy HR/OR thành xác suất.
- Không biến thiếu bằng chứng thành đã chứng minh vô hiệu; không biến quan sát thành nhân quả. Ghi chú cần thông tin thật, không có độ dài tối thiểu hoặc khuôn “ba bẫy” bắt buộc.
- Ưu tiên tài liệu gốc, cơ quan chính thức và nguyên văn pháp luật. Không bịa DOI, trích dẫn, ngày hiệu lực, mức hưởng hoặc mức phạt. Giữ hạng bằng chứng cũ nếu không có căn cứ đổi.
- Thay số liệu/kết luận y khoa hoặc pháp luật phải mở nguồn và kiểm phạm vi. Chưa xác định được thì ghi vào hàng đợi, không chứng nhận bằng một check xanh.
- URL tài liệu nằm ở Nguồn. Trường luật ghi kết luận, văn bản, điều/khoản, điều kiện và thời điểm; không sao chép URL sang nhiều trường.
- `data/review-status.json` ghi phạm vi, ngày đối chiếu, nguồn và việc còn cần rà theo ID. Kiểm câu chữ, kiểm nguồn và thẩm định chuyên môn là các việc khác nhau. Ngày sửa không xác nhận hiệu lực luật.
- Chỉ thêm trích nguyên văn vào `data/legal-references.json` khi đã đối chiếu nguồn chính thức và binding đúng ID–trường–chuỗi. Không đoán điều luật từ số điều gần đó.

## Danh tính và tham chiếu

- ID cố định, không đổi/tái sử dụng ID, `data-legacy` hoặc alias khi đổi tiêu đề, số hay chương. Có thể sửa tiêu đề cho tự nhiên.
- Số mục là vị trí hiển thị. Liên kết dùng Markdown tới `#entry-ID`; đoạn chỉ đường nói rõ chủ đề để người đọc hiểu trước khi bấm.
- Khi gộp, giữ thông tin riêng và thiết kế đích thay thế cho ID cũ trước khi bỏ mục. Không để liên kết cũ rơi sang mục khác. Không tự mở chương mới.
- Sau thay đổi chạy `node tools/references.mjs`; đọc diff `data/entries.json`, `data/entry-aliases.json`, `docs/doi-chieu-muc.md`. Không sửa tay dữ liệu sinh.
- Bảng tra đầu chương thay danh sách nhóm trùng chức năng; giữ lời dẫn có nội dung. Web/PDF/EPUB phải trỏ cùng ID.

## Dữ liệu và giao diện

- Thời lượng và tần suất là hai khái niệm riêng. Bộ lọc tuổi hiểu ngưỡng số; thiếu nhãn không chứng minh mục không liên quan.
- `data/reader-index.json` và năm trang tĩnh do `tools/reader-data.mjs`, `tools/site-pages.mjs` sinh. Nội dung đầy đủ tải theo chương. HTML ngoại tuyến vẫn nhúng đủ chương và logic.
- `data/reading-paths.json` ghép tình huống bằng ID, không tạo nguồn nội dung thứ hai. Sửa nội dung chuẩn rồi sinh lại trang.
- Selfcheck dùng `entryId`; khóa chữ cũ chỉ phục vụ chuyển đáp án. Nếu ý nghĩa câu hỏi đổi, tăng `rev`, không dùng lại đáp án cũ.
- Tìm kiếm, vị trí đọc, câu trả lời và việc đã lưu xử lý/lưu tại trình duyệt. Không gửi truy vấn thô hoặc câu trả lời tới analytics.
- Giữ thao tác bàn phím, focus modal, reduced motion và reflow. Thông tin thiết yếu không chỉ xuất hiện khi hover.

## Kiểm và phát hành

Sau sửa nội dung/metadata:

```sh
node tools/references.mjs
node tools/sync-stats.mjs --no-screenshot
node tools/og/build.mjs
node tools/test-reader-rules.mjs
node tools/test-reader.mjs
node tools/test-references.mjs
node tools/test-citations.mjs
node tools/check-refs.mjs --check
node tools/check-plain.mjs
node tools/lint-vi.mjs
node tools/check-legal.mjs
node tools/check-split.mjs
node tools/check-selfcheck.mjs
node tools/test-check-draft.mjs
node tools/test-check-legal.mjs
node tools/test-lint-vi.mjs
node tools/test-repo-links.mjs
node tools/sync-stats.mjs --check
node tools/updates.mjs --check
```

Thay bộ dựng/giao diện thì dựng và kiểm định dạng tương ứng. EPUB: `npm --prefix tools/epub ci` rồi `node tools/epub/build.mjs`. HTML: `node tools/offline/build.mjs`, `node tools/test-offline.mjs`. Anki: `node tools/anki/build.mjs`. PDF cần pandoc/typst theo phiên bản workflow. Ảnh chia sẻ dùng cùng Typst, không cần Chrome; CI chạy `node tools/og/build.mjs --check`. Không đưa file sách nhị phân vào Git.

Đọc diff trước commit. Nếu sửa thân mục hoặc bài dài, mở một subagent rà phần đổi theo nguyên tắc giữ nguyên ý của shuorenhua: [SKILL.md](https://github.com/MrGeDiao/shuorenhua/blob/main/skills/shuorenhua/SKILL.md), [editing-guide.md](https://github.com/MrGeDiao/shuorenhua/blob/main/skills/shuorenhua/references/editing-guide.md). Reviewer không mở rộng phạm vi, không đổi Git, không chạy bộ sinh ở chế độ ghi, không sửa hàng loạt thân bài bằng script, không gửi dữ liệu ra ngoài. Điểm chưa rõ trả về luồng chính xác minh.

Các cổng cấu trúc/nội dung là dependency thật của build trong `.github/workflows/book.yml`. PR dựng để kiểm; sách chỉ phát hành khi thay đổi vào `vi`. Quy mô hiện tại lấy từ bộ sinh, không ghi một số chương/mục bất biến vào quy tắc.
