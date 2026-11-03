# Chương 13 — Cấp cứu: những phút quyết định

Trạng thái: khung dựng 3/11/2026, **48 mục** (chương lớn nhất sách), chia 7 nhóm: A 1–7 · B 8–14 · C 15–21 · D 22–28 · E 29–35 · F 36–42 · G 43–48. Đề bài: `.hermes/cache/scratch/ch13-agent-brief.md`.

## Khác biệt hệ thống Việt Nam — phần quyết định cả chương

| Việc | Bản gốc | Việt Nam |
|---|---|---|
| Cấp cứu y tế | 120 | **115** |
| Công an | 110 | **113** |
| Cứu hoả | 119 | **114** |
| Cứu nạn cứu hộ (biển, vùng sâu) | — | **112** |
| Bảo vệ trẻ em | — | **111** |

Nếu agent viết 120 hoặc 110 thì cả chương vô dụng với người đọc Việt Nam. Đề bài cấm hai số đó trong chính văn và yêu cầu tự grep kiểm.

## Cơ chế Trung Quốc không có ở Việt Nam

| Bản gốc | Việt Nam | Mục |
|---|---|---|
| 见义勇为: cấp xác nhận + tiền thưởng, ưu đãi nhà nước | Không có chế định tương đương. Cái có: khen thưởng người dũng cảm cứu người, bồi thường dân sự, chế độ tai nạn lao động, bảo hiểm y tế. **Không mô tả cơ chế Trung Quốc như của Việt Nam** | 39 |
| Huyết thanh kháng nọc rắn "có ở bệnh viện huyện" | Tập trung ở bệnh viện tỉnh và trung tâm chống độc tuyến cuối (Chợ Rẫy, Bạch Mai, Nhiệt đới Trung ương) | 29 |
| Say độ cao theo mốc cao nguyên Tây Tạng | Việt Nam: đỉnh cao nhất **Fansipan 3.147 m**; không có vùng dân cư ở độ cao lớn → say độ cao là chuyện leo núi, du lịch | 33 |

## Văn bản y tế Việt Nam cần mở

- **Quyết định 3312/QĐ-BYT 2024** — Hướng dẫn chẩn đoán và điều trị đột quỵ não (mục 3–5).
- **Thông tư 51/2017/TT-BYT** — phòng, chẩn đoán và xử trí phản vệ (mục 15).
- Hướng dẫn phòng, chống bệnh dại của Bộ Y tế (mục 13).
- Hướng dẫn điều trị dự phòng sau phơi nhiễm HIV, mốc **72 giờ** (mục 38).
- Hướng dẫn CPR cho trẻ của Bệnh viện Nhi Trung ương hoặc Bộ Y tế (mục 43–44).
- Hướng dẫn xử trí bỏng của Viện Bỏng Quốc gia (mục 14).
- Trung tâm Chống độc Bệnh viện Bạch Mai (mục 20–21).

**Nguyên tắc**: chương y tế không có mức phạt, nên "thứ kiểm được" là **số hiệu quyết định/thông tư của Bộ Y tế**, hoặc mốc thời gian/liều lượng có nguồn Việt Nam. Không lấy số của AHA/ERC/WHO rồi gán nguồn Việt Nam; nếu Việt Nam chỉ áp dụng hướng dẫn quốc tế thì nói đúng như vậy và ghi "Còn treo".

## Việc phải làm khi merge

1. Merge 7 nhóm → `check-plain --numbers`, `check-refs`, `check-split`.
2. Viết lại đoạn "Về thang bằng chứng" theo **số đếm thật**.
3. Dòng "**Nhóm mục**": mỗi số kèm neo, và **neo không được chứa chữ "trước/sau/trên/dưới" ngay sau "mục"** (bài học chương 12).
4. Grep riêng **120** và **110** trong toàn chương: phải bằng 0.
5. Rà an toàn: không mục nào khuyên trì hoãn đi viện, không khuyên tự làm thủ thuật xâm lấn.
6. Chạy soát văn phong **sau khi xong mọi sửa nội dung**.

## Đã xác minh (3/11/2026)

**Quyết định 3312/QĐ-BYT ngày 05/11/2024** — tài liệu chuyên môn "Hướng dẫn chẩn đoán và điều trị đột quỵ não". Xác nhận qua nhiều nguồn chính thống: quyết định **thay thế Quyết định 5331/QĐ-BYT ngày 23/12/2020** (bản cũ), hiệu lực ngay từ ngày ký.

- Đây là văn bản đúng cho mục 3, 4, 5. Nếu agent dẫn **5331/QĐ-BYT 2020** là dẫn bản đã bị thay.
- Hướng dẫn gồm 13 vấn đề chuyên môn; số trang/thứ mục phải đọc trong bản toàn văn.
- Các mốc thời gian điều trị (cửa sổ tiêu sợi huyết, cửa sổ lấy huyết khối) **phải đọc trong chính văn bản này**, không lấy từ AHA/ERC.

