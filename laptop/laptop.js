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

// === FILTER OPTIONS (Laptop-Specific) ===
const filterOptions = {
  brand: ["Dell", "HP", "Apple", "Lenovo", "Asus", "Acer", "MSI", "Microsoft", "Samsung", "Razer"],
  ram: ["8GB", "16GB", "32GB", "64GB"],
  storage: ["256GB SSD", "512GB SSD", "1TB SSD", "2TB SSD", "1TB HDD"],
  screen: ['13"', '14"', '15.6"', '16"', '17.3"'],
  price: ["Under ₹50,000", "₹50,000 - ₹80,000", "₹80,000 - ₹1,20,000", "Above ₹1,20,000"],
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

// === 20 LAPTOPS (रियल 2025 मॉडल्स + Unsplash इमेज) ===
const products = [
  { id: 1, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Apple", name: "MacBook Pro 14\" M4", price: "₹1,69,900", ram: "16GB", storage: "512GB SSD", screen: '14"', rating: 4.9 },
  { id: 2, image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Dell", name: "XPS 13 Plus", price: "₹1,29,990", ram: "16GB", storage: "1TB SSD", screen: '13"', rating: 4.8 },
  { id: 3, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "HP", name: "Spectre x360 14", price: "₹1,19,990", ram: "16GB", storage: "512GB SSD", screen: '14"', rating: 4.7 },
  { id: 4, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Lenovo", name: "ThinkPad X1 Carbon", price: "₹1,39,990", ram: "32GB", storage: "1TB SSD", screen: '14"', rating: 4.8 },
  { id: 5, image: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Asus", name: "ROG Zephyrus G14", price: "₹1,49,990", ram: "32GB", storage: "1TB SSD", screen: '14"', rating: 4.9 },
  { id: 6, image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "MSI", name: "Stealth 16 AI Studio", price: "₹1,89,990", ram: "32GB", storage: "2TB SSD", screen: '16"', rating: 4.8 },
  { id: 7, image: "https://images.unsplash.com/photo-1544244012-3e95b3e5a6b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Acer", name: "Predator Helios 16", price: "₹1,59,990", ram: "32GB", storage: "1TB SSD", screen: '16"', rating: 4.7 },
  { id: 8, image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Microsoft", name: "Surface Laptop 7", price: "₹1,24,990", ram: "16GB", storage: "512GB SSD", screen: '13.5"', rating: 4.8 },
  { id: 9, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Samsung", name: "Galaxy Book4 Ultra", price: "₹1,49,990", ram: "32GB", storage: "1TB SSD", screen: '16"', rating: 4.7 },
  { id: 10, image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Razer", name: "Blade 16", price: "₹2,49,990", ram: "64GB", storage: "2TB SSD", screen: '16"', rating: 4.9 },

  // Budget & Mid-Range
  { id: 11, image: "https://images.unsplash.com/photo-1544731612-82c5bdb2a0b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "HP", name: "Pavilion 15", price: "₹64,990", ram: "16GB", storage: "512GB SSD", screen: '15.6"', rating: 4.5 },
  { id: 12, image: "https://images.unsplash.com/photo-1511385348-a52b4a5f0a8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Dell", name: "Inspiron 14", price: "₹49,990", ram: "8GB", storage: "256GB SSD", screen: '14"', rating: 4.4 },
  { id: 13, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Lenovo", name: "IdeaPad Slim 5", price: "₹72,990", ram: "16GB", storage: "512GB SSD", screen: '15.6"', rating: 4.6 },
  { id: 14, image: "https://images.unsplash.com/photo-1593642632559-0c6d658600b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Asus", name: "VivoBook 15", price: "₹58,990", ram: "8GB", storage: "512GB SSD", screen: '15.6"', rating: 4.5 },
  { id: 15, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Acer", name: "Aspire 5", price: "₹54,990", ram: "16GB", storage: "512GB SSD", screen: '15.6"', rating: 4.4 },
  { id: 16, image: "https://images.unsplash.com/photo-1544244012-3e95b3e5a6b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "MSI", name: "Modern 15", price: "₹68,990", ram: "16GB", storage: "512GB SSD", screen: '15.6"', rating: 4.6 },
  { id: 17, image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Microsoft", name: "Surface Go 3", price: "₹44,990", ram: "8GB", storage: "128GB SSD", screen: '10.5"', rating: 4.3 },
  { id: 18, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Samsung", name: "Galaxy Book Go", price: "₹39,990", ram: "4GB", storage: "128GB eMMC", screen: '14"', rating: 4.2 },
  { id: 19, image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Razer", name: "Blade 14", price: "₹1,79,990", ram: "32GB", storage: "1TB SSD", screen: '14"', rating: 4.8 },
  { id: 20, image: "https://images.unsplash.com/photo-1544731612-82c5bdb2a0b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Apple", name: "MacBook Air M3", price: "₹99,900", ram: "8GB", storage: "256GB SSD", screen: '13"', rating: 4.9 }
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
    card.dataset.screen = product.screen;
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
          <button class="size-btn">${product.screen}</button>
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
  if (price < 50000) return "Under ₹50,000";
  if (price <= 80000) return "₹50,000 - ₹80,000";
  if (price <= 120000) return "₹80,000 - ₹1,20,000";
  return "Above ₹1,20,000";
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
        const minRating = parseFloat(values[0]);
        if (parseFloat(card.dataset.rating) < minRating) show = false;
      } else {
        if (!values.includes(card.dataset[key])) show = false;
      }
    });

    card.style.display = show ? 'flex' : 'none';
  });
}