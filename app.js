"use strict";

const FALLBACK_MENU = [
  {
    "id": "milk-tea-brown-sugar",
    "name": "Brown Sugar Pearl Milk Tea",
    "category": "Milk Tea",
    "price": 6.75,
    "rating": 4.9,
    "prepMinutes": 8,
    "vegetarian": true,
    "available": true,
    "featured": 1,
    "image": "assets/milk-tea.svg",
    "description": "Creamy black milk tea with warm brown sugar syrup and chewy tapioca pearls."
  },
  {
    "id": "milk-tea-jasmine",
    "name": "Jasmine Milk Tea",
    "category": "Milk Tea",
    "price": 5.95,
    "rating": 4.7,
    "prepMinutes": 7,
    "vegetarian": true,
    "available": true,
    "featured": 2,
    "image": "assets/milk-tea.svg",
    "description": "Fragrant jasmine tea shaken with milk and finished with a light floral aroma."
  },
  {
    "id": "milk-tea-taro",
    "name": "Taro Cloud Milk Tea",
    "category": "Milk Tea",
    "price": 6.5,
    "rating": 4.8,
    "prepMinutes": 8,
    "vegetarian": true,
    "available": true,
    "featured": 3,
    "image": "assets/taro-tea.svg",
    "description": "Velvety taro milk tea topped with a soft cream cloud and purple yam crumble."
  },
  {
    "id": "fruit-tea-mango-passion",
    "name": "Mango Passion Fruit Tea",
    "category": "Fruit Tea",
    "price": 6.25,
    "rating": 4.8,
    "prepMinutes": 7,
    "vegetarian": true,
    "available": true,
    "featured": 4,
    "image": "assets/fruit-tea.svg",
    "description": "Green tea shaken with mango, passion fruit, citrus, and real fruit pieces."
  },
  {
    "id": "fruit-tea-strawberry-lychee",
    "name": "Strawberry Lychee Refresher",
    "category": "Fruit Tea",
    "price": 6.15,
    "rating": 4.6,
    "prepMinutes": 7,
    "vegetarian": true,
    "available": true,
    "featured": 5,
    "image": "assets/fruit-tea.svg",
    "description": "Bright strawberry tea with lychee, aloe pieces, and a squeeze of lime."
  },
  {
    "id": "slush-matcha-red-bean",
    "name": "Matcha Red Bean Slush",
    "category": "Slushes",
    "price": 6.95,
    "rating": 4.7,
    "prepMinutes": 9,
    "vegetarian": true,
    "available": true,
    "featured": 6,
    "image": "assets/slush.svg",
    "description": "Blended matcha slush layered with sweet red bean and a swirl of milk foam."
  },
  {
    "id": "snack-sea-salt-fries",
    "name": "Sea Salt Fries",
    "category": "Snacks",
    "price": 4.5,
    "rating": 4.5,
    "prepMinutes": 10,
    "vegetarian": true,
    "available": true,
    "featured": 7,
    "image": "assets/fries.svg",
    "description": "Crisp golden fries tossed with sea salt and served with house dipping sauce."
  },
  {
    "id": "snack-takoyaki",
    "name": "Takoyaki Bites",
    "category": "Snacks",
    "price": 7.25,
    "rating": 4.9,
    "prepMinutes": 12,
    "vegetarian": false,
    "available": true,
    "featured": 8,
    "image": "assets/takoyaki.svg",
    "description": "Six savory octopus bites with takoyaki sauce, mayonnaise, bonito, and seaweed."
  },
  {
    "id": "snack-popcorn-chicken",
    "name": "Taiwanese Popcorn Chicken",
    "category": "Snacks",
    "price": 7.75,
    "rating": 4.8,
    "prepMinutes": 13,
    "vegetarian": false,
    "available": true,
    "featured": 9,
    "image": "assets/popcorn-chicken.svg",
    "description": "Crispy bite-size chicken seasoned with five-spice, pepper, and fried basil."
  },
  {
    "id": "dessert-egg-waffle",
    "name": "Classic Egg Waffle",
    "category": "Sweets",
    "price": 5.75,
    "rating": 4.7,
    "prepMinutes": 9,
    "vegetarian": true,
    "available": true,
    "featured": 10,
    "image": "assets/egg-waffle.svg",
    "description": "Warm Hong Kong-style bubble waffle with crisp edges and a soft, airy center."
  },
  {
    "id": "dessert-mochi",
    "name": "Brown Sugar Mochi Bites",
    "category": "Sweets",
    "price": 5.25,
    "rating": 4.6,
    "prepMinutes": 6,
    "vegetarian": true,
    "available": true,
    "featured": 11,
    "image": "assets/mochi.svg",
    "description": "Soft mochi bites dusted with roasted soybean powder and brown sugar drizzle."
  }
];

const STORAGE_KEYS = {
  cart: "pearl-and-leaf-cart-v1",
  menu: "pearl-and-leaf-menu-v1",
  orders: "pearl-and-leaf-orders-v1",
  profile: "pearl-and-leaf-profile-v1",
  favorites: "pearl-and-leaf-favorites-v1"
};

const ORDER_STATUSES = ["Received", "Preparing", "Ready", "Completed", "Cancelled"];
const TAX_RATE = 0.0825;
const DELIVERY_FEE = 2.99;

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

const state = {
  menu: [],
  menuById: new Map(),
  cart: new Map(),
  favorites: new Set(),
  orders: [],
  profile: {
    name: "",
    email: "",
    phone: "",
    address: "",
    favoriteCategory: "",
    updates: false
  },
  filters: {
    search: "",
    category: "all",
    sort: "featured",
    favoritesOnly: false,
    popularOnly: false
  },
  adminAuthenticated: false
};

