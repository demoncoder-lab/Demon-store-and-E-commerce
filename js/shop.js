/* ==========================================================================
   Demon Store — shop page logic
   ========================================================================== */

function renderCategoryFilters(container, activeCategories) {
  if (!container) return;
  container.innerHTML = CATEGORIES.map(
    (c) => `
    <label class="filter-option">
      <input type="checkbox" value="${c.id}" ${activeCategories.includes(c.id) ? "checked" : ""} />
      ${c.name}
    </label>`
  ).join("");
}

function applyShopFilters() {
  const params = new URLSearchParams(window.location.search);
  const searchInput = document.getElementById("shopSearchInput");
  const query = (searchInput.value || "").trim().toLowerCase();
  const checkedCats = Array.from(
    document.querySelectorAll('#categoryFilterList input[type="checkbox"]:checked')
  ).map((el) => el.value);
  const maxPrice = Number(document.getElementById("priceRange").value);
  const sortValue = document.getElementById("sortSelect").value;

  let results = PRODUCTS.filter((p) => {
    const matchesQuery = !query || p.name.toLowerCase().includes(query) || p.category.includes(query);
    const matchesCategory = checkedCats.length === 0 || checkedCats.includes(p.category);
    const matchesPrice = p.price <= maxPrice;
    return matchesQuery && matchesCategory && matchesPrice;
  });

  switch (sortValue) {
    case "price-asc":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      results.sort((a, b) => b.price - a.price);
      break;
    case "popular":
      results.sort((a, b) => b.reviews - a.reviews);
      break;
    default:
      results.sort((a, b) => (b.badge === "new") - (a.badge === "new"));
  }

  const grid = document.getElementById("shopProductGrid");
  const emptyState = document.getElementById("shopEmptyState");
  const resultCount = document.getElementById("resultCount");

  renderProductGrid(grid, results);
  bindAddToCartButtons(grid);
  if (window.lucide) lucide.createIcons();

  grid.classList.toggle("is-hidden", results.length === 0);
  emptyState.classList.toggle("is-hidden", results.length !== 0);
  resultCount.textContent = `Showing ${results.length} of ${PRODUCTS.length} products`;

  // keep the URL in sync so results are shareable/bookmarkable
  const newParams = new URLSearchParams();
  if (query) newParams.set("q", query);
  checkedCats.forEach((c) => newParams.append("category", c));
  history.replaceState(null, "", `${window.location.pathname}${newParams.toString() ? "?" + newParams.toString() : ""}`);
}

function initShopPage() {
  const grid = document.getElementById("shopProductGrid");
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  const activeCategories = params.getAll("category");
  const searchQuery = params.get("q") || "";

  renderCategoryFilters(document.getElementById("categoryFilterList"), activeCategories);

  const searchInput = document.getElementById("shopSearchInput");
  searchInput.value = searchQuery;

  const priceRange = document.getElementById("priceRange");
  const priceRangeValue = document.getElementById("priceRangeValue");
  priceRange.addEventListener("input", () => {
    priceRangeValue.textContent = formatNaira(priceRange.value);
    applyShopFilters();
  });

  searchInput.addEventListener("input", debounce(applyShopFilters, 200));
  document.getElementById("sortSelect").addEventListener("change", applyShopFilters);
  document.getElementById("categoryFilterList").addEventListener("change", applyShopFilters);

  document.getElementById("resetFiltersBtn").addEventListener("click", () => {
    searchInput.value = "";
    priceRange.value = 200000;
    priceRangeValue.textContent = formatNaira(200000);
    document
      .querySelectorAll('#categoryFilterList input[type="checkbox"]')
      .forEach((el) => (el.checked = false));
    applyShopFilters();
  });

  applyShopFilters();
}

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

document.addEventListener("DOMContentLoaded", initShopPage);
