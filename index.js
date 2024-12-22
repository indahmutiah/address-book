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
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("q");

  const localStorageContacts = getContactsFromLocalStorage();

  const allContacts = [...contacts, ...localStorageContacts].filter(
    (contact, index, self) =>
      index === self.findIndex((c) => c.id === contact.id)
  );

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
            onclick="window.location.href='/form/update-contact.html?id=${contact.id}'"
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
  return getContactsFromLocalStorage().length;
}
console.log("Total Contacts: ", totalContacts());

renderContacts(dataContacts);
window.onload = function () {
  const savedContacts = getContactsFromLocalStorage();
  renderContacts(savedContacts);
};

// Searching Function
function searchContacts(contacts, searchQuery) {
  const searchedContacts = contacts.filter((contact) => {
    const formattedPhone = contact.phone.replace(/-/g, "");
    const formattedDate =
      contact.birthdate && !isNaN(new Date(contact.birthdate))
        ? new Intl.DateTimeFormat("en-UK", {
            dateStyle: "long",
          }).format(new Date(contact.birthdate))
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
      contact.label
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

    alert("Kontak berhasil dihapus.");
    window.location.href = "/";
  } else {
    console.log("Penghapusan dibatalkan.");
  }
}
window.deleteContact = deleteContact;

// Function detail contact from local storage 
function getContactById(contactId) {
  const contacts = getContactsFromLocalStorage();
  return contacts.find((contact) => contact.id === contactId);
}

function renderContactDetail(contact) {
  if (!contact) {
    console.error("Contact not found.");
    return;
  }
  const contactDetailElement = document.getElementById("contact-detail");
  const formattedPhone = contact.phone ? contact.phone.replace(/-/g, "") : "Make Sure Format Phone";;
  const formattedDate = new Intl.DateTimeFormat("en-UK", {
    dateStyle: "long",
  }).format(new Date(contact.birthdate));

  contactDetailElement.innerHTML = `
    <h2 class="text-2xl font-semibold text-slate-900">${contact.name}</h2>
    <p class="text-lg text-slate-600 mt-2"><strong>Email:</strong> ${
      contact.email
    }</p>
    <p class="text-lg text-slate-600 mt-2"><strong>Phone:</strong> ${formattedPhone}</p>
    <p class="text-lg text-slate-600 mt-2"><strong>Birthdate:</strong> ${formattedDate}</p>
    <p class="text-lg text-slate-600 mt-2"><strong>Label:</strong> ${
      contact.label || "Tidak ada"
    }</p>
    <p class="text-lg text-slate-600 mt-2"><strong>Favorited:</strong> ${
      contact.isFavorited ? '<i class="fas fa-star text-yellow-400"></i>' : ""
    }</p>
  `;
}

function showContactFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const contactId = parseInt(urlParams.get("id"), 10);

  const contact = getContactById(contactId);
  renderContactDetail(contact);
}
window.onload = showContactFromUrl;

// update function
// function updateContactForm() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const contactId = parseInt(urlParams.get("id"), 10);

//   if (!contactId) {
//     console.error("ID tidak valid.");
//     return;
//   }

//   const contact = getContactById(contactId);
//   if (!contact) {
//     console.error("Kontak tidak ditemukan.");
//     return;
//   }

//   // Check if the elements exist before setting their values
//   function getContactById(contactId) {
//   const contacts = getContactsFromLocalStorage(); // atau sumber data lainnya
//   const contact = contacts.find(c => c.id === contactId);
//   console.log(contact);  // Cek apakah data ditemukan
//   return contact;
// }


//   const nameElement = document.getElementById("name");
//   if (nameElement) {
//     nameElement.value = contact.name || "";
//   }

//   const emailElement = document.getElementById("email");
//   if (emailElement) {
//     emailElement.value = contact.email || "";
//   }

//   const phoneElement = document.getElementById("phone");
//   if (phoneElement) {
//     phoneElement.value = contact.phone || "";
//   }

//   const birthdateElement = document.getElementById("birthdate");
//   if (birthdateElement) {
//     birthdateElement.value = contact.birthdate
//       ? new Date(contact.birthdate).toISOString().split("T")[0]
//       : "";
//   }

//   const isFavoritedElement = document.getElementById("isFavorited");
//   if (isFavoritedElement) {
//     isFavoritedElement.checked = contact.isFavorited || false;
//   }

//   const labelElement = document.getElementById("label");
//   if (labelElement) {
//     labelElement.value = contact.label || "";
//   }
// }

// window.onload = updateContactForm;


// function updateContact(event) {
//   event.preventDefault();

//   const urlParams = new URLSearchParams(window.location.search);
//   const contactId = parseInt(urlParams.get("id"), 10);
//   const contacts = getContactsFromLocalStorage();

//   const currentContact = contacts.find((contact) => contact.id === contactId);

//   if (!currentContact) {
//     console.error("Kontak tidak ditemukan.");
//     return;
//   }

//   // Update data kontak dengan input baru
//   const updatedContact = {
//     id: contactId,
//     name: document.getElementById("name").value || currentContact.name,
//     email: document.getElementById("email").value || currentContact.email,
//     phone: document.getElementById("phone").value || currentContact.phone,
//     birthdate: document.getElementById("birthdate").value || currentContact.birthdate,
//     isFavorited: document.getElementById("isFavorited").checked,
//     label: document.getElementById("label").value || currentContact.label,
//   };

//   // Update kontak di dalam array
//   const updatedContacts = contacts.map((contact) =>
//     contact.id === contactId ? updatedContact : contact
//   );

//   saveToLocalStorage(updatedContacts);
//   alert("Kontak berhasil diperbarui!");
//   window.location.href = "/index.html"; // Kembali ke halaman utama
// }
// window.updateContact = updateContact;


export { addContact, getContactsFromLocalStorage, renderContacts };

// Update Contact Function
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
