const games = [
  {
    id: "behind-master",
    title: "Behind Back of Master Training",
    art: "heist",
    mark: "TENANG / 01",
    label: "BEHIND BACK OF<br>MASTER TRAINING",
    genre: "Crime",
    rating: "96%",
    price: 189000,
    tag: "Pilihan GoodQuest",
    studio: "Ammar Muflih",
    release: "2025",
    description:
      "Seorang pemimpin yang ternyata menghianati bawahannya, hanya demi harta yang tak seberapa. Ikuti jejaknya, temukan rahasia yang ia sembunyikan, dan hadapi konsekuensi dari pilihanmu dalam kisah yang penuh intrik ini.",
    tagline:
      "Nikmati simulasi perampokan yang menegangkan, di mana setiap keputusanmu menentukan nasibmu.",
  },
  {
    id: "apex-legends",
    title: "Apex Legends",
    art: "ember",
    mark: "PENJARINGAN / 02",
    label: "APEX<br>LEGENDS",
    genre: "Shooter",
    rating: "91%",
    price: Free,
    tag: "Top Sellers Steam",
    studio: "Respawn Entertainment",
    release: "2019",
    description:
      "Pilih legenda dengan kemampuan unik, susun tim, dan bertahan dalam pertempuran battle royale tim yang cepat. Taktik, mobilitas, dan koordinasi menjadi kunci untuk menjadi yang terakhir.",
    tagline: "Bentuk tim, gas momentum, bertahan terakhir.",
  },
  {
    id: "counter-strike-2",
    title: "Counter-Strike 2",
    art: "storm",
    mark: "STRATEGI / 03",
    label: "COUNTER-<br>STRIKE 2",
    genre: "Shooter",
    rating: "96%",
    price: Free,
    tag: "Top Sellers Steam",
    studio: "Valve",
    release: "2012",
    description:
      "Game tembak-menembak taktis dengan ronde serangan dan pertahanan yang menuntut ketepatan, kerja sama tim, dan pengambilan keputusan cepat.",
    tagline: "Presisi dan kerja tim menentukan ronde.",
  },
  {
    id: "pubg-battlegrounds",
    title: "PUBG: BATTLEGROUNDS",
    art: "moss",
    mark: "SURVIVAL / 04",
    label: "PUBG:<br>BATTLEGROUNDS",
    genre: "Shooter",
    rating: "89%",
    price: Free,
    tag: "Top Sellers Steam",
    studio: "PUBG Studios",
    release: "2017",
    description:
      "Turun ke medan luas, cari perlengkapan, dan bertahan saat zona pertempuran semakin menyempit. Hanya satu tim atau pemain yang akan keluar sebagai pemenang.",
    tagline: "Bertahanlah sampai tembakan terakhir.",
  },
  {
    id: "red-dead-redemption-2",
    title: "Red Dead Redemption 2",
    art: "ember",
    mark: "BARAT / 05",
    label: "RED DEAD<br>REDEMPTION 2",
    genre: "Adventure",
    rating: "98%",
    price: 219750,
    tag: "Top Sellers Steam",
    studio: "Rockstar Games",
    release: "2018",
    description:
      "Ikuti kisah Arthur Morgan dan geng yang berjuang bertahan di akhir era Koboi. Jelajahi dunia terbuka, lakukan misi, berburu, dan hadapi konsekuensi dari pilihanmu.",
    tagline: "Hidup di perbatasan punya harga.",
  },
  {
    id: "grand-theft-auto-v",
    title: "Grand Theft Auto V Enhanced",
    art: "velvet",
    mark: "KOTA / 06",
    label: "GRAND THEFT AUTO V<br>ENHANCED",
    genre: "Action",
    rating: "96%",
    price: 289960,
    tag: "Top Sellers Steam",
    studio: "Rockstar Games",
    release: "2025",
    description:
      "Jelajahi Los Santos bersama tiga protagonis dalam kisah perampokan, ambisi, dan ketidakpastian. Versi Enhanced menghadirkan GTA V dan GTA Online dengan peningkatan visual dan performa.",
    tagline: "Setiap jalan membuka peluang baru.",
  },
  {
    id: "deadzone-diner",
    title: "Deadzone Pusdiklat",
    art: "neon",
    mark: "MALAM / 07",
    label: "DEADZONE<br>PUSDIKLAT",
    genre: "Strategy",
    rating: "87%",
    price: 129900,
    tag: "Permata tersembunyi",
    studio: "Night Shift Games",
    release: "2025",
    description:
      "Satu satunya permainan yang horor, diambil dari kisah nyata dari seorang mahasiswa dari unismuh. Jaga anomali tetap kenyang, kenali kisah para anomali, dan atur kekacauan secukupnya agar semua orang pulang sebelum fajar.",
    tagline: "Buka sepanjang malam. Mungkin sepanjang tahun.",
  },
  {
    id: "baldurs-gate-3",
    title: "Baldur's Gate 3",
    art: "glass",
    mark: "FANTASI / 08",
    label: "BALDUR'S<br>GATE 3",
    genre: "RPG",
    rating: "97%",
    price: 489990,
    tag: "Top Sellers Steam",
    studio: "Larian Studios",
    release: "2023",
    description:
      "Bangun kelompok, pilih jalur cerita, dan hadapi ancaman misterius di dunia Forgotten Realms. Setiap keputusan membentuk karakter, hubungan, dan akhir petualanganmu.",
    tagline: "Pilihanmu menentukan takdir kelompok.",
  },
];

