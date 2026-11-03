# Danh sách vá chờ — lỗi tìm thấy trong chương ĐÃ PHÁT HÀNH

Ghi lại để vá một lượt khi có lệnh. Không tự sửa vì các chương dưới đây đã nằm trong bản phát hành.

## 1. Chương 07 — sai số điều của Nghị định 161/2026

**Câu hiện tại:** "mức tham chiếu tính bằng mức lương cơ sở 2.530.000 đồng/tháng từ 1/7/2026 theo Nghị định 161/2026/NĐ-CP, **Điều 2** (bản ký)".

**Sai ở đâu:** mức tiền nằm ở **Điều 3 khoản 2** của NĐ 161/2026 — "Từ ngày 01 tháng 7 năm 2026, mức lương cơ sở là 2.530.000 đồng/tháng". **Điều 2 là "Đối tượng áp dụng"**, không có mức tiền nào. Đã mở bản ký 7 trang, OCR 170 dpi, tra 3/11/2026.

**Cách sửa:** đổi "Điều 2 (bản ký)" → "Điều 3 khoản 2 (bản ký)".

**Ghi chú thêm:** NĐ 161/2026 tựa là "quy định **mức lương cơ sở** và chế độ tiền thưởng" — trong toàn văn **không có cụm "mức tham chiếu"**. Câu "mức tham chiếu tính bằng mức lương cơ sở" vẫn đúng về ý (Chính phủ lấy lương cơ sở làm mức tham chiếu), nhưng phải nói rõ ai quy định, đừng để người đọc tưởng nghị định tự đặt ra khái niệm đó.

## 2. Chương 24 — hai chỗ dẫn sai điều trong Luật Khám bệnh, chữa bệnh (đã sửa, ghi lại để đối chiếu)

Chương 24 chưa phát hành nên đã sửa ngay:

- "lệnh cấm chậm cấp cứu ở **khoản 10 Điều 7**" → **khoản 2 Điều 7** ("Từ chối hoặc cố ý chậm cấp cứu người bệnh, trừ trường hợp quy định tại Điều 40"). Khoản 10 Điều 7 là **tẩy xóa, sửa chữa hồ sơ bệnh án** — vẫn đúng ở ba chỗ khác trong chương.
- "định nghĩa người bệnh không giấy tờ ở **điểm a khoản 10 Điều 8**" → **điểm a khoản 10 Điều 2** (điều giải thích từ ngữ). Điều 8 là "Người đại diện của người bệnh".

Đối chiếu trên bản hợp nhất **26/VBHN-VPQH** (72 trang, 156.618 ký tự, `datafiles.chinhphu.vn/cpp/files/vbpq/2026/3/26-vbhn-vpqh.pdf`), tra 3/11/2026.

## 3. Ghi chú kỹ thuật đã kiểm

- Hai số liên hệ y tế dùng trong chương 29: **NIMH 78 Giải Phóng, 0984104115**, trang Liên hệ ghi giờ chiều **13:45–16:00** (một lần đọc trước ghi 13:30 — chênh 15 phút, chương dùng theo trang, đã ghi "Còn treo" trong sổ chương 29).
- **NĐ 161/2026 và NĐ 335/2026 đều là bản scan không có lớp chữ** → mọi con số lấy từ hai văn bản này phải OCR lại trước khi in.

## 4. Xung đột CHƯA GIẢI: tư vấn du học có giấy phép hay không

- **Chương 21 (đã phát hành)** — mục 9, cả trong phần bẫy: "với dịch vụ làm visa, **tư vấn du học** và định cư thì **không có giấy phép nào để tra**", và "Việt Nam không có giấy phép tương đương cho hai dịch vụ đó".
- **Chương 32 (chưa phát hành)** — mục 1 hướng dẫn hỏi **số giấy phép kinh doanh dịch vụ tư vấn du học** và đối chiếu tên trên giấy phép / hợp đồng / biên nhận.
- **Đã thử và không mở được** (3/11/2026): `vbpl.vn` 403 cả `curl` có UA và trình duyệt; `datafiles.chinhphu.vn` 404 với mọi biến thể đường dẫn đoán được (kể cả bản tải về hoá ra là **NĐ 61/2020/NĐ-CP**, không phải Luật Đầu tư); `dichvucong.gov.vn` trả "Request Rejected"; Bing trả 0 kết quả; `web_search` trả kết quả lạc chủ đề hoàn toàn (hỏi giấy phép tư vấn du học → ra **Ubatuba, Brazil**).
- **Trạng thái:** cả hai câu đều **không có văn bản đứng sau**. Chương 21 khẳng định phủ định mà không có phép kiểm phủ định (0 lần grep trên văn bản nào); chương 32 khẳng định khẳng định mà cũng không dẫn được điều khoản.
- **Hướng xử lý:** cần **một** lần mở được văn bản về điều kiện kinh doanh dịch vụ tư vấn du học (nghị định về điều kiện đầu tư kinh doanh trong lĩnh vực giáo dục, hoặc Phụ lục ngành nghề đầu tư kinh doanh có điều kiện của Luật Đầu tư). Có kết quả thì hoặc vá chương 21, hoặc sửa chương 32 mục 1 — **không được để hai chương nói ngược nhau**.

## 5. Nhãn "thước-đo" ngoài bộ tám — đã sửa, CẦN DUYỆT vì chạm chương đã phát hành

- **Hiện tượng:** `LENS_LABEL` trong `index.html` chỉ có đúng **8 khoá** (tử-vong, mắc-bệnh, tàn-tật, triệu-chứng, thời-gian, tiền, tai-nạn, khác). Nhưng **13 chương** (03, 05, 11–21, 24, 27, 28) dùng **125 giá trị tự do**: `tỷ-lệ-chết`, `mạng`, `tính-mạng`, `tự-do`, `pháp-lý`, `tiền-cọc`, `số-ngày-đơn`… Dòng 1182 của `index.html` là `LENS_LABEL[e.lens] || e.lens`, nên những mục đó **in ra slug thô** thay vì nhãn, và bộ lọc theo thước đo không bao giờ khớp.
- **Đã sửa:** chuẩn hoá 125 giá trị về bộ 8 theo luật ánh xạ (chữ "chết"/"mạng" → tử-vong; tổn thương/chấn thương → tai-nạn; acid-uric/chỉ-số-thận → mắc-bệnh; tiền-*/viện-phí → tiền; ngày-*/giờ-*/mốc-*/lần-*/tháng-* → thời-gian; còn lại → khác). **Chỉ đổi dòng `<!-- nhãn: … -->`, không sửa một chữ nội dung nào** (`git diff --stat`: 13 file, 169 dòng vào, 169 dòng ra, cân bằng).
- **Sửa kèm một lỗi vá của chính tôi:** regex chuẩn hoá ăn luôn `-->` ở cuối dòng nhãn khi giá trị viết liền dấu (ch05), làm **14 dòng comment bị hở**. Đã vá lại toàn bộ; kiểm `số '<!--' == số '-->'` trên cả 34 chương = không lệch file nào.
- **Cần anh duyệt:** 11 chương trong số này **đã phát hành** (v0.8–v0.9.1). Nội dung không đổi, nhưng nếu anh muốn giữ tuyệt đối "đã phát hành thì không chạm", tôi có thể hoàn lại và thay bằng cách **mở rộng `LENS_LABEL`** cho đủ 125 khoá (khi đó file chương không bị sửa, nhưng bộ lọc vẫn lệch vì chip lọc chỉ có 8).
