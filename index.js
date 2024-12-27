import { renderContacts } from "./contacts.js";
import { saveToLocalStorage, getContactsFromLocalStorage } from "./storage.js";

// Function detail contact from local storage
export function getContactById(contactId) {
  const contacts = getContactsFromLocalStorage();
  return contacts.find((contact) => contact.id === contactId);
}

// Searching Function
export function searchContacts(contacts, searchQuery) {
  const searchedContacts = contacts.filter((contact) => {
    const formattedPhone = contact.phone.replace(/-/g, "");
    const formattedDate =
      contact.birthdate && !isNaN(new Date(contact.birthdate))
        ? formatDate(contact.birthdate)
        : "";

    return (
      contact.name
        .toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase()) ||
      contact.email
        .toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase()) ||
      formattedPhone
        .toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase()) ||
      formattedDate
        .toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase()) ||
      (contact.isFavorited && "★".includes(searchQuery.toLocaleLowerCase())) ||
      (contact.label || "")
        .toString()
        .toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase())
    );
  });

  if (searchedContacts.length === 0) {
    console.log("Not Found");
    return [];
  }

  return searchedContacts;
}
// Delete Function
function deleteContact(contactId) {
  const isConfirmed = window.confirm(
    "Apakah Anda yakin ingin menghapus kontak ini?"
  );

  if (isConfirmed) {
    console.log("Deleting contact with ID:", contactId);

    const contacts = getContactsFromLocalStorage();
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    saveToLocalStorage(filteredContacts);
    renderContacts([]);

    window.location.href = "/";
  } else {
    console.log("Penghapusan dibatalkan.");
  }
}
window.deleteContact = deleteContact; 
export function formatDate(date) {
  return new Intl.DateTimeFormat("en-UK", {
    dateStyle: "long",
  }).format(new Date(date));
}

export function formatInputDate(date) {
  const formattedDate = new Date(date);
  return formattedDate.toISOString().split("T")[0]; // Format ISO YYYY-MM-DD
}

window.onload = function () {
  const savedContacts = getContactsFromLocalStorage();
  renderContacts(savedContacts);
};
