const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const outputDir = path.join(rootDir, "dist");
const ignored = new Set([
  ".git",
  ".vercel",
  "dist",
  "node_modules",
  "build.js",
  "package-lock.json",
  "package.json",
  "start-local.ps1",
  "vercel.json",
]);

function copyDir(source, target) {
  fs.mkdirSync(target, { recursive: true });

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;

    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      copyDir(sourcePath, targetPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

fs.rmSync(outputDir, { recursive: true, force: true });
copyDir(rootDir, outputDir);
console.log(`Build concluido em ${outputDir}`);
