# Chương 2 · Kiểm chứng nguồn (bản Việt)

Ghi lại những gì đã tra cho từng mục của chương "Đừng chết dần", để lần sau ai sửa cũng biết số lấy từ đâu và cái gì còn treo.

Chương gốc có 47 mục. Đến 2/11/2026 đã viết xong **TOÀN BỘ mục 1–47 — chương 2 hoàn tất**; sổ này cập nhật theo từng mục.

## Văn bản Việt Nam đã dùng

| Văn bản | Nội dung dùng | Trạng thái hiệu lực | Nguồn |
|---|---|---|---|
| Nghị quyết 173/2024/QH15 (30/11/2024) | Phần lĩnh vực y tế, trang 3 bản ký: "Quốc hội thống nhất **cấm sản xuất, kinh doanh, nhập khẩu, chứa chấp, vận chuyển, sử dụng thuốc lá điện tử, thuốc lá nung nóng**, các loại khí, chất gây nghiện, gây tác hại cho sức khỏe con người **từ năm 2025**" | Có hiệu lực | Bản ký (scan, đã đọc bằng OCR thủ công): <https://datafiles.chinhphu.vn/cpp/files/vbpq/2024/12/173-qh15.signed.pdf> · trang văn bản: <https://vanban.chinhphu.vn/?pageid=27160&docid=211987> |
| Luật Phòng, chống tác hại của thuốc lá số 09/2012/QH13 (18/6/2012) | **Điều 11 khoản 1**: cấm hút hoàn toàn trong nhà và trong khuôn viên cơ sở y tế; cơ sở giáo dục (trừ khoản 2 điểm b); cơ sở chăm sóc, nuôi dưỡng, vui chơi, giải trí dành riêng cho trẻ em; cơ sở hoặc khu vực có nguy cơ cháy, nổ cao. **Khoản 2**: cấm hút hoàn toàn trong nhà tại nơi làm việc; trường cao đẳng, đại học, học viện; địa điểm công cộng | Còn hiệu lực | Toàn văn trên Cổng Chính phủ: <https://chinhphu.vn/default.aspx?pageid=27160&docid=163544> · file gốc: <https://datafiles.chinhphu.vn/cpp/files/vbpq/2012/09/09_tachai_thuocla.doc> |
| Luật Thuế tiêu thụ đặc biệt số 66/2025/QH15 (14/6/2025, hiệu lực 1/1/2026) | **Điều 8 + Biểu thuế**: thuốc lá điếu thuế suất **75%** + thuế tuyệt đối **2.000đ/bao (1/1/2027) → 4.000 (2028) → 6.000 (2029) → 8.000 (2030) → 10.000đ/bao (1/1/2031)**; xì gà 20.000→100.000đ/điếu; thuốc lá sợi/thuốc lào 20.000→100.000đ/100 g. Mục 12 Biểu thuế: **nước giải khát theo TCVN có hàm lượng đường trên 5 g/100 ml — 8% từ 1/1/2027, 10% từ 1/1/2028** | Có hiệu lực | Bản ký scan, **tự đọc bằng ảnh trang** (pymupdf 170 dpi + đọc ảnh): <https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/7/66qhm.signed.pdf> · trang văn bản: <https://vanban.chinhphu.vn/> |
| Nghị định 90/2026/NĐ-CP (30/3/2026, hiệu lực 15/5/2026) | **Điều 24 khoản 1** nguyên văn: "Phạt tiền từ 200.000 đồng đến 500.000 đồng đối với hành vi hút thuốc lá tại địa điểm có quy định cấm. Trường hợp hút thuốc lá trên tàu bay thực hiện theo quy định về xử phạt vi phạm hành chính trong lĩnh vực hàng không dân dụng." | Có hiệu lực | Bản ký scan, **tự đọc ảnh trang 32** (156 trang, không có lớp text): <https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/4/90-ndcp.signed.pdf> · trang văn bản: <https://vanban.chinhphu.vn/?pageid=27160&docid=217386> |
| Nghị định 204/2026/NĐ-CP (11/6/2026, hiệu lực 1/8/2026) | Xử phạt vi phạm hành chính **lĩnh vực thú y**; mức **1.000.000–2.000.000 đồng** với hành vi không tiêm phòng dại cho động vật bắt buộc (số hiệu + ngày + lĩnh vực đã xác minh trên vanban.chinhphu.vn; **số điều/khoản chưa tự mở bản ký**) | Có hiệu lực | <https://vanban.chinhphu.vn/?pageid=27160&docid=218418> |
| Thông tư 07/2017/TT-BYT (3/5/2017) | **Điều 4 khoản 1** nguyên văn: "Các thuốc không thuộc Danh mục thuốc không kê đơn được phân loại là thuốc kê đơn." → varenicline **không** có trong danh mục không kê đơn, nên là thuốc kê đơn | Có hiệu lực (đã hết hiệu lực một phần) | PDF gốc: Sở Y tế Lạng Sơn (*nguồn do đợt đối chiếu cung cấp, chưa tự mở trong lượt này*) |
| Quyết định 5481/QĐ-BYT (30/12/2020) | Tiêu chuẩn chẩn đoán: **tiền ĐTĐ** — rối loạn glucose đói (FPG) **5,6–6,9 mmol/L**, giảm dung nạp glucose **7,8–11 mmol/L**, HbA1c **5,7–6,4%**; **ĐTĐ** — FPG **≥ 7 mmol/L**, OGTT 2 giờ **≥ 11,1 mmol/L**, HbA1c **≥ 6,5%** | Có hiệu lực (thay QĐ 3319/QĐ-BYT 2017) | Đã tự đọc PDF: <https://canhgiacduoc.org.vn/SiteData/3/UserFiles/HD%20Chan%20doan%20va%20dieu%20tri%20DTD%20tip%202.pdf> |

## Số liệu Việt Nam đã dùng

