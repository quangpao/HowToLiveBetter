# Bảng đối chiếu tham chiếu

File này do `node tools/check-refs.mjs` sinh ra, đừng sửa tay.

Tham chiếu trong sách chỉ ghi số mục, không ghi nội dung; chèn hay xoá một mục thì số của
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

Tổng 199 chỗ tham chiếu.

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
| đầu chương | mục 40 | Đừng mua dầu lạc ép thủ công bán rời — chiên không phá huỷ được aflatoxin | …29), không mua dầu lạc ép thủ công bán rời (… |
| đầu chương | mục 41 | Dùng dầu thực vật thay mỡ lợn và bơ — nhưng đừng chiên lại dầu nhiều lần | …c 40), dùng dầu thực vật thay mỡ lợn và bơ (… |
| đầu chương | mục 42 | Bật máy hút mùi từ lúc bắt đầu nấu, tắt sau khi dọn xong | …út mùi từ lúc bắt đầu nấu đến lúc dọn xong (… |
| đầu chương | mục 10 | Đánh răng hai lần một ngày bằng kem có fluor, và làm sạch kẽ răng — đừng tin quảng cáo | …ẩn thận, mỗi ngày làm sạch kẽ răng một lần (… |
| đầu chương | mục 12 | Uống thuốc theo đơn đều đặn — bỏ thuốc là chỗ chết người nhất trong điều trị bệnh mạn tính | …10), uống thuốc đều theo đơn, đừng tự dừng (… |
| đầu chương | mục 31 | Ban ngày ra ngoài trời — nhưng là nắng sớm, không phải nắng trưa | …ng (mục 12), ban ngày ra ngoài cho có nắng (… |
| đầu chương | mục 36 | Có bồn thì tắm — nhưng ngâm bồn là chỗ dễ ngất, phải cẩn thận | …có nắng (mục 31), có điều kiện thì tắm bồn (… |
| đầu chương | mục 43 | Bốc hoả, vã mồ hôi tuổi mãn kinh mà ảnh hưởng sinh hoạt thì đi khám — đừng tự chịu | … thì đi khám để đánh giá liệu pháp hormone (… |
| đầu chương | mục 5 | Gọi tổng đài tư vấn cai thuốc, hoặc đi phòng tư vấn cai thuốc lá | … **… |
| đầu chương | mục 6 | Thuốc lá điện tử: ở Việt Nam đã bị cấm, đừng coi là cách cai | …phòng tư vấn và số 12320 của Trung Quốc), **… |
| đầu chương | mục 40 | Đừng mua dầu lạc ép thủ công bán rời — chiên không phá huỷ được aflatoxin | … cấm, nên kết luận sẽ ngược lại bản gốc), **… |
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
| mục 20 | mục 1 | Tắt thông báo không cần thiết, để điện thoại ra ngoài tầm mắt | … Sức khoẻ kỹ thuật số), tắt thông báo (… |
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
| đầu chương | mục 22 | Trả tiền trước thì lấy hợp đồng và hoá đơn — phần chưa dùng vẫn là tiền của bạn | …c 2, 3, 13, 20, 46) · mua sắm và khiếu nại (… |
| đầu chương | mục 47 | Nhận xe mới: kiểm ngay tại chỗ, và biết rằng Việt Nam không có "7 ngày đổi xe" | … nại (mục 22, 29, 30, 31, 32, 36, 50) · xe (… |
| đầu chương | mục 6 | Ai hứa lãi cao gấp mấy lần tiết kiệm thì đó không phải cơ hội, mà là chỗ mất tiền | …0) · xe (mục 47, 48, 49) · tiết kiệm và nợ (… |
| mục 4 | mục 1 | Tắt hết gia hạn tự động, tới hạn thì tự bấm | …p tiền thì gói vẫn sống tới hết chu kỳ (xem … |
| mục 8 | mục 9 | Con bạn nạp tiền vào game: dưới 15 tuổi còn đòi lại được, từ 15 tuổi thì gần như mất | … của con, và cách đó hẹp dần theo tuổi (xem … |
| mục 16 | mục 7 | Trả đủ dư nợ thẻ mỗi tháng; nếu buộc phải vay, đổi mọi con số về %/năm rồi mới so | … lãi thẻ tín dụng 30,5%–44,5%/năm (… |
| mục 27 | mục 7 | Trả đủ dư nợ thẻ mỗi tháng; nếu buộc phải vay, đổi mọi con số về %/năm rồi mới so | … lãi thẻ tín dụng 30,5%–44,5%/năm (… |
| mục 28 | mục 27 | Để riêng ba đến sáu tháng chi tiêu, ở chỗ rút được trong ngày | … luôn giữ quỹ dự phòng (… |
| mục 33 | mục 34 | Đá quý chỉ tin phiếu của phòng đã được công nhận, và tra mã đó trên trang của Văn phòng Công nhận Chất lượng | … xem … |
| mục 42 | mục 41 | Hợp đồng bảo hiểm trên một năm có 21 ngày cân nhắc: huỷ trong hạn thì lấy lại được phần lớn phí | …à chỉ trong 21 ngày đầu mới gần như đủ (xem … |
