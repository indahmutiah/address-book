const contacts = [
  {
    id: 1,
    name: "Indah Mutiah Utami",
    email: "indahmutiah@example.com",
    phone: "+62 812-1229-5678",
  },
  {
    id: 2,
    name: "Mohammad Salahuddin",
    email: "salahuddin@example.com",
    phone: "+62 878-7889-5678",
  },
  {
    id: 3,
    name: "Insani Marjan",
    email: "insani@example.com",
    phone: "+62 889-3529-5678",
  },
  {
    id: 4,
    name: "Sarah Julia",
    email: "sarah@example.com",
    phone: "+62 890-1234-5678",
  },
  {
    id: 5,
    name: "Eko Soejener",
    email: "eko@example.com",
    phone: "+62 891-2345-5678",
  },
];

function getContacts() {
  console.log("The Kontak Ku list:");
  contacts.forEach((contact) => {
    const formattedPhone = contact.phone.replace(/-/g, "");
    console.log(`${contact.name} (${formattedPhone}) ${contact.email}`);

    console.log("Validation of contacts");
    splitName(contact.name);
    emailValidation(contact.email); //Fungsi emailValidation
    phoneValidation(contact.phone); //Fungsi phoneValidation
    console.log("================================");
  });
}

function addContact() {
  const name = prompt("Enter contact name:");
  const phone = prompt("Enter contact phone:");
  const email = prompt("Enter contact email:");

  if (name && phone && email) {
    contacts.push({ name, phone, email });
    getContacts();
  }
}

function emailValidation(email) {
  if (email && email.includes("@") && email.endsWith(".com")) {
    console.log(`Email ${email} is valid`);
  } else {
    console.log(`Email ${email} is invalid`);
  }
}

function splitName(name) {
  const firstNames = name.split(" ")[0];
  console.log("First Names: ", firstNames);
  const lastName = name.split(" ").slice(1).join(" ");
  console.log("Last Name : ", lastName);
  return { firstNames, lastName };
}

function phoneValidation(phone) {
  if (phone) {
    const cleanedPhone = phone.replace(/-/g, "");
    if (
      (cleanedPhone.startsWith("+62") && cleanedPhone.length <= 16) ||
      (cleanedPhone.startsWith("08") && cleanedPhone.length <= 12)
    ) {
      console.log(`Phone ${phone} is valid`);
    } else {
      console.log(`Phone ${phone} is invalid`);
    }
  } else {
    console.log(`Phone ${phone} is invalid`);
  }
}

function totalContacts() {
  let total = 0;
  for (let index = 0; index < contacts.length; index++) {
    total += 1;
  }
  console.log(`Total contacts: ${total}`);
}

const addNewContact = (newContact)  => {
  let maxId = 0;
for(const contact of contacts ){
  if(contacts.id > maxId){
    maxId = contacts.id;
  }
}

const newId = maxId + 1;

const contactWithId = { id: newId, ...newContact };
contacts.push(contactWithId);

return contactWithId;
};

const newContact = {
  name: "Rina Suriani",
  email: "rina@example.com",
  phone: "+62 892-3456-5678",
};

const addedContact = addNewContact(newContact);
console.log("Kontak baru ditambahkan:", addedContact);
console.log("Daftar kontak saat ini:", contacts);
getContacts();
totalContacts();

// addContact();