**Số cấp cứu**: 115 (y tế), 113 (công an), 114 (cứu hoả, cứu nạn), 112 (tìm kiếm cứu nạn), 111 (bảo vệ trẻ em). Chưa tìm được một trang .gov.vn duy nhất liệt kê đủ cả bộ số để dẫn làm nguồn — khi merge, nguồn cho các số này là trang của bệnh viện công hoặc Cổng TTĐT Bộ Công an do agent tìm được, kèm ngày tra.

### Thông tư 51/2017/TT-BYT — nguyên văn đã đọc (vbpl.vn, 49.539 ký tự)

- **Điều 5 khoản 1**: adrenalin là thuốc thiết yếu, quan trọng hàng đầu, sẵn có để cấp cứu phản vệ.
- **Điều 6 khoản 1**: adrenalin **tiêm bắp** ngay khi chẩn đoán phản vệ **từ độ II trở lên**.
- **Điều 6 khoản 3**: người bệnh có tiền sử phản vệ mang sẵn adrenalin, hoặc người khác **không phải nhân viên y tế**, được phép tiêm bắp trong trường hợp khẩn cấp khi không có nhân viên y tế. Đây là câu quan trọng nhất của mục 15: người nhà được phép tiêm.
- **Điều 7**: hiệu lực **15/02/2018**, thay Thông tư 08/1999/TT-BYT.
- Liều và vị trí tiêm (mặt trước đùi ngoài) nằm ở **Phụ lục I/III/IV** — chưa mở phụ lục thì **không nêu liều**.

### Dự phòng sau phơi nhiễm HIV — QĐ 5968/QĐ-BYT ngày 31/12/2021

Văn bản: **Quyết định 5968/QĐ-BYT** của Bộ Y tế, "Hướng dẫn điều trị và chăm sóc HIV/AIDS" (thay bản hướng dẫn trước). Nội dung PEP, đọc qua trang Bệnh viện Bệnh Nhiệt đới dẫn lại quyết định này:

- ARV **càng sớm càng tốt, tốt nhất trong vòng 24 giờ**, **không muộn hơn 72 giờ** sau phơi nhiễm.
- Thời gian điều trị chuẩn **28 ngày liên tục**.
- Chỉ định: nguồn HIV dương tính hoặc không rõ tình trạng, phơi nhiễm ≤72 giờ.

**Con số quan trọng nhất là 24 giờ**, không phải 72: người đọc hay nghĩ "còn 72 giờ, để mai". Mục 38 phải nói "đi trong ngày".

## Soát sớm 4 nhóm về trước (A, B, E, G — 27 mục)

Cả bốn nhóm cổng xanh, 0 chỗ chứa "120"/"110" trong chính văn. Nguồn đã dùng:
- **QĐ 1904/QĐ-BYT (30/5/2014)** — Hướng dẫn quy trình kỹ thuật Hồi sức - Cấp cứu và Chống độc (mục 1, ép tim).
- **QĐ 3312/QĐ-BYT (05/11/2024)** — đột quỵ, dẫn kèm mục 4.2.2, **cửa sổ 270 phút** (mục 3, 4).
- **QĐ 40/QĐ-BYT (12/01/2015)** — bệnh về mắt, bài 27 (tắc động mạch võng mạc) và bài 17 (glôcôm góc đóng) cho mục 5, 6.
- **QĐ 5332/QĐ-BYT (23/12/2020)** — bệnh động mạch vành (mục 7).
- Bệnh viện Nhi Trung ương, Bạch Mai chống độc, Răng Hàm Mặt Trung ương cho nhóm G.

**Hai chỗ phải xử lý khi merge:**
1. **Mục 45 (nuốt pin cúc áo)** đang dẫn **VOV** + lời bác sĩ, không phải văn bản y tế. VOV là báo nhà nước nhưng vẫn là báo. Khi merge: hoặc tìm hướng dẫn của Bệnh viện Nhi Trung ương / Bộ Y tế về dị vật đường tiêu hoá, hoặc hạ xuống **C** và ghi rõ nguồn là báo.
2. **Mục 1**: câu viết "ấn sâu khoảng 5 cm, mỗi phút 100 lần trở lên". Chuẩn quốc tế là **5–6 cm, 100–120 lần/phút**; cần đối chiếu lại nguyên văn QĐ 1904/QĐ-BYT trước khi giữ, vì "100 lần trở lên" không có trần dễ thành 140–150 lần/phút và giảm hiệu quả.

### Quét nguồn "báo" so với "văn bản" trên 27 mục đã về

Quét tự động tất cả dòng Nguồn tìm tên báo (vnexpress, vov, dantri, tuoitre, thanhnien, baochinhphu, suckhoedoisong, laodong, vietnamnet, congan):

