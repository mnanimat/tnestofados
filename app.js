const WHATSAPP_NUMBER = "5575982331515";

const products = [
  {
    id: "sofa-milano",
    name: "Sofá Milano 3 Lugares",
    shortName: "Sofá Milano",
    category: "sofas",
    categoryLabel: "Sofás",
    dimensions: "2,30 x 0,95 m",
    image: "assets/products/sofa-milano.webp",
    description: "Braços retos, assento macio e visual contemporâneo.",
    features: ["Tecidos variados", "Espuma de alta densidade", "Produção sob medida"]
  },
  {
    id: "sofa-modular-prime",
    name: "Sofá Modular Prime",
    category: "sofas",
    categoryLabel: "Sofás",
    dimensions: "3,00 x 2,10 m",
    image: "assets/products/sofa-modular-prime.webp",
    description: "Composição em L, módulos independentes e grande versatilidade.",
    features: ["Tecidos variados", "Espuma de alta densidade", "Produção sob medida"]
  },
  {
    id: "poltrona-aurora",
    name: "Poltrona Aurora",
    category: "poltronas-cadeiras",
    categoryLabel: "Poltronas e cadeiras",
    dimensions: "0,82 x 0,78 m",
    image: "assets/products/poltrona-aurora.webp",
    description: "Encosto curvo, assento aconchegante e base metálica leve.",
    features: ["Tecidos variados", "Costura reforçada", "Produção sob medida"]
  },
  {
    id: "cadeira-elegance",
    name: "Cadeira Elegance",
    category: "poltronas-cadeiras",
    categoryLabel: "Poltronas e cadeiras",
    dimensions: "0,52 x 0,58 m",
    image: "assets/products/cadeira-elegance.webp",
    description: "Ideal para salas, recepções e ambientes sofisticados.",
    features: ["Tecidos variados", "Costura reforçada", "Produção sob medida"]
  },
  {
    id: "chaise-viena",
    name: "Chaise Viena",
    category: "chaise-puff",
    categoryLabel: "Chaise e puff",
    dimensions: "1,75 x 0,70 m",
    image: "assets/products/chaise-viena.webp",
    description: "Linhas suaves e apoio confortável para momentos de relaxamento.",
    features: ["Tecidos variados", "Espuma de alta densidade", "Produção sob medida"]
  },
  {
    id: "puff-nobre",
    name: "Puff Nobre",
    category: "chaise-puff",
    categoryLabel: "Chaise e puff",
    dimensions: "Ø 0,60 x 0,45 m",
    image: "assets/products/puff-nobre.webp",
    description: "Peça curinga para apoio, decoração e composição do ambiente.",
    features: ["Tecidos variados", "Espuma de alta densidade", "Produção sob medida"]
  },
  {
    id: "cabeceira-royale",
    name: "Cabeceira Royale",
    category: "cabeceiras",
    categoryLabel: "Cabeceiras",
    dimensions: "1,60 x 1,30 m",
    image: "assets/products/cabeceira-royale.webp",
    description: "Capitonê profundo, volume marcante e acabamento luxuoso.",
    features: ["Tecidos variados", "Botões revestidos", "Produção sob medida"]
  },
  {
    id: "cabeceira-palace",
    name: "Cabeceira Palace",
    category: "cabeceiras",
    categoryLabel: "Cabeceiras",
    dimensions: "1,93 x 1,40 m",
    image: "assets/products/cabeceira-palace.webp",
    description: "Modelo amplo para cama queen, com presença imponente e refinada.",
    features: ["Tecidos variados", "Botões revestidos", "Produção sob medida"]
  },
  {
    id: "banco-classic-diamond",
    name: "Banco Classic Diamond",
    category: "moto",
    categoryLabel: "Banco de moto",
    dimensions: "0,72 x 0,28 m",
    image: "assets/products/banco-classic-diamond.webp",
    description: "Estilo retrô com costura em losango e acabamento artesanal.",
    features: ["Revestimento premium", "Costura personalizada", "Produção sob medida"]
  },
  {
    id: "banco-sport-tn",
    name: "Banco Sport TN",
    category: "moto",
    categoryLabel: "Banco de moto",
    dimensions: "0,68 x 0,24 m",
    image: "assets/products/banco-sport-tn.webp",
    description: "Visual esportivo, perfil anatômico e excelente conforto.",
    features: ["Revestimento premium", "Costura personalizada", "Produção sob medida"]
  },
  {
    id: "recamier-belle",
    name: "Recamier Belle",
    category: "sob-medida",
    categoryLabel: "Sob medida",
    dimensions: "Medidas personalizadas",
    image: "assets/products/recamier-belle.webp",
    description: "Peça versátil que valoriza quartos, closets e salas com sofisticação.",
    features: ["Medidas personalizadas", "Diversos acabamentos", "Produção sob medida"]
  },
  {
    id: "painel-estofado",
    name: "Painel Estofado Decorativo",
    category: "sob-medida",
    categoryLabel: "Sob medida",
    dimensions: "Medidas personalizadas",
    image: "assets/products/painel-estofado.webp",
    description: "Acabamento premium para cabeceiras, salas de TV e ambientes comerciais.",
    features: ["Medidas personalizadas", "Diversos acabamentos", "Produção sob medida"]
  },
  {
    id: "banco-estofado",
    name: "Banco Estofado Sob Medida",
    category: "sob-medida",
    categoryLabel: "Sob medida",
    dimensions: "Medidas personalizadas",
    image: "assets/products/banco-estofado.webp",
    description: "Funcionalidade e estilo para salas de jantar, halls e áreas gourmet.",
    features: ["Medidas personalizadas", "Diversos acabamentos", "Produção sob medida"]
  }
];

