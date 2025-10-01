const navLinks = document.querySelectorAll(".top-nav a");
const sections = document.querySelectorAll("section");

// Load saved active section from localStorage
const savedSection = localStorage.getItem("activeSection");
if (savedSection) {
  setActive(savedSection);
}

// Function to set active section
function setActive(sectionId) {
  navLinks.forEach(link => link.classList.remove("active"));
  sections.forEach(sec => sec.classList.remove("active"));

  document.querySelector(`.top-nav a[href="#${sectionId}"]`)?.classList.add("active");
  document.getElementById(sectionId)?.classList.add("active");

  localStorage.setItem("activeSection", sectionId);
}

// Handle click on nav links
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute("href").substring(1);
    const section = document.getElementById(sectionId);

    // Smooth scroll with offset
    const yOffset = -72; 
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });;

    setActive(sectionId);
  });
});

// Update active link on scroll
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 85 ;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  if (current) {
    setActive(current);
  }
});
