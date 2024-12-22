import { addContact, getContactsFromLocalStorage, renderContacts } from "../index.js";

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

    const savedContacts = getContactsFromLocalStorage();
    addContact(savedContacts, newContact);
    addContactFormElement.reset();

    // Redirect atau perbarui tampilan
    renderContacts(savedContacts);
    window.location.href = "/";
  });
}
