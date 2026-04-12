"use strict";

// ─────────────────────────────────────────────
// 1. CONFIG
// ─────────────────────────────────────────────

const API_BASE = "http://localhost:5000/api";
const IMG_BASE = "http://localhost:5000/images";

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
    throw new Error(err.error || err.message || `HTTP ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// ─────────────────────────────────────────────
// 2. PRODUCT IMAGES MAP
// ─────────────────────────────────────────────

const PRODUCT_IMG = {
  1:  ["Raquette de tennis Shift 99 Pro V1.webp", "Raquette de tennis Shift 99 Pro V1(1).webp", "Raquette de tennis Shift 99 Pro V1(2).webp"],
  2:  ["Raquette de tennis Pro Staff X v14.webp", "Raquette de tennis Pro Staff X v14(1).webp", "Raquette de tennis Pro Staff X v14(2).webp"],
  3:  ["Nike Vapor Pro 3.avif", "Nike Vapor Pro 3(1).avif", "Nike Vapor Pro 3(2).avif"],
  4:  ["Hoodie Nike Court Heritage.avif", "Hoodie Nike Court Heritage(1).avif", "Hoodie Nike Court Heritage(2).avif"],
  5:  ["Short Nike Court Victory(black).avif", "Short Nike Court Victory(black1).avif", "Short Nike Court Victory(black2).avif", "Short Nike Court Victory(white).avif"],
  6:  ["sac Nike Gym Club retro Off-White.avif", "Sac Nike Gym Club retro Off-White(1).avif", "Sac Nike Gym Club retro Off-White(2).avif", "Sac Nike Gym Club retro Off-White(purple).avif"],
  7:  ["Gold_Academy_x3.webp", "Gold_Academy_x3(1).webp", "Gold_Academy_x3(2).webp"],
  8:  ["Survêtement_Lacoste_Tennis_x_Daniil Medvedev.avif", "Survêtement_Lacoste_Tennis_x_Daniil Medvedev(1).avif", "Survêtement_Lacoste_Tennis_x_Daniil Medvedev(2).avif"],
  9:  ["Adizero Ubersonic 5 Rouge.webp", "Adizero Ubersonic 5 Rouge(1).webp", "Adizero Ubersonic 5 Rouge(2).webp"],
  10: ["Short de tennis Climacool Club.webp", "Short de tennis Climacool Club(1).webp", "Short de tennis Climacool Club(2).webp"],
  11: ["Chaussure de tennis Gamecourt 2.jpg", "Chaussure de tennis Gamecourt 2(1).jpg", "Chaussure de tennis Gamecourt 2(2).jpg"],
  12: ["Sac Wilson Super Tour Pro Staff 9R.webp", "Sac Wilson Super Tour Pro Staff 9R(1).webp", "Sac Wilson Super Tour Pro Staff 9R(2).webp", "Sac Wilson Super Tour Pro Staff 9R(3).webp"],
  13: ["Short Tennis Ultra Dry stretch Lacoste.avif", "Short Tennis Ultra Dry stretch Lacoste(1).avif", "Short Tennis Ultra Dry stretch Lacoste(2).avif"],
  14: ["Béret en Petit Piqué crocodile brodé Lacoste.avif", "Béret en Petit Piqué crocodile brodé Lacoste(1).avif", "Béret en Petit Piqué crocodile brodé Lacoste(2).avif"],
  15: ["Raquette Evo Drive Gen2 Cordée.webp", "Raquette Evo Drive Gen2 Cordée(1).webp", "Raquette Evo Drive Gen2 Cordée(2).webp"],
  16: ["Chaussures SFX 4 Clay Wome.webp", "Chaussures SFX 4 Clay Wome(1).webp", "Chaussures SFX 4 Clay Wome(2).webp"],
  17: ["Pantalon de tennis Walk On Adidas.webp", "Pantalon de tennis Walk On Adidas(1).webp", "Pantalon de tennis Walk On Adidas(2).webp"],
  18: ["Chaussettes mi-mollet de tennis Adidas.jpg", "Chaussettes mi-mollet de tennis Adidas(1).jpg", "Chaussettes mi-mollet de tennis Adidas(2).jpg"],
  19: ["Serre-poignets de tennis Nike Premier white.jpg", "Serre-poignets de tennis Nike Premier.jpg"],
  20: ["Pantalon Nike Advantage femme.jpg", "Pantalon Nike Advantage femme(2).jpg", "Pantalon Nike Advantage femme(3).jpg"],
};

function getProductImgs(product) {
  const files = PRODUCT_IMG[product.id];
  if (!files) return [];
  return files.map((f) => `${IMG_BASE}/${encodeURIComponent(f)}`);
}
function getProductMainImg(product) {
  const imgs = getProductImgs(product);
  return imgs.length > 0 ? imgs[0] : null;
}

// ─────────────────────────────────────────────
// 3. STATIC MAPS + FALLBACK
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
  promotions: [],
  cart: [],
  currentUser: null,
  filter: { category: "all", gender: "all", brand: "all", maxPrice: 300, search: "", sort: "default" },
};

// ─────────────────────────────────────────────
// 5. DOM REFS
// ─────────────────────────────────────────────

const $ = (id) => document.getElementById(id);

const loader         = $("loader");
const header         = $("header");
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
    setTimeout(() => { loader.classList.add("hidden"); renderProducts(); }, 1500);
  });
  if (getToken()) {
    apiFetch("/auth/profile")
      .then((user) => { state.currentUser = user; updateAuthUI(); })
      .catch(() => removeToken());
  }
});

async function loadProducts() {
  try {
    const data = await apiFetch("/products");
    if (Array.isArray(data) && data.length > 0) {
      state.products = data.map((p) => ({ ...p, price: parseFloat(p.price) }));
      console.log("✅ Produits chargés depuis l'API :", state.products.length);
    } else throw new Error("Réponse vide");
  } catch (e) {
    console.warn("⚠ Fallback :", e.message);
    state.products = STATIC_PRODUCTS;
  }

  // Charger les promotions actives
  try {
    const promos = await apiFetch("/promotions");
    state.promotions = Array.isArray(promos) ? promos : [];
    console.log("✅ Promotions chargées :", state.promotions.length);
  } catch (e) {
    console.warn("⚠ Promotions non chargées :", e.message);
    state.promotions = [];
  }
}

// ─────────────────────────────────────────────
// 7. AUTH MODAL (Login + Register complet)
// ─────────────────────────────────────────────

function injectAuthModal() {
  if ($("authModal")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="auth-modal-overlay" id="authModal">
      <div class="auth-modal-box" id="authModalInner">

        <!-- HEADER -->
        <div class="auth-modal-header">
          <div class="auth-modal-logo">COURT ÉLITE</div>
          <button class="auth-modal-close" id="authModalClose">✕</button>
        </div>

        <!-- TABS -->
        <div class="auth-tabs">
          <button class="auth-tab active" id="tabLogin" data-tab="login">Connexion</button>
          <button class="auth-tab" id="tabRegister" data-tab="register">Créer un compte</button>
        </div>

        <!-- LOGIN FORM -->
        <div class="auth-form" id="authLoginForm">
          <p class="auth-subtitle">Bienvenue ! Connectez-vous à votre compte.</p>
          <div class="auth-field">
            <label>Email</label>
            <input type="email" id="loginEmail" placeholder="votre@email.com" autocomplete="email"/>
          </div>
          <div class="auth-field">
            <label>Mot de passe</label>
            <div class="auth-input-wrap">
              <input type="password" id="loginPassword" placeholder="••••••••" autocomplete="current-password"/>
              <button type="button" class="auth-eye" data-target="loginPassword">👁</button>
            </div>
          </div>
          <p class="auth-error" id="loginError"></p>
          <button class="auth-submit-btn" id="loginSubmit">
            <span>Se connecter</span>
          </button>
        </div>

        <!-- REGISTER FORM -->
        <div class="auth-form" id="authRegisterForm" style="display:none">
          <p class="auth-subtitle">Créez votre compte et rejoignez Court Élite.</p>
          <div class="auth-row">
            <div class="auth-field">
              <label>Prénom</label>
              <input type="text" id="registerFirstName" placeholder="Jean" autocomplete="given-name"/>
            </div>
            <div class="auth-field">
              <label>Nom</label>
              <input type="text" id="registerLastName" placeholder="Dupont" autocomplete="family-name"/>
            </div>
          </div>
          <div class="auth-field">
            <label>Email</label>
            <input type="email" id="registerEmail" placeholder="votre@email.com" autocomplete="email"/>
          </div>
          <div class="auth-field">
            <label>Téléphone <span class="auth-optional">(optionnel)</span></label>
            <input type="tel" id="registerPhone" placeholder="+33 6 00 00 00 00" autocomplete="tel"/>
          </div>
          <div class="auth-field">
            <label>Mot de passe</label>
            <div class="auth-input-wrap">
              <input type="password" id="registerPassword" placeholder="••••••••" autocomplete="new-password"/>
              <button type="button" class="auth-eye" data-target="registerPassword">👁</button>
            </div>
            <div class="auth-password-strength" id="passwordStrength">
              <div class="strength-bar" id="strengthBar"></div>
            </div>
            <span class="auth-strength-label" id="strengthLabel"></span>
          </div>
          <div class="auth-field">
            <label>Confirmer le mot de passe</label>
            <div class="auth-input-wrap">
              <input type="password" id="registerConfirm" placeholder="••••••••" autocomplete="new-password"/>
              <button type="button" class="auth-eye" data-target="registerConfirm">👁</button>
            </div>
          </div>
          <p class="auth-error" id="registerError"></p>
          <button class="auth-submit-btn" id="registerSubmit">
            <span>Créer mon compte</span>
          </button>
        </div>

      </div>
    </div>
  `);

  $("authModalClose").addEventListener("click", closeAuthModal);
  $("authModal").addEventListener("click", (e) => { if (e.target === $("authModal")) closeAuthModal(); });

  document.querySelectorAll(".auth-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".auth-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      showAuthForm(tab.dataset.tab);
    });
  });

  document.querySelectorAll(".auth-eye").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = $(btn.dataset.target);
      input.type = input.type === "password" ? "text" : "password";
      btn.textContent = input.type === "password" ? "👁" : "🙈";
    });
  });

  $("registerPassword").addEventListener("input", () => {
    const val = $("registerPassword").value;
    const strength = getPasswordStrength(val);
    const bar   = $("strengthBar");
    const label = $("strengthLabel");
    const colors = ["", "#e05a5a", "#f0a500", "#4caf50", "#2e7d32"];
    const labels = ["", "Faible", "Moyen", "Fort", "Très fort"];
    bar.style.width   = (strength * 25) + "%";
    bar.style.background = colors[strength];
    label.textContent = val.length > 0 ? labels[strength] : "";
    label.style.color = colors[strength];
  });

  $("loginSubmit").addEventListener("click", async () => {
    const email    = $("loginEmail").value.trim();
    const password = $("loginPassword").value;
    $("loginError").textContent = "";
    if (!email || !password) { $("loginError").textContent = "Veuillez remplir tous les champs."; return; }
    setSubmitting("loginSubmit", true);
    try {
      const data = await apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      setToken(data.token);
      state.currentUser = data.user || { email };
      closeAuthModal();
      updateAuthUI();
      showToast(`✓ Bonjour ${data.user?.first_name || ""} !`);
    } catch (e) {
      $("loginError").textContent = e.message || "Email ou mot de passe incorrect.";
    } finally { setSubmitting("loginSubmit", false); }
  });

  $("registerSubmit").addEventListener("click", async () => {
    const first_name = $("registerFirstName").value.trim();
    const last_name  = $("registerLastName").value.trim();
    const email      = $("registerEmail").value.trim();
    const phone      = $("registerPhone").value.trim();
    const password   = $("registerPassword").value;
    const confirm    = $("registerConfirm").value;
    $("registerError").textContent = "";
    if (!first_name || !last_name || !email || !password) {
      $("registerError").textContent = "Veuillez remplir tous les champs obligatoires."; return;
    }
    if (password !== confirm) {
      $("registerError").textContent = "Les mots de passe ne correspondent pas."; return;
    }
    if (password.length < 6) {
      $("registerError").textContent = "Le mot de passe doit contenir au moins 6 caractères."; return;
    }
    setSubmitting("registerSubmit", true);
    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ first_name, last_name, email, password, phone: phone || null }),
      });
      const loginData = await apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      setToken(loginData.token);
      state.currentUser = loginData.user || { email, first_name, last_name };
      closeAuthModal();
      updateAuthUI();
      showToast(`✓ Bienvenue ${first_name} ! Compte créé 🎾`);
    } catch (e) {
      $("registerError").textContent = e.message || "Erreur lors de l'inscription.";
    } finally { setSubmitting("registerSubmit", false); }
  });

  ["loginEmail", "loginPassword"].forEach((id) => {
    $(id).addEventListener("keydown", (e) => { if (e.key === "Enter") $("loginSubmit").click(); });
  });
  ["registerFirstName","registerLastName","registerEmail","registerPhone","registerPassword","registerConfirm"].forEach((id) => {
    $(id).addEventListener("keydown", (e) => { if (e.key === "Enter") $("registerSubmit").click(); });
  });
}

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 6)  score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

