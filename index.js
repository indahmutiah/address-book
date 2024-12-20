let dataContacts = [
  {
    id: 1,
    name: "Indah Mutiah Utami",
    email: "indahmutiah@example.com",
    phone: "+62 812-1229-5678",
    birthdate: new Date("1998-06-28"),
    is_favorite: true,
    label: ["Family"],
  },
  {
    id: 2,
    name: "Mohammad Salahuddin",
    email: "salahuddin@example.com",
    phone: "+62 878-7889-5678",
    birthdate: new Date("1989-10-20"),
    is_favorite: false,
    label: ["Friend", "Work"],
  },
  {
    id: 3,
    name: "Insani Marjan",
    email: "insani@example.com",
    phone: "+62 889-3529-5678",
    birthdate: new Date("1993-03-13"),
    is_favorite: false,
    label: ["Others"],
  },
  {
    id: 4,
    name: "Sarah Julia",
    email: "sarah@example.com",
    phone: "+62 890-1234-5678",
    birthdate: new Date("1996-04-30"),
    is_favorite: true,
    label: ["Friend", "Work"],
  },
  {
    id: 5,
    name: "Eko Soejener",
    email: "eko@example.com",
    phone: "+62 891-2345-5678",
    birthdate: new Date("2003-12-09"),
    is_favorite: true,
    label: ["Family", "Others"],
  },
];

saveToLocalStorage(dataContacts);

function getContactsFromLocalStorage() {
  const storedData = localStorage.getItem("contacts");
  if (storedData) {
    return JSON.parse(storedData);
  } else {
    console.log("No contacts found in localStorage.");
    return []; // Return an empty array if no contacts are found
  }
}

// Save Contacts to Local Storage
function saveToLocalStorage(dataContacts) {
  localStorage.setItem("contacts", JSON.stringify(dataContacts));
}

const contactListElement = document.getElementById("contact-list");
function renderContacts(contacts) {
  const contactsTrElements = contacts.map((contact) => {
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
        <td class="p-4 border-b">${contact.label.join(", ")}</td>
        <td class="p-4 border-b">${contact.is_favorite ? "★" : ""}</td>
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
          <button
            class="flex-col items-center justify-center w-8 h-8 rounded-lg bg-yellow-500 border border-gray-300 hover:bg-yellow-400 hover:border-gray-400"
            onclick="viewContact(${contact.id})"
          >
            <i class="fas fa-info-circle"></i>
          </button>
        </td>
      </tr>
    `;
  });
  contactListElement.innerHTML = contactsTrElements.join("");
}

function renderOneContact(contacts, contactId) {
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    console.log("No Contact found");
    return;
  }
  renderContacts([contact]);
}


// Searching Function
function searchContacts(contact, searchTerm) {
  const searchingContacts = contact.filter((contact) => {
    return (
      contact.name
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      contact.email
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      contact.phone
        .replace(/-/g, "")
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      new Intl.DateTimeFormat("en-UK", {
        dateStyle: "long",
        timeStyle: "short",
      })
        .format(contact.birthdate)
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      (contact.is_favorite
        ? "★".includes(searchTerm.toLocaleLowerCase())
        : false) ||
      contact.label.some((label) =>
        label.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
    );
  });
  if (searchingContacts.length === 0) {
    console.log("Not Found");
  } else {
    renderContacts(searchingContacts);
  }
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
    is_favorite: newContactInput.is_favorite,
    label: newContactInput.label,
  };
  const newContacts = [...contacts, newContact];
  dataContacts = newContacts;
  // renderContacts(dataContacts);
  saveToLocalStorage(newContacts);
  renderContacts(newContacts);
}

// Delete Function
function deleteContact(contacts, contactId) {
  const filteredContacts = contacts.filter((contact) => {
    return contact.id !== contactId;
  });
  saveToLocalStorage(filteredContacts);
  renderContacts(filteredContacts);
}

// Update Contact Function
function updateContact(contacts, contactId, updatedContactInput) {
  const currentContact = contacts.find((contact) => {
    return contact.id === contactId;
  });
  const updatedContact = {
    id: contactId,
    name: updatedContactInput.name || currentContact.name,
    email: updatedContactInput.email || currentContact.email,
    phone: updatedContactInput.phone || currentContact.phone,
    birthdate: new Date(
      updatedContactInput.birthdate || currentContact.birthdate
    ),
    is_favorite: updatedContactInput.is_favorite || currentContact.is_favorite,
    label: updatedContactInput.label || currentContact.label,
  };
  const updatedContacts = contacts.map((contact) => {
    if (contact.id === contactId) {
      return updatedContact;
    }
    return contact;
  });
  saveToLocalStorage(updatedContacts);
  renderContacts(updatedContacts);
}

// Searching Contacts
searchContacts(dataContacts, "sarah");

// Add Contact
addContact(dataContacts, {
  name: "Joko Mulyono",
  email: "joko@example.com",
  phone: "+62 890-1234-5678",
  birthdate: new Date("1988-04-30"),
  is_favorite: true,
  label: ["Work"],
});

// Update Contact
updateContact(dataContacts, 2, {
  email: "salahuddin12@example.com",
});

function totalContacts() {
  return dataContacts.length;
}
console.log("Total Contacts: ", totalContacts());
