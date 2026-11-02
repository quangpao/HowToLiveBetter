# Thiết kế: tự động hoá quy trình viết sách (bản nháp để duyệt)

Ngày: 2026-11-02 · Trạng thái: **DRAFT — chưa implement** · Repo: `~/personal-workspace/HowToLiveBetter`

## 1. Mục tiêu

Chuyển quy trình viết một chương (hiện 1 mục/lượt, ~20–40 lượt gọi tool, người điều phối làm tay ở 8 khâu) thành **một lệnh cho cả chương**:

```bash
node tools/pipeline.mjs --chapter 7 --until approve
```

Chạy xong phải ra: 4 bản dựng, 6 cổng xanh, sổ kiểm chứng đầy, báo cáo soát văn phong, **gói duyệt 1 trang** để người dùng ký, và một lệnh `--resume` tiếp tục đúng chỗ nếu đứt giữa đường.

Không đặt mục tiêu "bỏ con người ra khỏi vòng". Đặt mục tiêu: **người chỉ còn đúng một chốt duyệt**, mọi khâu còn lại (kể cả khâu hay hỏng nhất — áp bản sửa của CLI) do máy làm và **có cổng để chứng minh là đã làm**.

## 2. Hiện trạng đo được (cơ sở để biết tự động hoá cái gì)

| Việc | Số liệu thật từ chương 1–6 | Tự động được? |
|---|---|---|
| Dựng khung chương (6 chỗ: file, mở đầu, mục lục nhóm, README×3, sổ kiểm chứng) | làm tay mỗi chương mới | **được 100%** |
| Chia nhóm + giao 3 agent viết nháp | ch6: 12/12/11 mục, 924–1149 giây | **được 100%** |
| Kiểm nháp + merge theo số mục gốc | `check-draft.mjs`, `merge-drafts.mjs` đã có | **được 100%** |
| Tự mở lại số trọng yếu | 8–12 bài/chương, người điều phối đọc abstract | **một phần** (xem §4) |
| Soát văn phong bằng CLI ngoài | ch1 180 góp ý→áp 80 · ch2 88→41 · ch3 131→96 · ch4 64→9 · ch5 120→8 | **được 100%** |
| Lọc + áp bản sửa + dọn lỗi do bản sửa sinh ra | 6 lỗi ráp hỏng đã gặp thật (lặp cụm, hai dấu chấm, chữ soát lọt vào sách, gạch nối ráp sai) | **được 100%** (cần tool, hiện làm tay) |
| Viết lại đoạn mở đầu theo phân bố A/B/C thật | ch3 từng ghi "đa số B" khi thật là A14·B11·C2 | **được**, nếu có cổng đối chiếu số |
| 6 cổng + 4 bản dựng | ~2 phút | **được 100%** |
| Release: 2 commit, push, tag, 4 asset, kiểm live | đã có quy trình, còn lỗi token `gh` | **được 100%**, trừ chốt duyệt |
| **Xác nhận mục N đúng đề gốc** | **đã bịa mục 2 lần** (chương 3 mục 14) | **được** — hiện không có cổng nào |
| **Xác minh số trong văn bản pháp lý VN** | phải mở bản ký/OCR, đọc bằng mắt | **không** (xem §4) |

Kết luận: 90% khối lượng là việc máy làm tốt hơn người, nhưng 3 lớp lỗi đã làm tốn công nhất lại **không có cổng nào**: mục bịa, số sai kiểu tinh vi (đơn vị/mẫu phụ/bài bị rút), và lỗi do chính bản sửa của CLI sinh ra. Thiết kế dưới đây lấy 3 lớp đó làm trung tâm.

## 3. Ranh giới tự động hoá — 3 tầng

**Tầng A — máy làm hết, không hỏi** (chiếm ~90% khối lượng): dựng khung, giao agent, kiểm nháp, merge, soát văn phong 2 CLI, lọc bảng góp ý, áp bản sửa, dọn lỗi ráp, 6 cổng, 4 bản dựng, đồng bộ README/updates/badge/og.png, dựng trang live, soạn commit message + release note, kiểm asset sau khi upload.

