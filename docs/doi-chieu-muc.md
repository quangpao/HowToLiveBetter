# Bảng đối chiếu tham chiếu

File này do `node tools/check-refs.mjs` sinh ra, đừng sửa tay.

Tham chiếu trong sách chỉ ghi số mục, không ghi nội dung; chèn hay xóa một mục thì số của
mọi mục sau đổi hết, mà số mới thường vẫn nằm trong khoảng hợp lệ nên chỉ kiểm "vượt quá số mục"
không bắt được. Vì vậy mỗi tham chiếu được mở ra thành **tiêu đề mà nó thực sự trỏ tới** và ghi vào
đây: sửa xong chạy lại, chỗ nào số mục không đổi mà tiêu đề đổi thì `git diff` chỉ ra ngay.

Phạm vi: phần thân từng mục và đoạn mở đầu mỗi chương trong `book/`, cộng các bài dài trong `docs/`.
Trong bài dài không có "chương này" nên "mục N" trần được coi là điều khoản pháp luật và bỏ qua —
muốn trỏ trong bài dài thì phải ghi đủ "chương X mục Y".
Cột "Từ" ghi `mục N` cho thân mục, `đầu chương` cho đoạn mở chương, tên tiêu đề con cho bài dài.

Lớp bảo hiểm thứ hai là **từ neo**: quanh mỗi tham chiếu phải có một từ trùng với tiêu đề đích
("xem mục 12 (bảo hiểm y tế)" hoặc "… bảo hiểm y tế, xem mục 12"). `node tools/check-refs.mjs --check`
coi tham chiếu không có từ neo là lỗi: loại đó bị lệch thì `git diff` của bảng cũng không thấy gì.
Tham chiếu dạng khoảng ("xem mục 11 đến 14") là ngoại lệ: nó trỏ cả một khối, không gắn neo cho từng mục.

Cách tính từ neo: hai từ liền nhau trùng tiêu đề đích, hoặc một từ dài (tên riêng, con số, viết tắt
như 12356, AED, BMI, LPR) xuất hiện trong tiêu đề. Chỉ trùng một từ chung chung ("người", "tiền")
thì không tính.

Tổng 710 chỗ tham chiếu.

