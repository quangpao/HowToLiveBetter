# Chương 12 — Kinh doanh nhỏ: mở, vận hành, đóng cho đúng luật

Trạng thái: khung dựng 3/11/2026, 28 mục, chia 4 nhóm: A 1–7 · B 8–14 · C 15–21 · D 22–28. Đề bài: `.hermes/cache/scratch/ch12-agent-brief.md`.

## Sự thật đã tự mở bản ký

### Bộ luật Hình sự 135/VBHN-VPQH (`/tmp/blhs.txt`)

| Điều | Hành vi | Khung khoản 1 |
|---|---|---|
| **192** | sản xuất, buôn bán hàng giả | phạt tiền **200.000.000–2.000.000.000đ** hoặc tù **1–5 năm** |
| **193** | hàng giả là lương thực, thực phẩm, phụ gia | tù **2–5 năm**; khoản 2: **5–10 năm** |
| **317** | vi phạm quy định an toàn thực phẩm | phạt tiền **100.000.000–400.000.000đ** hoặc tù **2–5 năm** |

**Pitfall kỹ thuật**: trong file hợp nhất, điều 317 được viết là **"Ðiều 317"** với chữ **Ð (eth)**, không phải Đ. Grep `317` mới thấy; grep `Điều 317` ra 0 kết quả và rất dễ kết luận sai là "không có điều này".

### Bộ luật Lao động 2019 (`/tmp/blld_vn.txt`)

- **Điều 21 khoản 2**: chỉ cho phép thoả thuận bảo vệ **bí mật kinh doanh, bí mật công nghệ**; không có điều khoản cấm cạnh tranh.
- Toàn văn: chữ **"cạnh tranh" xuất hiện 0 lần**.

### Luật Doanh nghiệp đã bị sửa — Luật 76/2025/QH15, hiệu lực 01/7/2025

Phát hiện khi tra trước khi merge: nếu chỉ dẫn 59/2020/QH14 là **dẫn luật đã bị sửa**.

Nguyên văn những chỗ liên quan trực tiếp chương này:
- **Điều 4 khoản 35 (mới)**: **chủ sở hữu hưởng lợi** = cá nhân có quyền sở hữu trên thực tế vốn điều lệ hoặc quyền chi phối doanh nghiệp.
- **Điều 8 khoản 5a (mới)**: doanh nghiệp phải **thu thập, cập nhật, lưu giữ** thông tin chủ sở hữu hưởng lợi và cung cấp khi cơ quan có thẩm quyền yêu cầu.
- **Điều 11 khoản 1 điểm h (mới)**: hồ sơ đăng ký phải có **danh sách chủ sở hữu hưởng lợi** (nếu có).
- **Điều 16 khoản 4, 5**: cấm **kê khai giả mạo/không trung thực/không chính xác** hồ sơ đăng ký và cấm **kê khai khống vốn điều lệ**.
- **Điều 13 khoản 2**: người đại diện theo pháp luật chịu trách nhiệm **cá nhân** với thiệt hại do vi phạm.
- **Điều 3 chuyển tiếp**: doanh nghiệp thành lập trước 01/7/2025 bổ sung thông tin chủ sở hữu hưởng lợi khi làm thủ tục thay đổi.

Hệ quả cho chương: mục 4 (đứng tên hộ) phải viết theo **nghĩa vụ công bố chủ sở hữu hưởng lợi**, không chỉ nói "rủi ro dân sự". Mục 6 dùng **Điều 16 khoản 5** thay cho lời khuyên chung về vốn điều lệ.

### Nghị định 141/2026/NĐ-CP — ngưỡng 01 tỷ (tự mở Công báo 272 ngày 14-5-2026, 4 trang)

- **Điều 1 khoản 1**: thay **"500 triệu đồng" → "01 tỷ đồng"** tại Điều 3, 4, khoản 1 Điều 8, Điều 9, Điều 10, khoản 3 Điều 11, khoản 1–2 Điều 12, khoản 4 Điều 17, khoản 3 Điều 18 của **Nghị định 68/2026/NĐ-CP**.
- **Điều 1 khoản 2**: hộ kinh doanh, cá nhân kinh doanh **doanh thu năm trên 01 tỷ đồng** phải dùng **hoá đơn điện tử có mã** của cơ quan thuế hoặc hoá đơn khởi tạo từ máy tính tiền có kết nối dữ liệu.
- **Điều 3**: hiệu lực **01/01/2026**.
- Nguồn: https://congbao.chinhphu.vn/van-ban/nghi-dinh-so-141-2026-nd-cp-469455/64634.htm

