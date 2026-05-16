gsap.registerPlugin(ScrollTrigger);

// Hero Entrance Animation
window.addEventListener("load", () => {
  const tl = gsap.timeline();

  tl.to(".text", {
    duration: 1.5,
    opacity: 1,
    y: 0,
    ease: "power4.out",
    delay: 0.5
  })
  .from(".advert", {
    duration: 1.2,
    opacity: 0,
    scale: 0.8,
    stagger: 0.2,
    ease: "back.out(1.7)"
  }, "-=1");
});

// Parallax Hero Images
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth - 0.5;
  const mouseY = e.clientY / window.innerHeight - 0.5;

  gsap.to(".img1", {
    duration: 1,
    x: mouseX * 30,
    y: mouseY * 30 - 20,
    ease: "power2.out"
  });

  gsap.to(".img2", {
    duration: 1,
    x: mouseX * -20,
    y: mouseY * -20,
    ease: "power2.out"
  });

  gsap.to(".img3", {
    duration: 1,
    x: mouseX * 15,
    y: mouseY * 15,
    ease: "power2.out"
  });
});

// Timeline Scroll Animation
const timelineSection = document.querySelector(".about");
const timelineContent = document.querySelector(".content");

if (timelineSection && timelineContent) {
  gsap.to(".cards-container", {
    x: () => -(timelineContent.scrollWidth - window.innerWidth + 140),
    ease: "none",
    scrollTrigger: {
      trigger: ".about",
      start: "top top",
      end: () => "+=" + timelineContent.scrollWidth,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  // Animate dots and line opacity as we scroll
  gsap.to(".timeline-line", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".about",
      start: "top center",
      end: "bottom center",
      scrub: true
    }
  });
}

// Menu Entrance Animation
gsap.utils.toArray(".dish").forEach((dish) => {
  gsap.from(dish, {
    scrollTrigger: {
      trigger: dish,
      start: "top 90%",
      toggleActions: "play none none none"
    },
    duration: 1,
    opacity: 0,
    y: 50,
    ease: "power3.out"
  });
});

// Testimonials Entrance Animation
gsap.utils.toArray(".testimonial-card").forEach((card) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 90%",
      toggleActions: "play none none none"
    },
    duration: 1,
    opacity: 0,
    y: 30,
    scale: 0.95,
    ease: "power2.out"
  });
});

// Mobile Menu Toggle
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.querySelector("nav ul");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const icon = navToggle.querySelector("i");
    if (navMenu.classList.contains("active")) {
      icon.classList.replace("fa-bars", "fa-xmark");
      gsap.from("nav ul li", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      icon.classList.replace("fa-xmark", "fa-bars");
    }
  });
}

// Close menu when clicking a link
document.querySelectorAll("nav ul li a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    const icon = navToggle.querySelector("i");
    if (icon) icon.classList.replace("fa-xmark", "fa-bars");
  });
});

// Active Navigation Link
const currentPath = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("nav ul li a").forEach(link => {
  const linkHref = link.getAttribute("href").split("/").pop();
  if (linkHref === currentPath) {
    link.style.color = "var(--color-ember)";
    link.style.borderBottom = "2px solid var(--color-ember)";
    link.style.paddingBottom = "5px";
  }
});

// Theme Toggle Logic
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const icon = themeToggle.querySelector("i");

// Check for saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light-theme");
  icon.classList.replace("fa-moon", "fa-sun");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");
  const isLight = body.classList.contains("light-theme");
  
  if (isLight) {
    icon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "light");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "dark");
  }
});

// Gallery Scroll Animations
gsap.utils.toArray(".gallery-item").forEach((item) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 90%",
      toggleActions: "play none none none"
    },
    duration: 1.2,
    opacity: 0,
    scale: 0.9,
    y: 30,
    ease: "power2.out"
  });
});

// Featured Image Parallax
gsap.to(".featured-image img", {
  y: -50,
  ease: "none",
  scrollTrigger: {
    trigger: ".featured",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: target,
        ease: "power3.inOut"
      });
    }
  });
});