**Tầng B — máy chuẩn bị, người quyết** (2 khâu):
- **Xác minh số & luật Việt Nam.** Máy làm được: kiểm DOI qua Crossref (tiêu đề + năm + số trang), kiểm bài bị rút qua PubMed, kiểm mỗi dòng giá phải có ngày tra + tên miền nằm trong danh sách cho phép, kiểm trích dẫn luật phải có số hiệu + Điều/khoản, cấm `thuvienphapluat.vn`, và **xếp hạng rủi ro** từng con số. Máy không làm được: mở PDF scan của nghị định rồi đọc "Điều 37 điểm đ". Vì vậy khâu này ra một **danh sách 8–12 con số phải mở**, người đọc đúng 12 dòng đó thay vì đọc cả chương.
- **Phân hạng A/B/C khác bản gốc** — máy chỉ được đề xuất kèm lý do, người duyệt, vì nó phải ghi vào "Lưu ý đã xử lý" và ảnh hưởng uy tín cả thang điểm.

**Tầng C — chỉ người**: duyệt phát hành. Không có đường vòng, và **cưỡng chế bằng mã** (§6), không bằng lời dặn.

## 4. Kiến trúc

```
tools/pipeline.mjs                 # orchestrator: state machine, --resume, --until, --dry-run
tools/pipeline/stages.mjs          # 13 stage, mỗi stage: enter/run/verify
tools/pipeline/state.mjs           # dist/pipeline/state-NN.json, atomic write
tools/check-titles.mjs             # NEW  cổng chống mục bịa
tools/hygiene.mjs                  # NEW  phát hiện lỗi ráp bản sửa
tools/patch-apply.mjs              # NEW  lọc + áp bảng góp ý của CLI
tools/verify-claims.mjs            # NEW  (thay verify-dois.py) DOI + rút bài + giá + luật
tools/check-fidelity.mjs           # NEW  đối chứng ý với bản gốc tiếng Trung
tools/approve.mjs                  # NEW  ghi token duyệt kèm hash cây làm việc
tools/lib/book.mjs …               # đang có, không đổi
```

Nguyên tắc chung: mỗi stage **idempotent**, có **điều kiện vào** và **điều kiện ra** kiểm được bằng lệnh, ghi artifact xuống `dist/pipeline/NN/`, **dừng ngay ở cổng đỏ đầu tiên** (giống `pipeline.mjs` của dự án video), không stage nào được "bỏ qua im lặng".

### Bảng stage

