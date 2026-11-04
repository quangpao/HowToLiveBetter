# Quy tắc văn phong tiếng Việt — HowToLiveBetter

## Mục tiêu

Viết cho người trưởng thành không có kiến thức chuyên môn vẫn đọc hiểu ngay việc cần làm. Giữ giọng thẳng, thực tế, không né rủi ro. Không hy sinh điều kiện áp dụng hay bằng chứng để rút ngắn câu.

## Mỗi mục có ba tầng đọc

1. **Nói dễ hiểu:** hành động chính, đối tượng, trường hợp không được làm hoặc hạn chót quyết định. Không giấu điều kiện an toàn hoặc thời hạn trong mục thu gọn.
2. **Chi phí / Lợi ích:** cái người đọc bỏ ra và điều họ có thể nhận lại; không trộn mức phạt của doanh nghiệp vào chi phí cá nhân của người lao động.
3. **Pháp luật Việt Nam / Ghi chú / Nguồn:** quy định chi tiết, phạm vi áp dụng, ngoại lệ, bằng chứng, ngày tra và link gốc. Trường pháp luật chỉ có khi thực sự có căn cứ pháp lý; không suy luận luật mới.

## Trường Pháp luật Việt Nam (tùy chọn)

Đặt trên một dòng Markdown ngay sau Lợi ích và trước Mức bằng chứng:

```md
- Pháp luật Việt Nam: Tên văn bản, số hiệu, điều/khoản, phạm vi áp dụng, hạn chót, ngoại lệ và thời điểm rà soát nếu có.
```

Nguồn chính thức tiếp tục nằm trong `- Nguồn:`; không sao chép liên kết sang nhiều chỗ. Chỉ chuyển nội dung đã đối chiếu, không tự động viết lại kết luận pháp lý. Mục chưa chuyển vẫn đọc bình thường. Cập nhật các bộ dựng và CI trước khi di chuyển diện rộng.

## Kiểm văn phong

- Một câu ưu tiên một ý chính; dùng chủ thể rõ (“bạn”, “cơ quan”, “bác sĩ”, “người sử dụng lao động”).
- Giữ giọng tự nhiên, không đổi những câu giàu ý thành thuật ngữ hành chính.
- Tránh “bản này”, “mục này sẽ giải quyết”, “về bản chất”, lời kết mang tính khẩu hiệu.
- Không dùng mệnh lệnh tuyệt đối ở nội dung y tế/pháp luật nếu còn ngoại lệ cần lưu ý.
- Không biến “không thấy bằng chứng” thành “đã chứng minh không có tác dụng”.
- Mọi khẳng định về luật và giá phải có căn cứ; phân loại bằng chứng nghiên cứu khác việc xác định hiệu lực của văn bản pháp lý.

## Duyệt thay đổi

Chạy `node tools/check-legal.mjs`, `node tools/check-split.mjs`, `node tools/check-plain.mjs`, `node tools/check-refs.mjs --check` và `node tools/sync-stats.mjs --check`; đọc lại diff bằng người. Một check xanh không có nghĩa thông tin y khoa hoặc pháp luật chắc chắn đúng. Khi chuyển câu từ Lợi ích sang Pháp luật Việt Nam, so số liệu và căn cứ trước/sau để tránh mất ý.