**Ba mức ngưỡng khác nhau đang lưu hành trên mạng** cho cùng một câu hỏi: 100 triệu (bản cũ của NĐ 68/2026 trước khi bị sửa? hoặc tài liệu rất cũ), 500 triệu (bản gốc NĐ 68/2026), **01 tỷ (hiện hành)**. Trong sách chỉ dùng mức hiện hành kèm số Công báo và ngày tra.

### Điều 192 BLHS — ngưỡng 30 triệu (kiểm lại vì agent viết "từ 30 triệu là vào khung hình sự")

Grep `/tmp/blhs.txt`, nguyên văn **Điều 192 khoản 1 điểm a**: hàng giả tương đương về số lượng, hoặc hàng hoá cùng tính năng kỹ thuật, công dụng **trị giá từ 30.000.000 đồng đến dưới 150.000.000 đồng** → phạt tiền **200 triệu – 2 tỷ** hoặc **tù 1–5 năm**. Thêm: **dưới 30 triệu nhưng đã bị xử phạt hành chính** về hành vi tương tự hoặc đã bị kết án chưa xoá án tích thì **vẫn vào khung hình sự**. Khoản 2: trị giá **150–500 triệu** hoặc thu lợi **100–500 triệu** → tù **5–10 năm**.

Agent C viết đúng. Bảng trong đề bài chỉ ghi mức phạt mà thiếu ngưỡng 30 triệu — thiếu ngưỡng là thiếu phần quan trọng nhất với người bán hàng.

### Bộ luật Dân sự là bản scan — agent đã OCR

Agent C tự OCR `91.signed.pdf` (Công báo 2016) để đọc **Điều 328** (đặt cọc, trang 86–87), **Điều 357** (lãi chậm trả, tr.93), **Điều 418** (phạt vi phạm, tr.105), **Điều 468** (tr.118). Dẫn theo **số trang bản in Công báo**, không phải số trang tệp — đúng cách, nhưng khi in sách phải giữ nguyên ghi chú đó.

**ĐÃ GIẢI QUYẾT — Điều 301 Luật Thương mại 2005** (trần phạt vi phạm **8%** giá trị phần nghĩa vụ bị vi phạm) chưa mở được bản ký — agent đọc qua trích dẫn của Báo Điện tử Chính phủ và Wikisource. Tôi thử thêm một nguồn (vietlaw.quochoi.vn) nhưng tệp PDF trả về 1 trang rỗng. 
**Cách giải**: bản hợp nhất **17/VBHN-VPQH** có trên Công báo, nhưng trang chi tiết đăng **hai** tệp PDF (Công báo 719+720 và 721+722) và tôi chỉ tải tệp đầu — 12 trang chỉ có phần đầu văn bản, grep "Điều 301" ra 0. Tải tệp thứ hai (95 trang) thì thấy nguyên văn:

> **Điều 301. Mức phạt vi phạm.** Mức phạt đối với vi phạm nghĩa vụ hợp đồng hoặc tổng mức phạt đối với nhiều vi phạm do các bên thoả thuận trong hợp đồng, nhưng **không quá 8% giá trị phần nghĩa vụ hợp đồng bị vi phạm**, trừ trường hợp quy định tại Điều 266 của Luật này.

Đã thay nguồn mục 15 từ trích dẫn báo sang **Công báo 721+722 ngày 4/9/2019**.

**Bài học kỹ thuật**: khi trang Công báo có nhiều số (719+720, 721+722) thì phải lấy **hết** các tệp PDF; tải một tệp rồi grep ra 0 là chưa đủ kết luận "không có điều này trong luật" — đúng loại lỗi đã gặp với Điều 317 BLHS (chữ Ð eth) và Điều 285 (3 tháng vs 6 tháng).


### Luật Phục hồi, phá sản 142/2025/QH15 thay Luật Phá sản 51/2014 — ngưỡng đổi 3 → 6 tháng

Đề bài của tôi dặn dùng **Luật Phá sản 51/2014/QH13**. Đã lỗi thời: **Luật Phục hồi, phá sản 142/2025/QH15** (ban hành 11/12/2025) **hiệu lực 01/3/2026** (riêng khoản 3 Điều 38: 01/7/2026), và **51/2014 (đã sửa bởi 85/2025) hết hiệu lực** từ ngày đó.

Nguyên văn **Điều 5** (tự mở vbpl.vn):
- khoản 1: **"có nguy cơ mất khả năng thanh toán"** = không thanh toán được khoản nợ **sẽ đến hạn trong 06 tháng** hoặc khoản nợ **đã đến hạn nhưng chưa quá 06 tháng**.
- khoản 2: **"mất khả năng thanh toán"** = không thực hiện nghĩa vụ thanh toán khoản nợ **sau thời hạn 06 tháng** kể từ ngày đến hạn.

