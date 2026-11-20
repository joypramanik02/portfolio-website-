// Small enhancements: smooth active nav highlight and current year.
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.querySelector("footer p");
  if (yearEl) yearEl.textContent = `© ${new Date().getFullYear()} Joy Pramanik · Dhaka, Bangladesh`;
});
