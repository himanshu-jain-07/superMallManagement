// Load and display shop data
fetch('./data/shops.json')
  .then(response => response.json())
  .then(data => {
    window.allShops = data; // Save globally for filtering
    displayShops(data);
    logAction("Shop data loaded.");
  })
  .catch(error => {
    console.error("Error loading shops.json:", error);
    alert("Failed to load shop data.");
  });

// Display all shop cards
function displayShops(shops) {
  const shopList = document.getElementById('shop-list');
  shopList.innerHTML = '';

  if (shops.length === 0) {
    shopList.innerHTML = "<p>No shops found for this category.</p>";
    return;
  }

  shops.forEach(shop => {
    const card = document.createElement('div');
    card.className = 'shop-card';
    card.innerHTML = `
      <h2>${shop.name}</h2>
      <p><strong>Category:</strong> ${shop.category}</p>
      <p><strong>Floor:</strong> ${shop.floor}</p>
      <p><strong>Offers:</strong> ${shop.offers.join(', ')}</p>
      <h4>Products:</h4>
      <ul>
        ${shop.products.map(p => `<li>${p.name} - ₹${p.price} (${p.features})</li>`).join('')}
      </ul>
    `;
    shopList.appendChild(card);
  });
}

// Filter by category
function handleCategoryFilter(category) {
  const filtered = category
    ? window.allShops.filter(shop => shop.category === category)
    : window.allShops;

  logAction(`Filter applied: ${category || "All"}`);
  displayShops(filtered);
}

// Logging function
function logAction(message) {
  const time = new Date().toISOString();
  console.log(`[LOG - ${time}] ${message}`);
}

// Load shops from localStorage
const localShops = JSON.parse(localStorage.getItem("supermall_shops")) || [];

// If you also want to load from JSON file (optional)
fetch('./data/shops.json')
  .then(response => response.json())
  .then(fileShops => {
    const all = [...fileShops, ...localShops]; // combine both
    window.allShops = all;
    displayShops(all);
    logAction("Shops loaded from file and localStorage.");
  })
  .catch(error => {
    window.allShops = localShops;
    displayShops(localShops);
    logAction("Shops loaded only from localStorage (file not found).");
  });

