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
    <div class="menu-tools">
      <label class="menu-search-wrap">
        <input class="menu-search" type="search" placeholder="Find a dish or drink…" aria-label="Search all menu items" autocomplete="off">
        <svg class="menu-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg>
      </label>
      <span class="menu-search-status" aria-live="polite"></span>
    </div>
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
  const search = menuRoot.querySelector(".menu-search");
  const searchStatus = menuRoot.querySelector(".menu-search-status");
  let activeIndex = 0;

  function renderGroups(category, query) {
    const groups = category.groups.map(group => {
      const matchingItems = group.items.filter(item => {
        const haystack = [item.name, item.description, ...(Array.isArray(item.price) ? item.price.map(option => option[0]) : [])].join(" ").toLocaleLowerCase();
        return !query || haystack.includes(query);
      });
      if (!matchingItems.length) return "";
      const heading = group.title ? `<h3>${escapeHtml(group.title)}</h3>` : "";
      return `<section class="cat">${heading}<div class="grid">${matchingItems.map(item => createMenuCard(item, category.combo)).join("")}</div></section>`;
    }).join("");
    return groups;
  }

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

    activeIndex = selectedIndex;
    search.value = "";
    searchStatus.textContent = "";
    panel.setAttribute("aria-labelledby", `menu-tab-${selectedIndex}`);
    panel.classList.remove("is-changing");
    panel.innerHTML = renderGroups(category, "");

    void panel.offsetWidth;
    panel.classList.add("is-changing");
  }

  function runSearch() {
    const query = search.value.trim().toLocaleLowerCase();
    if (!query) {
      showCategory(activeIndex);
      return;
    }

    tabs.querySelectorAll(".tab").forEach((tab, index) => {
      const selected = index === activeIndex;
      tab.classList.toggle("active", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    let count = 0;
    const output = categories.map((category, index) => {
      const categoryGroups = category.groups.map(group => group.items.filter(item => {
        const haystack = [item.name, item.description, ...(Array.isArray(item.price) ? item.price.map(option => option[0]) : [])].join(" ").toLocaleLowerCase();
        return haystack.includes(query);
      }));
      count += categoryGroups.reduce((sum, items) => sum + items.length, 0);
      const filteredCategory = {...category, groups: category.groups.map((group, groupIndex) => ({...group, items: categoryGroups[groupIndex]}))};
      const content = renderGroups(filteredCategory, query);
      return content ? `<div class="search-category"><h3 class="search-category-title">${escapeHtml(category.name)}</h3>${content}</div>` : "";
    }).join("");

    searchStatus.textContent = `${count} ${count === 1 ? "item" : "items"}`;
    panel.classList.remove("is-changing");
    panel.innerHTML = output || '<div class="menu-empty">No matches found. Try another dish or drink name.</div>';
    void panel.offsetWidth;
    panel.classList.add("is-changing");
  }

  search.addEventListener("input", runSearch);

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