const state = {
  filter: "todos",
  search: "",
  selectedColor: "Bege areia",
  cart: JSON.parse(localStorage.getItem("tn-estofados-cart") || "[]")
};

const builderCatalog = {
  "sofa-milano": { width: "2,30 m", depth: "0,95 m", height: "0,88 m", labels: ["Largura", "Profundidade", "Altura"], service: "Fabricação sob medida" },
  "sofa-modular-prime": { width: "3,00 m", depth: "2,10 m", height: "0,90 m", labels: ["Largura", "Profundidade", "Altura"], service: "Fabricação sob medida" },
  "poltrona-aurora": { width: "0,82 m", depth: "0,78 m", height: "0,86 m", labels: ["Largura", "Profundidade", "Altura"], service: "Fabricação sob medida" },
  "cadeira-elegance": { width: "0,52 m", depth: "0,58 m", height: "0,92 m", labels: ["Largura", "Profundidade", "Altura"], service: "Fabricação sob medida" },
  "chaise-viena": { width: "1,75 m", depth: "0,70 m", height: "0,78 m", labels: ["Comprimento", "Profundidade", "Altura"], service: "Fabricação sob medida" },
  "puff-nobre": { width: "0,60 m", depth: "0,60 m", height: "0,45 m", labels: ["Diâmetro", "Profundidade", "Altura"], service: "Fabricação sob medida" },
  "cabeceira-royale": { width: "1,60 m", depth: "0,10 m", height: "1,30 m", labels: ["Largura", "Espessura", "Altura"], service: "Fabricação sob medida" },
  "cabeceira-palace": { width: "1,93 m", depth: "0,10 m", height: "1,40 m", labels: ["Largura", "Espessura", "Altura"], service: "Fabricação sob medida" },
  "banco-classic-diamond": { width: "0,72 m", depth: "0,28 m", height: "0,16 m", labels: ["Comprimento", "Largura", "Altura"], service: "Banco de moto" },
  "banco-sport-tn": { width: "0,68 m", depth: "0,24 m", height: "0,14 m", labels: ["Comprimento", "Largura", "Altura"], service: "Banco de moto" },
  "recamier-belle": { width: "1,60 m", depth: "0,72 m", height: "0,78 m", labels: ["Comprimento", "Profundidade", "Altura"], service: "Fabricação sob medida" },
  "painel-estofado": { width: "2,60 m", depth: "0,08 m", height: "1,30 m", labels: ["Largura", "Espessura", "Altura"], service: "Fabricação sob medida" },
  "banco-estofado": { width: "1,80 m", depth: "0,58 m", height: "0,96 m", labels: ["Largura", "Profundidade", "Altura"], service: "Fabricação sob medida" }
};