| # | Stage | Vào | Ra (artifact) | Cổng ra | Khi đỏ |
|---|---|---|---|---|---|
| S1 | `plan` | `book/NN-<cn>.md` | `chuong-NN-todo.md` N dòng, khung chương, README 3 chỗ, sổ kiểm chứng rỗng | `### ` của khung = 0 · todo = N dòng · `sync-stats --check` | dừng, in dòng lệch |
| S2 | `draft` | todo + 3 gói ngữ cảnh | `book/.drafts/NN-nhom-{A,B,C}.md` + sổ nháp | `check-draft` xanh **và** tập số mục = tập đã giao | dừng; stage ghi rõ nhóm nào, mục nào thiếu |
| S3 | `merge` | 3 nháp | file chương đủ N mục, đúng thứ tự gốc | `check-titles` + `check-plain` + `check-split` | revert file chương về trước merge (`git checkout --`) |
| S4 | `audit` | file chương đã merge | `chuong-NN-audit.md` (bảng 8–12 dòng rủi ro + bảng 12 bài đã tự đọc) | `verify-claims` không có lỗi cứng (DOI sai, không có ngày tra, dẫn thuvienphapluat) | dừng; **lỗi mềm** (đọc qua trích đoạn, giá không niêm yết) chỉ cảnh báo, đưa vào gói duyệt |
| **S4b** | **`fidelity`** | file gốc tiếng Trung + file chương Việt | `chuong-NN-doi-chieu.md` (bảng 35–50 dòng: mục · ý gốc · ý Việt · kết luận) | `check-fidelity` không có lỗi cứng (xem §5.5) | dừng; mục lệch chủ đề thì **xoá và viết lại**, không sửa tiêu đề |
| S5 | `style` | file chương | 2 báo cáo CLI + `dist/pipeline/NN/style.json` | bảng parse được (nếu CLI trả prose → **đỏ**, không tự bỏ qua) | chạy lại CLI 1 lần, vẫn hỏng thì dừng và báo |
| S6 | `patch` | style.json | file chương đã áp + `patch-log.json` | `check-plain --numbers` + `hygiene` sạch | revert từng dòng gây đỏ (khôi phục dòng gốc của đúng mục đó), chạy lại |
| S7 | `intro` | phân bố A/B/C đếm thật | đoạn mở đầu chương viết lại | **cổng mới**: mọi số trong đoạn mở đầu phải khớp phân bố đếm được | dừng, in số đo vs số viết |
| S8 | `build` | toàn bộ | `dist/*.{html,epub,pdf,apkg}` + `dist/updates.json` | 6 cổng + 4 file > 0 byte + số mục/thẻ khớp | dừng |
| S9 | `prep` | build xanh | `dist/pipeline/NN/release.json` (commit message, release note, hash cây) + gói duyệt 1 trang | `gh api user` = `quangpao` (ghim `GH_TOKEN`) | dừng |
| **S10** | **`approve`** | gói duyệt | `dist/pipeline/NN/approval.json` = `{hash, ts, by}` | — | **chờ người. Đây là chốt duy nhất.** |
| S11 | `release` | approval.json | 2 commit, push `vi`, tag `vX.Y`, 4 asset | hash cây hiện tại **=** hash đã duyệt; 4 asset đúng tên + đúng byte | dừng, **không bao giờ** tự sửa hash |
| S12 | `verify` | release | `dist/pipeline/NN/live.json` | HTTP 200 `/`, `/selfcheck.html`, `/updates.json` + render thử selfcheck | báo động, không tự rollback |

Thời gian ước tính một chương: S1 2 phút · S2 20–40 phút (chạy nền) · S3–S4 15 phút · S5 15 phút (2 CLI song song) · S6–S8 10 phút · S9–S12 5 phút ⇒ **~1 giờ máy chạy, 5–10 phút người đọc gói duyệt**.

## 5. Bốn tool mới — đây là chỗ đáng làm nhất

### 5.1 `check-titles.mjs` — cổng chống mục bịa (ưu tiên số 1)

Lỗi đã xảy ra **2 lần**: một mục được viết trọn vẹn nhưng đề tài chỉ tồn tại trong dòng "mục N tiếp: …" của báo cáo lượt trước, không có trong file gốc tiếng Trung. Không cổng nào bắt được, vì cổng cũ chỉ đếm số `###`.

Cơ chế: mỗi chương có `docs/kiem-chung/map-NN.json`:
```json
{"7": {"cn": "没钱的时候怎么活", "vi": "Sống thế nào khi không có tiền", "group": "A"}}
```
- Stage `plan` sinh file này từ tiêu đề gốc; stage `draft` giao **đúng** các tiêu đề trong file cho agent.
- Cổng: số khoá = số `### ` của cả 2 file · mỗi mục Việt có khoá · **tiêu đề Việt phải chứa ≥1 cụm từ khoá bắt buộc của tiêu đề Trung** (bảng ánh xạ từ khoá, khai một lần cho cả sách) · không khoá nào trỏ mục không tồn tại.
- Test hồi quy: dựng lại đúng sự cố chương 3 mục 14 (tiêu đề Việt "nghỉ giữa giờ" vs gốc "nghĩ vòng vo") — cổng **phải đỏ**. Không đỏ thì không được dùng.

### 5.2 `hygiene.mjs` — bắt lỗi do chính bản sửa sinh ra

