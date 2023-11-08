let currentErrorMsg = null;
let createdErrorMsg = false;

export function errorMsg() {
  if (createdErrorMsg) {
    return;
  }
  createdErrorMsg = true;

  if (currentErrorMsg) {
    currentErrorMsg.remove();
  }
  const invalidInput = document.createElement("div");
  invalidInput.classList.add("errorMsg");
  invalidInput.innerHTML = "Both fields cant be 0";
  document.body.appendChild(invalidInput);

  setTimeout(() => {
    invalidInput.style.opacity = "1";
  }, 10);

  setTimeout(() => {
    invalidInput.remove();
    currentErrorMsg = null;
    createdErrorMsg = false;
  }, 1500);

  currentErrorMsg = invalidInput;
}
