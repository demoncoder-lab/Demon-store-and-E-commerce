/* ==========================================================================
   Demon Store — product & content data
   ========================================================================== */

const STORE_WHATSAPP_NUMBER = "2348101234567"; // demo number

const CATEGORIES = [
  { id: "electronics", name: "Electronics", icon: "smartphone" },
  { id: "fashion", name: "Fashion", icon: "shirt" },
  { id: "footwear", name: "Footwear", icon: "footprints" },
  { id: "kitchen", name: "Kitchen & Home", icon: "cooking-pot" },
  { id: "beauty", name: "Beauty & Care", icon: "sparkles" },
  { id: "bags", name: "Bags & Accessories", icon: "briefcase" },
];

const PRODUCTS = [
  {
    id: "p01",
    name: "Sony WH-CH520 Wireless Headphones",
    category: "electronics",
    price: 45000,
    oldPrice: 58000,
    rating: 4.6,
    reviews: 128,
    image: "https://picsum.photos/seed/demonstore-headphones/700/700",
    badge: "sale",
    description:
      "Enjoy up to 50 hours of playback with these lightweight wireless headphones. Fast-pair Bluetooth 5.0, built-in mic for calls, and a foldable design that fits easily into any bag.",
    options: { Colour: ["Black", "Blue", "White"] },
    stock: 24,
  },
  {
    id: "p02",
    name: "Samsung Galaxy A15 Smartphone (128GB)",
    category: "electronics",
    price: 185000,
    oldPrice: null,
    rating: 4.8,
    reviews: 342,
    image: "https://picsum.photos/seed/demonstore-galaxya15/700/700",
    badge: "new",
    description:
      "A crisp 6.5-inch Super AMOLED display, 50MP triple camera and a 5,000mAh battery built to last a full day of calls, browsing and social media.",
    options: { Storage: ["128GB", "256GB"], Colour: ["Black", "Blue Black"] },
    stock: 15,
  },
  {
    id: "p03",
    name: "Binatone 18-Inch Rechargeable Standing Fan",
    category: "kitchen",
    price: 32500,
    oldPrice: null,
    rating: 4.4,
    reviews: 76,
    image: "https://picsum.photos/seed/demonstore-fan/700/700",
    badge: null,
    description:
      "Stay cool through NEPA outages. This rechargeable standing fan runs up to 6 hours on a full charge, with 3 speed settings and remote control.",
    options: null,
    stock: 18,
  },
  {
    id: "p04",
    name: "Ankara Print Maxi Dress",
    category: "fashion",
    price: 18500,
    oldPrice: 24000,
    rating: 4.7,
    reviews: 91,
    image: "https://picsum.photos/seed/demonstore-ankaradress/700/700",
    badge: "sale",
    description:
      "A flowing, made-in-Lagos maxi dress cut from premium Ankara fabric. Flattering fit with a tailored waistline — perfect for owambe season or everyday elegance.",
    options: { Size: ["S", "M", "L", "XL"] },
    stock: 32,
  },
  {
    id: "p05",
    name: "Men's Slim Fit Senator Kaftan",
    category: "fashion",
    price: 22000,
    oldPrice: null,
    rating: 4.5,
    reviews: 54,
    image: "https://picsum.photos/seed/demonstore-kaftan/700/700",
    badge: null,
    description:
      "Sharp, modern senator wear tailored from soft cotton-blend fabric. Comfortable enough for the office, smart enough for the weekend.",
    options: { Size: ["M", "L", "XL", "XXL"], Colour: ["Navy", "Wine", "Charcoal"] },
    stock: 20,
  },
  {
    id: "p06",
    name: "Air Max Running Sneakers",
    category: "footwear",
    price: 65000,
    oldPrice: 78000,
    rating: 4.9,
    reviews: 210,
    image: "https://picsum.photos/seed/demonstore-sneakers/700/700",
    badge: "sale",
    description:
      "Everyday comfort built for Lagos streets — breathable mesh upper, cushioned sole and a grip that holds up on tarmac, sand and everything between.",
    options: { Size: ["40", "41", "42", "43", "44"] },
    stock: 27,
  },
  {
    id: "p07",
    name: "6-Piece Non-Stick Cookware Set",
    category: "kitchen",
    price: 38000,
    oldPrice: null,
    rating: 4.6,
    reviews: 63,
    image: "https://picsum.photos/seed/demonstore-cookware/700/700",
    badge: null,
    description:
      "Everything a modern kitchen needs — pots and pans with a durable non-stick coating that heats evenly and cleans up in seconds.",
    options: null,
    stock: 12,
  },
  {
    id: "p08",
    name: "Rechargeable LED Emergency Lantern",
    category: "electronics",
    price: 12500,
    oldPrice: null,
    rating: 4.3,
    reviews: 45,
    image: "https://picsum.photos/seed/demonstore-lantern/700/700",
    badge: null,
    description:
      "Bright, reliable light for when the power goes out. Up to 10 hours of runtime, solar-assisted charging and a built-in phone charging port.",
    options: null,
    stock: 40,
  },
  {
    id: "p09",
    name: "20,000mAh Fast-Charge Power Bank",
    category: "electronics",
    price: 15800,
    oldPrice: 19500,
    rating: 4.5,
    reviews: 168,
    image: "https://picsum.photos/seed/demonstore-powerbank/700/700",
    badge: "sale",
    description:
      "Charge your phone up to 4 times on one full charge. Dual USB output, LED battery display and a durable casing built for daily use.",
    options: { Colour: ["Black", "Grey"] },
    stock: 55,
  },
  {
    id: "p10",
    name: "Shea Butter Body Cream, 500ml",
    category: "beauty",
    price: 6500,
    oldPrice: null,
    rating: 4.7,
    reviews: 98,
    image: "https://picsum.photos/seed/demonstore-sheabutter/700/700",
    badge: null,
    description:
      "Sourced and made in Nigeria. A rich, fast-absorbing cream that locks in moisture and leaves skin soft without a greasy feel.",
    options: null,
    stock: 60,
  },
  {
    id: "p11",
    name: "Kids Waterproof School Backpack",
    category: "bags",
    price: 9800,
    oldPrice: null,
    rating: 4.4,
    reviews: 37,
    image: "https://picsum.photos/seed/demonstore-kidsbag/700/700",
    badge: "new",
    description:
      "Durable, lightweight and roomy enough for books, lunch and a water bottle. Padded straps keep it comfortable for the walk to school.",
    options: { Colour: ["Blue", "Pink", "Grey"] },
    stock: 33,
  },
  {
    id: "p12",
    name: "2-in-1 Blender & Dry Grinder Combo",
    category: "kitchen",
    price: 27000,
    oldPrice: 33000,
    rating: 4.5,
    reviews: 82,
    image: "https://picsum.photos/seed/demonstore-blender/700/700",
    badge: "sale",
    description:
      "Blend smoothies and grind pepper, beans or spices with one powerful 1000W motor. Two jars included, easy to clean, built to last.",
    options: null,
    stock: 21,
  },
  {
    id: "p13",
    name: "Genuine Leather Office Bag",
    category: "bags",
    price: 34500,
    oldPrice: null,
    rating: 4.8,
    reviews: 59,
    image: "https://picsum.photos/seed/demonstore-officebag/700/700",
    badge: null,
    description:
      "A structured leather bag with a padded laptop compartment and multiple pockets for organised, professional carrying every day.",
    options: { Colour: ["Brown", "Black"] },
    stock: 16,
  },
  {
    id: "p14",
    name: "Smart Fitness Watch with Heart Rate Monitor",
    category: "electronics",
    price: 28000,
    oldPrice: null,
    rating: 4.3,
    reviews: 71,
    image: "https://picsum.photos/seed/demonstore-smartwatch/700/700",
    badge: "new",
    description:
      "Track steps, heart rate and sleep, and get call and message alerts on your wrist. Water-resistant with up to 7 days of battery life.",
    options: { Colour: ["Black", "Rose Gold"] },
    stock: 29,
  },
];

const TESTIMONIALS = [
  {
    name: "Chioma A.",
    location: "Lekki, Lagos",
    text:
      "I ordered a blender and it arrived the next day, well packaged and exactly as pictured. This has become my go-to store for home things.",
    rating: 5,
  },
  {
    name: "Tunde O.",
    location: "Ibadan, Oyo State",
    text:
      "Genuine products and honest pricing. I've bought three phones from Demon Store for my shop and every one has been original.",
    rating: 5,
  },
  {
    name: "Amaka N.",
    location: "Port Harcourt, Rivers State",
    text:
      "Customer support responded on WhatsApp within minutes and helped me pick the right size. Delivery was fast even outside Lagos.",
    rating: 4,
  },
];

function formatNaira(amount) {
  return "₦" + Number(amount).toLocaleString("en-NG");
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function getRelatedProducts(product, count = 4) {
  return PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, count);
}