Toàn bộ 6 lỗi ráp hỏng đã gặp, biến thành luật máy kiểm:
- cụm 4 từ lặp liền (`(\S+\s+){3}\S+\s+\1`) · hai dấu chấm liền · chữ hoa rơi giữa câu (`[a-zà-ỹ,]\s+[A-ZÀ-Ỹ][a-zà-ỹ]+` sau dấu phẩy) · dấu vết người soát lọt vào sách (`Bỏ vế này`, `hãy chia đôi con số`, `..`) · gạch nối ráp thành chuỗi lạ (`" / "` trong một bullet) · "Nói dễ hiểu" > 235 ký tự không tính khoảng trắng (gọi lại `check-plain`).
- Xuất diff + số dòng; stage `patch` dùng nó để **revert riêng dòng đã sinh lỗi**, không revert cả file.

### 5.3 `patch-apply.mjs` — khâu đang tốn công nhất

Hiện tại mỗi chương phải lọc tay 64–180 dòng góp ý. Luật lọc đã được viết rõ trong `docs/kiem-chung/soat-van-phong.md`, chỉ chưa thành mã:
1. câu trích phải khớp **nguyên văn** trong file (bỏ qua nếu có `[]`, `\"`, hoặc cắt giữa câu);
2. đề xuất **không chứa số/năm mới** ngoài số đã có trong câu gốc;
3. bỏ trùng; câu xuất hiện >1 lần trong file → **bỏ** (không sửa mù);
4. áp xong gọi `check-plain --numbers` + `hygiene`; mục nào "Nói dễ hiểu" vượt trần → **khôi phục nguyên dòng gốc của mục đó**, không nới trần;
5. ghi `patch-log.json`: áp bao nhiêu, bỏ bao nhiêu, vì sao bỏ (4 nhóm lý do) — số này chảy vào sổ `soat-van-phong.md` và gói duyệt.

Chính sách 2 CLI: chạy **song song trên cùng chương**, áp theo thứ tự "cả hai đồng ý → 1 báo cũng áp nếu không xung đột với báo kia"; xung đột → để người. (Khác hiện nay: chia chương cho từng CLI, nên không có đối chứng chéo.)

### 5.4 `verify-claims.mjs` — nâng `verify-dois.py`

- DOI → Crossref: tiêu đề, năm, số trang khớp; in cả tiêu đề Crossref trả về.
- Mỗi DOI → PubMed: cờ `RETRACTED` / `retraction`.
- Dòng `- Chi phí:` có tiền Việt → bắt buộc có `tra ngày d/m/yyyy` và tên miền trong allowlist (`nhathuoclongchau.com.vn`, `medlatec.vn`, `.gov.vn`, …).
- Dòng `- Nguồn:` dẫn văn bản luật → phải có `\d+/\d{4}/[A-ZĐ-]+` + `Điều \d+`; cấm `thuvienphapluat.vn`.
- **Xếp hạng rủi ro**: mục có giá không niêm yết · "đọc qua trích đoạn" · nâng hạng so với gốc · hai nguồn mâu thuẫn · số chỉ có ở toàn văn (không ở abstract) → điểm cao lên đầu danh sách phải mở.

### 5.5 `check-fidelity.mjs` — đối chứng ý với bản gốc (bổ sung sau khi soát chương 6)

Soát văn phong bằng CLI chỉ nhìn **câu chữ Việt**. Không cổng nào kiểm **mục Việt còn nói đúng ý mục gốc tiếng Trung hay không** — và đó là lỗ hổng thật: chương 6 vừa soát xong 38 câu văn phong mà vẫn chưa ai đối chiếu ý.

Máy kiểm được (rẻ, chạy cả 35–50 mục trong vài giây):
- **Tiêu đề**: số mục hai bên bằng nhau; mỗi mục Việt có dòng tương ứng trong bản gốc (dùng chung `map-NN.json` với `check-titles`).
- **Hạng bằng chứng**: `证据等级` gốc so với `Mức bằng chứng` Việt → **mọi lệch phải được ghi trong "Lưu ý đã xử lý"**, nếu không là đỏ. (Đã chạy trên chương 6: 6 lệch, và sổ kiểm chứng **không có** mục "Lưu ý đã xử lý" → đã bổ sung.)
- **Câu chặn đọc ngược**: mục gốc có câu ngoại lệ ("不在这条里面", "例外", "除非") thì mục Việt phải có câu chặn tương ứng. Chương 6: 7 mục gốc có, 35/35 mục Việt có → đạt.
- **Số bị rơi**: mọi số ≥2 chữ số trong `说人话` gốc phải xuất hiện ở mục Việt **hoặc** nằm trong danh sách "số đã cố ý thay bằng số Việt Nam" (giá, tuổi thọ, thống kê TQ). Loại nhiễu DOI/năm bằng cách bỏ mảnh `10.\d{4,}` và URL trước khi so.
- **Lệch chiều kết luận**: đếm từ phủ định ở hai bên; lệch mạnh (gốc "不要/没有" mà Việt không có "không/đừng") thì đưa vào danh sách đọc tay.

