const fs = require('fs');
const path = require('path');

const root = __dirname;
const srcDir = path.join(root, 'src');
const publicDir = path.join(root, 'public');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return false;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(s, d);
    } else if (entry.isFile()) {
      fs.copyFileSync(s, d);
    }
  }
  return true;
}

function fail(message) {
  console.error('\nVERCEL BUILD CHECK FAILED');
  console.error(message);
  console.error('\nCurrent working directory:', process.cwd());
  console.error('Project root:', root);
  console.error('Root entries:', fs.readdirSync(root).join(', '));
  process.exit(1);
}

// Always create/recreate the public output from src, so Vercel definitely finds it after the build.
if (fs.existsSync(srcDir)) {
  fs.rmSync(publicDir, { recursive: true, force: true });
  copyRecursive(srcDir, publicDir);
} else {
  fs.mkdirSync(publicDir, { recursive: true });
  // Fallback for unusual local edits: copy root index/assets into public if src was removed.
  const rootIndex = path.join(root, 'index.html');
  const rootAssets = path.join(root, 'assets');
  if (fs.existsSync(rootIndex)) fs.copyFileSync(rootIndex, path.join(publicDir, 'index.html'));
  if (fs.existsSync(rootAssets)) copyRecursive(rootAssets, path.join(publicDir, 'assets'));
}

const indexPath = path.join(publicDir, 'index.html');
if (!fs.existsSync(publicDir) || !fs.statSync(publicDir).isDirectory()) {
  fail('The public output directory was not created.');
}
if (!fs.existsSync(indexPath)) {
  fail('public/index.html is missing. Vercel needs this file when Output Directory is public.');
}

const assetCss = path.join(publicDir, 'assets', 'css', 'styles.css');
const assetJs = path.join(publicDir, 'assets', 'js', 'main.js');
if (!fs.existsSync(assetCss) || !fs.existsSync(assetJs)) {
  fail('Required assets are missing from public/assets.');
}

console.log('Build OK: public/ output created successfully.');
console.log('Output directory:', publicDir);
console.log('public/ entries:', fs.readdirSync(publicDir).join(', '));
