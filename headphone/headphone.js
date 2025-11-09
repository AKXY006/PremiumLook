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

// === FILTER OPTIONS (Headphones-Specific) ===
const filterOptions = {
  category: ["Over-Ear", "On-Ear", "True Wireless", "Gaming", "Noise-Cancelling"],
  brand: ["Sony", "Bose", "Sennheiser", "JBL", "Apple", "Samsung", "Anker", "Logitech", "Technics", "Audeze"],
  color: ["Black", "White", "Blue", "Red", "Silver", "Gray", "Gold", "Green", "Purple", "Rose Gold"],
  type: ["Wireless", "Wired", "Bluetooth", "USB-C"],
  discount: ["10%+", "20%+", "30%+", "50%+", "70%+"],
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

// === 20 PRODUCTS (रियल 2025 मॉडल्स + फ्री स्टॉक इमेज) ===
const products = [
  // Over-Ear (5)
  { id: 1, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Sony", name: "WH-1000XM6", price: "₹24,990", category: "Over-Ear", color: "Black", type: "Wireless", discount: 20, rating: 4.8 },
  { id: 2, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Bose", name: "QuietComfort Ultra", price: "₹29,900", category: "Over-Ear", color: "White", type: "Noise-Cancelling", discount: 15, rating: 4.9 },
  { id: 3, image: "https://images.unsplash.com/photo-1613040809425-928f4c1d6b78?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Sennheiser", name: "MOMENTUM 4", price: "₹22,990", category: "Over-Ear", color: "Gray", type: "Wireless", discount: 25, rating: 4.7 },
  { id: 4, image: "https://images.unsplash.com/photo-1606132903980-9e8f3a76c8a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "JBL", name: "Tour One M2", price: "₹18,999", category: "Over-Ear", color: "Blue", type: "Bluetooth", discount: 30, rating: 4.6 },
  { id: 5, image: "https://images.unsplash.com/photo-1558642452-3917642736bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Technics", name: "EAH-A800", price: "₹26,990", category: "Over-Ear", color: "Silver", type: "Noise-Cancelling", discount: 10, rating: 4.8 },

  // True Wireless (5)
  { id: 6, image: "https://images.unsplash.com/photo-1579586140626-315c1e9a4e05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Apple", name: "AirPods Pro 3", price: "₹19,900", category: "True Wireless", color: "White", type: "Wireless", discount: 20, rating: 4.7 },
  { id: 7, image: "https://images.unsplash.com/photo-1615782417240-725f71cc2f0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Sony", name: "WF-1000XM5", price: "₹21,990", category: "True Wireless", color: "Black", type: "Noise-Cancelling", discount: 25, rating: 4.8 },
  { id: 8, image: "https://images.unsplash.com/photo-1603180549514-27d4c3e8d8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Samsung", name: "Galaxy Buds3 Pro", price: "₹15,999", category: "True Wireless", color: "White", type: "Bluetooth", discount: 30, rating: 4.6 },
  { id: 9, image: "https://images.unsplash.com/photo-1616510896526-3f9f6a83b3e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Anker", name: "Soundcore Liberty 4", price: "₹9,999", category: "True Wireless", color: "Blue", type: "Wireless", discount: 40, rating: 4.5 },
  { id: 10, image: "https://images.unsplash.com/photo-1593684816324-5a5e8b6a0e5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Nothing", name: "Ear (2)", price: "₹8,999", category: "True Wireless", color: "White", type: "Bluetooth", discount: 20, rating: 4.7 },

  // Gaming & Others (10)
  { id: 11, image: "https://images.unsplash.com/photo-1544197807-bb5034301abc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Logitech", name: "G PRO X 2", price: "₹12,990", category: "Gaming", color: "Black", type: "Wireless", discount: 15, rating: 4.8 },
  { id: 12, image: "https://images.unsplash.com/photo-1606132903980-9e8f3a76c8a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "SteelSeries", name: "Arctis Nova 7", price: "₹14,999", category: "Gaming", color: "Black", type: "Wireless", discount: 25, rating: 4.7 },
  { id: 13, image: "https://images.unsplash.com/photo-1558642452-3917642736bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Audeze", name: "Maxwell", price: "₹45,000", category: "Over-Ear", color: "Gray", type: "Wired", discount: 10, rating: 4.9 },
  { id: 14, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Bose", name: "QuietComfort Earbuds 2", price: "₹18,900", category: "Noise-Cancelling", color: "Black", type: "Wireless", discount: 20, rating: 4.8 },
  { id: 15, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Sennheiser", name: "HD 800 S", price: "₹1,20,000", category: "Over-Ear", color: "Silver", type: "Wired", discount: 5, rating: 4.9 },
  { id: 16, image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "JBL", name: "Live 660NC", price: "₹11,999", category: "Noise-Cancelling", color: "Red", type: "Wireless", discount: 30, rating: 4.6 },
  { id: 17, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Anker", name: "Soundcore Space Q45", price: "₹9,999", category: "Over-Ear", color: "Black", type: "Noise-Cancelling", discount: 40, rating: 4.5 },
  { id: 18, image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Apple", name: "AirPods Max", price: "₹49,900", category: "Over-Ear", color: "Silver", type: "Wireless", discount: 15, rating: 4.7 },
  { id: 19, image: "https://images.unsplash.com/photo-1542272604-787c3835533a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Samsung", name: "Galaxy Buds2 Pro", price: "₹13,999", category: "True Wireless", color: "Bora Purple", type: "Bluetooth", discount: 25, rating: 4.6 },
  { id: 20, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Logitech", name: "Astro A50 X", price: "₹28,999", category: "Gaming", color: "White", type: "Wireless", discount: 20, rating: 4.8 }
];

// === GENERATE PRODUCTS ===
function generateProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;
    card.dataset.brand = product.brand;
    card.dataset.color = product.color;
    card.dataset.type = product.type;
    card.dataset.discount = product.discount;
    card.dataset.rating = product.rating;

    card.innerHTML = `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
        <div class="rating">
          <span class="star">★</span>
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
        <div class="size-title">Select Variant</div>
        <div class="size-options">
          ${product.type.split(' ').map(t => `<button class="size-btn">${t}</button>`).join('')}
        </div>
        <button class="add-to-cart-btn">Add to Cart</button>
      </div>
    `;

    grid.appendChild(card);
  });

  setupSizeButtons();
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
        activeFilters[f] = activeFilters[f] ? activeFilters[f].filter(x => x !== v) : [];
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
    activeFilters = {};
    applyFilters();
  });
}

function applyFilters() {
  document.querySelectorAll('.product-card').forEach(card => {
    let show = true;

    Object.keys(activeFilters).forEach(key => {
      const values = activeFilters[key];
      if (!values || values.length === 0) return;

      if (key === 'type') {
        if (!values.some(v => card.dataset.type.includes(v))) show = false;
      } else if (key === 'rating') {
        const minRating = parseFloat(values[0].replace('+', ''));
        if (parseFloat(card.dataset.rating) < minRating) show = false;
      } else if (key === 'discount') {
        const minDisc = parseInt(values[0].replace('%+', ''));
        if (parseInt(card.dataset.discount) < minDisc) show = false;
      } else {
        if (!values.includes(card.dataset[key])) show = false;
      }
    });

    card.style.display = show ? 'flex' : 'none';
  });
}