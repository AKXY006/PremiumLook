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

// === FILTER OPTIONS (Toys-Specific) ===
const filterOptions = {
  category: ["Action Figures", "Dolls", "Puzzles", "Building Blocks", "Educational", "Soft Toys", "Remote Control", "Board Games"],
  age: ["0-2 Years", "3-5 Years", "6-8 Years", "9-12 Years", "12+ Years"],
  brand: ["LEGO", "Barbie", "Hot Wheels", "Fisher-Price", "Hasbro", "Melissa & Doug", "Funskool", "Nerf", "Play-Doh", "Mattel"],
  material: ["Plastic", "Wood", "Fabric", "Metal", "Rubber"],
  price: ["Under ₹500", "₹500 - ₹1,000", "₹1,000 - ₹2,000", "Above ₹2,000"],
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

// === 20 TOYS (रियल प्रोडक्ट्स + Unsplash इमेज) ===
const products = [
  // LEGO
  { id: 1, image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "LEGO", name: "City Fire Station", price: "₹4,999", category: "Building Blocks", age: "6-8 Years", material: "Plastic", rating: 4.9 },
  { id: 2, image: "https://images.unsplash.com/photo-1581836499506-4a660b39478a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "LEGO", name: "Ninjago Dragon", price: "₹3,499", category: "Building Blocks", age: "9-12 Years", material: "Plastic", rating: 4.8 },

  // Dolls & Soft Toys
  { id: 3, image: "https://images.unsplash.com/photo-1609501661650-968c04c9d2c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Barbie", name: "Dreamhouse Doll", price: "₹1,999", category: "Dolls", age: "3-5 Years", material: "Plastic", rating: 4.7 },
  { id: 4, image: "https://images.unsplash.com/photo-1596461404969-9a9e1e8d7e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Melissa & Doug", name: "Plush Teddy Bear", price: "₹1,299", category: "Soft Toys", age: "0-2 Years", material: "Fabric", rating: 4.8 },

  // Action & Remote
  { id: 5, image: "https://images.unsplash.com/photo-1581833971358-2c8b3e1b0d03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Hot Wheels", name: "Track Set", price: "₹1,499", category: "Action Figures", age: "3-5 Years", material: "Plastic", rating: 4.6 },
  { id: 6, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Nerf", name: "Elite 2.0 Blaster", price: "₹999", category: "Remote Control", age: "9-12 Years", material: "Plastic", rating: 4.7 },

  // Educational
  { id: 7, image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Fisher-Price", name: "Learning Tablet", price: "₹1,799", category: "Educational", age: "0-2 Years", material: "Plastic", rating: 4.8 },
  { id: 8, image: "https://images.unsplash.com/photo-1581836499506-4a660b39478a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Funskool", name: "India Map Puzzle", price: "₹399", category: "Puzzles", age: "6-8 Years", material: "Wood", rating: 4.5 },

  // Board Games
  { id: 9, image: "https://images.unsplash.com/photo-1609501661650-968c04c9d2c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Hasbro", name: "Monopoly Junior", price: "₹799", category: "Board Games", age: "6-8 Years", material: "Cardboard", rating: 4.6 },
  { id: 10, image: "https://images.unsplash.com/photo-1596461404969-9a9e1e8d7e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Play-Doh", name: "Kitchen Creations", price: "₹1,299", category: "Educational", age: "3-5 Years", material: "Clay", rating: 4.7 },

  // More
  { id: 11, image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "LEGO", name: "Friends Heartlake", price: "₹2,999", category: "Building Blocks", age: "6-8 Years", material: "Plastic", rating: 4.8 },
  { id: 12, image: "https://images.unsplash.com/photo-1581833971358-2c8b3e1b0d03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Mattel", name: "Uno Card Game", price: "₹149", category: "Board Games", age: "6-8 Years", material: "Cardboard", rating: 4.5 },
  { id: 13, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Hot Wheels", name: "Monster Truck", price: "₹699", category: "Action Figures", age: "3-5 Years", material: "Metal", rating: 4.6 },
  { id: 14, image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Fisher-Price", name: "Laugh & Learn Puppy", price: "₹1,499", category: "Educational", age: "0-2 Years", material: "Fabric", rating: 4.9 },
  { id: 15, image: "https://images.unsplash.com/photo-1581836499506-4a660b39478a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Funskool", name: "Jenga", price: "₹499", category: "Board Games", age: "9-12 Years", material: "Wood", rating: 4.7 },
  { id: 16, image: "https://images.unsplash.com/photo-1609501661650-968c04c9d2c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Barbie", name: "Fashionista Doll", price: "₹999", category: "Dolls", age: "3-5 Years", material: "Plastic", rating: 4.6 },
  { id: 17, image: "https://images.unsplash.com/photo-1596461404969-9a9e1e8d7e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Nerf", name: "Fortnite Blaster", price: "₹1,999", category: "Remote Control", age: "9-12 Years", material: "Plastic", rating: 4.8 },
  { id: 18, image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "LEGO", name: "Technic Car", price: "₹5,999", category: "Building Blocks", age: "12+ Years", material: "Plastic", rating: 4.9 },
  { id: 19, image: "https://images.unsplash.com/photo-1581833971358-2c8b3e1b0d03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Play-Doh", name: "Ice Cream Set", price: "₹799", category: "Educational", age: "3-5 Years", material: "Clay", rating: 4.7 },
  { id: 20, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", brand: "Melissa & Doug", name: "Wooden Puzzle", price: "₹1,199", category: "Puzzles", age: "3-5 Years", material: "Wood", rating: 4.8 }
];

// === GENERATE PRODUCTS ===
function generateProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;
    card.dataset.age = product.age;
    card.dataset.brand = product.brand;
    card.dataset.material = product.material;
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
          <button class="size-btn">${product.age}</button>
          <button class="size-btn">${product.material}</button>
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
  if (price < 500) return "Under ₹500";
  if (price <= 1000) return "₹500 - ₹1,000";
  if (price <= 2000) return "₹1,000 - ₹2,000";
  return "Above ₹2,000";
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