| Chỉ số | Số | Kỳ / năm | Nguồn |
|---|---|---|---|
| Tỷ lệ hút thuốc ở người trưởng thành | Nam **42,3%** (2015: 45,3%), nữ **1,7%** | GATS 2020 | Báo điện tử Chính phủ: <https://baochinhphu.vn/ty-le-hut-thuoc-la-o-nu-gioi-gia-tang-102305936.htm> |
| Tử vong do thuốc lá | **hơn 100.000 ca/năm** (ước tính của WHO) | — | WHO và Chương trình Phòng, chống tác hại thuốc lá, Bộ Y tế: <https://vnpa.moh.gov.vn/chu-de-ngay-the-gioi-khong-thuoc-la-vach-tran-su-hap-dan-gia-tao/> |
| Giá thuốc lá bán lẻ (dùng làm giá hiện hành) | **6.000–20.000 đồng/bao**, thuế chỉ chiếm **35,3%** giá bán lẻ | Khảo sát của cơ quan phòng, chống tác hại thuốc lá — tra lại **11/2026** | Bộ KH&CN: <https://mst.gov.vn/gia-thuoc-la-cua-viet-nam-re-gan-nhat-the-gioi-197158795.htm> |
| Giá bình quân một bao (số lịch sử, chỉ để so sánh) | **12.330 đồng** (2018) · **12.700 đồng** (2019) · **12.120 đồng** (2020) | Điều tra ITC Việt Nam, 3 vòng | <https://pmc.ncbi.nlm.nih.gov/articles/PMC11650784/> |
| Ăn trầu ở phụ nữ | **6,7%** phụ nữ còn ăn trầu; trong 1.084 ca ung thư khoang miệng (1997), 60–75 tuổi mắc nhiều nhất; người ăn trầu: **13%** xơ hoá dưới niêm mạc miệng, **3,8%** bạch sản; ở phụ nữ ăn trầu, vị trí hay gặp là niêm mạc má 27,9%, lưỡi 23,1%, môi 22,4% | Dữ liệu thu thập 1997–2008 tại Hà Nội và TP.HCM | Reichart PA & Nguyễn Xuân H (2008), J Oral Pathol Med 37:511–514: <https://doi.org/10.1111/j.1600-0714.2008.00669.x> |
| Thừa cân ở VN | **19,5%** người 18–69 tuổi có BMI ≥ 25 | STEPS 2021 (Bộ Y tế), bản tóm tắt | <https://qppl.dienbien.gov.vn/qlvb/vbpq.nsf/3d0f058120469ad34725726600365420/6582A74F66F05DC547258A9E> |
| Tiêu thụ rau quả VN | Đạt **trên 60%** mức khuyến nghị | Viện Dinh dưỡng | <https://viendinhduong.vn/vi/article/tin-tuc/vai-tro-va-muc-tieu-thu-rau-qua-hop-ly-67e7c86bc862b932c> |
| Uống rượu bia mức nguy hại | **14,7%** người 18–69 tuổi; nam **28,5%**, nữ **1%**. Định nghĩa STEPS: trong **30 ngày** có ít nhất **1 lần ≥ 6 đơn vị cồn** | Khảo sát STEPS 2021 (Bộ Y tế) | <https://syt.khanhhoa.gov.vn/Default.aspx?ArticleId=34c88745-cd6c-4465-abdc-259b288d29ba> |
| Giá gạo lứt vs gạo trắng | Gạo lứt nguyên cám **~25.000 đồng/kg** (20.000–40.000); gạo trắng **16.500–17.500 đồng/kg** | Bảng giá gạo, tra 11/2026 | <https://anbinhphat.com/bang-gia-gao-hom-nay/> · <https://vietnambiz.vn/gia-lua-gao-hom-nay-88-gao-noi-dia-an-do-tang-gia-manh-20268814348993.htm> |
| Giá hạt điều rang | **250.000–450.000 đồng/kg** (loại 1: 320.000–400.000) → nắm 28 g ≈ **7.000–12.600 đồng** | Khảo sát giá, tra 11/2026 | <https://kamereo.vn/blog/vi/gia-hat-dieu/> · <https://foodcity.vn/hat-dieu-gia-bao-nhieu-b392.php> |
| Giá phòng gym | **300.000–600.000 đồng/tháng** (phòng bình dân); chuỗi lớn tới **2.000.000 đồng/tháng** | Khảo sát giá, tra 11/2026 | <https://www.decathlon.vn/blog/tap-gym-bao-nhieu-tien-1-thang/> |
| Giá sân cầu lông | **50.000–80.000 đồng/giờ**, cao điểm tối tới **150.000 đồng/giờ** | Bảng giá sân, tra 11/2026 | <https://qvbadminton.com/cho-thue-san-cau-long/> · <https://shopvnb.com/gia-thue-san-cau-long.html> |
| Rối loạn giấc ngủ | **15–20%** người trưởng thành; trên **10 triệu** người Việt có vấn đề về giấc ngủ | Ước tính dẫn trên Sở Y tế Nghệ An | <https://yte.nghean.gov.vn/tin-chuyen-nganh/tren-10-trieu-nguoi-viet-gap-phai-cac-van-de-ve-giac-ngu> |
| Tăng huyết áp — biết mình bị bệnh | **26,2%** người trưởng thành 18–69 tuổi bị tăng huyết áp, chỉ **40,2%** biết tình trạng | Khảo sát STEPS 2021 (Bộ Y tế) | <http://tytphuong13qtb.medinet.gov.vn/chuyen-muc/tuyen-y-te-co-so-diem-tua-kiem-soat-tang-huyet-ap-tai-cong-dong> |
| Thiếu hoạt động thể lực | **Gần 30%** dân số | Cục Y tế dự phòng (TS Trương Đình Bắc) | <https://chanthuongvacotsong.bachmai.gov.vn/canh-bao-beo-phi-benh-tat-gia-tang-vi-nguoi-viet-luoi-van-dong> |
| Sức khỏe răng miệng | **Hơn 90%** dân số có vấn đề răng miệng | Điều tra sức khỏe răng miệng toàn quốc lần thứ 3, 2019; trang gốc chặn truy cập, số đọc qua trích đoạn | <https://yte.nghean.gov.vn/tin-chuyen-nganh/hon-90-dan-so-mac-van-de-rang-mieng-nhieu-nguoi-khong-kham> |
| Muối ăn vào | **9,4 g/ngày** (gần **gấp đôi** khuyến cáo **dưới 5 g** của WHO) | Điều tra quốc gia STEPS, yếu tố nguy cơ bệnh không lây nhiễm | Cục Y tế dự phòng: <https://suckhoedoisong.vn/nguoi-viet-an-thua-muoi-gap-doi-khuyen-cao-chi-nen-an-duoi-5g-ngay-1691786> |
| Đường tiêu thụ | **46,5 g** đường tự do/người/ngày (gần **gấp đôi** mức khuyến cáo dưới **25 g/ngày** của WHO) | Số dẫn từ báo cáo ngành đường, 2017 | Sở Y tế Nghệ An: <https://yte.nghean.gov.vn/tin-chuyen-nganh/tieu-thu-do-uong-co-duong-tang-hang-loat-benh-tat-nguy-hiem> |
| Thuốc cai thuốc lá có đăng ký | **Champix (varenicline) — VN-21937-19**, hộp khởi đầu 11 viên 0,5 mg + 14 viên 1 mg | Đăng ký lưu hành | <https://trungtamthuoc.com/thuoc-champix-05mg-va-1mg> |

## Bằng chứng quốc tế dùng trong chương

| Nghiên cứu | Nội dung dùng | Mục | Nguồn |
|---|---|---|---|
| Jha P và cs. (2013), NEJM | Người còn hút chết sớm hơn người chưa từng hút **hơn 10 năm**; cai trước **40 tuổi** loại bỏ khoảng **90%** nguy cơ tử vong tăng thêm; cai ở **25–34** tuổi được thêm khoảng **10 năm**, **35–44** khoảng **9 năm**, **45–54** khoảng **6 năm** | 1 | <https://doi.org/10.1056/NEJMsa1211128> |
| Öberg M và cs. (2011), Lancet 377:139–146 | Số liệu **2004**, 192 nước: **40%** trẻ em, **33%** nam không hút, **35%** nữ không hút phơi nhiễm; **603.000** ca tử vong (**1,0%** tổng tử vong toàn cầu) — **379.000** bệnh tim thiếu máu cục bộ, **165.000** nhiễm trùng hô hấp dưới, **36.900** hen, **21.400** ung thư phổi; **47%** là nữ, **28%** trẻ em, **26%** nam; **10,9 triệu** DALY (**0,7%**) | 2 | <https://doi.org/10.1016/S0140-6736(10)61388-8> · abstract lấy nguyên văn qua PubMed E-utilities, PMID 21112082 |
| Cahill K và cs. (2016), Cochrane CD006103 | **39 thử nghiệm, 25.290 người**. Varenicline liều chuẩn vs giả dược: **RR 2,24 (95% CI 2,06–2,43)**, 27 thử nghiệm, 12.625 người, **chất lượng cao**; liều thấp **RR 2,08 (1,56–2,78)**; vs bupropion **RR 1,39 (1,25–1,54)**; vs liệu pháp thay thế nicotine **RR 1,25 (1,14–1,37)**. Cytisine vs giả dược **RR 3,98 (2,01–7,87)** — chất lượng thấp; cytisine vs NRT **RR 1,43 (1,13–1,80)** | 3 | <https://doi.org/10.1002/14651858.CD006103.pub7> · PMID 27158893 |

| Lindson-Hawley N và cs. (2016), Annals of Internal Medicine 164:585–592 | Thử nghiệm ngẫu nhiên, 697 người, Anh; cả hai nhóm đều có tư vấn + NRT. Cai đột ngột vs giảm 75% trong 2 tuần: **4 tuần 49,0% (43,8–54,2) vs 39,2% (34,0–44,4), RR 0,80 (0,66–0,93)**; **6 tháng 22,0% (18,0–26,6) vs 15,5% (12,0–19,7), RR 0,71 (0,46–0,91)**; nhóm thích giảm dần cai được 38,3% so với 52,2% (P = 0,007) | 4 | <https://doi.org/10.7326/M14-2805> · PMID 26975007 |

| Stead LF và cs. (2013), Cochrane CD000165 | 42 thử nghiệm, hơn **31.000** người: lời khuyên ngắn vs không khuyên **RR 1,66 (1,42–1,94)**; can thiệp dày **1,84 (1,60–2,13)**; dày vs tối thiểu **1,37 (1,20–1,56)**; tỷ lệ tự cai 2–3% thì lời khuyên ngắn thêm **1–3 điểm phần trăm** | 5 | <https://doi.org/10.1002/14651858.CD000165.pub4> |
| Matkin W và cs. (2019), Cochrane CD002850 | 104 thử nghiệm, **111.653** người: tư vấn điện thoại chủ động nhiều buổi cho người đã gọi đường dây **RR 1,38 (1,19–1,61)**, 14 thử nghiệm, 32.484 người; ngoài đường dây **RR 1,25 (1,15–1,35)**, 65 thử nghiệm, 41.233 người; chất lượng bằng chứng **trung bình** (dị ứng cao giữa các nghiên cứu) | 5 | <https://doi.org/10.1002/14651858.CD002850.pub4> |

