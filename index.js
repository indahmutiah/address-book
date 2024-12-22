let dataContacts = [
  {
    id: 1,
    name: "Indah Mutiah Utami",
    email: "indahmutiah@example.com",
    phone: "+62 812-1229-5678",
    birthdate: new Date("1998-06-28"),
    isFavorited: true,
    label: "Family",
  },
  {
    id: 2,
    name: "Mohammad Salahuddin",
    email: "salahuddin@example.com",
    phone: "+62 878-7889-5678",
    birthdate: new Date("1989-10-20"),
    isFavorited: false,
    label: "Work",
  },
  {
    id: 3,
    name: "Insani Marjan",
    email: "insani@example.com",
    phone: "+62 889-3529-5678",
    birthdate: new Date("1993-03-13"),
    isFavorited: false,
    label: "Others",
  },
  {
    id: 4,
    name: "Sarah Julia",
    email: "sarah@example.com",
    phone: "+62 890-1234-5678",
    birthdate: new Date("1996-04-30"),
    isFavorited: true,
    label: "Friend",
  },
  {
    id: 5,
    name: "Eko Soejener",
    email: "eko@example.com",
    phone: "+62 891-2345-5678",
    birthdate: new Date("2003-12-09"),
    isFavorited: true,
    label: "Family",
  },
];

// Save Contacts to Local Storage
function saveToLocalStorage(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function getContactsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("contacts")) || [];
}

function renderContacts(contacts) {
  const contactListElement = document.getElementById("contact-list");
  if (!contactListElement) {
    console.warn("Element with id 'contact-list' not found. Skipping rendering.");
    return;
  }
  const contactsTableRowElements = contacts.map((contact) => {
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
            onclick="editContact(${contact.id})"
          >
            <i class="fas fa-edit"></i>
          </button>
          <button
            class="flex-col items-center justify-center w-8 h-8 rounded-lg bg-red-600 border border-gray-300 hover:bg-red-500 hover:border-gray-400"
            onclick="deleteContact(${contact.id})"
          >
            <i class="fas fa-trash"></i>
          </button>

         <a href="/contacts/?id=1"
            class="flex-col items-center justify-center w-8 h-8 rounded-lg bg-yellow-500 border border-gray-300 hover:bg-yellow-400 hover:border-gray-400"
          >
            <i class="fas fa-info-circle"></i> View
          </a>
        </td>
      </tr>
    `;
  });
  contactListElement.innerHTML = contactsTableRowElements.join("");
}

function renderOneContact(contacts, contactId) {
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    console.log("No Contact found");
    return;
  }
  renderContacts([contact]);
}

// Add Contact Function
function generateId(contacts) {
  return contacts[contacts.length - 1].id + 1;
}

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
  dataContacts = newContacts;
  // renderContacts(dataContacts);
  saveToLocalStorage(newContacts);
  renderContacts(newContacts);
}

function totalContacts() {
  return dataContacts.length;
}
console.log("Total Contacts: ", totalContacts());

renderContacts(dataContacts);

// // Searching Function
// function searchContacts(contact, searchTerm) {
//   const searchingContacts = contact.filter((contact) => {
//     return (
//       contact.name
//         .toLocaleLowerCase()
//         .includes(searchTerm.toLocaleLowerCase()) ||
//       contact.email
//         .toLocaleLowerCase()
//         .includes(searchTerm.toLocaleLowerCase()) ||
//       contact.phone
//         .replace(/-/g, "")
//         .toLocaleLowerCase()
//         .includes(searchTerm.toLocaleLowerCase()) ||
//       new Intl.DateTimeFormat("en-UK", {
//         dateStyle: "long",
//         timeStyle: "short",
//       })
//         .format(contact.birthdate)
//         .toLocaleLowerCase()
//         .includes(searchTerm.toLocaleLowerCase()) ||
//       (contact.isFavorited
//         ? "★".includes(searchTerm.toLocaleLowerCase())
//         : false) ||
//       contact.label.some((label) =>
//         label.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
//       )
//     );
//   });
//   if (searchingContacts.length === 0) {
//     console.log("Not Found");
//   } else {
//     renderContacts(searchingContacts);
//   }
// }

// // Update Contact Function
// function updateContact(contacts, contactId, updatedContactInput) {
//   const currentContact = contacts.find((contact) => {
//     return contact.id === contactId;
//   });
//   const updatedContact = {
//     id: contactId,
//     name: updatedContactInput.name || currentContact.name,
//     email: updatedContactInput.email || currentContact.email,
//     phone: updatedContactInput.phone || currentContact.phone,
//     birthdate: new Date(
//       updatedContactInput.birthdate || currentContact.birthdate
//     ),
//     isFavorited: updatedContactInput.isFavorited || currentContact.isFavorited,
//     label: updatedContactInput.label || currentContact.label,
//   };
//   const updatedContacts = contacts.map((contact) => {
//     if (contact.id === contactId) {
//       return updatedContact;
//     }
//     return contact;
//   });
//   saveToLocalStorage(updatedContacts);
//   renderContacts(updatedContacts);
// }

// // Delete Function
// function deleteContact(contacts, contactId) {
//   const filteredContacts = contacts.filter((contact) => {
//     return contact.id !== contactId;
//   });
//   saveToLocalStorage(filteredContacts);
//   renderContacts(filteredContacts);
// }

// // Searching Contacts
// searchContacts(dataContacts, "sarah");

// // Add Contact
// addContact(dataContacts, {
//   name: "Joko Mulyono",
//   email: "joko@example.com",
//   phone: "+62 890-1234-5678",
//   birthdate: new Date("1988-04-30"),
//   isFavorited: true,
//   label: ["Work"],
// });

// // Update Contact
// updateContact(dataContacts, 2, {
//   email: "salahuddin12@example.com",
// });
