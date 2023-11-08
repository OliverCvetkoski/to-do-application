export function addCompletedTodoToLocalStorage(todo) {
  const storedCompletedTodos = localStorage.getItem("completedToDos");
  let existingCompletedToDos = [];

  if (storedCompletedTodos) {
    existingCompletedToDos = JSON.parse(storedCompletedTodos);
  }

  existingCompletedToDos.push(todo);

  localStorage.setItem(
    "completedToDos",
    JSON.stringify(existingCompletedToDos)
  );
}