**Thay đổi lớn so với luật cũ**: ngưỡng mất khả năng thanh toán từ **3 tháng lên 6 tháng**. Sách nào còn viết 3 tháng là theo luật đã hết hiệu lực.

Thêm: **Điều 41 khoản 1** — Thẩm phán ra quyết định mở hoặc không mở thủ tục trong **30 ngày** kể từ ngày thụ lý đơn.

Agent D tự tìm ra luật mới và dẫn **Công báo số 44 ngày 22/01/2026**, Điều 5 khoản 1–2, Điều 24, Điều 38 khoản 2 và 5, Điều 87 — không cần tôi steer. Ghi nhận: chất lượng tra cứu của nhóm D lần này cao hơn cả đề bài.

## Cơ chế Trung Quốc không có ở Việt Nam

| Bản gốc | Việt Nam | Mục |
|---|---|---|
| 加盟 phải đăng ký với Bộ Thương mại + **冷静期** | Không có cơ quan đăng ký hợp đồng nhượng quyền, **không có thời hạn suy nghĩ lại luật định** | 5 |
| Đổi nhà ở thành cửa hàng phải **cả toà nhà đồng ý** | Không có quy định này; cái ràng buộc là địa điểm kinh doanh, quy hoạch, phòng cháy, nội quy chung cư | 27 |
| **年报** 1/1–30/6, miễn phí | Không có chế định "báo cáo năm" chung; cái có là báo cáo tài chính, quyết toán thuế, báo cáo thay đổi đăng ký | 25 |
| 注册资本 phải góp đủ theo hạn cam kết | Không bắt góp đủ ngay, nhưng phải đúng loại tài sản và đúng hạn đã cam kết | 6 |
| 简易注销 | Giải thể theo Luật Doanh nghiệp, hoặc phá sản theo Luật Phá sản 51/2014 | 23 |
| 非法集资 | Không có tội danh riêng; có xử phạt chào bán chứng khoán và Điều 174 lừa đảo nếu gian dối | 26 |

## Việc phải làm khi merge

1. Merge 4 nhóm → `check-plain --numbers`, `check-refs`, `check-split`.
2. Viết lại đoạn "Về thang bằng chứng" theo **số đếm thật** sau khi merge.
3. Dòng "**Nhóm mục**": cụm từ 4 số trở lên phải **gắn neo cho từng số** ngay từ đầu (bài học chương 11).
4. Rà trùng với chương 11 (kỹ thuật) và chương 7 (thu nhập, bảo hiểm).
5. Chạy soát văn phong **sau khi xong mọi sửa nội dung**.

## Merge 28/28 — 3/11/2026

`merge-drafts --write --force` → **28/28 mục**, toàn sách **396 mục · 12 chương**. Hạng: **B 24 · C 4** (C = mục 18, 19, 22, 24). Không mục nào hạng A: chương này chưa có bản án công bố đúng câu hỏi và không có thống kê nhà nước về doanh nghiệp nhỏ phá sản/đóng cửa.

Sửa tay sau merge:
1. Viết lại đoạn "Về thang bằng chứng" theo **số đếm thật** (B 24 · C 4) thay cho câu "phần lớn là hạng B" viết trước khi merge.
2. Dòng "**Nhóm mục**" 8 cụm, mỗi số **kèm neo từ khoá riêng** — cụm 4 số như chương 11.
3. `check-refs` bắt 2 chỗ "mục trước" — nhưng đây là **báo oan**: cụm từ khoá "rà danh mục **trước** khi nhận đơn lớn" chứa chữ "mục trước" liền nhau. Đổi thành "rà danh mục hàng loạt" là hết. **Bài học**: regex của `check-refs` bắt cụm chữ, không hiểu ngữ pháp, nên từ khoá neo phải tránh đặt chữ "trước/sau/trên/dưới" ngay sau "mục".

Cổng: `check-plain --numbers` **396 mục 0 chỗ chưa đạt** · `check-refs` **279 chỗ có neo** · `check-split` 46 file 0 vấn đề · `sync-stats --check` đạt (phải chạy `sync-stats` vì 6 chỗ số liệu đã cũ) · `check-selfcheck` đạt.
Bản dựng: HTML **2.051 KB** · EPUB **12 chương 396 mục** · PDF **5,3 MB** · APKG **396 thẻ**. 0 chữ "Trung Quốc", 0 chữ Hán.

Soát văn phong: Codex `proc_03aa60d6f7a3` + Claude `proc_d179bda0aea2` khởi động **sau** khi xong mọi sửa nội dung.
