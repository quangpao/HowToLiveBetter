#set page(width: 1200pt, height: 630pt, margin: 0pt, fill: rgb("#fcfcfd"))
#set text(font: "New Computer Modern", size: 24pt, fill: rgb("#1b1b1f"))
#let s = sys.inputs
#let pill(body, fill, color) = box(fill: fill, radius: 30pt, inset: (x: 22pt, y: 12pt))[
  #text(size: 24pt, weight: "bold", fill: color, body)
]
#place(top + right)[#rect(width: 510pt, height: 190pt, fill: rgb("#f1f1ff"), stroke: none)]
#place(top + left)[#rect(width: 1200pt, height: 8pt, fill: gradient.linear(rgb("#3451b2"), rgb("#18794e")))]
#place(top + left, dx: 84pt, dy: 78pt)[#text(size: 25pt, weight: "bold", fill: rgb("#586069"), s.brand)]
#place(top + left, dx: 84pt, dy: 178pt)[
  #text(size: 51pt, weight: "bold", s.title1)
]
#place(top + left, dx: 84pt, dy: 242pt)[
  #text(size: 51pt, weight: "bold", fill: rgb("#3451b2"), s.title2)
]
#place(top + left, dx: 84pt, dy: 328pt)[
  #block(width: 1032pt)[#text(size: 26pt, fill: rgb("#66666c"), s.description)]
]
#place(top + left, dx: 84pt, dy: 432pt)[
  #grid(columns: (auto, auto, auto), gutter: 14pt,
    pill(s.items + " mục", rgb("#e4e8fc"), rgb("#3451b2")),
    pill("bằng chứng A " + s.grade + " mục", rgb("#e1f3eb"), rgb("#18794e")),
    pill(s.sources + " liên kết nguồn", rgb("#f1f1f3"), rgb("#52525b")),
  )
]
#place(top + left, dx: 84pt, dy: 508pt)[
  #pill(s.filter, rgb("#f1f1f3"), rgb("#52525b"))
]
