$--
$-- Mẫu typst cho pandoc (chỉ nhận $body$ và vài biến -V), không dùng conf() có sẵn của pandoc:
$-- mẫu có sẵn khóa phần thiết lập trang trong conf(), không sửa được đầu trang và chân trang, nên ở đây tự dàn.
$-- Từ đầu đến đoạn divider là các định nghĩa phụ mà phần thân do pandoc sinh ra cần dùng, chép từ `pandoc -D typst`, đừng xóa.
$--
#set terms(hanging-indent: 1.5em)

#set table(inset: 6pt, stroke: none)
// pandoc đặt bảng trong align(center), ô sẽ bị căn giữa theo; bảng chữ căn trái mới dễ đọc
#show table.cell: it => align(left, it)

#let horizontalRule = line(start: (25%, 0%), end: (75%, 0%))
#let divider = if "divider" in std { divider } else { horizontalRule }
// pandoc 3.1 gọi helper này khi gặp trích dẫn; các bản mới dùng quote() trực tiếp.
#let blockquote(body) = block(inset: (left: 12pt), stroke: (left: 0.5pt + luma(180)), body)

#show figure.where(kind: table): set figure.caption(position: top)
#show figure.where(kind: image): set figure.caption(position: bottom)
// Bảng dài phải được ngắt qua trang, không thì cả khối không vừa sẽ để trống cả một trang
#show figure: set block(breakable: true)
#set smartquote(enabled: false)

// ---------- Bố cục ----------
#set document(title: "$booktitle$", author: "quangpao")
#set text(
  // Bản Việt: dùng font có sẵn của typst (Libertinus Serif phủ đủ dấu tiếng Việt)
  font: ("Libertinus Serif", "DejaVu Serif", "Georgia"),
  size: 10.5pt, lang: "vi", region: "vn",
)
#set par(justify: false, leading: 0.78em, spacing: 0.9em)
#set list(indent: 0.6em, spacing: 0.75em)
#show raw: set text(font: ("DejaVu Sans Mono", "Consolas"), size: 9pt)
#show link: set text(fill: rgb("#1a4fb4"))
#show heading: set block(sticky: true, above: 1.5em, below: 0.65em)
#show heading.where(level: 1): set text(19pt)
#show heading.where(level: 2): set text(14pt)
#show heading.where(level: 3): set text(11.5pt)
// Mỗi chương sang trang mới; weak để khi trang trước vừa đầy thì không sinh thêm trang trống
#show heading.where(level: 1): it => { pagebreak(weak: true); it }

// Đầu trang: bên trái tên sách, bên phải tên chương hiện tại; trang đầu của chương không có đầu trang
#let running-head = context {
  let next = query(selector(heading.where(level: 1)).after(here())).at(0, default: none)
  if next != none and next.location().page() == here().page() { return }
  let seen = query(selector(heading.where(level: 1)).before(here()))
  if seen.len() == 0 { return }
  set text(8.5pt, fill: luma(120))
  grid(columns: (1fr, auto), align(left)[$booktitle$], align(right)[#seen.last().body])
  v(-7pt)
  line(length: 100%, stroke: 0.4pt + luma(215))
}

// ---------- Bìa ----------
#set page(paper: "a4", margin: (x: 2.2cm, top: 2.2cm, bottom: 2cm), header: none, footer: none)
#align(center + horizon)[
  #image("/og.png", width: 100%)
  #v(1.2cm)
  #block(width: 80%)[#text(11.5pt, fill: luma(60))[$subtitle$]]
  #v(2cm)
  #text(10pt, fill: luma(90))[
    Dựng lúc $builddate$ (giờ Việt Nam)　·　bản nội dung $commit$ \
    Nội dung còn cập nhật, lấy bản online làm chuẩn: $site$ \
    Bản tra cứu, EPUB và PDF mới nhất đều ở $repo$
  ]
]

// ---------- Mục lục ----------
#pagebreak()
#outline(title: [Mục lục], depth: 1, indent: 1em)

// ---------- Nội dung ----------
#pagebreak(weak: true)
#set page(header: running-head, footer: context align(center, text(8.5pt, fill: luma(120))[#counter(page).at(here()).first() / #counter(page).final().first()]))
#counter(page).update(1)

$body$
