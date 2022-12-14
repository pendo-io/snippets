const progressContainer = document.querySelector('.progress-container');

// initial call
setPercentage();

function setPercentage() {
  const percentage = progressContainer.getAttribute('data-percentage') + '%';
  
  const progressEl = progressContainer.querySelector('.progress');
  const percentageEl = progressContainer.querySelector('.percentage');
  
  progressEl.style.width = percentage;
  percentageEl.innerText = percentage;
  percentageEl.style.left = percentage;
}