const elements = {
  currentYear: document.querySelector("#current-year"),
  mobileMenuButton: document.querySelector("#mobile-menu-button"),
  mobileMenu: document.querySelector("#mobile-menu"),
  adminNavButton: document.querySelector("#admin-nav-button"),
  mobileAdminButton: document.querySelector("#mobile-admin-button"),
  cartButton: document.querySelector("#cart-button"),
  mobileCartButton: document.querySelector("#mobile-cart-button"),
  openCartFromOrders: document.querySelector("#open-cart-from-orders"),
  cartCount: document.querySelector("#cart-count"),
  mobileCartCount: document.querySelector("#mobile-cart-count"),
  cartOverlay: document.querySelector("#cart-overlay"),
  cartDrawer: document.querySelector("#cart-drawer"),
  closeCartButton: document.querySelector("#close-cart-button"),
  cartItems: document.querySelector("#cart-items"),
  cartSubtotal: document.querySelector("#cart-subtotal"),
  cartTax: document.querySelector("#cart-tax"),
  cartDelivery: document.querySelector("#cart-delivery"),
  cartTotal: document.querySelector("#cart-total"),
  checkoutButton: document.querySelector("#checkout-button"),
  clearCartButton: document.querySelector("#clear-cart-button"),
  menuStatus: document.querySelector("#menu-status"),
  menuGrid: document.querySelector("#menu-grid"),
  menuSearch: document.querySelector("#menu-search"),
  menuCategory: document.querySelector("#menu-category"),
  menuSort: document.querySelector("#menu-sort"),
  resetFiltersButton: document.querySelector("#reset-filters-button"),
  menuHeading: document.querySelector("#menu-heading"),
  categoryRailList: document.querySelector("#category-rail-list"),
  quickSearchButton: document.querySelector("#quick-search-button"),
  popularFilterButton: document.querySelector("#popular-filter-button"),
  favoritesNavButton: document.querySelector("#favorites-nav-button"),
  mobileFavoritesButton: document.querySelector("#mobile-favorites-button"),
  favoritesCount: document.querySelector("#favorites-count"),
  showAllCategoriesButton: document.querySelector("#show-all-categories-button"),
  profileForm: document.querySelector("#profile-form"),
  profileName: document.querySelector("#profile-name"),
  profileEmail: document.querySelector("#profile-email"),
  profilePhone: document.querySelector("#profile-phone"),
  profileAddress: document.querySelector("#profile-address"),
  profileFavorite: document.querySelector("#profile-favorite"),
  profileUpdates: document.querySelector("#profile-updates"),
  profileStatus: document.querySelector("#profile-status"),
  clearProfileButton: document.querySelector("#clear-profile-button"),
  ordersList: document.querySelector("#orders-list"),
  checkoutDialog: document.querySelector("#checkout-dialog"),
  checkoutForm: document.querySelector("#checkout-form"),
  checkoutName: document.querySelector("#checkout-name"),
  checkoutEmail: document.querySelector("#checkout-email"),
  checkoutPhone: document.querySelector("#checkout-phone"),
  checkoutAddress: document.querySelector("#checkout-address"),
  checkoutAddressField: document.querySelector("#checkout-address-field"),
  checkoutNotes: document.querySelector("#checkout-notes"),
  cardFields: document.querySelector("#card-fields"),
  cardNumber: document.querySelector("#card-number"),
  cardExpiry: document.querySelector("#card-expiry"),
  cardCvc: document.querySelector("#card-cvc"),
  checkoutItems: document.querySelector("#checkout-items"),
  checkoutSubtotal: document.querySelector("#checkout-subtotal"),
  checkoutTax: document.querySelector("#checkout-tax"),
  checkoutDelivery: document.querySelector("#checkout-delivery"),
  checkoutTotal: document.querySelector("#checkout-total"),
  checkoutProgress: document.querySelector("#checkout-progress"),
  placeOrderButton: document.querySelector("#place-order-button"),
  checkoutStatus: document.querySelector("#checkout-status"),
  adminLoginDialog: document.querySelector("#admin-login-dialog"),
  adminLoginForm: document.querySelector("#admin-login-form"),
  adminEmail: document.querySelector("#admin-email"),
  adminPassword: document.querySelector("#admin-password"),
  adminLoginStatus: document.querySelector("#admin-login-status"),
  adminPanel: document.querySelector("#admin-panel"),
  adminLogoutButton: document.querySelector("#admin-logout-button"),
  adminStats: document.querySelector("#admin-stats"),
  adminMenuForm: document.querySelector("#admin-menu-form"),
  adminItemId: document.querySelector("#admin-item-id"),
  adminItemName: document.querySelector("#admin-item-name"),
  adminItemCategory: document.querySelector("#admin-item-category"),
  adminItemPrice: document.querySelector("#admin-item-price"),
  adminItemRating: document.querySelector("#admin-item-rating"),
  adminItemImage: document.querySelector("#admin-item-image"),
  adminItemDescription: document.querySelector("#admin-item-description"),
  adminItemVegetarian: document.querySelector("#admin-item-vegetarian"),
  adminMenuStatus: document.querySelector("#admin-menu-status"),
  cancelMenuEditButton: document.querySelector("#cancel-menu-edit-button"),
  resetMenuButton: document.querySelector("#reset-menu-button"),
  adminMenuTableBody: document.querySelector("#admin-menu-table-body"),
  adminOrdersTableBody: document.querySelector("#admin-orders-table-body"),
  adminOrdersEmpty: document.querySelector("#admin-orders-empty"),
  toastRegion: document.querySelector("#toast-region")
};

