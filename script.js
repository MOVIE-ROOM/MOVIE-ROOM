// Select elements
const priceCards = document.querySelectorAll('.price-card');
const overlay = document.getElementById('overlay');
const loadingScreen = document.getElementById('loadingScreen');
const emailBtn = document.getElementById('emailBtn');

// Price card click handling
priceCards.forEach(card => {
  card.addEventListener('click', () => {
    // Remove selected from all cards
    priceCards.forEach(c => c.classList.remove('selected'));
    // Add selected to clicked card
    card.classList.add('selected');

    // Handle different plans
    if (card.dataset.plan === 'ultra') {
      overlay.style.display = 'flex';
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 2000);
    } else if (card.dataset.plan === 'free') {
      loadingScreen.style.display = 'flex';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        window.location.href = 'sign in.html';
      }, 2000);
    } else {
      alert(`Selected ${card.dataset.plan} plan!`);
    }
  });
});

// Email button click handling
emailBtn.addEventListener('click', () => {
  const emailInput = document.getElementById('emailInput').value.trim();
  if (emailInput) {
    loadingScreen.style.display = 'flex';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      window.location.href = `sign in.html?email=${encodeURIComponent(emailInput)}`;
    }, 2000);
  } else {
    alert('Please enter your email!');
  }
});

// Sign in link handling
document.getElementById('Sign in Link').onclick = () => {
  window.location.href = 'sign in.html';
};
