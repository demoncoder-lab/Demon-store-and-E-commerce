/* ==========================================================================
   Demon Store — checkout page
   ========================================================================== */

const NIGERIAN_STATES = [
  "Lagos", "Abuja (FCT)", "Oyo", "Rivers", "Kano", "Kaduna", "Enugu", "Delta",
  "Ogun", "Edo", "Anambra", "Imo", "Plateau", "Cross River", "Akwa Ibom",
];

function renderCheckoutForm() {
  const root = document.getElementById("checkoutRoot");
  const cart = readCart();

  if (cart.length === 0) {
    root.innerHTML = `
      <div class="cart-empty">
        <div class="icon-wrap"><i data-lucide="shopping-bag"></i></div>
        <h2>Your cart is empty</h2>
        <p>Add a few items before checking out.</p>
        <a href="shop.html" class="btn btn--primary">Start Shopping</a>
      </div>`;
    if (window.lucide) lucide.createIcons();
    return;
  }

  const subtotal = cartSubtotal();
  const total = subtotal + DELIVERY_FEE;

  const orderLines = cart
    .map((line) => {
      const p = getProductById(line.productId);
      if (!p) return "";
      return `
        <div class="order-line">
          <span class="name">${p.name} ${line.option ? `(${line.option})` : ""} × ${line.quantity}</span>
          <span>${formatNaira(p.price * line.quantity)}</span>
        </div>`;
    })
    .join("");

  root.innerHTML = `
    <div class="checkout-layout">
      <form id="checkoutForm" novalidate>
        <div class="form-card">
          <h3><i data-lucide="user"></i> Customer Details</h3>
          <div class="form-grid cols-2">
            <div class="field" data-field="fullName">
              <label for="fullName">Full name</label>
              <input type="text" id="fullName" name="fullName" placeholder="e.g. Ifeoma Chukwu" />
              <span class="field-error">Please enter your full name.</span>
            </div>
            <div class="field" data-field="phone">
              <label for="phone">Phone number</label>
              <input type="tel" id="phone" name="phone" placeholder="e.g. 0803 123 4567" />
              <span class="field-error">Please enter a valid Nigerian phone number.</span>
            </div>
          </div>
          <div class="form-grid" style="margin-top:16px;">
            <div class="field" data-field="email">
              <label for="email">Email address</label>
              <input type="email" id="email" name="email" placeholder="e.g. ifeoma@email.com" />
              <span class="field-error">Please enter a valid email address.</span>
            </div>
          </div>
        </div>

        <div class="form-card">
          <h3><i data-lucide="map-pin"></i> Delivery Address</h3>
          <div class="form-grid" style="margin-bottom:16px;">
            <div class="field" data-field="address">
              <label for="address">Delivery address</label>
              <textarea id="address" name="address" placeholder="House number, street, area/landmark"></textarea>
              <span class="field-error">Please enter your delivery address.</span>
            </div>
          </div>
          <div class="form-grid cols-2">
            <div class="field" data-field="state">
              <label for="state">State</label>
              <select id="state" name="state">
                <option value="">Select state</option>
                ${NIGERIAN_STATES.map((s) => `<option value="${s}">${s}</option>`).join("")}
              </select>
              <span class="field-error">Please select your state.</span>
            </div>
            <div class="field" data-field="city">
              <label for="city">City / Town</label>
              <input type="text" id="city" name="city" placeholder="e.g. Ikeja" />
              <span class="field-error">Please enter your city or town.</span>
            </div>
          </div>
        </div>

        <div class="form-card">
          <h3><i data-lucide="wallet"></i> Payment Method</h3>
          <div class="payment-options">
            <label class="payment-option is-selected">
              <input type="radio" name="payment" value="Bank Transfer" checked />
              <i data-lucide="landmark"></i>
              <span class="payment-option-label"><strong>Bank Transfer</strong><span>Pay directly to our account, confirmed instantly</span></span>
            </label>
            <label class="payment-option">
              <input type="radio" name="payment" value="Card Payment" />
              <i data-lucide="credit-card"></i>
              <span class="payment-option-label"><strong>Card Payment</strong><span>Pay securely with your debit card</span></span>
            </label>
            <label class="payment-option">
              <input type="radio" name="payment" value="Pay on Delivery" />
              <i data-lucide="banknote"></i>
              <span class="payment-option-label"><strong>Pay on Delivery</strong><span>Pay cash when your order arrives</span></span>
            </label>
          </div>
        </div>
      </form>

      <div class="summary-card">
        <h3>Order Summary</h3>
        <div>${orderLines}</div>
        <div class="summary-row"><span>Subtotal</span><span>${formatNaira(subtotal)}</span></div>
        <div class="summary-row"><span>Delivery fee</span><span>${formatNaira(DELIVERY_FEE)}</span></div>
        <div class="summary-row total"><span>Total</span><span>${formatNaira(total)}</span></div>
        <button type="submit" form="checkoutForm" class="btn btn--primary btn--block" id="placeOrderBtn">Place Order</button>
        <p style="font-size:0.78rem; color:var(--color-text-muted); margin-top:12px; text-align:center;">This is a demo store — no real payment will be processed.</p>
      </div>
    </div>`;

  if (window.lucide) lucide.createIcons();
  bindPaymentOptionStyles();
  bindCheckoutSubmit();
}