function setSubmitting(btnId, loading) {
  const btn = $(btnId);
  if (!btn) return;
  btn.disabled = loading;
  btn.querySelector("span").textContent = loading ? "Chargement…" : (btnId === "loginSubmit" ? "Se connecter" : "Créer mon compte");
}

function openAuthModal(mode = "login") {
  injectAuthModal();
  showAuthForm(mode);
  document.querySelectorAll(".auth-tab").forEach((t) => {
    t.classList.toggle("active", t.dataset.tab === mode);
  });
  $("authModal").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeAuthModal() {
  if (!$("authModal")) return;
  $("authModal").style.display = "none";
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
      const name = `${state.currentUser.first_name || ""} ${state.currentUser.last_name || ""}`.trim() || state.currentUser.email;
      if (confirm(`Connecté : ${name}\n\nSe déconnecter ?`)) {
        removeToken(); state.currentUser = null; state.cart = []; renderCart(); updateAuthUI(); showToast("Déconnecté.");
      }
    } else openAuthModal("login");
  });
}

function updateAuthUI() {
  const btn = $("userBtn"); if (!btn) return;
  if (state.currentUser) {
    btn.style.color = "var(--accent, #b5a07a)";
    btn.title = `${state.currentUser.first_name || ""} ${state.currentUser.last_name || ""}`.trim() || state.currentUser.email;
  } else { btn.style.color = ""; btn.title = "Se connecter"; }
}

