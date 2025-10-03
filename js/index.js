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

function openModal(card) {
  document.getElementById("projectModal").style.display = "block";

  // Set content dynamically
  document.getElementById("modalTitle").textContent = card.dataset.title;
  document.getElementById("modalDesc").textContent = card.dataset.desc;
  document.getElementById("modalTech").textContent = card.dataset.tech;
  document.getElementById("modalRole").textContent = "Role: " + card.dataset.role;

  // Setup carousel
  const container = document.getElementById("carouselContainer");
  container.innerHTML = ""; 
  const images = card.dataset.images.split(",");
  images.forEach((src, index) => {
    let img = document.createElement("img");
    img.src = src.trim();
    if (index === 0) img.classList.add("active");
    container.appendChild(img);
  });

  currentSlide = 0;
  showSlide(0);
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

window.onclick = function(event) {
  document.querySelectorAll('.modal').forEach(modal => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
};

// Carousel Logic
let currentSlide = 0;
function showSlide(index) {
  let slides = document.querySelectorAll(".carousel-images img");
  if (slides.length === 0) return;
  slides.forEach(img => img.classList.remove("active"));
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
}
function changeSlide(step) {
  showSlide(currentSlide + step);
}