/**
 * Money helpers used by the expense form and the monthly summary.
 * Kept free of DOM access so they can be tested with node:test.
 */
(function (root) {
  "use strict";

  /** Parse a value typed into the amount field. Accepts "1.234,56" and "1234.56". */
  function parseAmount(raw) {
    if (typeof raw !== "string") return NaN;
    var s = raw.trim().replace(/\s/g, "").replace(/R\$/g, "");
    if (!s) return NaN;
    var lastComma = s.lastIndexOf(",");
    var lastDot = s.lastIndexOf(".");
    if (lastComma > lastDot) {
      s = s.replace(/\./g, "").replace(",", ".");
    } else {
      s = s.replace(/,/g, "");
    }
    var n = Number(s);
    return Number.isFinite(n) ? Math.round(n * 100) / 100 : NaN;
  }

  /** Sum of the amounts of one month, ignoring malformed entries. */
  function totalForMonth(expenses, monthKey) {
    return (expenses || [])
      .filter(function (e) { return e && e.month === monthKey; })
      .reduce(function (sum, e) {
        var n = Number(e.amount);
        return sum + (Number.isFinite(n) ? n : 0);
      }, 0);
  }

  /** Group totals by `YYYY-MM`, newest month first. */
  function totalsByMonth(expenses) {
    var acc = {};
    (expenses || []).forEach(function (e) {
      if (!e || !e.month) return;
      var n = Number(e.amount);
      if (!Number.isFinite(n)) return;
      acc[e.month] = Math.round(((acc[e.month] || 0) + n) * 100) / 100;
    });
    return Object.keys(acc).sort().reverse().map(function (m) {
      return { month: m, total: Math.round(acc[m] * 100) / 100 };
    });
  }

  var api = { parseAmount: parseAmount, totalForMonth: totalForMonth, totalsByMonth: totalsByMonth };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.Money = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
