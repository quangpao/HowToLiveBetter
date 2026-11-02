# Prompt xác minh — Chương 4 “Đừng lãng phí thời gian”

Tài liệu này để bạn dán cho một AI khác (hoặc tự dùng) nhằm **kiểm lại từng con số** trong 18 mục của chương 4 trước khi release v0.4.
Mỗi lượt dán **một** khối trong khung; đừng dán cả hai lượt cùng lúc — AI sẽ làm tắt.

- **Lượt A** — số liệu Việt Nam: giá dịch vụ, lương tối thiểu, giao thông, thống kê dân số/thời gian. Đây là nhóm **dễ lỗi thời nhất**, phải tra tại thời điểm gần nhất.
- **Lượt B** — nghiên cứu khoa học: kiểm DOI, PMID, **trạng thái rút bài**, và số trong abstract có khớp với sách không.

---

## Lượt A — số liệu Việt Nam

```
Bạn là người kiểm chứng số liệu cho một cuốn sách tiếng Việt về chi phí–lợi ích của các quyết định sống.
Nhiệm vụ: kiểm lại 5 nhóm số dưới đây và báo cáo đúng/sai/lệch.

QUY TẮC BẮT BUỘC
1. Không bịa số. Không suy ra. Không dùng số của nước khác thay cho Việt Nam.
2. Chỉ dùng nguồn: vanban.chinhphu.vn, xaydungchinhsach.chinhphu.vn, vbpl.vn, congbao.chinhphu.vn,
   datafiles.chinhphu.vn, trang .gov.vn của bộ/ngành, nso.gov.vn, hoặc trang chính thức của doanh nghiệp
   cung cấp dịch vụ (với giá dịch vụ). TUYỆT ĐỐI không dẫn thuvienphapluat.vn (chỉ được dùng để tìm).
3. Mỗi con số phải kèm: số hiệu văn bản + điều/khoản (nếu là văn bản pháp luật), hoặc URL + NGÀY TRA.
4. Văn bản pháp luật: phải kiểm hiệu lực tới hôm nay và ghi rõ đã bị sửa/thay/thay thế bởi văn bản nào.
5. Không tìm được thì ghi đúng chữ "KHÔNG TÌM ĐƯỢC" — không đoán, không lấy số cũ thay vào.
6. Trả lời bằng tiếng Việt. Không giải thích dài; chỉ bảng + ghi chú ngắn.

NĂM NHÓM CẦN KIỂM

(A1) Giá dịch vụ giúp việc nhà theo giờ — sách ghi (tra ngày 2/11/2026, bảng giá công khai của bTaskee):
     gói 2 giờ = 192.000đ (2 phòng, 55 m²); 3 giờ = 240.000đ (3 phòng, 85 m²); 4 giờ = 304.000đ (4 phòng, 105 m²).
     Cần kiểm: (a) giá còn đúng không, (b) giá có khác giữa Hà Nội và TP.HCM không, (c) có phụ phí
     cuối tuần / lễ / giờ cao điểm / chọn người làm không, mức bao nhiêu.
     Nếu tìm được bảng giá của 2–3 nhà cung cấp khác (JupViec, GUVI, HouseCare…) thì báo khoảng giá thị trường.

(A2) Lương tối thiểu theo giờ, hiệu lực 1/1/2026 (Nghị định 293/2025/NĐ-CP) — sách ghi:
     Vùng I 25.500đ/giờ (tháng 5.310.000), II 22.700 (4.730.000), III 20.000 (4.140.000), IV 17.800 (3.700.000).
     Cần kiểm: (a) số đúng chưa, (b) TỪ 1/1/2026 TỚI HÔM NAY có nghị định nào mới thay đổi mức này chưa
     — nếu có, ghi mức mới nhất và ngày hiệu lực. Đây là chỗ dễ sai nhất.

(A3) Thời gian đi lại — sách ghi theo TomTom Traffic Index 2025 (dữ liệu năm 2025):
     TP.HCM: 10 km mất 31 phút 55 giây; giờ cao điểm chiều 40 phút 32 giây, tốc độ 14,8 km/h; mất 127 giờ/năm.
     Hà Nội: 10 km mất 33 phút 20 giây; cao điểm 44 phút 7 giây; 13,6 km/h; mất 148 giờ/năm.
     Cần kiểm: số có khớp trang TomTom city page không; nếu có bản 2026 (dữ liệu 2026) thì báo số mới hơn.

(A4) Giờ làm việc nhà không được trả công ở Việt Nam — sách HIỆN KHÔNG CÓ SỐ này (đã bỏ trống).
     Cần tìm: số giờ/tuần (hoặc /ngày) làm việc nhà không được trả công, tách nam và nữ, từ
     Điều tra Lao động – Việc làm của Tổng cục Thống kê (nso.gov.vn), ưu tiên năm gần nhất.
     Nêu rõ: tên báo cáo, năm, bảng/trang, và định nghĩa việc nhà được tính gồm những gì.

(A5) Thời gian dùng internet mỗi ngày của người Việt — sách HIỆN KHÔNG CÓ SỐ này (đã bỏ trống).
     Cần tìm: số giờ:phút/ngày, nguồn chính thức (.gov.vn, Bộ TT&TT, Sách trắng CNTT) hoặc
     báo cáo Digital của DataReportal/Kepios (ghi rõ là nguồn thị trường, không phải nhà nước).

ĐỊNH DẠNG TRẢ LỜI
Bảng 9 cột:
| # | Nội dung sách đang ghi | Số/nguồn tìm được | Đúng / Sai / Lệch bao nhiêu | Văn bản hoặc URL | Điều–khoản hoặc bảng/trang | Ngày tra | Hiệu lực / ngày công bố | Ghi chú |
Sau bảng: 3 dòng "Cần sửa trong sách" (nếu có), mỗi dòng ghi đúng câu cần thay.
```

