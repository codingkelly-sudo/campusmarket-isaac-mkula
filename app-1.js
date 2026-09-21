function filterProducts() {
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  const selectedCategory = document.getElementById('categorySelect').value;
  const productCards = document.querySelectorAll('.product-card');
  const noResults = document.getElementById('noResults');

  let visibleCount = 0;

  for (let i = 0; i < productCards.length; i++) {
    const card = productCards[i];
    const name = card.querySelector('.product-name').textContent.toLowerCase();
    const description = card.querySelector('.product-desc').textContent.toLowerCase();
    const category = card.getAttribute('data-category');

    const matchesSearch = searchTerm === '' || name.includes(searchTerm) || description.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

    if (matchesSearch && matchesCategory) {
      card.hidden = false;
      visibleCount++;
    } else {
      card.hidden = true;
    }
  }

  if (visibleCount === 0) {
    noResults.hidden = false;
  } else {
    noResults.hidden = true;
  }
}

function updateTotal(qtyInput) {
  const card = qtyInput.closest('.product-card');
  const price = Number(card.getAttribute('data-price'));
  const totalSpan = card.querySelector('.total-value');

  let quantity = Number(qtyInput.value);

  if (!quantity || quantity < 1) {
    quantity = 1;
    qtyInput.value = 1;
  }

  const total = price * quantity;
  totalSpan.textContent = total.toLocaleString('en-KE');
}