const builderOptions = {
  fabric: [
    { value: "Linho premium", description: "Toque natural e elegante", swatch: "#d9ceb8" },
    { value: "Bouclé off-white", description: "Textura macia e sofisticada", swatch: "#eee5d8" },
    { value: "Suede bege", description: "Confortável e muito pedido", swatch: "#b89c7e" },
    { value: "Veludo fendi", description: "Visual marcante e suave", swatch: "#a98974" },
    { value: "Chenille cappuccino", description: "Resistente para uso diário", swatch: "#8b6f58" },
    { value: "Courino café", description: "Fácil limpeza e alta presença", swatch: "#4a352d" }
  ],
  foam: [
    { value: "D23 Confort", description: "Encostos leves", icon: "D23" },
    { value: "D26 Equilíbrio", description: "Uso residencial", icon: "D26" },
    { value: "D28 Soft", description: "Mais procurada para sofás", icon: "D28" },
    { value: "D33 Extra firme", description: "Maior sustentação", icon: "D33" }
  ],
  wood: [
    { value: "Eucalipto tratado", description: "Estrutura reforçada", icon: "🌳" },
    { value: "Madeira maciça", description: "Durabilidade premium", icon: "🪵" },
    { value: "Compensado naval", description: "Ótimo para áreas exigentes", icon: "🧱" },
    { value: "MDF reforçado", description: "Boa solução para painéis", icon: "⬛" }
  ],
  feet: [
    { value: "Pé de madeira", description: "Clássico e elegante", icon: "🦶" },
    { value: "Pé metálico", description: "Visual moderno", icon: "✦" },
    { value: "Base oculta", description: "Design clean", icon: "▭" },
    { value: "Sapatas / deslizadores", description: "Ideal para bancos e painéis", icon: "◫" }
  ],
  pillows: [
    { value: "Com almofadas decorativas", description: "Mais volume e aconchego", icon: "◼" },
    { value: "Com almofadas soltas", description: "Visual confortável", icon: "◻" },
    { value: "Sem almofadas", description: "Design mais limpo", icon: "—" },
    { value: "Almofadas sob medida", description: "Quantidade personalizada", icon: "+" }
  ]
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const fallbackImage = "assets/catalog-cover.webp";

function safeImageMarkup(src, alt, loading = true) {
  const lazy = loading ? ` loading="lazy"` : "";
  return `<img src="${src}" alt="${alt}"${lazy} onerror="this.onerror=null;this.src='${fallbackImage}';" />`;
}

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(message) {
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function productCard(product) {
  return `
    <article class="product-card reveal" data-product-id="${product.id}">
      <div class="product-media">
        <span class="product-badge">${product.categoryLabel}</span>
        ${safeImageMarkup(product.image, product.name)}
      </div>
      <div class="product-body">
        <div class="product-topline">
          <h3>${product.name}</h3>
          <span class="product-measure">${product.dimensions}</span>
        </div>
        <p>${product.description}</p>
        <div class="product-actions">
          <button class="view-product" data-view="${product.id}" type="button">Ver detalhes</button>
          <button class="add-product" data-add="${product.id}" type="button">Adicionar ao orçamento</button>
        </div>
      </div>
    </article>`;
}

function renderProducts() {
  const search = state.search.trim().toLocaleLowerCase("pt-BR");
  const filtered = products.filter(product => {
    const categoryMatch = state.filter === "todos" || product.category === state.filter;
    const searchMatch = !search || [product.name, product.categoryLabel, product.description, product.dimensions].join(" ").toLocaleLowerCase("pt-BR").includes(search);
    return categoryMatch && searchMatch;
  });

  $("#productGrid").innerHTML = filtered.map(productCard).join("");
  $("#emptyState").hidden = filtered.length > 0;

  $$(".view-product").forEach(button => button.addEventListener("click", () => openProductModal(button.dataset.view)));
  $$(".add-product").forEach(button => button.addEventListener("click", () => addToCart(button.dataset.add)));
  initReveal();
  initTilt();
}

function persistCart() {
  localStorage.setItem("tn-estofados-cart", JSON.stringify(state.cart));
  updateCartUI();
}

function addToCart(id) {
  const existing = state.cart.find(item => item.id === id);
  if (existing) existing.qty += 1;
  else state.cart.push({ id, qty: 1 });
  persistCart();
  showToast("Produto adicionado ao orçamento.");
  $("#cartButton").animate([{ transform: "scale(1)" }, { transform: "scale(1.08)" }, { transform: "scale(1)" }], { duration: 350 });
}

function changeQty(id, delta) {
  const item = state.cart.find(item => item.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) state.cart = state.cart.filter(cartItem => cartItem.id !== id);
  persistCart();
}

function removeFromCart(id) {
  state.cart = state.cart.filter(item => item.id !== id);
  persistCart();
}

function updateCartUI() {
  const total = state.cart.reduce((sum, item) => sum + item.qty, 0);
  $("#cartCount").textContent = total;
  $("#cartTotalItems").textContent = total;
  $("#cartEmpty").hidden = state.cart.length > 0;
  $("#cartFooter").hidden = state.cart.length === 0;

  $("#cartItems").innerHTML = state.cart.map(item => {
    const product = products.find(product => product.id === item.id);
    if (!product) return "";
    return `
      <article class="cart-item">
        ${safeImageMarkup(product.image, product.name, false)}
        <div>
          <h3>${product.name}</h3>
          <p>${product.dimensions}</p>
          <div class="qty-control">
            <button type="button" data-qty="-1" data-id="${item.id}" aria-label="Diminuir quantidade">−</button>
            <span>${item.qty}</span>
            <button type="button" data-qty="1" data-id="${item.id}" aria-label="Aumentar quantidade">+</button>
          </div>
        </div>
        <button class="remove-item" type="button" data-remove="${item.id}">Remover</button>
      </article>`;
  }).join("");

  $$('[data-qty]').forEach(button => button.addEventListener("click", () => changeQty(button.dataset.id, Number(button.dataset.qty))));
  $$('[data-remove]').forEach(button => button.addEventListener("click", () => removeFromCart(button.dataset.remove)));
}

function openCart() {
  $("#cartDrawer").classList.add("open");
  $("#cartDrawer").setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
}

function closeCart() {
  $("#cartDrawer").classList.remove("open");
  $("#cartDrawer").setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
}

function openProductModal(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;
  $("#modalContent").innerHTML = `
    <article class="modal-product">
      <div class="modal-product-media">${safeImageMarkup(product.image, product.name, false)}</div>
      <div class="modal-product-copy">
        <div class="eyebrow"><span></span>${product.categoryLabel}</div>
        <h2 id="modalTitle">${product.name}</h2>
        <div class="modal-measure">Medida de referência: ${product.dimensions}</div>
        <p>${product.description}</p>
        <ul class="feature-list">${product.features.map(feature => `<li>${feature}</li>`).join("")}</ul>
        <p><strong>Valor sob consulta.</strong> Medidas, tecidos, espuma e acabamentos podem ser personalizados.</p>
        <div class="modal-actions">
          <button class="btn btn-primary" id="modalAddProduct" type="button">Adicionar ao orçamento <span>↗</span></button>
          <button class="btn btn-ghost" id="modalWhatsapp" type="button">WhatsApp</button>
        </div>
      </div>
    </article>`;
  $("#productModal").classList.add("open");
  $("#productModal").setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
  $("#modalAddProduct").addEventListener("click", () => { addToCart(id); closeModal(); openCart(); });
  $("#modalWhatsapp").addEventListener("click", () => openWhatsApp(`Olá, TN Estofados! Gostaria de saber mais sobre o modelo ${product.name} (${product.dimensions}).`));
}

function closeModal() {
  $("#productModal").classList.remove("open");
  $("#productModal").setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
}

function checkoutCart() {
  if (!state.cart.length) return;
  const lines = state.cart.map(item => {
    const product = products.find(product => product.id === item.id);
    return `• ${item.qty}x ${product.name} — ${product.dimensions}`;
  }).join("\n");
  const message = `Olá, TN Estofados! Montei esta seleção no site e gostaria de um orçamento:\n\n${lines}\n\nReferência de cor: ${state.selectedColor}.\nPodemos conversar sobre medidas, tecidos, prazo e entrega?`;
  openWhatsApp(message);
}

function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  $$(".reveal:not(.visible)").forEach(element => observer.observe(element));
}

function initTilt() {
  if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  $$(".product-card").forEach(card => {
    card.addEventListener("mousemove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.transform = `translateY(-8px) rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;
    });
    card.addEventListener("mouseleave", () => card.style.transform = "");
  });
}

