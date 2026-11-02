# Chương 11 — Những vạch đỏ mà người làm kỹ thuật hay vấp

Trạng thái: khung dựng 3/11/2026, chia 3 nhóm: A 1–7 · B 8–14 · C 15–21. Đề bài: `.hermes/cache/scratch/ch11-agent-brief.md`.

## Sự thật đã tự mở bản ký (không qua agent)

### Nghị định 147/2024/NĐ-CP — Công báo 1261+1262 ngày 20/11/2024 (95 trang, có lớp text, `/tmp/nd147.txt`)

| Nội dung | Nguyên văn rút gọn | Dùng cho mục |
|---|---|---|
| Lưu trữ trang TTĐT tổng hợp | **90 ngày** nội dung đã đăng; **02 năm** nhật ký xử lý thông tin | 16 |
| Lưu trữ mạng xã hội | **02 năm** thông tin tài khoản, thời gian đăng nhập/đăng xuất, địa chỉ IP, nhật ký xử lý thông tin | 16 |

**Không phải 6 tháng** — đó là mức của luật nước ngoài. Ai viết 6 tháng là sai, và đây là con số dễ bị chép lại nhất từ tài liệu kỹ thuật tiếng Anh.

### Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15 — hiệu lực 01/01/2026 (văn bản trên vbpl.vn, `/tmp/luat91.txt`)

- **Điều 24 khoản 2**: công bố, tiết lộ thông tin về đời sống riêng tư, bí mật cá nhân của trẻ **từ đủ 07 tuổi trở lên** phải có sự đồng ý của **cả trẻ và người đại diện theo pháp luật**.
- Người đại diện theo pháp luật thay mặt trẻ thực hiện các quyền của chủ thể dữ liệu.
- **Ba mức tuổi khác nhau, đừng lẫn**: 07 tuổi là mức của **Luật 91/2025** (hiện hành); 16 tuổi là mức cũ trong **Nghị định 13/2023/NĐ-CP**; 14 tuổi là mức của luật Trung Quốc.
- Nghị định 13/2023/NĐ-CP **không còn là văn bản chính** từ 01/01/2026 — mọi bài viết còn dẫn nghị định này làm nguồn chính đều đã cũ.

## Bộ luật Hình sự và Bộ luật Lao động — đã tự mở, đọc nguyên văn

`/tmp/blhs.txt` = BLHS hợp nhất 135/VBHN-VPQH (có lớp text).

| Điều | Ngưỡng / khung (nguyên văn rút gọn) | Dùng cho mục |
|---|---|---|
| **225** xâm phạm quyền tác giả | Thu lợi bất chính **50.000.000–300.000.000đ** HOẶC thiệt hại **100.000.000–500.000.000đ** là cấu thành | 7, 20 |
| **285** bán công cụ tấn công mạng | Phạt tiền **20–100 triệu**, cải tạo ≤ **2 năm**, tù **3 tháng–2 năm**; khoản 2: 100–500 triệu hoặc tù **1–5 năm** | 2, 5, 20 |
| **286** phát tán chương trình gây hại | Phạt tiền **50–200 triệu**, cải tạo ≤ **3 năm**, tù **6 tháng–3 năm** (đây mới là điều có khung 6 tháng–3 năm) | 6 |
| **287** cản trở/gây rối loạn mạng | Xoá, làm tổn hại, thay đổi phần mềm/dữ liệu; ngăn chặn truyền tải | 21 |
| **289** xâm nhập trái phép | **Vượt qua cảnh báo, mã truy cập, tường lửa**, dùng quyền quản trị người khác | 4, 9 |
| **290** chiếm đoạt qua mạng | Dùng thông tin/mạng để chiếm đoạt tài sản | 3 |

`/tmp/blld_vn.txt` = Bộ luật Lao động 2019 (45/2019/QH14), text đầy đủ.

