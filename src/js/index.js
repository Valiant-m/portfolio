// =============================
// NAVIGATION HANDLER
// =============================

const navLinks = document.querySelectorAll(".top-nav a");
const sections = document.querySelectorAll(".content-section");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    // Remove active class
    navLinks.forEach(l => l.classList.remove("active"));
    sections.forEach(sec => sec.classList.remove("active"));

    // Add active to clicked
    link.classList.add("active");
    document.getElementById(link.dataset.section).classList.add("active");
  });
});