function readStorage(key, fallback) {
  try {
    const rawValue = localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch (error) {
    console.warn(`Unable to read ${key}:`, error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Unable to write ${key}:`, error);
    showToast("This browser could not save the latest changes.", "error");
    return false;
  }
}

function isMenuItem(value) {
  return Boolean(
    value &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.category === "string" &&
    Number.isFinite(Number(value.price)) &&
    typeof value.description === "string"
  );
}

function normalizeMenuItem(item, index = 0) {
  return {
    id: String(item.id),
    name: String(item.name),
    category: String(item.category),
    price: Number(item.price),
    rating: Number(item.rating) || 4.5,
    prepMinutes: Number(item.prepMinutes) || 15,
    vegetarian: Boolean(item.vegetarian),
    available: item.available !== false,
    featured: Number(item.featured) || index + 1,
    image: String(item.image || "assets/milk-tea.svg"),
    description: String(item.description)
  };
}

function rebuildMenuIndex() {
  state.menuById = new Map(state.menu.map((item) => [item.id, item]));
}

async function loadMenu() {
  elements.menuStatus.classList.remove("hidden");
  elements.menuGrid.replaceChildren();

  let fetchedMenu = null;

  try {
    const response = await fetch("data/menu.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Menu request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data) || !data.every(isMenuItem)) {
      throw new TypeError("Menu data has an unexpected structure.");
    }

    fetchedMenu = data.map(normalizeMenuItem);
  } catch (error) {
    console.warn("Using the built-in menu fallback:", error);
    fetchedMenu = FALLBACK_MENU.map(normalizeMenuItem);
    showToast("Menu loaded from the built-in fallback. Use a local server to exercise the JSON request.");
  }

  const savedMenu = readStorage(STORAGE_KEYS.menu, null);
  if (Array.isArray(savedMenu) && savedMenu.every(isMenuItem)) {
    state.menu = savedMenu.map(normalizeMenuItem);
  } else {
    state.menu = fetchedMenu;
  }

  rebuildMenuIndex();
  elements.menuStatus.classList.add("hidden");
  renderCategoryOptions();
  renderMenu();
  renderCart();
  renderAdmin();
}

function loadStoredState() {
  const savedCart = readStorage(STORAGE_KEYS.cart, []);
  if (Array.isArray(savedCart)) {
    for (const entry of savedCart) {
      if (Array.isArray(entry) && typeof entry[0] === "string") {
        const quantity = Math.max(1, Math.min(99, Number(entry[1]) || 1));
        state.cart.set(entry[0], quantity);
      }
    }
  }

  const savedOrders = readStorage(STORAGE_KEYS.orders, []);
  if (Array.isArray(savedOrders)) {
    state.orders = savedOrders.filter((order) => order && typeof order.id === "string");
  }

  const savedProfile = readStorage(STORAGE_KEYS.profile, null);
  if (savedProfile && typeof savedProfile === "object") {
    state.profile = { ...state.profile, ...savedProfile };
  }

  const savedFavorites = readStorage(STORAGE_KEYS.favorites, []);
  if (Array.isArray(savedFavorites)) {
    state.favorites = new Set(savedFavorites.filter((itemId) => typeof itemId === "string"));
  }
}

function saveCart() {
  writeStorage(STORAGE_KEYS.cart, Array.from(state.cart.entries()));
}

function saveMenu() {
  writeStorage(STORAGE_KEYS.menu, state.menu);
}

function saveOrders() {
  writeStorage(STORAGE_KEYS.orders, state.orders);
}

function saveProfile() {
  writeStorage(STORAGE_KEYS.profile, state.profile);
}

function saveFavorites() {
  writeStorage(STORAGE_KEYS.favorites, Array.from(state.favorites));
}

function createElement(tagName, options = {}) {
  const element = document.createElement(tagName);

  if (options.className) {
    element.className = options.className;
  }

  if (options.text !== undefined) {
    element.textContent = options.text;
  }

  if (options.attributes) {
    for (const [name, value] of Object.entries(options.attributes)) {
      element.setAttribute(name, String(value));
    }
  }

  return element;
}

function showToast(message, type = "default") {
  const toast = createElement("div", {
    className: `toast${type === "success" ? " toast-success" : ""}${type === "error" ? " toast-error" : ""}`,
    text: message,
    attributes: { role: type === "error" ? "alert" : "status" }
  });

  elements.toastRegion.append(toast);
  window.setTimeout(() => toast.remove(), 4200);
}

function renderCategoryOptions() {
  const categories = [...new Set(state.menu.map((item) => item.category))].sort();
  const currentCategory = state.filters.category;

  elements.menuCategory.replaceChildren(createElement("option", {
    text: "All categories",
    attributes: { value: "all" }
  }));

  elements.profileFavorite.replaceChildren(createElement("option", {
    text: "No preference",
    attributes: { value: "" }
  }));

  for (const category of categories) {
    elements.menuCategory.append(createElement("option", {
      text: category,
      attributes: { value: category }
    }));

    elements.profileFavorite.append(createElement("option", {
      text: category,
      attributes: { value: category }
    }));
  }

  elements.menuCategory.value = categories.includes(currentCategory) ? currentCategory : "all";
  elements.profileFavorite.value = state.profile.favoriteCategory || "";
  renderCategoryRail(categories);
}

function renderCategoryRail(categories = [...new Set(state.menu.map((item) => item.category))].sort()) {
  if (!elements.categoryRailList) return;
  elements.categoryRailList.replaceChildren();

  for (const category of categories) {
    const sample = state.menu.find((item) => item.category === category);
    const count = state.menu.filter((item) => item.category === category).length;
    const button = createElement("button", {
      className: `category-rail-button${state.filters.category === category ? " is-active" : ""}`,
      attributes: {
        type: "button",
        "data-category-filter": category,
        "aria-pressed": String(state.filters.category === category)
      }
    });

    const image = createElement("img", {
      attributes: {
        src: sample?.image || "",
        alt: "",
        loading: "lazy"
      }
    });
    const text = createElement("span");
    text.append(
      createElement("strong", { text: category }),
      createElement("small", { text: `${count} item${count === 1 ? "" : "s"}` })
    );
    button.append(image, text);
    elements.categoryRailList.append(button);
  }
}

function getFilteredMenu() {
  const search = state.filters.search.trim().toLowerCase();

  const filtered = state.menu.filter((item) => {
    const matchesSearch = !search || [item.name, item.category, item.description, item.vegetarian ? "vegetarian" : ""]
      .some((value) => value.toLowerCase().includes(search));
    const matchesCategory = state.filters.category === "all" || item.category === state.filters.category;
    const matchesFavorites = !state.filters.favoritesOnly || state.favorites.has(item.id);
    const matchesPopular = !state.filters.popularOnly || item.rating >= 4.7;
    return matchesSearch && matchesCategory && matchesFavorites && matchesPopular;
  });

  return filtered.sort((a, b) => {
    switch (state.filters.sort) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return a.featured - b.featured;
    }
  });
}

function updateFilterControls() {
  elements.favoritesCount.textContent = String(state.favorites.size);
  elements.favoritesNavButton?.classList.toggle("is-active", state.filters.favoritesOnly);
  elements.favoritesNavButton?.setAttribute("aria-pressed", String(state.filters.favoritesOnly));
  elements.mobileFavoritesButton?.classList.toggle("is-active", state.filters.favoritesOnly);
  elements.popularFilterButton?.classList.toggle("is-active", state.filters.popularOnly);
  elements.popularFilterButton?.setAttribute("aria-pressed", String(state.filters.popularOnly));

  if (state.filters.favoritesOnly) {
    elements.menuHeading.textContent = "Your favorites";
  } else if (state.filters.popularOnly) {
    elements.menuHeading.textContent = "Popular picks";
  } else if (state.filters.category !== "all") {
    elements.menuHeading.textContent = state.filters.category;
  } else {
    elements.menuHeading.textContent = "Explore the menu";
  }
}

function renderMenu() {
  elements.menuGrid.replaceChildren();
  updateFilterControls();
  renderCategoryRail();
  const menuItems = getFilteredMenu();

  if (menuItems.length === 0) {
    elements.menuGrid.append(createElement("div", {
      className: "empty-panel",
      text: state.filters.favoritesOnly
        ? "No favorites yet. Select the heart on a menu item to save it here."
        : "No menu items match those filters. Try another search or reset the filters."
    }));
    return;
  }

  for (const item of menuItems) {
    const card = createElement("article", { className: "menu-card" });
    const imageWrapper = createElement("div", { className: "menu-card-image" });
    const image = createElement("img", {
      attributes: {
        src: item.image,
        alt: `Illustration for ${item.name}`,
        loading: "lazy"
      }
    });
    imageWrapper.append(image);

    imageWrapper.append(createElement("span", {
      className: "menu-rating-pill",
      text: `★ ${item.rating.toFixed(1)}`
    }));

    const favoriteButton = createElement("button", {
      className: `favorite-button${state.favorites.has(item.id) ? " is-favorite" : ""}`,
      text: state.favorites.has(item.id) ? "♥" : "♡",
      attributes: {
        type: "button",
        "data-favorite-item": item.id,
        "aria-label": `${state.favorites.has(item.id) ? "Remove" : "Add"} ${item.name} ${state.favorites.has(item.id) ? "from" : "to"} favorites`,
        "aria-pressed": String(state.favorites.has(item.id))
      }
    });
    imageWrapper.append(favoriteButton);

    if (!item.available) {
      imageWrapper.append(createElement("span", {
        className: "menu-soldout-pill",
        text: "Sold out"
      }));
    }

    const body = createElement("div", { className: "menu-card-body" });
    const title = createElement("h3", { className: "menu-card-title", text: item.name });
    const meta = createElement("div", { className: "menu-card-meta" });
    meta.append(
      createElement("span", { text: item.category }),
      createElement("span", { text: "•" }),
      createElement("span", { text: `${item.prepMinutes} min` })
    );

    const description = createElement("p", { className: "menu-card-description", text: item.description });
    const footer = createElement("div", { className: "menu-card-footer" });
    const price = createElement("span", { className: "price", text: currency.format(item.price) });
    const addButton = createElement("button", {
      className: "add-button",
      text: item.available ? "Add" : "Unavailable",
      attributes: {
        type: "button",
        "data-add-item": item.id,
        ...(item.available ? {} : { disabled: "" })
      }
    });
    footer.append(price, addButton);
    body.append(title, meta, description, footer);
    card.append(imageWrapper, body);
    elements.menuGrid.append(card);
  }
}

function getCartLineItems() {
  const items = [];

  for (const [itemId, quantity] of state.cart.entries()) {
    const item = state.menuById.get(itemId);
    if (item && quantity > 0) {
      items.push({ item, quantity, lineTotal: item.price * quantity });
    }
  }

  return items;
}

function calculateTotals(orderType = "delivery") {
  const subtotal = getCartLineItems().reduce((sum, line) => sum + line.lineTotal, 0);
  const tax = subtotal * TAX_RATE;
  const delivery = subtotal > 0 && orderType === "delivery" ? DELIVERY_FEE : 0;
  return { subtotal, tax, delivery, total: subtotal + tax + delivery };
}

function getCartQuantity() {
  return Array.from(state.cart.values()).reduce((sum, quantity) => sum + quantity, 0);
}

function addToCart(itemId) {
  const item = state.menuById.get(itemId);
  if (!item || !item.available) {
    showToast("That item is currently unavailable.", "error");
    return;
  }

  state.cart.set(itemId, Math.min(99, (state.cart.get(itemId) || 0) + 1));
  saveCart();
  renderCart();
  showToast(`${item.name} added to the cart.`, "success");
}

function updateCartQuantity(itemId, change) {
  const currentQuantity = state.cart.get(itemId) || 0;
  const nextQuantity = currentQuantity + change;

  if (nextQuantity <= 0) {
    state.cart.delete(itemId);
  } else {
    state.cart.set(itemId, Math.min(99, nextQuantity));
  }

  saveCart();
  renderCart();
}

function renderCart() {
  for (const itemId of [...state.cart.keys()]) {
    if (!state.menuById.has(itemId)) {
      state.cart.delete(itemId);
    }
  }

  const lineItems = getCartLineItems();
  const quantity = getCartQuantity();
  const totals = calculateTotals("delivery");

  elements.cartCount.textContent = String(quantity);
  elements.cartCount.setAttribute("aria-label", `${quantity} item${quantity === 1 ? "" : "s"}`);
  elements.mobileCartCount.textContent = String(quantity);
  elements.cartItems.replaceChildren();

  if (lineItems.length === 0) {
    elements.cartItems.append(createElement("div", {
      className: "empty-panel",
      text: "Your cart is empty. Add a menu item to begin an order."
    }));
  } else {
    for (const { item, quantity: itemQuantity, lineTotal } of lineItems) {
      const row = createElement("article", { className: "cart-item" });
      const image = createElement("img", {
        attributes: { src: item.image, alt: "" }
      });
      const content = createElement("div");
      const top = createElement("div", { className: "flex items-start justify-between gap-3" });
      const name = createElement("h3", { className: "font-bold", text: item.name });
      const linePrice = createElement("strong", { className: "text-sm", text: currency.format(lineTotal) });
      top.append(name, linePrice);

      const controls = createElement("div", { className: "mt-3 flex flex-wrap items-center justify-between gap-3" });
      const quantityControl = createElement("div", { className: "quantity-control" });
      const decrease = createElement("button", {
        text: "−",
        attributes: { type: "button", "data-cart-decrease": item.id, "aria-label": `Decrease ${item.name} quantity` }
      });
      const value = createElement("span", { text: String(itemQuantity), attributes: { "aria-label": `${itemQuantity} in cart` } });
      const increase = createElement("button", {
        text: "+",
        attributes: { type: "button", "data-cart-increase": item.id, "aria-label": `Increase ${item.name} quantity` }
      });
      quantityControl.append(decrease, value, increase);

      const remove = createElement("button", {
        className: "text-button text-sm",
        text: "Remove",
        attributes: { type: "button", "data-cart-remove": item.id }
      });
      controls.append(quantityControl, remove);
      content.append(top, controls);
      row.append(image, content);
      elements.cartItems.append(row);
    }
  }

  elements.cartSubtotal.textContent = currency.format(totals.subtotal);
  elements.cartTax.textContent = currency.format(totals.tax);
  elements.cartDelivery.textContent = currency.format(totals.delivery);
  elements.cartTotal.textContent = currency.format(totals.total);
  elements.checkoutButton.disabled = lineItems.length === 0;
  elements.clearCartButton.disabled = lineItems.length === 0;

  renderCheckoutSummary();
}

function openCart() {
  elements.cartOverlay.classList.remove("hidden");
  elements.cartDrawer.classList.add("open");
  elements.cartDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  window.setTimeout(() => elements.closeCartButton.focus(), 50);
}

function closeCart() {
  elements.cartOverlay.classList.add("hidden");
  elements.cartDrawer.classList.remove("open");
  elements.cartDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function openCheckout() {
  if (state.cart.size === 0) return;
  closeCart();
  populateCheckoutFromProfile();
  updateCheckoutFields();
  renderCheckoutSummary();
  elements.checkoutStatus.textContent = "";
  elements.checkoutDialog.showModal();
}

function getSelectedValue(form, name) {
  const selected = form.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : "";
}

function updateCheckoutFields() {
  const orderType = getSelectedValue(elements.checkoutForm, "orderType");
  const paymentMethod = getSelectedValue(elements.checkoutForm, "paymentMethod");
  const addressRequired = orderType === "delivery";
  const cardRequired = paymentMethod === "card";

  elements.checkoutAddressField.classList.toggle("hidden", !addressRequired);
  elements.checkoutAddress.required = addressRequired;
  elements.cardFields.classList.toggle("hidden", !cardRequired);
  elements.cardNumber.required = cardRequired;
  elements.cardExpiry.required = cardRequired;
  elements.cardCvc.required = cardRequired;

  const payAtCounterInput = elements.checkoutForm.querySelector('input[value="pay-at-counter"]');
  const payAtCounterCard = payAtCounterInput.closest("label");
  payAtCounterInput.disabled = orderType !== "pickup";
  payAtCounterCard.classList.toggle("opacity-50", orderType !== "pickup");

  if (orderType !== "pickup" && paymentMethod === "pay-at-counter") {
    elements.checkoutForm.querySelector('input[value="card"]').checked = true;
    elements.checkoutForm.querySelector('input[value="pay-at-counter"]').checked = false;
    updateCheckoutFields();
    return;
  }

  renderCheckoutSummary();
}

function populateCheckoutFromProfile() {
  elements.checkoutName.value = state.profile.name || "";
  elements.checkoutEmail.value = state.profile.email || "";
  elements.checkoutPhone.value = state.profile.phone || "";
  elements.checkoutAddress.value = state.profile.address || "";
}

function renderCheckoutSummary() {
  if (!elements.checkoutItems) return;
  const orderType = getSelectedValue(elements.checkoutForm, "orderType") || "delivery";
  const lineItems = getCartLineItems();
  const totals = calculateTotals(orderType);

  elements.checkoutItems.replaceChildren();
  for (const { item, quantity, lineTotal } of lineItems) {
    const row = createElement("div", { className: "flex justify-between gap-4 text-sm" });
    row.append(
      createElement("span", { text: `${quantity} × ${item.name}` }),
      createElement("strong", { text: currency.format(lineTotal) })
    );
    elements.checkoutItems.append(row);
  }

  elements.checkoutSubtotal.textContent = currency.format(totals.subtotal);
  elements.checkoutTax.textContent = currency.format(totals.tax);
  elements.checkoutDelivery.textContent = currency.format(totals.delivery);
  elements.checkoutTotal.textContent = currency.format(totals.total);
}

function validateCardFields() {
  const digits = elements.cardNumber.value.replace(/\D/g, "");
  const cvc = elements.cardCvc.value.replace(/\D/g, "");
  const expiryMatch = elements.cardExpiry.value.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);

  elements.cardNumber.setCustomValidity(digits.length === 16 ? "" : "Enter a 16-digit card number.");
  elements.cardCvc.setCustomValidity(cvc.length >= 3 && cvc.length <= 4 ? "" : "Enter a 3- or 4-digit security code.");

  let validExpiry = false;
  if (expiryMatch) {
    const month = Number(expiryMatch[1]);
    const year = 2000 + Number(expiryMatch[2]);
    const expiryDate = new Date(year, month, 0, 23, 59, 59);
    validExpiry = expiryDate >= new Date();
  }
  elements.cardExpiry.setCustomValidity(validExpiry ? "" : "Enter a future expiration date in MM/YY format.");
}

function clearCardValidity() {
  elements.cardNumber.setCustomValidity("");
  elements.cardExpiry.setCustomValidity("");
  elements.cardCvc.setCustomValidity("");
}

function formatCardNumber() {
  const digits = elements.cardNumber.value.replace(/\D/g, "").slice(0, 16);
  elements.cardNumber.value = digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatCardExpiry() {
  const digits = elements.cardExpiry.value.replace(/\D/g, "").slice(0, 4);
  elements.cardExpiry.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

function createOrder(formData) {
  const orderType = String(formData.get("orderType"));
  const paymentMethod = String(formData.get("paymentMethod"));
  const totals = calculateTotals(orderType);
  const createdAt = new Date();

  return {
    id: `FF-${createdAt.getFullYear()}${String(createdAt.getMonth() + 1).padStart(2, "0")}${String(createdAt.getDate()).padStart(2, "0")}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    createdAt: createdAt.toISOString(),
    status: "Received",
    orderType,
    paymentMethod,
    customer: {
      name: String(formData.get("name")).trim(),
      email: String(formData.get("email")).trim(),
      phone: String(formData.get("phone")).trim(),
      address: orderType === "delivery" ? String(formData.get("address")).trim() : "Pickup"
    },
    notes: String(formData.get("notes") || "").trim(),
    items: getCartLineItems().map(({ item, quantity }) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity
    })),
    totals
  };
}

