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

Tổng 40 chỗ tham chiếu.

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
| mục 34 | mục 32 | Ý nghĩ tự tử vừa xuất hiện thì nói ngay với một người bên cạnh, đưa vài chục phút đó cho họ | … Nếu chuyện ngã này là do ý nghĩ tự tử, xem … |
| mục 34 | mục 33 | Đừng coi "cứu được là xong": sau ngộ độc thuốc trừ sâu hay khí CO, giữ được mạng chưa chắc giữ được phổi và não | …n ngã này là do ý nghĩ tự tử, xem mục 32 và … |
| mục 37 | mục 32 | Ý nghĩ tự tử vừa xuất hiện thì nói ngay với một người bên cạnh, đưa vài chục phút đó cho họ | … Khi có ý nghĩ tự tử, xem … |
| mục 37 | mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử: gọi tổng đài, và đừng để thuốc ngủ hay thuốc trừ sâu trong nhà | … Khi có ý nghĩ tự tử, xem mục 32 và … |
| mục 38 | mục 30 | Dùng bao cao su suốt mỗi lần quan hệ, và không dùng chung bơm kim tiêm | …ó giai đoạn đã tạm dừng ở một số nơi** (xem … |
| mục 39 | mục 13 | Từ 60 tuổi, tập thăng bằng và sức chân hằng tuần, sửa lại nhà tắm và cầu thang | … còn giảm số lần ngã thì xem … |
| mục 40 | mục 39 | Phụ nữ từ 65 tuổi nên đo mật độ xương một lần; sau mãn kinh mà có yếu tố nguy cơ thì không cần đợi đến 65 | … Cách phát hiện loãng xương ở … |
| mục 43 | mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử: gọi tổng đài, và đừng để thuốc ngủ hay thuốc trừ sâu trong nhà | …uốc ngủ, thuốc trừ sâu ra khỏi tầm tay (xem … |
| mục 43 | mục 32 | Ý nghĩ tự tử vừa xuất hiện thì nói ngay với một người bên cạnh, đưa vài chục phút đó cho họ | … ở gần một nửa số người chỉ khoảng 10 phút (… |
| mục 45 | mục 14 | Xét nghiệm viêm gan B một lần, rồi căn cứ vào kết quả mà tiêm hay không tiêm | …ét nghiệm viêm gan B là bộ chỉ số khác, xem … |
| mục 47 | mục 23 | Xét nghiệm vi khuẩn Helicobacter pylori, dương tính thì diệt trừ | … pylori và ngược lại — xem … |
