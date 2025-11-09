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

// === FILTER OPTIONS (Sports-Specific) ===
const filterOptions = {
  sport: ["Cricket", "Football", "Badminton", "Tennis", "Gym", "Running", "Cycling", "Yoga"],
  type: ["Equipment", "Apparel", "Footwear", "Accessories"],
  brand: ["Nike", "Adidas", "Puma", "SG", "Yonex", "Cosco", "Nivia", "Reebok", "Decathlon", "HRX"],
  size: ["S", "M", "L", "XL", "XXL", "5", "6", "7", "8", "9", "10", "One Size"],
  price: ["Under ₹1,000", "₹1,000 - ₹3,000", "₹3,000 - ₹7,000", "Above ₹7,000"],
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

// === 20 SPORTS ITEMS (रियल प्रोडक्ट्स + Unsplash इमेज) ===
const products = [
  // Cricket
  { id: 1, image: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "SG", name: "English Willow Bat", price: "₹6,999", sport: "Cricket", type: "Equipment", size: "Full", rating: 4.8 },
  { id: 2, image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Nike", name: "Cricket Shoes", price: "₹4,499", sport: "Cricket", type: "Footwear", size: "9", rating: 4.7 },

  // Football
  { id: 3, image: "https://images.unsplash.com/photo-1579954115545-a9555d944870?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Nivia", name: "Storm Football", price: "₹799", sport: "Football", type: "Equipment", size: "5", rating: 4.6 },
  { id: 4, image: "https://images.unsplash.com/photo-1552667466-07770b3a5b76?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Adidas", name: "Predator Jersey", price: "₹2,999", sport: "Football", type: "Apparel", size: "L", rating: 4.8 },

  // Badminton
  { id: 5, image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Yonex", name: "Astrox 99", price: "₹12,999", sport: "Badminton", type: "Equipment", size: "One Size", rating: 4.9 },
  { id: 6, image: "https://images.unsplash.com/photo-1552667466-07770b3a5b76?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Li-Ning", name: "Badminton Shoes", price: "₹3,799", sport: "Badminton", type: "Footwear", size: "8", rating: 4.7 },

  // Gym & Fitness
  { id: 7, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac1b8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "HRX", name: "Gym T-Shirt", price: "₹699", sport: "Gym", type: "Apparel", size: "M", rating: 4.6 },
  { id: 8, image: "https://images.unsplash.com/photo-1583454125302-24f2c57c0b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Cosco", name: "Dumbbell Set", price: "₹2,499", sport: "Gym", type: "Equipment", size: "10kg", rating: 4.7 },

  // Running
  { id: 9, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Puma", name: "Running Shoes", price: "₹3,999", sport: "Running", type: "Footwear", size: "10", rating: 4.8 },
  { id: 10, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac1b8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Decathlon", name: "Running Shorts", price: "₹899", sport: "Running", type: "Apparel", size: "XL", rating: 4.5 },

  // More
  { id: 11, image: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "SS", name: "Cricket Gloves", price: "₹1,799", sport: "Cricket", type: "Accessories", size: "M", rating: 4.7 },
  { id: 12, image: "https://images.unsplash.com/photo-1579954115545-a9555d944870?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Cosco", name: "Football Shin Guard", price: "₹499", sport: "Football", type: "Accessories", size: "L", rating: 4.6 },
  { id: 13, image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Yonex", name: "Shuttlecock Mavis", price: "₹1,199", sport: "Badminton", type: "Equipment", size: "One Size", rating: 4.8 },
  { id: 14, image: "https://images.unsplash.com/photo-1583454125302-24f2c57c0b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Reebok", name: "Yoga Mat", price: "₹1,499", sport: "Yoga", type: "Equipment", size: "6mm", rating: 4.7 },
  { id: 15, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Nike", name: "Running Socks", price: "₹599", sport: "Running", type: "Accessories", size: "M", rating: 4.6 },
  { id: 16, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac1b8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Adidas", name: "Gym Gloves", price: "₹1,299", sport: "Gym", type: "Accessories", size: "L", rating: 4.7 },
  { id: 17, image: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "SG", name: "Cricket Helmet", price: "₹2,999", sport: "Cricket", type: "Equipment", size: "L", rating: 4.8 },
  { id: 18, image: "https://images.unsplash.com/photo-1579954115545-a9555d944870?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Nivia", name: "Goalkeeper Gloves", price: "₹1,099", sport: "Football", type: "Equipment", size: "9", rating: 4.7 },
  { id: 19, image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Victor", name: "Tennis Racket", price: "₹5,999", sport: "Tennis", type: "Equipment", size: "One Size", rating: 4.8 },
  { id: 20, image: "https://images.unsplash.com/photo-1583454125302-24f2c57c0b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Decathlon", name: "Cycling Helmet", price: "₹1,799", sport: "Cycling", type: "Equipment", size: "M", rating: 4.7 }
];

// === GENERATE PRODUCTS ===
function generateProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.sport = product.sport;
    card.dataset.type = product.type;
    card.dataset.brand = product.brand;
    card.dataset.size = product.size;
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
          <button class="size-btn">${product.type}</button>
          <button class="size-btn">${product.size}</button>
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
  if (price <= 3000) return "₹1,000 - ₹3,000";
  if (price <= 7000) return "₹3,000 - ₹7,000";
  return "Above ₹7,000";
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