async function submitOrder(event) {
  event.preventDefault();

  if (getSelectedValue(elements.checkoutForm, "paymentMethod") === "card") {
    validateCardFields();
  } else {
    clearCardValidity();
  }

  if (!elements.checkoutForm.checkValidity()) {
    elements.checkoutForm.reportValidity();
    elements.checkoutStatus.textContent = "Correct the highlighted checkout fields and try again.";
    return;
  }

  if (state.cart.size === 0) {
    elements.checkoutStatus.textContent = "The cart is empty.";
    return;
  }

  elements.placeOrderButton.disabled = true;
  elements.checkoutProgress.classList.remove("hidden");
  elements.checkoutStatus.textContent = "";

  await new Promise((resolve) => window.setTimeout(resolve, 900));

  const formData = new FormData(elements.checkoutForm);
  const order = createOrder(formData);
  state.orders.unshift(order);
  saveOrders();

  state.profile = {
    ...state.profile,
    name: order.customer.name,
    email: order.customer.email,
    phone: order.customer.phone,
    address: order.orderType === "delivery" ? order.customer.address : state.profile.address
  };
  saveProfile();
  renderProfile();

  state.cart.clear();
  saveCart();
  renderCart();
  renderOrders();
  renderAdmin();

  elements.checkoutProgress.classList.add("hidden");
  elements.placeOrderButton.disabled = false;
  elements.checkoutForm.reset();
  clearCardValidity();
  elements.checkoutDialog.close();
  showToast(`Order ${order.id} was placed successfully.`, "success");
  document.querySelector("#orders").scrollIntoView({ behavior: "smooth" });
}