| Lindson N và cs. (2026), Cochrane CD010216 | **80 thử nghiệm, 29.861 người**: thuốc lá điện tử có nicotine vs NRT **RR 1,61 (1,23–2,12)** — chất lượng cao, 11 thử nghiệm, 4.114 người, thêm ~4/100 người cai; vs không nicotine **1,34 (1,05–1,69)**; vs chỉ tư vấn/không hỗ trợ **1,75 (1,39–2,20)** chất lượng thấp; tác dụng phụ nghiêm trọng tương đương NRT; tác giả ghi rõ **cần thử nghiệm dài hơn** mới biết hại lâu dài | 6 | <https://doi.org/10.1002/14651858.CD010216.pub11> · PMID 42642048 |

| Imamura F và cs. (2015), BMJ 351:h3576 | 17 nghiên cứu theo dõi, **38.253 ca** ĐTĐ2 trên **10.126.754** người-năm: mỗi phần nước ngọt/ngày **+18% (9–28%)**, sau hiệu chỉnh béo phì **+13% (6–21%)**; đồ uống ngọt nhân tạo 25% (18–33) → **8% (2–15)**; nước ép trái cây 5% (−1–11) → 7% (1–14); kết luận: ASB và nước ép **không phải lựa chọn lành mạnh thay thế** | 7 | <https://doi.org/10.1136/bmj.h3576> · PMID 26199070 |
| WHO (2023), hướng dẫn về chất làm ngọt không đường | Khuyến cáo **không** dùng chất làm ngọt nhân tạo để kiểm soát cân nặng (khuyến cáo có điều kiện) | 7 | <https://www.who.int/news/item/15-05-2023-who-advises-not-to-use-non-sugar-sweeteners-for-weight-control-in-newly-released-guideline> |

| WHO/IARC (2003), Monographs Vol. 85 | Kết luận: trầu **có thuốc lá** gây ung thư ở người; trầu **không có thuốc lá cũng gây ung thư**; **hạt cau** tự nó cũng là chất gây ung thư nhóm 1 | 8 | <https://www.who.int/news/item/07-08-2003-iarc-monographs-programme-finds-betel-quid-and-areca-nut-chewing-carcinogenic-to-humans> |

| Neal B và cs. (2021), SSaSS, NEJM 385:1067–1077 | **20.995 người**, 600 làng, theo dõi 4,74 năm: đột quỵ **29,14 vs 33,65/1000 người-năm, RR 0,86 (0,77–0,96)**; biến cố tim mạch chính **0,87 (0,80–0,94)**; tử vong **0,88 (0,82–0,95)**; tăng kali máu nghiêm trọng **1,04 (0,80–1,37)**, không tăng có ý nghĩa. Muối thay thế = 75% NaCl + 25% KCl | 9 | <https://doi.org/10.1056/NEJMoa2105675> · PMID 34459569 |
| WHO (2025), hướng dẫn về muối giảm natri | Có hướng dẫn riêng cho việc dùng muối giảm natri (lower-sodium salt substitutes) | 9 | <https://www.who.int/publications/i/item/9789240105591> |

| Walsh T và cs. (2019), Cochrane CD007868 | **96 thử nghiệm**; răng vĩnh viễn: kem fluor **1000–1250 ppm** vs không fluor **SMD −0,28 (−0,32 đến −0,25)**, 55 thử nghiệm, chất lượng cao/trung bình; **1450–1500 ppm** SMD −0,36 (−0,43 đến −0,29); 1450–1500 vs 1000–1250 SMD −0,08 (−0,14 đến −0,01); răng sữa 1500 ppm **MD −1,86 dfs (−2,51 đến −1,21)** | 10 | <https://doi.org/10.1002/14651858.CD007868.pub3> · PMID 30829399 |
| Worthington HV và cs. (2019), Cochrane CD012018 | **35 thử nghiệm, 3.929 người lớn**: chỉ nha khoa + đánh răng vs đánh răng đơn thuần — viêm lợi 1 tháng **SMD −0,58 (−1,12 đến −0,04)**, 8 thử nghiệm, 585 người, **chất lượng thấp**; chảy máu và mảng bám không nhất quán; **không thử nghiệm nào đo sâu răng kẽ răng** | 10 | <https://doi.org/10.1002/14651858.CD012018.pub2> · PMID 30968949 |

| Paluch AE và cs. (2022), Lancet Public Health 7:e219 | **15 nghiên cứu, 47.471 người lớn**, 3.013 tử vong, theo dõi trung vị 7,1 năm: HR tử vong so nhóm đi ít nhất — **0,60 (0,51–0,71)** ở 5.801 bước; **0,55 (0,49–0,62)** ở 7.842 bước; **0,47 (0,39–0,57)** ở 10.901 bước; lợi ích chững ở **6.000–8.000** (≥60 tuổi) và **8.000–10.000** (<60 tuổi); tốc độ đi cũng có ích riêng, HR **0,67 (0,56–0,83)** | 11 | <https://doi.org/10.1016/S2468-2667(21)00302-9> · PMID 35247352 |

| Chowdhury R và cs. (2013), Eur Heart J 34:2940 | **44 nghiên cứu, 1.978.919 người**, 135.627 biến cố CVD, 94.126 tử vong: chỉ **60% (52–68%)** tuân thủ tốt (≥80%); tuân thủ tốt vs kém — biến cố CVD: statin **0,85 (0,81–0,89)**, hạ áp **0,81 (0,76–0,86)**; tử vong: statin **0,55 (0,46–0,67)**, hạ áp **0,71 (0,64–0,78)**; ~**9%** biến cố CVD ở châu Âu do không tuân thủ | 12 | <https://doi.org/10.1093/eurheartj/eht295> · PMID 23907142 |

| Cappuccio FP và cs. (2010), Sleep 33:585 | **16 nghiên cứu / 27 mẫu đoàn hệ, 1.382.999 người**, 112.566 tử vong, theo dõi 4–25 năm: ngủ ngắn **RR 1,12 (1,06–1,18)**; ngủ dài **RR 1,30 (1,22–1,38)** — quan hệ chữ U | 13 | <https://doi.org/10.1093/sleep/33.5.585> · PMID 20469800 |
| AASM & SRS (2015), đồng thuận | Người lớn nên ngủ **từ 7 giờ trở lên** mỗi đêm đều đặn (hầu hết cần 7–9 giờ) | 13 | <https://doi.org/10.5665/sleep.4716> · PMID 26039963 |

| Oja P và cs. (2017), Br J Sports Med 51:812 | **80.306 người**: môn dùng vợt — tử vong do mọi nguyên nhân **HR 0,53 (0,40–0,69)**, tim mạch **0,44 (0,24–0,83)**; bơi 0,72; thể dục 0,73; đạp xe 0,85; bóng đá và chạy bộ không có ý nghĩa | 14 | <https://doi.org/10.1136/bjsports-2016-096822> · PMID 27895075 |
| Han H và cs. (2026), BMJ Medicine 5:e001513 | 2 đoàn hệ, **2.431.318 người-năm, 38.847 tử vong**: quần vợt/squash **HR 0,85 (0,80–0,89)**; đi bộ 0,83; chạy 0,87; đạp xe 0,96; **bơi 1,01 (không có lợi)**; chơi nhiều môn khác nhau thì lợi ích cao hơn | 14 | <https://doi.org/10.1136/bmjmed-2025-001513> · PMID 41574252 |
| Schnohr P và cs. (2018), Mayo Clin Proc 93:1775 | Copenhagen City Heart Study, **8.577 người**, theo dõi tới 25 năm: tuổi thọ tăng thêm so nhóm ít vận động — **quần vợt 9,7 năm**, **cầu lông 6,2**, bóng đá 4,7, đạp xe 3,7, bơi 3,4, chạy 3,2, thể dục 3,1, phòng tập 1,5 | 14 | <https://doi.org/10.1016/j.mayocp.2018.06.025> · PMID 30193744 |

| Stamatakis E và cs. (2022), Nat Med 28:2521 | **25.241 người không tập thể dục**, theo dõi 6,9 năm, 852 tử vong, đo bằng thiết bị đeo: **3 đợt/ngày × 1–2 phút** → tử vong mọi nguyên nhân & ung thư **giảm 38–40%**, tim mạch **48–49%**; **4,4 phút/ngày** → giảm 26–30% và 32–34%; lặp lại ở 62.344 người có tập cho kết quả tương tự | 15 | <https://doi.org/10.1038/s41591-022-02100-x> · PMID 36482104 |

| Momma H và cs. (2022), Br J Sports Med 56:755 | **16 nghiên cứu theo dõi**: tập sức mạnh → nguy cơ thấp hơn **10–17%** (tử vong, tim mạch, ung thư chung, đái tháo đường, ung thư phổi); quan hệ **chữ J**, giảm mạnh nhất **10–20%** ở **30–60 phút/tuần**; đái tháo đường dạng chữ L tới 60 phút/tuần; kết hợp sức mạnh + aerobic tốt hơn một loại | 16 | <https://doi.org/10.1136/bjsports-2021-105061> · PMID 35228201 |

