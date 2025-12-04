// Smooth Scroll Navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Close mobile menu if open
      const navMenu = document.getElementById("navMenu");
      const navToggle = document.getElementById("navToggle");
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      }
    }
  });
});

// Mobile Menu Toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveLink);

// Typing Animation
const typedTextElement = document.getElementById("typedText");
const textArray = [
  "Java Full Stack Developer",
  "Backend Developer",
  "Problem Solver",
  "Continuous Learner",
];
let textArrayIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let erasingDelay = 50;
let newTextDelay = 2000;

function type() {
  if (!typedTextElement) return;

  const currentText = textArray[textArrayIndex];

  if (isDeleting) {
    typedTextElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = erasingDelay;
  } else {
    typedTextElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 100;
  }

  if (!isDeleting && charIndex === currentText.length) {
    // Pause at end of text
    typingDelay = newTextDelay;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) {
      textArrayIndex = 0;
    }
    typingDelay = 500;
  }

  setTimeout(type, typingDelay);
}

// Start typing animation when page loads
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, newTextDelay);
});

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(
    ".about-content, .timeline-item, .skill-category, .project-card, .education-card, .contact-card"
  );

  fadeElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
});

// Navbar Background on Scroll
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.background = "rgba(10, 10, 10, 0.95)";
    navbar.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.8)";
    navbar.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// Skill Tags Animation on Hover
document.querySelectorAll(".skill-tag").forEach((tag) => {
  tag.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05) rotate(2deg)";
  });

  tag.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1) rotate(0deg)";
  });
});

// Project Card Tilt Effect (Subtle 3D)
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// Smooth reveal for stats on scroll
const stats = document.querySelectorAll(".stat-number");
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;

  const statsSection = document.querySelector(".about-stats");
  if (!statsSection) return;

  const rect = statsSection.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

  if (isVisible) {
    stats.forEach((stat, index) => {
      setTimeout(() => {
        stat.style.opacity = "0";
        stat.style.transform = "scale(0.5)";

        setTimeout(() => {
          stat.style.transition = "all 0.5s ease-out";
          stat.style.opacity = "1";
          stat.style.transform = "scale(1)";
        }, 50);
      }, index * 100);
    });
    statsAnimated = true;
  }
}

window.addEventListener("scroll", animateStats);
document.addEventListener("DOMContentLoaded", animateStats);

// Add cursor trail effect (optional enhancement)
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".gradient-orb");

circles.forEach((circle) => {
  circle.x = 0;
  circle.y = 0;
});

window.addEventListener("mousemove", (e) => {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach((circle, index) => {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

// Disable cursor trail on mobile
if (window.innerWidth > 768) {
  // animateCircles(); // Uncomment if you want cursor trail effect
}

// Console Easter Egg
console.log(
  "%c👋 Hello Developer!",
  "font-size: 20px; font-weight: bold; color: #8b5cf6;"
);
console.log(
  "%cLooking for something? Check out my GitHub: https://github.com/DanduSuresh",
  "font-size: 14px; color: #06b6d4;"
);
console.log(
  "%cBuilt with ❤️ using HTML, CSS, and JavaScript",
  "font-size: 12px; color: #b3b3b3;"
);
