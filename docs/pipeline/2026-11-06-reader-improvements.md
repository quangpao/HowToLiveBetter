# Cải thiện trải nghiệm đọc · 06/11/2026

## Kết quả

- Giữ 36 chương, 785 mục và toàn bộ ID/alias. Số mục tiếp tục là vị trí hiển thị; liên kết và đáp án tự kiểm tra dùng ID cố định.
- Tìm kiếm không phân biệt dấu, hỗ trợ BHYT/BHXH/CCCD, ưu tiên tiêu đề phù hợp và bỏ URL khỏi nội dung tìm. Bộ lọc hiểu ngưỡng tuổi, có đủ các thước đo hiện có.
- Trang đầu tải danh mục; nội dung đầy đủ tải theo chương và kiểm hash. Bản HTML ngoại tuyến vẫn có đủ nội dung. Không gửi truy vấn hoặc câu trả lời tới analytics.
- Thêm trang tình huống, việc đã lưu tại trình duyệt, tải sách, giới thiệu cẩm nang, pháp luật và phạm vi kiểm chứng. Trang luật ghép từ cùng nguồn, không duy trì một kho luật riêng.
- Link tải PDF/EPUB/HTML/Anki trỏ thẳng tới tài sản Release. Mỗi mục có nút góp ý điền sẵn ID, liên kết và phiên bản.
- Sửa cách tách đoạn khi gặp dấu nháy; dùng chung quy tắc cho web, PDF và EPUB. Bìa sách dùng hình đang có của bản Việt.
- Selfcheck phân biệt câu chưa trả lời và bỏ qua; gợi ý theo từng nhóm, không gom các thước đo thành một thứ hạng. Câu đổi nghĩa có phiên bản riêng để không dùng lại đáp án cũ.
- Lịch sử sửa nhận diện bằng ID, không coi đợt nhập bản Việt là hàng trăm mục vừa thêm. Thay đổi điều kiện ngắn vẫn được ghi nhận.
- Các cổng kiểm là dependency thật của build; PR dựng để kiểm, không phát hành.

## Biên tập và phạm vi

Đợt này sửa 20 mục được nêu trong đánh giá: câu dịch sát, ký hiệu thống kê trong bản ngắn, lời nhắc biên tập bị sót, điều kiện cấp cứu, quy trình tranh chấp lao động, ngoại lệ bằng lái cũ và phép tính trợ cấp. Không gộp hoặc xóa mục khi chưa xác định nơi giữ các thông tin riêng.

`data/review-status.json` ghi phạm vi thực tế theo ID. Đối chiếu nguồn không thay cho thẩm định chuyên môn; hai hướng dẫn cấp cứu còn cần rà độc lập. Mục tranh chấp lao động còn cần kiểm riêng hiệu lực phần mức phạt. Không dùng kiểm cấu trúc hoặc ngày chỉnh sửa để chứng nhận toàn bộ nội dung.

Các việc tiếp theo: biên tập lần lượt những mục dài còn lại; tách kết luận, điều kiện và dẫn chứng khi có người rà nội dung; mở rộng nhãn đối tượng sau khi đối chiếu từng mục. Chưa mở chương mới hoặc tách repo pháp luật.

## Kiểm trước merge

Chạy các lệnh trong `CLAUDE.md`, thêm `tools/test-updates.mjs`, `tools/reader-data.mjs --check` và `tools/site-pages.mjs --check`. Dựng cả bốn định dạng; kiểm EPUB bằng epubcheck. Kiểm giao diện tìm kiếm, bộ lọc tuổi, lưu mục, đọc sách theo chương, trang luật, trang tải và selfcheck. Kiểm mẫu PDF ở bìa, mục lục và phần pháp luật dài.

Những kiểm tra trên xác nhận cấu trúc và hành vi trong phạm vi thử. Chúng không chứng nhận hiệu lực của mọi văn bản, độ chính xác y khoa của mọi mục hoặc khả năng truy cập đầy đủ theo WCAG.

## Kiểm hồi quy khi tải chương và tìm kiếm

- Ý định mở nguồn được giữ riêng cho mục đang mở, áp sau khi nội dung tải xong và xóa khi đóng. Kiểm cả tải chậm, mục đã nạp, đóng/sang mục khác trước khi tải xong và tự đóng nguồn sau khi đọc.
- Tìm theo biên token; chỉ cho phép tiền tố ở token chữ cuối có ít nhất bốn ký tự. Cụm BHYT/BHXH/CCCD được nhận diện trước khi loại từ trùng. Kiểm đúng tập ID trong nguồn Markdown, không đặt số kết quả tối thiểu. Không dùng việc cụm từ còn liền nhau trong danh mục đã loại từ trùng làm căn cứ đếm.
- Các token tìm kiếm, kể cả hạng A/B/C, phải giống nhau trước và sau khi nạp đầy đủ mọi mục.
- Năm trang tĩnh đặt nền trước stylesheet; kiểm cả tùy chọn đã lưu, nền hệ thống và trường hợp không đọc được localStorage. Các nhãn đồng nghĩa về người cao tuổi được chuẩn hóa cùng nhau.
- Ảnh chia sẻ dùng lại `og.png` 1200×630, có số liệu từ `tools/og.html`; dựng bằng Typst với phông nhúng để không phụ thuộc Chrome hay phông hệ điều hành. CI đối chiếu ảnh dựng với bản đã commit. Hình minh họa trang đầu và bìa sách giữ nguyên.
- Nguồn quy trình mục 7.2 dùng bản Công báo đã tải và đọc trực tiếp Điều 188–190, trang in 93–96. Không suy từ lỗi kết nối MOJ tại một máy thành kết luận website đã hỏng ở mọi nơi. Phần mức phạt vẫn cần rà hiệu lực; đợt kiểm này không rà toàn bộ URL của sách.