- **Điều 21 khoản 2**: chỉ cho phép thoả thuận bằng văn bản về **bảo vệ bí mật kinh doanh, bí mật công nghệ** (nội dung, thời hạn, quyền lợi, bồi thường khi vi phạm). Không có điều khoản nào về cấm cạnh tranh.
- **Bằng chứng cho khẳng định "không có"**: grep toàn văn Bộ luật Lao động 2019, chữ **"cạnh tranh" xuất hiện 0 lần**. Đây là cách chứng minh một khẳng định phủ định — tìm chữ khoá trong toàn văn, không phải suy từ việc "tôi không nhớ điều nào".

**Pitfall file**: `/tmp/bllđ.pdf` và `/tmp/blld18.pdf` là **bản scan không có lớp text** (pymupdf chỉ đọc được 94–229 ký tự). Đừng mất thời gian với chúng; bản text lấy từ trang vbpl.vn.

### Luật 91/2025 Điều 8 — khung xử phạt (đã kiểm vì nghi là số ngoại lai)

Kiểm tra phát sinh khi đọc lại mục 19: câu "vi phạm bị phạt tới 5% doanh thu năm trước" giống chỉ số GDPR/PIPL, tôi nghi là số bịa. Grep `/tmp/luat91.txt` thì **đúng là có thật**, nguyên văn:

- **Điều 8 khoản 4**: mức phạt tiền tối đa trong xử phạt vi phạm hành chính đối với tổ chức có hành vi vi phạm quy định **chuyển dữ liệu cá nhân xuyên biên giới** là **5% doanh thu của năm trước liền kề** của tổ chức đó.
- **Điều 8 khoản 3**: mức phạt tiền tối đa đối với hành vi **mua, bán dữ liệu cá nhân** là **10 lần khoản thu có được** từ hành vi vi phạm.
- **Điều 8 khoản 5**: mức phạt tiền tối đa chung **3.000.000.000 đồng**.

**Bài học**: nghi ngờ một con số "trông giống nước ngoài" là đúng phản xạ, nhưng phải kiểm rồi mới kết luận. Lần này số thật, và Việt Nam có mức phạt theo doanh thu thật — không nên mặc định "luật Việt Nam không có mức phạt theo doanh thu".

## Cơ chế Trung Quốc không có ở Việt Nam (phải viết "không có", không suy diễn)

| Bản gốc | Việt Nam | Mục |
|---|---|---|
| 竞业限制 + bồi hoàn 30%/tháng + huỷ sau 3 tháng không trả | **Không có chế định cấm cạnh tranh kèm bồi hoàn.** Chỉ có thoả thuận bảo mật thông tin (Điều 21 khoản 2 BLLĐ 2019), bí mật kinh doanh, bồi thường | 12 |
| 算法备案 + 安全评估 cho dịch vụ AI | **Chưa có** cơ chế đăng ký thuật toán/đánh giá an toàn cho mô hình ngôn ngữ → hạng C | 17 |
| 上海 AI 中转站 被刑拘 | **Chưa có án công bố** → hạng C | 19 |
| ICP 备案 | Việt Nam: giấy phép trang TTĐT tổng hợp/mạng xã hội, thông báo trang TTĐT cá nhân, đăng ký tên miền (NĐ 147/2024) | 16 |
| 等级保护 2.0 | Cấp độ an toàn hệ thống thông tin (Luật ATTT mạng 2015 + NĐ 85/2016/NĐ-CP) — kiểm số điều trước khi dẫn | 16 |

## Merge 3/11/2026 — 21/21 mục

- Merge 3 nhóm: **21/21**, đúng số mục, không trùng. Toàn sách **368 mục, 11 chương**.
- Phân bố: **B 17 · C 4** — C là mục 10 (báo lỗ hổng), 11 (bán tài khoản VPN), 17 (cung cấp AI cho công chúng), 19 (bán lại API mô hình nước ngoài). Cả bốn đều đúng lý do: Việt Nam không có điều khoản mang tên hành vi đó.
- Đối chiếu đề gốc: **21/21 cùng đề, 0 thiếu, 0 thừa**, 0 chữ Hán, 0 "Trung Quốc"/"bản gốc"/nguồn cấm.
- Cổng: `check-plain --numbers` 368 mục **0 chỗ chưa đạt**; `check-refs` **269 chỗ đều có neo**; `check-split` 45 file 0 vấn đề; `sync-stats --check` đạt.
- Bốn bản dựng: HTML 1.909 KB · EPUB 11 chương 368 mục · PDF 5,0 MB · APKG 368 thẻ.

