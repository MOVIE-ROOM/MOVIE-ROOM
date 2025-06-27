// 1️⃣ Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// 2️⃣ Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBCGeUjhJ5ByelwMHsFbQt_13zVCadFJMA",
  authDomain: "movie-room-90dcf.firebaseapp.com",
  projectId: "movie-room-90dcf",
  storageBucket: "movie-room-90dcf.appspot.com",
  messagingSenderId: "478014791917",
  appId: "1:478014791917:web:2068732e45aab34263ace4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 3️⃣ When the DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('emailInput');

  // Populate email from URL if present
  const urlParams = new URLSearchParams(window.location.search);
  const emailFromURL = urlParams.get('email');
  if (emailFromURL) {
    emailInput.value = emailFromURL;
  }

  // Populate email from localStorage if present
  const savedEmail = localStorage.getItem('userEmail');
  if (savedEmail && !emailInput.value) {
    emailInput.value = savedEmail;
  }

  // 4️⃣ Form submission handler
  const form = document.querySelector('.login-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = document.getElementById('passwordInput').value.trim();

    if (!email || !password) {
      alert('Please enter your email and password.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert('Account addedd successfully! Connecting to home page...');
        localStorage.setItem('userEmail', email); // Save email for future
        window.location.href = "Home.html";
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  });
});
