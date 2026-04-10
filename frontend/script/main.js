/* =============================================
   COURT ÉLITE — main.js
   Tennis Boutique — Full Frontend Logic (API Connected)
   ============================================= */

"use strict";

// ─────────────────────────────────────────────
// 1. CONFIG
// ─────────────────────────────────────────────

const API_BASE   = "http://localhost:5000/api";
const IMG_BASE   = "http://localhost:5000/images";

const getToken    = () => localStorage.getItem("token");
const setToken    = (t) => localStorage.setItem("token", t);
const removeToken = () => localStorage.removeItem("token");

async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(API_BASE + path, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// ─────────────────────────────────────────────
// 2. PRODUCT IMAGES MAP
// ─────────────────────────────────────────────

const PRODUCT_IMG = {
  1:  "Raquette de tennis Shift 99 Pro V1.webp",
  2:  "Raquette de tennis Pro Staff X v14.webp",
  3:  "Nike Vapor Pro 3.avif",
  4:  "Hoodie Nike Court Heritage.avif",
  5:  "Short Nike Court Victory(black).avif",
  6:  "sac Nike Gym Club retro Off-White.avif",
  7:  "Gold_Academy_x3.webp",
  8:  "Survêtement_Lacoste_Tennis_x_Daniil Medvedev.avif",
  9:  "Adizero Ubersonic 5 Rouge.webp",
  10: "Short de tennis Climacool Club.webp",
  11: "Chaussure de tennis Gamecourt 2.jpg",
  12: "Sac Wilson Super Tour Pro Staff 9R.webp",
  13: "Short Tennis Ultra Dry stretch Lacoste.avif",
  14: "Béret en Petit Piqué crocodile brodé Lacoste.avif",
  15: "Raquette Evo Drive Gen2 Cordée.webp",
  16: "Chaussures SFX 4 Clay Wome.webp",
  17: "Pantalon de tennis Walk On Adidas.webp",
  18: "Chaussettes mi-mollet de tennis Adidas.jpg",
  19: "Serre-poignets de tennis Nike Premier.jpg",
  20: "Pantalon Nike Advantage femme.jpg",
};

function getProductImg(product) {
  const filename = PRODUCT_IMG[product.id];
  if (filename) return `${IMG_BASE}/${encodeURIComponent(filename)}`;
  return null;
}

// ─────────────────────────────────────────────
// 3. STATIC MAPS + FALLBACK DATA
// ─────────────────────────────────────────────

const CATEGORIES = { 1: "Raquettes", 2: "Vêtements", 3: "Chaussures", 4: "Accessoires", 5: "Sacs" };
const BRANDS     = { 1: "Wilson", 2: "Babolat", 3: "Lacoste", 4: "Nike", 5: "Adidas" };

const STATIC_PRODUCTS = [
  { id:1,  name:"Raquette de Tennis Shift 99 Pro V1",          description:"Cette raquette révolutionnaire intègre des technologies modernes pour créer des effets importants avec un confort inégalé.",                                           price:199.99, category_id:1, brand_id:1, gender:"unisex" },
  { id:2,  name:"Raquette de Tennis Pro Staff X v14",           description:"Idéale pour les joueurs qui apprécient les sensations classiques des raquettes Pro Staff mais qui recherchent une raquette plus tolérante et facile à manier.",        price:229.99, category_id:1, brand_id:1, gender:"unisex" },
  { id:3,  name:"Chaussures Nike Vapor Pro 3",                  description:"Chaussure de tennis surface dure pour hommes.",                                                                                                                         price:129.99, category_id:3, brand_id:4, gender:"homme" },
  { id:4,  name:"Hoodie Nike Court Heritage",                   description:"Hoodie de tennis confortable pour hommes.",                                                                                                                             price:100.00, category_id:2, brand_id:4, gender:"homme" },
  { id:5,  name:"Short Nike Court Victory",                     description:"Prêt pour l'entraînement, prêt pour le jeu : ce short respirant vous garde au sec sur et en dehors du court.",                                                        price:59.99,  category_id:2, brand_id:4, gender:"homme" },
  { id:6,  name:"Sac Nike Gym Club retro Off-White",            description:"Sac de voyage Old School idéal pour les entrainements.",                                                                                                                price:45.00,  category_id:5, brand_id:4, gender:"unisex" },
  { id:7,  name:"Gold Academy x3",                              description:"Balles de tennis Babolat Gold Academy — lot de 3.",                                                                                                                     price:6.99,   category_id:4, brand_id:2, gender:"unisex" },
  { id:8,  name:"Survêtement Lacoste Tennis x Daniil Medvedev", description:"Survêtement officiel de la collection Lacoste x Medvedev.",                                                                                                             price:260.00, category_id:2, brand_id:3, gender:"homme" },
  { id:9,  name:"Chaussure de tennis Adizero Ubersonic",        description:"Chaussure de tennis Adidas haute performance.",                                                                                                                         price:135.00, category_id:3, brand_id:5, gender:"homme" },
  { id:10, name:"Short de tennis Climacool Club",               description:"Short respirant Adidas Climacool.",                                                                                                                                     price:35.00,  category_id:2, brand_id:5, gender:"homme" },
  { id:11, name:"Chaussure de tennis Gamecourt 2",              description:"Chaussure Adidas Gamecourt confortable.",                                                                                                                               price:95.00,  category_id:3, brand_id:5, gender:"homme" },
  { id:12, name:"Sac Wilson Super Tour Pro Staff 9R",           description:"Le sac de tennis Wilson Super Tour Pro Staff permet de transporter jusqu'à 9 raquettes.",                                                                               price:89.99,  category_id:5, brand_id:1, gender:"unisex" },
  { id:13, name:"Short Tennis Ultra Dry stretch Lacoste",       description:"Ce short offre liberté de mouvement et maintien au sec pendant l'effort grâce à son tissu stretch.",                                                                   price:90.00,  category_id:2, brand_id:3, gender:"homme" },
  { id:14, name:"Béret en Petit Piqué crocodile brodé Lacoste", description:"Béret en coton avec crocodile brodé.",                                                                                                                                  price:80.00,  category_id:4, brand_id:3, gender:"unisex" },
  { id:15, name:"Raquette Evo Drive Gen2 Cordée",               description:"Raquette conçue pour puissance et confort.",                                                                                                                            price:179.95, category_id:1, brand_id:2, gender:"unisex" },
  { id:16, name:"Chaussures SFX 4 Clay Women",                  description:"Chaussures confortables avec bon maintien pour femmes.",                                                                                                                price:120.00, category_id:3, brand_id:2, gender:"femme" },
  { id:17, name:"Pantalon de tennis Walk On Adidas",            description:"Pantalon léger et respirant.",                                                                                                                                          price:75.00,  category_id:2, brand_id:5, gender:"homme" },
  { id:18, name:"Chaussettes mi-mollet de tennis Adidas",       description:"Chaussettes rembourrées haute performance.",                                                                                                                            price:18.00,  category_id:4, brand_id:5, gender:"unisex" },
  { id:19, name:"Serre-poignets de tennis Nike Premier",        description:"Absorbe la transpiration efficacement.",                                                                                                                                price:14.99,  category_id:4, brand_id:4, gender:"unisex" },
  { id:20, name:"Pantalon Nike Advantage femme",                description:"Pantalon tennis femme confortable.",                                                                                                                                    price:74.99,  category_id:2, brand_id:4, gender:"femme" },
];

// ─────────────────────────────────────────────
// 4. STATE
// ─────────────────────────────────────────────

const state = {
  products: [],
  cart: [],
  currentUser: null,
  filter: {
    category: "all",
    gender: "all",
    brand: "all",
    maxPrice: 300,
    search: "",
    sort: "default",
  },
};

// ─────────────────────────────────────────────
// 5. DOM REFS
// ─────────────────────────────────────────────

const $ = (id) => document.getElementById(id);

const loader         = $("loader");
const header         = $("header");
const cursor         = $("cursor");
const cursorFollower = $("cursorFollower");
const productsGrid   = $("productsGrid");
const noResults      = $("noResults");
const cartPanel      = $("cartPanel");
const cartItems      = $("cartItems");
const cartCount      = $("cartCount");
const cartFooter     = $("cartFooter");
const cartTotal      = $("cartTotal");
const overlay        = $("overlay");
const modalBackdrop  = $("modalBackdrop");
const modalBody      = $("modalBody");
const toast          = $("toast");
const searchBar      = $("searchBar");
const searchInput    = $("searchInput");
const genderFilter   = $("genderFilter");
const brandFilter    = $("brandFilter");
const priceRange     = $("priceRange");
const priceDisplay   = $("priceDisplay");
const sortFilter     = $("sortFilter");

// ─────────────────────────────────────────────
// 6. BOOTSTRAP
// ─────────────────────────────────────────────

window.addEventListener("load", () => {
  injectUserButton();

  loadProducts().then(() => {
    setTimeout(() => {
      loader.classList.add("hidden");
      renderProducts();
    }, 1500);
  });

  if (getToken()) {
    apiFetch("/auth/profile")
      .then((user) => { state.currentUser = user; updateAuthUI(); return syncCartFromAPI(); })
      .catch(() => removeToken());
  }
});

async function loadProducts() {
  try {
    const data = await apiFetch("/products");
    if (Array.isArray(data) && data.length > 0) {
      state.products = data.map((p) => ({ ...p, price: parseFloat(p.price) }));
      console.log("✅ Produits chargés depuis l'API :", state.products.length);
    } else {
      throw new Error("Réponse vide");
    }
  } catch (e) {
    console.warn("⚠ Fallback données statiques :", e.message);
    state.products = STATIC_PRODUCTS;
  }
}

// ─────────────────────────────────────────────
// 7. AUTH MODAL
// ─────────────────────────────────────────────

function injectAuthModal() {
  if ($("authModal")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop" id="authModal" style="display:none">
      <div class="modal" id="authModalInner">
        <button class="modal-close" id="authModalClose">✕</button>
        <div class="modal-body" id="authModalBody">
          <div id="authLoginForm">
            <h2 style="margin-bottom:1.2rem">Connexion</h2>
            <div class="auth-field"><label>Email</label><input type="email" id="loginEmail" placeholder="votre@email.com" autocomplete="email"/></div>
            <div class="auth-field"><label>Mot de passe</label><input type="password" id="loginPassword" placeholder="••••••••" autocomplete="current-password"/></div>
            <p class="auth-error" id="loginError"></p>
            <button class="modal-add" id="loginSubmit">Se connecter</button>
            <p class="auth-switch">Pas encore de compte ? <a href="#" id="switchToRegister">Créer un compte</a></p>
          </div>
          <div id="authRegisterForm" style="display:none">
            <h2 style="margin-bottom:1.2rem">Créer un compte</h2>
            <div class="auth-field"><label>Nom</label><input type="text" id="registerName" placeholder="Votre nom" autocomplete="name"/></div>
            <div class="auth-field"><label>Email</label><input type="email" id="registerEmail" placeholder="votre@email.com" autocomplete="email"/></div>
            <div class="auth-field"><label>Mot de passe</label><input type="password" id="registerPassword" placeholder="••••••••" autocomplete="new-password"/></div>
            <p class="auth-error" id="registerError"></p>
            <button class="modal-add" id="registerSubmit">S'inscrire</button>
            <p class="auth-switch">Déjà un compte ? <a href="#" id="switchToLogin">Se connecter</a></p>
          </div>
        </div>
      </div>
    </div>
  `);
  $("authModalClose").addEventListener("click", closeAuthModal);
  $("authModal").addEventListener("click", (e) => { if (e.target === $("authModal")) closeAuthModal(); });
  $("switchToRegister").addEventListener("click", (e) => { e.preventDefault(); showAuthForm("register"); });
  $("switchToLogin").addEventListener("click", (e) => { e.preventDefault(); showAuthForm("login"); });
  $("loginSubmit").addEventListener("click", async () => {
    const email = $("loginEmail").value.trim(), password = $("loginPassword").value;
    $("loginError").textContent = "";
    try {
      const data = await apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      setToken(data.token); state.currentUser = data.user || { email };
      closeAuthModal(); updateAuthUI(); await syncCartFromAPI();
      showToast("✓ Connecté avec succès !");
    } catch (e) { $("loginError").textContent = e.message || "Identifiants incorrects."; }
  });
  $("registerSubmit").addEventListener("click", async () => {
    const name = $("registerName").value.trim(), email = $("registerEmail").value.trim(), password = $("registerPassword").value;
    $("registerError").textContent = "";
    try {
      const data = await apiFetch("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) });
      setToken(data.token); state.currentUser = data.user || { email, name };
      closeAuthModal(); updateAuthUI(); showToast("✓ Compte créé ! Bienvenue 🎾");
    } catch (e) { $("registerError").textContent = e.message || "Erreur lors de l'inscription."; }
  });
}

function openAuthModal(mode = "login") {
  injectAuthModal(); showAuthForm(mode);
  $("authModal").style.display = "flex";
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeAuthModal() {
  if (!$("authModal")) return;
  $("authModal").style.display = "none";
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}
function showAuthForm(mode) {
  $("authLoginForm").style.display    = mode === "login"    ? "" : "none";
  $("authRegisterForm").style.display = mode === "register" ? "" : "none";
}

// ─────────────────────────────────────────────
// 8. USER BUTTON
// ─────────────────────────────────────────────

function injectUserButton() {
  if ($("userBtn")) return;
  const btn = document.createElement("button");
  btn.className = "search-btn"; btn.id = "userBtn"; btn.setAttribute("aria-label", "Mon compte");
  btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
  document.querySelector(".nav-actions").insertBefore(btn, document.querySelector(".nav-actions").firstChild);
  btn.addEventListener("click", () => {
    if (state.currentUser) {
      if (confirm(`Connecté : ${state.currentUser.email || state.currentUser.name}\n\nSe déconnecter ?`)) {
        removeToken(); state.currentUser = null; state.cart = []; renderCart(); updateAuthUI(); showToast("Déconnecté.");
      }
    } else { openAuthModal("login"); }
  });
}
function updateAuthUI() {
  const btn = $("userBtn"); if (!btn) return;
  if (state.currentUser) { btn.style.color = "var(--accent, #b5a07a)"; btn.title = state.currentUser.email || "Mon compte"; }
  else { btn.style.color = ""; btn.title = "Se connecter"; }
}

// ─────────────────────────────────────────────
// 9. CART API
// ─────────────────────────────────────────────

async function syncCartFromAPI() {
  if (!getToken()) return;
  try {
    const items = await apiFetch("/cart");
    if (!Array.isArray(items)) return;
    state.cart = items.map((item) => {
      const product = state.products.find((p) => p.id === item.product_id) || {
        id: item.product_id, name: item.product_name || item.name,
        price: parseFloat(item.price), brand_id: item.brand_id,
        category_id: item.category_id, gender: item.gender || "unisex",
      };
      return { product, qty: item.quantity, cartItemId: item.id };
    });
    renderCart();
  } catch (e) { console.warn("Could not sync cart:", e.message); }
}

async function addToCart(product) {
  const existing = state.cart.find((i) => i.product.id === product.id);
  if (existing) existing.qty += 1; else state.cart.push({ product, qty: 1 });
  renderCart();
  showToast(`✓ ${product.name.split(" ").slice(0, 3).join(" ")}… ajouté`);
  if (getToken()) {
    try { await apiFetch("/cart", { method: "POST", body: JSON.stringify({ product_id: product.id, quantity: 1 }) }); await syncCartFromAPI(); }
    catch (e) { console.warn("Cart API error:", e.message); }
  }
}
async function removeFromCart(productId) {
  const item = state.cart.find((i) => i.product.id === productId);
  state.cart = state.cart.filter((i) => i.product.id !== productId); renderCart();
  if (getToken() && item?.cartItemId) { try { await apiFetch(`/cart/${item.cartItemId}`, { method: "DELETE" }); } catch (e) { console.warn(e.message); } }
}
async function updateQty(productId, delta) {
  const item = state.cart.find((i) => i.product.id === productId); if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { await removeFromCart(productId); return; }
  renderCart();
  if (getToken() && item.cartItemId) { try { await apiFetch(`/cart/${item.cartItemId}`, { method: "PUT", body: JSON.stringify({ quantity: item.qty }) }); } catch (e) { console.warn(e.message); } }
}

// ─────────────────────────────────────────────
// 10. CHECKOUT
// ─────────────────────────────────────────────

async function checkout() {
  if (!getToken()) { showToast("⚠ Connectez-vous pour commander."); openAuthModal("login"); return; }
  if (state.cart.length === 0) return;
  try {
    const orderItems = state.cart.map((i) => ({ product_id: i.product.id, quantity: i.qty, price: i.product.price }));
    const total = state.cart.reduce((acc, i) => acc + i.product.price * i.qty, 0);
    await apiFetch("/orders", { method: "POST", body: JSON.stringify({ items: orderItems, total }) });
    await apiFetch("/cart/clear", { method: "DELETE" });
    state.cart = []; renderCart(); closeCart();
    showToast("✓ Commande passée avec succès ! 🎾");
  } catch (e) { showToast("Erreur : " + e.message); }
}

// ─────────────────────────────────────────────
// 11. CURSOR
// ─────────────────────────────────────────────

let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + "px"; cursor.style.top = mouseY + "px";
});
(function animateFollower() {
  followerX += (mouseX - followerX) * 0.12; followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + "px"; cursorFollower.style.top = followerY + "px";
  requestAnimationFrame(animateFollower);
})();
document.querySelectorAll("a, button, select, input[type=range]").forEach((el) => {
  el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
  el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
});

// ─────────────────────────────────────────────
// 12. NAVBAR
// ─────────────────────────────────────────────

window.addEventListener("scroll", () => { header.classList.toggle("scrolled", window.scrollY > 50); });

document.querySelectorAll(".nav-filter").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll(".nav-filter").forEach((l) => l.classList.remove("active"));
    link.classList.add("active"); state.filter.category = link.dataset.filter;
    renderProducts(); $("catalogue").scrollIntoView({ behavior: "smooth" });
  });
});

// ─────────────────────────────────────────────
// 13. FILTERS
// ─────────────────────────────────────────────

genderFilter.addEventListener("change", () => { state.filter.gender = genderFilter.value; renderProducts(); });
brandFilter.addEventListener("change",  () => { state.filter.brand  = brandFilter.value;  renderProducts(); });
priceRange.addEventListener("input", () => {
  const val = parseInt(priceRange.value); state.filter.maxPrice = val;
  priceDisplay.textContent = val + " €"; renderProducts();
});
sortFilter.addEventListener("change", () => { state.filter.sort = sortFilter.value; renderProducts(); });

// ─────────────────────────────────────────────
// 14. SEARCH
// ─────────────────────────────────────────────

$("searchToggle").addEventListener("click", () => { searchBar.classList.add("open"); searchInput.focus(); });
$("searchClose").addEventListener("click", () => { searchBar.classList.remove("open"); searchInput.value = ""; state.filter.search = ""; renderProducts(); });
searchInput.addEventListener("input", () => { state.filter.search = searchInput.value.trim().toLowerCase(); renderProducts(); });

// ─────────────────────────────────────────────
// 15. RENDER PRODUCTS
// ─────────────────────────────────────────────

function getFilteredProducts() {
  let result = [...state.products];
  if (state.filter.category !== "all") { const catId = parseInt(state.filter.category); result = result.filter((p) => p.category_id === catId); }
  if (state.filter.gender !== "all") { result = result.filter((p) => p.gender === state.filter.gender || p.gender === "unisex"); }
  if (state.filter.brand !== "all") { const brandId = Object.keys(BRANDS).find((k) => BRANDS[k] === state.filter.brand); result = result.filter((p) => p.brand_id === parseInt(brandId)); }
  result = result.filter((p) => parseFloat(p.price) <= state.filter.maxPrice);
  if (state.filter.search) { const q = state.filter.search; result = result.filter((p) => p.name.toLowerCase().includes(q) || (BRANDS[p.brand_id] || "").toLowerCase().includes(q) || (CATEGORIES[p.category_id] || "").toLowerCase().includes(q)); }
  switch (state.filter.sort) {
    case "price-asc":  result.sort((a, b) => a.price - b.price); break;
    case "price-desc": result.sort((a, b) => b.price - a.price); break;
    case "name-asc":   result.sort((a, b) => a.name.localeCompare(b.name)); break;
  }
  return result;
}

function renderProducts() {
  const filtered = getFilteredProducts();
  productsGrid.innerHTML = "";
  if (filtered.length === 0) { noResults.style.display = "block"; return; }
  noResults.style.display = "none";
  filtered.forEach((product, index) => productsGrid.appendChild(buildProductCard(product, index)));
}

function buildProductCard(product, index) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.style.animationDelay = `${index * 0.05}s`;

  const imgUrl      = getProductImg(product);
  const brandName   = BRANDS[product.brand_id]  || product.brand    || "";
  const catName     = CATEGORIES[product.category_id] || product.category || "";
  const genderLabel = { homme: "Homme", femme: "Femme", unisex: "Unisex" }[product.gender] || "";

  const imgHTML = imgUrl
    ? `<img src="${imgUrl}" alt="${product.name}" class="product-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/><div class="product-img-fallback" style="display:none">🎾</div>`
    : `<div class="product-img-fallback">🎾</div>`;

  card.innerHTML = `
    <div class="product-img-wrap">
      ${imgHTML}
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

  card.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
  card.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  card.querySelectorAll(".card-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const p = state.products.find((x) => x.id === parseInt(btn.dataset.id));
      if (btn.dataset.action === "detail") openModal(p); else addToCart(p);
    });
  });
  card.addEventListener("click", () => openModal(product));
  return card;
}

// ─────────────────────────────────────────────
// 16. MODAL
// ─────────────────────────────────────────────

function openModal(product) {
  const imgUrl      = getProductImg(product);
  const brandName   = BRANDS[product.brand_id]  || product.brand    || "";
  const catName     = CATEGORIES[product.category_id] || product.category || "";
  const genderLabel = { homme: "Homme", femme: "Femme", unisex: "Unisex" }[product.gender] || "";

  const imgHTML = imgUrl
    ? `<img src="${imgUrl}" alt="${product.name}" class="modal-product-img" onerror="this.outerHTML='<div class=\\'modal-img\\'>🎾</div>'"/>`
    : `<div class="modal-img">🎾</div>`;

  modalBody.innerHTML = `
    ${imgHTML}
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
  modalBody.querySelector(".modal-add").addEventListener("click", () => { addToCart(product); closeModal(); });
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
modalBackdrop.addEventListener("click", (e) => { if (e.target === modalBackdrop) closeModal(); });

// ─────────────────────────────────────────────
// 17. CART RENDER
// ─────────────────────────────────────────────

function renderCart() {
  const count = state.cart.reduce((acc, i) => acc + i.qty, 0);
  cartCount.textContent = count;
  cartCount.classList.toggle("visible", count > 0);

  if (state.cart.length === 0) {
    cartItems.innerHTML = `<p class="cart-empty">Votre panier est vide.</p>`;
    cartFooter.style.display = "none"; return;
  }

  cartItems.innerHTML = state.cart.map(({ product, qty }) => {
    const imgUrl = getProductImg(product);
    const imgHTML = imgUrl
      ? `<img src="${imgUrl}" alt="${product.name}" class="cart-item-img" onerror="this.outerHTML='<span>🎾</span>'"/>`
      : `<span>🎾</span>`;
    return `
      <div class="cart-item">
        <div class="cart-item-icon">${imgHTML}</div>
        <div class="cart-item-info">
          <p class="cart-item-name">${product.name}</p>
          <p class="cart-item-brand">${BRANDS[product.brand_id] || product.brand || ""}</p>
          <p class="cart-item-price">${formatPrice(product.price * qty)}</p>
          <div class="cart-item-qty">
            <button class="qty-btn" data-id="${product.id}" data-delta="-1">−</button>
            <span class="qty-val">${qty}</span>
            <button class="qty-btn" data-id="${product.id}" data-delta="1">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-remove="${product.id}">✕</button>
      </div>
    `;
  }).join("");

  cartItems.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => updateQty(parseInt(btn.dataset.id), parseInt(btn.dataset.delta)));
  });
  cartItems.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", () => removeFromCart(parseInt(btn.dataset.remove)));
  });

  const total = state.cart.reduce((acc, i) => acc + i.product.price * i.qty, 0);
  cartTotal.textContent = formatPrice(total);
  cartFooter.style.display = "block";
  const checkoutBtn = cartFooter.querySelector(".checkout-btn");
  if (checkoutBtn) checkoutBtn.onclick = checkout;
}

$("cartToggle").addEventListener("click", () => { cartPanel.classList.add("open"); overlay.classList.add("active"); document.body.style.overflow = "hidden"; });
$("cartClose").addEventListener("click", closeCart);

function closeCart() {
  cartPanel.classList.remove("open");
  if (!modalBackdrop.classList.contains("open")) { overlay.classList.remove("active"); document.body.style.overflow = ""; }
}
overlay.addEventListener("click", () => { closeCart(); closeModal(); });

// ─────────────────────────────────────────────
// 18. TOAST
// ─────────────────────────────────────────────

let toastTimeout;
function showToast(message) {
  toast.textContent = message; toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2800);
}

// ─────────────────────────────────────────────
// 19. HELPERS
// ─────────────────────────────────────────────

function formatPrice(value) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);
}

// ─────────────────────────────────────────────
// 20. KEYBOARD
// ─────────────────────────────────────────────

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCart(); closeModal(); closeAuthModal();
    if (searchBar.classList.contains("open")) {
      searchBar.classList.remove("open"); searchInput.value = ""; state.filter.search = ""; renderProducts();
    }
  }
});
