const feedbackDiv = document.querySelector(".feedbackDiv");

let feedbackTimer;

export function showFeedbackMessage(message, backgroundColor) {
  const loadingSpinner = document.createElement("div");
  loadingSpinner.classList.add("loading");
  feedbackDiv.innerText = message;
  feedbackDiv.style.backgroundColor = backgroundColor;
  feedbackDiv.appendChild(loadingSpinner);

  if (feedbackTimer) {
    clearTimeout(feedbackTimer);
  }

  feedbackDiv.style.opacity = "1";
  loadingSpinner.style.display = "flex";

  feedbackTimer = setTimeout(() => {
    feedbackDiv.style.opacity = "0";
  }, 1500);
}
