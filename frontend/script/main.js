/* =============================================
   COURT ÉLITE — main.js
   Tennis Boutique — Full Frontend Logic
   ============================================= */

"use strict";

// ─────────────────────────────────────────────
// 1. DATA  (from DB: products + categories + brands)
// ─────────────────────────────────────────────

const CATEGORIES = {
  1: "Raquettes",
  2: "Vêtements",
  3: "Chaussures",
  4: "Accessoires",
  5: "Sacs",
};

const BRANDS = {
  1: "Wilson",
  2: "Babolat",
  3: "Lacoste",
  4: "Nike",
  5: "Adidas",
};

// Emoji mapping per category
const CATEGORY_EMOJI = {
  1: "🎾",  // Raquettes
  2: "👕",  // Vêtements
  3: "👟",  // Chaussures
  4: "🎒",  // Accessoires
  5: "🎒",  // Sacs
};

// Refined emoji per product (by id)
const PRODUCT_EMOJI = {
  1: "🎾", 2: "🎾", 3: "👟", 4: "🧥",
  5: "🩳", 6: "🎒", 7: "🎾", 8: "🩱",
  9: "👟", 10: "🩳", 11: "👟", 12: "🎒",
  13: "🩳", 14: "🧢", 15: "🎾", 16: "👟",
  17: "👖", 18: "🧦", 19: "🤝", 20: "👖",
};

const products = [
  {
    id: 1,
    name: "Raquette de Tennis Shift 99 Pro V1",
    description:
      "Cette raquette révolutionnaire intègre des technologies modernes pour créer des effets importants avec un confort inégalé.",
    price: 199.99,
    category_id: 1,
    brand_id: 1,
    gender: "unisex",
  },
  {
    id: 2,
    name: "Raquette de Tennis Pro Staff X v14",
    description:
      "Idéale pour les joueurs qui apprécient les sensations classiques des raquettes Pro Staff mais qui recherchent une raquette plus tolérante et facile à manier.",
    price: 229.99,
    category_id: 1,
    brand_id: 1,
    gender: "unisex",
  },
  {
    id: 3,
    name: "Chaussures Nike Vapor Pro 3",
    description: "Chaussure de tennis surface dure pour hommes.",
    price: 129.99,
    category_id: 3,
    brand_id: 4,
    gender: "homme",
  },
  {
    id: 4,
    name: "Hoodie Nike Court Heritage",
    description: "Hoodie de tennis confortable pour hommes.",
    price: 100.0,
    category_id: 2,
    brand_id: 4,
    gender: "homme",
  },
  {
    id: 5,
    name: "Short Nike Court Victory",
    description:
      "Prêt pour l'entraînement, prêt pour le jeu : ce short respirant vous garde au sec sur et en dehors du court.",
    price: 59.99,
    category_id: 2,
    brand_id: 4,
    gender: "homme",
  },
  {
    id: 6,
    name: "Sac Nike Gym Club retro Off-White",
    description: "Sac de voyage Old School idéal pour les entrainements.",
    price: 45.0,
    category_id: 5,
    brand_id: 4,
    gender: "unisex",
  },
  {
    id: 7,
    name: "Gold Academy x3",
    description: "Balles de tennis Babolat Gold Academy — lot de 3.",
    price: 6.99,
    category_id: 4,
    brand_id: 2,
    gender: "unisex",
  },
  {
    id: 8,
    name: "Survêtement Lacoste Tennis x Daniil Medvedev",
    description: "Survêtement officiel de la collection Lacoste x Medvedev.",
    price: 260.0,
    category_id: 2,
    brand_id: 3,
    gender: "homme",
  },
  {
    id: 9,
    name: "Chaussure de tennis Adizero Ubersonic",
    description: "Chaussure de tennis Adidas haute performance.",
    price: 135.0,
    category_id: 3,
    brand_id: 5,
    gender: "homme",
  },
  {
    id: 10,
    name: "Short de tennis Climacool Club",
    description: "Short respirant Adidas Climacool.",
    price: 35.0,
    category_id: 2,
    brand_id: 5,
    gender: "homme",
  },
  {
    id: 11,
    name: "Chaussure de tennis Gamecourt 2",
    description: "Chaussure Adidas Gamecourt confortable.",
    price: 95.0,
    category_id: 3,
    brand_id: 5,
    gender: "homme",
  },
  {
    id: 12,
    name: "Sac Wilson Super Tour Pro Staff 9R",
    description:
      "Le sac de tennis Wilson Super Tour Pro Staff permet de transporter jusqu'à 9 raquettes.",
    price: 89.99,
    category_id: 5,
    brand_id: 1,
    gender: "unisex",
  },
  {
    id: 13,
    name: "Short Tennis Ultra Dry stretch Lacoste",
    description:
      "Ce short offre liberté de mouvement et maintien au sec pendant l'effort grâce à son tissu stretch.",
    price: 90.0,
    category_id: 2,
    brand_id: 3,
    gender: "homme",
  },
  {
    id: 14,
    name: "Béret en Petit Piqué crocodile brodé Lacoste",
    description: "Béret en coton avec crocodile brodé.",
    price: 80.0,
    category_id: 4,
    brand_id: 3,
    gender: "unisex",
  },
  {
    id: 15,
    name: "Raquette Evo Drive Gen2 Cordée",
    description: "Raquette conçue pour puissance et confort.",
    price: 179.95,
    category_id: 1,
    brand_id: 2,
    gender: "unisex",
  },
  {
    id: 16,
    name: "Chaussures SFX 4 Clay Women",
    description: "Chaussures confortables avec bon maintien pour femmes.",
    price: 120.0,
    category_id: 3,
    brand_id: 2,
    gender: "femme",
  },
  {
    id: 17,
    name: "Pantalon de tennis Walk On Adidas",
    description: "Pantalon léger et respirant.",
    price: 75.0,
    category_id: 2,
    brand_id: 5,
    gender: "homme",
  },
  {
    id: 18,
    name: "Chaussettes mi-mollet de tennis Adidas",
    description: "Chaussettes rembourrées haute performance.",
    price: 18.0,
    category_id: 4,
    brand_id: 5,
    gender: "unisex",
  },
  {
    id: 19,
    name: "Serre-poignets de tennis Nike Premier",
    description: "Absorbe la transpiration efficacement.",
    price: 14.99,
    category_id: 4,
    brand_id: 4,
    gender: "unisex",
  },
  {
    id: 20,
    name: "Pantalon Nike Advantage femme",
    description: "Pantalon tennis femme confortable.",
    price: 74.99,
    category_id: 2,
    brand_id: 4,
    gender: "femme",
  },
];

