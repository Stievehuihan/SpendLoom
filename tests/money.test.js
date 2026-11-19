const test = require("node:test");
const assert = require("node:assert");
const { parseAmount, totalForMonth, totalsByMonth } = require("../src/money.js");

test("parseAmount reads brazilian and plain formats", () => {
  assert.equal(parseAmount("1.234,56"), 1234.56);
  assert.equal(parseAmount("R$ 42,90"), 42.9);
  assert.equal(parseAmount("1234.56"), 1234.56);
  assert.equal(parseAmount("  10 "), 10);
});

test("parseAmount refuses junk instead of returning zero", () => {
  assert.ok(Number.isNaN(parseAmount("")));
  assert.ok(Number.isNaN(parseAmount("abc")));
});

test("totalForMonth only counts the requested month", () => {
  const rows = [
    { month: "2026-11", amount: 10.5 },
    { month: "2026-11", amount: "9.5" },
    { month: "2026-10", amount: 99 },
    { month: "2026-11", amount: "oops" },
  ];
  assert.equal(totalForMonth(rows, "2026-11"), 20);
});

test("totalsByMonth is sorted newest first and tolerant of bad rows", () => {
  const rows = [
    { month: "2026-09", amount: 5 },
    { month: "2026-11", amount: 1.25 },
    { month: "2026-11", amount: 1.25 },
    { month: "2026-10", amount: 3 },
    { month: null, amount: 7 },
  ];
  assert.deepEqual(totalsByMonth(rows), [
    { month: "2026-11", total: 2.5 },
    { month: "2026-10", total: 3 },
    { month: "2026-09", total: 5 },
  ]);
});
