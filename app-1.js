//product filter

function filterProducts() {
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');
  const noResults = document.getElementById('noResults');

  if (!searchInput || !categorySelect) return;

  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categorySelect.value;
  const productCards = document.querySelectorAll('.product-card');

  let visibleCount = 0;

  productCards.forEach((card) => {
    const nameEl = card.querySelector('.product-name');
    const descEl = card.querySelector('.product-desc');

    const name = nameEl ? nameEl.textContent.toLowerCase() : '';
    const description = descEl ? descEl.textContent.toLowerCase() : '';
    const category = card.getAttribute('data-category');

    const matchesSearch = searchTerm === '' || name.includes(searchTerm) || description.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

    if (matchesSearch && matchesCategory) {
      card.hidden = false;
      visibleCount++;
    } else {
      card.hidden = true;
    }
  });

  if (noResults) {
    noResults.hidden = visibleCount > 0;
  }

  updateGrandTotal();
}

// Updates total price for an individual product card based on quantity input.
function updateTotal(qtyInput) {
  if (!qtyInput) return;
  const card = qtyInput.closest('.product-card');
  if (!card) return;

  const price = Number(card.getAttribute('data-price')) || 0;
  const totalSpan = card.querySelector('.total-value');

  let quantity = Number(qtyInput.value);

  // Validate quantity input
  if (!quantity || quantity < 1) {
    quantity = 1;
    qtyInput.value = 1;
  } else {
    quantity = Math.floor(quantity);
    qtyInput.value = quantity;
  }

  const total = price * quantity;

  if (totalSpan) {
    totalSpan.textContent = total.toLocaleString('en-KE');
  }

  updateGrandTotal();
}

// Calculates and updates the grand total price across all visible catalog items.

function updateGrandTotal() {
  const visibleCards = document.querySelectorAll('.product-card:not([hidden])');
  if (visibleCards.length === 0) return;

  let grandTotal = 0;

  visibleCards.forEach((card) => {
    const price = Number(card.getAttribute('data-price')) || 0;
    const qtyInput = card.querySelector('.qty-input');
    const quantity = qtyInput ? (Number(qtyInput.value) || 1) : 1;

    grandTotal += price * quantity;
  });

  const grandTotalSpan = document.getElementById('grandTotalValue');
  if (grandTotalSpan) {
    grandTotalSpan.textContent = grandTotal.toLocaleString('en-KE');
  }
}



document.addEventListener('DOMContentLoaded', () => {
  // Initial total calculation if on catalog page
  if (document.querySelector('.product-card')) {
    updateGrandTotal();
  }

  // Password Visibility Toggle Logic
  const togglePasswordBtn = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');

  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      togglePasswordBtn.textContent = isPassword ? 'Hide' : 'Show';
      togglePasswordBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });
  }

  // Registration Form Validation Logic
  const registerForm = document.getElementById('registerForm');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      clearErrors();

      const fullNameEl = document.getElementById('fullName');
      const emailEl = document.getElementById('email');
      const confirmPasswordEl = document.getElementById('confirmPassword');

      const fullName = fullNameEl ? fullNameEl.value.trim() : '';
      const email = emailEl ? emailEl.value.trim() : '';
      const password = passwordInput ? passwordInput.value : '';
      const confirmPassword = confirmPasswordEl ? confirmPasswordEl.value : '';

      let isValid = true;

      // Full Name Validation
      if (fullName.length < 2) {
        showError('fullNameError', 'Please enter your full name (minimum 2 characters).');
        isValid = false;
      }

      // Email Validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showError('emailError', 'Please enter a valid campus email address.');
        isValid = false;
      }

      // Password Length Validation
      if (password.length < 8) {
        showError('passwordError', 'Password must be at least 8 characters long.');
        isValid = false;
      }

      // Confirm Password Matching
      if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match.');
        isValid = false;
      }

      if (isValid) {
        const formSuccess = document.getElementById('formSuccess');
        if (formSuccess) {
          formSuccess.hidden = false;
        }
        registerForm.reset();
        if (togglePasswordBtn && passwordInput) {
          passwordInput.type = 'password';
          togglePasswordBtn.textContent = 'Show';
        }
      }
    });
  }
});

// Helper utilities for form validation
function showError(elementId, message) {
  const errorEl = document.getElementById(elementId);
  if (errorEl) {
    errorEl.textContent = message;
  }
}

function clearErrors() {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach((el) => {
    el.textContent = '';
  });

  const formSuccess = document.getElementById('formSuccess');
  if (formSuccess) {
    formSuccess.hidden = true;
  }
}
