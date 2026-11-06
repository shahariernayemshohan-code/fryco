/* FRYCO menu
   Builds the menu from the catalogue in menu-data.js.
*/
(() => {
  "use strict";

  const categories = window.FRYCO_MENU || [];
  const menuRoot = document.getElementById("menu-root");

  if (!menuRoot || categories.length === 0) return;

  const formatPrice = amount => `৳${amount.toLocaleString("en-US")}`;

  const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);

  function createPriceMarkup(price) {
    if (Array.isArray(price)) {
      const options = price.map(([label, amount]) => `
        <li>
          <span>${escapeHtml(label)}</span>
          <b>${formatPrice(amount)}</b>
        </li>
      `).join("");

      return `<ul class="opts">${options}</ul>`;
    }

    return `<div class="price">${formatPrice(price)}</div>`;
  }

  function createMenuCard(item, isCombo) {
    const description = item.description
      ? `<p class="desc">${escapeHtml(item.description)}</p>`
      : "";

    return `
      <article class="card${isCombo ? " combo" : ""}">
        <div>
          <h4>${escapeHtml(item.name)}</h4>
          ${description}
        </div>
        ${createPriceMarkup(item.price)}
      </article>
    `;
  }

  menuRoot.innerHTML = `
    <div class="tabs" role="tablist" aria-label="Menu categories"></div>
    <div
      class="panel"
      id="menu-panel"
      role="tabpanel"
      aria-live="polite"
    ></div>
    <p class="note">All prices include VAT.</p>
  `;

  const tabs = menuRoot.querySelector(".tabs");
  const panel = menuRoot.querySelector(".panel");

  function showCategory(selectedIndex) {
    const category = categories[selectedIndex];
    if (!category) return;

    const categoryTabs = tabs.querySelectorAll(".tab");

    categoryTabs.forEach((tab, index) => {
      const isSelected = index === selectedIndex;

      tab.classList.toggle("active", isSelected);
      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
    });

    panel.setAttribute("aria-labelledby", `menu-tab-${selectedIndex}`);
    panel.innerHTML = category.groups.map(group => {
      const heading = group.title
        ? `<h3>${escapeHtml(group.title)}</h3>`
        : "";

      const cards = group.items
        .map(item => createMenuCard(item, category.combo))
        .join("");

      return `
        <section class="cat">
          ${heading}
          <div class="grid">${cards}</div>
        </section>
      `;
    }).join("");
  }

  function handleTabKeydown(event, currentIndex) {
    let nextIndex = currentIndex;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % categories.length;
        break;
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + categories.length) % categories.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = categories.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    tabs.querySelectorAll(".tab")[nextIndex].focus();
    showCategory(nextIndex);
  }

  categories.forEach((category, index) => {
    const tab = document.createElement("button");

    tab.className = "tab";
    tab.type = "button";
    tab.id = `menu-tab-${index}`;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", "menu-panel");
    tab.setAttribute("aria-selected", String(index === 0));
    tab.tabIndex = index === 0 ? 0 : -1;
    tab.textContent = category.name;

    tab.addEventListener("click", () => showCategory(index));
    tab.addEventListener("keydown", event => {
      handleTabKeydown(event, index);
    });

    tabs.appendChild(tab);
  });

  showCategory(0);
})();
