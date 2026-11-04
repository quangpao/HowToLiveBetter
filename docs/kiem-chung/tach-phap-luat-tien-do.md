# Tiến độ tách phần Pháp luật Việt Nam (nhánh PR #1)

Mục đích: ghi lại trạng thái biên tập qua **từng chương/từng commit** để tránh làm dồn, mất ngữ cảnh và chuyển nhầm thông tin nghiên cứu hoặc chính sách sang phần luật.

## Nguyên tắc kiểm tra

1. Đọc toàn bộ một chương trên nhánh PR, xác định các mục có luật Việt Nam có dẫn nguồn. Không xem chữ “Việt Nam”, chữ “quy định” hay BHYT là bằng chứng có điều luật.
2. Chỉ chuyển **câu/đoạn thực sự mang quy phạm, quyền, nghĩa vụ, thời hạn, mức phạt hoặc quy chuẩn** sang `- Pháp luật Việt Nam:`. Câu về y tế, nghiên cứu, giá, số liệu quốc gia, kỹ thuật tự chăm sóc giữ nguyên trường phù hợp.
3. Khi tách, giữ mọi số liệu, điều khoản, nguồn và điều kiện áp dụng; ưu tiên giữ hạn chót/ngoại lệ sống còn ngay trong `Nói dễ hiểu`.
4. Kiểm tra 1 mục: có đúng một trường pháp luật nếu tách, không để trống `Lợi ích`, không làm thay đổi số mục, không làm đứt Markdown.
5. Commit riêng theo chương; xem GitHub Actions. Không gộp chỉnh sửa của nhiều chương chưa kiểm vào một commit.
6. Nếu nguồn pháp luật thiếu số hiệu hoặc căn cứ chưa chắc, **để nguyên**, ghi vào danh sách cần xác minh; không tự thêm nguồn hoặc khẳng định hiệu lực.

## Tình trạng

| Chương | Trạng thái | Ghi chú |
|---|---|---|
| 01 | Đã tách | 13/48 mục; commit `5e0ee3e`; giữ nguyên 48 mục |
| 02 | Đã tách | 3/47 mục; commit `c0b8c69`; 02-44 cần bổ sung nguồn quy định tiêm phòng dại trước khi tách |
| 03 | Đã tách | 3/27 mục; commit `d09de93`; giữ nguyên 27 mục |
| 04 | Đã rà soát | Không thấy đoạn pháp luật Việt Nam đủ rõ cần chuyển; các tham chiếu mức lương/giá dùng làm bối cảnh |
| 05 | Đang rà soát | Nhiều quy định thuế, bảo hiểm và người tiêu dùng; mục 05-01 đã tách trong pilot |
| 06–34 | Chưa rà soát đầy đủ | Không đánh dấu hoàn tất khi chưa đọc và đối chiếu từng chương |

## Việc cần kiểm chứng bằng người

- **02-44:** phần Ghi chú nói tiêm phòng dại cho chó là bắt buộc, có mức phạt theo Nghị định 204/2026/NĐ-CP nhưng trường Nguồn hiện chỉ trích nghiên cứu nuôi chó, chưa dẫn văn bản pháp luật. Không chuyển cho đến khi bổ sung và kiểm chứng nguồn.
- Các đoạn đã chuyển giữ nguyên văn bản từ sách hiện tại, **chưa phải xác minh độc lập hiệu lực pháp lý**.
- Các bản dựng HTML/EPUB/PDF/Anki và chỉ mục tìm kiếm phải được kiểm thử lại sau khi tách xong mỗi nhóm chương.
- Nếu CI báo số lượng liên kết thay đổi vì chuyển URL từ Ghi chú sang Pháp luật Việt Nam, cập nhật bộ đếm trong `tools/sync-stats.mjs` (đã sửa trong commit `c0b8c69`), không tự sửa số liệu bằng tay.

## Dấu vết

PR: https://github.com/quangpao/HowToLiveBetter/pull/1

Nhánh: `feat/legal-vietnam-reference-layer`

Đích: `vi`

Người tiếp tục: mở file này trước, kiểm tra SHA nhánh và CI gần nhất, tiếp tục từ chương 05. Không chạy script tìm–thay tự động cho toàn bộ 767 mục.