Phần phải đọc (không tự kết luận): **cặp `说人话` gốc ↔ `Nói dễ hiểu` Việt** cho từng mục, câu hỏi duy nhất: *mục Việt có đang khẳng định đúng cái mục gốc khẳng định, với đúng ngoại lệ của nó không?* Đây là việc của agent đọc hoặc của người, không phải của regex — nhưng danh sách để đọc thì máy dựng được, và đó là thứ biến khâu này từ 45 phút thành 10 phút.

Kết quả chạy thử trên chương 6 (làm tay, trước khi có tool): 35/35 tiêu đề cùng chủ đề, **0 mục bịa, 0 mục lật ngược kết luận**, 6 lần hạ hạng so với gốc (đã ghi vào "Lưu ý đã xử lý"), 4 số Việt Nam thay số Trung Quốc (đã đưa vào danh sách phải mở lại). Nghĩa là chương 6 đạt về ý, nhưng **nếu không ai chạy bước này thì không ai biết** — đó chính là lý do nó phải thành stage.

### Không cần tool mới
`check-plain`, `check-refs`, `check-split`, `check-selfcheck`, `sync-stats`, `updates`, 4 build, `check-draft`, `merge-drafts`, `verify-dois.py` — giữ nguyên, pipeline chỉ gọi.

## 6. Chốt duyệt — cưỡng chế bằng mã, không bằng lời dặn

1. Stage `prep` tính `hash = sha256(cây làm việc của các file sẽ commit)` và ghi vào gói duyệt.
2. Người duyệt đọc gói 1 trang rồi chạy `node tools/approve.mjs --chapter 7` → ghi `approval.json` = `{hash, ts, by}`.
3. Stage `release` **từ chối chạy** nếu `hash` hiện tại ≠ `hash` đã duyệt (tức là có ai sửa thêm sau khi duyệt). Không có cờ `--force`. Muốn duyệt lại thì chạy lại `approve`.
4. `approval.json` **không** vào git (thuộc `dist/`), nhưng hash thì in vào commit body để về sau truy được "commit này ứng với bản đã duyệt nào".

Gói duyệt 1 trang (tự sinh, `dist/pipeline/NN/duyet.html`) gồm: N mục · phân bố A/B/C **đếm thật** · 6 cổng xanh/đỏ · số góp ý CLI áp/bỏ theo lý do · 8–12 con số rủi ro nhất kèm nguồn + ngày tra · danh sách "chỗ cố ý khác bản gốc" · diff stat so với lần duyệt trước. Đây là thứ thay cho việc đọc 300.000 ký tự.

## 7. Đo lường (để biết tự động hoá có làm hỏng chất lượng)

Mỗi lần chạy ghi `dist/pipeline/NN/metrics.json`, so với chương trước:

| Chỉ số | Ngưỡng cảnh báo |
|---|---|
| Số stage phải chạy lại (retry) | > 2 → xem lại prompt stage đó |
| `check-plain` lỗi phát sinh sau patch | > 0 và phải revert > 20% số câu áp → prompt CLI có vấn đề |
| `hygiene` phát hiện lỗi ráp | tăng liên tiếp 2 chương → dừng tự động, xem tay |
| % góp ý CLI bị bỏ theo lý do "chỉ làm trơn tru" | > 90% → CLI đang đọc sai giọng sách (đã đúng ở chương 5) |
| Số con số rủi ro phải mở tay | > 15 → agent tra cứu kém, siết gói ngữ cảnh |
| Thời gian chương | tăng > 50% so với trung bình 3 chương trước |
| Số mục lệch giữa `map-NN.json` và file chương | > 0 = luôn đỏ, không có ngoại lệ |

