import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const passed = [];

function read(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!existsSync(absolutePath)) {
    errors.push(`Missing required file: ${relativePath}`);
    return "";
  }
  return readFileSync(absolutePath, "utf8");
}

function pass(message) {
  passed.push(message);
}

function checkBalancedBlocks(source, fileName) {
  const input = source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, "");
  const stack = [];
  const pairs = { "}": "{", ")": "(", "]": "[" };

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    if ("{([".includes(character)) stack.push({ character, index });
    if (Object.hasOwn(pairs, character)) {
      const last = stack.pop();
      if (!last || last.character !== pairs[character]) {
        errors.push(`${fileName}: unexpected closing "${character}" near character ${index}`);
        return;
      }
    }
  }

  if (stack.length) {
    const last = stack.at(-1);
    errors.push(`${fileName}: unclosed "${last.character}" near character ${last.index}`);
    return;
  }
  pass(`${fileName}: delimiters are balanced`);
}

function checkJavaScript(relativePath) {
  const result = spawnSync(process.execPath, ["--check", path.join(root, relativePath)], {
    encoding: "utf8"
  });
  if (result.status !== 0) {
    errors.push(`${relativePath}: JavaScript syntax check failed\n${result.stderr || result.stdout}`);
    return;
  }
  pass(`${relativePath}: JavaScript syntax is valid`);
}

const html = read("index.html");
const css = read("styles.css");
const siteJs = read("site.js");
const menuJs = read("menu.js");
const menuData = read("menu-data.js");
const readme = read("README.md");
read("package.json");

if (html) {
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) errors.push(`Duplicate HTML IDs: ${[...new Set(duplicates)].join(", ")}`);
  else pass("HTML IDs are unique");

  const idSet = new Set(ids);
  const fragments = [...html.matchAll(/\bhref=["']#([^"']+)["']/g)].map((match) => match[1]);
  const missingFragments = [...new Set(fragments.filter((id) => !idSet.has(id)))];
  if (missingFragments.length) errors.push(`Broken in-page links: ${missingFragments.join(", ")}`);
  else pass("All in-page links point to existing IDs");

  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  imageTags.forEach((tag, index) => {
    if (!/\balt=["'][^"']*["']/i.test(tag)) errors.push(`Image ${index + 1} is missing an alt attribute`);
  });
  if (imageTags.length && imageTags.every((tag) => /\balt=["'][^"']*["']/i.test(tag))) {
    pass(`All ${imageTags.length} HTML images have alt text attributes`);
  }

  if ((html.match(/<h1\b/gi) || []).length !== 1) errors.push("Homepage should contain exactly one H1 heading");
  else pass("Homepage has one primary H1 heading");

  if (!/<html\b[^>]*\blang=["'][a-z-]+["']/i.test(html)) errors.push("HTML language attribute is missing");
  else pass("HTML language is declared");

  if (!/<meta\b[^>]*name=["']viewport["']/i.test(html)) errors.push("Responsive viewport meta tag is missing");
  else pass("Responsive viewport meta tag is present");

  if (!/<iframe\b[^>]*\btitle=["'][^"']+["']/i.test(html)) errors.push("Embedded iframe needs a descriptive title");
  else pass("Embedded iframe has an accessible title");

  const localAssetTags = html.match(/<(?:img|script|link)\b[^>]*>/gi) || [];
  for (const tag of localAssetTags) {
    const attribute = /<script\b/i.test(tag) || /<img\b/i.test(tag) ? "src" : "href";
    const match = tag.match(new RegExp(`\\b${attribute}=["']([^"']+)["']`, "i"));
    if (!match) continue;
    const assetPath = match[1].split(/[?#]/, 1)[0];
    if (!assetPath || /^(?:[a-z]+:|\/\/|#)/i.test(assetPath)) continue;
    if (!existsSync(path.join(root, assetPath))) errors.push(`Missing local asset: ${assetPath}`);
  }
  pass("Local HTML asset references were checked");

  const scriptTags = html.match(/<script\b[^>]*\bsrc=["'][^"']+["'][^>]*>/gi) || [];
  if (scriptTags.some((tag) => !/\bdefer\b/i.test(tag))) {
    errors.push("Local JavaScript files should use defer to avoid blocking HTML parsing");
  } else pass("Local scripts are deferred");
}

if (css) checkBalancedBlocks(css, "styles.css");
if (siteJs) checkJavaScript("site.js");
if (menuJs) checkJavaScript("menu.js");
if (menuData) checkJavaScript("menu-data.js");

if (menuData) {
  try {
    const sandbox = { window: {} };
    vm.runInNewContext(menuData, sandbox, { timeout: 1000 });
    const categories = sandbox.window.FRYCO_MENU;
    if (!Array.isArray(categories) || categories.length === 0) {
      errors.push("menu-data.js must define a non-empty window.FRYCO_MENU array");
    } else {
      const categoryNames = new Set();
      let itemCount = 0;
      for (const category of categories) {
        if (!category.name || !Array.isArray(category.groups)) {
          errors.push("Each menu category needs a name and groups array");
          continue;
        }
        if (categoryNames.has(category.name)) errors.push(`Duplicate menu category: ${category.name}`);
        categoryNames.add(category.name);

        for (const group of category.groups) {
          if (!Array.isArray(group.items)) {
            errors.push(`Menu group in "${category.name}" is missing its items array`);
            continue;
          }
          for (const item of group.items) {
            itemCount += 1;
            if (!item.name) errors.push(`Unnamed menu item in "${category.name}"`);
            const validPrice = Number.isInteger(item.price) && item.price > 0;
            const validOptions = Array.isArray(item.price) && item.price.length > 0 &&
              item.price.every((option) => Array.isArray(option) && option.length === 2 &&
                typeof option[0] === "string" && option[0].trim() &&
                Number.isInteger(option[1]) && option[1] > 0);
            if (!validPrice && !validOptions) errors.push(`Invalid price for menu item: ${item.name || "unnamed item"}`);
          }
        }
      }
      if (itemCount > 0) pass(`Menu catalogue is valid: ${categories.length} categories, ${itemCount} items`);
    }
  } catch (error) {
    errors.push(`Could not load menu-data.js: ${error.message}`);
  }
}

if (readme && !readme.includes("npm run check")) {
  errors.push("README should document the project quality-check command");
}

console.log("\nFRYCO project checks\n");
passed.forEach((message) => console.log(`  PASS  ${message}`));
if (errors.length) {
  console.error("\nIssues found:");
  errors.forEach((message) => console.error(`  FAIL  ${message}`));
  console.error(`\n${errors.length} check(s) need attention.\n`);
  process.exitCode = 1;
} else {
  console.log(`\nAll ${passed.length} checks passed.\n`);
}