| Ekelund U và cs. (2016), Lancet 388:1302 | **13 nghiên cứu, 1.005.791 người**, 84.609 tử vong: nhóm vận động thấp nhất + ngồi >8h **HR 1,59 (1,52–1,66)**; ngồi >8h nhưng >35,5 MET-h/tuần **1,04 (0,99–1,10)**; ngồi <4h mà vận động <2,5 MET-h/tuần vẫn **1,27 (1,22–1,31)**; xem tivi ≥3h/ngày tăng tử vong bất kể vận động (trừ nhóm năng động nhất) | 17 | <https://doi.org/10.1016/S0140-6736(16)30370-1> · PMID 27475271 |

| IARC/WHO (2015), thông cáo 26/10 | Thịt chế biến = **nhóm 1**, bằng chứng **đủ mạnh** ở người là gây **ung thư đại trực tràng**; **50 g/ngày → +18%**; xem hơn **800** nghiên cứu; thịt đỏ tươi = nhóm 2A; "nguy cơ của một cá nhân là nhỏ" | 18 | <https://www.iarc.who.int/wp-content/uploads/2018/07/pr240_E.pdf> · <https://doi.org/10.1016/S1470-2045(15)00444-1> |

| GBD 2016 Alcohol Collaborators (2018), Lancet 392:1015 | 195 quốc gia: rượu là nguy cơ thứ **7**; **2,2%** tử vong nữ / **6,8%** nam (chuẩn hoá tuổi); tuổi 15–49 là nguy cơ **hàng đầu** — **3,8%** nữ, **12,2%** nam; mức giảm hại tối thiểu **0 đơn vị/tuần (0,0–0,8)**; ≥50 tuổi: ung thư chiếm **27,1%** (nữ) và **18,9%** (nam) số tử vong do rượu | 19 | <https://doi.org/10.1016/S0140-6736(18)31310-2> · PMID 30146330 |

| Kaye AD và cs. (2024), Cureus 16:e57601 | Sảng rượu xuất hiện **48–72 giờ** sau ly cuối, kéo dài **1–8 ngày**; tử vong **tới 20%**, điều trị sớm còn **~1%**; CIWA-Ar >**15** điểm là nặng; hiện tượng **kindling** (cai nhiều lần → nguy cơ cao hơn) | 20 | <https://doi.org/10.7759/cureus.57601> · PMC11069634 |
| Schuckit MA (2014), NEJM 371:2109 | Tổng quan về nhận diện và xử trí sảng rượu; benzodiazepine là thuốc chính; cần bù **thiamine (B1)** trước glucose | 20 | <https://doi.org/10.1056/NEJMra1407298> · PMID 25427113 |

| Aune D và cs. (2016), BMC Med 14:207 | **20 nghiên cứu** theo dõi, mỗi **28 g/ngày**: mạch vành **0,71 (0,63–0,80)**; tim mạch **0,79 (0,70–0,88)**; ung thư **0,85 (0,76–0,94)**; tử vong mọi nguyên nhân **0,78 (0,72–0,84)**; đột quỵ **0,93 (0,83–1,05) không có ý nghĩa**; đái tháo đường 0,61; hô hấp 0,48; **hạt cây và đậu phộng tương đương**; ước tính 4,4 triệu ca tử vong sớm/năm do ăn <20 g/ngày | 22 | <https://doi.org/10.1186/s12916-016-0730-3> · PMID 27916000 |

| Pan A và cs. (2012), Arch Intern Med 172:555 | **37.698 nam + 83.644 nữ**, 2,96 triệu người-năm, 23.926 tử vong: mỗi khẩu phần thịt đỏ/ngày — chưa chế biến **1,13 (1,07–1,20)**, chế biến **1,20 (1,15–1,24)**; tim mạch 1,18 / 1,21; ung thư 1,10 / 1,16; **đổi 1 khẩu phần sang cá/gia cầm/hạt/đậu/sữa ít béo/ngũ cốc → thấp hơn 7–19%**; ăn <42 g/ngày tránh được 9,3% tử vong nam và 7,6% nữ | 23 | <https://doi.org/10.1001/archinternmed.2011.2287> · PMID 22412075 |

| Aune D và cs. (2016), BMJ 353:i2716 | **45 nghiên cứu**, mỗi **90 g/ngày** ngũ cốc nguyên hạt: mạch vành **0,81 (0,75–0,87)**; tim mạch **0,78 (0,73–0,85)**; ung thư **0,85 (0,80–0,91)**; tử vong **0,83 (0,77–0,90)**; đột quỵ 0,88 (0,75–1,03) NS; giảm tới **210–225 g/ngày** thì chững | 24 | <https://doi.org/10.1136/bmj.i2716> · PMID 27301975 |

| Inoue-Choi M và cs. (2022), Ann Intern Med 175:1201 | **498.043 người** 40–69, UK Biobank, theo dõi **11,2 năm**: so với không uống, **2–3 tách/ngày = 0,87 (0,84–0,91)**; 4–5 = 0,88; 6–7 = 0,88; **≤1 tách = 0,95 (0,91–1,00)**; nghịch với tử vong tim mạch; không phụ thuộc tốc độ chuyển hoá caffeine | 25 | <https://doi.org/10.7326/M22-0041> · PMID 36037472 |

| Poole R và cs. (2017), BMJ 359:j5024 | Tổng quan ô dù **201 phân tích gộp**, 67 kết cục: **3–4 tách/ngày** vs không uống — tử vong **0,83 (0,79–0,88)**; tử vong tim mạch **0,81 (0,72–0,90)**; bệnh tim mạch **0,85 (0,80–0,90)**; nhiều vs ít: ung thư **0,82 (0,74–0,89)**; quan hệ phi tuyến, đỉnh ở 3–4 tách; có hại ở **thai kỳ** | 26 | <https://doi.org/10.1136/bmj.j5024> · PMID 29167102 |

| Aune D và cs. (2017), Int J Epidemiol 46:1029 | Mỗi **200 g/ngày** rau quả: mạch vành **0,92 (0,90–0,94)**; đột quỵ **0,84 (0,76–0,92)**; tim mạch **0,92 (0,90–0,95)**; ung thư **0,97 (0,95–0,99)**; tử vong **0,90 (0,87–0,93)**; giảm tới **800 g/ngày** (ung thư chững 600 g); 5,6 triệu / 7,8 triệu ca tử vong sớm 2013 do ăn <500 / <800 g | 27 | <https://doi.org/10.1093/ije/dyw319> · PMID 28338764 |

| Lane MM và cs. (2024), BMJ 384:e077310 | **45 phân tích gộp**, **9.888.373 người**, 32/45 kết cục (71%) tương quan trực tiếp: tử vong tim mạch **1,50 (1,37–1,63)**; ĐTĐ2 **1,12 (1,11–1,13)**; lo âu **1,48**; rối loạn tâm thần **1,53**; tử vong mọi nguyên nhân **1,21 (1,15–1,27)**; tử vong tim **1,66 (1,51–1,84)**; béo phì **1,55 (1,36–1,77)**; GRADE **thấp đến rất thấp** | 28 | <https://doi.org/10.1136/bmj-2023-077310> · PMID 38418082 |

| WHO (2024), Household air pollution fact sheet | Dữ liệu 2021: **2,9 triệu** ca tử vong sớm/năm (hơn **309.000** trẻ <5 tuổi); **2,1 tỷ người** nấu bằng nhiên liệu rắn/dầu hoả; 32% thiếu máu cục bộ tim, 23% đột quỵ, 21% nhiễm trùng hô hấp dưới, 19% COPD, 6% ung thư phổi; gần gấp đôi nguy cơ viêm phổi ở trẻ; **44%** ca tử vong viêm phổi trẻ <5 | 29 | <https://www.who.int/news-room/fact-sheets/detail/household-air-pollution-and-health> |
| IARC Monographs Vol. 95 (2010) | Đốt **than trong nhà** = **nhóm 1** (ung thư phổi); đốt **sinh khối** (củi, rơm) = **nhóm 2A** | 29 | IARC Vol. 95 |

| IARC (2016), Lancet Oncol 17:877 | Đồ uống **trên 65°C** = **nhóm 2A**, bằng chứng ở ung thư thực quản; **cà phê hạ xuống nhóm 3** — hại nằm ở nhiệt độ, không ở cà phê | 30 | <https://doi.org/10.1016/S1470-2045(16)30239-X> · IARC Vol. 116 |
| Islami F và cs. (2009), BMJ 338:b929 | Đoàn hệ Golestan: trà **nóng OR 2,07 (1,28–3,35)**, **rất nóng 8,16 (3,93–16,9)**; uống sau **2–3 phút 2,49 (1,62–3,83)**, **<2 phút 5,41 (2,63–11,1)** so với ≥4 phút | 30 | <https://doi.org/10.1136/bmj.b929> · PMID 19325180 |

