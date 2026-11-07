/* FRYCO interactions — accessible, progressively enhanced */
(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("navlinks");
  const header = document.querySelector(".site-header");

  function closeNavigation() {
    if (!menuButton || !navigation) return;
    navigation.classList.remove("open");
    navigation.parentElement.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      navigation.classList.toggle("open", open);
      navigation.parentElement.classList.toggle("open", open);
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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll(
      ".section-heading, .story-copy, .inside-layout > div, .inside-layout figure, " +
      ".photo, .visit-card, .social-links a, .card, .cat > h3"
    );

    if (reducedMotion || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

    targets.forEach((target, index) => {
      target.classList.add("motion-reveal");
      target.style.setProperty("--motion-delay", `${Math.min(index % 5, 4) * 65}ms`);
      observer.observe(target);
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  revealContent();
})();
