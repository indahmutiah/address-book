import { getContactById , formatDate} from "../index.js";

function renderContactDetail(contact) {
  console.log("Rendering contact:", contact);
  const contactDetailElement = document.getElementById("contact-detail");
  if (!contactDetailElement) {
    console.warn("Element with id 'contact-detail' not found.");
    return;
  }

  const formattedPhone = contact.phone ? contact.phone.replace(/-/g, "") : "";
  const formattedDate = formatDate(contact.birthdate);

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
window.onload = function () {
  showContactFromUrl();
};
