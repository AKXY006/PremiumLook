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

// === FILTER OPTIONS (Women-Specific) ===
const filterOptions = {
  category: ["Kurtis", "Tops", "Dresses", "Lehenga", "Sarees", "Jeans", "Palazzos", "Skirts"],
  brand: ["Biba", "W for Woman", "Global Desi", "FabIndia", "Manyavar", "Anouk", "Sangria", "Aurelia", "Zara", "H&M"],
  color: ["Pink", "White", "Blue", "Red", "Black", "Green", "Gold", "Maroon", "Beige", "Navy"],
  size: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
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

// === 20 PRODUCTS (इमेज लिंक खाली – आप डालें) ===
const products = [
  // Kurtis (5)
  { id: 1, image: "", brand: "Biba", name: "Floral Printed Kurti", price: "₹1,499", category: "Kurtis", color: "Pink", size: "S,M,L,XL", discount: 20, rating: 4.7 },
  { id: 2, image: "", brand: "W for Woman", name: "Anarkali Kurti", price: "₹1,999", category: "Kurtis", color: "Blue", size: "M,L,XL", discount: 25, rating: 4.6 },
  { id: 3, image: "", brand: "Global Desi", name: "Embroidered Kurti", price: "₹2,199", category: "Kurtis", color: "Red", size: "XS,S,M", discount: 15, rating: 4.8 },
  { id: 4, image: "", brand: "FabIndia", name: "Cotton Straight Kurti", price: "₹1,299", category: "Kurtis", color: "Green", size: "L,XL,XXL", discount: 30, rating: 4.5 },
  { id: 5, image: "", brand: "Anouk", name: "Chikankari Kurti", price: "₹1,799", category: "Kurtis", color: "White", size: "S,M,L", discount: 20, rating: 4.9 },

  // Tops (5)
  { id: 6, image: "", brand: "Zara", name: "Off-Shoulder Top", price: "₹1,299", category: "Tops", color: "Black", size: "S,M,L", discount: 25, rating: 4.6 },
  { id: 7, image: "", brand: "H&M", name: "Crop Top", price: "₹899", category: "Tops", color: "White", size: "XS,S,M", discount: 30, rating: 4.4 },
  { id: 8, image: "", brand: "Sangria", name: "Peplum Top", price: "₹1,199", category: "Tops", color: "Red", size: "M,L,XL", discount: 20, rating: 4.7 },
  { id: 9, image: "", brand: "Aurelia", name: "Cold Shoulder Top", price: "₹1,499", category: "Tops", color: "Navy", size: "S,M,L,XL", discount: 15, rating: 4.5 },
  { id: 10, image: "", brand: "Manyavar", name: "Silk Blend Top", price: "₹2,199", category: "Tops", color: "Gold", size: "L,XL,XXL", discount: 10, rating: 4.8 },

  // Dresses (5)
  { id: 11, image: "", brand: "Global Desi", name: "Maxi Dress", price: "₹2,499", category: "Dresses", color: "Blue", size: "S,M,L", discount: 20, rating: 4.7 },
  { id: 12, image: "", brand: "Biba", name: "A-Line Dress", price: "₹1,999", category: "Dresses", color: "Pink", size: "M,L,XL", discount: 25, rating: 4.6 },
  { id: 13, image: "", brand: "W for Woman", name: "Wrap Dress", price: "₹2,299", category: "Dresses", color: "Black", size: "XS,S,M", discount: 15, rating: 4.8 },
  { id: 14, image: "", brand: "FabIndia", name: "Cotton Midi Dress", price: "₹1,799", category: "Dresses", color: "Green", size: "L,XL,XXL", discount: 30, rating: 4.5 },
  { id: 15, image: "", brand: "Anouk", name: "Floral Summer Dress", price: "₹1,599", category: "Dresses", color: "White", size: "S,M,L", discount: 20, rating: 4.9 },

  // Lehenga, Sarees, Jeans, etc. (5 more)
  { id: 16, image: "", brand: "Manyavar", name: "Bridal Lehenga", price: "₹9,999", category: "Lehenga", color: "Red", size: "M,L,XL", discount: 10, rating: 4.9 },
  { id: 17, image: "", brand: "Biba", name: "Banarasi Saree", price: "₹3,999", category: "Sarees", color: "Gold", size: "Free", discount: 20, rating: 4.8 },
  { id: 18, image: "", brand: "Zara", name: "High-Waist Jeans", price: "₹1,999", category: "Jeans", color: "Blue", size: "28,30,32", discount: 25, rating: 4.6 },
  { id: 19, image: "", brand: "H&M", name: "Printed Palazzo", price: "₹1,299", category: "Palazzos", color: "Maroon", size: "S,M,L", discount: 30, rating: 4.5 },
  { id: 20, image: "", brand: "Sangria", name: "A-Line Skirt", price: "₹1,499", category: "Skirts", color: "Black", size: "XS,S,M", discount: 15, rating: 4.7 }
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
    card.dataset.size = product.size;
    card.dataset.discount = product.discount;
    card.dataset.rating = product.rating;

    card.innerHTML = `
      <div class="product-image-container">
        <img src="${product.image || 'https://via.placeholder.com/400x500/333/999?text=No+Image'}" 
             alt="${product.name}" class="product-image" loading="lazy">
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
        <div class="size-title">Select Size</div>
        <div class="size-options">
          ${product.size.split(',').map(s => `<button class="size-btn">${s.trim()}</button>`).join('')}
        </div>
        <button class="add-to-cart-btn">Add to Cart</button>
      </div>
    `;

    grid.appendChild(card);
  });

  setupSizeButtons();
}

// === SIZE BUTTONS ===
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
      if (key === 'size') {
        if (!values.some(v => card.dataset.size.includes(v))) show = false;
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