const storageKeys = {
  cart: "goodquest-cart-v1",
  library: "goodquest-library-v1",
};
const demoLibrary = ["apex-legends", "deadzone-diner"];
const genres = [
  "All games",
  "Action",
  "Adventure",
  "Crime",
  "RPG",
  "Shooter",
  "Strategy",
];
const genreLabels = {
  "All games": "Semua game",
  Action: "Aksi",
  Adventure: "Petualangan",
  Crime: "Kriminal",
  RPG: "RPG",
  Shooter: "Tembak-tembakan",
  Strategy: "Strategi",
};
const state = {
  view: "store",
  genre: "All games",
  query: "",
  sort: "featured",
  cart: readSavedList(storageKeys.cart, []),
  library: readSavedList(storageKeys.library, demoLibrary),
  selectedGameId: null,
  receipt: null,
};

const gameGrid = document.querySelector("#game-grid");
const cartCount = document.querySelector("#cart-count");
const modal = document.querySelector("#game-modal");
const dialog = document.querySelector(".game-dialog");
const toast = document.querySelector("#toast");
let toastTimer;

function readSavedList(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    if (saved === null) return [...fallback];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed))
      throw new TypeError("Saved value is not a list");
    return [
      ...new Set(parsed.filter((id) => games.some((game) => game.id === id))),
    ];
  } catch (error) {
    console.warn(`Could not read ${key}; using demo defaults.`, error);
    return [...fallback];
  }
}

function saveList(key, list) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch (error) {
    console.warn(`Could not save ${key}.`, error);
    showToast(
      "Perubahan ini tidak dapat disimpan di browser dan mungkin hilang saat halaman ditutup.",
    );
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );
}

function getGame(id) {
  return games.find((game) => game.id === id);
}

function artMarkup(game, large = false) {
  return `<div class="game-art art-${game.art}${large ? " art-large" : ""}" aria-label="Ilustrasi game ${escapeHtml(game.title)}">
    <span class="art-mark">${escapeHtml(game.mark)}</span>
    <span class="art-title">${game.label}<small>${escapeHtml(game.studio.toUpperCase())}</small></span>
  </div>`;
}

function renderFilters() {
  document.querySelector("#genre-filters").innerHTML = genres
    .map(
      (genre) => `
    <button class="filter-chip${state.genre === genre ? " is-active" : ""}" type="button"
      data-genre="${escapeHtml(genre)}" aria-pressed="${state.genre === genre}">${escapeHtml(genreLabels[genre])}</button>
  `,
    )
    .join("");
}