function getStatusClass(status) {
  switch (status) {
    case "Completed":
      return "status-badge-green";
    case "Cancelled":
      return "status-badge-red";
    case "Ready":
      return "status-badge-blue";
    case "Preparing":
      return "status-badge-amber";
    default:
      return "status-badge-slate";
  }
}

function getStatusProgress(status) {
  const progressMap = {
    Received: 1,
    Preparing: 2,
    Ready: 3,
    Completed: 4,
    Cancelled: 0
  };
  return progressMap[status] ?? 0;
}

function renderOrders() {
  elements.ordersList.replaceChildren();

  if (state.orders.length === 0) {
    elements.ordersList.append(createElement("div", {
      className: "empty-panel",
      text: "No orders yet. Your completed checkout will appear here with live status updates."
    }));
    return;
  }

  for (const order of state.orders) {
    const card = createElement("article", { className: "order-card" });
    const header = createElement("div", { className: "order-card-header" });
    const titleGroup = createElement("div");
    titleGroup.append(
      createElement("h3", { className: "font-bold", text: `Order ${order.id}` }),
      createElement("p", {
        className: "mt-1 text-sm text-slate-500",
        text: new Date(order.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })
      })
    );
    const badge = createElement("span", {
      className: `status-badge ${getStatusClass(order.status)}`,
      text: order.status
    });
    header.append(titleGroup, badge);

    const body = createElement("div", { className: "order-card-body" });
    const itemList = createElement("div", { className: "space-y-2" });
    for (const item of order.items) {
      const row = createElement("div", { className: "flex justify-between gap-4 text-sm" });
      row.append(
        createElement("span", { text: `${item.quantity} × ${item.name}` }),
        createElement("strong", { text: currency.format(item.price * item.quantity) })
      );
      itemList.append(row);
    }

    const summary = createElement("div", { className: "rounded-xl border border-slate-200 bg-white p-4" });
    summary.append(
      createElement("p", { className: "text-sm text-slate-500", text: order.orderType === "delivery" ? "Delivery order" : "Pickup order" }),
      createElement("p", { className: "mt-1 text-xl font-black", text: currency.format(order.totals.total) })
    );

    const progress = createElement("div", { className: "mt-4" });
    const progressLabel = createElement("p", {
      className: "mb-2 text-sm text-slate-600",
      text: order.status === "Cancelled" ? "This order was cancelled." : `Current stage: ${order.status}`
    });
    const progressBars = createElement("div", { className: "order-progress", attributes: { "aria-hidden": "true" } });
    const completedSteps = getStatusProgress(order.status);
    for (let index = 1; index <= 4; index += 1) {
      progressBars.append(createElement("span", {
        className: `order-progress-step${index <= completedSteps ? " complete" : ""}`
      }));
    }
    progress.append(progressLabel, progressBars);
    body.append(itemList, summary);
    card.append(header, body, progress);
    progress.classList.add("px-4", "pb-4");
    elements.ordersList.append(card);
  }
}