**Hai chỗ phải sửa tay sau khi merge:**
1. Mục 4 viết "như ở mục trước" → `check-refs` bắt chỉ dẫn tương đối, đổi thành "mục 9 (kiểm thử hệ thống người khác khi chưa có văn bản)".
2. Dòng "**Nhóm mục**": cụm "Nền tảng, nội dung và AI: mục 11, 17, 18, 19" bị báo "số mục trần" vì ngữ cảnh cụm không khớp tiêu đề mục 11. Sửa bằng cách gắn neo cho cả bốn số: "mục 11 (tài khoản VPN), 17 (cung cấp AI), 18 (chặn quảng cáo), 19 (bán lại API)". **Bài học**: cụm có bốn số trở lên, số đầu thường lệch ngữ cảnh — gắn neo cho từng số ngay từ đầu, đừng đợi cổng báo.

## Luật Trí tuệ nhân tạo 134/2025/QH15 — tôi đã nói sai, agent sửa lại

Tôi viết trong đề bài: "Việt Nam chưa có cơ chế đăng ký thuật toán hay đánh giá an toàn riêng cho mô hình ngôn ngữ". **Sai một nửa.** Việt Nam đã có luật, và agent C phát hiện rồi thu hẹp câu cho đúng.

Tự mở bản ký (Công báo 40 ngày 22/01/2026, PDF 20 trang, có lớp text, `/tmp/luat134.txt`):
- **Điều 9**: hệ thống AI phân loại theo ba mức **rủi ro cao / trung bình / thấp**, theo khả năng gây thiệt hại về tính mạng, sức khoẻ, quyền và lợi ích hợp pháp, lợi ích quốc gia, an ninh quốc gia.
- **Điều 10 khoản 1**: **nhà cung cấp tự phân loại** hệ thống trước khi đưa vào sử dụng; rủi ro trung bình hoặc cao phải có **hồ sơ phân loại**.
- **Điều 10 khoản 3**: rủi ro trung bình hoặc cao **phải thông báo kết quả phân loại cho Bộ Khoa học và Công nghệ** qua **Cổng thông tin điện tử một cửa về trí tuệ nhân tạo**, trước khi đưa vào sử dụng. Rủi ro thấp: khuyến khích công khai.
- **Quyết định 33/2026/QĐ-TTg** ngày 30/6/2026: danh mục hệ thống AI rủi ro cao, hiệu lực 15/8/2026.

**Cách sai của tôi**: tôi nhớ "Việt Nam chưa có luật AI" và viết luôn vào đề bài, không tra. Luật này ban hành 2025, hiệu lực 01/3/2026 — đúng giai đoạn sách đang viết. Đây là loại câu **phủ định nguy hiểm nhất**: "chưa có" nghe rất hợp lý vì luật AI thường được coi là chuyện của nước ngoài.

May mắn là agent không tin đề bài: nó tra, thấy luật, và **viết đúng câu "chưa có cơ chế nộp hồ sơ thuật toán để cấp phép"** thay vì "chưa có gì". Mục 17 vẫn giữ hạng C vì không có khung tiền và không có án — nhưng nội dung thì khác hẳn.

## Việc phải làm khi merge

1. Merge 3 nhóm → kiểm `check-draft` từng file trước, rồi `check-plain --numbers`, `check-refs`.
2. Viết lại đoạn "Về thang bằng chứng" theo **số đếm thật** sau khi merge (đừng viết trước).
3. Điền dòng "**Nhóm mục**" dạng `tên nhóm: mục 1, 2 · …` — mỗi số là một liên kết riêng, chữ "mục" đứng trước cụm.
4. **Chạy soát văn phong sau khi xong mọi sửa nội dung**, không chạy trước (bài học chương 10: chạy trước thì 7/40 câu trích của Claude không còn tồn tại).
5. Rà trùng với chương 9 — chương 11 là vi phạm **trong lúc làm nghề**, không phải vạch đỏ của người thường.
