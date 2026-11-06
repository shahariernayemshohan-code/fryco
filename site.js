/* FRYCO site interactions
   Handles the mobile navigation, scroll reveals and footer year.
*/
(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("navlinks");

  function closeNavigation() {
    if (!menuButton || !navigation) return;

    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeNavigation);
    });
  }

  function revealPageSections() {
    const elements = document.querySelectorAll(".fade");

    if (!("IntersectionObserver" in window)) {
      elements.forEach(element => element.classList.add("show"));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    elements.forEach(element => observer.observe(element));
  }

  function updateFooterYear() {
    const yearElement = document.getElementById("year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  revealPageSections();
  updateFooterYear();
})();
