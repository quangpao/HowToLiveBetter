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

Đã hoàn tất **lượt rà soát và phân loại cấu trúc cả 34 chương**. Chi tiết từng chương và các ngoại lệ nằm trong bảng ngay dưới đây. Công việc **kiểm chứng độc lập hiệu lực pháp lý** và rà soát văn phong sau chuyển đổi vẫn cần thực hiện trước khi merge.

## Trạng thái hoàn tất rà soát cấu trúc — 04/11/2026

Đã rà soát **34/34 chương tiếng Việt, 767/767 mục**, và tách **460 mục** có phần liên quan tới quy định pháp luật Việt Nam sang trường tùy chọn `Pháp luật Việt Nam`. Chương 04 không có đoạn pháp luật Việt Nam đủ rõ để thêm trường. Việc **hoàn tất phân loại và tách cấu trúc** không có nghĩa là đã thẩm định lại độc lập hiệu lực của mọi văn bản hoặc từng kết luận y tế.

| Chương | Số mục có trường pháp luật / tổng số mục | Ghi chú |
|---|---:|---|
| 01 | 13/48 | Đã rà soát và tách khi có căn cứ |
| 02 | 3/47 | Đã rà soát và tách khi có căn cứ |
| 03 | 3/27 | Đã rà soát và tách khi có căn cứ |
| 04 | 0/18 | Đã rà soát, không cần tách |
| 05 | 43/51 | Đã chuyển theo nhiều commit nhỏ |
| 06 | 2/35 | Giữ các mục thiếu nguồn pháp luật để kiểm chứng |
| 07 | 21/23 | Đã rà soát và tách khi có căn cứ |
| 08 | 46/46 | Đã rà soát và tách khi có căn cứ |
| 09 | 29/29 | Đã rà soát và tách khi có căn cứ |
| 10 | 16/23 | Đã rà soát và tách khi có căn cứ |
| 11 | 21/21 | Đã rà soát và tách khi có căn cứ |
| 12 | 28/28 | Đã rà soát và tách khi có căn cứ |
| 13 | 6/48 | Đã rà soát và tách khi có căn cứ |
| 14 | 12/12 | Đã rà soát và tách khi có căn cứ |
| 15 | 18/18 | Đã rà soát và tách khi có căn cứ |
| 16 | 8/14 | Đã rà soát và tách khi có căn cứ |
| 17 | 10/13 | Đã rà soát và tách khi có căn cứ |
| 18 | 7/7 | Đã rà soát và tách khi có căn cứ |
| 19 | 24/24 | Đã rà soát và tách khi có căn cứ |
| 20 | 5/17 | Đã rà soát và tách khi có căn cứ |
| 21 | 11/13 | Đã rà soát và tách khi có căn cứ |
| 22 | 6/12 | Đã rà soát và tách khi có căn cứ |
| 23 | 13/25 | Đã rà soát và tách khi có căn cứ |
| 24 | 15/15 | Đã rà soát và tách khi có căn cứ |
| 25 | 12/12 | Đã rà soát và tách khi có căn cứ |
| 26 | 13/13 | Đã rà soát và tách khi có căn cứ |
| 27 | 8/20 | Đã rà soát và tách khi có căn cứ |
| 28 | 8/10 | Đã rà soát và tách khi có căn cứ |
| 29 | 9/14 | Đã rà soát và tách khi có căn cứ |
| 30 | 11/21 | Đã rà soát và tách khi có căn cứ |
| 31 | 17/17 | Đã rà soát và tách khi có căn cứ |
| 32 | 2/12 | Đã rà soát và tách khi có căn cứ |
| 33 | 16/21 | Đã rà soát và tách khi có căn cứ |
| 34 | 4/13 | Đã rà soát và tách khi có căn cứ |

**Kiểm tra đã thực hiện:** trên nhánh PR, tất cả 34 file chương vẫn có tổng cộng 767 mục. Trong 460 mục có trường pháp luật, `Lợi ích` và `Nguồn` đều không trống; không phát hiện trường pháp luật trùng hoặc thiếu dữ liệu khi đối chiếu cấu trúc. GitHub Actions tại commit `341db321`: **7/7 job thành công**, bao gồm build, kiểm thống kê, kiểm tham chiếu, kiểm trường pháp luật, kiểm tách câu, kiểm câu dễ hiểu và trang tự kiểm tra.

**Cần tiếp tục duyệt bằng người trước khi merge:**
- Rà soát đúng nghĩa từng đoạn được chuyển sang phần pháp luật; ưu tiên quyền, nghĩa vụ, mức phạt, hạn chót, quyền lợi và ngoại lệ thực sự quan trọng.
- Đối chiếu hiệu lực, văn bản sửa đổi/thay thế và mức tiền chính sách; CI không thể xác minh tính chính xác pháp lý.
- Duyệt lại đoạn `Lợi ích` được diễn giải lại để bảo đảm không làm mạnh kết luận hoặc thiếu điều kiện áp dụng.
- Kiểm tra hiển thị ở mobile/desktop và bản EPUB/PDF/offline HTML ngoài việc build thành công.
- Những mục được ghi là thiếu căn cứ ở phần dưới **không tự động được coi là đã kiểm chứng**.

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

Người tiếp tục: kiểm tra CI mới nhất, đối chiếu các mục còn thiếu nguồn và thẩm định chính sách có thể thay đổi trước khi chuyển PR khỏi Draft. Không tự động thay toàn bộ 767 mục bằng regex.
