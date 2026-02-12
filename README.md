![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Cash Register](https://img.shields.io/badge/Cash_Register-0A0A23?style=for-the-badge&logo=freecodecamp&logoColor=white)

An old project build back in 2024 as the start of my journey and posted here to preserve my path.

A cash register application — the fourth project in FreeCodeCamp's JavaScript Algorithms and Data Structures certification. Calculates change due based on purchase price, cash provided, and current cash-in-drawer (CID), handling three possible statuses: `OPEN`, `CLOSED`, and `INSUFFICIENT_FUNDS`.

The project only consists of **JavaScript** + **HTML** + **CSS** and was made as a part of FreeCodeCamp's JavaScript Algorithms and Data Structures course.

>[My official FCC's Certificate](https://www.freecodecamp.org/certification/fcc058fd235-9bca-44b6-b085-10ee4a9bdda6/javascript-algorithms-and-data-structures-v8)

![Certificate](./public/JavaScript-Algorithms-and-Data-Structures.png)

---

## 📋 Project Requirements

This project fulfills all **9 user stories** from FreeCodeCamp's "Build a Cash Register" challenge:

<details>
<summary><b>Click to expand the full requirements</b></summary>

<br>

**User Stories:**
- [x] `input` element with `id="cash"`
- [x] `div`, `span`, or `p` element with `id="change-due"`
- [x] `button` element with `id="purchase-btn"`
- [x] `#cash` < `price` → alert: `"Customer does not have enough money to purchase the item"`
- [x] `#cash` = `price` → `"No change due - customer paid with exact cash"`
- [x] Test case 1 (19.5/20, normal drawer) → `"Status: OPEN QUARTER: $0.5"`
- [x] Test case 2 (3.26/100, large drawer) → `"Status: OPEN TWENTY: $60 TEN: $20 FIVE: $15 ONE: $1 QUARTER: $0.5 DIME: $0.2 PENNY: $0.04"`
- [x] Test case 3 (19.5/20, insufficient drawer) → `"Status: INSUFFICIENT_FUNDS"`
- [x] Test case 4 (19.5/20, cannot make exact change) → `"Status: INSUFFICIENT_FUNDS"`
- [x] Test case 5 (19.5/20, exact match drawer) → `"Status: CLOSED PENNY: $0.5"`

</details>

**All tests passed** ✅

---

## 🎨 About the Project

That one was a living nightmare. It seems FCC's metrics required only one specific way of accepting the requirements so it wasn't really write a code to work it was more like find the appropriate code to apply. I looked tons of videos on Youtube of people who are good at JS trying to pass all the requirements and even they had hard times with it. My local repo has even several js files with all those tries. So it took me the whole December to find the right approach. Though the CSS cash register turned out nicely I think.

![Page Gif](./public/demo.gif)

<div align="right"><i>submitted to FreeCodeCamp on Dec 30, 2024</i></div>

---

## 🔗 Live Demo

[![Live Demo](https://img.shields.io/badge/demo-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://rue-eru.github.io/FCC-JS-4-cash-register/)
---

*Part of my [FreeCodeCamp journey](https://www.freecodecamp.org/certification/fcc058fd235-9bca-44b6-b085-10ee4a9bdda6/javascript-algorithms-and-data-structures-v8)*

