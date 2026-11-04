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
| 05 | Đã tách 43/51 mục; còn rà soát bổ sung | 05-01 từ pilot; nhóm tiếp theo theo 9 commit nhỏ (7533b4f → 349d364). Các mục 05-10, 14, 17, 18, 28 không được gắn pháp luật chỉ vì cùng chủ đề; 05-19, 27, 39 còn thông tin quyền lợi/bảo hiểm lồng trong nội dung thực hành, cần phân loại thủ công khi kiểm chứng nguồn. |
| 06 | Đã tách 2/35 mục; còn rà soát bổ sung | 06-10, 06-11; commit b0fa891. 06-18 (nghĩa vụ khám sức khỏe định kỳ) và 06-29 (nghĩa vụ huấn luyện lao động) cần nguồn luật tương ứng trước khi tách. 06-31 trích nghiên cứu AI về luật ở Mỹ, không phải quy định luật Việt Nam. |
| 07–34 | Chưa rà soát và chuyển đầy đủ | Tiếp tục **từ chương 07**. Chương 07 có nhiều mục trực tiếp về quyền lợi, nghĩa vụ và thời hạn; xử lý từng mục, tránh thay cả chương bằng một phép biến đổi máy móc. |

## Việc cần kiểm chứng bằng người

- **05-19, 05-27, 05-39:** hiện giữ ở Lợi ích các phần bảo hiểm tiền gửi, phân bổ tài sản và phép so bảo hiểm; chưa ép chuyển vì chúng là ví dụ thực hành pha quy định.
- **06-18, 06-29:** nhắc nghĩa vụ pháp luật nhưng thiếu nguồn luật có số hiệu trực tiếp trong trường Nguồn. Phải xác minh/bổ sung trước khi tách.
- **02-44:** phần Ghi chú nói tiêm phòng dại cho chó là bắt buộc, có mức phạt theo Nghị định 204/2026/NĐ-CP nhưng trường Nguồn hiện chỉ trích nghiên cứu nuôi chó, chưa dẫn văn bản pháp luật. Không chuyển cho đến khi bổ sung và kiểm chứng nguồn.
- Các đoạn đã chuyển giữ nguyên văn bản từ sách hiện tại, **chưa phải xác minh độc lập hiệu lực pháp lý**.
- Các bản dựng HTML/EPUB/PDF/Anki và chỉ mục tìm kiếm phải được kiểm thử lại sau khi tách xong mỗi nhóm chương.
- Nếu CI báo số lượng liên kết thay đổi vì chuyển URL từ Ghi chú sang Pháp luật Việt Nam, cập nhật bộ đếm trong `tools/sync-stats.mjs` (đã sửa trong commit `c0b8c69`), không tự sửa số liệu bằng tay.

## Dấu vết

PR: https://github.com/quangpao/HowToLiveBetter/pull/1

Nhánh: `feat/legal-vietnam-reference-layer`

Đích: `vi`

Người tiếp tục: mở file này trước, kiểm tra SHA nhánh và CI gần nhất, tiếp tục từ chương 07; khi rà soát chéo, quay lại 02-44, 05-19/27/39, 06-18/29. Không chạy script tìm–thay tự động cho toàn bộ 767 mục.
