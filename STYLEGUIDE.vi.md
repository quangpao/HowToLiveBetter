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

## Quy tắc Kiểm soát Chất lượng Hành văn (Checklist trước khi mở PR)

- [ ] **Ngôi xưng:** Khi hướng dẫn người đọc, dùng **bạn** ở 34 chương, README và giao diện. Không thay thô các câu trích dẫn hoặc cụm phản thân như "tự mình"; cần viết lại cả câu để giữ đúng ý.
- [ ] **Câu đầu tiên của Nói dễ hiểu:** Không quá 25 từ. Nêu ngay việc cần làm, ai cần làm hoặc điều kiện áp dụng (ví dụ: "Nếu..., hãy...", "Bạn nên...", "Đừng..."). Các câu kế tiếp nên dưới 35–40 từ. Không bỏ ngoại lệ an toàn.
- [ ] **Chủ động, tự nhiên:** Tránh "việc thực hiện", "sự thiếu hụt", "được khuyến cáo là", "tiến hành thực hiện", "một cách...". Viết rõ ai làm gì: bạn, bác sĩ, người lao động, doanh nghiệp hoặc cơ quan có thẩm quyền.
- [ ] **Chỉ số nghiên cứu:** Không đặt HR, RR, OR, 95% CI, p-value hay cỡ mẫu n = ... trong Nói dễ hiểu. Chỉ dùng mức lợi ích dễ hình dung nếu nguồn có số liệu đủ để quy đổi đúng. **Giữ nguyên các chỉ số, thời gian và phạm vi trong Lợi ích**, nơi lưu bằng chứng để kiểm chứng; mô tả thiết kế nghiên cứu, phương pháp và DOI ở Ghi chú / Nguồn. HR không phải xác suất tử vong trong cả thời gian theo dõi; OR không tự động bằng RR.
- [ ] **Giải nghĩa viết tắt mỗi chương:** lần đầu phải có "bảo hiểm y tế (BHYT)", "bảo hiểm xã hội (BHXH)", "bảo hiểm thất nghiệp (BHTN)", "thuế thu nhập cá nhân (TNCN)", "thuốc không kê đơn (OTC)", "trị liệu nhận thức hành vi cho chứng mất ngủ (CBT-I)", "hội chứng đột tử ở trẻ sơ sinh (SIDS)" nếu có dùng.
- [ ] **Từ cần thay:** bệnh mãn tính → bệnh mạn tính; vạch đỏ → lằn ranh đỏ / giới hạn pháp lý; ý định thực hiện → kế hoạch "nếu... thì..."; học tập ngắt khoảng → ôn tập ngắt quãng; tính giá bỉ → hiệu quả chi phí. Không dùng "ăn hại" làm tiêu đề hoặc khuyến cáo y tế. Giữ nguyên nguyên văn trích dẫn luật, tên nguồn nếu phải dẫn chính xác.
- [ ] **Chương nhạy cảm:** Chương 13 (cấp cứu), 17 (người cao tuổi), 25 (tang sự), 29 (biến cố lớn), 33 (khuyết tật) dùng giọng bình tĩnh, trực diện nhưng tôn trọng; tránh đùa cợt, mắng mỏ, gieo sợ hãi hoặc hứa hẹn tuyệt đối.
- [ ] **Bảo toàn cấu trúc:** Giữ đủ 34 chương và 767 mục, không đổi số thứ tự, loại bằng chứng, link, slug, số liệu hoặc kết luận pháp luật chỉ để làm đẹp câu.
- [ ] **Máy kiểm và người kiểm:** Chạy các lệnh dưới đây, đọc diff và đối chiếu nguồn cho mọi thay đổi y tế, pháp luật.

    node tools/lint-vi.mjs
    node tools/test-lint-vi.mjs
    node tools/check-plain.mjs
    node tools/check-legal.mjs
    node tools/check-split.mjs
    node tools/check-selfcheck.mjs
    node tools/check-refs.mjs --check
    node tools/sync-stats.mjs --check
    node tools/test-repo-links.mjs

Linter phân loại **ERROR** (thuật ngữ cấm, rò rỉ chỉ số, sai thứ tự/số lượng mục) và **WARN** (câu dài, từ viết tắt, cú pháp dịch máy). WARN chưa chặn CI của nội dung cũ; dùng lệnh kèm --all để xem toàn bộ, --strict để thử chế độ không còn cảnh báo. Linter không thay việc đọc và biên tập từng câu.