## 8. Triển khai theo 3 đợt (mỗi đợt tự đứng được)

**P0 — 4 tool bắt lỗi (~0,5 ngày).** `check-titles.mjs`, `hygiene.mjs`, `verify-claims.mjs`, `check-fidelity.mjs`. Chạy ngay trên chương 1–6 đã có để **tìm lỗi cũ**, không chỉ để chuẩn bị cho chương 7. Điều kiện xong: `check-titles` đỏ trên fixture chương 3 mục 14; `hygiene` chạy sạch trên 6 chương hiện tại (hoặc tìm ra lỗi thật thì báo); `verify-claims` chạy hết 215 nguồn và phân loại đúng 3 nhóm (lỗi thật / chặn bot / lỗi site).

**P1 — orchestrator S1–S8 (~1 ngày).** `pipeline.mjs` + `patch-apply.mjs` + state/resume. Chạy thử "khô" trên chương 6 (đã xong) để so kết quả máy làm với kết quả đã làm tay: nếu số góp ý áp được và nội dung cuối khác bản tay ở chỗ nào thì phải giải thích được.

**P2 — release + CI (~0,5–1 ngày).** S9–S12, approval token, và đưa S3/S7/S8 (`check-titles`, cổng mở đầu, 6 cổng + build) vào GitHub Actions để **PR/commit không thể xanh khi thiếu cổng**, kể cả khi ai đó commit tay.

Sau P2: chạy thử trọn chương 7 end-to-end. Chương 7 được chọn vì đã có sẵn file gốc `book/07-没钱的时候怎么活.md` (23 mục), chưa viết mục nào.

## 9. Rủi ro & điều không nên tự động

- **CLI ngoài là thứ không ổn định nhất.** Codex đôi khi trả prose thay vì bảng, Claude `-p` im lặng 45 phút rồi mới ghi file. Pipeline phải coi "không parse được bảng" là **đỏ**, không phải "0 góp ý" — nếu không, tự động hoá sẽ âm thầm bỏ qua cả khâu soát.
- **Số liệu pháp lý không tự động được.** Không CLI nào mở được bản ký scan; giao việc đó cho máy là cách nhanh nhất sinh ra "số đúng nhưng không có trong văn bản". Vì vậy S4 sinh danh sách chứ không tự kết luận.
- **Đừng để pipeline tự sửa `map-NN.json`** để khớp với file chương. File map là nguồn; sửa map cho khớp nội dung là đúng cái lỗi "mục bịa" được hợp thức hoá.
- **Đừng chạy 3 agent song song cho 2 chương cùng lúc**: 6 agent cùng đọc skill này, cùng mở PDF, dễ đốt ngân sách và tranh nhau ghi sổ.
- **Chi phí**: 3 agent DeepSeek + 2 CLI trên gói subscription → biên tế bào thấp, nhưng thời gian thì thật (1 giờ máy/chương). Chạy 1 chương/lần theo cron, có `--resume`, không xếp hàng 5 chương.

## 10. Quyết định đang chờ anh (3 câu)

1. **Ai là orchestrator**: `tools/pipeline.mjs` trong repo (đề xuất — tự đứng, chạy được trong CI, không phụ thuộc Hermes) hay biến nó thành một **workflow của Task Center v2** (được UI + audit sẵn, nhưng buộc dự án sách vào hạ tầng công việc)?
2. **Soát văn phong có giữ 2 CLI không**: 2 CLI song song cùng chương (có đối chứng, tốn thêm 15 phút + tốn quota subscription) hay chỉ 1 CLI luân phiên như hiện nay?
3. **Chốt duyệt**: giữ 1 chốt/chương như thiết kế, hay cho phép gộp 3 chương/1 lần duyệt (nhanh hơn nhưng gói duyệt dài gấp 3, và lỗi hệ thống sẽ lan 3 chương trước khi bị bắt)?