// ─────────────────────────────────────────────
// 2. STATE
// ─────────────────────────────────────────────

const state = {
  cart: [],           // [{ product, qty }]
  filter: {
    category: "all",  // category_id | 'all'
    gender: "all",
    brand: "all",
    maxPrice: 300,
    search: "",
    sort: "default",
  },
};

// ─────────────────────────────────────────────
// 3. DOM REFS
// ─────────────────────────────────────────────

const $ = (id) => document.getElementById(id);
const $q = (sel) => document.querySelector(sel);

const loader          = $("loader");
const header          = $("header");
const cursor          = $("cursor");
const cursorFollower  = $("cursorFollower");
const productsGrid    = $("productsGrid");
const noResults       = $("noResults");
const cartPanel       = $("cartPanel");
const cartItems       = $("cartItems");
const cartCount       = $("cartCount");
const cartFooter      = $("cartFooter");
const cartTotal       = $("cartTotal");
const overlay         = $("overlay");
const modalBackdrop   = $("modalBackdrop");
const modalBody       = $("modalBody");
const toast           = $("toast");
const searchBar       = $("searchBar");
const searchInput     = $("searchInput");

// Filter controls
const genderFilter  = $("genderFilter");
const brandFilter   = $("brandFilter");
const priceRange    = $("priceRange");
const priceDisplay  = $("priceDisplay");
const sortFilter    = $("sortFilter");

// ─────────────────────────────────────────────
// 4. LOADER
// ─────────────────────────────────────────────

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hidden");
    renderProducts();
  }, 1500);
});

// ─────────────────────────────────────────────
// 5. CUSTOM CURSOR
// ─────────────────────────────────────────────

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top  = mouseY + "px";
});

(function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + "px";
  cursorFollower.style.top  = followerY + "px";
  requestAnimationFrame(animateFollower);
})();

document.querySelectorAll("a, button, select, input[type=range]").forEach((el) => {
  el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
  el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
});

// ─────────────────────────────────────────────
// 6. NAVBAR SCROLL
// ─────────────────────────────────────────────

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

