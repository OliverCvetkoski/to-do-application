export function filterCompletedToDos(completedToDos, searchQuery) {
  return completedToDos.filter((todo) =>
    todo.text.toLowerCase().includes(searchQuery)
  );
}
