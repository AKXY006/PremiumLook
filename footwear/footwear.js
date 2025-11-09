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

// === FILTER OPTIONS (Footwear-Specific) ===
const filterOptions = {
  category: ["Sneakers", "Formal", "Sports", "Casual", "Sandals", "Boots", "Flip-Flops", "Loafers"],
  brand: ["Nike", "Adidas", "Puma", "Bata", "Reebok", "Skechers", "Woodland", "Hush Puppies", "Clarks", "Red Tape"],
  size: ["6", "7", "8", "9", "10", "11", "12"],
  color: ["Black", "White", "Grey", "Blue", "Brown", "Red", "Green", "Beige", "Navy", "Tan"],
  price: ["Under ₹1,500", "₹1,500 - ₹3,000", "₹3,000 - ₹5,000", "Above ₹5,000"],
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

// === 20 FOOTWEAR (रियल प्रोडक्ट्स + Unsplash इमेज) ===
const products = [
  // Sneakers
  { id: 1, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Nike", name: "Air Max 270", price: "₹11,995", category: "Sneakers", color: "Red", size: "8,9,10", rating: 4.8 },
  { id: 2, image: "https://images.unsplash.com/photo-1605407579580-69a3b2f158d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Adidas", name: "Ultraboost 23", price: "₹14,999", category: "Sneakers", color: "Black", size: "7,8,9", rating: 4.7 },
  { id: 3, image: "https://images.unsplash.com/photo-1600269452121-79c9e0e8c9e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Puma", name: "RS-X3", price: "₹7,999", category: "Sneakers", color: "White", size: "9,10,11", rating: 4.6 },

  // Formal
  { id: 4, image: "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Clarks", name: "Oxford Leather", price: "₹5,999", category: "Formal", color: "Brown", size: "8,9,10", rating: 4.8 },
  { id: 5, image: "https://images.unsplash.com/photo-1606104917624-4d3e6d5f2e1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Hush Puppies", name: "Derby Shoes", price: "₹4,499", category: "Formal", color: "Black", size: "7,8,9", rating: 4.7 },

  // Sports
  { id: 6, image: "https://images.unsplash.com/photo-1595951180086-36d20b9e55d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Reebok", name: "Nano X3", price: "₹9,999", category: "Sports", color: "Blue", size: "8,9,10", rating: 4.6 },
  { id: 7, image: "https://images.unsplash.com/photo-1605348532762-465b4d6db0b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Skechers", name: "GO Run", price: "₹6,499", category: "Sports", color: "Grey", size: "9,10,11", rating: 4.5 },

  // Casual & Others
  { id: 8, image: "https://images.unsplash.com/photo-1562183241-b937e1de65e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Bata", name: "Casual Loafers", price: "₹1,999", category: "Casual", color: "Tan", size: "7,8,9", rating: 4.4 },
  { id: 9, image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Woodland", name: "Rugged Boots", price: "₹4,495", category: "Boots", color: "Brown", size: "8,9,10", rating: 4.7 },
  { id: 10, image: "https://images.unsplash.com/photo-1605408494409-3f9e5e1d3e8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Red Tape", name: "Sneaker Casual", price: "₹2,999", category: "Casual", color: "Navy", size: "9,10", rating: 4.5 },

  // Sandals & Flip-Flops
  { id: 11, image: "https://images.unsplash.com/photo-1591195853407-2a3c7c1b8b0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Bata", name: "Comfort Sandals", price: "₹999", category: "Sandals", color: "Black", size: "7,8,9", rating: 4.3 },
  { id: 12, image: "https://images.unsplash.com/photo-1605733513597-a8f834107957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Puma", name: "Popcat Slides", price: "₹1,499", category: "Flip-Flops", color: "White", size: "8,9,10", rating: 4.6 },

  // More Premium
  { id: 13, image: "https://images.unsplash.com/photo-1605348532762-465b4d6db0b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Nike", name: "React Element 55", price: "₹12,995", category: "Sneakers", color: "Grey", size: "9,10", rating: 4.8 },
  { id: 14, image: "https://images.unsplash.com/photo-1606104917624-4d3e6d5f2e1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Adidas", name: "Stan Smith", price: "₹8,999", category: "Casual", color: "White", size: "7,8,9", rating: 4.9 },
  { id: 15, image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Woodland", name: "Camel Leather", price: "₹3,995", category: "Casual", color: "Beige", size: "8,9,10", rating: 4.7 },
  { id: 16, image: "https://images.unsplash.com/photo-1562183241-b937e1de65e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Clarks", name: "Desert Boot", price: "₹6,999", category: "Boots", color: "Brown", size: "9,10", rating: 4.8 },
  { id: 17, image: "https://images.unsplash.com/photo-1605408494409-3f9e5e1d3e8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Skechers", name: "GO Walk", price: "₹5,499", category: "Casual", color: "Navy", size: "8,9", rating: 4.6 },
  { id: 18, image: "https://images.unsplash.com/photo-1595951180086-36d20b9e55d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Reebok", name: "Classic Leather", price: "₹7,999", category: "Casual", color: "White", size: "7,8,9", rating: 4.7 },
  { id: 19, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Puma", name: "Suede Classic", price: "₹6,999", category: "Sneakers", color: "Green", size: "9,10", rating: 4.6 },
  { id: 20, image: "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Hush Puppies", name: "Brogue Formal", price: "₹5,499", category: "Formal", color: "Black", size: "8,9,10", rating: 4.8 }
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
    card.dataset.size = product.size;
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
        <div class="size-title">Available Sizes</div>
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

function getPriceRange(priceStr) {
  const price = parseInt(priceStr.replace(/[^\d]/g, ''));
  if (price < 1500) return "Under ₹1,500";
  if (price <= 3000) return "₹1,500 - ₹3,000";
  if (price <= 5000) return "₹3,000 - ₹5,000";
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
      if (key === 'size') {
        if (!values.some(v => card.dataset.size.includes(v))) show = false;
      } else if (key === 'rating') {
        const minRating = parseFloat(values[0].replace('+', ''));
        if (parseFloat(card.dataset.rating) < minRating) show = false;
      } else {
        if (!values.includes(card.dataset[key])) show = false;
      }
    });

    card.style.display = show ? 'flex' : 'none';
  });
}