// ─────────────────────────────────────────────
// 7. NAVIGATION CATEGORY FILTERS
// ─────────────────────────────────────────────

document.querySelectorAll(".nav-filter").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll(".nav-filter").forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    state.filter.category = link.dataset.filter;
    renderProducts();
    // scroll to catalogue
    $("catalogue").scrollIntoView({ behavior: "smooth" });
  });
});

// ─────────────────────────────────────────────
// 8. FILTER CONTROLS
// ─────────────────────────────────────────────

genderFilter.addEventListener("change", () => {
  state.filter.gender = genderFilter.value;
  renderProducts();
});

brandFilter.addEventListener("change", () => {
  state.filter.brand = brandFilter.value;
  renderProducts();
});

priceRange.addEventListener("input", () => {
  const val = parseInt(priceRange.value);
  state.filter.maxPrice = val;
  priceDisplay.textContent = val + " €";
  renderProducts();
});

sortFilter.addEventListener("change", () => {
  state.filter.sort = sortFilter.value;
  renderProducts();
});

// ─────────────────────────────────────────────
// 9. SEARCH
// ─────────────────────────────────────────────

$("searchToggle").addEventListener("click", () => {
  searchBar.classList.add("open");
  searchInput.focus();
});

$("searchClose").addEventListener("click", () => {
  searchBar.classList.remove("open");
  searchInput.value = "";
  state.filter.search = "";
  renderProducts();
});

searchInput.addEventListener("input", () => {
  state.filter.search = searchInput.value.trim().toLowerCase();
  renderProducts();
});

// ─────────────────────────────────────────────
// 10. RENDER PRODUCTS
// ─────────────────────────────────────────────

function getFilteredProducts() {
  let result = [...products];

  // Category
  if (state.filter.category !== "all") {
    const catId = parseInt(state.filter.category);
    result = result.filter((p) => p.category_id === catId);
  }

  // Gender
  if (state.filter.gender !== "all") {
    result = result.filter(
      (p) => p.gender === state.filter.gender || p.gender === "unisex"
    );
  }

  // Brand
  if (state.filter.brand !== "all") {
    const brandId = Object.keys(BRANDS).find(
      (k) => BRANDS[k] === state.filter.brand
    );
    result = result.filter((p) => p.brand_id === parseInt(brandId));
  }

  // Price
  result = result.filter((p) => p.price <= state.filter.maxPrice);

  // Search
  if (state.filter.search) {
    const q = state.filter.search;
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        BRANDS[p.brand_id].toLowerCase().includes(q) ||
        CATEGORIES[p.category_id].toLowerCase().includes(q)
    );
  }

  // Sort
  switch (state.filter.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  return result;
}

function renderProducts() {
  const filtered = getFilteredProducts();
  productsGrid.innerHTML = "";

  if (filtered.length === 0) {
    noResults.style.display = "block";
    return;
  }
  noResults.style.display = "none";

  filtered.forEach((product, index) => {
    const card = buildProductCard(product, index);
    productsGrid.appendChild(card);
  });
}

function buildProductCard(product, index) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.style.animationDelay = `${index * 0.05}s`;

  const emoji = PRODUCT_EMOJI[product.id] || CATEGORY_EMOJI[product.category_id] || "🎾";
  const brandName = BRANDS[product.brand_id];
  const catName   = CATEGORIES[product.category_id];
  const genderLabel = { homme: "Homme", femme: "Femme", unisex: "Unisex" }[product.gender];

  card.innerHTML = `
    <div class="product-img-wrap">
      <div class="product-emoji">${emoji}</div>
      <div class="product-badge">${catName}</div>
    </div>
    <div class="product-info">
      <p class="product-brand">${brandName}</p>
      <h3 class="product-name">${product.name}</h3>
      <div class="product-footer">
        <span class="product-price">${formatPrice(product.price)}</span>
        <span class="product-gender">${genderLabel}</span>
      </div>
    </div>
    <div class="card-reveal">
      <button class="card-btn" data-id="${product.id}" data-action="detail">Détails</button>
      <button class="card-btn cart-add" data-id="${product.id}" data-action="add">+ Panier</button>
    </div>
  `;

  // Card hover cursor
  card.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
  card.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));

  // Button actions
  card.querySelectorAll(".card-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const p  = products.find((x) => x.id === id);
      if (btn.dataset.action === "detail") {
        openModal(p);
      } else {
        addToCart(p);
      }
    });
  });

  // Click on card body opens modal
  card.addEventListener("click", () => {
    openModal(product);
  });

  return card;
}

