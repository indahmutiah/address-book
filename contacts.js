import { getContactsFromLocalStorage } from "./storage.js";

export function generateId(contacts) {
  if (contacts.length === 0) {
    return 1;
  }
  return contacts[contacts.length - 1].id + 1;
}

export function renderOneContact(contacts, contactId) {
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    console.log("No Contact found");
    return;
  }
  renderContacts([contact]);
}

export function renderContacts() {
  const contactListElement = document.getElementById("contact-list");
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("q");

  const allContacts = getContactsFromLocalStorage();

  const searchToDisplay = searchQuery
    ? searchContacts(allContacts, searchQuery)
    : allContacts;

  if (!contactListElement) {
    console.warn(
      "Element with id 'contact-list' not found. Skipping rendering."
    );
    return;
  }

  const contactsTableRowElements = searchToDisplay.map((contact) => {
    const formattedPhone = contact.phone.replace(/-/g, "");
    const formattedDate = new Intl.DateTimeFormat("en-UK", {
      dateStyle: "long",
    }).format(new Date(contact.birthdate));

    return `
      <tr>
        <td class="p-4 border-b">
          <input type="checkbox" class="contact-checkbox" />
        </td>
        <td class="p-4 border-b">${contact.name}</td>
        <td class="p-4 border-b">${formattedPhone}</td>
        <td class="p-4 border-b">${contact.email}</td>
        <td class="p-4 border-b">${formattedDate}</td>
        <td class="p-4 border-b">${contact.label || ""}</td>
        <td class="p-4 border-b">${
          contact.isFavorited
            ? '<i class="fas fa-star text-yellow-400"></i>'
            : ""
        }</td>
        <td class="p-4 border-b">
          <button
            class="flex-col items-center justify-center w-8 h-8 rounded-lg bg-blue-500 border border-gray-300 hover:bg-blue-400 hover:border-gray-400"
            onclick="window.location.href='/form/update-contact.html?id=${
              contact.id
            }'"
          >
            <i class="fas fa-edit"></i>
          </button>
          <button
            class="flex-col items-center justify-center w-8 h-8 rounded-lg bg-red-600 border border-gray-300 hover:bg-red-500 hover:border-gray-400"
            onclick="deleteContact(${contact.id})"
          >
            <i class="fas fa-trash"></i>
          </button>

         <a href="/detail-contact/?id=${contact.id}"
            class="flex-col items-center justify-center w-8 h-8 py-2 px-2 rounded-lg bg-yellow-500 border border-gray-300 hover:bg-yellow-400 hover:border-gray-400"
          >
            <i class="fas fa-info-circle"></i> Detail
          </a>
        </td>
      </tr>
    `;
  });
  contactListElement.innerHTML = contactsTableRowElements.join("");
}
