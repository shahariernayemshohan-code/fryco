/* FRYCO menu rendering and accessible category tabs. */
(() => {
  "use strict";

  const MENU = window.FRYCO_MENU || [];
  const fmt = n => "৳" + n.toLocaleString("en-US");

  const card = (item, isCombo) => {
    const priceMarkup = Array.isArray(item.p)
      ? `<ul class="opts">${item.p.map(option =>
          `<li><span>${option[0]}</span><b>${fmt(option[1])}</b></li>`
        ).join("")}</ul>`
      : `<div class="price">${fmt(item.p)}</div>`;

    return `<div class="card${isCombo ? " combo" : ""}">
      <div>
        <h4>${item.n}</h4>
        ${item.d ? `<p class="desc">${item.d}</p>` : ""}
      </div>
      ${priceMarkup}
    </div>`;
  };

  const root = document.getElementById("menu-root");
  if (!root || !MENU.length) return;

  root.innerHTML = `
    <div class="tabs" role="tablist" aria-label="Menu categories"></div>
    <div class="panel" id="menu-panel" role="tabpanel" aria-live="polite"></div>
    <p class="note">All prices include VAT.</p>
  `;

  const tabs = root.querySelector(".tabs");
  const panel = root.querySelector(".panel");

  function showCategory(index) {
    const category = MENU[index];
    if (!category) return;

    tabs.querySelectorAll(".tab").forEach((tab, tabIndex) => {
      const selected = tabIndex === index;
      tab.classList.toggle("active", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    panel.innerHTML = category.groups.map(group => `
      <div class="cat">
        ${group.title ? `<h3>${group.title}</h3>` : ""}
        <div class="grid">${group.items.map(item => card(item, category.combo)).join("")}</div>
      </div>
    `).join("");
  }

  MENU.forEach((category, index) => {
    const tab = document.createElement("button");
    tab.className = "tab";
    tab.type = "button";
    tab.role = "tab";
    tab.id = `menu-tab-${index}`;
    tab.setAttribute("aria-controls", "menu-panel");
    tab.setAttribute("aria-selected", String(index === 0));
    tab.tabIndex = index === 0 ? 0 : -1;
    tab.textContent = category.name;

    tab.addEventListener("click", () => showCategory(index));
    tab.addEventListener("keydown", event => {
      let nextIndex = index;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % MENU.length;
      else if (event.key === "ArrowLeft") nextIndex = (index - 1 + MENU.length) % MENU.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = MENU.length - 1;
      else return;

      event.preventDefault();
      tabs.querySelectorAll(".tab")[nextIndex].focus();
      showCategory(nextIndex);
    });

    tabs.appendChild(tab);
  });

  showCategory(0);
})();
