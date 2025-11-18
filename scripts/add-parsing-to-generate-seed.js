// Temporary script to add catalogNumberNumeric and catalogNumberSuffix to all forEach blocks
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'generate-seed-data.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Find all variable names used in forEach blocks
const forEachMatches = content.matchAll(/\.forEach\(\((\w+):\s*any\)\s*=>\s*\{/g);
const variableNames = [...forEachMatches].map(match => match[1]);

console.log('Found variables:', variableNames);

// For each forEach block, add parsed variable and fields
// Pattern:
//   forEach((varName: any) => {
//     ...possibly some const declarations...
//     seedData.push({
//       catalogNumber: varName.k,

// Replace pattern to add parsing
for (const varName of variableNames) {
  // Pattern 1: Direct seedData.push without intermediate variables
  const directPattern = new RegExp(
    `(\\.forEach\\(\\(${varName}:\\s*any\\)\\s*=>\\s*\\{\\s*)(seedData\\.push\\(\\{\\s*catalogNumber:\\s*${varName}\\.k,)`,
    'g'
  );

  content = content.replace(directPattern, (match, p1, p2) => {
    return `${p1}const parsed = parseCatalogNumber(${varName}.k)

  ${p2}
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,`;
  });

  // Pattern 2: With const declarations before seedData.push
  const withConstsPattern = new RegExp(
    `(\\.forEach\\(\\(${varName}:\\s*any\\)\\s*=>\\s*\\{[^}]*?)(seedData\\.push\\(\\{\\s*catalogNumber:\\s*${varName}\\.k,)`,
    'g'
  );

  content = content.replace(withConstsPattern, (match, p1, p2) => {
    // Check if parsed is already defined
    if (p1.includes('const parsed')) {
      // Already has parsed, just add fields
      if (!p2.includes('catalogNumberNumeric')) {
        return p1 + p2 + `
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,`;
      }
      return match; // Already processed
    } else {
      // Add parsed variable
      const lines = p1.split('\n');
      const lastConstIndex = lines.findLastIndex(line => line.trim().startsWith('const '));
      if (lastConstIndex >= 0) {
        lines.splice(lastConstIndex + 1, 0, '  const parsed = parseCatalogNumber(' + varName + '.k)');
      } else {
        // No const declarations, add after forEach opening
        const bracketIndex = lines.findIndex(line => line.includes('=>  {'));
        lines.splice(bracketIndex + 1, 0, '  const parsed = parseCatalogNumber(' + varName + '.k)');
      }
      const newP1 = lines.join('\n');

      if (!p2.includes('catalogNumberNumeric')) {
        return newP1 + p2 + `
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,`;
      }
      return newP1 + p2;
    }
  });
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('✅ Updated generate-seed-data.ts with parsed catalog numbers');
