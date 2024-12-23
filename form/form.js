import { saveToLocalStorage, getContactsFromLocalStorage } from "../storage.js";
import { generateId, renderContacts } from "../contacts.js";

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

    console.log({ formData });

    const savedContacts = getContactsFromLocalStorage();
    addContact(savedContacts, newContact);
    addContactFormElement.reset();

    // Redirect atau perbarui tampilan
    renderContacts(savedContacts);
    window.location.href = "/";
  });
}
