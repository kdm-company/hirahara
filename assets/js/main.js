/* 平原こうや 公式サイト 共通スクリプト */
(function () {
  "use strict";

  /* フローティングヘッダー（ヒーローのあるトップのみ） */
  var fhdr = document.getElementById("fhdr");
  if (fhdr && document.body.dataset.hero) {
    var onScroll = function () {
      fhdr.classList.toggle("is-shown", window.pageYOffset > window.innerHeight * 0.55);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ハンバーガーメニュー */
  var btn = document.getElementById("menuBtn"),
      nav = document.getElementById("nav"),
      cls = document.getElementById("navClose");
  if (btn && nav) {
    var setNav = function (open) {
      nav.setAttribute("data-open", open ? "true" : "false");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
      if (open) { var f = nav.querySelector("a"); if (f) f.focus(); } else { btn.focus(); }
    };
    btn.addEventListener("click", function () {
      setNav(nav.getAttribute("data-open") !== "true");
    });
    if (cls) cls.addEventListener("click", function () { setNav(false); });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setNav(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.getAttribute("data-open") === "true") setNav(false);
    });
  }

  /* 横スワイプの進捗バー */
  document.querySelectorAll("[data-rail]").forEach(function (rail) {
    var t = document.querySelector(".track b");
    if (!t) return;
    var upd = function () {
      var max = rail.scrollWidth - rail.clientWidth,
          ratio = Math.max(rail.clientWidth / rail.scrollWidth, 0.2);
      t.style.width = ratio * 100 + "%";
      var p = max > 0 ? rail.scrollLeft / max : 0;
      t.style.transform = "translateX(" + p * (100 / ratio - 100) + "%)";
    };
    rail.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    upd();
  });

  /* スクロールに合わせた表示 */
  var rv = document.querySelectorAll(".rv");
  if (rv.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px" });
      rv.forEach(function (el) { io.observe(el); });
    } else {
      rv.forEach(function (el) { el.classList.add("is-in"); });
    }
  }

  /* 活動ページ：カテゴリの絞り込み */
  var chips = document.querySelectorAll(".chip[data-filter]");
  if (chips.length) {
    var cards = document.querySelectorAll("#cards .card");
    chips.forEach(function (c) {
      c.addEventListener("click", function () {
        var v = c.getAttribute("data-filter");
        chips.forEach(function (o) {
          o.setAttribute("aria-current", o === c ? "true" : "false");
        });
        cards.forEach(function (card) {
          var hit = v === "all" || card.getAttribute("data-cat") === v;
          card.hidden = !hit;
        });
      });
    });
  }
})();
