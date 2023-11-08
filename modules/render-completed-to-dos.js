import { filterCompletedToDos } from "./filter-completed-to-dos.js";

const searchInput = document.querySelector(".searchInput");
const completedTasksList = document.querySelector(".completed-tasks-list");

export function showCompletedToDos() {
  completedTasksList.innerHTML = "";
  const searchQuery = searchInput.value.trim().toLowerCase();
  const storedCompletedTodos = localStorage.getItem("completedToDos");

  if (storedCompletedTodos) {
    const completedToDos = JSON.parse(storedCompletedTodos);
    const filteredToDos = filterCompletedToDos(completedToDos, searchQuery);

    filteredToDos.forEach((todo) => {
      const container = document.createElement("div");
      const listItem = document.createElement("li");
      listItem.textContent = todo.text;
      container.appendChild(listItem);
      completedTasksList.appendChild(container);
    });
  }
}
