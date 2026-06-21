const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.classList.toggle("active", open);
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.style.overflow = open ? "hidden" : "";
});

nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menu.classList.remove("active");
  menu.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const filterButtons = document.querySelectorAll(".filters button");
const projects = document.querySelectorAll(".project");
window.filterProjects = (filter, selectedButton) => {
  filterButtons.forEach((item) => item.classList.remove("active"));
  selectedButton.classList.add("active");
  projects.forEach((project) => {
    project.classList.toggle("hidden", filter !== "all" && project.dataset.category !== filter);
  });
};

const toast = document.querySelector(".toast");
document.querySelectorAll("[data-placeholder]").forEach((link) => link.addEventListener("click", (event) => {
  event.preventDefault();
  toast.textContent = `${link.dataset.placeholder}: replace “#” with your real URL.`;
  toast.classList.add("show");
  window.clearTimeout(window.toastTimer);
  window.toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2400);
}));

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelectorAll(".switcher-tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".switcher-tabs button").forEach((tab) => {
      const selected = tab === button;
      tab.classList.toggle("active", selected);
      tab.setAttribute("aria-selected", String(selected));
    });
    document.querySelectorAll(".switch-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.content === button.dataset.panel);
    });
  });
});

document.querySelectorAll(".experience-item").forEach((item) => {
  item.addEventListener("click", () => {
    const willOpen = !item.classList.contains("open");
    document.querySelectorAll(".experience-item").forEach((row) => {
      row.classList.remove("open");
      row.setAttribute("aria-expanded", "false");
      row.querySelector(":scope > b").textContent = "+";
    });
    if (willOpen) {
      item.classList.add("open");
      item.setAttribute("aria-expanded", "true");
      item.querySelector(":scope > b").textContent = "−";
    }
  });
});

const aboutHero = document.querySelector(".about-hero");
if (aboutHero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  aboutHero.addEventListener("pointermove", (event) => {
    const rect = aboutHero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    aboutHero.style.setProperty("--pointer-x", `${x * 12}px`);
    aboutHero.style.setProperty("--pointer-y", `${y * 12}px`);
  });
}
