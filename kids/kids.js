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

// === FILTER OPTIONS (Kids-Specific) ===
const filterOptions = {
  category: ["T-Shirts", "Shorts", "Dresses", "Frocks", "Jeans", "Jackets", "Nightwear", "Party Wear"],
  brand: ["MiniKlub", "Hopscotch", "Gini & Jony", "Lilliput", "ToffyHouse", "Ed-a-Mamma", "Carter's", "H&M Kids", "Max", "Cherokee"],
  color: ["Blue", "Pink", "Yellow", "Green", "Red", "White", "Grey", "Orange", "Purple", "Black"],
  size: ["0-1Y", "1-2Y", "2-3Y", "3-4Y", "4-5Y", "5-6Y", "6-7Y", "7-8Y", "8-10Y", "10-12Y"],
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
  // T-Shirts (4)
  { id: 1, image: "", brand: "MiniKlub", name: "Cartoon Print T-Shirt", price: "₹399", category: "T-Shirts", color: "Blue", size: "2-3Y,3-4Y,4-5Y", discount: 20, rating: 4.6 },
  { id: 2, image: "", brand: "Hopscotch", name: "Dino Graphic Tee", price: "₹449", category: "T-Shirts", color: "Green", size: "1-2Y,2-3Y", discount: 25, rating: 4.7 },
  { id: 3, image: "", brand: "Gini & Jony", name: "Striped Polo T-Shirt", price: "₹599", category: "T-Shirts", color: "Red", size: "5-6Y,6-7Y", discount: 15, rating: 4.5 },
  { id: 4, image: "", brand: "Lilliput", name: "Unicorn Glow Tee", price: "₹499", category: "T-Shirts", color: "Pink", size: "3-4Y,4-5Y", discount: 30, rating: 4.8 },

  // Shorts (3)
  { id: 5, image: "", brand: "Carter's", name: "Denim Shorts", price: "₹699", category: "Shorts", color: "Blue", size: "2-3Y,3-4Y", discount: 20, rating: 4.7 },
  { id: 6, image: "", brand: "H&M Kids", name: "Printed Cotton Shorts", price: "₹399", category: "Shorts", color: "Yellow", size: "4-5Y,5-6Y", discount: 25, rating: 4.6 },
  { id: 7, image: "", brand: "ToffyHouse", name: "Cargo Shorts", price: "₹549", category: "Shorts", color: "Grey", size: "6-7Y,7-8Y", discount: 15, rating: 4.5 },

  // Dresses & Frocks (4)
  { id: 8, image: "", brand: "Ed-a-Mamma", name: "Floral Summer Dress", price: "₹799", category: "Dresses", color: "Pink", size: "2-3Y,3-4Y", discount: 20, rating: 4.9 },
  { id: 9, image: "", brand: "Max", name: "Party Frock", price: "₹999", category: "Frocks", color: "Red", size: "4-5Y,5-6Y", discount: 30, rating: 4.8 },
  { id: 10, image: "", brand: "Cherokee", name: "Denim Pinafore Dress", price: "₹849", category: "Dresses", color: "Blue", size: "3-4Y,4-5Y", discount: 25, rating: 4.7 },

  // Others (9 more)
  { id: 11, image: "", brand: "MiniKlub", name: "Superhero Jacket", price: "₹1,299", category: "Jackets", color: "Black", size: "5-6Y,6-7Y", discount: 15, rating: 4.6 },
  { id: 12, image: "", brand: "Hopscotch", name: "Star Print Night Suit", price: "₹599", category: "Nightwear", color: "White", size: "2-3Y,3-4Y", discount: 20, rating: 4.8 },
  { id: 13, image: "", brand: "Gini & Jony", name: "Slim Fit Jeans", price: "₹899", category: "Jeans", color: "Blue", size: "6-7Y,7-8Y", discount: 25, rating: 4.5 },
  { id: 14, image: "", brand: "Lilliput", name: "Sequin Party Dress", price: "₹1,499", category: "Party Wear", color: "Gold", size: "4-5Y,5-6Y", discount: 30, rating: 4.9 },
  { id: 15, image: "", brand: "Carter's", name: "Hooded Sweatshirt", price: "₹799", category: "Jackets", color: "Green", size: "3-4Y,4-5Y", discount: 20, rating: 4.7 },
  { id: 16, image: "", brand: "H&M Kids", name: "Animal Print Pyjama", price: "₹499", category: "Nightwear", color: "Yellow", size: "1-2Y,2-3Y", discount: 15, rating: 4.6 },
  { id: 17, image: "", brand: "ToffyHouse", name: "Ripped Jeans", price: "₹749", category: "Jeans", color: "Grey", size: "5-6Y,6-7Y", discount: 25, rating: 4.5 },
  { id: 18, image: "", brand: "Ed-a-Mamma", name: "Ethnic Kurta Set", price: "₹1,199", category: "Party Wear", color: "Orange", size: "4-5Y,5-6Y", discount: 20, rating: 4.8 },
  { id: 19, image: "", brand: "Max", name: "Rainbow T-Shirt", price: "₹449", category: "T-Shirts", color: "White", size: "2-3Y,3-4Y", discount: 30, rating: 4.7 },
  { id: 20, image: "", brand: "Cherokee", name: "Floral Skirt Set", price: "₹899", category: "Dresses", color: "Purple", size: "6-7Y,7-8Y", discount: 15, rating: 4.6 }
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
        <img src="${product.image || 'https://via.placeholder.com/400x500/333/999?text=Kid+Wear'}" 
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