| Manson JE và cs. (2019), NEJM 380:33 | Thử nghiệm VITAL: **25.871 người**, vitamin D3 **2.000 IU/ngày**, theo dõi **5,3 năm** — ung thư **HR 0,96 (0,88–1,06)**, biến cố tim mạch chính **0,97 (0,85–1,12)**, đều **không có ý nghĩa** | 31 | <https://doi.org/10.1056/NEJMoa1809944> · PMID 30415629 |
| Blume C và cs. (2019), Somnologie 23:147 | Tổng quan: ánh sáng ban ngày là tín hiệu chính đồng bộ nhịp sinh học; thiếu ánh sáng sáng → lệch giấc ngủ, buồn ngủ ban ngày, ảnh hưởng tâm trạng | 31 | <https://doi.org/10.1007/s11818-019-00215-x> · PMID 31534436 |

| Global BMI Mortality Collaboration (2016), Lancet 388:776 | **239 nghiên cứu**, dữ liệu từng người, 4 châu lục: tử vong thấp nhất **BMI 20,0–25,0**; 18,5–20 = 1,13; 25–27,5 = 1,07; 27,5–30 = 1,20; béo phì 1/2/3 = 1,45 / 1,94 / 2,76; mỗi **5 kg/m²** trên 25 = **1,39** Âu, 1,29 Bắc Mỹ, **1,39 Đông Á**; mạnh hơn ở người trẻ (1,52) và nam (1,51) | 32 | <https://doi.org/10.1016/S0140-6736(16)30175-1> · PMID 27423262 |
| WHO Expert Consultation (2004), Lancet 363:157 | Người châu Á: dùng **BMI 23** làm mốc thừa cân để hành động, 27,5 là béo phì; giữ 25 làm ngưỡng chẩn đoán quốc tế | 32 | <https://doi.org/10.1016/S0140-6736(03)15268-3> |

| Lv J và cs. (2015), BMJ 351:h3942 | **3.500.004 người-năm**, trung vị **7,2 năm**, 20.224 tử vong: ăn cay **1–2 ngày/tuần 0,90 (0,84–0,96)**; **3–5 ngày 0,86 (0,80–0,92)**; **6–7 ngày 0,86 (0,82–0,90)**. Tỷ lệ tử vong thô: 6,1 / 4,4 / 4,3 / 5,8 trên 1.000 người-năm — **nhóm 6–7 ngày cao hơn nhóm 3–5 ngày** | 33 | <https://doi.org/10.1136/bmj.h3942> · PMID 26242395 |

| Willett WC, Ludwig DS (2020), NEJM 382:644 | Tổng quan: **không có bằng chứng vững** rằng uống nhiều sữa giảm gãy xương; khuyến cáo **3 ly/ngày không dựa trên bằng chứng đủ mạnh**; **1–2 phần/ngày** có thể giảm ung thư đại trực tràng nhưng nhiều hơn gắn với ung thư **tuyến tiền liệt** (nam) và có thể **buồng trứng** (nữ); thử nghiệm bổ sung canxi từ sữa **không** giảm gãy xương | 34 | <https://doi.org/10.1056/NEJMra1903547> · PMID 32053300 |

| Drouin-Chartier JP và cs. (2020), BMJ 368:m513 | 3 đoàn hệ Mỹ, **>5,54 triệu người-năm**, 14.806 biến cố: ≥**1 trứng/ngày vs <1/tháng HR 0,93 (0,82–1,05)**; meta **33 ước tính / 1.720.108 người**: mỗi 1 trứng/ngày **0,98 (0,93–1,03)**; mạch vành 0,96; đột quỵ 0,99 | 35 | <https://doi.org/10.1136/bmj.m513> · PMID 32132002 |
| Zhong VW và cs. (2019), JAMA 321:1081 | **29.615 người**, trung vị **17,5 năm**: mỗi **nửa quả trứng/ngày** → tim mạch **1,06 (1,03–1,10)**; mỗi **300 mg cholesterol**/ngày → **1,17 (1,09–1,26)**, tử vong **1,18** | 35 | <https://doi.org/10.1001/jama.2019.1572> · PMID 30874756 |

| Ukai T và cs. (2020), Heart 106:732 | **538.373 người-năm**, 2.097 ca CVD: tắm bồn gần như hằng ngày vs 0–2 lần/tuần — CVD **0,72 (0,62–0,84)**; mạch vành 0,65; đột quỵ 0,74; xuất huyết não **0,54 (0,40–0,73)**; **không** liên quan tới đột tử do tim và xuất huyết dưới nhện | 36 | <https://doi.org/10.1136/heartjnl-2019-315752> · PMID 32209614 |

| Yamada T và cs. (2015), Sleep 38:1945 | **11 đoàn hệ**, **151.588 người**, 1.625.012 người-năm, 11 năm: ngủ trưa **≥60 phút** — CVD **1,82 (1,22–2,71)**, tử vong **1,27 (1,11–1,45)**; **<60 phút không liên quan** (P=0,98 / 0,08); quan hệ **chữ J**, đáy ở **30 phút** | 37 | <https://doi.org/10.5665/sleep.5246> · PMID 26158892 |

| Depner CM và cs. (2019), Curr Biol 29:957 | **Thử nghiệm ngẫu nhiên** 3 nhóm (9h / 5h / 5h + ngủ bù cuối tuần): nhóm ngủ bù **ngủ thêm ~1,1 giờ** cộng dồn nhưng khi trở lại thiếu ngủ thì **pha sinh học trễ**, cân tăng; nhạy insulin giảm **~13%** (thiếu liên tục) và **9–27%** (có ngủ bù) — ngủ bù cuối tuần **không bảo vệ** | 38 | <https://doi.org/10.1016/j.cub.2019.01.069> · PMID 30827911 |

| IARC Vol. 124 (2019), Lancet Oncol 20:1058 | **Làm ca đêm = nhóm 2A** (có thể gây ung thư); bằng chứng ở người **giới hạn** cho **ung thư vú**; cơ chế: rối loạn nhịp sinh học do ánh sáng ban đêm | 39 | <https://doi.org/10.1016/S1470-2045(19)30455-3> · PMID 31281097 |
| Gao Y và cs. (2020), Chronobiol Int 37:29 | 12 đoàn hệ + 9 cắt ngang: làm ca → **ĐTĐ2 RR 1,10 (1,05–1,14)**; **nữ** tăng, nam không rõ; **nhân viên y tế** nguy cơ cao nhất; ca đêm và ca luân phiên đều tăng | 39 | <https://doi.org/10.1080/07420528.2019.1683570> · PMID 31684766 |

| IARC Vol. 100F (2012) | **Aflatoxin = nhóm 1** (gây ung thư gan); **bền với nhiệt**, không mất khi chiên/nấu | 40 | IARC Monographs Vol. 100F |
| QCVN 8-1:2011/BYT | Lạc và hạt có dầu **dùng làm thực phẩm**: phải sơ chế → **B1 8 µg/kg, tổng 15 µg/kg**; dùng trực tiếp → **B1 2 µg/kg, tổng 4 µg/kg**. **Mục 1.1 loại trừ rõ lạc dùng để sản xuất dầu thực vật** → dầu ép thủ công không thuộc phạm vi giới hạn này | 40 | <https://attp.quangngai.gov.vn/items/doc/2011/23729.pdf> |

| Hooper L và cs. (2020), Cochrane CD011737 | **15 RCT, 56.675 người**: giảm chất béo bão hoà → biến cố tim mạch **0,83 (0,70–0,98)** = giảm 17%, GRADE trung bình; **NNTB 56** trong ~4 năm; tử vong mọi nguyên nhân **0,96 (0,90–1,03)** và tử vong tim mạch **0,95 (0,80–1,12)** — **không giảm**; thay bằng PUFA hay carb không khác nhau | 41 | <https://doi.org/10.1002/14651858.CD011737.pub3> · PMID 32827219 |

| Hong Y và cs. (2025), Am J Transl Res 17:5779 | 22 nghiên cứu, người **không hút thuốc**: **khói nấu ăn OR 3,68 (2,67–5,07)**; chiên ngập 1,60 (0,72–3,52) NS; xào 1,12 (1,07–1,17); **nhiên liệu rắn 5,54 (3,15–9,72)**; ETS 1,96; radon 1,82 | 42 | <https://pubmed.ncbi.nlm.nih.gov/40950280/> · PMC12432737 |

