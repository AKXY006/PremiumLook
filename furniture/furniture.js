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

// === FILTER OPTIONS (Furniture-Specific) ===
const filterOptions = {
  category: ["Sofa", "Bed", "Chair", "Table", "Wardrobe", "TV Unit", "Dining Set", "Study Table"],
  material: ["Wood", "Metal", "Fabric", "Leather", "Glass", "Engineered Wood"],
  room: ["Living Room", "Bedroom", "Dining", "Office", "Kids Room", "Outdoor"],
  color: ["Brown", "White", "Black", "Grey", "Beige", "Walnut", "Teak", "Oak"],
  price: ["Under ₹10,000", "₹10,000 - ₹25,000", "₹25,000 - ₹50,000", "Above ₹50,000"],
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

// === 20 FURNITURE (रियल प्रोडक्ट्स + Unsplash इमेज) ===
const products = [
  // Sofa
  { id: 1, image: "https://images.unsplash.com/photo-1555041469-8399a772b4e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Urban Ladder", name: "Luxe 3-Seater", price: "₹38,999", category: "Sofa", material: "Fabric", room: "Living Room", color: "Grey", rating: 4.8 },
  { id: 2, image: "https://images.unsplash.com/photo-1586023427157-7a2c4c3e0e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Pepperfry", name: "Recliner Sofa", price: "₹52,999", category: "Sofa", material: "Leather", room: "Living Room", color: "Brown", rating: 4.7 },

  // Bed
  { id: 3, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Wakefit", name: "King Size Bed", price: "₹18,999", category: "Bed", material: "Engineered Wood", room: "Bedroom", color: "Walnut", rating: 4.6 },
  { id: 4, image: "https://images.unsplash.com/photo-1618778386605-1a2e3f7d6e4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Godrej Interio", name: "Queen Bed", price: "₹24,999", category: "Bed", material: "Wood", room: "Bedroom", color: "Teak", rating: 4.8 },

  // Chair & Table
  { id: 5, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Nilkamal", name: "Ergonomic Chair", price: "₹8,999", category: "Chair", material: "Plastic", room: "Office", color: "Black", rating: 4.5 },
  { id: 6, image: "https://images.unsplash.com/photo-1598300044952-1c0c2d9b5b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Durian", name: "Coffee Table", price: "₹12,999", category: "Table", material: "Glass", room: "Living Room", color: "Black", rating: 4.7 },

  // Wardrobe & TV Unit
  { id: 7, image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Spacewood", name: "3-Door Wardrobe", price: "₹29,999", category: "Wardrobe", material: "Engineered Wood", room: "Bedroom", color: "White", rating: 4.6 },
  { id: 8, image: "https://images.unsplash.com/photo-1598546721207-6d8b5e8c5a7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Home Centre", name: "TV Unit", price: "₹15,999", category: "TV Unit", material: "Wood", room: "Living Room", color: "Brown", rating: 4.7 },

  // Dining & Study
  { id: 9, image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Zuari", name: "6-Seater Dining", price: "₹42,999", category: "Dining Set", material: "Wood", room: "Dining", color: "Oak", rating: 4.8 },
  { id: 10, image: "https://images.unsplash.com/photo-1586023427387-2c1a4d1a3d6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Green Soul", name: "Study Table", price: "₹7,999", category: "Study Table", material: "Metal", room: "Office", color: "Black", rating: 4.5 },

  // More
  { id: 11, image: "https://images.unsplash.com/photo-1555041469-8399a772b4e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "IKEA", name: "L-Shaped Sofa", price: "₹65,999", category: "Sofa", material: "Fabric", room: "Living Room", color: "Beige", rating: 4.9 },
  { id: 12, image: "https://images.unsplash.com/photo-1586023427157-7a2c4c3e0e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Furniture Hub", name: "Bunk Bed", price: "₹28,999", category: "Bed", material: "Metal", room: "Kids Room", color: "White", rating: 4.7 },
  { id: 13, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Woodsworth", name: "Rocking Chair", price: "₹19,999", category: "Chair", material: "Wood", room: "Living Room", color: "Brown", rating: 4.8 },
  { id: 14, image: "https://images.unsplash.com/photo-1598300044952-1c0c2d9b5b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Evok", name: "Center Table", price: "₹9,999", category: "Table", material: "Engineered Wood", room: "Living Room", color: "Walnut", rating: 4.6 },
  { id: 15, image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Mintwud", name: "Sliding Wardrobe", price: "₹34,999", category: "Wardrobe", material: "Engineered Wood", room: "Bedroom", color: "Grey", rating: 4.7 },
  { id: 16, image: "https://images.unsplash.com/photo-1598546721207-6d8b5e8c5a7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Hometown", name: "Wall TV Unit", price: "₹22,999", category: "TV Unit", material: "Wood", room: "Living Room", color: "Teak", rating: 4.8 },
  { id: 17, image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Crystal Furnitech", name: "4-Seater Dining", price: "₹29,999", category: "Dining Set", material: "Glass", room: "Dining", color: "Black", rating: 4.6 },
  { id: 18, image: "https://images.unsplash.com/photo-1586023427387-2c1a4d1a3d6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Furlenco", name: "Office Desk", price: "₹14,999", category: "Study Table", material: "Wood", room: "Office", color: "Oak", rating: 4.7 },
  { id: 19, image: "https://images.unsplash.com/photo-1555041469-8399a772b4e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Urban Ladder", name: "Sectional Sofa", price: "₹78,999", category: "Sofa", material: "Leather", room: "Living Room", color: "Brown", rating: 4.9 },
  { id: 20, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Sleepwell", name: "Storage Bed", price: "₹32,999", category: "Bed", material: "Engineered Wood", room: "Bedroom", color: "White", rating: 4.8 }
];

// === GENERATE PRODUCTS ===
function generateProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;
    card.dataset.material = product.material;
    card.dataset.room = product.room;
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
        <div class="size-title">Quick Info</div>
        <div class="size-options">
          <button class="size-btn">${product.material}</button>
          <button class="size-btn">${product.room}</button>
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
  if (price < 10000) return "Under ₹10,000";
  if (price <= 25000) return "₹10,000 - ₹25,000";
  if (price <= 50000) return "₹25,000 - ₹50,000";
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