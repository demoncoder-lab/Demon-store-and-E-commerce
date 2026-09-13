/* ==========================================================================
   Demon Store — shared site behaviour
   ========================================================================== */

function whatsappLink(message) {
  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function initMobileNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");
  const overlay = document.querySelector("[data-nav-overlay]");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  if (overlay) overlay.addEventListener("click", closeMenu);
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
}

function initSearchToggle() {
  const toggle = document.querySelector("[data-search-toggle]");
  const panel = document.querySelector("[data-search-panel]");
  if (!toggle || !panel) return;
  toggle.addEventListener("click", () => {
    panel.classList.toggle("is-open");
    if (panel.classList.contains("is-open")) {
      panel.querySelector("input")?.focus();
    }
  });
}

function initHeaderSearchForm() {
  const form = document.querySelector("[data-search-form]");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = new FormData(form).get("q");
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    window.location.href = "shop.html" + (params.toString() ? "?" + params.toString() : "");
  });
}

function initNewsletterForm() {
  const form = document.querySelector("[data-newsletter-form]");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const status = form.querySelector("[data-newsletter-status]");
    const email = new FormData(form).get("email");
    if (status) {
      status.textContent = `You're on the list — we'll send offers to ${email}.`;
      status.classList.add("is-visible");
    }
    form.reset();
  });
}

function initYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

function initHeaderScrollState() {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initSearchToggle();
  initHeaderSearchForm();
  initNewsletterForm();
  initYear();
  initHeaderScrollState();
  if (window.lucide) lucide.createIcons();
});
