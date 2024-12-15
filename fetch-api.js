async function getContacts() {
    const url = "http://127.0.0.1:5500/contacts";
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log("Data from API:", data);
        localStorage.setItem("contacts", JSON.stringify(data));
      } else {
        throw new Error("Failed to fetch data from API");
      }
    } catch (error) {
      console.log("Error fetching from API, using localStorage data:", error.message);
      const dataFromLocalStorage = getContactsFromLocalStorage();
      console.log("Data from localStorage:", dataFromLocalStorage);
    }
  }
  
  getContacts();
  