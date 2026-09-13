/* ==========================================================================
   Demon Store — homepage rendering
   ========================================================================== */

function starIcons(rating) {
  const full = Math.round(rating);
  let html = "";
  for (let i = 0; i < 5; i++) {
    html += `<i data-lucide="star" ${i < full ? 'fill="currentColor"' : ""}></i>`;
  }
  return html;
}

function renderCategoryCards(container) {
  if (!container) return;
  container.innerHTML = CATEGORIES.map(
    (c) => `
    <a class="category-card" href="shop.html?category=${c.id}">
      <div class="icon-wrap"><i data-lucide="${c.icon}"></i></div>
      <span>${c.name}</span>
    </a>`
  ).join("");
}

function renderProductCard(p) {
  const badge = p.badge
    ? `<span class="product-badge product-badge--${p.badge}">${p.badge === "sale" ? "Sale" : "New"}</span>`
    : "";
  const oldPrice = p.oldPrice ? `<span class="price-old">${formatNaira(p.oldPrice)}</span>` : "";
  return `
    <div class="product-card">
      <a href="product.html?id=${p.id}" class="product-card-media">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        ${badge}
        <span class="product-card-quick" aria-hidden="true"><i data-lucide="eye"></i></span>
      </a>
      <div class="product-card-body">
        <span class="product-card-cat">${p.category}</span>
        <a href="product.html?id=${p.id}" class="product-card-name">${p.name}</a>
        <div class="product-card-rating">
          <span class="stars">${starIcons(p.rating)}</span>
          <span>${p.rating} (${p.reviews})</span>
        </div>
        <div class="product-card-price">
          <span class="price-now">${formatNaira(p.price)}</span>
          ${oldPrice}
        </div>
        <div class="product-card-actions">
          <button class="btn btn--outline btn--sm" data-add-to-cart="${p.id}">Add to Cart</button>
          <a href="product.html?id=${p.id}" class="btn btn--dark btn--sm">View</a>
        </div>
      </div>
    </div>`;
}

function renderProductGrid(container, products) {
  if (!container) return;
  container.innerHTML = products.map(renderProductCard).join("");
}

function renderTestimonials(container) {
  if (!container) return;
  container.innerHTML = TESTIMONIALS.map(
    (t) => `
    <div class="testimonial-card">
      <span class="stars">${starIcons(t.rating)}</span>
      <p>"${t.text}"</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.name.charAt(0)}</div>
        <div>
          <strong>${t.name}</strong>
          <span>${t.location}</span>
        </div>
      </div>
    </div>`
  ).join("");
}

function renderFooterCategories(container) {
  if (!container) return;
  container.innerHTML = CATEGORIES.slice(0, 6)
    .map((c) => `<li><a href="shop.html?category=${c.id}">${c.name}</a></li>`)
    .join("");
}

function bindAddToCartButtons(root = document) {
  root.querySelectorAll("[data-add-to-cart]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-add-to-cart");
      addToCart(id, 1);
      const product = getProductById(id);
      showToast(`${product.name} added to cart`);
    });
  });
}

function showToast(message) {
  const toast = document.querySelector("[data-toast]");
  const msgEl = document.querySelector("[data-toast-message]");
  if (!toast || !msgEl) return;
  msgEl.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function setWhatsappLinks() {
  const generalMessage = "Hello Demon Store, I'd like to know more about your products.";
  document.querySelectorAll("#floatingWhatsapp, #footerWhatsappLink").forEach((el) => {
    el.href = whatsappLink(generalMessage);
  });
  const agencyLink = document.getElementById("agencyWhatsappLink");
  if (agencyLink) {
    agencyLink.href = whatsappLink(
      "Hello Demon Coder, I saw the Demon Store demo and I'd like to get a website like this built for my business."
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategoryCards(document.getElementById("homeCategoryGrid"));
  const bestSellers = [...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 8);
  renderProductGrid(document.getElementById("bestSellerGrid"), bestSellers);
  renderTestimonials(document.getElementById("testimonialGrid"));
  renderFooterCategories(document.getElementById("footerCategoryList"));
  setWhatsappLinks();
  bindAddToCartButtons();
  if (window.lucide) lucide.createIcons();
});
