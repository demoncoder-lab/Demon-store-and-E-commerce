/* ==========================================================================
   Demon Store — product detail page
   ========================================================================== */

let currentProduct = null;
let selectedOptions = {};
let selectedQty = 1;

function renderProductDetail(product) {
  const root = document.getElementById("productDetailRoot");
  const oldPriceHtml = product.oldPrice
    ? `<span class="price-old">${formatNaira(product.oldPrice)}</span>`
    : "";

  let optionsHtml = "";
  if (product.options) {
    optionsHtml = Object.entries(product.options)
      .map(
        ([groupName, values]) => `
      <div class="option-group" data-option-group="${groupName}">
        <h4>${groupName}</h4>
        <div class="option-pills">
          ${values
            .map(
              (v, i) => `<button type="button" class="option-pill ${i === 0 ? "is-selected" : ""}" data-option-value="${v}">${v}</button>`
            )
            .join("")}
        </div>
      </div>`
      )
      .join("");

    Object.entries(product.options).forEach(([groupName, values]) => {
      selectedOptions[groupName] = values[0];
    });
  }

  root.innerHTML = `
    <div>
      <div class="product-gallery-main">
        <img src="${product.image}" alt="${product.name}" />
      </div>
    </div>
    <div class="product-info">
      <span class="product-info-cat">${product.category}</span>
      <h1 style="display:none"></h1>
      <div class="product-info-meta">
        <span class="stars">${starIcons(product.rating)}</span>
        <span>${product.rating} rating · ${product.reviews} reviews</span>
      </div>
      <div class="product-info-price">
        <span class="price-now">${formatNaira(product.price)}</span>
        ${oldPriceHtml}
      </div>
      <p class="product-info-desc">${product.description}</p>
      ${optionsHtml}
      <div class="product-purchase-row">
        <div class="qty-stepper">
          <button type="button" id="qtyDecrease" aria-label="Decrease quantity">−</button>
          <span id="qtyValue">1</span>
          <button type="button" id="qtyIncrease" aria-label="Increase quantity">+</button>
        </div>
        <span style="font-size:0.85rem; color:var(--color-text-muted);">${product.stock} in stock</span>
      </div>
      <div class="product-actions-row">
        <button class="btn btn--outline" id="addToCartBtn"><i data-lucide="shopping-bag"></i> Add to Cart</button>
        <button class="btn btn--primary" id="buyNowBtn">Buy Now</button>
      </div>
      <div class="product-actions-row">
        <a href="#" id="orderWhatsappBtn" target="_blank" rel="noopener" class="btn btn--whatsapp btn--block"><i data-lucide="message-circle"></i> Order via WhatsApp</a>
      </div>
      <div class="product-trust">
        <div class="product-trust-item"><i data-lucide="shield-check"></i> 100% genuine, quality-checked product</div>
        <div class="product-trust-item"><i data-lucide="truck"></i> Delivery available nationwide</div>
        <div class="product-trust-item"><i data-lucide="rotate-ccw"></i> Easy returns within 7 days</div>
      </div>
      <div class="stock-note"><i data-lucide="check-circle"></i> In stock and ready to ship</div>
    </div>
  `;

  document.getElementById("pageProductName").textContent = product.name;
  document.getElementById("breadcrumbProductName").textContent = product.name;
  document.title = `${product.name} — Demon Store`;

  if (window.lucide) lucide.createIcons();
  bindOptionPills();
  bindQuantityStepper();
  bindPurchaseButtons(product);
}

function bindOptionPills() {
  document.querySelectorAll("[data-option-group]").forEach((group) => {
    const groupName = group.getAttribute("data-option-group");
    group.querySelectorAll(".option-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        group.querySelectorAll(".option-pill").forEach((p) => p.classList.remove("is-selected"));
        pill.classList.add("is-selected");
        selectedOptions[groupName] = pill.getAttribute("data-option-value");
        updateOrderWhatsappLink(currentProduct);
      });
    });
  });
}

function bindQuantityStepper() {
  const qtyValue = document.getElementById("qtyValue");
  document.getElementById("qtyDecrease").addEventListener("click", () => {
    selectedQty = Math.max(1, selectedQty - 1);
    qtyValue.textContent = selectedQty;
    updateOrderWhatsappLink(currentProduct);
  });
  document.getElementById("qtyIncrease").addEventListener("click", () => {
    selectedQty = selectedQty + 1;
    qtyValue.textContent = selectedQty;
    updateOrderWhatsappLink(currentProduct);
  });
}

function optionSummary() {
  const entries = Object.entries(selectedOptions);
  if (entries.length === 0) return null;
  return entries.map(([k, v]) => `${k}: ${v}`).join(", ");
}

function bindPurchaseButtons(product) {
  document.getElementById("addToCartBtn").addEventListener("click", () => {
    addToCart(product.id, selectedQty, optionSummary());
    showToast(`${product.name} added to cart`);
  });

  document.getElementById("buyNowBtn").addEventListener("click", () => {
    addToCart(product.id, selectedQty, optionSummary());
    window.location.href = "cart.html";
  });

  updateOrderWhatsappLink(product);
}

function updateOrderWhatsappLink(product) {
  const link = document.getElementById("orderWhatsappBtn");
  if (!link || !product) return;
  const optSummary = optionSummary();
  let message = `Hello Demon Store, I'd like to order:\n\n${product.name}\nQuantity: ${selectedQty}\nPrice: ${formatNaira(product.price)} each`;
  if (optSummary) message += `\nOptions: ${optSummary}`;
  message += `\n\nPlease confirm availability and delivery to my location.`;
  link.href = whatsappLink(message);
}

function initProductPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = id ? getProductById(id) : null;

  if (!product) {
    document.getElementById("productDetailRoot").innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <div class="icon-wrap"><i data-lucide="package-x"></i></div>
        <h3>Product not found</h3>
        <p>This product may have been removed. <a href="shop.html" class="link-more">Browse the shop</a></p>
      </div>`;
    document.getElementById("pageProductName").textContent = "Product not found";
    document.getElementById("relatedProductsSection").classList.add("is-hidden");
    if (window.lucide) lucide.createIcons();
    return;
  }

  currentProduct = product;
  renderProductDetail(product);

  const related = getRelatedProducts(product);
  renderProductGrid(document.getElementById("relatedProductGrid"), related);
  bindAddToCartButtons(document.getElementById("relatedProductGrid"));
  if (window.lucide) lucide.createIcons();
}

document.addEventListener("DOMContentLoaded", initProductPage);