function renderProfile() {
  elements.profileName.value = state.profile.name || "";
  elements.profileEmail.value = state.profile.email || "";
  elements.profilePhone.value = state.profile.phone || "";
  elements.profileAddress.value = state.profile.address || "";
  elements.profileFavorite.value = state.profile.favoriteCategory || "";
  elements.profileUpdates.checked = Boolean(state.profile.updates);
}

function submitProfile(event) {
  event.preventDefault();

  if (!elements.profileForm.checkValidity()) {
    elements.profileForm.reportValidity();
    elements.profileStatus.textContent = "Correct the profile fields and try again.";
    return;
  }

  const formData = new FormData(elements.profileForm);
  state.profile = {
    name: String(formData.get("name")).trim(),
    email: String(formData.get("email")).trim(),
    phone: String(formData.get("phone")).trim(),
    address: String(formData.get("address")).trim(),
    favoriteCategory: String(formData.get("favoriteCategory") || ""),
    updates: formData.get("updates") === "on"
  };
  saveProfile();
  elements.profileStatus.textContent = "Profile saved in this browser.";
  showToast("Profile saved.", "success");
}

function clearProfile() {
  state.profile = {
    name: "",
    email: "",
    phone: "",
    address: "",
    favoriteCategory: "",
    updates: false
  };
  saveProfile();
  renderProfile();
  elements.profileStatus.textContent = "Profile cleared.";
}

function openAdminLogin() {
  closeMobileMenu();
  if (state.adminAuthenticated) {
    elements.adminPanel.classList.remove("hidden");
    renderAdmin();
    elements.adminPanel.scrollIntoView({ behavior: "smooth" });
    return;
  }
  elements.adminLoginStatus.textContent = "";
  elements.adminLoginDialog.showModal();
}

function submitAdminLogin(event) {
  event.preventDefault();

  if (!elements.adminLoginForm.checkValidity()) {
    elements.adminLoginForm.reportValidity();
    return;
  }

  const validEmail = elements.adminEmail.value.trim().toLowerCase() === "admin@pearlandleaf.test";
  const validPassword = elements.adminPassword.value === "demo1234";

  if (!validEmail || !validPassword) {
    elements.adminLoginStatus.textContent = "The demo email or password is incorrect.";
    return;
  }

  state.adminAuthenticated = true;
  elements.adminLoginDialog.close();
  elements.adminPanel.classList.remove("hidden");
  renderAdmin();
  elements.adminPanel.scrollIntoView({ behavior: "smooth" });
  showToast("Admin dashboard opened.", "success");
}

function logoutAdmin() {
  state.adminAuthenticated = false;
  elements.adminPanel.classList.add("hidden");
  document.querySelector("#home").scrollIntoView({ behavior: "smooth" });
  showToast("Admin session closed.");
}

function renderAdminStats() {
  const activeItems = state.menu.filter((item) => item.available).length;
  const pendingOrders = state.orders.filter((order) => !["Completed", "Cancelled"].includes(order.status)).length;
  const completedRevenue = state.orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((sum, order) => sum + Number(order.totals?.total || 0), 0);
  const averageOrder = state.orders.length > 0 ? completedRevenue / state.orders.length : 0;

  const stats = [
    ["Active menu items", String(activeItems)],
    ["Pending orders", String(pendingOrders)],
    ["Order value", currency.format(completedRevenue)],
    ["Average order", currency.format(averageOrder)]
  ];

  elements.adminStats.replaceChildren();
  for (const [label, value] of stats) {
    const card = createElement("dl", { className: "admin-stat" });
    card.append(
      createElement("dt", { text: label }),
      createElement("dd", { text: value })
    );
    elements.adminStats.append(card);
  }
}

