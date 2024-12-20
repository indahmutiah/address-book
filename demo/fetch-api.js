// Fetch API
async function getContacts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const contacts = await response.json();
    console.log(contacts);
  }
  
  getContacts();