function bindPaymentOptionStyles() {
  document.querySelectorAll(".payment-option").forEach((option) => {
    option.addEventListener("click", () => {
      document.querySelectorAll(".payment-option").forEach((o) => o.classList.remove("is-selected"));
      option.classList.add("is-selected");
    });
  });
}

function validateCheckoutForm(form) {
  const data = new FormData(form);
  let isValid = true;

  const rules = {
    fullName: (v) => v.trim().length >= 3,
    phone: (v) => /^(\+?234|0)[789][01]\d{8}$/.test(v.replace(/\s/g, "")),
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    address: (v) => v.trim().length >= 8,
    state: (v) => v.trim().length > 0,
    city: (v) => v.trim().length >= 2,
  };

  Object.entries(rules).forEach(([field, rule]) => {
    const fieldEl = form.querySelector(`[data-field="${field}"]`);
    const value = data.get(field) || "";
    const valid = rule(value);
    fieldEl.classList.toggle("has-error", !valid);
    if (!valid) isValid = false;
  });

  return isValid;
}

function bindCheckoutSubmit() {
  const form = document.getElementById("checkoutForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateCheckoutForm(form)) {
      const firstError = form.querySelector(".has-error");
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    placeOrder(new FormData(form));
  });
}

function placeOrder(formData) {
  const cart = readCart();
  const subtotal = cartSubtotal();
  const total = subtotal + DELIVERY_FEE;
  const orderId = "DS-" + Math.floor(100000 + Math.random() * 900000);
  const customerName = formData.get("fullName");
  const paymentMethod = formData.get("payment");

  const itemLines = cart
    .map((line) => {
      const p = getProductById(line.productId);
      return p ? `- ${p.name}${line.option ? ` (${line.option})` : ""} × ${line.quantity}` : "";
    })
    .join("\n");

  const message =
    `Hello Demon Store, I just placed an order on the website.\n\n` +
    `Order ID: ${orderId}\nName: ${customerName}\n\n${itemLines}\n\n` +
    `Total: ${formatNaira(total)}\nPayment method: ${paymentMethod}\n\n` +
    `Please confirm my order.`;

  const root = document.getElementById("checkoutRoot");
  root.innerHTML = `
    <div class="order-success">
      <div class="icon-wrap"><i data-lucide="check-circle-2"></i></div>
      <h2>Order placed successfully!</h2>
      <p>Thank you, ${customerName}. We've received your order and will begin processing it right away. A confirmation has been prepared for our team.</p>
      <span class="order-success-id">Order ${orderId}</span>
      <div class="order-success-actions">
        <a href="${whatsappLink(message)}" target="_blank" rel="noopener" class="btn btn--whatsapp"><i data-lucide="message-circle"></i> Confirm via WhatsApp</a>
        <a href="shop.html" class="btn btn--outline">Continue Shopping</a>
      </div>
    </div>`;

  clearCart();
  if (window.lucide) lucide.createIcons();
}

document.addEventListener("DOMContentLoaded", renderCheckoutForm);