function filteredGames() {
  const search = state.query.trim().toLowerCase();
  const result = games.filter((game) => {
    const matchesGenre =
      state.genre === "All games" || game.genre === state.genre;
    const searchableText =
      `${game.title} ${game.genre} ${genreLabels[game.genre]} ${game.studio} ${game.description}`.toLowerCase();
    return matchesGenre && (!search || searchableText.includes(search));
  });
  if (state.sort === "rating")
    result.sort(
      (a, b) => Number.parseInt(b.rating, 10) - Number.parseInt(a.rating, 10),
    );
  if (state.sort === "price-low") result.sort((a, b) => a.price - b.price);
  if (state.sort === "price-high") result.sort((a, b) => b.price - a.price);
  return result;
}

function renderGames() {
  const visibleGames = filteredGames();
  gameGrid.innerHTML = visibleGames
    .map((game) => {
      const inCart = state.cart.includes(game.id);
      const owned = state.library.includes(game.id);
      return `<article class="game-card" data-game-card="${game.id}" tabindex="0" aria-label="Lihat detail ${escapeHtml(game.title)}">
      ${artMarkup(game)}
      <div class="game-card-body">
        <div class="game-card-title-row"><h3>${escapeHtml(game.title)}</h3><span class="game-rating">★ ${game.rating}</span></div>
        <div class="game-meta"><span class="game-genre">${escapeHtml(genreLabels[game.genre])} · ${escapeHtml(game.studio)}</span><span class="game-price">${formatPrice(game.price)}</span></div>
        <div class="game-card-footer">
          <span class="game-tag">${owned ? "Sudah di pustaka" : escapeHtml(game.tag)}</span>
          ${
            owned
              ? `<button class="quick-add is-added" type="button" aria-label="${escapeHtml(game.title)} sudah ada di pustaka" disabled>✓</button>`
              : `<button class="quick-add${inCart ? " is-added" : ""}" type="button" data-add="${game.id}" aria-label="${inCart ? "Hapus" : "Tambahkan"} ${escapeHtml(game.title)} ${inCart ? "dari" : "ke"} keranjang">${inCart ? "✓" : "+"}</button>`
          }
        </div>
      </div>
    </article>`;
    })
    .join("");
  document.querySelector("#results-count").textContent =
    `${visibleGames.length} game untuk dijelajahi`;
  document
    .querySelector("#store-empty")
    .classList.toggle("hidden", visibleGames.length > 0);
  gameGrid.classList.toggle("hidden", visibleGames.length === 0);
  renderFilters();
}

function renderLibrary() {
  const ownedGames = state.library.map(getGame).filter(Boolean);
  document.querySelector("#library-summary").innerHTML =
    `<span><strong>${ownedGames.length}</strong> game di koleksimu</span><span>·</span><span>Siap dimainkan kapan saja</span>`;
  document.querySelector("#library-grid").innerHTML = ownedGames
    .map(
      (game) => `
    <article class="library-card">
      ${artMarkup(game)}
      <div class="library-card-copy">
        <h3>${escapeHtml(game.title)}</h3>
        <p>${escapeHtml(genreLabels[game.genre])} · ${escapeHtml(game.studio)}</p>
        <button class="button button-secondary" type="button" data-launch="${game.id}">Lihat di koleksi <span aria-hidden="true">↗</span></button>
      </div>
    </article>
  `,
    )
    .join("");
  document
    .querySelector("#library-empty")
    .classList.toggle("hidden", ownedGames.length > 0);
  document
    .querySelector("#library-grid")
    .classList.toggle("hidden", ownedGames.length === 0);
}

