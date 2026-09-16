(function () {
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /** Homepage: category labels on cards → stable slugs for ?pickCat= and <select>. */
  function pickCatSlugFromLabel(el) {
    if (!el) return "other";
    var raw = String(el.textContent || "").trim();
    var map = {
      Shoes: "shoes",
      "T-Shirts": "t-shirts",
      "Hoodies/Sweaters": "hoodies-sweaters",
      Outerwear: "outerwear",
      "Pants/Shorts": "pants-shorts",
      Bags: "bags",
      Electronics: "electronics",
      Perfume: "perfume",
      Jersey: "jersey",
      Headwear: "headwear",
      Accessories: "accessories",
      "Other Stuff": "other"
    };
    return map[raw] || "other";
  }

  function normalizeSearch(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/[\u2018\u2019\u2032]/g, "'")
      .replace(/[\u201c\u201d]/g, '"')
      .replace(/\u00a0/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function initCatalogBrowse() {
    var STREETSTYLE_HOME = "https://streetstyle.maisonlooks.com/";
    var STREETSTYLE_SEARCH = "https://streetstyle.maisonlooks.com/en/search?q=";

    var grid = document.querySelector(".page-home .product-picks-grid");
    var input = document.getElementById("catalog-search-input");
    var select = document.getElementById("catalog-category-filter");
    var resetBtn = document.getElementById("catalog-reset");
    var countEl = document.getElementById("catalog-count-msg");
    var emptyEl = document.getElementById("catalog-empty");
    var streetLink = document.getElementById("streetstyle-search-link");
    if (!grid || !countEl || !select) return;

    function rawKeyword() {
      return String(input && input.value ? input.value : "")
        .replace(/\u00a0/g, " ")
        .trim();
    }

    function updateStreetstyleBridge() {
      if (!streetLink) return;
      var q = rawKeyword();
      if (q.length) {
        streetLink.href = STREETSTYLE_SEARCH + encodeURIComponent(q);
        streetLink.title = "Street Style search · MaisonLooks · " + q;
        streetLink.textContent =
          'Search Street Style/MaisonLooks for "' + (q.length > 48 ? q.slice(0, 48) + "…" : q) + '" →';
      } else {
        streetLink.href = STREETSTYLE_HOME;
        streetLink.removeAttribute("title");
        streetLink.textContent = "Open Street Style catalogue (MaisonLooks) →";
      }
    }

    var cards = Array.prototype.slice.call(grid.querySelectorAll(".product-pick-card"));
    if (!cards.length) return;

    var catOrder = [
      ["shoes", "Shoes"],
      ["t-shirts", "T-Shirts"],
      ["hoodies-sweaters", "Hoodies/Sweaters"],
      ["outerwear", "Outerwear"],
      ["pants-shorts", "Pants/Shorts"],
      ["bags", "Bags"],
      ["electronics", "Electronics"],
      ["perfume", "Perfume"],
      ["jersey", "Jersey"],
      ["headwear", "Headwear"],
      ["accessories", "Accessories"],
      ["other", "Other Stuff"]
    ];

    var used = {};
    cards.forEach(function (card) {
      var slug = pickCatSlugFromLabel(card.querySelector(".product-pick-cat"));
      card.setAttribute("data-pick-cat", slug);
      used[slug] = true;
      var body = card.querySelector(".product-pick-body");
      card.dataset.pickSearch = normalizeSearch(body ? body.innerText || body.textContent || "" : "");
    });

    while (select.options.length > 1) {
      select.remove(1);
    }
    catOrder.forEach(function (pair) {
      var slug = pair[0];
      var label = pair[1];
      if (!used[slug]) return;
      var opt = document.createElement("option");
      opt.value = slug;
      opt.textContent = label;
      select.appendChild(opt);
    });

    function applyFilters() {
      var q = normalizeSearch(input ? input.value : "");
      var lane = normalizeSearch(select ? select.value || "" : "");
      var visible = 0;
      cards.forEach(function (card) {
        var slug = card.getAttribute("data-pick-cat") || "other";
        var hay = card.dataset.pickSearch || "";
        var okLane = !lane || slug === lane;
        var okQ = !q || hay.indexOf(q) !== -1;
        var show = okLane && okQ;
        if (show) visible++;
        if (show) card.removeAttribute("hidden");
        else card.setAttribute("hidden", "");
      });
      countEl.textContent =
        visible === cards.length
          ? "Showing all " + visible + " curated picks."
          : "Showing " + visible + " of " + cards.length + " curated picks.";
      if (emptyEl) emptyEl.hidden = visible !== 0;
      updateStreetstyleBridge();
    }

    var params = {};
    try {
      params = new URLSearchParams(window.location.search || "");
    } catch (e) {
      params = { get: function () {} };
    }
    var pre =
      params && typeof params.get === "function"
        ? String(params.get("pickCat") || "")
            .trim()
            .toLowerCase()
        : "";
    if (pre && used[pre]) {
      select.value = pre;
    }

    if (input) {
      input.addEventListener("input", applyFilters);
      input.addEventListener("search", applyFilters);
      input.addEventListener("keydown", function (e) {
        if (e.key !== "Enter") return;
        var q = rawKeyword();
        if (!q.length) return;
        e.preventDefault();
        var a = document.createElement("a");
        a.href = STREETSTYLE_SEARCH + encodeURIComponent(q);
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    }
    select.addEventListener("change", applyFilters);
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        if (input) input.value = "";
        select.value = "";
        applyFilters();
        if (input) input.focus();
      });
    }

    applyFilters();
  }

  initCatalogBrowse();
})();