| Marjoribanks J và cs. (2017), Cochrane CD004143 | **22 nghiên cứu, 43.637 phụ nữ**; hormone kết hợp: mạch vành **2 → 3–7/1000** (1 năm), huyết khối **2 → 4–11**, đột quỵ **6 → 6–12** (3 năm), **ung thư vú 19 → 20–30** (5,6 năm); chỉ estrogen: **ung thư vú giảm 25 → 15–25**, gãy xương **141 → 92–113**, không tăng mạch vành; >65 tuổi: sa sút trí tuệ 9 → 11–30. **Không có nghiên cứu nào trên phụ nữ quanh mãn kinh**; tuổi trung bình >60 | 43 | <https://doi.org/10.1002/14651858.CD004143.pub5> · PMID 28093732 |

| Kramer CK và cs. (2019), Circ Cardiovasc Qual Outcomes 12:e005554 | **10 nghiên cứu, 3.837.005 người**, 530.515 sự kiện, 10,1 năm: nuôi chó → tử vong **0,76 (0,67–0,86)**; tim mạch giảm 31%; người đã có biến cố mạch vành **0,35 (0,17–0,69)**; **không hiệu chỉnh đủ confounders** (chính tác giả ghi) | 44 | <https://doi.org/10.1161/CIRCOUTCOMES.119.005554> · PMID 31592726 |

| Knowler WC và cs. (2002), NEJM 346:393 | Thử nghiệm **DPP**, 2,8 năm: ĐTĐ **11,0 / 7,8 / 4,8** ca trên 100 người-năm (giả đối / metformin / lối sống); lối sống **−58% (48–66)**, metformin **−31% (17–43)**; **NNT 6,9** người/3 năm; chương trình = giảm **7%** cân + **150 phút**/tuần | 45 | <https://doi.org/10.1056/NEJMoa012512> · PMID 11832527 |
| Gong Q và cs. (2019), Lancet Diabetes Endocrinol 7:452 | Da Qing **30 năm** (577 người): chậm khởi phát ĐTĐ **3,96 năm**; CVD **0,74 (0,59–0,92)**; vi mạch **0,65 (0,45–0,95)**; tử vong CVD **0,67 (0,48–0,94)**; tử vong chung **0,74 (0,61–0,89)**; **+1,44 năm** tuổi thọ | 45 | <https://doi.org/10.1016/S2213-8587(19)30093-2> · PMID 31036503 |

| QCVN 8-1:2011/BYT, mục 6 | **Fumonisin tổng số**: ngô chưa chế biến **4.000 µg/kg**; ngô/thực phẩm từ ngô **1.000**; bánh snack từ ngô **800**; thực phẩm từ ngô cho trẻ <36 tháng **200** | 46 | <https://attp.quangngai.gov.vn/items/doc/2011/23729.pdf> |
| IARC Vol. 100F (2012) | Aflatoxin **nhóm 1**; fumonisin và ochratoxin A **nhóm 2B**; cả ba **bền với nhiệt** | 46 | IARC Monographs Vol. 100F |

| IARC Vol. 100B (2012) | **Nhiễm sán lá gan nhỏ mạn tính** (Opisthorchis viverrini và Clonorchis sinensis) = **nhóm 1**, bằng chứng đủ mạnh cho **ung thư đường mật** | 47 | <https://www.ncbi.nlm.nih.gov/books/NBK304354/> |
| Viện Sốt rét – KST – CT TW (nimpe.vn) | Tỷ lệ nhiễm sán lá gan nhỏ tại **Bình Định 6,8%** (điều tra 5 năm). *Đọc qua trích đoạn web_search: file PDF trên nimpe.vn timeout khi tải full text* | 47 | <http://nimpe.vn/userfiles/file/2024/TTLA%20TV.pdf> |

## Nguồn Việt Nam cho từng mục