## 01-dung-chet-som

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Thắt dây an toàn, cả ghế trước lẫn ghế sau | … thắt dây an toàn (… |
| đầu chương | mục 2 | Đội mũ bảo hiểm khi đi mô tô, xe gắn máy, xe đạp điện và cài quai đúng quy cách | … toàn (mục 1), đội mũ bảo hiểm và cài quai (… |
| đầu chương | mục 9 | Không chạy quá tốc độ, không uống rượu bia rồi lái, không cầm điện thoại, buồn ngủ thì dừng nghỉ | … quá tốc độ và không uống rượu bia rồi lái (… |
| đầu chương | mục 3 | Lắp đầu báo khói; nhà nào đốt than, củi hay chạy máy phát điện trong nhà thì lắp thêm đầu báo khí CO | … lắp đầu báo khói và đầu báo khí CO (… |
| đầu chương | mục 4 | Thay dây dẫn gas trước khi nó nứt, không tự tháo van hay tự sang gas, chỉ nhận bình còn niêm phong | …ây dẫn gas và chỉ nhận bình còn niêm phong (… |
| đầu chương | mục 6 | Đừng sạc xe điện trong nhà, đừng dắt xe vào thang máy hay để ở cầu thang | …ạc xe điện trong nhà hay để xe ở cầu thang (… |
| đầu chương | mục 10 | Trẻ dưới 10 tuổi và cao dưới 1,35 m ngồi ô tô phải có thiết bị an toàn, đừng bế trên tay | … dùng ghế an toàn cho trẻ trên ô tô (… |
| đầu chương | mục 11 | Nhà có trẻ nhỏ thì chắn cửa sổ và ban công lại, lưới chống muỗi không tính là chắn | …chắn cửa sổ và ban công khi nhà có trẻ nhỏ (… |
| đầu chương | mục 12 | Trẻ gần nước phải có người lớn trong tầm tay; đi thuyền, đi đò, tắm sông hồ thì mặc áo phao | …ẻ gần nước phải có người lớn trong tầm tay (… |
| đầu chương | mục 13 | Từ 60 tuổi, tập thăng bằng và sức chân hằng tuần, sửa lại nhà tắm và cầu thang | …i tập thăng bằng và sửa nhà tắm, cầu thang (… |
| đầu chương | mục 5 | Đừng hái, đừng mua, đừng ăn nấm mọc hoang; mọi mẹo nhận biết nấm độc đều không đáng tin | … cầu thang (mục 13), đừng ăn nấm mọc hoang (… |
| đầu chương | mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử: gọi tổng đài, và đừng để thuốc ngủ hay thuốc trừ sâu trong nhà | …à cất thuốc trừ sâu, thuốc ngủ ra khỏi nhà (… |
| đầu chương | mục 7 | Đo huyết áp tại nhà; cao thì uống thuốc hạ xuống mức đích | … đo huyết áp tại nhà (… |
| đầu chương | mục 8 | Xét nghiệm đường huyết lúc đói: từ 45 tuổi, hoặc sớm hơn nếu thừa cân và có yếu tố nguy cơ; kết quả bình thường thì 1 đến 3 năm làm lại | …hà (mục 7), xét nghiệm đường huyết lúc đói (… |
| đầu chương | mục 23 | Xét nghiệm vi khuẩn Helicobacter pylori, dương tính thì diệt trừ | … pylori (… |
| đầu chương | mục 24 | Người hút thuốc nặng chụp CT phổi liều thấp mỗi năm | … chụp CT phổi liều thấp nếu hút thuốc nặng (… |
| đầu chương | mục 19 | Từ 45 đến 50 tuổi sàng lọc ung thư đại trực tràng: xét nghiệm máu ẩn trong phân hoặc nội soi | …tầm soát ung thư đại trực tràng từ 45 tuổi (… |
| đầu chương | mục 17 | Phụ nữ từ 40 tuổi chụp nhũ ảnh tầm soát ung thư vú, 2 năm một lần | …hụp nhũ ảnh tầm soát ung thư vú từ 40 tuổi (… |
| đầu chương | mục 18 | Phụ nữ từ 30 tuổi sàng lọc ung thư cổ tử cung, ưu tiên xét nghiệm HPV | …7), sàng lọc ung thư cổ tử cung từ 30 tuổi (… |
| đầu chương | mục 14 | Xét nghiệm viêm gan B một lần, rồi căn cứ vào kết quả mà tiêm hay không tiêm | … viêm gan B rồi tiêm nếu chưa có miễn dịch (… |
| đầu chương | mục 15 | Bị đinh, dằm hay mảnh kim loại đâm, hoặc vết thương dính đất: đi xử lý trong ngày và hỏi về uốn ván | …ục 14), tiêm uốn ván khi bị vết thương bẩn (… |
| đầu chương | mục 16 | Tiêm vắc xin HPV cho trẻ em gái, càng sớm càng tốt | …, tiêm HPV cho trẻ em gái từ 9 đến 14 tuổi (… |
| đầu chương | mục 20 | Người có bệnh tim mạch và người cao tuổi tiêm vắc xin cúm hằng năm | …năm nếu có bệnh tim mạch hoặc trên 65 tuổi (… |
| đầu chương | mục 21 | Từ 50 tuổi tiêm vắc xin zona thần kinh | …zona thần kinh từ 50 tuổi nếu có điều kiện (… |
| đầu chương | mục 22 | Từ 65 tuổi tiêm vắc xin phế cầu | …iều kiện (mục 21), tiêm phế cầu từ 65 tuổi (… |
| mục 28 | mục 7 | Đo huyết áp tại nhà; cao thì uống thuốc hạ xuống mức đích | … Việc cần làm giống hệt … |
| mục 28 | mục 8 | Xét nghiệm đường huyết lúc đói: từ 45 tuổi, hoặc sớm hơn nếu thừa cân và có yếu tố nguy cơ; kết quả bình thường thì 1 đến 3 năm làm lại | … Việc cần làm giống hệt mục 7 và … |
| mục 29 | mục 7 | Đo huyết áp tại nhà; cao thì uống thuốc hạ xuống mức đích | …rong khoảng 20 đến 25, kiểm soát huyết áp ở … |
| mục 32 | mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử: gọi tổng đài, và đừng để thuốc ngủ hay thuốc trừ sâu trong nhà | …1414 nếu cần nói chuyện (xem … |
| mục 34 | mục 32 | Ý nghĩ tự tử vừa xuất hiện thì nói ngay với một người bên cạnh, nhờ họ ở bên bạn trong lúc đó | … Nếu chuyện ngã này là do ý nghĩ tự tử, xem … |
| mục 34 | mục 33 | Đừng coi "cứu được là xong": sau ngộ độc thuốc trừ sâu hay khí CO, giữ được mạng chưa chắc giữ được phổi và não | …n ngã này là do ý nghĩ tự tử, xem mục 32 và … |
| mục 37 | mục 32 | Ý nghĩ tự tử vừa xuất hiện thì nói ngay với một người bên cạnh, nhờ họ ở bên bạn trong lúc đó | … Khi có ý nghĩ tự tử, xem … |
| mục 37 | mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử: gọi tổng đài, và đừng để thuốc ngủ hay thuốc trừ sâu trong nhà | … Khi có ý nghĩ tự tử, xem mục 32 và … |
| mục 38 | mục 30 | Dùng bao cao su suốt mỗi lần quan hệ, và không dùng chung bơm kim tiêm | …ó giai đoạn đã tạm dừng ở một số nơi** (xem … |
| mục 39 | mục 13 | Từ 60 tuổi, tập thăng bằng và sức chân hằng tuần, sửa lại nhà tắm và cầu thang | … còn giảm số lần ngã thì xem … |
| mục 40 | mục 39 | Phụ nữ từ 65 tuổi nên đo mật độ xương một lần; sau mãn kinh mà có yếu tố nguy cơ thì không cần đợi đến 65 | … Cách phát hiện loãng xương ở … |
| mục 43 | mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử: gọi tổng đài, và đừng để thuốc ngủ hay thuốc trừ sâu trong nhà | …uốc ngủ, thuốc trừ sâu ra khỏi tầm tay (xem … |
| mục 43 | mục 32 | Ý nghĩ tự tử vừa xuất hiện thì nói ngay với một người bên cạnh, nhờ họ ở bên bạn trong lúc đó | … ở gần một nửa số người chỉ khoảng 10 phút (… |
| mục 45 | mục 14 | Xét nghiệm viêm gan B một lần, rồi căn cứ vào kết quả mà tiêm hay không tiêm | …ét nghiệm viêm gan B là bộ chỉ số khác, xem … |
| mục 47 | mục 23 | Xét nghiệm vi khuẩn Helicobacter pylori, dương tính thì diệt trừ | … pylori và ngược lại — xem … |

## 02-dung-chet-dan

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Cai thuốc lá, càng sớm càng tốt | … cai thuốc càng sớm càng tốt (… |
| đầu chương | mục 2 | Không hút trong nhà và trên xe, cũng đừng để khách hút trong nhà | …ốt (mục 1), không hút trong nhà và trên xe (… |
| đầu chương | mục 3 | Cai thuốc đừng chỉ dựa vào ý chí: uống thuốc trước đã | …e (mục 2), cai thuốc thì dùng thuốc hỗ trợ (… |
| đầu chương | mục 4 | Đặt một ngày cai, đến ngày đó bỏ hẳn — đừng giảm dần trước | …ỗ trợ (mục 3), đặt một ngày cai rồi bỏ hẳn (… |
| đầu chương | mục 5 | Gọi tổng đài tư vấn cai thuốc, hoặc đi phòng tư vấn cai thuốc lá | …hẳn (mục 4), tìm phòng tư vấn cai thuốc lá (… |
| đầu chương | mục 6 | Thuốc lá điện tử: ở Việt Nam đã bị cấm, đừng coi là cách cai | …vấn cai thuốc lá (mục 5), thuốc lá điện tử (… |
| đầu chương | mục 8 | Không ăn trầu — kể cả trầu không có thuốc lá | …), thuốc lá điện tử (mục 6), không ăn trầu (… |
| đầu chương | mục 19 | Rượu bia: uống ít nhất có thể, và biết rằng mức an toàn là không uống | …trầu (mục 8), uống ít hoặc không uống rượu (… |
| đầu chương | mục 20 | Run tay, vã mồ hôi khi thiếu rượu thì đừng tự cai — đi cơ sở y tế | …hằng ngày mà bỏ là run tay thì đừng tự cai (… |
| đầu chương | mục 21 | Đếm xem một tuần bạn uống bao nhiêu đơn vị cồn — trước khi tự nói "tôi uống ít" | … (mục 20), đếm xem một tuần uống bao nhiêu (… |
| đầu chương | mục 7 | Không uống đồ uống có đường — đổi sang loại "không đường" cũng không phải là giải pháp | … đồ uống có đường (… |
| đầu chương | mục 18 | Bớt thịt chế biến — giò chả, lạp xưởng, xúc xích, khô bò | …ồ uống có đường (mục 7), thịt chế biến sẵn (… |
| đầu chương | mục 28 | Bớt thực phẩm siêu chế biến — mì gói, xúc xích, bánh ngọt công nghiệp, nước ngọt | …biến sẵn (mục 18), thực phẩm siêu chế biến (… |
| đầu chương | mục 30 | Đừng uống trà, nước dùng, cà phê khi còn quá nóng — chờ vài phút | … 28), không uống trà, súp, cà phê quá nóng (… |
| đầu chương | mục 46 | Thấy mốc là bỏ cả gói — cắt phần mốc đi không cứu được | …cà phê quá nóng (mục 30), mốc là bỏ cả gói (… |
| đầu chương | mục 47 | Không ăn gỏi cá nước ngọt — sán lá gan là tác nhân gây ung thư nhóm 1 | …cả gói (mục 46), không ăn gỏi cá nước ngọt (… |
| đầu chương | mục 9 | Đổi sang muối giảm natri — nhưng người bệnh thận phải hỏi bác sĩ trước | … đổi muối thường sang muối giảm natri (… |
| đầu chương | mục 22 | Mỗi ngày một nắm hạt nhỏ — hạt điều, đậu phộng, hạt hướng dương đều được | …i giảm natri (mục 9), mỗi ngày một nắm hạt (… |
| đầu chương | mục 23 | Đổi bớt thịt đỏ sang cá, gia cầm, đậu — thay thế chứ không phải ăn thêm | …, thay một phần thịt đỏ bằng cá và gia cầm (… |
| đầu chương | mục 24 | Đổi bớt gạo trắng sang ngũ cốc nguyên hạt — gạo lứt, yến mạch, bắp | …rắng, bột mì trắng bằng ngũ cốc nguyên hạt (… |
| đầu chương | mục 25 | Uống trà đều đặn — hai, ba tách một ngày là đủ | …(mục 24), uống trà ba lần một tuần trở lên (… |
| đầu chương | mục 26 | Cà phê: ba đến bốn tách một ngày là mức tốt nhất — nhưng phải là cà phê, không phải cà phê sữa | … (mục 25), ba đến bốn tách cà phê mỗi ngày (… |
| đầu chương | mục 27 | Ăn đủ rau và trái cây — khoảng 400 g, chia thành 5 phần | …ục 26), ăn đủ 5 phần rau quả, khoảng 400 g (… |
| đầu chương | mục 33 | Ăn cay — nhưng đừng ăn cay để thọ hơn | … (mục 27), ăn cay bốn lần một tuần trở lên (… |
| đầu chương | mục 34 | Một đến hai phần sữa hoặc sữa chua mỗi ngày — không cần ba ly | …ỗi ngày một đến hai phần sữa hoặc sữa chua (… |
| đầu chương | mục 35 | Trứng không phải thứ phải kiêng — một quả mỗi ngày là bình thường | … sữa chua (mục 34), trứng không phải kiêng (… |
| đầu chương | mục 11 | Đi bộ 7000–8000 bước một ngày — mốc có lợi không nằm ở con số 10.000 | … bước, hoặc mỗi tuần 150–300 phút đi nhanh (… |
| đầu chương | mục 14 | Chơi môn dùng vợt — cầu lông, bóng bàn, quần vợt | …t đi nhanh (mục 11), chơi các môn dùng vợt (… |
| đầu chương | mục 15 | Tích những đoạn vận động mạnh vụn trong ngày — 1 đến 2 phút cũng có ích | …t (mục 14), gom những lúc gắng sức vụn vặt (… |
| đầu chương | mục 16 | Tập sức mạnh mỗi tuần 30–60 phút — nhiều hơn không tốt thêm | …(mục 15), mỗi tuần 30–60 phút tập sức mạnh (… |
| đầu chương | mục 17 | Đừng ngồi liền một chỗ quá lâu — nhưng vận động mới là thứ cứu được bạn | …sức mạnh (mục 16), đừng ngồi liền một mạch (… |
| đầu chương | mục 32 | Giữ BMI trong khoảng 20–25 — người Việt nên bắt đầu xử lý từ 23 | … mạch (mục 17), giữ BMI trong khoảng 20–25 (… |
| đầu chương | mục 44 | Nuôi chó thì tính luôn phần dắt chó đi bộ vào số bước chân | …ục 32), dắt chó đi bộ thì tính vào số bước (… |
| đầu chương | mục 45 | Xét nghiệm ra tiền đái tháo đường thì làm ngay — đây là chỗ can thiệp có lãi nhất | …ớc (mục 44), phát hiện tiền đái tháo đường (… |
| đầu chương | mục 13 | Ngủ 7 tiếng mỗi đêm — ngủ ít và ngủ quá nhiều đều có hại | … mỗi đêm khoảng 7 tiếng, giờ giấc đều (… |
| đầu chương | mục 37 | Ngủ trưa dưới 30 phút — ngủ trưa dài có hại | …giấc đều (mục 13), ngủ trưa dưới nửa tiếng (… |
| đầu chương | mục 38 | Thức khuya thì ngủ bù ngay đêm sau — đừng để dồn tới cuối tuần | …7), thức khuya thì đêm hôm sau ngủ bù ngay (… |
| đầu chương | mục 39 | Làm ca đêm — chuyển sang ca ngày khi còn chuyển được | …), làm ca đêm thì chuyển việc sớm nếu được (… |
| đầu chương | mục 29 | Đừng đốt than, củi trong nhà để nấu ăn hay sưởi | … nấu ăn, sưởi không đốt than và củi (… |
| đầu chương | mục 40 | Đừng mua dầu lạc ép thủ công bán rời — chiên không phá hủy được aflatoxin | …29), không mua dầu lạc ép thủ công bán rời (… |
| đầu chương | mục 41 | Dùng dầu thực vật thay mỡ lợn và bơ — nhưng đừng chiên lại dầu nhiều lần | …c 40), dùng dầu thực vật thay mỡ lợn và bơ (… |
| đầu chương | mục 42 | Bật máy hút mùi từ lúc bắt đầu nấu, tắt sau khi dọn xong | …út mùi từ lúc bắt đầu nấu đến lúc dọn xong (… |
| đầu chương | mục 10 | Đánh răng hai lần một ngày bằng kem có fluor, và làm sạch kẽ răng — đừng tin quảng cáo | …ẩn thận, mỗi ngày làm sạch kẽ răng một lần (… |
| đầu chương | mục 12 | Uống thuốc theo đơn đều đặn — bỏ thuốc là chỗ chết người nhất trong điều trị bệnh mạn tính | …10), uống thuốc đều theo đơn, đừng tự dừng (… |
| đầu chương | mục 31 | Ban ngày ra ngoài trời — nhưng là nắng sớm, không phải nắng trưa | …ng (mục 12), ban ngày ra ngoài cho có nắng (… |
| đầu chương | mục 36 | Có bồn thì tắm — nhưng ngâm bồn là chỗ dễ ngất, phải cẩn thận | …có nắng (mục 31), có điều kiện thì tắm bồn (… |
| đầu chương | mục 43 | Bốc hỏa, vã mồ hôi tuổi mãn kinh mà ảnh hưởng sinh hoạt thì đi khám — đừng tự chịu | … thì đi khám để đánh giá liệu pháp hormone (… |
| đầu chương | mục 5 | Gọi tổng đài tư vấn cai thuốc, hoặc đi phòng tư vấn cai thuốc lá | … **… |
| đầu chương | mục 6 | Thuốc lá điện tử: ở Việt Nam đã bị cấm, đừng coi là cách cai | … Việt Nam, không phải số của nước ngoài), **… |
| đầu chương | mục 40 | Đừng mua dầu lạc ép thủ công bán rời — chiên không phá hủy được aflatoxin | … nên kết luận ngược với nơi còn cho bán), **… |
| mục 1 | mục 3 | Cai thuốc đừng chỉ dựa vào ý chí: uống thuốc trước đã | …c hỗ trợ và có người tư vấn — hai việc đó ở … |
| mục 1 | mục 4 | Đặt một ngày cai, đến ngày đó bỏ hẳn — đừng giảm dần trước | …ư vấn — hai việc đó ở mục 3 (dùng thuốc) và … |
| mục 5 | mục 3 | Cai thuốc đừng chỉ dựa vào ý chí: uống thuốc trước đã | … là đủ, và đừng dùng tư vấn thay cho thuốc (… |
| mục 6 | mục 3 | Cai thuốc đừng chỉ dựa vào ý chí: uống thuốc trước đã | … có bằng chứng và hợp pháp là thuốc kê đơn (… |
| mục 6 | mục 5 | Gọi tổng đài tư vấn cai thuốc, hoặc đi phòng tư vấn cai thuốc lá | …p pháp là thuốc kê đơn (mục 3) cộng tư vấn (… |
| mục 15 | mục 11 | Đi bộ 7000–8000 bước một ngày — mốc có lợi không nằm ở con số 10.000 | …ng thay thế** việc đi bộ hay chơi thể thao (… |
| mục 15 | mục 14 | Chơi môn dùng vợt — cầu lông, bóng bàn, quần vợt | …thế** việc đi bộ hay chơi thể thao (mục 11, … |
| mục 21 | mục 19 | Rượu bia: uống ít nhất có thể, và biết rằng mức an toàn là không uống | … Đếm xong thì đối chiếu với … |
| mục 23 | mục 47 | Không ăn gỏi cá nước ngọt — sán lá gan là tác nhân gây ung thư nhóm 1 | …gỏi cá, cá sống** là đường lây sán lá gan — … |
| mục 25 | mục 30 | Đừng uống trà, nước dùng, cà phê khi còn quá nóng — chờ vài phút | …i bớt vài phút, đừng uống ngay khi vừa rót (… |
| mục 26 | mục 13 | Ngủ 7 tiếng mỗi đêm — ngủ ít và ngủ quá nhiều đều có hại | …cần 4 tách mới tỉnh thì vấn đề là giấc ngủ (… |
| mục 27 | mục 9 | Đổi sang muối giảm natri — nhưng người bệnh thận phải hỏi bác sĩ trước | …ữa có thể vượt 5 g muối chỉ riêng phần dưa (… |
| mục 28 | mục 22 | Mỗi ngày một nắm hạt nhỏ — hạt điều, đậu phộng, hạt hướng dương đều được | … đồ ăn vặt thì thay bằng hạt hoặc trái cây (… |
| mục 30 | mục 19 | Rượu bia: uống ít nhất có thể, và biết rằng mức an toàn là không uống | … hai nguyên nhân lớn hơn nhiều là **rượu** (… |
| mục 30 | mục 1 | Cai thuốc lá, càng sớm càng tốt | …nhiều là **rượu** (mục 19) và **thuốc lá** (… |
| mục 32 | mục 7 | Không uống đồ uống có đường — đổi sang loại "không đường" cũng không phải là giải pháp | …ẩu phần và bớt nước ngọt, đồ siêu chế biến (… |
| mục 32 | mục 27 | Ăn đủ rau và trái cây — khoảng 400 g, chia thành 5 phần | …ọt, đồ siêu chế biến (mục 7, 28), tăng rau (… |
| mục 32 | mục 11 | Đi bộ 7000–8000 bước một ngày — mốc có lợi không nằm ở con số 10.000 | …, tăng rau (mục 27), đi bộ và tập sức mạnh (… |
| mục 33 | mục 9 | Đổi sang muối giảm natri — nhưng người bệnh thận phải hỏi bác sĩ trước | …hứng mạnh hơn nhiều so với bản thân quả ớt (… |
| mục 34 | mục 7 | Không uống đồ uống có đường — đổi sang loại "không đường" cũng không phải là giải pháp | …a sữa đặc đã chạm ngưỡng đường của cả ngày (… |
| mục 35 | mục 18 | Bớt thịt chế biến — giò chả, lạp xưởng, xúc xích, khô bò | …bánh mì (pate và xúc xích là thịt chế biến, … |
| mục 35 | mục 28 | Bớt thực phẩm siêu chế biến — mì gói, xúc xích, bánh ngọt công nghiệp, nước ngọt | … thứ trung tính lấy một thứ có hại rõ ràng (… |
| mục 38 | mục 37 | Ngủ trưa dưới 30 phút — ngủ trưa dài có hại | …ngủ bù thì ngủ bù **buổi trưa 20–30 phút** (… |
| mục 38 | mục 13 | Ngủ 7 tiếng mỗi đêm — ngủ ít và ngủ quá nhiều đều có hại | …hông phải ngủ bù mà là số giờ ngủ — hãy xem … |
| mục 38 | mục 39 | Làm ca đêm — chuyển sang ca ngày khi còn chuyển được | …ngủ bù mà là số giờ ngủ — hãy xem mục 13 và … |
| mục 39 | mục 1 | Cai thuốc lá, càng sớm càng tốt | …êm và cả hai đều làm tăng nguy cơ tim mạch (… |
| mục 44 | mục 11 | Đi bộ 7000–8000 bước một ngày — mốc có lợi không nằm ở con số 10.000 | …000 bước" (… |
| mục 45 | mục 32 | Giữ BMI trong khoảng 20–25 — người Việt nên bắt đầu xử lý từ 23 | …iêu về "cân nặng lý tưởng" rồi bỏ cuộc (xem … |

## 03-dung-lang-phi-suc-luc

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 9 | Đến giờ là ngủ — đừng thức vì game, video ngắn hay nội dung khiêu dâm | … 2 mục xếp C vì không dựa trên thí nghiệm (… |
| đầu chương | mục 19 | Coi công an, bác sĩ, giao dịch viên là người đi làm theo quy định, không phải "nhân vật" | …trên thí nghiệm (mục 9 là khảo sát tự khai, … |
| đầu chương | mục 22 | Coi "người khác đòi mình phải hoàn hảo" là triệu chứng, không phải sự thật | … Riêng … |
| đầu chương | mục 1 | Tắt thông báo không cần thiết, để điện thoại ra ngoài tầm mắt | … tắt thông báo không cần thiết (… |
| đầu chương | mục 5 | Gom email và tin nhắn thành vài lần cố định mỗi ngày | …iết (mục 1), gom tin nhắn mỗi ngày vài lần (… |
| đầu chương | mục 6 | Đang làm việc cần suy nghĩ liên tục thì chặn cả những ngắt quãng vài giây | …(mục 5), chặn cả những ngắt quãng vài giây (… |
| đầu chương | mục 7 | Một lúc chỉ làm một việc — đừng vừa họp vừa trả lời tin nhắn | …vài giây (mục 6), một lúc chỉ làm một việc (… |
| đầu chương | mục 12 | Làm việc ở phòng mở thì dùng nút tai, hoặc tìm phòng yên tĩnh cho việc cần ghi nhớ | …mục 7), phòng làm việc mở thì dùng nút tai (… |
| đầu chương | mục 13 | Đừng cứ tăng giờ làm mãi | …ng nút tai (mục 12), đừng tăng giờ làm mãi (… |
| đầu chương | mục 2 | Giữ giờ thức cố định, cuối tuần cũng vậy | … giờ thức cố định (… |
| đầu chương | mục 3 | Ngủ đủ 7 đến 8 tiếng, đừng coi 6 tiếng là đủ | …thức cố định (mục 2), ngủ đủ 7 đến 8 tiếng (… |
| đầu chương | mục 4 | Sau 2 giờ chiều thì đừng đụng caffeine | …ục 3), sau 2 giờ chiều không đụng caffeine (… |
| đầu chương | mục 8 | Một giờ trước khi ngủ không nhìn màn hình phát sáng | … một giờ trước khi ngủ không nhìn màn hình (… |
| đầu chương | mục 9 | Đến giờ là ngủ — đừng thức vì game, video ngắn hay nội dung khiêu dâm | …hông nhìn màn hình (mục 8), đến giờ là ngủ (… |
| đầu chương | mục 10 | Đêm khuya không quyết định việc lớn, không gửi tin nhắn quan trọng | …gủ (mục 9), đêm khuya không quyết định lớn (… |
| đầu chương | mục 11 | Chiều buồn ngủ thì chợp 10 phút, đừng ngủ nửa tiếng | … (mục 10), chiều buồn ngủ thì chợp 10 phút (… |
| đầu chương | mục 26 | Mất ngủ kéo dài thì làm trị liệu hành vi cho giấc ngủ trước, đừng uống thuốc ngủ dài hạn | …ngủ kéo dài thì làm trị liệu hành vi trước (… |
| đầu chương | mục 27 | Ngáy to, có người thấy bạn ngưng thở khi ngủ, ban ngày buồn ngủ tới mức lái xe cũng muốn ngủ — đi đo giấc ngủ | …ớc (mục 26), ngáy và ngừng thở thì đi khám (… |
| đầu chương | mục 14 | Thấy mình cứ nghĩ vòng vo về một chuyện khó chịu thì đổi sang việc cần tay chân | … nghĩ vòng vo thì đổi sang việc tay chân (… |
| đầu chương | mục 15 | Coi những ý như "mọi chuyện chắc chắn sẽ tệ hơn" là triệu chứng, không phải sự thật | …mục 14), coi ý nghĩ bi quan là triệu chứng (… |
| đầu chương | mục 21 | Thấy "mọi người đều thấy mình bị bẽ mặt" thì Thêm: "chia đôi con số người để ý mà bạn đoán | …y mình ê mặt thì chia đôi con số ước lượng (… |
| đầu chương | mục 22 | Coi "người khác đòi mình phải hoàn hảo" là triệu chứng, không phải sự thật | …"ai cũng đòi mình hoàn hảo" là triệu chứng (… |
| đầu chương | mục 17 | Đang giận thì rời chỗ trước, coi người kia như thời tiết chứ không như kẻ thù | … đang giận thì rời khỏi chỗ đó trước (… |
| đầu chương | mục 18 | Tâm trạng xuống thấp thì làm 5 việc rẻ nhất trước: vận động, ra ánh sáng, ngủ đúng giờ, nói với ai đó, và đi khám Thêm vào tiêu đề: "khi không tự khá lên được | … (mục 17), buồn thì làm mấy việc này trước (… |
| đầu chương | mục 23 | Đang giận thì đừng đấm bao cát hay chạy một vòng để xả — làm chậm cơ thể trước | …ục 18), đừng xả giận bằng cách đấm bao cát (… |
| đầu chương | mục 24 | Trong lòng đang nặng một chuyện thì viết ra vài ngày liền — nhưng đừng trông vào nó để chữa bệnh | …o cát (mục 23), viết ra giấy mấy ngày liền (… |
| đầu chương | mục 16 | Bớt những quan hệ làm mình hao, tập nói "không" với yêu cầu mình không muốn nhận | … biết từ chối việc mình không muốn nhận (… |
| đầu chương | mục 19 | Coi công an, bác sĩ, giao dịch viên là người đi làm theo quy định, không phải "nhân vật" | …g an, bác sĩ là người đi làm theo quy định (… |
| đầu chương | mục 20 | Đừng coi "người khác đang sống thế nào" là món đọc hằng ngày | … những app chuyên hiện đời sống người khác (… |
| đầu chương | mục 25 | Đau bụng kinh thì uống thuốc giảm đau, đừng chịu đựng — đau tới mức nghỉ làm nghỉ học thì đi khám | …kinh thì uống thuốc giảm đau như ibuprofen (… |
| mục 2 | chương 2 mục 38 | Thức khuya thì ngủ bù ngay đêm sau — đừng để dồn tới cuối tuần | … thử nghiệm ngẫu nhiên ở … |
| mục 2 | chương 2 mục 37 | Ngủ trưa dưới 30 phút — ngủ trưa dài có hại | … trưa cũng phải ngắn — quá 60 phút thì hại (… |
| mục 2 | chương 2 mục 39 | Làm ca đêm — chuyển sang ca ngày khi còn chuyển được | … nguyên giờ thức 2 đến 3 ngày rồi dịch dần (… |
| mục 3 | chương 2 mục 37 | Ngủ trưa dưới 30 phút — ngủ trưa dài có hại | …giấc đêm — trưa dài quá 60 phút còn có hại (… |
| mục 3 | chương 2 mục 38 | Thức khuya thì ngủ bù ngay đêm sau — đừng để dồn tới cuối tuần | …gủ bù cuối tuần cũng không trả được nợ ngủ (… |
| mục 3 | mục 4 | Sau 2 giờ chiều thì đừng đụng caffeine | …rong ngày thì còn phá luôn giấc ngủ đêm đó (… |
| mục 3 | mục 27 | Ngáy to, có người thấy bạn ngưng thở khi ngủ, ban ngày buồn ngủ tới mức lái xe cũng muốn ngủ — đi đo giấc ngủ | …u ban ngày buồn ngủ nhiều thì phải đi khám (… |
| mục 6 | mục 1 | Tắt thông báo không cần thiết, để điện thoại ra ngoài tầm mắt | …gười khác là chưa đủ, phải chặn chính mình (… |
| mục 11 | chương 2 mục 37 | Ngủ trưa dưới 30 phút — ngủ trưa dài có hại | … tăng nguy cơ tim mạch và tử vong — đã có ở … |
| mục 11 | mục 2 | Giữ giờ thức cố định, cuối tuần cũng vậy | … sau 15 giờ vì sẽ đẩy lùi giờ ngủ buổi tối (… |
| mục 14 | mục 18 | Tâm trạng xuống thấp thì làm 5 việc rẻ nhất trước: vận động, ra ánh sáng, ngủ đúng giờ, nói với ai đó, và đi khám Thêm vào tiêu đề: "khi không tự khá lên được | …hứng thú, thì cần gặp người làm chuyên môn (… |
| mục 15 | mục 10 | Đêm khuya không quyết định việc lớn, không gửi tin nhắn quan trọng | … ghi lại rồi để sáng mai xử lý (… |
| mục 15 | mục 18 | Tâm trạng xuống thấp thì làm 5 việc rẻ nhất trước: vận động, ra ánh sáng, ngủ đúng giờ, nói với ai đó, và đi khám Thêm vào tiêu đề: "khi không tự khá lên được | …ng nhiều tuần thì cần người làm chuyên môn (… |
| mục 17 | mục 14 | Thấy mình cứ nghĩ vòng vo về một chuyện khó chịu thì đổi sang việc cần tay chân | …rửa mặt, sang phòng khác làm việc tay chân (… |
| mục 18 | mục 2 | Giữ giờ thức cố định, cuối tuần cũng vậy | …i đó** là hai việc đã có bằng chứng riêng ở … |
| mục 18 | mục 8 | Một giờ trước khi ngủ không nhìn màn hình phát sáng | … phải buổi tối (buổi tối thì ngược lại, xem … |
| mục 20 | mục 1 | Tắt thông báo không cần thiết, để điện thoại ra ngoài tầm mắt | … Sức khỏe kỹ thuật số), tắt thông báo (… |
| mục 22 | mục 18 | Tâm trạng xuống thấp thì làm 5 việc rẻ nhất trước: vận động, ra ánh sáng, ngủ đúng giờ, nói với ai đó, và đi khám Thêm vào tiêu đề: "khi không tự khá lên được | … đi khám (… |
| mục 23 | mục 17 | Đang giận thì rời chỗ trước, coi người kia như thời tiết chứ không như kẻ thù | … rời chỗ (… |
| mục 24 | mục 18 | Tâm trạng xuống thấp thì làm 5 việc rẻ nhất trước: vận động, ra ánh sáng, ngủ đúng giờ, nói với ai đó, và đi khám Thêm vào tiêu đề: "khi không tự khá lên được | … hại bản thân, thì **dừng lại và đi khám** (… |
| mục 26 | mục 2 | Giữ giờ thức cố định, cuối tuần cũng vậy | …) **giữ giờ thức cố định** kể cả cuối tuần (… |

## 04-dung-lang-phi-thoi-gian

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 11 | Muốn chắc mình làm thì đặt tiền cược vào — nhưng đặt đúng chỗ | …Trong 18 mục, **2 mục xếp A** — … |
| đầu chương | mục 13 | Trì hoãn đã ảnh hưởng tới cuộc sống thì dùng tài liệu tự trợ giúp có thử nghiệm ngẫu nhiên chứng minh — không nhất thiết phải tìm chuyên gia | …m thực địa có nhóm đối chứng về cam kết) và … |
| đầu chương | mục 16 | Không xem truyền hình và không đọc tin cuộn; tin cần thì xem theo khung giờ cố định | …) — **15 mục xếp B**, và **1 mục xếp C** là … |
| đầu chương | mục 8 | Việc không có hạn chót bên ngoài thì tự đặt một ngày — nhưng đừng trông vào cái ngày đó | …à bài nghiên cứu nổi tiếng nhất vừa bị rút (… |
| mục 2 | mục 1 | Viết "định làm" thành "mấy giờ, ở đâu, gặp chuyện gì thì làm gì" | …ủa phân tích gộp **94 thử nghiệm** đã dẫn ở … |
| mục 7 | mục 4 | Ước thời gian theo việc tương tự mình đã làm thật, đừng ước theo kế hoạch | …c **từng bước rồi cộng**, đừng ước cả khối (… |
| mục 8 | mục 4 | Ước thời gian theo việc tương tự mình đã làm thật, đừng ước theo kế hoạch | … một ngày cụ thể **buộc phải ước lượng** (… |
| mục 8 | mục 7 | Chia việc lớn thành việc con rồi mới ước thời gian và bắt tay làm | …ng chứng mạnh hơn hẳn là **chia bước nhỏ** (… |
| mục 8 | mục 11 | Muốn chắc mình làm thì đặt tiền cược vào — nhưng đặt đúng chỗ | … nhỏ** (mục 7) và **cam kết có ràng buộc** (… |
| mục 9 | mục 13 | Trì hoãn đã ảnh hưởng tới cuộc sống thì dùng tài liệu tự trợ giúp có thử nghiệm ngẫu nhiên chứng minh — không nhất thiết phải tìm chuyên gia | …n hệ nhiều năm thì đó là việc phải đi khám (… |
| mục 10 | mục 7 | Chia việc lớn thành việc con rồi mới ước thời gian và bắt tay làm | …nó là thứ **cộng thêm** vào việc chia bước (… |
| mục 13 | chương 3 mục 18 | Tâm trạng xuống thấp thì làm 5 việc rẻ nhất trước: vận động, ra ánh sáng, ngủ đúng giờ, nói với ai đó, và đi khám Thêm vào tiêu đề: "khi không tự khá lên được | …t hoặc lo âu kéo dài**, xử lý cái đó trước (… |
| mục 13 | mục 10 | Đồ cần dùng để trong tầm tay, đồ không muốn đụng thì cất xa — đừng trông vào việc nhịn lúc đó | …án đúng hay sai), **kiểm soát kích thích** (… |
| mục 15 | mục 12 | Thói quen mới thì tính theo tháng, đừng tính theo "21 ngày" | …i hứa với chính mình — đúng loại lời hứa mà … |

## 05-dung-lang-phi-tien

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Tắt hết gia hạn tự động, tới hạn thì tự bấm | … chi tiêu hằng ngày (… |
| đầu chương | mục 5 | Không mua vé số: mỗi 10.000 đồng luật chỉ cho trả thưởng tối đa 5.000 đồng | …21, 23, 24) · mua bốc đồng và tiền của con (… |
| đầu chương | mục 7 | Trả đủ dư nợ thẻ mỗi tháng; nếu buộc phải vay, đổi mọi con số về %/năm rồi mới so | …5, 8, 9, 10, 33, 34, 35) · vay và lãi suất (… |
| đầu chương | mục 15 | Giao dịch càng nhiều thì tiền ở lại càng ít — thị trường dựng đứng càng phải ngồi yên | …35) · vay và lãi suất (mục 7, 28) · đầu tư (… |
| đầu chương | mục 25 | Mua bảo hiểm thuần bảo vệ; tiền "hoàn lại" và "chia lãi" là phần không được đảm bảo | …16, 17, 18, 19, 37, 38, 45, 51) · bảo hiểm (… |
| đầu chương | mục 2 | Mỗi năm làm một lần quyết toán thuế thu nhập cá nhân, và điền hết người phụ thuộc | …43, 44) · thuế, lương hưu, bảo hiểm xã hội (… |
| đầu chương | mục 22 | Trả tiền trước thì lấy hợp đồng và hóa đơn — phần chưa dùng vẫn là tiền của bạn | …c 2, 3, 13, 20, 46) · mua sắm và khiếu nại (… |
| đầu chương | mục 47 | Nhận xe mới: kiểm ngay tại chỗ, và biết rằng Việt Nam không có "7 ngày đổi xe" | …ả tiền trước, 29, 30, 31, 32, 36, 50) · xe (… |
| đầu chương | mục 6 | Ai hứa lãi cao gấp mấy lần tiết kiệm thì đó không phải cơ hội, mà là chỗ mất tiền | …0) · xe (mục 47, 48, 49) · tiết kiệm và nợ (… |
| mục 4 | mục 1 | Tắt hết gia hạn tự động, tới hạn thì tự bấm | …p tiền thì gói vẫn sống tới hết chu kỳ (xem … |
| mục 8 | mục 9 | Con bạn nạp tiền vào game: dưới 15 tuổi còn đòi lại được, từ 15 tuổi thì gần như mất | …ộc độ tuổi, cách giao dịch và chứng cứ (xem … |
| mục 8 | mục 9 | Con bạn nạp tiền vào game: dưới 15 tuổi còn đòi lại được, từ 15 tuổi thì gần như mất | … của con, và cách đó hẹp dần theo tuổi (xem … |
| mục 16 | mục 7 | Trả đủ dư nợ thẻ mỗi tháng; nếu buộc phải vay, đổi mọi con số về %/năm rồi mới so | … lãi thẻ tín dụng 30,5%–44,5%/năm (… |
| mục 27 | mục 7 | Trả đủ dư nợ thẻ mỗi tháng; nếu buộc phải vay, đổi mọi con số về %/năm rồi mới so | … lãi thẻ tín dụng 30,5%–44,5%/năm (… |
| mục 28 | mục 27 | Để riêng ba đến sáu tháng chi tiêu, ở chỗ rút được trong ngày | … luôn giữ quỹ dự phòng (… |
| mục 33 | mục 34 | Đá quý chỉ tin phiếu của phòng đã được công nhận, và tra mã đó trên trang của Văn phòng Công nhận Chất lượng | … xem … |
| mục 42 | mục 41 | Hợp đồng bảo hiểm trên một năm có 21 ngày cân nhắc: hủy trong hạn thì lấy lại được phần lớn phí | …à chỉ trong 21 ngày đầu mới gần như đủ (xem … |

## 06-nhung-thu-vo-dung

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Đừng uống viên đa vitamin để sống lâu hay để phòng bệnh tim mạch | … viên uống và thực phẩm bổ sung (… |
| đầu chương | mục 7 | Đừng tự đi chụp PET-CT toàn thân hay làm gói chất chỉ điểm ung thư khi chưa có triệu chứng | … khám sức khỏe và những thứ "phát hiện ra" (… |
| đầu chương | mục 8 | Đừng mong vòng tay hay đồng hồ đếm bước giúp bạn giảm cân | … 20, 21, 33) · các thuyết giữ gìn sức khỏe (… |
| đầu chương | mục 15 | Đừng trả tiền cho thầy bói, tarot hay tử vi để quyết định thay mình | …26, 29, 35) · tiền mua may mắn và cảm giác (… |
| đầu chương | mục 25 | Đừng tin "ý chí như cơ bắp, dùng một lúc là hết" | …ục 15, 22, 23, 24, 32) · ý chí và tình dục (… |
| đầu chương | mục 31 | Đừng để chatbot AI tự phán bệnh và phán luật; tìm đúng câu gốc trước khi đi khám, đi kiện hay tiêu tiền lớn | … dục (mục 25, 27, 28) · câu trả lời của AI (… |
| mục 10 | mục 1 | Đừng uống viên đa vitamin để sống lâu hay để phòng bệnh tim mạch | …hành phần quen thuộc của nhóm này đã kiểm ở … |
| mục 10 | mục 1 | Đừng uống viên đa vitamin để sống lâu hay để phòng bệnh tim mạch | …droitin, vitamin C phòng cảm — lần lượt ở **… |
| mục 10 | mục 2 | Đừng uống dầu cá thường để phòng bệnh tim mạch | …droitin, vitamin C phòng cảm — lần lượt ở **… |
| mục 10 | mục 3 | Đừng bổ sung vitamin D cho người không thiếu, với hy vọng sống lâu | …droitin, vitamin C phòng cảm — lần lượt ở **… |
| mục 10 | mục 4 | Đừng uống viên chống oxy hóa để phòng ung thư | …droitin, vitamin C phòng cảm — lần lượt ở **… |
| mục 10 | mục 5 | Đừng trông vào glucosamine hay chondroitin để chữa đau khớp gối | …droitin, vitamin C phòng cảm — lần lượt ở **… |
| mục 10 | mục 6 | Đừng trông vào vitamin C để phòng cảm | …droitin, vitamin C phòng cảm — lần lượt ở **… |
| mục 22 | chương 5 mục 33 | Đồng hồ, đá quý, đồ chơi sưu tầm: tính bằng tiền đã ra khỏi túi, không bằng "giá trị sau này" | … vì sao đừng tính món này là đầu tư đã có ở … |
| mục 23 | mục 24 | Đừng tiêu thêm để nhích lên một bậc so với người quanh mình | … Chuyện đua theo hàng xóm thì ở … |
| mục 34 | chương 3 mục 26 | Mất ngủ kéo dài thì làm trị liệu hành vi cho giấc ngủ trước, đừng uống thuốc ngủ dài hạn | …h vi cho giấc ngủ (CBT-I), đã trình bày ở **… |

## 07-khong-co-tien-thi-song-the-nao

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 14 | Tìm việc có phương pháp: học kỹ năng, đặt mục tiêu, nhờ người quen góp ý | … Chương có **1 mục A** (… |
| đầu chương | mục 3 | Không đủ tiền thuê luật sư thì xin trợ giúp pháp lý nhà nước — miễn phí, nhưng chỉ cho nhóm luật định | …hưng không ai đo được số tiền tiết kiệm** — … |
| đầu chương | mục 1 | Mất việc thì nộp hồ sơ trợ cấp thất nghiệp ngay: hạn là 3 tháng | … mất việc, thu nhập và tìm việc (… |
| đầu chương | mục 4 | Đường cùng thì vào cơ sở trợ giúp xã hội, đừng tìm nhà tạm trú tự phát | … 14, 18) · trợ giúp xã hội, giấy tờ, chỗ ở (… |
| đầu chương | mục 2 | Bị quỵt lương thì tìm thanh tra lao động, hòa giải viên, trọng tài — ra tòa đòi lương cũng được miễn án phí | …, 16, 17, 21) · pháp lý lao động, y tế, nợ (… |
| mục 6 | mục 7 | Thu nhập dưới chuẩn nghèo thì đăng ký hộ nghèo, trên một chút thì xin các chính sách hỗ trợ khác | … Thu nhập thấp kéo dài thì xem … |
| mục 16 | mục 4 | Đường cùng thì vào cơ sở trợ giúp xã hội, đừng tìm nhà tạm trú tự phát | …hoát cho đêm nay — đang mất chỗ ngủ thì xem … |
| mục 16 | mục 21 | Không còn chỗ ngủ đêm nay: chỗ mở 24 giờ chỉ để một đêm, còn cửa thật là cơ sở trợ giúp xã hội | …đêm nay — đang mất chỗ ngủ thì xem mục 4 và … |
| mục 21 | mục 4 | Đường cùng thì vào cơ sở trợ giúp xã hội, đừng tìm nhà tạm trú tự phát | … cả tuần — hôm sau vẫn phải đi đúng tuyến ở … |

## 08-dung-tu-chuoc-hoa-vao-than

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 3 | Bốn câu chống lừa đảo: không tin người gọi đến, không đọc mã, không bấm link, không chuyển tiền trước khi gọi lại số đã lưu | … **3 mục hạng C** là … |
| đầu chương | mục 4 | Nhìn thấy mặt, nghe thấy giọng đều không phải là xác thực: cứ cúp máy rồi gọi lại số đã lưu | … **3 mục hạng C** là mục 3 và … |
| đầu chương | mục 42 | Hiện trường: quay cảnh rộng trước, rồi vị trí, rồi thiệt hại — và giữ nguyên ảnh, video gốc | …ừa đảo, và nguyên tắc cúp máy gọi lại) cùng … |
| đầu chương | mục 2 | Nghi bị lừa chuyển tiền thì gọi 113 ngay, đừng tự đi xác minh trước | … … |
| đầu chương | mục 17 | Đọc hết tờ giấy trước khi ký, không ký hộ, không ký vào tờ còn trống | … … |
| đầu chương | mục 10 | Đụng chuyện thì lùi lại gọi công an, đừng ra tay trước | … … |
| đầu chương | mục 23 | Quà lớn trong chuyện tình cảm: nghĩ trước khi trao, vì trao rồi thì gần như không đòi lại được | … … |
| đầu chương | mục 5 | Bị giữ, bị gọi lên làm việc thì im lặng và gọi luật sư; không tự giải thích cho êm, không đưa tiền, không xóa tin nhắn | … … |
| đầu chương | mục 16 | Trên mạng: không chửi, không bịa, không chia sẻ thứ chưa kiểm chứng; bị tấn công thì lưu bằng chứng trước | … … |
| đầu chương | mục 31 | Người đang ngủ, đang say mất ý thức, hoặc chưa đủ tuổi thì không có sự đồng ý | … … |
| đầu chương | mục 1 | Gây tai nạn thì dừng lại, cứu người, gọi 113 và ở lại hiện trường — bỏ đi là sang khung nặng hơn | … … |
| mục 11 | mục 10 | Đụng chuyện thì lùi lại gọi công an, đừng ra tay trước | …mặc định vẫn là lùi, gọi công an, ghi hình (… |
| mục 12 | mục 16 | Trên mạng: không chửi, không bịa, không chia sẻ thứ chưa kiểm chứng; bị tấn công thì lưu bằng chứng trước | …hể bị kiện ngược về làm nhục hoặc vu khống (… |
| mục 13 | mục 14 | Nghĩ tới "chết chung cho xong" thì coi là cấp cứu: rời khỏi chỗ đó, đưa chìa khóa và dao cho người khác | … nhờ người giữ hộ hung khí là việc nên làm (… |
| mục 32 | mục 39 | Báo án: lấy biên bản tiếp nhận, không khởi tố phải nêu lý do bằng văn bản | … ngày thì không có mốc để hỏi tiếp, nên xem … |

## 09-ranh-gioi-phap-luat-nguoi-thuong-de-vap

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 8 | Khuyến mại thì lấy bằng thân phận thật, một tài khoản một lần: không mua sim, không mua tài khoản, không khai thác lỗi hệ thống | …ị định, đã mở bản ký) và **3 mục hạng C** — … |
| đầu chương | mục 1 | Tin bão, dịch, công an không rõ thật giả thì không chuyển tiếp, không chế ảnh, không dựng ảnh hiện trường bằng AI | … … |
| đầu chương | mục 5 | "Việc nhẹ lương cao" mà bắt bạn dùng thẻ của mình để nhận tiền, rút tiền, chuyển tiền: trả bao nhiêu cũng không làm | … … |
| đầu chương | mục 9 | Ban công, cửa sổ không ném bất cứ thứ gì xuống: đầu thuốc, túi rác, chai rượu đều tính | … … |
| đầu chương | mục 15 | Đòi nợ thì khởi kiện, không giữ người, không giữ giấy tờ, không đến nhà ngồi lì | … … |
| đầu chương | mục 12 | Không lắp camera trong phòng người khác thuê, không quay lén rồi phát tán | … … |
| đầu chương | mục 24 | Dịch, chép, đăng lại phim truyện và sách lậu: không bán cũng là xâm phạm quyền tác giả; có thu tiền thì có thể thành tội hình sự | … … |
| đầu chương | mục 29 | Không thi hộ, không thuê người thi hộ, không mua bán đáp án: Việt Nam không có tội "thi hộ", nhưng có tội làm giấy tờ giả và tội đưa hối lộ | … … |

## 10-yeu-va-ket-hon-co-dang-khong

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 4 | Quan hệ tốt hay xấu thì đo bằng cảm giác của chính bạn, không bằng lý lịch của người kia | … chương này có **2 mục hạng A** — … |
| đầu chương | mục 20 | Kẹt trong cãi nhau và chiến tranh lạnh thì đi trị liệu cùng nhau: ngồi đợi thì gần như không tự khỏi | …ứu theo dõi dọc** về chất lượng quan hệ) và … |
| đầu chương | mục 8 | Cộng phần sức khỏe của hôn nhân vào, nhưng chiết khấu vì đó là dữ liệu quan sát | … **1 mục hạng C** là … |
| đầu chương | mục 1 | Quen nhiều người thay vì dồn hết vào một người: hai người có hợp nhau không thì gặp mới biết | … … |
| đầu chương | mục 4 | Quan hệ tốt hay xấu thì đo bằng cảm giác của chính bạn, không bằng lý lịch của người kia | … … |
| đầu chương | mục 7 | Nghe số đăng ký trước khi nghe "ngày xưa người ta cưới sớm": số kết hôn và số ly hôn không cùng một phép chia | … … |
| đầu chương | mục 13 | Đăng ký kết hôn ở xã, phường: giấy tờ tùy thân, miễn lệ phí, thường xong trong ngày | … … |
| đầu chương | mục 10 | Tiền trong hôn nhân: đọc luật mặc định trước, rồi mới quyết có lập văn bản thỏa thuận | … … |
| đầu chương | mục 18 | Người cùng giới sống với nhau thì phải làm ba loại giấy khi cả hai còn tỉnh: văn bản chọn người đại diện, văn bản lựa chọn người giám hộ, di chúc | … … |
| mục 8 | mục 4 | Quan hệ tốt hay xấu thì đo bằng cảm giác của chính bạn, không bằng lý lịch của người kia | …uật riêng và có biện pháp cấm tiếp xúc (xem … |

## 11-nhung-vach-do-nguoi-lam-ky-thuat-hay-vap

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 10 | Báo lỗ hổng cho chủ hệ thống trước, và trước khi vá thì không đăng chi tiết, không phát hành công cụ khai thác, không đẩy dữ liệu ra nước ngoài | … **4 mục hạng C** — … |
| đầu chương | mục 11 | Không bán tài khoản VPN, không dựng node hộ người khác: ở Việt Nam không có tội danh riêng, nhưng có điều kiện kinh doanh và bạn chịu trách nhiệm về đường mình mở | …** — mục 10 (báo lỗ hổng cho chủ hệ thống), … |
| đầu chương | mục 17 | Cung cấp AI cho công chúng: Việt Nam chưa có đăng ký thuật toán, nhưng đã có luật buộc tự phân loại rủi ro và thông báo trước khi chạy | …ệ thống), mục 11 (không bán tài khoản VPN), … |
| đầu chương | mục 19 | Không dựng trạm trung chuyển bán lại API mô hình nước ngoài giá rẻ: chưa có án, nhưng bạn có thể gặp rủi ro về dữ liệu, hợp đồng, thuế và tiền khách trả trước. | … VPN), mục 17 (cung cấp AI cho công chúng), … |
| đầu chương | mục 1 | Trước khi nhận làm, hỏi rõ ai trả tiền, sản phẩm dùng để làm gì, người đặt có giấy phép không; bị hỏi thì gọi luật sư hình sự ngay, đừng tự giải thích trước | … … |
| đầu chương | mục 2 | Không làm, không bán cheat game và bot hỗ trợ — kể cả loại "chỉ đọc màn hình, không động vào bộ nhớ" — và không bán bản sửa của app người khác để thêm chức năng | … … |
| đầu chương | mục 4 | Crawler chỉ cào trang công khai không cần đăng nhập, không vượt chặn bot, không lấy dữ liệu cá nhân, không bán dữ liệu cào được | … … |
| đầu chương | mục 7 | Nghỉ việc không mang theo mã nguồn, danh sách khách hàng, tài liệu kỹ thuật; không đưa lên ổ cá nhân; không dùng lại ở công ty mới | … … |
| đầu chương | mục 14 | Dùng code GPL để làm sản phẩm thì phải theo giấy phép: mở mã nguồn hoặc đổi giấy phép, đừng dựa vào "không ai quản" | … … |
| đầu chương | mục 11 | Không bán tài khoản VPN, không dựng node hộ người khác: ở Việt Nam không có tội danh riêng, nhưng có điều kiện kinh doanh và bạn chịu trách nhiệm về đường mình mở | … … |
| mục 4 | mục 9 | Không kiểm thử hệ thống của người khác khi chưa có văn bản cho phép: ý tốt và việc báo lại sau đó không xóa được hành vi | … Điều 289 khoản 1 Bộ luật Hình sự, như ở … |
| mục 20 | chương 9 mục 24 | Dịch, chép, đăng lại phim truyện và sách lậu: không bán cũng là xâm phạm quyền tác giả; có thu tiền thì có thể thành tội hình sự | …u bạn phát hành phim hoặc sách lậu, hãy xem … |

## 12-kinh-doanh-nho-mo-van-hanh-dong

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 18 | Bán trước rồi mới sản xuất: dùng đơn đặt trước và lô nhỏ để kiểm chứng có người mua, rồi mới bỏ tiền | … **4 mục hạng C** — … |
| đầu chương | mục 1 | Chỉ bỏ vào việc kinh doanh số tiền mất hết vẫn còn chỗ ở, không đụng tiền nhà, không vay để mở | … … |
| đầu chương | mục 4 | Không đứng tên hộ cổ đông, không nhận đứng tên công ty cho người khác | … … |
| đầu chương | mục 8 | Bán đồ ăn: chế biến để bán và mở quán phải có giấy chứng nhận cơ sở đủ điều kiện, bán hàng bao gói sẵn chỉ tự công bố, bán nông sản tươi sống thì không cần giấy | … … |
| đầu chương | mục 12 | Có đăng ký kinh doanh là có nghĩa vụ khai thuế: khai đúng hạn, không có doanh thu vẫn phải thông báo, và ngưỡng 1 tỷ đồng không phải giấy miễn khai | … … |
| đầu chương | mục 15 | Hợp đồng mua bán: ghi "đặt cọc" khác "trả trước" về hậu quả pháp lý; ghi rõ số tiền phạt vi phạm; điều khoản trả chậm phải viết như một khoản cho vay | … … |
| đầu chương | mục 18 | Bán trước rồi mới sản xuất: dùng đơn đặt trước và lô nhỏ để kiểm chứng có người mua, rồi mới bỏ tiền | … … |
| đầu chương | mục 22 | Làm đúng quy trình ở chỗ làm; việc tốt nằm ngoài quy trình thì hỏi trước ai chịu trách nhiệm | … … |
| đầu chương | mục 25 | Nghĩa vụ báo cáo hằng năm: nộp báo cáo tài chính, quyết toán thuế, và báo khi thông tin đăng ký thay đổi | … … |

## 13-cap-cuu-nhung-phut-quyet-dinh

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Người gục, gọi không tỉnh, không thở bình thường: ép tim ngoài lồng ngực ngay, gọi 115, nhờ người tìm máy sốc điện tự động | … … |
| đầu chương | mục 2 | Người già ngã, người nằm dưới đất: khom xuống gọi hỏi, gọi 115, đừng vội bế dậy | … … |
| đầu chương | mục 3 | Một bên miệng méo, một tay yếu, nói không rõ: gọi 115 ngay, đừng chờ, đừng tự chở bằng xe máy | … … |
| đầu chương | mục 4 | Chóng mặt đứng không vững, nhìn một thành hai, một bên mắt tối: xử như đột quỵ, gọi 115 | … … |
| đầu chương | mục 5 | Một mắt tối như có màn che, dù vài phút tự hết: đi khám mắt ngay, đừng chờ sang hôm sau | … … |
| đầu chương | mục 6 | Mắt sưng đau, đỏ, nhìn đèn thấy quầng cầu vồng, đau đầu buồn nôn: đi khám mắt ngay trong ngày | … … |
| đầu chương | mục 7 | Đau ngực thắt, bóp nghẹn kéo dài, hoặc kèm vã mồ hôi, buồn nôn, khó thở: gọi 115, không tự lái xe | … … |
| đầu chương | mục 8 | Đau dữ dội như bị xé, từ ngực chạy ra sau lưng xuống thắt lưng: gọi 115 và nói rõ "đau như bị xé" | … … |
| đầu chương | mục 9 | Đau đầu dữ dội nhất đời, lên tới đỉnh trong vòng một giờ: đi cấp cứu, chụp cắt lớp vi tính sọ ngay | … … |
| đầu chương | mục 10 | Người già đập đầu, vài tuần đến vài tháng sau đi loạng choạng, chậm chạp, ngủ nhiều, yếu nửa người: đi chụp cắt lớp vi tính sọ | … … |
| đầu chương | mục 11 | Một chân đột nhiên sưng, căng, ấn đau: đi khám sớm; kèm khó thở hoặc đau ngực thì gọi 115 ngay | … … |
| đầu chương | mục 12 | Chảy máu nhiều: ấn mạnh lên vết thương, nếu ở tay chân mà ấn không cầm được máu thì đặt dây ga rô, gọi 115 | … … |
| đầu chương | mục 13 | Bị chó, mèo cắn hoặc cào rách da: rửa bằng nước và xà phòng 15 phút, tới cơ sở tiêm chủng tiêm vắc-xin dại trong ngày | … … |
| đầu chương | mục 14 | Bỏng: làm mát bằng nước sạch chảy 20 phút, không bôi kem đánh răng hay nước mắm | … … |
| đầu chương | mục 15 | Đột nhiên nổi mẩn khắp người kèm khó thở hoặc choáng: gọi 115, nói rõ "sốc phản vệ", có sẵn adrenalin thì tiêm bắp ngay | … … |
| đầu chương | mục 16 | Người co giật ngã xuống: dọn vật cản, cho nằm nghiêng, bấm giờ, tuyệt đối không nhét thìa hay ngón tay vào miệng | … … |
| đầu chương | mục 17 | Người đái tháo đường đột nhiên run rẩy, vã mồ hôi, nói không rõ: cho 15 gam đường, sau 15 phút kiểm lại | … … |
| đầu chương | mục 18 | Có người bị điện giật: cắt cầu dao trước, dùng que khô gạt dây ra, tuyệt đối không kéo tay trần | … … |
| đầu chương | mục 19 | Còi báo khí CO kêu, hoặc cả nhà cùng đau đầu buồn nôn: ra khỏi nhà trước, rồi mới gọi 115 | … … |
| đầu chương | mục 20 | Uống nhầm chất tẩy rửa, thuốc trừ sâu hay thuốc chữa bệnh: không gây nôn, mang vỏ chai tới cơ sở có chống độc | … … |
| đầu chương | mục 21 | Axit hoặc kiềm bắn vào người: cởi ngay quần áo nhiễm, rửa nước chảy nhiều, mắt thì banh mi ra rửa đủ lâu | … … |
| đầu chương | mục 22 | Nắng nóng, chóng mặt buồn nôn, không ra mồ hôi hoặc lú lẫn: đưa ngay vào chỗ mát, cởi bớt áo, làm mát bằng nước, người lú lẫn thì không cho uống, gọi 115 | … … |
| đầu chương | mục 23 | Người say nắng còn tỉnh: cho uống nước muối loãng hoặc dung dịch bù nước từng ngụm nhỏ, không uống ừng ực, không rượu, không nước ngọt đậm | … … |
| đầu chương | mục 24 | Cháy nhà: bò sát mặt đất, sờ mu bàn tay lên cửa trước khi mở, cửa nóng thì không mở, đi cầu thang bộ, ra rồi không quay lại | … … |
| đầu chương | mục 25 | Thấy người đuối nước: gọi người và gọi 115, đưa sào hoặc vật nổi, không tự nhảy xuống | … … |
| đầu chương | mục 26 | Người hóc dị vật không nói được: từ 1 tuổi trở lên thì đứng sau lưng, 5 lần vỗ lưng xen 5 lần ấn bụng; ngã xuống thì ép tim | … … |
| đầu chương | mục 27 | Lạc ở núi, rừng biên giới hay bãi biển vắng không có sóng: ở yên tại chỗ hoặc cạnh xe, báo vị trí trước, che nắng giữ ấm, tiết kiệm nước, không đi lung tung | … … |
| đầu chương | mục 28 | Run rẩy, nói ngọng, đi loạng choạng là hạ thân nhiệt: thay quần áo ướt, ủ ấm, làm ấm từ thân trước, cho uống nước ấm, không rượu | … … |
| đầu chương | mục 29 | Bị rắn cắn: ngồi yên, tháo nhẫn và đồng hồ, tới cơ sở có huyết thanh kháng nọc; không rạch, không hút, không buộc ga-rô | … … |
| đầu chương | mục 30 | Động đất: nhà đủ khả năng chịu động đất thì núp tại chỗ, nhà cũ dễ sập mà cửa cách vài bước thì ra ngoài | … … |
| đầu chương | mục 31 | Gặp gấu, lợn rừng, đàn chó dại: không chạy, nghiêng người lùi chậm | … … |
| đầu chương | mục 32 | Giông sét khi ở ngoài trời: vào ô tô có mui cứng hoặc vào nhà, tránh đỉnh núi, cây đơn độc, mặt nước và vật kim loại | … … |
| đầu chương | mục 33 | Lên vùng cao: tăng dần độ cao chỗ ngủ, triệu chứng nặng lên thì xuống thấp, không cố chịu | … … |
| đầu chương | mục 34 | Bị ve bám: dùng nhíp mũi nhọn kẹp sát da kéo đều, không bôi dầu, không đốt | … … |
| đầu chương | mục 35 | Nước ở ngoài trời phải đun sôi mới uống, sôi một phút là đủ ở độ cao thường gặp | … … |
| đầu chương | mục 36 | Bị người lạ chặn đường đòi tiền ở nơi vắng: đưa tiền, không đánh lại, nhớ đặc điểm, thoát ra rồi gọi 113 | … … |
| đầu chương | mục 37 | Gặp một nhóm đang đánh nhau: lùi ra, không can, không đứng xem, không nhặt vũ khí; muốn báo thì lùi tới chỗ an toàn rồi gọi 113 | … … |
| đầu chương | mục 38 | Có nguy cơ phơi nhiễm HIV: tới cơ sở y tế trong 72 giờ, càng sớm càng tốt | … … |
| đầu chương | mục 39 | Cứu người mà bị thương hoặc mất tiền: tìm người gây thiệt hại và dùng bảo hiểm, rồi làm hồ sơ khen thưởng theo quy định | … … |
| đầu chương | mục 40 | Vật sắc như dao, thanh sắt, mảnh kính đâm vào người: ấn quanh vật để cầm máu, tuyệt đối không rút ra | … … |
| đầu chương | mục 41 | Nghi gãy xương: không động vào chỗ gãy, nẹp giữ nguyên tư thế, chườm lạnh không quá 20 phút, không tự nắn | … … |
| đầu chương | mục 42 | Bị xâm hại tình dục: tới nơi an toàn rồi gọi 113; trước khi khám thì không tắm, không giặt quần áo, không dọn phòng; tới bệnh viện trong 72 giờ | … … |
| đầu chương | mục 43 | Trẻ dưới 1 tuổi hóc dị vật, khóc không ra tiếng: cho nằm sấp vỗ lưng 5 lần, lật lại ấn ngực 5 lần, lặp lại, không ấn bụng | … … |
| đầu chương | mục 44 | Trẻ dưới 1 tuổi không phản ứng, không thở bình thường: bật loa ngoài gọi 115, ép tim và thổi ngạt theo tỷ lệ 30 lần ép, 2 lần thổi | … … |
| đầu chương | mục 45 | Trẻ nuốt pin cúc áo, hoặc nuốt từ hai viên nam châm mạnh trở lên: đi ngay bệnh viện có nội soi, không đợi tự thải, không gây nôn | … … |
| đầu chương | mục 46 | Người say rượu: cho nằm nghiêng, có người trông liên tục, không để ngủ một mình; gọi không tỉnh, thở chậm hoặc không đều, co giật, người lạnh thì gọi 115 | … … |
| đầu chương | mục 47 | Ngón tay, ngón chân bị đứt lìa: ấn cầm máu, phần đứt bọc gạc ẩm cho vào túi kín, túi ngâm nước đá, tới bệnh viện có vi phẫu | … … |
| đầu chương | mục 48 | Răng vĩnh viễn bị rơi cả chiếc: cầm phần thân răng rửa nhẹ, đặt lại được thì đặt lại, không thì ngâm trong sữa, đi khám răng ngay; răng sữa thì không đặt lại | … … |
| mục 45 | mục 43 | Trẻ dưới 1 tuổi hóc dị vật, khóc không ra tiếng: cho nằm sấp vỗ lưng 5 lần, lật lại ấn ngực 5 lần, lặp lại, không ấn bụng | …ở, tím tái thì xử trí hóc dị vật trước theo … |
| mục 47 | mục 12 | Chảy máu nhiều: ấn mạnh lên vết thương, nếu ở tay chân mà ấn không cầm được máu thì đặt dây ga rô, gọi 115 | … nới garo và tới viện trong vòng 2 giờ, còn … |

## 14-nhung-tai-khoan-va-du-lieu-cua-ban

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Mật khẩu đúng mà vẫn mất tài khoản: bật xác thực hai lớp, chọn cách xác nhận hiện trên máy thay vì tin nhắn | … … |
| đầu chương | mục 2 | Một mật khẩu dùng cho mọi nơi: đặt mật khẩu riêng cho hộp thư, vì đó là chỗ lấy lại tất cả | … … |
| đầu chương | mục 3 | Điện thoại trong tay người khác: đặt mã khóa màn hình và mã PIN cho SIM, đừng để họ đọc được tin nhắn | … … |
| đầu chương | mục 4 | Mất điện thoại: khóa SIM trước, rồi tới tài khoản ngân hàng, rồi mới đổi mật khẩu | … … |
| đầu chương | mục 5 | Thẻ bị trừ tiền mà mình không mua: gọi khóa thẻ trước, rồi gửi yêu cầu tra soát bằng văn bản | … … |
| đầu chương | mục 6 | Vào mục thiết bị và ứng dụng bên thứ ba, đăng xuất máy lạ rồi thu hồi từng quyền truy cập | … … |
| đầu chương | mục 7 | Nút "đồng ý tất cả": gỡ dấu từng mục đích, chỉ giữ mục bạn thật sự dùng, và chụp lại màn hình | … … |
| đầu chương | mục 8 | Đòi xem, xin bản sao, sửa và xóa dữ liệu: gửi một email nêu đúng quyền và đếm ngày | … … |
| đầu chương | mục 9 | Chuyển tiền cho người khác trên 10 triệu: ngân hàng buộc khớp khuôn mặt, đừng tìm dịch vụ "mở khóa" | … … |
| đầu chương | mục 10 | Dán mã nguồn vào ô chat của dịch vụ AI: khóa bí mật và dữ liệu khách hàng coi như đã ra nước ngoài | … … |
| đầu chương | mục 11 | Mỗi năm một lần, tự tra xem mình đang đứng tên bao nhiêu thuê bao di động | … … |
| đầu chương | mục 12 | Đổi số điện thoại: giữ số cũ sống tới khi đổi xong ở ngân hàng và VNeID, rồi mới trả số | … … |

## 15-thue-va-mua-nha

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Hợp đồng thuê chỉ ghi giá thuê: chép đủ mười một nội dung của Điều 163, nhất là tiền cọc và hạn trả cọc | … … |
| đầu chương | mục 2 | Chủ nhà cắt điện, thay khóa để đuổi: gửi văn bản yêu cầu khôi phục và lập biên bản trước, đừng dọn đi trong đêm | … … |
| đầu chương | mục 3 | Trả tiền cọc và tiền thuê: chỉ trả cho người đứng tên trên giấy chứng nhận hoặc người có giấy ủy quyền, và ghi rõ nội dung chuyển khoản | … … |
| đầu chương | mục 4 | Thuê phòng trong nhà chia phòng: hỏi tòa nhà đó có bao nhiêu căn hộ và xin xem giấy nghiệm thu phòng cháy trước khi đặt cọc | … … |
| đầu chương | mục 5 | Nhà bị bán khi đang thuê: hợp đồng thuê đi theo nhà, chủ mới phải cho bạn ở tới hết hạn | … … |
| đầu chương | mục 6 | Ký trước khi xem sổ: mở trang thay đổi của Giấy chứng nhận, đối chiếu tên người ký, và hỏi thẳng chuyện thế chấp | … … |
| đầu chương | mục 7 | Trả tiền nhà: chuyển khoản vào tài khoản đứng tên người trong hợp đồng, ghi rõ trả cho hợp đồng nào, và giữ lệnh chuyển | … … |
| đầu chương | mục 8 | Mua qua sàn: tiền vào tài khoản chủ nhà hoặc chủ đầu tư, sàn chỉ đứng ở vai hỗ trợ | … … |
| đầu chương | mục 9 | Nhà chia phòng: luật không đặt mét vuông tối thiểu cho phòng cho thuê, nhưng đặt điều kiện an toàn và mốc 20 căn hộ | … … |
| đầu chương | mục 10 | Nhà hình thành trong tương lai: đặt cọc không quá 5%, thanh toán theo tiến độ, có thư bảo lãnh mới chuyển tiền | … … |
| đầu chương | mục 11 | Hợp đồng mẫu và phụ lục: in bản đã công khai ra, so từng dòng, và ký phụ lục cùng lúc với hợp đồng | … … |
| đầu chương | mục 12 | Chậm bàn giao: mức phạt phải ghi theo ngày, và giữ lại 30% tới lúc nhận nhà | … … |
| đầu chương | mục 13 | Trước khi đặt bút: xem quy hoạch, xem giải chấp, xem văn bản đủ điều kiện bán | … … |
| đầu chương | mục 14 | Ký xong: kiểm tra thế chấp đã vào hồ sơ đất chưa, vì ghi rồi mới có hiệu lực với người thứ ba | … … |
| đầu chương | mục 15 | Lãi suất thả nổi: ghi công thức điều chỉnh vào hợp đồng trước khi ký, và xin cơ cấu lại trong mười ngày kể từ ngày đến hạn | … … |
| đầu chương | mục 16 | Vay ưu đãi nhà ở xã hội: thử Ngân hàng Chính sách xã hội trước khi ký hợp đồng vay thương mại | … … |
| đầu chương | mục 17 | Phí quản lý chung cư: đòi khung giá của tỉnh và hóa đơn, và biết rằng cắt điện để ép đóng phí là cắt điện trái quy định | … … |
| đầu chương | mục 18 | Nhận nhà: đòi bốn loại giấy trước khi ký biên bản bàn giao, và tính hạn bảo hành từ ngày nghiệm thu | … … |
| mục 17 | mục 3 | Trả tiền cọc và tiền thuê: chỉ trả cho người đứng tên trên giấy chứng nhận hoặc người có giấy ủy quyền, và ghi rõ nội dung chuyển khoản | … Điều 3 cùng … |

## 16-benh-man-tinh-song-tiep-the-nao

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Uống thuốc đủ theo đơn: xin đơn dài ngày cho bệnh mạn tính đã ổn định, và lĩnh thuốc trong 5 ngày | … … |
| đầu chương | mục 2 | Đi khám đúng hẹn: giữ đơn cũ, ghi chỉ số vào một cuốn sổ, và xin bản tóm tắt hồ sơ bệnh án | … … |
| đầu chương | mục 3 | Không bỏ thuốc để thử thực phẩm bảo vệ sức khỏe: đọc cụm từ bắt buộc trên nhãn và biết đơn thuốc không được ghi sản phẩm đó | … … |
| đầu chương | mục 4 | Tiêm chủng và khám sức khỏe định kỳ: người có bệnh mạn tính thuộc diện khám miễn phí ít nhất mỗi năm một lần | … … |
| đầu chương | mục 5 | Đăng ký nơi khám ban đầu ở trạm y tế hoặc phòng khám gần nhà: mức hưởng tính theo cấp nơi bạn tới, không theo tỉnh | … … |
| đầu chương | mục 6 | Đơn thuốc ngoại trú: 30 ngày mỗi thuốc, bệnh mạn tính trong danh mục lên 90 ngày, và 5 ngày để lĩnh thuốc | … … |
| đầu chương | mục 7 | Khám định kỳ ở trạm y tế xã: hưởng 100% chi phí, và trạm là nơi giữ hồ sơ bệnh mạn tính của bạn | … … |
| đầu chương | mục 8 | Kết quả xét nghiệm ở bệnh viện khác: xin bản tóm tắt hồ sơ bệnh án, và biết rằng chỉ một danh mục được công nhận | … … |
| đầu chương | mục 9 | Biến chứng mắt: khám đáy mắt theo mốc của từng típ đái tháo đường, không chờ tới lúc nhìn mờ | … … |
| đầu chương | mục 10 | Bệnh thận: mỗi năm một lần xét nghiệm albumin trong nước tiểu, và mốc 3 tháng để gọi là bệnh thận mạn | … … |
| đầu chương | mục 11 | Bàn chân: cởi tất để bác sĩ xem cả hai bàn chân mỗi lần khám, và mốc tái khám tính theo mức nguy cơ loét | … … |
| đầu chương | mục 12 | Gút: acid uric trên 420 ở nam (nữ có ngưỡng riêng) mới là ngưỡng gợi ý, còn mục tiêu điều trị lại thấp hơn ngưỡng đó | … … |
| đầu chương | mục 13 | Viêm gan B: xét nghiệm HBsAg một lần, rồi giữ nhịp tầm soát ung thư gan theo đúng việc đang điều trị hay chưa | … … |
| đầu chương | mục 14 | Bệnh phổi tắc nghẽn mạn tính (COPD): hít đúng bốn bước, và tập phục hồi chức năng đủ 6–8 tuần | … … |
| mục 11 | mục 4 | Tiêm chủng và khám sức khỏe định kỳ: người có bệnh mạn tính thuộc diện khám miễn phí ít nhất mỗi năm một lần | … Phần 8 … |

## 17-trong-nha-co-nguoi-cao-tuoi

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 4 | Tiền dưỡng già: một tài khoản hai tên mở ở quầy, nguyên tắc mọi lệnh phải có cả hai, và một câu từ chối tập sẵn | … Chốt đầu tiên về tiền nằm ở … |
| đầu chương | mục 1 | Ủy quyền: làm giấy khi ông bà còn ký được, ghi rõ việc được làm và ghi rõ thời hạn | … … |
| đầu chương | mục 2 | Di chúc: viết khi còn minh mẫn, bản sau thay bản trước, và công chứng không khóa di chúc lại | … … |
| đầu chương | mục 3 | Giám hộ: khi ông bà không còn tự quyết thì phải có quyết định của tòa, và phần chuẩn bị làm được từ trước | … … |
| đầu chương | mục 4 | Tiền dưỡng già: một tài khoản hai tên mở ở quầy, nguyên tắc mọi lệnh phải có cả hai, và một câu từ chối tập sẵn | … … |
| đầu chương | mục 5 | Huy động vốn lãi cao: bốn câu kiểm được trước khi ông bà đưa tiền | … … |
| đầu chương | mục 6 | "Thế chấp nhà để lấy lương hưu": Việt Nam không có sản phẩm đó | … … |
| đầu chương | mục 7 | Khi ông bà mất khả năng tự chăm: 540.000 đồng, thẻ bảo hiểm y tế, và hợp đồng ủy nhiệm chăm sóc | … … |
| đầu chương | mục 8 | Loét do nằm lâu: nhìn da ở ba chỗ xương lồi mỗi ngày, và trở mình theo giờ | … … |
| đầu chương | mục 9 | Đục thủy tinh thể: chỉ định mổ tính bằng việc mắt còn làm được gì, không bằng một con số thị lực | … … |
| đầu chương | mục 10 | Dắt chó và chấn thương: một tay giữ dây, và ngã ở tuổi 60 thì đi chụp phim ngay | … … |
| đầu chương | mục 11 | Nhà dưỡng lão: tra cơ sở trong danh sách đang hoạt động, và đọc hợp đồng theo mẫu trước khi ký | … … |
| đầu chương | mục 12 | Nghỉ chăm cha mẹ ốm: không có chế độ riêng, nên dùng phép năm và thỏa thuận nghỉ không lương | … … |
| đầu chương | mục 13 | Sa sút trí tuệ: quên gần, lạc đường, giảm chức năng là việc phải đi khám, không phải "lẫn tuổi già" | … … |
| mục 4 | mục 2 | Di chúc: viết khi còn minh mẫn, bản sau thay bản trước, và công chứng không khóa di chúc lại | …pháp luật, tức lại quay về giấy tờ thừa kế (… |
| mục 4 | mục 3 | Giám hộ: khi ông bà không còn tự quyết thì phải có quyết định của tòa, và phần chuẩn bị làm được từ trước | …(mục 2) và giám hộ theo quyết định của tòa (… |
| mục 9 | mục 5 | Huy động vốn lãi cao: bốn câu kiểm được trước khi ông bà đưa tiền | … Phần D … |
| mục 9 | mục 4 | Tiền dưỡng già: một tài khoản hai tên mở ở quầy, nguyên tắc mọi lệnh phải có cả hai, và một câu từ chối tập sẵn | … Phần D … |
| mục 10 | mục 8 | Loét do nằm lâu: nhìn da ở ba chỗ xương lồi mỗi ngày, và trở mình theo giờ | …ài ngày là thêm một vết loét do tì đè, đúng … |

## 18-nuoi-con-tien-bac-va-thoi-gian

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Năm khoản pháp luật trả thay khi sinh con, và mức đang áp dụng | … … |
| đầu chương | mục 2 | Nghỉ thai sản: 06 tháng, con thứ hai 07 tháng, và 05 đến 14 ngày của người cha | … … |
| đầu chương | mục 3 | Mang thai không phải lý do để bị sa thải, cắt lương hay đổi sang việc xấu hơn | … … |
| đầu chương | mục 4 | Thời gian bị chiếm: sáu tháng của mẹ, 05 đến 14 ngày của cha, và phần không ai trả | … … |
| đầu chương | mục 5 | Ba giai đoạn chi phí: 0–3 tuổi, chín năm bắt buộc, và phần sau bắt buộc | … … |
| đầu chương | mục 6 | Sinh vì cha mẹ, vì hôn nhân, vì dưỡng lão: ba kỳ vọng và chỗ pháp luật không hứa thay | … … |
| đầu chương | mục 7 | Tuổi sinh và việc đi khám: mốc 35, gói sàng lọc bốn bệnh, và phần không có số | … … |

## 19-dang-lam-nghi-viec-va-tai-nan-lao-dong

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Làm thêm giờ: ba mức 150%, 200%, 300% và ba cái trần quyết định số tiền | … … |
| đầu chương | mục 2 | Phép năm: 12, 14, 16 ngày, thêm 01 ngày mỗi 05 năm, và không có mức 300% nào để quy đổi | … … |
| đầu chương | mục 3 | Thử việc: 180, 60, 30, 6 ngày, ít nhất 85% lương, và chỉ một lần cho một công việc | … … |
| đầu chương | mục 4 | Bị cho nghỉ: nửa tháng lương mỗi năm, hoặc một tháng mỗi năm với sàn 02 tháng | … … |
| đầu chương | mục 5 | Ba con đường cho nghỉ hợp pháp: không đáp ứng, ốm dài, và thay đổi cơ cấu | … … |
| đầu chương | mục 6 | Cho nghỉ trái luật: nhận lại việc, 02 tháng lương, và 01 năm để kiện | … … |
| đầu chương | mục 7 | Đừng ký "đơn xin nghỉ vì lý do cá nhân" khi người đưa tờ đơn là người muốn bạn đi | … … |
| đầu chương | mục 8 | Giữ chứng cứ trước khi rời: bảng lương, chấm công, quyết định, và một lá đơn yêu cầu bản sao | … … |
| đầu chương | mục 9 | Khám sức khỏe định kỳ và khám phát hiện bệnh nghề nghiệp: 06 tháng một lần với nghề độc hại, và kết quả phải đến tay bạn | … … |
| đầu chương | mục 10 | Quyền từ chối công việc không bảo đảm an toàn: được trả đủ lương, nhưng phải báo ngay và đúng người | … … |
| đầu chương | mục 11 | Khai báo tai nạn lao động: báo ngay trong ngày, không chờ đủ giấy tờ | … … |
| đầu chương | mục 12 | Cấp cứu trước, giấy tờ sau: không ai được bắt người bị nạn chờ thủ tục | … … |
| đầu chương | mục 13 | Đơn vị không đóng bảo hiểm tai nạn: chế độ vẫn còn, chỉ đổi người trả | … … |
| đầu chương | mục 14 | Giám định mức suy giảm: 5% là ngưỡng, và mỗi 1% đổi thành tiền | … … |
| đầu chương | mục 15 | Chết do tai nạn lao động: bốn khoản tiền, và khoản thứ tư hay bị bỏ | … … |
| đầu chương | mục 16 | Bị bắt nạt ở nơi làm việc: ghi lại trước, rồi chọn cửa | … … |
| đầu chương | mục 17 | Giấy xác nhận thôi việc: 14 ngày, và ba thứ phải đòi cùng lúc | … … |
| đầu chương | mục 18 | Thuế với trợ cấp thôi việc: phần đúng luật không tính, phần thêm thì tính | … … |
| đầu chương | mục 19 | Đổi tỉnh, đổi việc: giữ thời gian đóng, đừng rút bảo hiểm xã hội một lần | … … |
| đầu chương | mục 20 | Hợp đồng lao động: ký bằng văn bản trước ngày làm việc đầu tiên, và giữ một bản trong tay | … … |
| đầu chương | mục 21 | Đơn vị không đóng bảo hiểm: kiểm sổ mỗi quý và đòi bằng văn bản, mức phạt đang áp dụng | … … |
| đầu chương | mục 22 | Điều khoản phạt vi phạm trong hợp đồng lao động: ba khoản được trừ và trần 30% lương tháng | … … |
| đầu chương | mục 23 | Điều chuyển công việc và giảm lương: 60 ngày, 85%, và 30 ngày giữ lương cũ | … … |
| đầu chương | mục 24 | Làm qua công ty cho thuê lại: 12 tháng, ký quỹ 2 tỷ, và 20 công việc được phép | … … |
| mục 13 | mục 3 | Thử việc: 180, 60, 30, 6 ngày, ít nhất 85% lương, và chỉ một lần cho một công việc | …ao động, bệnh nghề nghiệp theo quy định tại … |
| mục 13 | mục 3 | Thử việc: 180, 60, 30, 6 ngày, ít nhất 85% lương, và chỉ một lần cho một công việc | … Ba chế độ trong … |
| mục 24 | mục 20 | Hợp đồng lao động: ký bằng văn bản trước ngày làm việc đầu tiên, và giữ một bản trong tay | …0 đồng, thời hạn giấy phép 60 tháng và danh … |
| mục 24 | mục 20 | Hợp đồng lao động: ký bằng văn bản trước ngày làm việc đầu tiên, và giữ một bản trong tay | …một công ty dịch vụ nhân sự, trong khi danh … |

## 20-cham-tre-so-sinh

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Ngủ an toàn: nằm ngửa, mặt phẳng cứng, cùng phòng nhưng khác giường | … … |
| đầu chương | mục 2 | Mũi vắc-xin viêm gan B trong 24 giờ đầu: miễn phí, và phải hỏi trước khi ra viện | … … |
| đầu chương | mục 3 | Lịch tiêm chủng mở rộng và tiêm bù: lịch đã đổi, trễ thì tiêm bù chứ không tiêm lại từ đầu | … … |
| đầu chương | mục 4 | Bú mẹ hoàn toàn 6 tháng, ăn bổ sung từ 6 tháng, bú tiếp đến 24 tháng | … … |
| đầu chương | mục 5 | Pha sữa công thức: nước không dưới 70 °C, dùng trong 2 giờ, không hâm lại | … … |
| đầu chương | mục 6 | Không cho trẻ dưới 1 tuổi ăn mật ong, kể cả khi trẻ ho | … … |
| đầu chương | mục 7 | Tiêm vitamin K: một mũi trong ngày đầu, và câu hỏi phải hỏi trước khi rời viện | … … |
| đầu chương | mục 8 | Sốt ở trẻ dưới 3 tháng: 38°C là đi khám ngay, kể cả khi trẻ vẫn bú | … … |
| đầu chương | mục 9 | Không rung lắc trẻ: đặt trẻ xuống rồi ra khỏi phòng, thay vì lắc cho nín | … … |
| đầu chương | mục 10 | Chọn tã: cỡ theo cân nặng, và đừng tin dấu “đạt chuẩn” trên bao | … … |
| đầu chương | mục 11 | Đồ dùng lớn: mượn trước, cũ sau, mới sau cùng — trừ ghế ô tô | … … |
| đầu chương | mục 12 | Dị ứng đậu phộng: trẻ chàm nặng hoặc đã dị ứng trứng không tự cho ăn ở nhà, và cũng đừng tránh cả đời | … … |
| đầu chương | mục 13 | Vàng da sơ sinh: bốn dấu hiệu đi viện trong ngày, không chờ thêm hôm nào | … … |
| đầu chương | mục 14 | Mẹ đang ăn chay khi mang thai và cho con bú: B12 là chỗ hụt, và bữa ăn dặm phải có đạm động vật | … … |
| đầu chương | mục 15 | Xe tập đi có bánh: Việt Nam không cấm bán, nhưng khuyến cáo nhi khoa là không dùng | … … |
| đầu chương | mục 16 | Vitamin D: 400 đơn vị mỗi ngày, và đừng tự tăng liều | … … |
| đầu chương | mục 17 | Nước tắm: pha lạnh trước rồi mới thêm nóng, và thử bằng khuỷu tay | … … |
| mục 2 | mục 14 | Mẹ đang ăn chay khi mang thai và cho con bú: B12 là chỗ hụt, và bữa ăn dặm phải có đạm động vật | …m gan vi rút B ở vị trí thứ nhất trong danh … |
| mục 3 | mục 14 | Mẹ đang ăn chay khi mang thai và cho con bú: B12 là chỗ hụt, và bữa ăn dặm phải có đạm động vật | … danh … |

## 21-ra-nuoc-ngoai

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Trước khi mua vé: tra khuyến cáo, kiểm hạn hộ chiếu, và biết rằng cửa khẩu không chặn bạn chỉ vì nước đến nguy hiểm | … … |
| đầu chương | mục 2 | Lưu số trực bảo hộ công dân vào ba chỗ, và lưu cả số của cơ quan đại diện nước mình đến | … … |
| đầu chương | mục 3 | Cơ quan đại diện làm được gì và không làm được gì: mười một việc họ không làm | … … |
| đầu chương | mục 4 | Bảo hiểm ra nước ngoài: đọc hai dòng là giới hạn trách nhiệm và điều khoản vận chuyển y tế | … … |
| đầu chương | mục 5 | "Việc nhẹ lương cao": kiểm giấy phép, trần tiền dịch vụ, và hợp đồng trước khi đưa hộ chiếu | … … |
| đầu chương | mục 6 | Mang tiền mặt qua cửa khẩu: ngưỡng phải khai và ngưỡng phải có giấy xác nhận là hai chuyện khác nhau | … … |
| đầu chương | mục 7 | Sao lưu hộ chiếu và visa: hai ngày để báo mất, và ba mốc thời gian khi làm lại ở nước ngoài | … … |
| đầu chương | mục 8 | Giấy phép lái xe quốc tế: chỉ bản theo Công ước Viên mới có giá trị, và thông tư cũ đã bị thay | … … |
| đầu chương | mục 9 | Thuê làm visa, du học, định cư: chỗ có giấy phép tra được, chỗ không có thì đọc hợp đồng | … … |
| đầu chương | mục 10 | Không cho mượn hộ chiếu, không cho người lạ dùng tên mình làm thủ tục xuất nhập cảnh | … … |
| đầu chương | mục 11 | Trước khi đi, gửi lịch trình và số hộ chiếu cho một người ở nhà, rồi thống nhất nhịp báo tin | … … |
| đầu chương | mục 12 | Mang thuốc theo người: ra nước ngoài theo luật nước đến, vào Việt Nam theo hạn mức 7 ngày và 10 ngày | … … |
| đầu chương | mục 13 | Mang đồ ăn về nước: đồ tươi sống hay mới sơ chế thì đừng mang, đồ chế biến sẵn không quá 5 kg mới được miễn kiểm dịch | … … |

## 22-nghi-ngoi-va-giai-tri

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 6 | Người đủ tiêu chuẩn trầm cảm: đi bộ nhanh hoặc chạy, tính trung bình trong các nghiên cứu thì hiệu quả tăng theo cường độ | …tâm trạng, bằng chứng đều có giới hạn, và ở … |
| đầu chương | mục 1 | Vào quán karaoke hay bar thì nhìn lối thoát hiểm trước, cửa bị khóa thì đổi quán | … … |
| đầu chương | mục 2 | Gọi món thì xin bảng giá trước: bán cao hơn giá đã niêm yết là vi phạm | … … |
| đầu chương | mục 3 | Trong quán có người mời thử "đồ" thì đứng dậy đi, đừng ngồi lại xem | … … |
| đầu chương | mục 4 | Không nhận đồ ăn, điếu hay pod từ người lạ; ly đã rời mắt thì đổi ly khác | … … |
| đầu chương | mục 5 | Phòng giải đố, nhà ma: hỏi lối ra thứ hai trước khi trả tiền | … … |
| đầu chương | mục 6 | Người đủ tiêu chuẩn trầm cảm: đi bộ nhanh hoặc chạy, tính trung bình trong các nghiên cứu thì hiệu quả tăng theo cường độ | … … |
| đầu chương | mục 7 | Đã được chẩn đoán lo âu: trong một thử nghiệm, khóa chánh niệm 8 tuần có người dạy không kém thuốc escitalopram, nhưng đừng tự ngừng thuốc | … … |
| đầu chương | mục 8 | Muốn có một bài thở hạ căng thẳng: 5 phút thở kiểu "thở dài có chủ ý" mỗi ngày, bài báo đo kết quả sau 28 ngày | … … |
| đầu chương | mục 9 | Giữ việc gặp người khác đều đặn, đừng đợi buồn mới tìm ai | … … |
| đầu chương | mục 10 | Chọn chỗ ở thì tính mảng xanh quanh nhà, nhưng đừng tưởng đi công viên là tăng thọ | … … |
| đầu chương | mục 11 | Đã uống rượu thì đừng xông hơi, đừng ngâm bồn nóng, về nhà cũng đừng tắm nước nóng | … … |
| đầu chương | mục 12 | Trượt tuyết, trượt ván, patin, đạp xe địa hình: đội mũ bảo hiểm, đừng đội mũ rởm | … … |
| mục 4 | mục 3 | Trong quán có người mời thử "đồ" thì đứng dậy đi, đừng ngồi lại xem | … hay một pod ngay trong quán thì xử lý theo … |
| mục 8 | mục 6 | Người đủ tiêu chuẩn trầm cảm: đi bộ nhanh hoặc chạy, tính trung bình trong các nghiên cứu thì hiệu quả tăng theo cường độ | … So với hai … |
| mục 9 | chương 3 mục 16 | Bớt những quan hệ làm mình hao, tập nói "không" với yêu cầu mình không muốn nhận | …bớt tiếp xúc với người khiến mình kiệt sức (… |
| mục 11 | chương 1 mục 12 | Trẻ gần nước phải có người lớn trong tầm tay; đi thuyền, đi đò, tắm sông hồ thì mặc áo phao | …gọi 115 nếu thấy ai nằm bất động trong bồn (… |

## 23-hoc-gi-thi-dang

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 14 | Học xong một bài thì gấp sách lại tự trả lời, đừng mở ra đọc lại ngay | … Bảy mục A gần như đều nằm ở nhóm cách học (… |
| đầu chương | mục 15 | Cùng chừng ấy giờ, chia ra nhiều ngày thay vì học một mạch | … Bảy mục A gần như đều nằm ở nhóm cách học (… |
| đầu chương | mục 16 | Đừng lấy tô màu, gạch chân và đọc lại làm cách học chính | … Bảy mục A gần như đều nằm ở nhóm cách học (… |
| đầu chương | mục 17 | Trộn vài dạng bài vào nhau, nhưng chỉ với loại nội dung cần phân biệt dạng | … Bảy mục A gần như đều nằm ở nhóm cách học (… |
| đầu chương | mục 18 | Đừng chia người học thành kiểu nhìn, kiểu nghe rồi dạy theo kiểu đó | … Bảy mục A gần như đều nằm ở nhóm cách học (… |
| đầu chương | mục 19 | Tự ra đề theo đúng cách mình sẽ phải dùng, không chỉ đọc lại cho thuộc | … Bảy mục A gần như đều nằm ở nhóm cách học (… |
| đầu chương | mục 7 | Mốc để so các khóa học: thêm một năm đi học, thu nhập của chính người học cao hơn khoảng 9% | … đến 19) và một mục ở nhóm lợi tức học vấn (… |
| đầu chương | mục 1 | Dưới 16 tuổi vẫn được đi làm, nhưng chỉ việc nhẹ hoặc việc luật cho phép theo từng nhóm tuổi: thuê sai bị phạt tới 150 triệu đồng | … … |
| đầu chương | mục 2 | Mỗi năm học thêm đi kèm nguy cơ tử vong của người lớn thấp hơn trung bình khoảng 1,9% | … … |
| đầu chương | mục 3 | Trước khi nói bằng đại học mất giá, nhìn cơ cấu: khoảng 11,6% dân số từ 15 tuổi trở lên có bằng đại học trở lên | … … |
| đầu chương | mục 4 | "Không có tiền học" thường là tính thiếu ba tầng: trần học phí, miễn giảm, và vay | … … |
| đầu chương | mục 5 | Trượt công lập không phải hết đường: từ năm 2026 có thêm chương trình trung học nghề | … … |
| đầu chương | mục 6 | "Đi làm sớm ba năm" lời hay lỗ: viết ra ba con số trước khi quyết | … … |
| đầu chương | mục 7 | Mốc để so các khóa học: thêm một năm đi học, thu nhập của chính người học cao hơn khoảng 9% | … … |
| đầu chương | mục 8 | Trả tiền cho một tấm chứng chỉ thì hỏi trước ba câu: ai cấp, theo văn bản nào, tra được ở đâu | … … |
| đầu chương | mục 9 | Học có người trả tiền hộ: quỹ thất nghiệp trả tới 4,5 triệu đồng một khóa, cộng 50.000 đồng mỗi ngày học | … … |
| đầu chương | mục 10 | Chọn việc khó bị máy thay: việc phải dùng tay, việc phải ra hiện trường, việc phải quyết tại chỗ | … … |
| đầu chương | mục 11 | Kỹ năng có bậc mới lên được giá: khung 8 bậc, chứng chỉ kỹ năng nghề, và cái bậc chỉ có trong khối nhà nước | … … |
| đầu chương | mục 12 | Đừng lấy tin "lương cao" làm bằng chứng thiếu người: hỏi trung tâm dịch vụ việc làm ở tỉnh | … … |
| đầu chương | mục 13 | Chọn khóa ngắn theo một câu hỏi: học xong có vị trí cụ thể nào để nộp đơn ngay không | … … |
| đầu chương | mục 14 | Học xong một bài thì gấp sách lại tự trả lời, đừng mở ra đọc lại ngay | … … |
| đầu chương | mục 15 | Cùng chừng ấy giờ, chia ra nhiều ngày thay vì học một mạch | … … |
| đầu chương | mục 16 | Đừng lấy tô màu, gạch chân và đọc lại làm cách học chính | … … |
| đầu chương | mục 17 | Trộn vài dạng bài vào nhau, nhưng chỉ với loại nội dung cần phân biệt dạng | … … |
| đầu chương | mục 18 | Đừng chia người học thành kiểu nhìn, kiểu nghe rồi dạy theo kiểu đó | … … |
| đầu chương | mục 19 | Tự ra đề theo đúng cách mình sẽ phải dùng, không chỉ đọc lại cho thuộc | … … |
| đầu chương | mục 20 | Trước khi tính chuyện lên hạng, xác định đúng vị trí việc làm và bậc nghề nghiệp của mình | … … |
| đầu chương | mục 21 | Chứng chỉ kế toán phải thi, và thi đạt chưa đủ để mở dịch vụ kế toán | … … |
| đầu chương | mục 22 | Mua bằng giả, dùng bằng giả là tội hình sự; thuê người viết luận rồi dùng kết quả đó cũng có thể kéo theo rủi ro pháp lý | … … |
| đầu chương | mục 23 | Có bậc, có chức danh không đồng nghĩa với tăng lương | … … |
| đầu chương | mục 24 | Học thạc sĩ: trần học phí tính được, còn khoản tăng thu nhập thì phải tự cân | … … |
| đầu chương | mục 25 | Học tiến sĩ: chỉ cân nhắc khi nghề bạn nhắm tới ghi rõ yêu cầu tiến sĩ. | … … |

## 24-di-kham

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Ốm nhẹ thì khám ở trạm y tế trước, rồi để nơi đó chuyển lên: không phải vì luật bắt buộc, mà vì tiền trả khác nhau | … … |
| đầu chương | mục 2 | Cùng một hóa đơn, cấp nơi bạn tới quyết định mức hưởng: cấp ban đầu 100%, cấp cơ bản và cấp chuyên sâu 80%, tự vào nội trú cấp chuyên sâu còn 40% mức hưởng | … … |
| đầu chương | mục 3 | Muốn lên bệnh viện lớn thì xin phiếu chuyển tại nơi đang khám: phiếu dùng trong 10 ngày làm việc, bệnh mạn tính trong danh mục thì 1 năm | … … |
| đầu chương | mục 4 | Khám ở tỉnh khác không phải đăng ký trước, không phải xin ai duyệt: mức hưởng tính theo cấp nơi tới, không còn tính theo tỉnh | … … |
| đầu chương | mục 5 | Mỗi lần khám xong tự giữ một bộ: hồ sơ bệnh án là quyền của bạn, nhưng phải xin bằng văn bản | … … |
| đầu chương | mục 6 | Nghi ngờ cách điều trị: luật không có thủ tục niêm phong hồ sơ, nên làm ba việc có thật | … … |
| đầu chương | mục 7 | Cấp cứu thì vào thẳng khu cấp cứu và tìm bàn phân loại, đừng xếp hàng lấy số | … … |
| đầu chương | mục 8 | Không tiền, không giấy tờ, không nói được mình là ai: cấp cứu vẫn phải làm trước | … … |
| đầu chương | mục 9 | Giám định chỉ có nghĩa khi vết thương đã ổn định | … … |
| đầu chương | mục 10 | Giấy xác nhận khuyết tật xin ở cấp xã, và nó không thay kết luận giám định | … … |
| đầu chương | mục 11 | Cảm ơn bác sĩ bằng thư và bằng đánh giá, đừng bằng phong bì | … … |
| đầu chương | mục 12 | Trước khi đồng ý làm răng, xin bảng giá ghi từng bước và so với giá đã niêm yết | … … |
| đầu chương | mục 13 | Bệnh viện báo hết thuốc trong danh mục bảo hiểm: xin điều chuyển thuốc hoặc xin chuyển sang cơ sở có thuốc, đừng tự mua rồi chờ hoàn | … … |
| đầu chương | mục 14 | Bệnh mạn đã ổn định, muốn xin lại đơn mà không phải đi lại: hỏi bệnh viện đang theo dõi bạn có khám từ xa không, và đừng tính trước khoản bảo hiểm trả | … … |
| đầu chương | mục 15 | Ra viện xin bảng kê chi phí, đối chiếu từng dòng; lệch thì kiến nghị bằng văn bản chứ đừng chỉ nói miệng | … … |

## 25-nguoi-mat-roi-phai-lam-gi

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 5 | Khai tử trong 15 ngày, xóa đăng ký thường trú sau đó: không có hạn nào buộc xong trước đám tang | … … |
| đầu chương | mục 9 | Tiền rải rác phải đi lấy từng chỗ: trợ cấp mai táng, trợ cấp tuất, tiền gửi | … mục 5 (khai tử và xóa đăng ký thường trú), … |
| đầu chương | mục 12 | Thứ tự giấy tờ sau khi mất: khai tử trước, rồi văn bản phân chia di sản, rồi mới sang tên nhà đất và rút tiền | …óa đăng ký thường trú), mục 9 (tiền gửi) và … |
| đầu chương | mục 1 | Trong nhà có người mất: xác định chết bình thường hay bất thường trước khi gọi ai | … … |
| đầu chương | mục 2 | Giấy báo tử và trích lục khai tử: ai cấp, xin ở đâu, trong bao lâu | … … |
| đầu chương | mục 3 | Đưa tang và hỏa táng: cơ sở nào được làm, giá phải niêm yết, giấy tờ phải giữ | … … |
| đầu chương | mục 4 | Nghi ngờ nguyên nhân mất: lên tiếng trước khi an táng, đừng đợi chôn hoặc thiêu xong mới thắc mắc | … … |
| đầu chương | mục 5 | Khai tử trong 15 ngày, xóa đăng ký thường trú sau đó: không có hạn nào buộc xong trước đám tang | … … |
| đầu chương | mục 6 | Xin bảng giá trước khi đặt cọc: giá dịch vụ tang lễ phải niêm yết, và không được thu cao hơn giá đã niêm yết | … … |
| đầu chương | mục 7 | Bị ép mua kèm hay thu thêm ngoài giá niêm yết: xin bảng giá, giữ hóa đơn, rồi khiếu nại | … … |
| đầu chương | mục 8 | Môi giới mai táng không có sổ đăng ký để tra: kiểm bằng đăng ký kinh doanh, hợp đồng, hóa đơn | … … |
| đầu chương | mục 9 | Tiền rải rác phải đi lấy từng chỗ: trợ cấp mai táng, trợ cấp tuất, tiền gửi | … … |
| đầu chương | mục 10 | Tài khoản mạng và dữ liệu của người đã mất: không có luật riêng cho người chết, nên đi bằng giấy tờ thừa kế và yêu cầu bằng văn bản | … … |
| đầu chương | mục 11 | Nợ của người đã mất: người thừa kế chỉ trả trong phạm vi di sản, muốn buông thì phải từ chối bằng văn bản trước khi chia | … … |
| đầu chương | mục 12 | Thứ tự giấy tờ sau khi mất: khai tử trước, rồi văn bản phân chia di sản, rồi mới sang tên nhà đất và rút tiền | … … |

## 26-dung-website-hay-nen-tang

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Đừng để tiền của người mua đi qua tài khoản của bạn rồi mới trả cho người bán | … … |
| đầu chương | mục 2 | Loại nội dung quyết định giấy phép, không phải việc website có thu tiền hay không | … … |
| đầu chương | mục 3 | Livestream và video: không có "giấy phép văn hóa mạng", nhưng mạng xã hội phải có giấy phép mới được mở livestream | … … |
| đầu chương | mục 4 | Máy chủ và tên miền: không có mã ICP, nhưng có ba việc phải làm trước khi chạy | … … |
| đầu chương | mục 5 | Cho người khác bán trên nền tảng của mình: đăng ký trước khi chạy, xác thực người bán, giữ dữ liệu | … … |
| đầu chương | mục 6 | Người dùng đăng gì vi phạm trên nền tảng thì mình phải gỡ: 24 giờ khi có yêu cầu, 48 giờ với khiếu nại | … … |
| đầu chương | mục 7 | Cho người ta viết bài, bình luận, chat thì phải xác thực tài khoản bằng số điện thoại | … … |
| đầu chương | mục 8 | Người dưới 16 tuổi: không có luật riêng cho livestream và tiền thưởng, nhưng có ba tầng chặn | … … |
| đầu chương | mục 9 | Có thông báo xâm phạm bản quyền thì phải gỡ nhanh; không có mốc nào để nội dung tự quay lại | … … |
| đầu chương | mục 10 | Dữ liệu người dùng ra nước ngoài: hồ sơ đánh giá tác động trong 60 ngày, không chia theo số người | … … |
| đầu chương | mục 11 | Chọn máy chủ: xét nghĩa vụ lưu dữ liệu và người trả lời khi hỏng trước, so giá sau | … … |
| đầu chương | mục 12 | Lộ dữ liệu người dùng: chặn lỗ hổng trước, báo cơ quan chuyên trách trong 72 giờ, và báo cả người dùng khi dữ liệu là vị trí, sinh trắc học hay tài chính | … … |
| đầu chương | mục 13 | Bán gói tự động gia hạn: nhắc trước khi hết hạn, nhắc lại trước mỗi lần trừ tiền, và để nút hủy được tìm thấy trong một lần bấm | … … |

## 27-mang-thai-va-sinh-de

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Uống axit folic từ trước khi có thai, không phải từ lúc biết mình có thai | … … |
| đầu chương | mục 2 | Khám thai theo đúng lịch và giữ cuốn sổ khám thai đi theo mình | … … |
| đầu chương | mục 3 | Xét nghiệm HIV, giang mai và viêm gan B ngay từ lần khám thai đầu | … … |
| đầu chương | mục 4 | Suốt thai kỳ không hút thuốc, không uống rượu bia, và người trong nhà cũng vậy | … … |
| đầu chương | mục 5 | Có yếu tố nguy cơ tiền sản giật thì nói với bác sĩ ngay lần khám đầu | … … |
| đầu chương | mục 6 | Sàng lọc đái tháo đường thai kỳ: uống 75 g glucose ở tuần 24–28, đừng bỏ vì ngại chờ | … … |
| đầu chương | mục 7 | Danh sách dấu hiệu phải đi viện ngay, và nó còn đúng trong cả năm đầu sau sinh | … … |
| đầu chương | mục 8 | Vỡ ối: nằm xuống, kê cao mông, gọi 115 — đừng đi lại, đừng tắm, đừng đợi cơn đau | … … |
| đầu chương | mục 9 | Giảm đau khi sinh: hỏi từ buổi khám thai, đừng đợi tới lúc đau mới nói | … … |
| đầu chương | mục 10 | Mổ lấy thai: làm khi có chỉ định, đừng chọn ngày đẹp hay giờ tốt | … … |
| đầu chương | mục 11 | Bảo hiểm thai sản: bảo hiểm xã hội trả tiền nghỉ, bảo hiểm y tế trả viện phí | … … |
| đầu chương | mục 12 | Giấy chứng sinh và giấy khai sinh: hai tờ giấy, hai nơi cấp, đừng gộp làm một | … … |
| đầu chương | mục 13 | Sàng lọc sơ sinh: lấy máu gót chân, đo thính lực, đo độ bão hòa oxy | … … |
| đầu chương | mục 14 | Thẻ bảo hiểm y tế cho trẻ: ngân sách đóng, không cần chờ có hộ khẩu | … … |
| đầu chương | mục 15 | Đăng ký khai sinh: 60 ngày, làm ở xã nơi cha hoặc mẹ cư trú, không phải về quê | … … |
| đầu chương | mục 16 | Khám lại sau sinh: đừng bỏ mốc sáu tuần, và nói thẳng chuyện tâm trạng | … … |
| đầu chương | mục 17 | Có bầu không phải bỏ mèo: thứ đáng sợ là thịt chưa chín, đồ muối sống và đất bẩn | … … |
| đầu chương | mục 18 | Mang thai mà vào mùa cúm thì đi tiêm vaccine cúm; ở Việt Nam đây là mũi dịch vụ, không nằm trong danh mục bắt buộc | … … |
| đầu chương | mục 19 | Từ tuần 28, đi ngủ thì nằm nghiêng; nửa đêm thấy mình nằm ngửa thì chỉ cần xoay lại | … … |
| đầu chương | mục 20 | Sau sinh thì tránh thai từ lần quan hệ đầu; muốn sinh tiếp thì đợi ít nhất 18 tháng | … … |

## 28-dung-vi-ngoai-hinh-pha-suc-khoe

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Đừng giảm cân bằng cách ăn quá ít, nhịn ăn hay móc họng; muốn giảm thì hãy tăng vận động | … … |
| đầu chương | mục 2 | Tiêm, chích, bơm hay mổ để đổi ngoại hình là khám chữa bệnh: xem giấy phép hoạt động của cơ sở và phạm vi hành nghề của người cầm kim trước khi trả tiền | … … |
| đầu chương | mục 5 | Đừng dùng thuốc đồng hóa steroid để lên cơ | … … |
| đầu chương | mục 6 | Muốn dùng thuốc giảm cân hoặc thuốc tiêm giảm cân thì đi khám để lấy đơn, đừng đặt qua mạng | … … |
| đầu chương | mục 7 | Thuốc nội tiết sinh dục: chỉ dùng khi có đơn và có lịch xét nghiệm, đừng tự mua và tự tăng liều | … … |
| đầu chương | mục 10 | Kem trị nám và kem làm trắng: tra số tiếp nhận Phiếu công bố trên cổng của Cục Quản lý Dược trước khi bôi, đừng mua kem trộn | … mục 5 đến 7 và … |
| đầu chương | mục 8 | Nếu chuyện "thấy mình xấu" đã thành soi gương nhiều lần và nghĩ mãi chuyện sửa, hãy đi khám tâm lý một lần trước khi bàn tới dao kéo | … … |
| mục 3 | mục 2 | Tiêm, chích, bơm hay mổ để đổi ngoại hình là khám chữa bệnh: xem giấy phép hoạt động của cơ sở và phạm vi hành nghề của người cầm kim trước khi trả tiền | … Ngoài chuyện trái phép đã nói ở … |

## 29-ung-pho-sau-cu-soc-lon

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 12 | Sau cú sốc, ba tháng đầu hãy hoãn mọi quyết định không lấy lại được | … mốc nào do người viết đặt, như mốc ở … |
| đầu chương | mục 1 | Những ngày đầu sau khi người thân mất: đừng ngủ một mình, thuốc bệnh nền vẫn uống đúng giờ, đau ngực thì gọi 115 | … … |
| đầu chương | mục 2 | Tuần nhận chẩn đoán nặng: đừng đi lấy kết quả một mình, và để những quyết định không lấy lại được sang buổi khám sau | … … |
| đầu chương | mục 3 | Mất việc: giữ giờ thức giấc, giữ thẻ bảo hiểm y tế, và xếp việc tìm việc thành lịch | … … |
| đầu chương | mục 4 | Người thân mất vì tự tử, tai nạn hay tội phạm: đừng tự chống đỡ, đi khám chuyên khoa sớm | … … |
| đầu chương | mục 5 | Nửa năm đầu sau khi góa: giao việc ăn, ngủ, uống thuốc và tái khám cho một người có tên | … … |
| đầu chương | mục 6 | Không còn thân nhân nào: thay "người để ý mình" bằng hàng xóm giữ chìa khóa, tổ dân phố và một số khẩn cấp cài sẵn | … … |
| đầu chương | mục 7 | Cha hoặc mẹ mất: nói thật với trẻ đã xảy ra chuyện gì, và để trẻ dự lễ tiễn biệt nếu trẻ muốn | … … |
| đầu chương | mục 8 | Tang chế kéo dài quá nửa năm, ăn ngủ làm việc đều đổ: đi khám tâm thần, đó là một chẩn đoán có tên | … … |
| đầu chương | mục 9 | Đừng vội trả tiền cho một khóa tư vấn đau buồn — soát xem mình có kẹt thật không | … … |
| đầu chương | mục 10 | Ly thân, ly hôn: đừng để thẻ bảo hiểm y tế đứt, và đừng lấy rượu làm chỗ dựa | … … |
| đầu chương | mục 11 | Cần người nói chuyện thì gọi ai: 115 khi nguy cấp, 111 khi liên quan tới trẻ em, còn lại là khoa tâm thần của bệnh viện | … … |
| đầu chương | mục 12 | Sau cú sốc, ba tháng đầu hãy hoãn mọi quyết định không lấy lại được | … … |
| đầu chương | mục 13 | Đừng lấy cái chết để trả nợ: bảo hiểm nhân thọ và chế độ tai nạn lao động có điều kiện chi trả, nợ vẫn trừ vào phần để lại. | … … |
| đầu chương | mục 14 | Sau tai nạn, bị đánh hay thiên tai: buổi kể lại một lần không phòng được sang chấn, còn quá một tháng vẫn nặng thì đi khám chuyên khoa | … … |
| mục 4 | mục 1 | Những ngày đầu sau khi người thân mất: đừng ngủ một mình, thuốc bệnh nền vẫn uống đúng giờ, đau ngực thì gọi 115 | …gười ở cạnh và giữ liều thuốc bệnh nền, xem … |
| mục 7 | chương 25 mục 9 | Tiền rải rác phải đi lấy từng chỗ: trợ cấp mai táng, trợ cấp tuất, tiền gửi | … tháng, hồ sơ nộp trong 90 ngày, chi tiết ở … |
| mục 9 | mục 8 | Tang chế kéo dài quá nửa năm, ăn ngủ làm việc đều đổ: đi khám tâm thần, đó là một chẩn đoán có tên | …uổi ngồi đối chiếu với danh sách dấu hiệu ở … |
| mục 9 | mục 4 | Người thân mất vì tự tử, tai nạn hay tội phạm: đừng tự chống đỡ, đi khám chuyên khoa sớm | …t vợ hoặc chồng do tự tử, tai nạn, án mạng (… |
| mục 9 | mục 8 | Tang chế kéo dài quá nửa năm, ăn ngủ làm việc đều đổ: đi khám tâm thần, đó là một chẩn đoán có tên | …ạng (mục 4) và người đã có những dấu hiệu ở … |
| mục 10 | chương 2 mục 20 | Run tay, vã mồ hôi khi thiếu rượu thì đừng tự cai — đi cơ sở y tế | … đừng tự cắt đột ngột, phải tới cơ sở y tế (… |
| mục 11 | mục 8 | Tang chế kéo dài quá nửa năm, ăn ngủ làm việc đều đổ: đi khám tâm thần, đó là một chẩn đoán có tên | … có bác sĩ, và người đã có những dấu hiệu ở … |
| mục 12 | chương 17 mục 1 | Ủy quyền: làm giấy khi ông bà còn ký được, ghi rõ việc được làm và ghi rõ thời hạn | …i thứ hai còn là chuyện giấy ủy quyền — xem … |
| mục 12 | mục 2 | Tuần nhận chẩn đoán nặng: đừng đi lấy kết quả một mình, và để những quyết định không lấy lại được sang buổi khám sau | …ứ hai còn là chuyện giấy ủy quyền — xem  và … |
| mục 13 | chương 8 mục 38 | Mua bảo hiểm rồi giết người để lấy tiền: không có cửa, mất tiền và tội chồng tội | …n cái chết thành khoản tiền trả được nợ, và … |
| mục 13 | chương 1 mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử: gọi tổng đài, và đừng để thuốc ngủ hay thuốc trừ sâu trong nhà | … Danh sách đầy đủ các số ở … |
| mục 13 | chương 1 mục 32 | Ý nghĩ tự tử vừa xuất hiện thì nói ngay với một người bên cạnh, nhờ họ ở bên bạn trong lúc đó | … cách xử lý cơn thôi thúc ở … |
| mục 13 | mục 4 | Người thân mất vì tự tử, tai nạn hay tội phạm: đừng tự chống đỡ, đi khám chuyên khoa sớm | …ởng đến sức khỏe của người ở lại được nêu ở … |

## 30-con-di-hoc

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Đau dữ dội đột ngột rồi tăng dần thì đưa trẻ đi viện ngay trong ngày, đừng bắt con chịu đến hết buổi học | … … |
| đầu chương | mục 2 | Điều trị có cửa sổ thì làm theo cửa sổ, đừng dời lại cho xong kỳ thi: nẹp chỉnh hình là ví dụ có thử nghiệm | … … |
| đầu chương | mục 3 | Con bị bắt nạt: báo trường ngay trong ngày và đòi ghi nhận bằng văn bản; bị đánh, bị tống tiền, bị đe dọa thì báo công an, và gọi 111 khi cần người can thiệp | … … |
| đầu chương | mục 4 | Cho trẻ ra ngoài trời mỗi ngày: thêm 40 phút mỗi ngày ở trường đã giảm số trẻ mới cận thị | … … |
| đầu chương | mục 5 | Màn hình: dưới 1 tuổi không cho xem, 2 đến 4 tuổi không quá 1 giờ mỗi ngày, và đây là khuyến cáo quốc tế chứ không phải quy định của Việt Nam | … … |
| đầu chương | mục 6 | Cận thị là tổn thương để lại: độ càng sâu thì nguy cơ bong võng mạc, thoái hóa hoàng điểm, glôcôm càng cao | … … |
| đầu chương | mục 7 | Phiếu kiểm tra sức khỏe đầu năm học: đọc hết, và nếu có bất thường thì mang con đi khám chuyên khoa ngay trong năm đó | … … |
| đầu chương | mục 8 | Con buồn kéo dài: bài kiểm tra ở trường chỉ là sàng lọc, chẩn đoán phải do bác sĩ làm | … … |
| đầu chương | mục 9 | Không mua sản phẩm hứa "chữa khỏi cận thị", "giảm độ", "phục hồi thị lực" | … … |
| đầu chương | mục 10 | Ngủ, bài tập và việc xếp hạng: có quy định, và bạn có quyền hỏi | … … |
| đầu chương | mục 11 | Con không đi học nổi một thời gian: xin nghỉ có giấy, hỏi rõ ba thứ trước khi ký đơn | … … |
| đầu chương | mục 12 | Giấy khám ở trường ghi "thị lực kém" thì đưa con đi đo độ sau khi nhỏ thuốc giãn đồng tử, rồi tái khám đúng hẹn của bác sĩ | … … |
| đầu chương | mục 13 | Răng hàm lớn mọc lên thì trám bít hố rãnh, đừng chờ đến khi sâu | … … |
| đầu chương | mục 14 | Con mê game thì soát giấc ngủ, bài tập và giờ ra ngoài trước, đừng chỉ đếm giờ chơi | … … |
| đầu chương | mục 15 | Con nói thích người cùng giới: đừng mắng, đừng đuổi ra khỏi nhà, đừng đưa đi "chữa" | … … |
| đầu chương | mục 16 | Dạy con thì đừng đánh, cũng đừng mắng con là dốt: trẻ thường xuyên bị đánh, bị mắng có nhiều vấn đề hành vi và cảm xúc hơn | … … |
| đầu chương | mục 17 | Con khó dạy, mình hay nổi nóng: học một khóa dạy con kéo dài nhiều tuần, có luyện tại lớp và bài tập về nhà | … … |
| đầu chương | mục 18 | Đừng gửi con vào "trại rèn luyện", "trung tâm cai nghiện game": hệ thống giáo dục không có loại trường đó, và giữ con trong phòng khóa là hành vi bị luật cấm | … … |
| đầu chương | mục 19 | Dạy con vùng riêng tư và quy tắc "ai bảo giữ kín thì phải nói": con nói ra thì tin con trước, đừng mắng, và gọi 111 | … … |
| đầu chương | mục 20 | Tuổi đi xe: đủ 16 mới được đi xe gắn máy; xe đạp và xe đạp điện thì luật không đặt tuổi, nhưng con gây tai nạn là bố mẹ trả | … … |
| đầu chương | mục 21 | Con chơi thể thao bị đụng đầu: cho ra khỏi sân ngay, hôm đó không vào lại; nôn nhiều, càng lúc càng lơ mơ, đau đầu tăng thì đi cấp cứu | … … |
| mục 6 | mục 4 | Cho trẻ ra ngoài trời mỗi ngày: thêm 40 phút mỗi ngày ở trường đã giảm số trẻ mới cận thị | …ệc đáng làm là giữ độ thấp bằng những thứ ở … |
| mục 6 | mục 5 | Màn hình: dưới 1 tuổi không cho xem, 2 đến 4 tuổi không quá 1 giờ mỗi ngày, và đây là khuyến cáo quốc tế chứ không phải quy định của Việt Nam | …àm là giữ độ thấp bằng những thứ ở mục 4 và … |
| mục 12 | mục 7 | Phiếu kiểm tra sức khỏe đầu năm học: đọc hết, và nếu có bất thường thì mang con đi khám chuyên khoa ngay trong năm đó | …đó ra tiệm cắt kính là bỏ qua bước cần làm (… |
| mục 12 | mục 4 | Cho trẻ ra ngoài trời mỗi ngày: thêm 40 phút mỗi ngày ở trường đã giảm số trẻ mới cận thị | … chuyện giữ cho độ đừng tăng nhanh nằm ở … |
| mục 12 | mục 9 | Không mua sản phẩm hứa "chữa khỏi cận thị", "giảm độ", "phục hồi thị lực" | …ng nhanh nằm ở mục 4 (ra ngoài mỗi ngày) và … |
| mục 14 | mục 18 | Đừng gửi con vào "trại rèn luyện", "trung tâm cai nghiện game": hệ thống giáo dục không có loại trường đó, và giữ con trong phòng khóa là hành vi bị luật cấm | … nếu con bị đánh hoặc bị nhốt thì gọi 111 (… |
| mục 15 | mục 8 | Con buồn kéo dài: bài kiểm tra ở trường chỉ là sàng lọc, chẩn đoán phải do bác sĩ làm | …bài kiểm tra ở trường không phải chẩn đoán (… |
| mục 16 | mục 17 | Con khó dạy, mình hay nổi nóng: học một khóa dạy con kéo dài nhiều tuần, có luyện tại lớp và bài tập về nhà | …t trước và giữ đúng lời — cách làm cụ thể ở … |
| mục 16 | mục 3 | Con bị bắt nạt: báo trường ngay trong ngày và đòi ghi nhận bằng văn bản; bị đánh, bị tống tiền, bị đe dọa thì báo công an, và gọi 111 khi cần người can thiệp | … bị đánh ở trường hoặc ở nhà người khác thì … |

## 31-sau-18-tuoi-co-may-duong

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Bảy con đường sau tuổi 18: mỗi đường có một ngưỡng tuổi viết trong luật, và hai chỗ luật không đặt trần | … … |
| đầu chương | mục 2 | Đăng ký nghĩa vụ quân sự lần đầu từ năm 17 tuổi, gọi nhập ngũ 18 đến hết 25, tại ngũ 24 tháng | … … |
| đầu chương | mục 3 | Trốn nghĩa vụ quân sự có khung phạt tới 75 triệu đồng và có thể bị xử lý theo Điều 332 Bộ luật Hình sự, dù không có danh mục cấm xuất cảnh. | … … |
| đầu chương | mục 4 | Sinh viên đi nghĩa vụ: bảo lưu kết quả học tập, 10.120.000 đồng trợ cấp xuất ngũ và 15.180.000 đồng trợ cấp tạo việc làm | … … |
| đầu chương | mục 5 | Xuất ngũ về thì việc làm tính từ ba chỗ, và cửa đăng ký chỉ mở 15 ngày làm việc | … … |
| đầu chương | mục 6 | Ba khoản tiền khi xuất ngũ: 2 tháng lương cơ sở mỗi năm phục vụ, cộng 6 tháng tạo việc làm | … … |
| đầu chương | mục 7 | Vào khu vực nhà nước có bốn cửa, và không có cửa nào tên là "chờ đủ năm thì vào biên chế" | … … |
| đầu chương | mục 8 | Dạy ở xã đặc biệt khó khăn: 10 tháng lương cơ sở khi nhận việc lần đầu, phụ cấp thu hút 70% nhưng chỉ 60 tháng | … … |
| đầu chương | mục 9 | Công an, quân đội có cửa riêng: nghĩa vụ 24 tháng, và ở lại là xét tuyển chứ không tự động | … … |
| đầu chương | mục 10 | Học lại sau tuổi 18: bằng tại chức có giá trị pháp lý như bằng chính quy, còn chứng chỉ của lớp "bao đậu" thì không phải văn bằng | … … |
| đầu chương | mục 11 | Không vào biên chế: bảo hiểm xã hội tự nguyện là đường duy nhất để có lương hưu, còn bảo hiểm thất nghiệp thì không có cho người tự làm | … … |
| đầu chương | mục 12 | Chạy xe công nghệ, giao hàng: không có quỹ tai nạn nào do nền tảng đóng thay bạn | … … |
| đầu chương | mục 13 | Học bổng có ràng buộc: sinh viên sư phạm được 3,63 triệu đồng một tháng, đổi lại phải công tác gấp hai lần thời gian đào tạo | … … |
| đầu chương | mục 14 | Đi làm việc ở nước ngoài: kiểm giấy phép của công ty trước, và biết tiền dịch vụ có trần | … … |
| đầu chương | mục 16 | Vay vốn để tự tạo việc làm: hỏi Ngân hàng Chính sách xã hội trước khi tìm vay nóng | … … |
| đầu chương | mục 17 | Chuyện "còn là sinh viên mới tốt nghiệp": không có trong luật tuyển dụng, chỉ có trong từng thông báo | … … |
| mục 9 | mục 5 | Xuất ngũ về thì việc làm tính từ ba chỗ, và cửa đăng ký chỉ mở 15 ngày làm việc | …m việc vẫn phải đi đăng ký ngạch dự bị, như … |
| mục 11 | chương 5 mục 46 | Không có lương hưu công ty: đóng bảo hiểm xã hội tự nguyện ở mức thấp nhất, đủ 15 năm, khoảng 8 năm là hoàn vốn | … ra tiền và phần ngân sách hỗ trợ đã tính ở … |

## 32-di-du-hoc

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Trước khi đóng tiền: hỏi số giấy phép tư vấn du học, và hiểu Việt Nam không có danh sách trường được nhà nước cho phép | … … |
| đầu chương | mục 2 | Visa F-1: "học bao lâu ở bấy lâu" đang được giữ tạm, và một vụ kiện có thể đổi nó bất cứ lúc nào | … … |
| đầu chương | mục 3 | Giới hạn giờ làm thêm: bốn nước, bốn con số, và không con số nào áp cho mọi loại việc | … … |
| đầu chương | mục 4 | Giảm môn, bảo lưu, nghỉ, chuyển trường: kiểm tư cách làm việc trước, vì visa còn hạn không thay được tư cách | … … |
| đầu chương | mục 5 | Mỹ: đổi chỗ ở thì báo cơ quan di trú trong 10 ngày, báo trường là việc khác | … … |
| đầu chương | mục 6 | Trước khi nộp tiền, kiểm cảnh báo ở ba cửa: trong nước, cơ quan đại diện, và nước đến | … … |
| đầu chương | mục 7 | Úc: bảo hiểm y tế là điều kiện của visa, phải có liên tục suốt thời gian ở Úc | … … |
| đầu chương | mục 8 | Anh: ngoài phí visa 558 bảng còn phụ phí y tế 776 bảng mỗi năm, trả một lần khi nộp | … … |
| đầu chương | mục 9 | Về nước rồi mới xin công nhận văn bằng: hồ sơ đủ thì 20 ngày làm việc, phải hỏi lại trường thì không quá 30 ngày làm việc | … … |
| đầu chương | mục 10 | Trước khi đóng học phí, tra tên trường theo đúng ba điều kiện công nhận văn bằng — không có danh sách trường nào bảo đảm thay bạn | … … |
| đầu chương | mục 11 | OPT của Mỹ: không có việc quá 90 ngày là mất tư cách, xin thêm 24 tháng STEM thì tổng không quá 150 ngày | … … |
| đầu chương | mục 12 | Canada: thư giới thiệu của tỉnh (PAL/TAL) phải nộp kèm hồ sơ xin giấy phép học tập, không bổ sung sau được | … … |
| mục 11 | mục 2 | Visa F-1: "học bao lâu ở bấy lâu" đang được giữ tạm, và một vụ kiện có thể đổi nó bất cứ lúc nào | … xem tình trạng tạm hoãn ở … |

## 33-sau-khi-khuyet-tat

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Tổn thương tủy sống mà đột ngột đau đầu dữ dội, vã mồ hôi: cho ngồi dậy, nới quần áo, gọi 115 — đừng chờ cho hết cơn | … … |
| đầu chương | mục 2 | Những năm đầu sau tổn thương tủy sống là quãng nguy hiểm nhất: có ý định tự tử thì gọi 115 và đừng để người đó ở một mình | … … |
| đầu chương | mục 3 | Không ai được giữ một người ở lại khoa tâm thần chỉ vì gia đình muốn: luật chỉ cho bắt buộc chữa bệnh trong vài trường hợp | … … |
| đầu chương | mục 4 | Người chăm sóc người khuyết tật trong nhà cũng cần có người để ý sức khỏe: cái đáng lo là sự quá tải, không phải việc chăm | … … |
| đầu chương | mục 5 | Ngồi xe lăn lâu: đệm giảm áp và một phút soi da mỗi ngày, trước khi loét thành lỗ | … … |
| đầu chương | mục 6 | Đừng mua liệu trình hay máy quảng cáo "chữa khỏi bại liệt, mù, điếc" | … … |
| đầu chương | mục 7 | Giấy xác nhận khuyết tật do xã cấp, và nó chỉ là chìa khóa — từng quyền lợi phải xin riêng | … … |
| đầu chương | mục 8 | Trẻ khuyết tật: xin giấy và bắt đầu can thiệp sớm, đừng chờ đủ tuổi | … … |
| đầu chương | mục 9 | Sửa nhà cho người đi lại khó: dốc, tay vịn, phòng tắm — và cái không có ở Việt Nam | … … |
| đầu chương | mục 10 | Doanh nghiệp nhận nhiều người khuyết tật: ưu đãi có thật, nhưng phần "miễn thuế" đã đổi luật | … … |
| đầu chương | mục 11 | Không có ưu đãi thuế thu nhập riêng cho người khuyết tật, chỉ có giảm trừ gia đình | … … |
| đầu chương | mục 12 | Chó dẫn đường và vé xe buýt: vé có khung miễn giảm, chó dẫn đường thì phải hỏi trước | … … |
| đầu chương | mục 13 | Thi đại học: được ưu tiên tuyển sinh và miễn một số môn, nhưng không có mức chung toàn quốc | … … |
| đầu chương | mục 14 | Trường không được từ chối nhận học sinh khuyết tật, nhưng chữ luật có kèm điều kiện | … … |
| đầu chương | mục 15 | Không có hạng C5: người khuyết tật lái ô tô số tự động được cấp hạng B | … … |
| đầu chương | mục 16 | Phục hồi chức năng: vào nơi có nhóm đa chuyên khoa, liều do bác sĩ và kỹ thuật viên quyết | … … |
| đầu chương | mục 17 | Nghe kém thì đi đo thính lực trước, rồi mới tính chuyện máy trợ thính; lý do đeo máy là nghe được bây giờ, không phải để phòng sa sút trí tuệ | … … |
| đầu chương | mục 18 | Muốn nói một người lớn "không tự quyết được việc của mình" thì phải ra tòa, và tòa có ba mức chứ không phải hai | … … |
| đầu chương | mục 19 | Người giám hộ của người lớn theo thứ tự luật định; người được giám hộ gây thiệt hại thì lấy tài sản của họ trả trước | … … |
| đầu chương | mục 20 | Vì khuyết tật mà bị từ chối tuyển, không cho lên chính thức hay trả lương thấp hơn: kiện được, nhưng phải tính trước tiền và thời gian | … … |
| đầu chương | mục 21 | Sau tổn thương tủy sống mà bí tiểu: cách làm rỗng bàng quang do bác sĩ và người bệnh cùng quyết, và phải theo dõi thận, bàng quang suốt đời | … … |
| mục 4 | mục 2 | Những năm đầu sau tổn thương tủy sống là quãng nguy hiểm nhất: có ý định tự tử thì gọi 115 và đừng để người đó ở một mình | … Người chăm cũng nên đọc … |
| mục 17 | mục 7 | Giấy xác nhận khuyết tật do xã cấp, và nó chỉ là chìa khóa — từng quyền lợi phải xin riêng | …hận khuyết tật — giấy này làm ở cấp xã, xem … |
| mục 21 | mục 1 | Tổn thương tủy sống mà đột ngột đau đầu dữ dội, vã mồ hôi: cho ngồi dậy, nới quần áo, gọi 115 — đừng chờ cho hết cơn | … dữ dội, vã mồ hôi, huyết áp vọt — xử trí ở … |

## 34-thuoc-trong-nha

| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| đầu chương | mục 1 | Hai hộp thuốc cảm cùng một hoạt chất giảm đau, hạ sốt: đọc phần thành phần trước khi uống, quá tay thì đi viện ngay kể cả khi thấy bình thường | … … |
| đầu chương | mục 2 | Trẻ sốt: không dùng aspirin, nimesulide hay metamizole (analgin); sirô phải đong bằng ống có trong hộp, không đong bằng thìa ăn cơm | … … |
| đầu chương | mục 3 | Người trên 60 tuổi, từng xuất huyết dạ dày, đang uống thuốc chống đông hay corticoid: hỏi bác sĩ trước khi mua ibuprofen | … … |
| đầu chương | mục 4 | Trẻ dưới 2 tuổi: không tự cho uống thuốc cảm hay thuốc ho, kể cả loại bán không cần đơn và ghi "dành cho trẻ em" | … … |
| đầu chương | mục 5 | Mang thai từ tuần 20: không tự uống ibuprofen, naproxen, diclofenac; cần giảm đau thì hỏi bác sĩ trước khi mua | … … |
| đầu chương | mục 6 | Ợ nóng, trào ngược: không tự uống omeprazol dài ngày; nuốt khó, nôn ra máu, phân đen thì đi viện ngay | … … |
| đầu chương | mục 7 | Cảm thường không cần kháng sinh, và kháng sinh chỉ được bán khi có đơn | … … |
| đầu chương | mục 8 | Tiêu chảy: bù nước bằng oresol pha đúng lượng nước ghi trên gói; trẻ dưới 5 tuổi không cho thuốc cầm tiêu chảy | … … |
| đầu chương | mục 9 | Đau đầu mà tháng nào cũng uống giảm đau: quá 15 ngày với thuốc đơn, quá 10 ngày với thuốc phối hợp, kéo dài trên 3 tháng thì cơn đau có thể do chính thuốc | … … |
| đầu chương | mục 10 | Thuốc hết hạn và thuốc còn dư: mỗi năm dọn một lần, đừng để dành, và tuyệt đối không bán lại | … … |
| đầu chương | mục 11 | Đang uống metronidazol hay kháng sinh nhóm cefoperazon thì không uống rượu bia, và không chỉ rượu trắng mới tính | … … |
| đầu chương | mục 12 | Uống thuốc cảm hay thuốc dị ứng có clorpheniramin, diphenhydramin thì đừng lái xe, kể cả sáng hôm sau | … … |
| đầu chương | mục 13 | Đang uống thuốc hạ mỡ hay huyết áp: hỏi trước khi ăn bưởi, và bưởi ta cũng tính | … … |
| mục 3 | mục 1 | Hai hộp thuốc cảm cùng một hoạt chất giảm đau, hạ sốt: đọc phần thành phần trước khi uống, quá tay thì đi viện ngay kể cả khi thấy bình thường | … đọc thành phần trước khi cộng, xem … |
| mục 4 | mục 2 | Trẻ sốt: không dùng aspirin, nimesulide hay metamizole (analgin); sirô phải đong bằng ống có trong hộp, không đong bằng thìa ăn cơm | … Với trẻ sốt, xem … |
| mục 5 | mục 1 | Hai hộp thuốc cảm cùng một hoạt chất giảm đau, hạ sốt: đọc phần thành phần trước khi uống, quá tay thì đi viện ngay kể cả khi thấy bình thường | …i paracetamol quá liều vẫn gây suy gan (xem … |
