const fs = require('fs');
const path = require('path');

const typeImports = [
  'ReactNode',
  'UserProfile',
  'StudentRecord',
  'TeacherRecord',
  'SchoolClass',
  'Assignment',
  'ExamRecord',
  'FeeRecord',
  'Notice',
  'AttendanceEntry',
  'Partial',
  'Omit',
];

function walk(dir) {
  return fs.readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) return walk(full);
    if (full.endsWith('.jsx')) return [full];
    return [];
  });
}

function cleanImportLine(line) {
  const match = line.match(/import\s*{([^}]*)}\s*from\s*['\"][^'\"]+['\"];?\s*$/);
  if (!match) return line;
  const imports = match[1]
    .split(',')
    .map((token) => token.trim())
    .filter(Boolean)
    .filter((name) => !typeImports.includes(name));
  if (imports.length === 0) {
    if (line.includes("from 'react'") || line.includes('from \"react\"')) {
      return '';
    }
    return '';
  }
  return line.replace(match[1], imports.join(', '));
}

function stripTypes(text) {
  let out = text;

  // Remove non-null assertions
  out = out.replace(/\!\)/g, ')').replace(/\!\s*;/g, ';').replace(/\!\s*\n/g, '\n');

  // Remove interface and type declarations
  out = out.replace(/export\s+interface\s+\w+\s*{[\s\S]*?^}\s*$/gm, '');
  out = out.replace(/interface\s+\w+\s*{[\s\S]*?^}\s*$/gm, '');
  out = out.replace(/export\s+type\s+\w+\s*=\s*[\s\S]*?;\s*/g, '');
  out = out.replace(/type\s+\w+\s*=\s*[\s\S]*?;\s*/g, '');

  // Remove type-only imports
  out = out
    .split('\n')
    .map((line) => cleanImportLine(line))
    .filter((line) => line.trim() !== '')
    .join('\n');

  // Remove ReactNode in types
  out = out.replace(/ReactNode/g, '');

  // Remove type params and return types in functions
  out = out.replace(/\)\s*:\s*[^=\{\n]+\s*=>/g, ') =>');
  out = out.replace(/\)\s*:\s*[^\{\n]+\s*\{/g, ') {');
  out = out.replace(/function\s+\w+\s*\([^\)]*\)/g, (match) => match.replace(/\s*:\s*[^,\)]+/g, ''));
  out = out.replace(/\(\s*\)\s*\|\s*[^\)]+/g, '()');

  // Remove type annotations in parameters and variable declarations
  out = out.replace(/([\w$]+)\s*:\s*[^=,\)\n]+(?=[=,\)\n])/g, '$1');
  out = out.replace(/\b(const|let|var)\s+([A-Za-z0-9_$]+)\s*:\s*[^=;\n]+(?=[=;\n])/g, '$1 $2');

  // Strip generic type arguments inside useState/useEffect/createContext etc.
  out = out.replace(/(useState|useEffect|useMemo|useContext|createContext|useRef|useCallback|useReducer|React\.useState|React\.useRef)<[^>]+>/g, '$1');

  // Strip generic type arguments in JSX function definitions and component props
  out = out.replace(/<[^>]+>/g, '');
  return out;
}

const files = walk(path.join(__dirname, '..', 'src'));
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const cleaned = stripTypes(text);
  fs.writeFileSync(file, cleaned, 'utf8');
}
console.log('Processed', files.length, 'jsx files');
