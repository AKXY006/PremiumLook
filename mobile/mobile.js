// Load Navbar & Footer
function loadHTML(id, url) {
  fetch(url)
    .then(res => res.text())
    .then(data => document.getElementById(id).innerHTML = data)
    .catch(err => console.error("Failed to load " + id, err));
}

document.addEventListener('DOMContentLoaded', () => {
  loadHTML("navbar", "../navbar/navbar.html");
  loadHTML("footer", "../footer/footer.html");

  generateFilters();
  generateProducts();
  setupFilters();
  applyFilters();
});

// === FILTER OPTIONS (Mobile-Specific) ===
const filterOptions = {
  brand: ["Apple", "Samsung", "OnePlus", "Xiaomi", "Realme", "Vivo", "Oppo", "Google", "Motorola", "Nothing"],
  ram: ["4GB", "6GB", "8GB", "12GB", "16GB"],
  storage: ["64GB", "128GB", "256GB", "512GB", "1TB"],
  camera: ["48MP+", "64MP+", "108MP+", "200MP+"],
  price: ["Under ₹15,000", "₹15,000 - ₹30,000", "₹30,000 - ₹50,000", "Above ₹50,000"],
  rating: ["4.5+", "4.0+", "3.5+", "3.0+"]
};

// === GENERATE FILTERS ===
function generateFilters() {
  Object.keys(filterOptions).forEach(key => {
    const container = document.getElementById(`${key}Filter`);
    filterOptions[key].forEach(value => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.dataset.filter = key;
      btn.dataset.value = value;
      btn.textContent = value;
      container.appendChild(btn);
    });
  });
}

