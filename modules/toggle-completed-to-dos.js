const completedSection = document.querySelector(".completedSection");

let isContainerOpen = true;

export function toggleContainer() {
  if (isContainerOpen) {
    completedSection.classList.add("completedSectionAfter");
  } else {
    completedSection.classList.remove("completedSectionAfter");
  }
  isContainerOpen = !isContainerOpen;
}
