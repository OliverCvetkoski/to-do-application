import { formatTime } from "./modules/format-time.js";
import { toggleContainer } from "./modules/toggle-completed-to-dos.js";
import { showCompletedToDos } from "./modules/render-completed-to-dos.js";
import { errorMsg } from "./modules/error-msg.js";
import { generateUniqueId } from "./modules/generate-unique-id.js";
import { showFeedbackMessage } from "./modules/feedback-msg.js";
import { addCompletedTodoToLocalStorage } from "./modules/add-completed-to-LS.js";
import { removeToDoFromLocalStorage } from "./modules/remove-from-LS.js";

class ToDoApp {
  toDos = [];
  completedToDos = [];

  constructor() {
    // Initializing query selectors and event listeners.
    this.initializeQuerySelectors();
    this.initializeEventListeners();
  }

  // Function for handling form submission, and adding it to local storage.

  handleFormSubmit(e) {
    e.preventDefault();

    const todoText = this.input.value.trim();
    const hours = parseInt(this.timeInput.value, 10);
    const minutes = parseInt(this.minutesInput.value, 10);

    if (todoText === "" || (hours === 0 && minutes === 0)) {
      errorMsg();
      return;
    }

    const totalTimeInSeconds = hours * 3600 + minutes * 60;

    const addedTimestamp = Date.now();

    const newToDo = {
      id: generateUniqueId(),
      text: todoText,
      timerId: null,
      addedTimestamp: addedTimestamp,
      totalTime: totalTimeInSeconds,
      remainingTime: totalTimeInSeconds,
    };

    this.toDos.push(newToDo);
    this.renderToDoItem(newToDo);
    this.input.value = "";
    this.timeInput.value = "";
    this.minutesInput.value = "";
    localStorage.setItem("toDo", JSON.stringify(this.toDos));
  }

  // Rendering the to-do on the page with a delete and completed button and a timer.

  renderToDoItem(todo) {
    const listItem = document.createElement("li");
    listItem.textContent = todo.text;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttonsDiv");
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "x";
    deleteBtn.addEventListener("click", () => this.deleteToDoItem(todo));

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.innerHTML = "\u2713";
    completeBtn.addEventListener("click", () => this.addToCompleted(todo));

    const timerDisplay = document.createElement("div");
    timerDisplay.className = "timer";
    const updateTimerDisplay = () => {
      timerDisplay.textContent = `Remaining Time - ${formatTime(
        todo.remainingTime
      )}`;
    };

    if (todo.timerId !== null) {
      clearInterval(todo.timerId);
    }

    updateTimerDisplay();

    buttonsDiv.append(deleteBtn, completeBtn);
    listItem.appendChild(buttonsDiv);
    this.toDoList.append(listItem, timerDisplay);

    todo.timerId = setInterval(() => {
      if (todo.timerId !== null) {
        if (todo.remainingTime <= 0) {
          clearInterval(todo.timerId);
          todo.timerId = null;
        } else {
          todo.remainingTime -= 1;
          timerDisplay.textContent = `Remaining Time - ${formatTime(
            todo.remainingTime
          )}`;
        }
      }
    }, 1000);
  }

  // Function for getting to-dos from local storage if there are any saved there.

  toDosFromLocalStorage() {
    const storedTodos = localStorage.getItem("toDo");

    if (storedTodos) {
      const toDos = JSON.parse(storedTodos);

      toDos.forEach((todo) => {
        // Calculate remaining time based on the added timestamp
        const elapsedMilliseconds = Date.now() - todo.addedTimestamp;
        const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
        const remainingTime = Math.max(todo.totalTime - elapsedSeconds, 0);

        todo.remainingTime = remainingTime;
        this.toDos.push(todo);
        this.renderToDoItem(todo);
      });
    }
  }

  // Function for removing the to-do from the array.

  removeFromArray(id, sourceArray, destinationArray) {
    const index = sourceArray.findIndex((item) => item.id === id);
    if (index !== -1) {
      const removedItem = sourceArray.splice(index, 1);
      if (destinationArray) {
        destinationArray.push(removedItem[0]);
      }
      this.updateToDoList();
    }
  }

  // Function for adding the to-do to the completed list.

  addToCompleted(todo) {
    removeToDoFromLocalStorage(todo.id);
    this.removeFromArray(todo.id, this.toDos, this.completedToDos);
    showFeedbackMessage("Task completed", "rgb(1, 168, 1)");
    addCompletedTodoToLocalStorage(todo);
    this.updateToDoList();
  }

  // Function for deleting the to-do from the array.

  deleteToDoItem(todo) {
    removeToDoFromLocalStorage(todo.id);
    this.removeFromArray(todo.id, this.toDos, this.completedToDos);
    showFeedbackMessage("Task Deleted", "rgb(255, 0, 0)");
    this.updateToDoList();
  }

  // Function for updating the to-do list.

  updateToDoList() {
    this.toDoList.innerHTML = "";
    this.toDos.forEach((todo) => this.renderToDoItem(todo));
  }

  // Function for initializing the query selectors.

  initializeQuerySelectors() {
    this.searchInput = document.querySelector(".searchInput");
    this.toDoList = document.querySelector(".toDoList");
    this.form = document.querySelector(".form");
    this.minutesInput = document.querySelector(".minutes-input");
    this.input = document.querySelector(".text-input");
    this.timeInput = document.querySelector(".hour-input");
    this.closeCompletedBtn = document.querySelector(".onCloseBtn");
    this.showCompletedToDos = document.querySelector(".completedBtn");
  }

  // Function for initializing the event listeners.

  initializeEventListeners() {
    this.showCompletedToDos.addEventListener("click", () => {
      showCompletedToDos();
      toggleContainer();
    });

    this.closeCompletedBtn.addEventListener("click", () => {
      toggleContainer();
    });

    this.form.addEventListener("submit", this.handleFormSubmit.bind(this));

    this.searchInput.addEventListener("input", () => {
      showCompletedToDos();
    });
  }
}

// Creating the class ToDoApp.

const app = new ToDoApp();

// Getting the todos from the local storage and rendering them to the page.

app.toDosFromLocalStorage();