// === 20 MOBILES (2025 मॉडल्स + Unsplash इमेज) ===
const products = [
  { id: 1, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Apple", name: "iPhone 16 Pro", price: "₹1,29,900", ram: "8GB", storage: "256GB", camera: "48MP+", rating: 4.9 },
  { id: 2, image: "https://images.unsplash.com/photo-1592750477095-28e9c8e3d1ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Samsung", name: "Galaxy S25 Ultra", price: "₹1,34,999", ram: "12GB", storage: "512GB", camera: "200MP+", rating: 4.8 },
  { id: 3, image: "https://images.unsplash.com/photo-1607936876979-41d4e2e297f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "OnePlus", name: "13 Pro", price: "₹69,999", ram: "16GB", storage: "512GB", camera: "64MP+", rating: 4.7 },
  { id: 4, image: "https://images.unsplash.com/photo-1567581935884-3349723552ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Google", name: "Pixel 9 Pro", price: "₹99,999", ram: "12GB", storage: "256GB", camera: "50MP+", rating: 4.8 },
  { id: 5, image: "https://images.unsplash.com/photo-1601784551072-8750b5b2c3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Xiaomi", name: "14 Pro", price: "₹49,999", ram: "12GB", storage: "256GB", camera: "108MP+", rating: 4.6 },

  { id: 6, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Realme", name: "GT 7 Pro", price: "₹54,999", ram: "16GB", storage: "512GB", camera: "108MP+", rating: 4.7 },
  { id: 7, image: "https://images.unsplash.com/photo-1586953208448-9c5b0e5f9c5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Vivo", name: "X100 Pro", price: "₹89,999", ram: "16GB", storage: "1TB", camera: "200MP+", rating: 4.8 },
  { id: 8, image: "https://images.unsplash.com/photo-1592890288564-7669161f93c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Oppo", name: "Find X8 Ultra", price: "₹79,999", ram: "12GB", storage: "512GB", camera: "108MP+", rating: 4.7 },
  { id: 9, image: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Motorola", name: "Edge 50 Ultra", price: "₹59,999", ram: "12GB", storage: "256GB", camera: "64MP+", rating: 4.6 },
  { id: 10, image: "https://images.unsplash.com/photo-1661961110218-35af7210f803?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Nothing", name: "Phone (3)", price: "₹44,999", ram: "12GB", storage: "256GB", camera: "50MP+", rating: 4.7 },

  // Budget Phones
  { id: 11, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Samsung", name: "Galaxy A55", price: "₹38,999", ram: "8GB", storage: "128GB", camera: "64MP+", rating: 4.5 },
  { id: 12, image: "https://images.unsplash.com/photo-1592750477095-28e9c8e3d1ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Realme", name: "12 Pro", price: "₹24,999", ram: "8GB", storage: "256GB", camera: "108MP+", rating: 4.6 },
  { id: 13, image: "https://images.unsplash.com/photo-1607936876979-41d4e2e297f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Xiaomi", name: "Redmi Note 14 Pro", price: "₹22,999", ram: "8GB", storage: "128GB", camera: "108MP+", rating: 4.5 },
  { id: 14, image: "https://images.unsplash.com/photo-1567581935884-3349723552ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Vivo", name: "Y300 Pro", price: "₹19,999", ram: "6GB", storage: "128GB", camera: "64MP+", rating: 4.4 },
  { id: 15, image: "https://images.unsplash.com/photo-1601784551072-8750b5b2c3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Oppo", name: "A78 5G", price: "₹18,999", ram: "8GB", storage: "128GB", camera: "50MP+", rating: 4.3 },

  { id: 16, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "OnePlus", name: "Nord 4", price: "₹32,999", ram: "8GB", storage: "256GB", camera: "50MP+", rating: 4.6 },
  { id: 17, image: "https://images.unsplash.com/photo-1586953208448-9c5b0e5f9c5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Google", name: "Pixel 8a", price: "₹52,999", ram: "8GB", storage: "128GB", camera: "64MP+", rating: 4.7 },
  { id: 18, image: "https://images.unsplash.com/photo-1592890288564-7669161f93c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Motorola", name: "Moto G85", price: "₹17,999", ram: "8GB", storage: "128GB", camera: "50MP+", rating: 4.4 },
  { id: 19, image: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Nothing", name: "Phone (2a)", price: "₹24,999", ram: "8GB", storage: "256GB", camera: "50MP+", rating: 4.6 },
  { id: 20, image: "https://images.unsplash.com/photo-1661961110218-35af7210f803?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Apple", name: "iPhone 15", price: "₹69,900", ram: "6GB", storage: "128GB", camera: "48MP+", rating: 4.8 }
];

// === GENERATE PRODUCTS ===
function generateProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.brand = product.brand;
    card.dataset.ram = product.ram;
    card.dataset.storage = product.storage;
    card.dataset.camera = product.camera;
    card.dataset.price = getPriceRange(product.price);
    card.dataset.rating = product.rating;

    card.innerHTML = `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
        <div class="rating">
          <span class="star">Star</span>
          <span>${product.rating}</span>
        </div>
      </div>

      <div class="product-info">
        <div class="brand">${product.brand}</div>
        <div class="product-name">${product.name}</div>
        <div class="price">${product.price}</div>
        <button class="buy-btn">Buy Now</button>
      </div>

      <div class="size-selector">
        <div class="size-title">Quick Specs</div>
        <div class="size-options">
          <button class="size-btn">${product.ram}</button>
          <button class="size-btn">${product.storage}</button>
          <button class="size-btn">${product.camera}</button>
        </div>
        <button class="add-to-cart-btn">Add to Cart</button>
      </div>
    `;

    grid.appendChild(card);
  });

  setupSizeButtons();
}

function getPriceRange(priceStr) {
  const price = parseInt(priceStr.replace(/[^\d]/g, ''));
  if (price < 15000) return "Under ₹15,000";
  if (price <= 30000) return "₹15,000 - ₹30,000";
  if (price <= 50000) return "₹30,000 - ₹50,000";
  return "Above ₹50,000";
}

function setupSizeButtons() {
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const parent = this.closest('.size-options');
      parent.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// === FILTER LOGIC ===
const activeFilters = {};

function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      const v = btn.dataset.value;
      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        activeFilters[f] = activeFilters[f].filter(x => x !== v);
        if (activeFilters[f].length === 0) delete activeFilters[f];
      } else {
        btn.classList.add('active');
        if (!activeFilters[f]) activeFilters[f] = [];
        activeFilters[f].push(v);
      }
      applyFilters();
    });
  });

  document.querySelector('.clear-filters-btn').addEventListener('click', () => {
    document.querySelectorAll('.filter-btn.active').forEach(b => b.classList.remove('active'));
    Object.keys(activeFilters).forEach(k => delete activeFilters[k]);
    applyFilters();
  });
}

function applyFilters() {
  document.querySelectorAll('.product-card').forEach(card => {
    let show = true;

    Object.keys(activeFilters).forEach(key => {
      const values = activeFilters[key];
      if (key === 'rating') {
        const minRating = parseFloat(values[0].replace('+', ''));
        if (parseFloat(card.dataset.rating) < minRating) show = false;
      } else {
        if (!values.includes(card.dataset[key])) show = false;
      }
    });

    card.style.display = show ? 'flex' : 'none';
  });
}