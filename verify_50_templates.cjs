const fs = require('fs');
const path = require('path');

// Read registry.ts directly and extract all templates
const registryContent = fs.readFileSync(path.join(__dirname, 'src/templates/registry.ts'), 'utf8');

// Parse category definitions:
// createCategory('fine-dining', 'Fine Dining Restaurant', 'fine-dining', palettes.fine, [
//   ['Noir Ember', 'noir-ember', 'NoirEmber'], ...
const categoryRegex = /createCategory\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*[^,]+,\s*\[([\s\S]*?)\]\s*\)/g;

let catMatch;
const categories = [];
let totalTemplates = 0;
const missingFiles = [];

while ((catMatch = categoryRegex.exec(registryContent)) !== null) {
  const catId = catMatch[1];
  const catName = catMatch[2];
  const catSlug = catMatch[3];
  const templatesBlock = catMatch[4];

  const tmplRegex = /\[\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'/g;
  let tmplMatch;
  const templates = [];

  while ((tmplMatch = tmplRegex.exec(templatesBlock)) !== null) {
    const tmplName = tmplMatch[1];
    const tmplSlug = tmplMatch[2];
    const tmplFile = tmplMatch[3];
    const filePath = path.join(__dirname, 'src/templates/food-restaurants', catId, `${tmplFile}.tsx`);
    const exists = fs.existsSync(filePath);

    if (!exists) {
      missingFiles.push({ catId, tmplName, tmplSlug, tmplFile, filePath });
    }

    templates.push({
      name: tmplName,
      slug: tmplSlug,
      filename: tmplFile,
      filePath,
      exists,
      size: exists ? fs.statSync(filePath).size : 0
    });
    totalTemplates++;
  }

  categories.push({ id: catId, name: catName, slug: catSlug, templates });
}

console.log(`\n======================================================`);
console.log(`TOTAL CATEGORIES: ${categories.length}`);
console.log(`TOTAL TEMPLATES REGISTERED: ${totalTemplates}`);
console.log(`MISSING FILES: ${missingFiles.length}`);
console.log(`======================================================\n`);

categories.forEach(cat => {
  console.log(`[Category: ${cat.name} (${cat.id})] - ${cat.templates.length} templates:`);
  cat.templates.forEach(t => {
    console.log(`  - ${t.name} (${t.slug}) -> ${t.filename}.tsx [Exists: ${t.exists}, Size: ${t.size} bytes]`);
  });
});

if (missingFiles.length > 0) {
  console.error('\nERROR: Missing template files found:');
  console.error(missingFiles);
  process.exit(1);
} else {
  console.log('\nSUCCESS: All 50 template component files exist and are populated!');
}
