export function getContactsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("contacts")) || [];
}

export function saveToLocalStorage(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}
