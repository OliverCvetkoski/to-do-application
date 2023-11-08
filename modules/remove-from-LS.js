export function removeToDoFromLocalStorage(todoId) {
  const storedTodos = localStorage.getItem("toDo");

  if (storedTodos) {
    const toDos = JSON.parse(storedTodos);
    const indexToDelete = toDos.findIndex((item) => item.id === todoId);

    if (indexToDelete !== -1) {
      toDos.splice(indexToDelete, 1);
      localStorage.setItem("toDo", JSON.stringify(toDos));
    }
  }
}
