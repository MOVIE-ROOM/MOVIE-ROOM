// Get elements
const videoPlayer = document.getElementById('videoPlayer');
const videoSource = document.getElementById('videoSource');
const downloadButton = document.getElementById('downloadButton');
const closeModal = document.getElementById('closeModal');

// Get video URL from query parameter
const urlParams = new URLSearchParams(window.location.search);
const videoUrl = urlParams.get('video');
const downloadUrl = urlParams.get('download') || videoUrl;

// Play video if URL is valid
if (videoUrl) {
  videoSource.src = videoUrl;
  videoPlayer.load();
  downloadButton.onclick = () => window.open(downloadUrl, '_blank');
} else {
  alert('No video specified!');
  window.location.href = "index.html"; // fallback
}

// Close button action
closeModal.addEventListener('click', () => {
  videoPlayer.pause();
  window.location.href = "Home.html";
});
