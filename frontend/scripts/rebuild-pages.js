import fs from 'fs';
import path from 'path';

const root = process.cwd();
const srcDir = path.join(root, 'src', 'pages');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (entry.isFile() && full.endsWith('.jsx')) return full;
    return [];
  });
}

function makeComponentName(filePath) {
  const rel = path.relative(srcDir, filePath);
  const parts = rel.split(path.sep);
  const fileName = parts.pop().replace(/\.jsx$/, '');
  return fileName;
}

function createPlaceholder(name, isLayout) {
  if (isLayout) {
    return `import { Outlet } from 'react-router-dom';

export default function ${name}() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Outlet />
    </div>
  );
}
`;
  }

  const title = name.replace(/([A-Z])/g, ' $1').trim();
  return `export default function ${name}() {
  return (
    <section className="min-h-screen bg-slate-950 text-slate-100 px-6 py-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-black/20">
        <h1 className="text-3xl font-semibold text-white">${title}</h1>
        <p className="mt-4 text-slate-300">This is the ${title} page.</p>
      </div>
    </section>
  );
}
`;
}

const files = walk(srcDir);
for (const file of files) {
  const name = makeComponentName(file);
  const isLayout = name.endsWith('Layout');
  const content = createPlaceholder(name, isLayout);
  fs.writeFileSync(file, content, 'utf8');
}
console.log('Rebuilt', files.length, 'JSX page/component files');