function renderCart() {
  const items = state.cart.map(getGame).filter(Boolean);
  const content = document.querySelector("#cart-content");
  if (state.receipt) {
    content.innerHTML = `<div class="receipt">
      <span class="receipt-mark" aria-hidden="true">✓</span>
      <h2>Pesanan demo berhasil!</h2>
      <p>${state.receipt.count} game telah ditambahkan ke pustakamu. Ini hanya simulasi checkout—tidak ada pembayaran atau unduhan game.</p>
      <button class="button button-primary" type="button" data-view="library">Buka pustaka <span aria-hidden="true">→</span></button>
    </div>`;
    return;
  }
  if (items.length === 0) {
    content.innerHTML = `<div class="cart-empty">
      <h2>Keranjangmu masih kosong.</h2>
      <p>Ada banyak game seru yang bisa kamu jelajahi.</p>
      <button class="button button-primary" type="button" data-view="store">Cari game <span aria-hidden="true">→</span></button>
    </div>`;
    return;
  }
  const total = items.reduce((sum, game) => sum + game.price, 0);
  content.innerHTML = `<div class="cart-items">${items
    .map(
      (game) => `
    <article class="cart-item">
      ${artMarkup(game)}
      <div class="cart-item-copy"><h3>${escapeHtml(game.title)}</h3><p>${escapeHtml(genreLabels[game.genre])} · ${escapeHtml(game.studio)}</p></div>
      <div class="cart-item-price"><strong>${formatPrice(game.price)}</strong><button class="remove-item" type="button" data-remove="${game.id}">Hapus</button></div>
    </article>
  `,
    )
    .join("")}</div>
  <aside class="cart-summary">
    <h2>Ringkasan pesanan</h2>
    <div class="summary-row"><span>Game (${items.length})</span><span>${formatPrice(total)}</span></div>
    <div class="summary-row"><span>Pajak</span><span>Termasuk</span></div>
    <div class="summary-row total"><span>Total</span><span>${formatPrice(total)}</span></div>
    <button class="button button-primary" type="button" data-checkout>Selesaikan pembayaran demo <span aria-hidden="true">→</span></button>
    <p class="cart-note">Ini hanya demo. Data pembayaran tidak dikumpulkan dan tidak ada pembelian sungguhan.</p>
  </aside>`;
}

function updateCartCount() {
  cartCount.textContent = String(state.cart.length);
  cartCount.setAttribute(
    "aria-label",
    `${state.cart.length} game di keranjang`,
  );
}

function render() {
  renderGames();
  renderLibrary();
  renderCart();
  updateCartCount();
}

