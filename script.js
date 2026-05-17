gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ===== HERO SECTION - FIXED (no disappearing) =====
window.addEventListener("DOMContentLoaded", () => {
  // Set initial states for animation
  gsap.set(".text", { opacity: 0, y: 30 });
  gsap.set(".advert", { opacity: 0, scale: 0.8 });
});

window.addEventListener("load", () => {
  // Run animation WITHOUT clearProps to prevent disappearing
  const tl = gsap.timeline();
  
  tl.to(".text", {
    duration: 1.2,
    opacity: 1,
    y: 0,
    ease: "power4.out"
  })
  .to(".advert", {
    duration: 0.8,
    opacity: 1,
    scale: 1,
    stagger: 0.15,
    ease: "back.out(1.2)"
  }, "-=0.5");
  
  // NO clearProps - let GSAP keep the final values naturally
});

// Safety fallback - ensure everything stays visible
setTimeout(() => {
  const text = document.querySelector(".text");
  const adverts = document.querySelectorAll(".advert");
  
  if (text && getComputedStyle(text).opacity === "0") {
    text.style.opacity = "1";
    text.style.transform = "translateY(0)";
  }
  
  adverts.forEach(advert => {
    if (getComputedStyle(advert).opacity === "0") {
      advert.style.opacity = "1";
      advert.style.transform = "scale(1)";
    }
  });
}, 2000);

// ===== PARALLAX (optimized) =====
let parallaxTimeout;
document.addEventListener("mousemove", (e) => {
  if (window.innerWidth <= 1024) return;
  if (parallaxTimeout) return;
  
  parallaxTimeout = setTimeout(() => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    gsap.to(".img1", {
      duration: 0.6,
      x: mouseX * 25,
      y: mouseY * 25 - 20,
      ease: "power2.out",
      overwrite: true
    });
    gsap.to(".img2", {
      duration: 0.6,
      x: mouseX * -15,
      y: mouseY * -15,
      ease: "power2.out",
      overwrite: true
    });
    gsap.to(".img3", {
      duration: 0.6,
      x: mouseX * 10,
      y: mouseY * 10,
      ease: "power2.out",
      overwrite: true
    });
    parallaxTimeout = null;
  }, 16);
});

// ===== FIXED: TIMELINE HORIZONTAL SCROLL (NO GLITCHING) =====
function initTimeline() {
  // Kill any existing ScrollTriggers for about section
  ScrollTrigger.getAll().forEach(st => {
    if (st.vars.trigger === ".about" || st.trigger === document.querySelector(".about")) {
      st.kill();
    }
  });
  
  // Reset position
  gsap.set(".cards-container", { x: 0 });
  
  // Check if mobile
  if (window.innerWidth <= 768) {
    return;
  }
  
  const aboutSection = document.querySelector(".about");
  const cardsContainer = document.querySelector(".cards-container");
  
  if (!aboutSection || !cardsContainer) return;
  
  // Calculate scroll distance
  const containerWidth = cardsContainer.scrollWidth;
  const viewportWidth = window.innerWidth;
  const scrollDistance = Math.max(0, containerWidth - viewportWidth + 140);
  
  if (scrollDistance <= 0) return;
  
  // Create the horizontal scroll WITHOUT pin to avoid glitching
  gsap.to(".cards-container", {
    x: -scrollDistance,
    ease: "none",
    scrollTrigger: {
      trigger: ".about",
      start: "top 20%",
      end: () => `+=${scrollDistance * 0.6}`,
      scrub: 1,
      invalidateOnRefresh: true
    }
  });
}

// Initialize timeline on load and resize
window.addEventListener("load", () => {
  setTimeout(initTimeline, 100);
});

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
    initTimeline();
  }, 250);
});

// ===== ALTERNATIVE: SIMPLE VERTICAL TIMELINE FOR MOBILE =====
// This is handled by CSS, no JS needed

// ===== ENTRANCE ANIMATIONS =====
// Menu items
gsap.utils.toArray(".dish").forEach((dish, i) => {
  gsap.from(dish, {
    scrollTrigger: {
      trigger: dish,
      start: "top 90%",
      toggleActions: "play none none reverse"
    },
    duration: 0.7,
    opacity: 0,
    y: 40,
    delay: i * 0.1,
    ease: "power3.out"
  });
});

// Testimonials
gsap.utils.toArray(".testimonial-card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 90%",
      toggleActions: "play none none reverse"
    },
    duration: 0.7,
    opacity: 0,
    y: 30,
    scale: 0.95,
    delay: i * 0.1,
    ease: "power2.out"
  });
});

// Gallery items
gsap.utils.toArray(".gallery-item").forEach((item, i) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 90%",
      toggleActions: "play none none reverse"
    },
    duration: 0.7,
    opacity: 0,
    scale: 0.95,
    y: 30,
    delay: i * 0.05,
    ease: "power2.out"
  });
});

// Featured Image Parallax
if (document.querySelector(".featured-image img")) {
  gsap.to(".featured-image img", {
    y: -60,
    ease: "none",
    scrollTrigger: {
      trigger: ".featured",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.8
    }
  });
}

// ===== MOBILE MENU =====
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
        x: 50,
        stagger: 0.08,
        duration: 0.35,
        ease: "power2.out"
      });
      document.body.style.overflow = "hidden";
    } else {
      icon.classList.replace("fa-xmark", "fa-bars");
      document.body.style.overflow = "";
    }
  });
}

document.querySelectorAll("nav ul li a").forEach(link => {
  link.addEventListener("click", () => {
    if (navMenu) navMenu.classList.remove("active");
    const icon = navToggle?.querySelector("i");
    if (icon) icon.classList.replace("fa-xmark", "fa-bars");
    document.body.style.overflow = "";
  });
});

// ===== ACTIVE LINK =====
const currentPath = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("nav ul li a").forEach(link => {
  const linkHref = link.getAttribute("href")?.split("/").pop();
  if (linkHref === currentPath) {
    link.style.color = "var(--color-ember)";
    if (window.innerWidth > 768) {
      link.style.borderBottom = "2px solid var(--color-ember)";
      link.style.paddingBottom = "5px";
    }
  }
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  const body = document.body;
  const icon = themeToggle.querySelector("i");
  
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
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('nav a[href^="#"], .featured-content button, .nav-reserve-btn').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    let targetId = this.getAttribute('href');
    
    if (!targetId || targetId === '#') {
      if (this.classList.contains('nav-reserve-btn')) {
        alert('Reservation demo');
      } else if (this.textContent.includes('Order')) {
        alert('Order coming soon');
      }
      return;
    }
    
    const target = document.querySelector(targetId);
    if (target) {
      const navHeight = document.querySelector('nav').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      gsap.to(window, {
        duration: 0.9,
        scrollTo: targetPosition,
        ease: "power3.inOut"
      });
    }
  });
});

// ===== CLEANUP =====
window.addEventListener("beforeunload", () => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});

// Final refresh
window.addEventListener("load", () => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 150);
});