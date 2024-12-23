import { renderContacts } from "./contacts.js";
import { saveToLocalStorage, getContactsFromLocalStorage } from "./storage.js";

renderContacts();

// Function detail contact from local storage
export function getContactById(contactId) {
  const contacts = getContactsFromLocalStorage();
  return contacts.find((contact) => contact.id === contactId);
}

function totalContacts() {
  return getContactsFromLocalStorage().length;
}
console.log("Total Contacts: ", totalContacts());

window.onload = function () {
  const savedContacts = getContactsFromLocalStorage();
  renderContacts(savedContacts);
};

// Searching Function
export function searchContacts(contacts, searchQuery) {
  console.log(contacts);

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

function formatDate(date) {
  return new Intl.DateTimeFormat("en-UK", {
    dateStyle: "long",
  }).format(new Date(date));
}

function formatInputDate(date) {
  const formattedDate = new Date(date);
  return formattedDate.toISOString().split("T")[0]; // Format ISO YYYY-MM-DD
}

// update function
function updateContactForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const contactId = parseInt(urlParams.get("id"), 10);

  const contact = getContactById(contactId);

  const nameElement = document.getElementById("name");
  if (nameElement) {
    nameElement.value = contact.name || "";
  }

  const emailElement = document.getElementById("email");
  if (emailElement) {
    emailElement.value = contact.email || "";
  }

  const phoneElement = document.getElementById("phone");
  if (phoneElement) {
    phoneElement.value = contact.phone || "";
  }

  const birthdateElement = document.getElementById("birthdate");
  if (birthdateElement) {
    birthdateElement.value = formatInputDate(contact.birthdate) || "";
  }

  const isFavoritedElement = document.getElementById("isFavorited");
  if (isFavoritedElement) {
    isFavoritedElement.checked = contact.isFavorited || false;
  }

  const labelElement = document.getElementById("label");
  if (labelElement) {
    labelElement.value = contact.label || "";
  }
}

window.onload = function () {
  updateContactForm();
};

function updateContact(event) {
  event.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const contactId = parseInt(urlParams.get("id"), 10);
  const contacts = getContactsFromLocalStorage();

  const currentContact = contacts.find((contact) => contact.id === contactId);

  if (!currentContact) {
    console.error("Kontak tidak ditemukan.");
    return;
  }

  // Update data kontak dengan input baru
  const updatedContact = {
    id: contactId,
    name: document.getElementById("name").value || currentContact.name,
    email: document.getElementById("email").value || currentContact.email,
    phone: document.getElementById("phone").value || currentContact.phone,
    birthdate:
      document.getElementById("birthdate").value || currentContact.birthdate,
    isFavorited: document.getElementById("isFavorited").checked,
    label: document.getElementById("label").value || currentContact.label,
  };

  // Update kontak di dalam array
  const updatedContacts = contacts.map((contact) =>
    contact.id === contactId ? updatedContact : contact
  );

  saveToLocalStorage(updatedContacts);
  renderContacts(updatedContacts);

  window.location.href = "/"; // Back to home
}
