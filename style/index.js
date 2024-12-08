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
  console.log("The contacts list :");
  contacts.forEach((contact) => {
    console.log("Name:", contact.name);
    console.log("Email:", contact.email);
    console.log("Phone:", contact.phone);
    console.log("===========================");
    console.log("\n");
  });
}
getContacts();