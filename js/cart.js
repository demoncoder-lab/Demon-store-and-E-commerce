/* ==========================================================================
   Demon Store — cart engine (persisted in localStorage)
   ========================================================================== */

const CART_KEY = "demonstore_cart";
const DELIVERY_FEE = 2500;

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function writeCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function cartLineKey(productId, option) {
  return productId + "::" + (option || "default");
}

function addToCart(productId, quantity = 1, option = null) {
  const cart = readCart();
  const key = cartLineKey(productId, option);
  const existing = cart.find((line) => cartLineKey(line.productId, line.option) === key);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity, option });
  }
  writeCart(cart);
}

function updateCartQuantity(productId, option, quantity) {
  let cart = readCart();
  const key = cartLineKey(productId, option);
  if (quantity <= 0) {
    cart = cart.filter((line) => cartLineKey(line.productId, line.option) !== key);
  } else {
    const line = cart.find((l) => cartLineKey(l.productId, l.option) === key);
    if (line) line.quantity = quantity;
  }
  writeCart(cart);
}

function removeFromCart(productId, option) {
  const key = cartLineKey(productId, option);
  const cart = readCart().filter((line) => cartLineKey(line.productId, line.option) !== key);
  writeCart(cart);
}

function clearCart() {
  writeCart([]);
}

function cartCount() {
  return readCart().reduce((sum, line) => sum + line.quantity, 0);
}

function cartSubtotal() {
  return readCart().reduce((sum, line) => {
    const product = getProductById(line.productId);
    return product ? sum + product.price * line.quantity : sum;
  }, 0);
}

function updateCartBadge() {
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    const count = cartCount();
    el.textContent = count;
    el.classList.toggle("is-hidden", count === 0);
  });
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
