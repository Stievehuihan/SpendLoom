# SpendLoom

A monthly expense tracker that runs from a single static page — no framework, no build
step, no account. Everything lives in `localStorage`, so the data never leaves the browser.

![pages](https://img.shields.io/badge/site-static-2f6f4e) ![tests](https://img.shields.io/badge/tests-node%3Atest-1f6feb) ![license](https://img.shields.io/badge/license-MIT-blue)

## What it does

- records an expense with description, amount and month
- filters the table by month and shows the running total for that month
- exports the visible rows to CSV
- clears everything with one action, behind a confirmation

## Run it

```bash
git clone https://github.com/Stievehuihan/SpendLoom.git
cd SpendLoom
python -m http.server 8000
# open http://localhost:8000
```

No install step: the page loads `src/money.js` for parsing and totals and `script.js`
for the UI.

## Tests

```bash
node --test tests/
```

`src/money.js` is deliberately free of DOM access, which is what makes it testable:

| function | used for |
|---|---|
| `parseAmount` | reads `1.234,56` and `1234.56` the same way, returns `NaN` for junk |
| `totalForMonth` | month total, ignoring malformed rows instead of poisoning the sum |
| `totalsByMonth` | grouped totals, newest month first |

## Structure

```
index.html        markup: form, month filter, table, summary card
styles.css        layout, palette, responsive rules (media query.css holds the breakpoints)
script.js         DOM wiring: render, submit, delete, export, clear
src/money.js      parsing and totals, no DOM
tests/            node:test suite for the module above
```

## Design notes

- the table is rendered from the same array that is persisted, so a reload cannot show a
  different list than the one on screen
- amounts are rounded to cents at the boundary (`Math.round(x * 100) / 100`), never mid-sum
- the empty state is part of the table, not a separate page

## License

MIT — see `LICENSE`.
