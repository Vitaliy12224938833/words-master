export const showModal = (modal) => {
  const popup = document.querySelector(modal);
  popup.style.display = "flex";
};
export const hideModal = (modals) => {
  const popup = document.querySelectorAll(modals);
  popup.forEach((item) => (item.style.display = "none"));
};