- **Mục 1** (cai thuốc lá): GATS 2020 (42,3% nam / 1,7% nữ); WHO >100.000 ca/năm; ITC 12.120 đồng/bao (2020) → 360.000 đồng/tháng cho người ngày một bao.
- **Mục 2** (không hút trong nhà, trên xe): Luật 09/2012/QH13 Điều 11; Öberg 2011.
- **Mục 3** (dùng thuốc cai): Cahill 2016; Champix VN-21937-19.
- **Mục 4** (đặt ngày cai, bỏ hẳn): Lindson-Hawley 2016.
- **Mục 47** (gỏi cá): IARC Vol. 100B + số VN của Viện Sốt rét–KST–CT TW (**đọc qua trích đoạn**, PDF gốc timeout — đã ghi trung thực). Bốn hiểu lầm được đính chính: rượu/gừng/ớt không diệt sán; cá ao nhà nguy hiểm hơn; không triệu chứng ≠ không nhiễm.
- **Mục 46** (mốc): dùng lại QCVN 8-1:2011/BYT đã mở ở lượt 40 (mục 1 aflatoxin + mục 6 fumonisin) — không phải mở lại nguồn. Việt hoá: bánh mì/mứt, lạc hạt đắng, bắp mốc vàng, và cảnh báo "luộc lại cho chín" là sai.
- **Mục 45** (tiền đái tháo đường): DPP 2002 + Da Qing 30 năm. Ngưỡng chẩn đoán trình bày theo **ADA** và **ghi rõ phải hỏi bác sĩ vì ngưỡng áp dụng ở VN có thể khác** — chưa mở lại QĐ 5481/QĐ-BYT 2020 trong lượt này để đối chiếu từng con số.
- **Mục 44** (dắt chó): Kramer 2019 + quy định VN. Mức phạt **1–2 triệu đồng** khi không tiêm phòng dại: đọc qua trang `.medinet.gov.vn` (Sở Y tế TP.HCM), **chưa mở được số hiệu nghị định xử phạt gốc** → đã ghi vào "Còn treo". Phác đồ khi bị chó cắn: rửa 15 phút + đến cơ sở y tế ngay.
- **Mục 43** (hormone mãn kinh): Marjoribanks 2017. Dùng **nguy cơ tuyệt đối trên 1.000** thay vì % tương đối; nhấn "không nghiên cứu nào trên phụ nữ quanh mãn kinh, tuổi TB >60"; xử lý nỗi sợ HRT quá mức ở VN sau WHI 2002.
- **Mục 42** (máy hút mùi): Hong 2025 — **mức C**, đã ghi rõ tạp chí không mạnh. Nội dung chính là kỹ thuật: **ống xả ra ngoài** (nhiều bếp VN xả vào tủ bếp), bật trước 1–2 phút, tắt sau 10 phút, vệ sinh lưới lọc, than hoạt tính không xử lý CO.
- **Mục 41** (dầu thực vật vs mỡ heo): Hooper 2020. Ghi **cả** con số trung thực (biến cố −17% nhưng **tử vong không giảm**) và xử lý hai luận điệu phổ biến ở VN ("mỡ heo tốt hơn", "dầu thực vật là hoá chất").
- **Mục 40** (dầu lạc ép thủ công): **viết lại hoàn toàn** (bản gốc dùng mã "SC" của Trung Quốc — không tồn tại ở VN). Đọc được bản QCVN 8-1:2011/BYT trên cổng .gov.vn và phát hiện chi tiết quan trọng: **mục 1.1 loại trừ lạc dùng sản xuất dầu**, nên dầu ép thủ công nằm ngoài ngưỡng kiểm soát.
- **Mục 39** (ca đêm): IARC Vol. 124 + Gao 2020. **Cảnh báo cách đọc "nhóm 2A"** = "có thể", bằng chứng ở người mới đạt mức giới hạn; nêu nhóm nghề VN (khu công nghiệp, y tế, bảo vệ, tài xế) và khuyên quay ca xuôi.
- **Mục 38** (ngủ bù): Depner 2019 — **RCT** nên để **A**. Nói rõ phạm vi: chứng minh "dồn cuối tuần không đủ", không phải "ngủ bù vô ích".
- **Mục 37** (ngủ trưa): Yamada 2015. Nhấn **chữ J, đáy 30 phút** (không phải "ngủ trưa có hại"); ngủ trưa dài là **dấu hiệu bệnh**; sửa văn hoá ngủ trưa 1–2 tiếng ở VN bằng báo thức 20–25 phút.
- **Mục 36** (tắm bồn): Ukai 2020. Mức **C** vì một đoàn hệ; phần lớn nội dung là **cảnh báo an toàn** (ngất do hạ huyết áp, không rượu, 40–42°C, ≤15–20 phút, người già để cửa không khoá). Ghi rõ nghiên cứu **không** thấy giảm đột tử do tim.
- **Mục 35** (trứng): ghi **cả hai** nghiên cứu mâu thuẫn (Drouin-Chartier 0,98 vs Zhong 1,06/nửa quả) và giải thích vì sao khác (hiệu chỉnh chế độ ăn; trứng đi kèm thịt xông khói ở phương Tây). Lưu ý pate/xúc xích trong bánh mì là mục 18.
- **Mục 34** (sữa): Willett & Ludwig 2020 (bài tổng quan NEJM, **không có số trong abstract** — nên "Lợi ích" viết theo kết luận định tính, không bịa con số). Việt hoá: bất dung nạp lactose ở người Đông Á, sữa đặc có đường ≠ sữa, sữa hạt phải bổ sung canxi, trẻ dưới 1 tuổi.
- **Mục 33** (ăn cay): Lv 2015. **Hạ mức bằng chứng xuống C** (một đoàn hệ duy nhất, nhiễu nặng) và **ghi cả tỷ lệ tử vong thô** cho thấy nhóm 6–7 ngày cao hơn nhóm 3–5 ngày — để chặn cách đọc "ăn càng cay càng thọ". Có ghi rõ ớt không gây loét dạ dày (chuyện hoang đường).
- **Mục 32** (BMI): Global BMI 2016 + WHO 2004. **Điểm sửa so với bản gốc**: bản gốc chỉ nói 20–25; bản Việt thêm ngưỡng châu Á **23** (WHO 2004) và vòng eo nam >90 cm / nữ >80 cm. Đã kiểm lại 4 ví dụ BMI bằng script.
- **Mục 31** (nắng): tách 2 chuyện — ánh sáng cho nhịp sinh học (có ích) vs viên vitamin D (VITAL: không giảm ung thư/tim mạch). **Viết khác bản gốc**: VN thừa nắng, vấn đề là phòng UV chứ không phải thiếu nắng.
- **Mục 30** (đồ uống nóng): IARC 2016 + Islami 2009. Dùng **thời gian chờ sau khi rót** (4 phút) làm mốc thực dụng thay vì nhiệt kế; nói rõ rượu và thuốc lá là nguyên nhân lớn hơn ở VN.
- **Mục 29** (than, củi): WHO 2024 (dữ liệu 2021, thay con số 3,2 triệu cũ) + IARC Vol. 95. Việt hoá 3 tình huống: bếp than tổ ong trong nhà, bếp củi vùng cao (cần ống khói), than hoa trong quán kín. **Không** nêu quy định cấm bếp than của địa phương vì chưa mở được văn bản gốc.
- **Mục 28** (siêu chế biến): Lane 2024. Ghi rõ GRADE thấp/rất thấp — kết luận "nên bớt" không phải "chắc chắn gây bệnh". Danh sách ví dụ VN (mì gói, 3 trong 1, nước tăng lực) + cảnh báo "healthy halo".
- **Mục 27** (rau quả): Aune 2017. Dùng đúng số per 200 g, **không** dùng câu "5 phần giảm 25%" (con số đó thuộc Wang 2021, khác thiết kế). Nêu 1 phần = 80 g và quy ra bát canh/đĩa rau Việt Nam.
- **Mục 26** (cà phê): Poole 2017. Tách rõ "cà phê sữa đá / 3 trong 1 không tính" vì đường; ngưỡng 200 mg caffeine khi mang thai.
- **Mục 25** (trà): Inoue-Choi 2022. Ghi rõ nghiên cứu trên trà đen, trà xanh chưa có nghiên cứu riêng đủ lớn trên người Việt; cảnh báo trà sữa/trà đóng chai, trà >65°C (dẫn mục 30), tanin và sắt.
- **Mục 24** (ngũ cốc nguyên hạt): Aune 2016. Cảnh báo "ngũ cốc ăn sáng có đường" và "bún/phở/mì không phải ngũ cốc nguyên hạt"; cách trộn 1/3 gạo lứt cho người mới.
- **Mục 23** (đổi thịt đỏ): Pan 2012. Nhấn chữ "thay thế" (không phải ăn thêm); cảnh báo cá khô/cá chiên không tính; giữ lại khuyến cáo ăn thịt đỏ dưới 350–500 g/tuần.
- **Mục 22** (hạt): Aune 2016. Nhấn "một nắm ≠ một bịch" và cảnh báo aflatoxin trên hạt điều/đậu phộng mốc.
- **Mục 21** (đếm đơn vị cồn): bảng quy đổi tự tính bằng công thức ml × nồng độ × 0,789 (đã kiểm lại bằng script); định nghĩa "mức nguy hại" của STEPS 2021 lấy nguyên văn. Không nêu ngưỡng tuần "an toàn" vì WHO không có ngưỡng đó.
- **Mục 20** (cai rượu): Kaye 2024 + Schuckit 2014. **Mục nguy hiểm nhất chương** — có cảnh báo cai lạnh tại nhà, thuốc nam, tự mua benzodiazepine. Số 20%/1% lấy từ Kaye 2024 (open access, đọc toàn văn qua PMC).
- **Mục 19** (rượu bia): GBD 2018 + STEPS 2021. Giải thích thiên lệch "người bỏ rượu" (abstainer bias) — lý do vì sao các nghiên cứu cũ thấy "một ly vang có lợi". Gắn luật VN: Luật 36/2024/QH15 (nồng độ cồn 0) và Luật 44/2019/QH15.
- **Mục 18** (thịt chế biến): IARC 2015. Đã giải thích rõ **nhóm 1 = độ chắc chắn bằng chứng, không phải độ nguy hiểm** — đây là chỗ báo chí VN hay giật tít sai. Nêu tên sản phẩm VN (giò chả, lạp xưởng, khô bò).
- **Mục 17** (ngồi lâu): Ekelund 2016. Viết ngược với cách hiểu phổ biến "ngồi nhiều là chết" — thực ra vận động tổng cộng mới là biến quyết định.
- **Mục 16** (tập sức mạnh): Momma 2022. Nhấn mốc 30–60 phút/tuần và cảnh báo nhịn thở khi gắng sức; thêm 4 động tác không cần dụng cụ.
- **Mục 15** (vận động mạnh vụn): Stamatakis 2022 (VILPA). Có cảnh báo không thay thế đi bộ/thể thao và dấu hiệu phải dừng.
- **Mục 14** (môn dùng vợt): Oja 2017 + Han 2026 + Schnohr 2018. Đã ghi rõ "9,7 năm" là tương quan, nhóm tennis nhỏ và thiên lệch chọn lọc — bản gốc hay bê con số này như nhân quả.
- **Mục 13** (giấc ngủ): Cappuccio 2010 + AASM/SRS 2015. Ghi rõ ngủ dài là **dấu hiệu bệnh** chứ không phải nguyên nhân — bản gốc hay viết tắt chỗ này.
- **Mục 12** (uống thuốc đều): Chowdhury 2013 + STEPS 2021. Ghi chú viết theo 4 lý do bỏ thuốc thực tế ở VN (tái khám BHYT, sợ nhờn thuốc, tác dụng phụ amlodipine/ACEi).
- **Mục 11** (đi bộ): Paluch 2022; số gần 30% thiếu vận động từ Cục Y tế dự phòng. Đã bỏ mốc "10.000 bước" như một ngưỡng y học và giải thích nguồn gốc marketing của nó.
- **Mục 10** (răng miệng): Cochrane Walsh 2019 (kem fluor) + Worthington 2019 (chỉ nha khoa). Mức bằng chứng hai phần khác nhau — sách để mức B chung và giải thích rõ trong Ghi chú.
- **Mục 9** (muối giảm natri): SSaSS 2021 + WHO 2025; số 9,4 g/ngày từ Cục Y tế dự phòng. Có thêm cảnh báo bệnh thận/thuốc giữ kali mà bản gốc không nêu.
- **Mục 8** (trầu cau): IARC Vol 85 (2003–2004) + Reichart & Nguyễn 2008 (dữ liệu VN). Đã viết lại vì bản gốc nói về "槟榔" Trung Quốc, còn trầu VN phần lớn không có thuốc lá — kết luận giữ nguyên nhờ phân loại IARC.
- **Mục 7** (nước ngọt): Imamura 2015 + WHO 2023 về chất làm ngọt; số 46,5 g đường/ngày từ Sở Y tế Nghệ An.
- **Mục 6** (thuốc lá điện tử): Nghị quyết 173/2024/QH15 cấm từ 2025 + Cochrane CD010216 (bản 8/2026). Bản gốc tiếng Trung khuyên cân nhắc thuốc lá điện tử — **đã lật ngược kết luận** cho Việt Nam.
- **Mục 5** (tổng đài, phòng tư vấn): tổng đài **1800 6606** của Trung tâm Hô hấp — Bệnh viện Bạch Mai, miễn phí, **8:00–22:00 hằng ngày kể cả thứ Bảy, Chủ nhật (trừ lễ, Tết)**, **36.657 cuộc gọi 2019–2021**, mức **15%** cai được khi chỉ tư vấn (BS Hoàng Anh Đức) — nguồn Bộ KH&CN: <https://mst.gov.vn/hieu-dung-de-dieu-tri-cai-thuoc-la-thanh-cong-197157065.htm> và <https://bachmai.gov.vn/bai-viet/xay-dung-moi-truong-khong-khoi-thuoc?id=a6ec93a8-2897-5813-0e5c>.