function switchView(view) {
  if (!["store", "library", "cart"].includes(view)) return;
  state.view = view;
  document.querySelectorAll(".view-panel").forEach((panel) => {
    const visible = panel.id === `${view}-view`;
    panel.hidden = !visible;
    panel.classList.toggle("is-visible", visible);
  });
  document.querySelectorAll(".nav-link").forEach((link) => {
    const active = link.dataset.view === view;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document
    .querySelector("#search-input")
    .closest(".search-box")
    .classList.toggle("hidden", view !== "store");
  if (view === "cart") state.receipt = null;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleCart(id) {
  if (state.library.includes(id)) {
    showToast("Game ini sudah ada di pustakamu.");
    return;
  }
  if (state.cart.includes(id)) {
    state.cart = state.cart.filter((cartId) => cartId !== id);
    showToast(`${getGame(id).title} dihapus dari keranjang.`);
  } else {
    state.cart = [...state.cart, id];
    showToast(`${getGame(id).title} ditambahkan ke keranjang.`);
  }
  saveList(storageKeys.cart, state.cart);
  render();
}

function openDetails(id) {
  const game = getGame(id);
  if (!game) return;
  state.selectedGameId = id;
  const art = document.querySelector("#detail-art");
  art.innerHTML = artMarkup(game, true);
  const owned = state.library.includes(id);
  const inCart = state.cart.includes(id);
  document.querySelector("#detail-copy").innerHTML = `
    <p class="detail-kicker">${escapeHtml(genreLabels[game.genre])} · ${escapeHtml(game.tag)}</p>
    <h2 id="detail-title">${escapeHtml(game.title)}</h2>
    <p class="detail-description">${escapeHtml(game.description)}</p>
    <div class="detail-facts">
      <span><strong>Penilaian pemain</strong>★ ${game.rating}</span>
      <span><strong>Dibuat oleh</strong>${escapeHtml(game.studio)}</span>
      <span><strong>Dirilis</strong>${escapeHtml(game.release)}</span>
      <span><strong>Cocok untuk</strong>${escapeHtml(game.tagline)}</span>
    </div>
    <div class="detail-footer"><span class="detail-price">${formatPrice(game.price)}</span>
      ${
        owned
          ? `<button class="button button-secondary" type="button" disabled>Sudah ada di pustaka</button>`
          : `<button class="button button-primary" type="button" data-add="${game.id}">${inCart ? "Hapus dari keranjang" : "Tambahkan ke keranjang"} <span aria-hidden="true">${inCart ? "✓" : "→"}</span></button>`
      }
    </div>`;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  dialog.focus();
}

function closeDetails() {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
  state.selectedGameId = null;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(
    () => toast.classList.remove("is-visible"),
    2800,
  );
}

function checkout() {
  const items = state.cart.map(getGame).filter(Boolean);
  if (!items.length) return;
  state.library = [
    ...new Set([...state.library, ...items.map((game) => game.id)]),
  ];
  state.cart = [];
  state.receipt = { count: items.length };
  saveList(storageKeys.library, state.library);
  saveList(storageKeys.cart, state.cart);
  render();
}

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;

  const addButton = target.closest("[data-add]");
  if (addButton) {
    event.stopPropagation();
    toggleCart(addButton.dataset.add);
    if (!modal.classList.contains("hidden") && state.selectedGameId)
      openDetails(state.selectedGameId);
    return;
  }
  const genreButton = target.closest("[data-genre]");
  if (genreButton) {
    state.genre = genreButton.dataset.genre;
    renderGames();
    return;
  }
  const removeButton = target.closest("[data-remove]");
  if (removeButton) {
    toggleCart(removeButton.dataset.remove);
    return;
  }
  const viewButton = target.closest("[data-view]");
  if (viewButton) {
    switchView(viewButton.dataset.view);
    return;
  }
  const viewLink = target.closest("[data-view-link]");
  if (viewLink) {
    event.preventDefault();
    switchView(viewLink.dataset.viewLink);
    return;
  }
  const card = target.closest("[data-game-card]");
  if (card) {
    openDetails(card.dataset.gameCard);
    return;
  }
  const featured = target.closest("[data-featured-game]");
  if (featured) {
    openDetails(featured.dataset.featuredGame);
    return;
  }
  if (target.closest("[data-close-modal]") || target === modal) {
    closeDetails();
    return;
  }
  if (target.closest("[data-checkout]")) {
    checkout();
    return;
  }
  if (target.closest("[data-reset-filters]")) {
    state.genre = "All games";
    state.query = "";
    document.querySelector("#search-input").value = "";
    renderGames();
    return;
  }
  if (target.closest("[data-scroll-catalog]")) {
    document.querySelector("#catalog").scrollIntoView({ behavior: "smooth" });
    return;
  }
  if (target.closest("[data-launch]")) {
    showToast("Game belum bisa dijalankan melalui demo toko ini.");
    return;
  }
  if (target.closest("[data-newsletter]")) {
    showToast("Terima kasih! Pendaftaran buletin ini hanya simulasi.");
  }
});

document.addEventListener("keydown", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (event.key === "Escape" && !modal.classList.contains("hidden"))
    closeDetails();
  if (
    event.key === "/" &&
    modal.classList.contains("hidden") &&
    target?.tagName !== "INPUT" &&
    !target?.isContentEditable
  ) {
    event.preventDefault();
    document.querySelector("#search-input").focus();
  }
  if (
    (event.key === "Enter" || event.key === " ") &&
    target?.matches("[data-game-card]")
  ) {
    event.preventDefault();
    openDetails(target.dataset.gameCard);
  }
});

document.querySelector("#search-input").addEventListener("input", (event) => {
  state.query = event.target.value;
  renderGames();
});

document.querySelector("#sort-select").addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderGames();
});

render();