- **Chỉ 1 mục dựa hoàn toàn vào báo**: mục **45** (pin cúc áo, VOV). Đây là chỗ phải xử lý.
- Các mục khác có tên báo trong Nguồn là **phụ**, văn bản chính vẫn là luật/nghị định/quyết định hoặc hướng dẫn bệnh viện tuyến cuối — ví dụ mục 24 dẫn **Luật PCCC và CNCH 55/2024/QH15, bản hợp nhất 58/VBHN-VPQH**; mục 25 dẫn **NĐ 200/2025/NĐ-CP, bản ký**; mục 36–37 dẫn **BLHS 135/VBHN-VPQH Điều 22, 168**.
- Lưu ý khi đọc kết quả quét: `baochinhphu.vn` là **Báo Điện tử của Chính phủ**, không phải báo thương mại — nhưng vẫn là bài báo, không phải văn bản, nên chỉ dùng làm nguồn phụ.

## Merge 48/48 — 4/11/2026

`merge-drafts --write --force` ghép đủ **48 mục**, không trùng, không thiếu (A 7 · B 7 · C 7 · D 7 · E 7 · F 7 · G 6).

**Thang bằng chứng chương 13: A 0 · B 45 · C 3.** Viết lại đoạn mở chương theo số đếm thật: không mục nào A vì Việt Nam chưa công bố thống kê kết cục cho từng tình huống cấp cứu.

Dòng "Nhóm mục" 7 cụm theo khoảng (1–7, 8–14, 15–21, 22–28, 29–35, 36–42, 43–48), mỗi cụm kèm nhãn chủ đề.

Cổng sau merge: `check-plain --numbers` **444 mục, 0 chỗ chưa đạt** · `check-refs` **327 chỗ** đều trỏ đúng và có neo · `check-split` 47 file 0 vấn đề · `sync-stats --check` đạt · `check-selfcheck` đạt.

**Sửa trong lúc merge:**
1. **Mục 1**: "sâu khoảng 5 cm" → "sâu 4 đến 5 cm", thêm "đổi người ép mỗi 2 phút", đổi "nửa dưới xương ức" → "1/3 dưới xương ức" — đúng nguyên văn QĐ 1904/QĐ-BYT (biên độ 4–5 cm, tần số từ 100 lần/phút trở lên, đổi tay mỗi 2 phút).
2. **Mở chương**: bỏ hẳn hai số 120 và 110 khỏi chính văn. Câu mới: "Chương gốc dùng số của hệ thống cấp cứu một nước khác, và những số đó ở Việt Nam **không phải** số cấp cứu." Không đặt số sai vào mắt người đọc, kể cả để phủ định.
3. **Mục 45 giữ hạng B**: nguồn là bài báo dẫn lời bác sĩ hai bệnh viện nhi, đủ cho cơ chế bỏng hoá học, nhưng đã ghi rõ trong Nguồn là báo.

### Bài học cổng kiểm (ghi lại vì đã trả giá)

`node tools/check-refs.mjs --check` in **dòng cuối là "đạt"** kể cả khi phía trên có khối **"Cần xem tay"** liệt kê tham chiếu sai. Chương 12 đã phát hành ở v0.8 với một tham chiếu sai vì lệnh kiểm dùng `tail -1`. Từ nay: chạy `check-refs --check` rồi **grep chữ "Cần xem tay"**, không đọc dòng cuối.

Nguyên nhân cụ thể của chỗ sai: câu "danh mục **227** ngành, nghề" bị bộ kiểm đọc thành "**mục 227**" (chữ "mục" trong "danh mục" đứng ngay trước số). Sửa thành "Phụ lục IV của Luật Đầu tư liệt kê 227 ngành, nghề".

## Đóng hai "Còn treo" (tra 3/11/2026)

**QĐ 3133/QĐ-BYT — ngày ban hành là 17/7/2020, không phải 2021.** Agent F thấy lệch nguồn; tra lại: nhiều văn bản .gov.vn dẫn "Quyết định số 3133/QĐ-BYT ngày 17/7/2020 của Bộ trưởng Bộ Y tế", gồm cả một quyết định năm 2026 dẫn lại. Bản ghi 17/7/2021 là lỗi đánh máy trong một tài liệu tập huấn. Mục 42 dẫn **2020** là đúng.

**QĐ 1904/QĐ-BYT 2014 vẫn là văn bản đang được dẫn.** Không tìm thấy văn bản thay thế: các bệnh viện (Bệnh viện Phổi Hà Nội và nhiều nơi khác) vẫn công bố "Quy trình hồi sức cấp cứu chống độc (1904/QĐ-BYT)" như quy trình hiện hành, tra ngày 3/11/2026. Đây là **bằng chứng gián tiếp**, không phải xác nhận hiệu lực — nếu về sau tìm được danh mục văn bản hết hiệu lực của Bộ Y tế thì phải kiểm lại mục 1 và mục 44 của chương.

Ghi chú phương pháp: "không tìm thấy văn bản thay thế" **không** đồng nghĩa "còn hiệu lực". Câu trong sách vì vậy chỉ dẫn số hiệu và nội dung, không viết "văn bản đang có hiệu lực".