**Lưu ý đã xử lý:** tổng quan Cochrane CD008033 ("Reduction versus abrupt cessation") **đã bị rút năm 2019** — PubMed ghi rõ "RETRACTED ARTICLE / WITHDRAWN". Sách dùng thử nghiệm Annals 2016 thay thế và ghi chú việc rút bản Cochrane. Đừng dẫn CD008033 ở bất kỳ bản nào.

## Mục lục nhóm ở đầu chương

Đã dịch lại toàn bộ 47 mục theo 7 nhóm như bản gốc (thuốc lá–rượu–trầu cau; nên ăn ít hoặc bỏ; đổi món, ăn thêm; vận động và cân nặng; giấc ngủ và ca đêm; dầu ăn và khói bếp; răng, thuốc và thói quen khác). **Số mục giữ nguyên theo bản gốc** để không phải đánh lại khi viết tiếp.

Vì danh sách này trỏ tới những mục chưa viết, `check-refs --check` xếp chúng vào nhóm "cần xem tay" (không phải lỗi) — đúng như thiết kế của công cụ cho phần đầu chương.

Ba mục chắc chắn phải viết khác bản gốc, đã ghi ngay dưới mục lục ở đầu chương:

| Mục | Vì sao khác |
|---|---|
| 5 | ~~Bản gốc chỉ sang phòng tư vấn cai thuốc và số **12320** của Trung Quốc~~ — **đã viết xong**: Việt Nam dùng tổng đài **1800 6606** của Trung tâm Hô hấp BV Bạch Mai (đã xác minh còn hoạt động) |
| 6 | ~~Bản gốc nói "cai không được thì cân nhắc thuốc lá điện tử"~~ — **đã viết xong**, kết luận lật ngược: Việt Nam cấm từ năm 2025 theo Nghị quyết 173/2024/QH15 |
| 40 | ~~Bản gốc dựa vào mã "SC" (giấy phép sản xuất thực phẩm của Trung Quốc)~~ — **đã viết lại xong**: dựa vào **QCVN 8-1:2011/BYT** và việc quy chuẩn loại trừ lạc dùng để ép dầu |

## Quy ước giá

Tiền trong chương này phải là giá **tra tại thời điểm gần nhất**, ghi kèm tháng/năm. Giá cũ chỉ giữ khi nêu rõ là số của năm nào và để so sánh.

Đã áp dụng:
- Mục 1: đổi giá 2020 (12.120 đồng/bao, điều tra ITC) thành **6.000–20.000 đồng/bao** theo khảo sát mới của cơ quan phòng, chống tác hại thuốc lá; giữ số ITC làm mốc lịch sử.
- Mục 3: **không nêu giá** vì giá thuốc kê đơn không niêm yết công khai — thử trang nhà thuốc online thì không hiện giá (ghi "liên hệ"), chỉ có shop ghi giá cũ. Sách ghi "hỏi giá trước".

## Còn treo

**Cập nhật 2/11/2026** — sau một đợt đối chiếu độc lập, 7/13 việc dưới đây đã đóng, 4 việc còn mở, 2 việc chuyển sang chương khác. Những gì đã đóng thì đã vào sách; những gì còn mở thì **sách vẫn không khẳng định**.

### Đã đóng trong đợt đối chiếu 2/11/2026
- ~~**Nghị định 90/2026/NĐ-CP** chưa mở được bản gốc~~ → **đã mở và tự đọc**: bản ký 156 trang không có lớp text, render ảnh trang 32 ở 160 dpi rồi đọc. **Điều 24 khoản 1**: "Phạt tiền từ 200.000 đồng đến 500.000 đồng đối với hành vi hút thuốc lá tại địa điểm có quy định cấm." → đã đưa vào **mục 2**.
- ~~**Champix có thuộc nhóm phải kê đơn?**~~ → **có cơ sở pháp lý**: Thông tư 07/2017/TT-BYT **Điều 4 khoản 1** — "Các thuốc không thuộc Danh mục thuốc không kê đơn được phân loại là thuốc kê đơn"; varenicline không có trong danh mục đó.
- ~~**Thuế tiêu thụ đặc biệt thuốc lá** (nguồn thứ cấp mâu thuẫn)~~ → **Luật 66/2025/QH15**, đọc trực tiếp ảnh scan trang 7: 75% + thuế tuyệt đối **2.000đ/bao từ 1/1/2027, tăng 2.000đ mỗi năm, tới 10.000đ/bao từ 1/1/2031**. → đã đưa số vào **mục 1**.
- ~~**Thuế tiêu thụ đặc biệt nước giải khát có đường**~~ → Biểu thuế mục 12, trang 11: **nước giải khát theo TCVN có hàm lượng đường trên 5 g/100 ml — 8% từ 1/1/2027, 10% từ 1/1/2028**. → đã đưa số vào **mục 7**.
- ~~**Số hiệu nghị định xử phạt không tiêm phòng dại**~~ → **Nghị định 204/2026/NĐ-CP** (11/6/2026, hiệu lực 1/8/2026), đã xác minh số hiệu/ngày/lĩnh vực trên vanban.chinhphu.vn. **Số điều khoản vẫn chưa tự mở bản ký**, nên sách chỉ dẫn số hiệu, không dẫn điều.
- ~~**Ngưỡng chẩn đoán tiền đái tháo đường của Việt Nam**~~ → **QĐ 5481/QĐ-BYT ngày 30/12/2020 dùng đúng ngưỡng của ADA**: IFG 5,6–6,9 mmol/L; IGT 7,8–11 mmol/L; HbA1c 5,7–6,4%; ĐTĐ là 7,0 / 11,1 / 6,5%. Đã tự đọc PDF. → **mục 45** nay dẫn thẳng QĐ 5481 thay cho câu "hỏi bác sĩ vì có thể khác". Chương 1 không phải sửa: đã ghi đúng ngày 30/12/2020 từ trước.
- ~~**Mức phạt hút thuốc nơi công cộng**~~ → gộp vào NĐ 90/2026 ở trên (trùng một việc).

### Còn mở
1. **Tỷ lệ phơi nhiễm khói thuốc thụ động tại Việt Nam** — đợt đối chiếu nêu **56% tại nhà và 30,9% tại nơi làm việc** (PGATS 2020, báo cáo quốc gia gửi WHO FCTC) nhưng **không kèm link mở được để tôi tự kiểm**; nguồn khác lại ghi **PGATS 2022–2023: 44,4%** phơi nhiễm tại nhà. Hai số lệch nhau và khác kỳ khảo sát → **vẫn không đưa vào sách**. Muốn dùng thì phải mở được báo cáo PGATS gốc và ghi rõ kỳ nào.
2. **Cytisine đã đăng ký ở Việt Nam chưa** — CSDL của Cục Quản lý Dược (DAV) mở được giao diện nhưng **không truy vấn động được theo trường "Hoạt chất"**. Kết luận trong sách vẫn là "chưa thấy", tức **không tìm thấy, không phải bằng chứng phủ định**.
3. **Giá thuốc cai tại Việt Nam** — không có bảng giá bán lẻ công khai nào xác minh được cho 11/2026. Sách ghi "hỏi giá trước", **không nêu số**. Muốn có số phải gọi trực tiếp nhà thuốc và ghi ngày lấy giá.
4. **Quy định cấm bếp than tổ ong của địa phương** — chỉ có đầu mối **Chỉ thị 15/CT-UBND ngày 30/10/2019 của Hà Nội**, chưa mở được bản ký nên không biết điều khoản và chế tài; **TP.HCM chưa xác định được văn bản nào**. Sách **không nêu quy định địa phương** (mục 29).
5. **Tỷ lệ nhiễm sán lá gan nhỏ 6,8% tại Bình Định** (mục 47) — PDF trên `nimpe.vn` timeout cả HTTP và HTTPS khi tải trực tiếp. Số trong sách đang dựa trên **trích đoạn kết quả tìm kiếm**; cần mở lại bản gốc để chắc đó là tỷ lệ **người**, đối tượng nào, năm nào.

### Đã chuyển sang sổ chương khác
- ~~Số tử vong giao thông đường bộ theo WHO~~ → **chuyển sang `chuong-01.md`**: WHO profile Việt Nam ghi **17.229 ca (KTC 95%: 15.364–19.093), tỷ suất 17,7/100.000 dân, dữ liệu 2021**, trong khi Việt Nam báo cáo **5.699 ca** cùng năm.
