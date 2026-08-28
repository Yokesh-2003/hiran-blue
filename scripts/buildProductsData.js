const fs = require('fs');
const path = require('path');

const root = path.join(process.cwd(), 'public', 'images', 'products');

// Map subfolders to the 6 master categories
function getCategory(dirRel) {
  const d = dirRel.toLowerCase();
  
  if (d.includes('valve') || d.includes('check valve')) {
    return 'valves';
  }
  if (d.includes('sink') || d.includes('quartz') || d.includes('single bowl') || d.includes('drain board')) {
    return 'kitchen';
  }
  if (d.includes('shower') || d.includes('shower arm')) {
    return 'showers';
  }
  if (d.includes('bath spout') || d.includes('divertor') || d.includes('flush valve') || d.includes('urinal spreader') || d.includes('internal fitting')) {
    return 'bath-seth';
  }
  if (
    d.includes('allied') || d.includes('bottle trap') || d.includes('tube') || 
    d.includes('nipple') || d.includes('flange') || d.includes('drain') || 
    d.includes('grating') || d.includes('cockroach') || d.includes('hook') || 
    d.includes('rack bolt') || d.includes('shelves') || d.includes('waste coupling') ||
    d.includes('drain channel')
  ) {
    return 'allieds';
  }
  
  return 'faucets';
}

function getFiles(dir, relative = '') {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const relPath = path.join(relative, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, relPath));
    } else {
      if (/\.(png|jpe?g|webp|svg)$/i.test(file) && !/^(\d+)\.png$/i.test(file)) {
        const modelCode = path.parse(file).name;
        const subfolder = relative.replace(/\\/g, '/');
        const folderDisplayName = subfolder.split('/').pop();
        const category = getCategory(subfolder);
        
        results.push({
          id: 'hb-' + (category + '-' + modelCode).toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name: `${folderDisplayName} Model: ${modelCode}`,
          modelCode: modelCode,
          collection: folderDisplayName,
          category: category,
          subCategory: folderDisplayName,
          image: '/images/products/' + relPath.replace(/\\/g, '/'),
          tag: folderDisplayName,
        });
      }
    }
  });
  return results;
}

const allProducts = getFiles(root);

const fileContent = `import { Product } from '@/types';\n\nexport const allCatalogProducts: Product[] = ${JSON.stringify(allProducts, null, 2)};\n`;
fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'allCatalogProducts.ts'), fileContent, 'utf8');
console.log(`Successfully written allCatalogProducts.ts with ${allProducts.length} products!`);
