const navLinks = document.querySelectorAll(".top-nav a");
const sections = document.querySelectorAll("section");
const toggle = document.getElementById("myToggle");
const body = document.body;

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

    const yOffset = -72; 
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });

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

// Load saved theme from localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light-mode");
  toggle.checked = true; 
}

// Toggle listener
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light");  
  } else {
    body.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");   
  }
});

function openGmailCompose() {
  const email = "miingvaliant@gmail.com"; 
  const subject = "Hiring Inquiry – Portfolio Website";
  const body = "Hello,\n\nI came across your portfolio and I’m interested in discussing potential work opportunities. Please provide more details about your availability, skills, and rates.\n\nBest regards,\n[Your Name]";

  const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.open(gmailURL, '_blank'); 
}
