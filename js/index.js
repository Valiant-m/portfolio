const navLinks = document.querySelectorAll(".top-nav a");
const sections = document.querySelectorAll(".content-section");

// Load saved active section from localStorage
const savedSection = localStorage.getItem("activeSection");
if (savedSection) {
  navLinks.forEach(l => l.classList.remove("active"));
  sections.forEach(sec => sec.classList.remove("active"));

  document.querySelector(`.top-nav a[data-section="${savedSection}"]`)?.classList.add("active");
  document.getElementById(savedSection)?.classList.add("active");
}

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const sectionId = link.dataset.section;

    navLinks.forEach(l => l.classList.remove("active"));
    sections.forEach(sec => sec.classList.remove("active"));

    link.classList.add("active");
    document.getElementById(sectionId).classList.add("active");

    // Save active section
    localStorage.setItem("activeSection", sectionId);
  });
});
s