// ─────────────────────────────────────────────
// 11. PRODUCT MODAL
// ─────────────────────────────────────────────

function openModal(product) {
  const emoji     = PRODUCT_EMOJI[product.id] || "🎾";
  const brandName = BRANDS[product.brand_id];
  const catName   = CATEGORIES[product.category_id];
  const genderLabel = { homme: "Homme", femme: "Femme", unisex: "Unisex" }[product.gender];

  modalBody.innerHTML = `
    <div class="modal-img">${emoji}</div>
    <div class="modal-details">
      <p class="modal-brand">${brandName}</p>
      <h2 class="modal-name">${product.name}</h2>
      <p class="modal-price">${formatPrice(product.price)}</p>
      <p class="modal-desc">${product.description}</p>
      <div class="modal-meta">
        <span class="meta-tag">${catName}</span>
        <span class="meta-tag">${genderLabel}</span>
      </div>
      <button class="modal-add" data-id="${product.id}">Ajouter au panier</button>
    </div>
  `;

  modalBody.querySelector(".modal-add").addEventListener("click", () => {
    addToCart(product);
    closeModal();
  });

  modalBackdrop.classList.add("open");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalBackdrop.classList.remove("open");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

$("modalClose").addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});

// ─────────────────────────────────────────────
// 12. CART
// ─────────────────────────────────────────────

function addToCart(product) {
  const existing = state.cart.find((item) => item.product.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ product, qty: 1 });
  }
  renderCart();
  showToast(`✓ ${product.name.split(" ").slice(0, 3).join(" ")}… ajouté`);
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((item) => item.product.id !== productId);
  renderCart();
}

function updateQty(productId, delta) {
  const item = state.cart.find((i) => i.product.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId);
  else renderCart();
}

function renderCart() {
  const count = state.cart.reduce((acc, i) => acc + i.qty, 0);
  cartCount.textContent = count;
  cartCount.classList.toggle("visible", count > 0);

  if (state.cart.length === 0) {
    cartItems.innerHTML = `<p class="cart-empty">Votre panier est vide.</p>`;
    cartFooter.style.display = "none";
    return;
  }

  cartItems.innerHTML = state.cart
    .map(
      ({ product, qty }) => `
      <div class="cart-item">
        <div class="cart-item-icon">${PRODUCT_EMOJI[product.id] || "🎾"}</div>
        <div class="cart-item-info">
          <p class="cart-item-name">${product.name}</p>
          <p class="cart-item-brand">${BRANDS[product.brand_id]}</p>
          <p class="cart-item-price">${formatPrice(product.price * qty)}</p>
          <div class="cart-item-qty">
            <button class="qty-btn" data-id="${product.id}" data-delta="-1">−</button>
            <span class="qty-val">${qty}</span>
            <button class="qty-btn" data-id="${product.id}" data-delta="1">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-remove="${product.id}">✕</button>
      </div>
    `
    )
    .join("");

  // Bind qty buttons
  cartItems.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      updateQty(parseInt(btn.dataset.id), parseInt(btn.dataset.delta));
    });
  });
  cartItems.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromCart(parseInt(btn.dataset.remove));
    });
  });

  const total = state.cart.reduce((acc, i) => acc + i.product.price * i.qty, 0);
  cartTotal.textContent = formatPrice(total);
  cartFooter.style.display = "block";
}

// Open / Close cart
$("cartToggle").addEventListener("click", () => {
  cartPanel.classList.add("open");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
});

$("cartClose").addEventListener("click", closeCart);

function closeCart() {
  cartPanel.classList.remove("open");
  if (!modalBackdrop.classList.contains("open")) {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

overlay.addEventListener("click", () => {
  closeCart();
  closeModal();
});

// ─────────────────────────────────────────────
// 13. TOAST
// ─────────────────────────────────────────────

let toastTimeout;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2800);
}

// ─────────────────────────────────────────────
// 14. HELPERS
// ─────────────────────────────────────────────

function formatPrice(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

// ─────────────────────────────────────────────
// 15. KEYBOARD ACCESSIBILITY
// ─────────────────────────────────────────────

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCart();
    closeModal();
    if (searchBar.classList.contains("open")) {
      searchBar.classList.remove("open");
      searchInput.value = "";
      state.filter.search = "";
      renderProducts();
    }
  }
});