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

// === FILTER OPTIONS ===
const filterOptions = {
  category: ["Shirts", "T-Shirts", "Jackets", "Hoodies", "Jeans", "Shorts", "Sweaters", "Polos"],
  brand: ["Nike", "Adidas", "Zara", "H&M", "Levi's", "Puma", "Reebok", "Under Armour", "Tommy Hilfiger", "Calvin Klein"],
  color: ["Black", "White", "Blue", "Gray", "Red", "Navy", "Green", "Beige", "Brown", "Maroon"],
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

// === PRODUCT DATA ===
const products = [
  { id: 1, image: "https://thebearhouse.com/cdn/shop/files/TSH-DREGO-GR_1.jpg?v=1762259542&width=1080", brand: "Nike", name: "Classic Crew T-Shirt", price: "₹1,299", category: "T-Shirts", color: "Black", size: "S,M,L,XL", discount: 15, rating: 4.6 },
  { id: 2, image: "https://thebearhouse.com/cdn/shop/files/TSH-QUARTZ-BL_1.jpg?v=1762255279&width=1080", brand: "Adidas", name: "Performance Tee", price: "₹1,499", category: "T-Shirts", color: "White", size: "M,L,XL,XXL", discount: 20, rating: 4.7 },
  { id: 3, image: "https://thebearhouse.com/cdn/shop/files/TSH-MIZOR-RT_1.jpg?v=1762259996&width=1080", brand: "Zara", name: "Slim Fit Cotton Tee", price: "₹999", category: "T-Shirts", color: "Gray", size: "XS,S,M,L", discount: 10, rating: 4.3 },
  { id: 4, image: "https://thebearhouse.com/cdn/shop/files/TSH-FLUXENT-MR_4.jpg?v=1762254845&width=1080", brand: "H&M", name: "Basic V-Neck T-Shirt", price: "₹799", category: "T-Shirts", color: "Blue", size: "L,XL,XXL", discount: 25, rating: 4.2 },
  { id: 5, image: "https://www.beyoung.in/api/cache/catalog/products/oversize_t_shirt_men/DJ25OSTS011/electric_blue_monday_graphic_hd_print_t-shirt_design_view_400x533.jpg", brand: "Levi's", name: "Graphic Print Tee", price: "₹1,199", category: "T-Shirts", color: "Red", size: "S,M,L", discount: 30, rating: 4.8 },
{ id: 6, image: "https://www.beyoung.in/api/cache/catalog/products/t_shirt_for_men/printed_t-shirts/move_at_your_own_pace_printed_t-shirt_for_men_side_view_400x533.jpg", brand: "Puma", name: "Athletic Dry Tee", price: "₹1,099", category: "T-Shirts", color: "Navy", size: "M,L,XL", discount: 20, rating: 4.5 },
{ id: 7, image: "https://www.beyoung.in/api/cache/catalog/products/t_shirt_for_men/printed_t-shirts/own_every_moment_printed_t-shirt_for_men_hover_400x533.jpg", brand: "Reebok", name: "Active Fit T-Shirt", price: "₹899", category: "T-Shirts", color: "Green", size: "XS,S,M", discount: 15, rating: 4.4 },
{ id: 8, image: "https://www.beyoung.in/api/cache/catalog/products/t_shirt_for_men/printed_t-shirts/rare_breed_printed_t-shirt_for_men_hover_400x533.jpg", brand: "Tommy Hilfiger", name: "Logo Embroidered Tee", price: "₹1,799", category: "T-Shirts", color: "Beige", size: "L,XL,XXL", discount: 10, rating: 4.9 },
{ id: 9, image: "https://www.beyoung.in/api/cache/catalog/products/t_shirt_for_men/printed_t-shirts/work_hard_printed_t-shirt_for_men_side_view_400x533.jpg", brand: "Calvin Klein", name: "Minimalist Tee", price: "₹1,399", category: "T-Shirts", color: "Brown", size: "S,M,L,XL", discount: 25, rating: 4.7 },
{ id: 10, image: "https://www.beyoung.in/api/cache/catalog/products/t_shirt_for_men/printed_t-shirts/into_the_wilderness_half_sleeve_t-shirt_hover_400x533.jpg", brand: "Under Armour", name: "Tech 2.0 T-Shirt", price: "₹1,249", category: "T-Shirts", color: "Maroon", size: "M,L,XL", discount: 20, rating: 4.6 },

  // Shirts (10)
  { id: 11, image: "https://campussutra.com/cdn/shop/files/CSMOVSRT7609_1_b3309dc8-5414-4cf1-b982-690b7e08d5b1.jpg?v=1730801146&width=1600", brand: "Zara", name: "Oxford Button-Down Shirt", price: "₹2,499", category: "Shirts", color: "White", size: "S,M,L,XL", discount: 15, rating: 4.5 },
  { id: 12, image: "https://campussutra.com/cdn/shop/files/CSMSSRT6078_1_ad9219ef-869d-44b2-9dd2-5876b06cc708.webp?v=1713879728&width=1600", brand: "H&M", name: "Slim Fit Dress Shirt", price: "₹1,799", category: "Shirts", color: "Blue", size: "M,L,XL,XXL", discount: 20, rating: 4.4 },
  { id: 13, image: "https://campussutra.com/cdn/shop/files/CSMSSRT6936_1_20fb4262-4e16-439c-878f-311e75ef3bf5.jpg?v=1722928735&width=1600", brand: "Tommy Hilfiger", name: "Classic Chambray Shirt", price: "₹2,999", category: "Shirts", color: "Gray", size: "XS,S,M,L", discount: 10, rating: 4.7 },
  { id: 14, image: "https://campussutra.com/cdn/shop/files/CSMOVSRT3136_1_fa211e94-475a-418b-a5c9-e3f930673943.png?v=1757677449&width=1600", brand: "Calvin Klein", name: "Linen Blend Shirt", price: "₹2,199", category: "Shirts", color: "Black", size: "L,XL,XXL", discount: 25, rating: 4.3 },
  { id: 15, image: "https://campussutra.com/cdn/shop/files/CSMSSRT3159_1_19cbd9e7-cdea-4b95-bb1d-273b86edfdda.jpg?v=1761129400&width=1600", brand: "Puma", name: "Casual Flannel Shirt", price: "₹1,899", category: "Shirts", color: "Red", size: "S,M,L", discount: 30, rating: 4.6 },
  { id: 16, image: "https://campussutra.com/cdn/shop/products/CSMSSRT6023_1.webp?v=1710944227&width=1600", brand: "Adidas", name: "Polo Dress Shirt", price: "₹2,399", category: "Shirts", color: "Navy", size: "M,L,XL", discount: 20, rating: 4.8 },
  { id: 17, image: "https://campussutra.com/cdn/shop/files/CSMSSRT7735_1_c16998e5-9d94-4544-92ed-4c3df6dbd432.jpg?v=1730801453&width=400", brand: "Levi's", name: "Denim Shirt", price: "₹1,999", category: "Shirts", color: "Green", size: "XS,S,M", discount: 15, rating: 4.2 },
  { id: 18, image: "https://campussutra.com/cdn/shop/files/SRM23_CSMSSRT5658_1.webp?v=1708760466&width=1600", brand: "Reebok", name: "Short Sleeve Shirt", price: "₹1,699", category: "Shirts", color: "Beige", size: "L,XL,XXL", discount: 10, rating: 4.5 },
  { id: 19, image: "https://campussutra.com/cdn/shop/files/CSMSSRT9918_1_e17f4687-a0e2-478e-8031-6faa89f0f99f.jpg?v=1759229622&width=1600", brand: "Under Armour", name: "Performance Shirt", price: "₹2,099", category: "Shirts", color: "Brown", size: "S,M,L,XL", discount: 25, rating: 4.7 },
  { id: 20, image: "https://campussutra.com/cdn/shop/files/CSMSSRT8780_1_584b3013-4b5a-42d7-be9f-8529bd4b2584.jpg?v=1744289083&width=1600", brand: "Nike", name: "Button-Up Casual Shirt", price: "₹2,499", category: "Shirts", color: "Maroon", size: "M,L,XL", discount: 20, rating: 4.4 },

  // Jackets (10)
{ id: 21, image: "https://www.beyoung.in/api/cache/catalog/products/new_shirt_upload_21_10_2022/brown_raglan_sleeve_jacket_neck_view_18_12_2024_400x533.jpg", brand: "Zara", name: "Denim Trucker Jacket", price: "₹3,499", category: "Jackets", color: "Blue", size: "S,M,L,XL", discount: 15, rating: 4.6 },
{ id: 22, image: "https://m.media-amazon.com/images/I/61i8G1UzVVL._SY879_.jpg", brand: "H&M", name: "Essential Pullover Hoodie", price: "₹2,799", category: "Hoodies", color: "Black", size: "M,L,XL,XXL", discount: 20, rating: 4.5 },
{ id: 23, image: "https://m.media-amazon.com/images/I/61RpPJrFTBL._SX679_.jpg", brand: "Tommy Hilfiger", name: "Leather Biker Jacket", price: "₹6,999", category: "Jackets", color: "Brown", size: "XS,S,M,L", discount: 10, rating: 4.8 },
{ id: 24, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/sweatshirt/h/f/s/l-225071211-13-monte-carlo-original-imahfdwmv9swnng5.jpeg?q=70", brand: "Calvin Klein", name: "Logo Print Hoodie", price: "₹3,499", category: "Hoodies", color: "Gray", size: "L,XL,XXL", discount: 25, rating: 4.3 },
{ id: 25, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/sweatshirt/r/w/b/xxl-swe-copen-mr-the-bear-house-original-imahc8nsgghdnhxy.jpeg?q=70", brand: "Puma", name: "Varsity Bomber Jacket", price: "₹4,199", category: "Jackets", color: "Red", size: "S,M,L", discount: 30, rating: 4.7 },
{ id: 26, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/sweatshirt/8/m/u/xl-dcystraw24hod001m-013-dcyphr-original-imaheh2nvg88h9ey.jpeg?q=70", brand: "Adidas", name: "Classic Logo Hoodie", price: "₹3,299", category: "Hoodies", color: "Navy", size: "M,L,XL", discount: 20, rating: 4.6 },
{ id: 27, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/sweatshirt/q/6/x/xxl-442333269-blue-gap-original-imahbv9ge36usms8.jpeg?q=70", brand: "Levi's", name: "Sherpa Lined Denim Jacket", price: "₹4,499", category: "Jackets", color: "Green", size: "XS,S,M", discount: 15, rating: 4.4 },
{ id: 28, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/sweatshirt/4/4/z/s-s25hmhk050-tommy-hilfiger-original-imahgekhbqshshu2.jpeg?q=70", brand: "Reebok", name: "Training Fit Hoodie", price: "₹2,999", category: "Hoodies", color: "Beige", size: "L,XL,XXL", discount: 10, rating: 4.5 },

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
        <img src="${product.image}" alt="${product.name}" class="product-image">
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
        const minRating = parseFloat(values[0]);
        if (parseFloat(card.dataset.rating) < minRating) show = false;
      } else if (key === 'discount') {
        const minDisc = parseInt(values[0]);
        if (parseInt(card.dataset.discount) < minDisc) show = false;
      } else {
        if (!values.includes(card.dataset[key])) show = false;
      }
    });

    card.style.display = show ? 'flex' : 'none';
  });
}