---

## Lượt B — nghiên cứu khoa học

```
Bạn là người kiểm chứng trích dẫn khoa học cho một cuốn sách tiếng Việt.
Nhiệm vụ: với từng bài dưới đây, xác minh (1) bài có tồn tại và đúng DOI/PMID, (2) bài CÓ BỊ RÚT hay
bị đính chính không, (3) các con số sách đang ghi có khớp với bài gốc không.

QUY TẮC BẮT BUỘC
1. Không bịa số, không suy diễn, không lấy số từ bản tóm tắt của bên thứ ba (Wikipedia, blog, báo).
   Chỉ lấy từ abstract chính thức (PubMed/PsycNet/publisher) hoặc toàn văn.
2. BẮT BUỘC kiểm trạng thái rút bài: PsycNet/PubMed ghi "RETRACTED", và tra Retraction Watch.
   Nếu bài đã bị rút → ghi rõ ngày rút, lý do, và có bản lặp lại độc lập nào không.
3. Mỗi con số phải dẫn được: abstract hay bảng nào, trang nào (nếu là toàn văn).
4. Không mở được toàn văn thì ghi "CHỈ ĐỌC ĐƯỢC ABSTRACT" — đừng đoán phần không đọc được.
5. Trả lời bằng tiếng Việt, bảng + ghi chú ngắn.

DANH SÁCH (theo số mục trong chương 4)

 1. Gollwitzer & Sheeran 2006, Adv Exp Soc Psychol 38:69–119 — sách ghi: 94 thử nghiệm, d = 0,65; bốn tác dụng.
 2. Henderson, Gollwitzer & Oettingen 2007, J Behav Dec Making 20:81–102 — 2 thí nghiệm; action-II vs reflection-II.
 3. Arkes & Blumer 1985, OBHDP 35:124–140 — hiệu ứng chi phí đã bỏ; vé mùa nhà hát.
 4. Arkes & Ayton 1999, Psychol Bull 125:591–600 — kết luận "không có trường hợp rõ ràng ở loài khác".
    Dai, Milkman & Riis 2014, Manage Sci 60:2563–2582 — +14,4% (tuần), +82,1% (năm), +33,4% (gym/tuần), +47,1% (học kỳ).
 5. Buehler, Griffin & Ross 1994, JPSP 67:366–381 — 33,9 ngày dự đoán / 55,5 thực tế; 48,6 worst case; 29,7% và 48,7% đúng hạn; r = 0,77.
    Kruger & Evans 2004, JESP 40:586–598.
 6. Bluedorn, Turban & Love 1999, J Appl Psychol 84:277–285 — 56 nhóm đứng vs 55 nhóm ngồi; họp ngồi dài hơn 34%.
 7. Luong & Rogelberg 2005, Group Dyn 9:58–67; Rogelberg et al. 2006, J Appl Psychol 91:86–96 — N = 676 và 304.
 8. Bandura & Schunk 1981, JPSP 41:586–598 — 40 trẻ 7,3–10,1 tuổi; "distal goals had no demonstrable effects".
 9. **Ariely & Wertenbroch 2002** — ĐÃ BỊ RÚT tháng 9/2026. Cần xác minh: ngày rút, lý do, và
    bản lặp lại Bisin & Hyndman 2026 (Psychol Sci) có kết luận gì (sách ghi: "deadline changes had negligible effect").
10. Sirois & Kitner 2015, Eur J Pers 29:433–444 — 15 mẫu, N = 4.357, r = .31 và −.24.
    Wohl, Pychyl & Bennett 2010, PAID 48:803–808 — 119 sinh viên, 2 bài thi.
11. Maas et al. 2012, Psychol Health 27(S2):59–73; Mertens et al. 2022 PNAS — d = 0,43 (0,38–0,48), 212 công bố, n = 2.148.439;
    Maier et al. 2022 PNAS — "no evidence after adjusting for publication bias". Kiểm xem bộ dữ liệu đã bị đính chính chưa.
12. Ashraf, Karlan & Yin 2006, QJE 121:635–672 — "increased by 81 percentage points" sau 12 tháng.
    Giné, Karlan & Zinman 2010, AEJ Applied 2:213–235 — 11% take-up, +3 điểm phần trăm, còn ở 12 tháng.
    Kaur, Kremer & Mullainathan 2015, JPE 123:1227–1277 — 36% chọn hợp đồng; +2,3% sản lượng.
13. Lally et al. 2010, Eur J Soc Psychol 40:998–1009 — 96 người, 12 tuần, 18–254 ngày, trung vị 66;
    "missing one opportunity did not materially affect".
14. Rozental et al. 2015, JCCP 83:808–824 — 150 người; d = 0,70 / 0,50; 0,81 / 0,69; 31,3–40,0% và 24,0–36,0%; p > 0,19.
15. Whillans et al. 2017, PNAS 114:8523–8527 — n = 6.271; thí nghiệm 60 người, 40 đô; chỉ 2,0% tự nêu ý tiết kiệm thời gian.
16. Allcott et al. 2020, AER 110:629–676 — "freed up 60 minutes per day"; sau đó dùng ít hơn ~11 phút/ngày (22%).
17. U.S. BLS, ATUS 2025 — xem TV 2,6 giờ/ngày; tổng giải trí 5,2 giờ; 95% có hoạt động giải trí.
18. Lane et al. 2005, IJHCI 18:133–144 — 251 người dùng Word; thí nghiệm 6 người; có nêu số giây tiết kiệm không?
18b. Stutzer & Frey 2008, Scand J Econ 110:339–366; Chatterjee et al. 2020, Transport Reviews 40:5–34.

ĐỊNH DẠNG TRẢ LỜI
| # | Bài (tác giả, năm, tạp chí) | DOI/PMID đúng? | Trạng thái (bình thường / rút / đính chính) | Số trong sách | Số trong bài | Khớp? | Nơi đọc (abstract/bảng X/trang) | Ghi chú |
Sau bảng: danh sách "Số nào trong sách phải sửa" + "Số nào sách nêu mà bài không có".
```

---

## Sau khi AI trả lời

Đưa kết quả lại cho tôi (dán nguyên bảng). Tôi sẽ:
1. Tự mở lại từng nguồn để kiểm — không tin bảng báo cáo, vì đã có lần bảng báo cáo sai (chương 3: “111” không nằm trong Nghị định 56/2017; “mã hồ sơ” không nằm trong Điều 17 Nghị định 118/2025).
2. Sửa mục tương ứng trong `book/04-dung-lang-phi-thoi-gian.md`.
3. Ghi từng chỗ sửa vào `docs/kiem-chung/chuong-04.md`.
4. Chạy lại 6 cổng + 4 build, rồi mới commit và release v0.4.

## Những gì tôi đã tự kiểm, không cần bạn kiểm lại

- Toàn bộ 23 nguồn trong sổ kiểm chứng chương 4 đã được tôi mở trực tiếp (PDF/abstract/trang gốc) và chép nguyên văn câu chứa số.
- Riêng **mục 8**: bài Ariely & Wertenbroch 2002 **đã bị rút tháng 9/2026** — sách đã ghi rõ và hạ xuống mức C.
- 8 URL mới của chương 4 trả về 200 (2 DOI của Wiley/APA trả 403 vì chặn bot, DOI vẫn đúng).
