# FRYCO Website

FRYCO's website is a lightweight static site hosted with GitHub Pages.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Page content, contact details, SEO metadata and restaurant information |
| `styles.css` | Brand colours, layout, component styles and responsive rules |
| `menu-data.js` | Menu categories, item descriptions and prices |
| `menu.js` | Menu rendering and keyboard-accessible category tabs |
| `site.js` | Mobile navigation, scroll reveals and footer year |
| Image files | Logo, food photography and restaurant photos |

## Common updates

### Change a menu item or price

Edit `menu-data.js`. Each item uses:

```js
createMenuItem("Item name", "Short description", 250)
```

For different sizes or options, provide an array of label and price pairs:

```js
createMenuItem("Fries", "", [
  ["Regular", 110],
  ["Large", 130]
])
```

### Change the website's appearance

Edit `styles.css`. The main brand colour variables are defined in the first `:root` block. Keep styles grouped by the page component they affect.

### Change page copy or business information

Edit `index.html`. When changing the address, phone number or opening hours, also update the Restaurant structured data in the document head.

### Change interactions

- Edit `menu.js` for menu tabs and menu cards.
- Edit `site.js` for mobile navigation and scroll effects.

## Technical notes

- This is a static HTML, CSS and JavaScript project. It has no build step or package dependencies.
- Keep asset and script paths relative so the site works under the GitHub Pages project URL.
- Do not delete or rename images until their references in HTML, CSS and metadata have been checked.
- Test desktop and mobile layouts after changes. Check menu tabs, mobile navigation, links, map and image loading.
- Confirm menu prices and business details with FRYCO before publishing.

## Publishing

The repository's GitHub Pages configuration publishes the site. Commits to the configured publishing branch are deployed by GitHub Pages.
