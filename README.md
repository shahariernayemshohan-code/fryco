# FRYCO Website

A lightweight, static website for FRYCO. It is published with GitHub Pages.

## Project structure

- `index.html` — page content, SEO metadata and structured restaurant information.
- `styles.css` — all visual styles, responsive rules and brand colours.
- `menu-data.js` — menu catalogue (names, descriptions and prices).
- `menu.js` — menu rendering and accessible category-tab behavior.
- `site.js` — mobile navigation, scroll-reveal behavior and footer year.
- Image files — restaurant, food and brand photography used by the page and social metadata.

## Making common changes

### Update menu items or prices
Edit `menu-data.js`. Prices are numeric values in Bangladeshi taka. For size or variant pricing, use an array of label/price pairs, following the existing entries.

### Change the design
Edit `styles.css`. The primary brand palette is defined near the top in `:root`. Keep responsive adjustments in the relevant component sections and media queries.

### Change page content or contact information
Edit `index.html`. Update the visible content and the matching SEO / Restaurant structured-data fields when business details change.

### Change interactions
Edit `menu.js` for menu behavior and `site.js` for navigation, reveal effects or footer behavior.

## Development notes

- No build step or package installation is required; this is a plain HTML, CSS and JavaScript site.
- Keep file paths relative so the site works from the GitHub Pages project subpath.
- Do not rename or remove image assets until every HTML, CSS, JavaScript and metadata reference has been checked.
- Test the page at desktop and mobile widths after changes. Check menu tabs, mobile navigation, contact links, map and image loading.
- Keep business facts and menu prices verified with FRYCO before publishing.

## Publishing

The site is served from the repository's GitHub Pages configuration. Changes pushed to the published branch are deployed by GitHub Pages.
