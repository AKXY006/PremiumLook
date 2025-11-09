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

// === FILTER OPTIONS (Sunglasses-Specific) ===
const filterOptions = {
  brand: ["Ray-Ban", "Oakley", "Polaroid", "Fastrack", "Vogue", "Police", "IDEAL", "Lenskart", "Tommy Hilfiger", "Prada"],
  frame: ["Aviator", "Wayfarer", "Round", "Square", "Cat-Eye", "Rectangle", "Oval", "Sports"],
  lens: ["Polarized", "UV400", "Gradient", "Mirrored", "Photochromic"],
  color: ["Black", "Brown", "Gold", "Silver", "Tortoise", "Blue", "Green", "Red", "Transparent", "Pink"],
  price: ["Under ₹1,000", "₹1,000 - ₹2,500", "₹2,500 - ₹5,000", "Above ₹5,000"],
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

// === 20 SUNGLASSES (रियल प्रोडक्ट्स + Unsplash इमेज) ===
const products = [
  // Aviator
  { id: 1, image: "https://images.unsplash.com/photo-1574260079837-6b6e8c4f6d8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Ray-Ban", name: "Aviator Classic", price: "₹8,990", frame: "Aviator", lens: "Polarized", color: "Gold", rating: 4.9 },
  { id: 2, image: "https://images.unsplash.com/photo-1511499767150-a48a7a0a2b51?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Oakley", name: "Holbrook", price: "₹7,490", frame: "Square", lens: "UV400", color: "Black", rating: 4.8 },

  // Wayfarer
  { id: 3, image: "https://images.unsplash.com/photo-1582791694770-cbdc7f412f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Ray-Ban", name: "Wayfarer", price: "₹9,990", frame: "Wayfarer", lens: "Gradient", color: "Tortoise", rating: 4.9 },
  { id: 4, image: "https://images.unsplash.com/photo-1605034313360-2b5c7c8a4c3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Fastrack", name: "P327BK1", price: "₹1,299", frame: "Wayfarer", lens: "UV400", color: "Black", rating: 4.5 },

  // Sports
  { id: 5, image: "https://images.unsplash.com/photo-1622473595053-2d1d3c2c5b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Oakley", name: "Radar EV", price: "₹12,990", frame: "Sports", lens: "Polarized", color: "Blue", rating: 4.8 },
  { id: 6, image: "https://images.unsplash.com/photo-1591073113117-2d1a8d6c2f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Polaroid", name: "Sport PLD", price: "₹2,499", frame: "Sports", lens: "Polarized", color: "Black", rating: 4.6 },

  // Fashion
  { id: 7, image: "https://images.unsplash.com/photo-1611854156071-3c9d4e8e5f5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Vogue", name: "Cat-Eye", price: "₹4,999", frame: "Cat-Eye", lens: "Gradient", color: "Pink", rating: 4.7 },
  { id: 8, image: "https://images.unsplash.com/photo-1582791694770-cbdc7f412f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Prada", name: "PR 17WS", price: "₹18,990", frame: "Rectangle", lens: "Mirrored", color: "Silver", rating: 4.9 },

  // Budget
  { id: 9, image: "https://images.unsplash.com/photo-1574260079837-6b6e8c4f6d8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Fastrack", name: "P191BK2", price: "₹999", frame: "Round", lens: "UV400", color: "Black", rating: 4.4 },
  { id: 10, image: "https://images.unsplash.com/photo-1511499767150-a48a7a0a2b51?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "IDEAL", name: "ID-5001", price: "₹799", frame: "Aviator", lens: "UV400", color: "Gold", rating: 4.3 },

  // Premium
  { id: 11, image: "https://images.unsplash.com/photo-1605034313360-2b5c7c8a4c3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Tommy Hilfiger", name: "TH 1792", price: "₹6,999", frame: "Rectangle", lens: "Polarized", color: "Brown", rating: 4.7 },
  { id: 12, image: "https://images.unsplash.com/photo-1622473595053-2d1d3c2c5b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Police", name: "SPL871", price: "₹8,499", frame: "Aviator", lens: "Polarized", color: "Silver", rating: 4.8 },

  // More
  { id: 13, image: "https://images.unsplash.com/photo-1591073113117-2d1a8d6c2f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Lenskart", name: "Air Black", price: "₹1,999", frame: "Wayfarer", lens: "UV400", color: "Black", rating: 4.6 },
  { id: 14, image: "https://images.unsplash.com/photo-1611854156071-3c9d4e8e5f5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Ray-Ban", name: "RB3647N", price: "₹10,990", frame: "Round", lens: "Mirrored", color: "Green", rating: 4.8 },
  { id: 15, image: "https://images.unsplash.com/photo-1582791694770-cbdc7f412f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Oakley", name: "Frogskins", price: "₹7,999", frame: "Square", lens: "Polarized", color: "Transparent", rating: 4.7 },
  { id: 16, image: "https://images.unsplash.com/photo-1574260079837-6b6e8c4f6d8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Fastrack", name: "M154BK1", price: "₹1,499", frame: "Sports", lens: "UV400", color: "Black", rating: 4.5 },
  { id: 17, image: "https://images.unsplash.com/photo-1511499767150-a48a7a0a2b51?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Vogue", name: "VO2943S", price: "₹5,999", frame: "Cat-Eye", lens: "Gradient", color: "Red", rating: 4.7 },
  { id: 18, image: "https://images.unsplash.com/photo-1605034313360-2b5c7c8a4c3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Polaroid", name: "PLD 1013/S", price: "₹2,199", frame: "Rectangle", lens: "Polarized", color: "Brown", rating: 4.6 },
  { id: 19, image: "https://images.unsplash.com/photo-1622473595053-2d1d3c2c5b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "IDEAL", name: "ID-3002", price: "₹899", frame: "Round", lens: "UV400", color: "Silver", rating: 4.3 },
  { id: 20, image: "https://images.unsplash.com/photo-1591073113117-2d1a8d6c2f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Prada", name: "PR 01VS", price: "₹22,990", frame: "Cat-Eye", lens: "Polarized", color: "Black", rating: 4.9 }
];

// === GENERATE PRODUCTS ===
function generateProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.brand = product.brand;
    card.dataset.frame = product.frame;
    card.dataset.lens = product.lens;
    card.dataset.color = product.color;
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
          <button class="size-btn">${product.frame}</button>
          <button class="size-btn">${product.lens}</button>
          <button class="size-btn">${product.color}</button>
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
  if (price < 1000) return "Under ₹1,000";
  if (price <= 2500) return "₹1,000 - ₹2,500";
  if (price <= 5000) return "₹2,500 - ₹5,000";
  return "Above ₹5,000";
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