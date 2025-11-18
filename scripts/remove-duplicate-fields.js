// Script to remove duplicate catalogNumberNumeric and catalogNumberSuffix fields
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'generate-seed-data.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Find all seedData.push blocks and remove duplicates
// Pattern: catalogNumber: xxx, followed by multiple catalogNumberNumeric and catalogNumberSuffix
const pattern = /(catalogNumber:\s*\w+\.k,\s*catalogNumberNumeric:\s*parsed\.numeric,\s*catalogNumberSuffix:\s*parsed\.suffix,)(\s*catalogNumberNumeric:\s*parsed\.numeric,\s*catalogNumberSuffix:\s*parsed\.suffix,)+/g;

const before = content.length;
content = content.replace(pattern, '$1');
const after = content.length;

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`✅ Removed duplicate fields`);
console.log(`   Reduced file size by ${before - after} characters`);
