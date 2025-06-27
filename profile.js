const profilePicture = document.getElementById('profilePicture');
const avatarModal = document.getElementById('avatarModal');
const getStartedBtn = document.getElementById('getStartedBtn');
const nextBtn = document.getElementById('nextBtn');
const backBtn = document.getElementById('backBtn');

// Age dropdown
const ageSelect = document.getElementById('age');
for (let i = 1; i <= 18; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.text = i;
  ageSelect.appendChild(option);
}

// Show avatar modal on profile picture click
profilePicture.addEventListener('click', () => {
  avatarModal.classList.remove('hidden');
});

// Set profile image and hide modal
function setProfileImage(src) {
  profilePicture.style.backgroundImage = `url(${src})`;
  avatarModal.classList.add('hidden');
}

// Validate if all credentials are complete
function validateForm() {
  const fields = [
    'firstName', 'middleName', 'lastName',
    'email', 'age', 'password', 'address'
  ];
  return fields.every(id => document.getElementById(id).value.trim() !== '');
}

// Check credentials on input change
document.querySelectorAll('.settings-panel input, .settings-panel select').forEach(input => {
  input.addEventListener('input', () => {
    if (validateForm() && profilePicture.style.backgroundImage) {
      getStartedBtn.disabled = false;
      getStartedBtn.classList.add('active');
    } else {
      getStartedBtn.disabled = true;
      getStartedBtn.classList.remove('active');
    }
  });
});

// Next button functionality
getStartedBtn.addEventListener('click', () => {
  if (!validateForm()) {
    alert('Please fill in all fields before proceeding!');
    return;
  }
  document.querySelectorAll('.settings-panel input, .settings-panel select').forEach(el => el.disabled = true);
  nextBtn.style.display = 'inline-block';
  backBtn.style.display = 'inline-block';
  getStartedBtn.style.display = 'none';
});

// Back button functionality
backBtn.addEventListener('click', () => {
  document.querySelectorAll('.settings-panel input, .settings-panel select').forEach(el => el.disabled = false);
  nextBtn.style.display = 'none';
  backBtn.style.display = 'none';
  getStartedBtn.style.display = 'inline-block';
});

// Next button final action (e.g., submit or show confirmation)
nextBtn.addEventListener('click', () => {
  alert('All credentials look correct! Proceeding...');
  // You can redirect to another page here
   window.location.href = "Home.html";
});