function renderAdminMenuTable() {
  elements.adminMenuTableBody.replaceChildren();

  for (const item of state.menu) {
    const row = createElement("tr");
    const itemCell = createElement("td");
    itemCell.append(
      createElement("strong", { text: item.name }),
      createElement("div", { className: "mt-1 text-xs text-slate-400", text: item.category })
    );

    const priceCell = createElement("td", { text: currency.format(item.price) });
    const statusCell = createElement("td");
    statusCell.append(createElement("span", {
      className: `status-badge ${item.available ? "status-badge-green" : "status-badge-red"}`,
      text: item.available ? "Available" : "Sold out"
    }));

    const actionsCell = createElement("td");
    const actionGroup = createElement("div", { className: "flex flex-wrap gap-2" });
    actionGroup.append(
      createElement("button", {
        className: "table-action",
        text: "Edit",
        attributes: { type: "button", "data-admin-edit": item.id }
      }),
      createElement("button", {
        className: "table-action",
        text: item.available ? "Mark sold out" : "Make available",
        attributes: { type: "button", "data-admin-toggle": item.id }
      }),
      createElement("button", {
        className: "table-action table-action-danger",
        text: "Delete",
        attributes: { type: "button", "data-admin-delete": item.id }
      })
    );
    actionsCell.append(actionGroup);
    row.append(itemCell, priceCell, statusCell, actionsCell);
    elements.adminMenuTableBody.append(row);
  }
}

function renderAdminOrdersTable() {
  elements.adminOrdersTableBody.replaceChildren();
  elements.adminOrdersEmpty.classList.toggle("hidden", state.orders.length !== 0);

  for (const order of state.orders) {
    const row = createElement("tr");
    row.append(
      createElement("td", { text: order.id }),
      createElement("td", { text: order.customer?.name || "Guest" }),
      createElement("td", { text: currency.format(Number(order.totals?.total || 0)) }),
      createElement("td", {
        text: new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      })
    );

    const statusCell = createElement("td");
    const select = createElement("select", {
      attributes: { "data-order-status": order.id, "aria-label": `Status for order ${order.id}` }
    });
    for (const status of ORDER_STATUSES) {
      const option = createElement("option", { text: status, attributes: { value: status } });
      option.selected = order.status === status;
      select.append(option);
    }
    statusCell.append(select);
    row.append(statusCell);
    elements.adminOrdersTableBody.append(row);
  }
}

function renderAdmin() {
  if (!state.adminAuthenticated) return;
  renderAdminStats();
  renderAdminMenuTable();
  renderAdminOrdersTable();
}

function clearAdminMenuForm() {
  elements.adminMenuForm.reset();
  elements.adminItemId.value = "";
  elements.adminItemRating.value = "4.5";
  elements.adminMenuStatus.textContent = "";
}

function editMenuItem(itemId) {
  const item = state.menuById.get(itemId);
  if (!item) return;

  elements.adminItemId.value = item.id;
  elements.adminItemName.value = item.name;
  elements.adminItemCategory.value = item.category;
  elements.adminItemPrice.value = String(item.price);
  elements.adminItemRating.value = String(item.rating);
  elements.adminItemImage.value = item.image;
  elements.adminItemDescription.value = item.description;
  elements.adminItemVegetarian.checked = item.vegetarian;
  elements.adminMenuStatus.textContent = `Editing ${item.name}.`;
  elements.adminItemName.focus();
}

function createMenuId(name) {
  const base = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "menu-item";
  let candidate = base;
  let counter = 2;
  while (state.menuById.has(candidate)) {
    candidate = `${base}-${counter}`;
    counter += 1;
  }
  return candidate;
}

function submitAdminMenuItem(event) {
  event.preventDefault();

  if (!elements.adminMenuForm.checkValidity()) {
    elements.adminMenuForm.reportValidity();
    elements.adminMenuStatus.textContent = "Correct the menu item fields and try again.";
    return;
  }

  const formData = new FormData(elements.adminMenuForm);
  const existingId = String(formData.get("id") || "");
  const existingItem = state.menuById.get(existingId);
  const item = normalizeMenuItem({
    id: existingItem ? existingItem.id : createMenuId(String(formData.get("name"))),
    name: String(formData.get("name")).trim(),
    category: String(formData.get("category")).trim(),
    price: Number(formData.get("price")),
    rating: Number(formData.get("rating")),
    prepMinutes: existingItem?.prepMinutes || 15,
    vegetarian: formData.get("vegetarian") === "on",
    available: existingItem?.available ?? true,
    featured: existingItem?.featured ?? state.menu.length + 1,
    image: String(formData.get("image")),
    description: String(formData.get("description")).trim()
  });

  if (existingItem) {
    state.menu = state.menu.map((current) => current.id === item.id ? item : current);
  } else {
    state.menu.push(item);
  }

  rebuildMenuIndex();
  saveMenu();
  renderCategoryOptions();
  renderMenu();
  renderCart();
  renderAdmin();
  clearAdminMenuForm();
  showToast(`${item.name} was saved.`, "success");
}

function toggleMenuAvailability(itemId) {
  state.menu = state.menu.map((item) => item.id === itemId ? { ...item, available: !item.available } : item);
  rebuildMenuIndex();
  saveMenu();
  renderMenu();
  renderCart();
  renderAdmin();
}

function deleteMenuItem(itemId) {
  const item = state.menuById.get(itemId);
  if (!item) return;

  if (!window.confirm(`Delete ${item.name} from the menu?`)) return;

  state.menu = state.menu.filter((current) => current.id !== itemId);
  state.cart.delete(itemId);
  rebuildMenuIndex();
  saveMenu();
  saveCart();
  renderCategoryOptions();
  renderMenu();
  renderCart();
  renderAdmin();
  showToast(`${item.name} was deleted.`);
}

function restoreMenu() {
  if (!window.confirm("Restore the original menu and discard local menu changes?")) return;
  state.menu = FALLBACK_MENU.map(normalizeMenuItem);
  rebuildMenuIndex();
  saveMenu();
  renderCategoryOptions();
  renderMenu();
  renderCart();
  renderAdmin();
  clearAdminMenuForm();
  showToast("The original menu was restored.", "success");
}

function updateOrderStatus(orderId, status) {
  if (!ORDER_STATUSES.includes(status)) return;
  state.orders = state.orders.map((order) => order.id === orderId ? { ...order, status } : order);
  saveOrders();
  renderOrders();
  renderAdmin();
  showToast(`Order ${orderId} is now ${status}.`, "success");
}

function toggleMobileMenu() {
  const expanded = elements.mobileMenuButton.getAttribute("aria-expanded") === "true";
  elements.mobileMenuButton.setAttribute("aria-expanded", String(!expanded));
  elements.mobileMenuButton.setAttribute("aria-label", expanded ? "Open navigation menu" : "Close navigation menu");
  elements.mobileMenu.classList.toggle("hidden", expanded);
}

function closeMobileMenu() {
  elements.mobileMenuButton.setAttribute("aria-expanded", "false");
  elements.mobileMenuButton.setAttribute("aria-label", "Open navigation menu");
  elements.mobileMenu.classList.add("hidden");
}

