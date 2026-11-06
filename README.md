# FRYCO Website

A lightweight, static website for FRYCO Bangladesh in Satkhira. The site is built with semantic HTML, CSS and browser-native JavaScript and is published through GitHub Pages.

## Project structure

| Path | Responsibility |
| --- | --- |
| `index.html` | Page structure, content, SEO metadata and restaurant structured data |
| `styles.css` | Design tokens, component styles, responsive layouts and motion |
| `menu-data.js` | The menu catalogue: categories, item names, descriptions and BDT prices |
| `menu.js` | Menu rendering, category tabs, keyboard navigation and search |
| `site.js` | Mobile navigation, scroll effects and footer year |
| `scripts/check-site.mjs` | Dependency-free project checks run locally and in CI |
| `.github/workflows/quality-check.yml` | Runs the project checks on pushes and pull requests |
| Root image files | Logo, food photography and restaurant photography |

## Getting started

This is a static website. There is no bundler, framework, database or build step.

1. Clone or download the repository.
2. Open the project folder in your editor.
3. Open `index.html` in a local web server or use a simple editor preview.
4. Before publishing, run the quality checks:

```sh
npm run check
```

The check command requires Node.js 20 or newer and has no third-party package dependencies.

## Common changes

### Update a menu item or price

Edit `menu-data.js`. Keep menu content in this file rather than hard-coding it into the page or renderer.

A standard item:

```js
createMenuItem("Item name", "Short description", 250)
```

An item with sizes or options:

```js
createMenuItem("Fries", "", [
  ["Regular", 110],
  ["Large", 130]
])
```

Prices are numbers in Bangladeshi taka (BDT). The renderer formats the currency for display.

### Change colours or visual styling

Edit the design tokens in the first `:root` block in `styles.css`. Component styles are grouped in the same stylesheet. The final **Brand theme refinements** section contains deliberate component-level adjustments; check that section before adding another override for an existing component.

Prefer editing the existing rule over appending repeated overrides. Avoid `!important` unless there is a documented reason.

### Change page content or business information

Edit `index.html`. If the phone number, address, opening hours or public business identity changes, update the visible page content and the Restaurant JSON-LD structured data together. Also review the map destination and social links.

### Change menu behaviour

- `menu.js` owns category tabs, keyboard interaction, search and menu rendering.
- `menu-data.js` owns the actual menu content and prices.

Keep content separate from presentation and behaviour.

### Change site-wide interactions

Edit `site.js` for the mobile navigation, scroll header, reveal effects or footer year. Keep the navigation button's `aria-expanded` state in sync with its visible state. Do not move the hamburger button out of the header without checking the mobile layout and keyboard behaviour.

## Code conventions

- Use semantic HTML and accessible names for interactive controls.
- Keep JavaScript inside small, focused functions and use strict mode.
- Use relative paths for local assets so GitHub Pages project URLs continue to work.
- Preserve meaningful image alt text and iframe titles.
- Keep keyboard focus visible and respect `prefers-reduced-motion`.
- Do not add a framework or dependency for a task that can be handled cleanly with the existing static stack.
- Do not rename or remove assets until every reference has been checked.
- Keep menu names and prices in `menu-data.js`; do not duplicate the catalogue in HTML.

## Quality checks and publishing

Run `npm run check` before opening a pull request or publishing. The checks verify JavaScript syntax, HTML IDs and internal anchors, local asset references, CSS block balance and menu catalogue structure.

GitHub Actions runs the same checks on pushes and pull requests. A passing check does not replace browser testing: review the page at mobile and desktop widths and manually test navigation, menu search, category tabs, telephone links, directions, map and image loading.

GitHub Pages publishes the configured branch. Allow the deployment to finish before reviewing the public site.

## Business data

Menu prices, contact details, opening hours and location are business information. Confirm them with FRYCO before publishing updates. The website currently presents a call-to-order contact link; do not describe online checkout, payment processing or an order-management dashboard as available unless those features are implemented separately.
