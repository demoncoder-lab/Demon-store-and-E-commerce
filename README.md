# Demon Store — E-commerce Demo

A fully responsive, static e-commerce storefront built as a portfolio piece by **Demon Coder**.

## What's included

- `index.html` — homepage (hero, categories, best sellers, promo, testimonials, newsletter)
- `shop.html` — full catalog with search, category filters, price filter and sorting
- `product.html` — product detail page (options, quantity, add to cart, buy now, WhatsApp order)
- `cart.html` — functional cart with quantity controls and totals
- `checkout.html` — validated checkout form with simulated order placement
- `about.html`, `contact.html` — supporting pages
- `css/style.css` — all styling
- `js/` — data, cart engine, and page-specific logic (plain JavaScript, no frameworks)

## Running locally

No build step is required. Open `index.html` directly in a browser, or serve the folder with any static server, e.g.:

```
npx serve .
```

## Deploying

This site is plain HTML/CSS/JS, so it deploys as-is to:

- **GitHub Pages** — push this folder to a repo and enable Pages on the `main` branch
- **Vercel / Netlify** — drag-and-drop the folder or connect the repo, no build command needed

## Notes for real client use

- Product data lives in `js/data.js` — replace with real products, prices and images.
- The WhatsApp number is set in `js/data.js` (`STORE_WHATSAPP_NUMBER`) — update to the real business number.
- Checkout is simulated for demo purposes; connect a real payment gateway (e.g. Paystack or Flutterwave) before going live.
- Images currently use placeholder photography — swap in real product photos.