function initCounters() {
  const counters = $$(".counter");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.target);
      const isYear = target > 1000;
      const duration = 1200;
      const start = performance.now();
      const animate = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.floor((isYear ? 1900 : 0) + (target - (isYear ? 1900 : 0)) * eased) + (isYear ? "" : "+");
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      observer.unobserve(element);
    });
  }, { threshold: .5 });
  counters.forEach(counter => observer.observe(counter));
}

function initHeaderAndScroll() {
  const onScroll = () => {
    const y = window.scrollY;
    $(".site-header").classList.toggle("scrolled", y > 20);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    $("#scrollProgress").style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initHeroParallax() {
  const visual = $("#heroVisual");
  const card = $(".hero-card-main");
  if (!visual || !card || window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  visual.addEventListener("mousemove", event => {
    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    card.style.transform = `rotate(2deg) rotateX(${y * -5}deg) rotateY(${x * 6}deg)`;
  });
  visual.addEventListener("mouseleave", () => card.style.transform = "rotate(2deg)");
}

function initNavigation() {
  const toggle = $("#menuToggle");
  const nav = $("#mainNav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("a", nav).forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

function initFilters() {
  $$(".filter").forEach(button => button.addEventListener("click", () => {
    $$(".filter").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    state.filter = button.dataset.filter;
    renderProducts();
  }));
  $("#productSearch").addEventListener("input", event => {
    state.search = event.target.value;
    renderProducts();
  });
}

function initSwatches() {
  $$(".swatch").forEach(button => button.addEventListener("click", () => {
    $$(".swatch").forEach(item => { item.classList.remove("active"); item.setAttribute("aria-checked", "false"); });
    button.classList.add("active");
    button.setAttribute("aria-checked", "true");
    state.selectedColor = button.dataset.color;
    $("#selectedColor").textContent = state.selectedColor;
    const color = button.style.getPropertyValue("--swatch");
    $(".sample-a").style.backgroundColor = color;
  }));
  $("#fabricQuoteButton").addEventListener("click", () => openWhatsApp(`Olá, TN Estofados! Gostaria de um orçamento usando a referência de cor ${state.selectedColor}.`));
}

function setFormStatus(selector, message = "", type = "") {
  const element = $(selector);
  if (!element) return;
  element.textContent = message;
  element.classList.remove("success", "error");
  if (type) element.classList.add(type);
}

function hexToRgba(hex, alpha = 1) {
  const normalized = hex.replace("#", "");
  const full = normalized.length === 3 ? normalized.split("").map(char => char + char).join("") : normalized;
  const numeric = parseInt(full, 16);
  const r = (numeric >> 16) & 255;
  const g = (numeric >> 8) & 255;
  const b = numeric & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getBuilderMeta(id) {
  return builderCatalog[id] || { width: "A combinar", depth: "A combinar", height: "A combinar", labels: ["Largura", "Profundidade", "Altura"], service: "Fabricação sob medida" };
}

function getBuilderProduct() {
  return products.find(item => item.id === $("#builderModelInput")?.value);
}

function renderChoiceCards(containerId, group) {
  const container = $(containerId);
  if (!container) return;
  const currentValue = $(`#builder${group.charAt(0).toUpperCase() + group.slice(1)}Input`).value;
  container.innerHTML = builderOptions[group].map(option => `
    <button class="choice-card ${option.value === currentValue ? "active" : ""}" type="button" data-group="${group}" data-value="${option.value}">
      ${option.swatch ? `<span class="choice-swatch" style="--swatch:${option.swatch}"></span>` : `<span class="choice-icon">${option.icon || "•"}</span>`}
      <span class="choice-copy"><strong>${option.value}</strong><small>${option.description}</small></span>
    </button>`).join("");
}

function renderBuilderModels() {
  const grid = $("#builderModelGrid");
  if (!grid) return;
  const activeId = $("#builderModelInput").value;
  grid.innerHTML = products.map(product => `
    <button class="builder-model-card ${product.id === activeId ? "active" : ""}" type="button" data-builder-model="${product.id}">
      ${safeImageMarkup(product.image, product.name)}
      <span class="copy"><strong>${product.name}</strong><small>${product.categoryLabel} · ${product.dimensions}</small></span>
    </button>`).join("");
  $$('[data-builder-model]').forEach(button => button.addEventListener("click", () => syncBuilderModel(button.dataset.builderModel, true)));
}

function updateBuilderSummary() {
  const product = getBuilderProduct();
  $("#builderSummaryModel").textContent = product ? product.name : "Modelo personalizado";
  $("#builderSummaryFabric").textContent = $("#builderFabricInput").value;
  $("#builderSummaryFoam").textContent = $("#builderFoamInput").value;
  $("#builderSummaryStructure").textContent = $("#builderWoodInput").value;
  $("#builderSummaryFeet").textContent = $("#builderFeetInput").value;
  $("#builderSummaryPillows").textContent = $("#builderPillowsInput").value;
  $("#builderFabricChip").textContent = $("#builderFabricInput").value;
  $("#builderModelChip").textContent = product?.shortName || product?.name || "Modelo";
}

function updateBuilderMeasureTags() {
  $("#builderWidthTag").textContent = $("#builderWidthInput").value || "A combinar";
  $("#builderDepthTag").textContent = $("#builderDepthInput").value || "A combinar";
  $("#builderHeightTag").textContent = $("#builderHeightInput").value || "A combinar";
}

function updateBuilderFabricVisual() {
  const option = builderOptions.fabric.find(item => item.value === $("#builderFabricInput").value) || builderOptions.fabric[0];
  if (!option) return;
  $("#builderPreviewStage")?.style.setProperty("--fabric-glow", hexToRgba(option.swatch, 0.36));
  const glow = $("#builderFabricGlow");
  if (glow) glow.style.background = `radial-gradient(circle at center, ${hexToRgba(option.swatch, 0.40)}, transparent 62%)`;
}

function setBuilderChoice(group, value) {
  const input = $(`#builder${group.charAt(0).toUpperCase() + group.slice(1)}Input`);
  input.value = value;
  $$( `.choice-card[data-group="${group}"]` ).forEach(card => card.classList.toggle("active", card.dataset.value === value));
  updateBuilderSummary();
  if (group === "fabric") updateBuilderFabricVisual();
}

function syncBuilderModel(id, resetMeasures = false) {
  const product = products.find(item => item.id === id);
  if (!product) return;
  const meta = getBuilderMeta(id);
  $("#builderModelInput").value = id;
  $("#builderPreviewImage").src = product.image;
  $("#builderPreviewImage").alt = product.name;
  [$("#builderWidthLabel"), $("#builderWidthFieldLabel")].forEach(el => el.textContent = meta.labels[0]);
  [$("#builderDepthLabel"), $("#builderDepthFieldLabel")].forEach(el => el.textContent = meta.labels[1]);
  [$("#builderHeightLabel"), $("#builderHeightFieldLabel")].forEach(el => el.textContent = meta.labels[2]);
  if (resetMeasures) {
    $("#builderWidthInput").value = meta.width;
    $("#builderDepthInput").value = meta.depth;
    $("#builderHeightInput").value = meta.height;
  }
  const serviceField = $('#builderForm select[name="service"]');
  if (serviceField && !serviceField.value) serviceField.value = meta.service;
  renderBuilderModels();
  updateBuilderMeasureTags();
  updateBuilderSummary();
  updateBuilderFabricVisual();
}

function buildQuoteMessage(form) {
  return [
    "Olá, TN Estofados! Gostaria de solicitar um orçamento pelo site.",
    "",
    `Nome: ${form.get("name")}`,
    `WhatsApp: ${form.get("phone") || "Não informado"}`,
    `E-mail: ${form.get("email") || "Não informado"}`,
    `Cidade: ${form.get("city")}`,
    `Serviço: ${form.get("service")}`,
    `Peça: ${form.get("piece")}`,
    `Medidas aproximadas: ${form.get("dimensions") || "A confirmar"}`,
    `Referência de cor: ${state.selectedColor}`,
    `Detalhes: ${form.get("details") || "Sem observações adicionais"}`
  ].join("\n");
}

function buildBuilderMessage(formEl) {
  const form = new FormData(formEl);
  const product = products.find(item => item.id === form.get("model"));
  const extras = [...formEl.querySelectorAll('input[name="extras"]:checked')].map(input => input.value);
  const ambientName = formEl.ambientPhoto?.files?.[0]?.name || "Não enviado";
  const oldName = formEl.oldPhoto?.files?.[0]?.name || "Não enviado";
  return [
    "Olá, TN Estofados! Montei meu estofado no site e gostaria de um orçamento.",
    "",
    `Nome: ${form.get("name")}`,
    `WhatsApp: ${form.get("phone") || "Não informado"}`,
    `E-mail: ${form.get("email") || "Não informado"}`,
    `Cidade: ${form.get("city")}`,
    `Serviço: ${form.get("service")}`,
    `Modelo base: ${product ? product.name : form.get("model")}`,
    `${$("#builderWidthFieldLabel").textContent}: ${form.get("width") || "A combinar"}`,
    `${$("#builderDepthFieldLabel").textContent}: ${form.get("depth") || "A combinar"}`,
    `${$("#builderHeightFieldLabel").textContent}: ${form.get("height") || "A combinar"}`,
    `Tecido: ${form.get("fabric")}`,
    `Espuma: ${form.get("foam")}`,
    `Madeira / estrutura: ${form.get("wood")}`,
    `Pé / base: ${form.get("feet")}`,
    `Almofadas: ${form.get("pillows")}`,
    `Uso: ${form.get("use") || "Não informado"}`,
    `Prazo desejado: ${form.get("deadline") || "A combinar"}`,
    `Quantidade de almofadas extras: ${form.get("extraPillows") || "0"}`,
    `Extras: ${extras.length ? extras.join(", ") : "Nenhum extra selecionado"}`,
    `Foto do ambiente: ${ambientName}`,
    `Foto do estofado atual: ${oldName}`,
    `Observações: ${form.get("details") || "Sem observações adicionais"}`
  ].join("\n");
}

async function fileToAttachment(file) {
  const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;
  if (!file) return null;
  if (file.size > MAX_UPLOAD_BYTES) throw new Error(`O arquivo ${file.name} ultrapassa o limite de 2 MB.`);
  if (!/^image\/(png|jpeg|webp)$/.test(file.type)) throw new Error(`O arquivo ${file.name} precisa estar em PNG, JPG ou WEBP.`);
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`Não foi possível ler o arquivo ${file.name}.`));
    reader.readAsDataURL(file);
  });
  return {
    filename: file.name,
    type: file.type,
    content: String(dataUrl).split(",")[1]
  };
}

function bindUploadPreview(inputSelector, previewSelector, nameSelector) {
  const input = $(inputSelector);
  const preview = $(previewSelector);
  const name = $(nameSelector);
  if (!input || !preview || !name) return;
  input.addEventListener("change", () => {
    const file = input.files?.[0];
    if (!file) {
      name.textContent = "Nenhum arquivo selecionado";
      preview.hidden = true;
      preview.removeAttribute("src");
      return;
    }
    name.textContent = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      preview.src = String(reader.result);
      preview.hidden = false;
    };
    reader.readAsDataURL(file);
  });
}

async function sendLeadToApi(payload) {
  const response = await fetch("/api/request-quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  let data = {};
  try { data = await response.json(); } catch (_) {}
  if (!response.ok) throw new Error(data.message || "Não foi possível enviar o orçamento agora.");
  return data;
}

function quotePayloadFromForm(formEl) {
  const form = new FormData(formEl);
  return {
    source: "form-contato",
    subject: `Novo orçamento rápido - ${form.get("name") || "Site TN Estofados"}`,
    customer: {
      name: form.get("name") || "",
      phone: form.get("phone") || "",
      email: form.get("email") || "",
      city: form.get("city") || ""
    },
    project: {
      service: form.get("service") || "",
      piece: form.get("piece") || "",
      dimensions: form.get("dimensions") || "",
      details: form.get("details") || "",
      colorReference: state.selectedColor
    },
    summaryLines: buildQuoteMessage(form).split("\n"),
    attachments: [],
    privacy: {
      policyVersion: form.get("policyVersion") || "",
      acknowledged: form.get("privacyAcknowledgement") === "acknowledged",
      acknowledgedAt: new Date().toISOString()
    },
    antiSpam: {
      website: form.get("website") || "",
      formStartedAt: Number(form.get("formStartedAt") || 0)
    }
  };
}

async function builderPayloadFromForm(formEl) {
  const form = new FormData(formEl);
  const extras = [...formEl.querySelectorAll('input[name="extras"]:checked')].map(input => input.value);
  const attachmentFiles = [formEl.ambientPhoto?.files?.[0], formEl.oldPhoto?.files?.[0]].filter(Boolean);
  const attachments = [];
  for (const file of attachmentFiles) attachments.push(await fileToAttachment(file));
  return {
    source: "configurador",
    subject: `Novo projeto configurado - ${form.get("name") || "Site TN Estofados"}`,
    customer: {
      name: form.get("name") || "",
      phone: form.get("phone") || "",
      email: form.get("email") || "",
      city: form.get("city") || ""
    },
    project: {
      service: form.get("service") || "",
      model: getBuilderProduct()?.name || form.get("model") || "",
      measures: {
        [$("#builderWidthFieldLabel").textContent]: form.get("width") || "",
        [$("#builderDepthFieldLabel").textContent]: form.get("depth") || "",
        [$("#builderHeightFieldLabel").textContent]: form.get("height") || ""
      },
      fabric: form.get("fabric") || "",
      foam: form.get("foam") || "",
      structure: form.get("wood") || "",
      feet: form.get("feet") || "",
      pillows: form.get("pillows") || "",
      use: form.get("use") || "",
      deadline: form.get("deadline") || "",
      extraPillows: form.get("extraPillows") || "0",
      extras,
      details: form.get("details") || ""
    },
    summaryLines: buildBuilderMessage(formEl).split("\n"),
    attachments,
    privacy: {
      policyVersion: form.get("policyVersion") || "",
      acknowledged: form.get("privacyAcknowledgement") === "acknowledged",
      acknowledgedAt: new Date().toISOString()
    },
    antiSpam: {
      website: form.get("website") || "",
      formStartedAt: Number(form.get("formStartedAt") || 0)
    }
  };
}

function initQuoteForm() {
  const formEl = $("#quoteForm");
  if (!formEl) return;
  const whatsappButton = $("#quoteWhatsAppButton");
  const startedAtInput = $("#quoteFormStartedAt");
  if (startedAtInput) startedAtInput.value = String(Date.now());

  whatsappButton?.addEventListener("click", () => {
    if (!formEl.reportValidity()) return;
    const form = new FormData(formEl);
    openWhatsApp(buildQuoteMessage(form));
  });

  formEl.addEventListener("submit", async event => {
    event.preventDefault();
    const submitButton = formEl.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    setFormStatus("#quoteFormStatus", "Enviando orçamento...");
    try {
      const result = await sendLeadToApi(quotePayloadFromForm(formEl));
      const protocol = result.protocol ? ` Protocolo: ${result.protocol}.` : "";
      setFormStatus("#quoteFormStatus", `Orçamento enviado com sucesso.${protocol} A equipe TN Estofados entrará em contato em breve.`, "success");
      formEl.reset();
      if (startedAtInput) startedAtInput.value = String(Date.now());
    } catch (error) {
      setFormStatus("#quoteFormStatus", error.message || "Não foi possível enviar o formulário.", "error");
    } finally {
      submitButton.disabled = false;
    }
  });
}

function initBuilder() {
  const formEl = $("#builderForm");
  if (!formEl) return;
  const startedAtInput = $("#builderFormStartedAt");
  if (startedAtInput) startedAtInput.value = String(Date.now());

  renderChoiceCards("#fabricOptions", "fabric");
  renderChoiceCards("#foamOptions", "foam");
  renderChoiceCards("#woodOptions", "wood");
  renderChoiceCards("#feetOptions", "feet");
  renderChoiceCards("#pillowsOptions", "pillows");
  renderBuilderModels();
  syncBuilderModel($("#builderModelInput").value, true);

  $$(".choice-card").forEach(card => card.addEventListener("click", () => setBuilderChoice(card.dataset.group, card.dataset.value)));
  ["#builderWidthInput", "#builderDepthInput", "#builderHeightInput"].forEach(selector => {
    $(selector).addEventListener("input", updateBuilderMeasureTags);
  });

  bindUploadPreview("#builderAmbientPhoto", "#ambientPhotoPreview", "#ambientPhotoName");
  bindUploadPreview("#builderOldPhoto", "#oldPhotoPreview", "#oldPhotoName");

  $("#builderAddToCartButton").addEventListener("click", () => {
    addToCart($("#builderModelInput").value);
    openCart();
  });

  $("#builderWhatsAppButton").addEventListener("click", () => {
    if (!formEl.reportValidity()) return;
    openWhatsApp(buildBuilderMessage(formEl));
  });

  formEl.addEventListener("submit", async event => {
    event.preventDefault();
    const submitButton = $("#builderFormSubmitButton");
    submitButton.disabled = true;
    setFormStatus("#builderFormStatus", "Enviando orçamento com as fotos e configurações...");
    try {
      const payload = await builderPayloadFromForm(formEl);
      const result = await sendLeadToApi(payload);
      const protocol = result.protocol ? ` Protocolo: ${result.protocol}.` : "";
      setFormStatus("#builderFormStatus", `Projeto enviado com sucesso.${protocol} A equipe TN Estofados receberá sua configuração completa e retornará o orçamento.`, "success");
      formEl.reset();
      $("#ambientPhotoName").textContent = "Nenhum arquivo selecionado";
      $("#oldPhotoName").textContent = "Nenhum arquivo selecionado";
      ["#ambientPhotoPreview", "#oldPhotoPreview"].forEach(selector => { const image = $(selector); image.hidden = true; image.removeAttribute("src"); });
      $("#builderFabricInput").value = builderOptions.fabric[0].value;
      $("#builderFoamInput").value = builderOptions.foam[2].value;
      $("#builderWoodInput").value = builderOptions.wood[0].value;
      $("#builderFeetInput").value = builderOptions.feet[0].value;
      $("#builderPillowsInput").value = builderOptions.pillows[0].value;
      renderChoiceCards("#fabricOptions", "fabric");
      renderChoiceCards("#foamOptions", "foam");
      renderChoiceCards("#woodOptions", "wood");
      renderChoiceCards("#feetOptions", "feet");
      renderChoiceCards("#pillowsOptions", "pillows");
      $$(".choice-card").forEach(card => card.addEventListener("click", () => setBuilderChoice(card.dataset.group, card.dataset.value)));
      syncBuilderModel("sofa-milano", true);
      if (startedAtInput) startedAtInput.value = String(Date.now());
    } catch (error) {
      setFormStatus("#builderFormStatus", error.message || "Não foi possível enviar o formulário agora.", "error");
    } finally {
      submitButton.disabled = false;
    }
  });
}

function initWhatsAppLinks() {
  $$(".whatsapp-link").forEach(link => {
    link.href = whatsappUrl(link.dataset.message || "Olá, TN Estofados!");
    link.target = "_blank";
    link.rel = "noopener";
  });
}

function initOverlays() {
  $("#cartButton").addEventListener("click", openCart);
  $$('[data-close-cart]').forEach(element => element.addEventListener("click", closeCart));
  $$('[data-close-modal]').forEach(element => element.addEventListener("click", closeModal));
  $("#checkoutButton").addEventListener("click", checkoutCart);
  $("#clearCart").addEventListener("click", () => { state.cart = []; persistCart(); showToast("Seleção removida."); });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") { closeCart(); closeModal(); }
  });
}

function boot() {
  $("#currentYear").textContent = new Date().getFullYear();
  renderProducts();
  updateCartUI();
  initReveal();
  initCounters();
  initHeaderAndScroll();
  initHeroParallax();
  initNavigation();
  initFilters();
  initSwatches();
  initQuoteForm();
  initBuilder();
  initWhatsAppLinks();
  initOverlays();
}

document.addEventListener("DOMContentLoaded", boot);
