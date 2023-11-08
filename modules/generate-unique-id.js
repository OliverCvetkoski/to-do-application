export function generateUniqueId() {
  const id = Math.random().toString(16).slice(2);
  return id;
}