function resetFilters() {
  state.filters = {
    search: "",
    category: "all",
    sort: "featured",
    favoritesOnly: false,
    popularOnly: false
  };
  elements.menuSearch.value = "";
  elements.menuCategory.value = "all";
  elements.menuSort.value = "featured";
  renderMenu();
}

function selectCategory(category) {
  state.filters.category = category;
  state.filters.favoritesOnly = false;
  state.filters.popularOnly = false;
  elements.menuCategory.value = category;
  renderMenu();
  document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function toggleFavorite(itemId) {
  if (state.favorites.has(itemId)) {
    state.favorites.delete(itemId);
  } else {
    state.favorites.add(itemId);
  }
  saveFavorites();
  renderMenu();
}

function toggleFavoritesFilter() {
  state.filters.favoritesOnly = !state.filters.favoritesOnly;
  state.filters.popularOnly = false;
  state.filters.category = "all";
  elements.menuCategory.value = "all";
  closeMobileMenu();
  renderMenu();
  document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function togglePopularFilter() {
  state.filters.popularOnly = !state.filters.popularOnly;
  state.filters.favoritesOnly = false;
  state.filters.category = "all";
  elements.menuCategory.value = "all";
  renderMenu();
  document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function focusMenuSearch() {
  document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => elements.menuSearch.focus(), 350);
}

function bindEvents() {
  elements.mobileMenuButton.addEventListener("click", toggleMobileMenu);
  elements.mobileMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMobileMenu();
  });

  elements.cartButton.addEventListener("click", openCart);
  elements.mobileCartButton.addEventListener("click", () => {
    closeMobileMenu();
    openCart();
  });
  elements.openCartFromOrders.addEventListener("click", openCart);
  elements.closeCartButton.addEventListener("click", closeCart);
  elements.cartOverlay.addEventListener("click", closeCart);
  elements.checkoutButton.addEventListener("click", openCheckout);
  elements.clearCartButton.addEventListener("click", () => {
    state.cart.clear();
    saveCart();
    renderCart();
  });

  document.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add-item]");
    if (addButton) addToCart(addButton.dataset.addItem);

    const favoriteButton = event.target.closest("[data-favorite-item]");
    if (favoriteButton) toggleFavorite(favoriteButton.dataset.favoriteItem);

    const categoryButton = event.target.closest("[data-category-filter]");
    if (categoryButton) selectCategory(categoryButton.dataset.categoryFilter);

    const decreaseButton = event.target.closest("[data-cart-decrease]");
    if (decreaseButton) updateCartQuantity(decreaseButton.dataset.cartDecrease, -1);

    const increaseButton = event.target.closest("[data-cart-increase]");
    if (increaseButton) updateCartQuantity(increaseButton.dataset.cartIncrease, 1);

    const removeButton = event.target.closest("[data-cart-remove]");
    if (removeButton) {
      state.cart.delete(removeButton.dataset.cartRemove);
      saveCart();
      renderCart();
    }

    const editButton = event.target.closest("[data-admin-edit]");
    if (editButton) editMenuItem(editButton.dataset.adminEdit);

    const toggleButton = event.target.closest("[data-admin-toggle]");
    if (toggleButton) toggleMenuAvailability(toggleButton.dataset.adminToggle);

    const deleteButton = event.target.closest("[data-admin-delete]");
    if (deleteButton) deleteMenuItem(deleteButton.dataset.adminDelete);

    const closeButton = event.target.closest("[data-close-dialog]");
    if (closeButton) {
      const dialog = document.getElementById(closeButton.dataset.closeDialog);
      dialog?.close();
    }
  });

  document.addEventListener("change", (event) => {
    const statusSelect = event.target.closest("[data-order-status]");
    if (statusSelect) updateOrderStatus(statusSelect.dataset.orderStatus, statusSelect.value);
  });

  elements.menuSearch.addEventListener("input", () => {
    state.filters.search = elements.menuSearch.value;
    renderMenu();
  });
  elements.menuCategory.addEventListener("change", () => {
    state.filters.category = elements.menuCategory.value;
    renderMenu();
  });
  elements.menuSort.addEventListener("change", () => {
    state.filters.sort = elements.menuSort.value;
    renderMenu();
  });
  elements.resetFiltersButton.addEventListener("click", resetFilters);
  elements.quickSearchButton.addEventListener("click", focusMenuSearch);
  elements.popularFilterButton.addEventListener("click", togglePopularFilter);
  elements.favoritesNavButton.addEventListener("click", toggleFavoritesFilter);
  elements.mobileFavoritesButton.addEventListener("click", toggleFavoritesFilter);
  elements.showAllCategoriesButton.addEventListener("click", () => selectCategory("all"));

  elements.profileForm.addEventListener("submit", submitProfile);
  elements.clearProfileButton.addEventListener("click", clearProfile);

  elements.checkoutForm.addEventListener("change", updateCheckoutFields);
  elements.checkoutForm.addEventListener("submit", submitOrder);
  elements.cardNumber.addEventListener("input", formatCardNumber);
  elements.cardExpiry.addEventListener("input", formatCardExpiry);

  elements.adminNavButton.addEventListener("click", openAdminLogin);
  elements.mobileAdminButton.addEventListener("click", openAdminLogin);
  elements.adminLoginForm.addEventListener("submit", submitAdminLogin);
  elements.adminLogoutButton.addEventListener("click", logoutAdmin);
  elements.adminMenuForm.addEventListener("submit", submitAdminMenuItem);
  elements.cancelMenuEditButton.addEventListener("click", clearAdminMenuForm);
  elements.resetMenuButton.addEventListener("click", restoreMenu);

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 768px)").matches) closeMobileMenu();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && elements.cartDrawer.classList.contains("open")) {
      closeCart();
    }
  });

  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEYS.orders) {
      state.orders = readStorage(STORAGE_KEYS.orders, []);
      renderOrders();
      renderAdmin();
    }
    if (event.key === STORAGE_KEYS.menu) {
      const savedMenu = readStorage(STORAGE_KEYS.menu, []);
      if (Array.isArray(savedMenu) && savedMenu.every(isMenuItem)) {
        state.menu = savedMenu.map(normalizeMenuItem);
        rebuildMenuIndex();
        renderCategoryOptions();
        renderMenu();
        renderCart();
        renderAdmin();
      }
    }
    if (event.key === STORAGE_KEYS.favorites) {
      const savedFavorites = readStorage(STORAGE_KEYS.favorites, []);
      state.favorites = new Set(Array.isArray(savedFavorites) ? savedFavorites : []);
      renderMenu();
    }
  });
}

async function initialize() {
  elements.currentYear.textContent = String(new Date().getFullYear());
  loadStoredState();
  bindEvents();
  renderProfile();
  renderOrders();
  await loadMenu();
}

initialize();