// ─────────────────────────────────────────────
// 9. CART
// ─────────────────────────────────────────────

function addToCart(product) {
  const existing = state.cart.find((i) => i.product.id === product.id);
  if (existing) existing.qty += 1; else state.cart.push({ product, qty: 1 });
  // Sauvegarder dans localStorage
  localStorage.setItem("cart", JSON.stringify(state.cart));
  renderCart();
  showToast(`✓ ${product.name.split(" ").slice(0, 3).join(" ")}… ajouté`);
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((i) => i.product.id !== productId);
  localStorage.setItem("cart", JSON.stringify(state.cart));
  renderCart();
}

function updateQty(productId, delta) {
  const item = state.cart.find((i) => i.product.id === productId); if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(productId); return; }
  localStorage.setItem("cart", JSON.stringify(state.cart));
  renderCart();
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("cart");
    state.cart = saved ? JSON.parse(saved) : [];
  } catch (e) {
    state.cart = [];
  }
}

// ─────────────────────────────────────────────
// 10. CHECKOUT
// ─────────────────────────────────────────────

async function checkout() {
  if (!getToken()) { showToast("⚠ Connectez-vous pour commander."); openAuthModal("login"); return; }
  if (state.cart.length === 0) return;
  try {
    const items = state.cart.map((i) => ({
      product_variant_id: i.product.selectedVariant ? i.product.selectedVariant.id : i.product.id,
      quantity: i.qty
    }));
    await apiFetch("/orders", { method: "POST", body: JSON.stringify({ items }) });
    state.cart = [];
    localStorage.removeItem("cart");
    renderCart();
    closeCart();
    showToast("✓ Commande passée avec succès ! 🎾");
  } catch (e) { showToast("Erreur : " + e.message); }
}

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

  const imgUrl      = getProductMainImg(product);
  const brandName   = BRANDS[product.brand_id] || product.brand || "";
  const catName     = CATEGORIES[product.category_id] || product.category || "";
  const genderLabel = { homme: "Homme", femme: "Femme", unisex: "Unisex" }[product.gender] || "";

  // Promotion
  const promo = getPromoForProduct(product.id);
  const priceHTML = promo
    ? `<span class="product-price promo-price">${formatPrice(promo.discounted_price)}</span>
       <span class="product-price-old">${formatPrice(product.price)}</span>
       <span class="product-promo-badge">-${promo.discount_percent}%</span>`
    : `<span class="product-price">${formatPrice(product.price)}</span>`;

  const imgHTML = imgUrl
    ? `<img src="${imgUrl}" alt="${product.name}" class="product-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/><div class="product-img-fallback" style="display:none">🎾</div>`
    : `<div class="product-img-fallback">🎾</div>`;

  card.innerHTML = `
    <div class="product-img-wrap">${imgHTML}<div class="product-badge">${catName}</div></div>
    <div class="product-info">
      <p class="product-brand">${brandName}</p>
      <h3 class="product-name">${product.name}</h3>
      <div class="product-footer">
        <div class="product-price-wrap">${priceHTML}</div>
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
// 16. PRODUCT MODAL WITH CAROUSEL
// ─────────────────────────────────────────────

async function openModal(product) {
  const imgs        = getProductImgs(product);
  const brandName   = BRANDS[product.brand_id] || product.brand || "";
  const catName     = CATEGORIES[product.category_id] || product.category || "";
  const genderLabel = { homme: "Homme", femme: "Femme", unisex: "Unisex" }[product.gender] || "";

  let carouselHTML = "";
  if (imgs.length > 1) {
    const slides = imgs.map((url, i) => `<div class="carousel-slide ${i === 0 ? "active" : ""}"><img src="${url}" alt="${product.name} ${i + 1}" onerror="this.parentElement.style.display='none'"/></div>`).join("");
    const dots   = imgs.map((_, i) => `<button class="carousel-dot ${i === 0 ? "active" : ""}" data-index="${i}"></button>`).join("");
    carouselHTML = `<div class="carousel" id="modalCarousel"><div class="carousel-track">${slides}</div><button class="carousel-btn carousel-prev" id="carouselPrev">&#8249;</button><button class="carousel-btn carousel-next" id="carouselNext">&#8250;</button><div class="carousel-dots">${dots}</div></div>`;
  } else if (imgs.length === 1) {
    carouselHTML = `<img src="${imgs[0]}" alt="${product.name}" class="modal-product-img" onerror="this.outerHTML='<div class=\\'modal-img\\'>🎾</div>'"/>`;
  } else {
    carouselHTML = `<div class="modal-img">🎾</div>`;
  }

  const promo = getPromoForProduct(product.id);
  const modalPriceHTML = promo
    ? `<div class="modal-price-wrap">
         <span class="modal-price promo-price">${formatPrice(promo.discounted_price)}</span>
         <span class="modal-price-old">${formatPrice(product.price)}</span>
         <span class="modal-promo-badge">-${promo.discount_percent}%</span>
       </div>`
    : `<p class="modal-price">${formatPrice(product.price)}</p>`;

  modalBody.innerHTML = `
    ${carouselHTML}
    <div class="modal-details">
      <p class="modal-brand">${brandName}</p>
      <h2 class="modal-name">${product.name}</h2>
      ${modalPriceHTML}
      <p class="modal-desc">${product.description}</p>
      <div class="modal-meta"><span class="meta-tag">${catName}</span><span class="meta-tag">${genderLabel}</span></div>
      <div id="variantSelector"><p class="variant-loading">Chargement des options…</p></div>
      <button class="modal-add" id="modalAddBtn" disabled>Ajouter au panier</button>
    </div>
  `;

  modalBackdrop.classList.add("open");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";

  if (imgs.length > 1) {
    let current = 0;
    const slides = modalBody.querySelectorAll(".carousel-slide");
    const dots   = modalBody.querySelectorAll(".carousel-dot");
    function goTo(index) {
      slides[current].classList.remove("active"); dots[current].classList.remove("active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("active"); dots[current].classList.add("active");
    }
    $("carouselPrev").addEventListener("click", (e) => { e.stopPropagation(); goTo(current - 1); });
    $("carouselNext").addEventListener("click", (e) => { e.stopPropagation(); goTo(current + 1); });
    dots.forEach((dot) => dot.addEventListener("click", (e) => { e.stopPropagation(); goTo(parseInt(dot.dataset.index)); }));
  }

  // Charger les variantes
  try {
    const data = await apiFetch(`/products/${product.id}`);
    const variants = data.variants || [];
    renderVariantSelector(product, variants);
  } catch (e) {
    $("variantSelector").innerHTML = `<p class="variant-error">Options non disponibles.</p>`;
    const addBtn = $("modalAddBtn");
    if (addBtn) { addBtn.disabled = false; addBtn.onclick = () => { addToCart(product); closeModal(); }; }
  }
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
    const imgUrl  = getProductMainImg(product);
    const imgHTML = imgUrl ? `<img src="${imgUrl}" alt="${product.name}" class="cart-item-img" onerror="this.outerHTML='<span>🎾</span>'"/>` : `<span>🎾</span>`;
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

function getPromoForProduct(productId) {
  return state.promotions.find((promo) => promo.product_id === productId) || null;
}

function renderVariantSelector(product, variants) {
  const container = $("variantSelector");
  if (!container) return;

  if (variants.length === 0) {
    container.innerHTML = "";
    const addBtn = $("modalAddBtn");
    if (addBtn) { addBtn.disabled = false; addBtn.onclick = () => { addToCart(product); closeModal(); }; }
    return;
  }

  // Extraire couleurs et tailles uniques
  const colors = [...new Map(variants.map((v) => [v.color, v])).values()].map((v) => v.color);
  const hasSizes = variants.some((v) => v.size !== null);
  const sizes  = hasSizes ? [...new Map(variants.filter((v) => v.size).map((v) => [v.size, v])).values()].map((v) => v.size) : [];

  let selectedColor = null;
  let selectedSize  = null;

  function getMatchingVariant() {
    return variants.find((v) => {
      const colorMatch = v.color === selectedColor;
      const sizeMatch  = hasSizes ? v.size === selectedSize : true;
      return colorMatch && sizeMatch;
    }) || null;
  }

  function updateAddBtn() {
    const addBtn = $("modalAddBtn");
    if (!addBtn) return;
    const variant = getMatchingVariant();
    const colorSelected = selectedColor !== null;
    const sizeSelected  = hasSizes ? selectedSize !== null : true;

    if (colorSelected && sizeSelected && variant) {
      if (variant.stock === 0) {
        addBtn.disabled = true;
        addBtn.textContent = "Rupture de stock";
      } else {
        addBtn.disabled = false;
        addBtn.textContent = "Ajouter au panier";
        addBtn.onclick = () => {
          addToCart({ ...product, selectedVariant: variant });
          closeModal();
        };
      }
    } else {
      addBtn.disabled = true;
      addBtn.textContent = "Ajouter au panier";
    }
  }

  // HTML couleurs
  const colorsHTML = `
    <div class="variant-group">
      <p class="variant-label">Couleur</p>
      <div class="variant-options">
        ${colors.map((color) => `
          <button class="variant-btn color-btn" data-color="${color}">${color}</button>
        `).join("")}
      </div>
    </div>
  `;

  // HTML tailles
  const sizesHTML = hasSizes ? `
    <div class="variant-group">
      <p class="variant-label">Taille</p>
      <div class="variant-options">
        ${sizes.map((size) => `
          <button class="variant-btn size-btn" data-size="${size}">${size}</button>
        `).join("")}
      </div>
    </div>
  ` : "";

  container.innerHTML = colorsHTML + sizesHTML;

  // Events couleurs
  container.querySelectorAll(".color-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".color-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedColor = btn.dataset.color;
      // Griser les tailles sans stock pour cette couleur
      if (hasSizes) {
        container.querySelectorAll(".size-btn").forEach((sb) => {
          const variant = variants.find((v) => v.color === selectedColor && v.size === sb.dataset.size);
          sb.disabled = variant ? variant.stock === 0 : true;
          sb.classList.toggle("out-of-stock", sb.disabled);
        });
      }
      updateAddBtn();
    });
  });

  // Events tailles
  container.querySelectorAll(".size-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      container.querySelectorAll(".size-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSize = btn.dataset.size;
      updateAddBtn();
    });
  });
}
// ─────────────────────────────────────────────
// 20. KEYBOARD
// ─────────────────────────────────────────────

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCart(); closeModal(); closeAuthModal();
    if (searchBar.classList.contains("open")) { searchBar.classList.remove("open"); searchInput.value = ""; state.filter.search = ""; renderProducts(); }
  }
  if (modalBackdrop.classList.contains("open")) {
    if (e.key === "ArrowLeft")  { const btn = $("carouselPrev"); if (btn) btn.click(); }
    if (e.key === "ArrowRight") { const btn = $("carouselNext"); if (btn) btn.click(); }
  }
});

// Charger le panier depuis localStorage au démarrage
loadCartFromStorage();
renderCart();