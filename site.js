/* FRYCO interactions — accessible, progressively enhanced */
(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("navlinks");
  const header = document.querySelector(".nav");

  function closeNavigation() {
    if (!menuButton || !navigation) return;
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      navigation.classList.toggle("open", open);
    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeNavigation();
        menuButton.focus();
      }
    });

    document.addEventListener("click", event => {
      if (menuButton.getAttribute("aria-expanded") !== "true") return;
      if (navigation.contains(event.target) || menuButton.contains(event.target)) return;
      closeNavigation();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) closeNavigation();
    }, { passive: true });
  }

  if (header) {
    const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 16);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  function revealContent() {
    const targets = document.querySelectorAll(".fade");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach(target => target.classList.add("show"));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

    targets.forEach(target => observer.observe(target));
  }

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  revealContent();
})();
