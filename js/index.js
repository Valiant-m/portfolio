const navLinks = document.querySelectorAll(".top-nav a");
const sections = document.querySelectorAll(".content-section");

navLinks.forEach(link => {
  link.addEventListener("click", () => {

    navLinks.forEach(l => l.classList.remove("active"));
    sections.forEach(sec => sec.classList.remove("active"));

    link.classList.add("active");
    document.getElementById(link.dataset.section).classList.add("active");
  });
});
