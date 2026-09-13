/* ==========================================================================
   Demon Store — cart page
   ========================================================================== */

function renderCartPage() {
  const root = document.getElementById("cartContent");
  const cart = readCart();

  if (cart.length === 0) {
    root.innerHTML = `
      <div class="cart-empty">
        <div class="icon-wrap"><i data-lucide="shopping-bag"></i></div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet. Start shopping to fill it up.</p>
        <a href="shop.html" class="btn btn--primary">Start Shopping</a>
      </div>`;
    if (window.lucide) lucide.createIcons();
    return;
  }

  const lines = cart
    .map((line) => {
      const product = getProductById(line.productId);
      if (!product) return "";
      return `
        <div class="cart-item" data-line-key="${cartLineKey(line.productId, line.option)}">
          <div class="cart-item-img"><img src="${product.image}" alt="${product.name}" /></div>
          <div>
            <a href="product.html?id=${product.id}" class="cart-item-name">${product.name}</a>
            ${line.option ? `<div class="cart-item-option">${line.option}</div>` : ""}
            <div class="cart-item-price">${formatNaira(product.price)} each</div>
          </div>
          <div class="cart-item-right">
            <div class="qty-stepper">
              <button type="button" data-qty-decrease>−</button>
              <span>${line.quantity}</span>
              <button type="button" data-qty-increase>+</button>
            </div>
            <button type="button" class="cart-item-remove" data-remove-line><i data-lucide="trash-2"></i> Remove</button>
          </div>
        </div>`;
    })
    .join("");

  const subtotal = cartSubtotal();
  const total = subtotal + DELIVERY_FEE;

  root.innerHTML = `
    <div class="cart-layout">
      <div>${lines}</div>
      <div class="summary-card">
        <h3>Order Summary</h3>
        <div class="summary-row"><span>Subtotal</span><span>${formatNaira(subtotal)}</span></div>
        <div class="summary-row"><span>Delivery fee</span><span>${formatNaira(DELIVERY_FEE)}</span></div>
        <div class="summary-row total"><span>Total</span><span>${formatNaira(total)}</span></div>
        <a href="checkout.html" class="btn btn--primary btn--block">Proceed to Checkout</a>
        <a href="shop.html" class="btn btn--outline btn--block" style="margin-top:10px;">Continue Shopping</a>
      </div>
    </div>`;

  if (window.lucide) lucide.createIcons();
  bindCartLineEvents();
}

function bindCartLineEvents() {
  document.querySelectorAll(".cart-item").forEach((item) => {
    const key = item.getAttribute("data-line-key");
    const cart = readCart();
    const line = cart.find((l) => cartLineKey(l.productId, l.option) === key);
    if (!line) return;

    item.querySelector("[data-qty-increase]").addEventListener("click", () => {
      updateCartQuantity(line.productId, line.option, line.quantity + 1);
      renderCartPage();
    });
    item.querySelector("[data-qty-decrease]").addEventListener("click", () => {
      updateCartQuantity(line.productId, line.option, line.quantity - 1);
      renderCartPage();
    });
    item.querySelector("[data-remove-line]").addEventListener("click", () => {
      removeFromCart(line.productId, line.option);
      renderCartPage();
    });
  });
}

document.addEventListener("DOMContentLoaded", renderCartPage);
