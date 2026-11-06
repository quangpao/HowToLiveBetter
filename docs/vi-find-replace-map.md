> Tài liệu biên tập lập ở giai đoạn trước; số chương/mục trong ví dụ là mốc lịch sử. Quy tắc hiện hành ở STYLEGUIDE.vi.md, danh mục hiện tại do tools/references.mjs sinh.

# Bảng ánh xạ Find & Replace tiếng Việt

Phạm vi: toàn bộ 34 chương tiếng Việt, README, trang tự kiểm tra và tài liệu giải thích. Chỉ sửa văn bản hiển thị; không thay tên file, URL, khóa JavaScript hoặc bản gốc tiếng Trung bằng regex mù.

| Vị trí | Trước | Sau | Ngoại lệ / lưu ý |
| --- | --- | --- | --- |
| Chương 02, README | Đừng chết dần | Đừng để bản thân chết mòn | Đổi tiêu đề hiển thị, giữ slug |
| Chương 11, README | Những vạch đỏ / vạch đỏ | Những lằn ranh đỏ / lằn ranh đỏ | Có thể dùng "giới hạn pháp lý" trong phần giải thích |
| Toàn bộ sách | bệnh mãn tính | bệnh mạn tính | Không sửa nguyên văn trích dẫn văn bản pháp luật |
| Chương 34, README | Thuốc trong nhà đừng để ăn hại | Thuốc trong nhà: đừng để phản tác dụng | Giọng trung tính khi nói về thuốc |
| Chương 04 | ý định thực hiện | kế hoạch hành động "nếu... thì..." | Giải nghĩa implementation intentions lần đầu |
| Chương 04, 23 | học tập ngắt khoảng | ôn tập ngắt quãng | Giải nghĩa spaced repetition lần đầu |
| Sách, README, giao diện | tính giá bỉ | hiệu quả chi phí | "Đáng tiền" chỉ nên dùng khi nói về mua sắm |
| Khi nói về đánh đổi | giá trị đổi lại | lợi ích nhận được / hiệu quả chi phí | Xét đúng ngữ cảnh, không đánh đồng tiền và sức khỏe |
| README và giao diện | Việc nào mình đã làm rồi | Việc nào bạn đã làm? | Nhất quán ngôi xưng |
| Toàn bộ văn xuôi | việc thực hiện / tiến hành thực hiện | bạn làm / bác sĩ thực hiện / thực hiện | Phải xác định đúng ai là chủ thể |
| Toàn bộ văn xuôi | được khuyến cáo là / sự thiếu hụt / một cách | bác sĩ khuyên / thiếu / động từ cụ thể | Không tự thay khi cấu trúc vẫn đúng tiếng Việt |
| Các chương 13, 17, 25, 29, 33 | giễu nhại, mắng mỏ, giật gân | điềm tĩnh và tôn trọng | Đọc từng đoạn, tuyệt đối không thay bằng regex |

## Tách chỉ số học thuật

**Trước:** "Nói dễ hiểu: Trong nghiên cứu theo dõi 10 năm, HR = 0,72; 95% CI 0,65–0,80; p < 0,05."

**Sau — Nói dễ hiểu:** "Trong nhóm được theo dõi, những người duy trì thói quen này có mức nguy cơ thấp hơn nhóm đối chiếu. Đây là mối liên hệ, chưa chứng minh nguyên nhân."

**Sau — Lợi ích:** Giữ nguyên HR = 0,72; 95% CI 0,65–0,80, thời gian theo dõi, nhóm so sánh và các giới hạn mà bài gốc thực sự công bố.

**Sau — Ghi chú / Nguồn:** Chuyển thông tin loại nghiên cứu, đối tượng, cỡ mẫu, p-value, tên tạp chí và DOI vào đây khi nguồn cung cấp.

Đây là mẫu xử lý câu chữ, **không phải khẳng định thực nghiệm độc lập**. HR là tỷ số nguy cơ tức thời, OR là tỷ số odds; không được tự diễn thành "giảm đúng 28% khả năng tử vong trong 10 năm". Nếu không có số tuyệt đối đủ tin cậy, mô tả xu hướng thay vì tự chế số.

## Cách triển khai và hậu kiểm

1. Chạy linter để tìm vị trí: node tools/lint-vi.mjs --all; sửa ERROR trước, sau đó xử lý WARN theo từng chương.
2. Đọc trọn mục gồm Nói dễ hiểu, Chi phí, Lợi ích, Pháp luật Việt Nam (nếu có), Ghi chú và Nguồn. Đối chiếu tài liệu gốc khi đụng đến khẳng định y tế hoặc pháp luật.
3. Với viết tắt, tại lần xuất hiện đầu trong từng chương dùng đầy đủ BHYT, BHXH, BHTN, TNCN, OTC, CBT-I, SIDS như trong STYLEGUIDE.
4. Không tự động đổi mọi chữ "mình": nhiều chỗ mang nghĩa phản thân hoặc nằm trong trích dẫn. Đổi trọn câu khi đang trực tiếp hướng dẫn độc giả.
5. Chạy bộ kiểm cấu trúc, tham chiếu, thống kê và trang tự kiểm tra đã có trong repo. Đặc biệt giữ đúng 767 mục và các slug nội bộ.

Regex là công cụ báo vị trí, không có khả năng tự phân xử đúng sai trong ngữ cảnh và không thay thế biên tập thủ công 34 chương.
