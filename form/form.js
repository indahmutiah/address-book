import { saveToLocalStorage, getContactsFromLocalStorage } from "../storage.js";
import { generateId, renderContacts } from "../contacts.js";
import { getContactById, formatInputDate } from "../index.js";

function addContact(contacts, newContactInput) {
  const newContact = {
    id: generateId(contacts),
    name: newContactInput.name,
    email: newContactInput.email,
    phone: newContactInput.phone,
    birthdate: new Date(newContactInput.birthdate),
    isFavorited: newContactInput.isFavorited,
    label: newContactInput.label,
  };
  const newContacts = [...contacts, newContact];

  saveToLocalStorage(newContacts);
  renderContacts(newContacts);
}

const addContactFormElement = document.getElementById("contact-form");

if (addContactFormElement) {
  addContactFormElement.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(addContactFormElement);
    const newContact = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      birthdate: formData.get("birthdate"),
      label: formData.get("label"),
      isFavorited: formData.get("isFavorited") === "on",
    };

    // console.log({ formData });

    const savedContacts = getContactsFromLocalStorage();
    addContact(savedContacts, newContact);
    addContactFormElement.reset();

    // Redirect atau perbarui tampilan
    renderContacts(savedContacts);
    window.location.href = "/";
  });
}

// update function
function updateContactForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const contactId = parseInt(urlParams.get("id"), 10);

  const contact = getContactById(contactId);
  console.log("Ini Contact ID", contactId);

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
  console.log("Current Contact:", currentContact);

  if (!currentContact) {
    console.error("Kontak tidak ditemukan.");
    return false;
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

  // window.location.href = "/"; // Back to home
}
