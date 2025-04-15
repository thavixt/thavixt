/**
 * UNUSED
 * 
 * instead: https://tailwind-to-css.vercel.app/
 * just do it manually
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parse } from "@babel/parser";
import babelTraverse from "@babel/traverse";
import prettier from "prettier";
import crypto from "crypto";
import { execSync } from "child_process";

const traverse = babelTraverse.default;
// __dirname polyfill for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = "./packages/uikit/src/components/CopyToClipboard";
const EXCLUDED = ['.stories.', '.css', '.cy.'];

function generateClassName(classes) {
  return "tw_" + crypto.createHash("md5").update(classes).digest("hex").slice(0, 6);
}

function extractClassNames(code) {
  const ast = parse(code, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });

  const classNames = new Map();

  traverse(ast, {
    JSXAttribute(path) {
      if (path.node.name.name === "className") {
        const valueNode = path.node.value;
        if (valueNode?.type === "StringLiteral") {
          const original = valueNode.value;
          if (!classNames.has(original)) {
            const generated = generateClassName(original);
            classNames.set(original, generated);
          }
        }
      }
    },
  });

  return classNames;
}

function replaceClassNames(code, classMap) {
  classMap.forEach((newClass, oldClasses) => {
    const regex = new RegExp(`className=["']${oldClasses}["']`, "g");
    code = code.replace(regex, `className="${newClass}"`);
  });
  return code;
}

function generateCSSFromTailwind(twClasses, outputPath) {
  const htmlStub = `<div class="${twClasses.join(" ")}"></div>`;
  const tempHtml = path.join(__dirname, "temp.html");
  const tempCss = path.join(__dirname, "temp.css");

  fs.writeFileSync(tempHtml, htmlStub);

  execSync(`npx tailwindcss -i ${tempHtml} -o ${tempCss} --content ${tempHtml}`, {
    stdio: "inherit",
  });

  const rawCSS = fs.readFileSync(tempCss, "utf-8");
  fs.unlinkSync(tempHtml);
  fs.unlinkSync(tempCss);
  return rawCSS;
}

function migrateFile(filePath) {
  console.log('Migrating file:', filePath);
  const ext = path.extname(filePath);
  if (![".tsx", ".jsx"].includes(ext)) {
    console.warn('Not a React component file, skip');
    return;
  }

  const filename = path.basename(filePath, ext);
  const cssPath = path.join(path.dirname(filePath), `${filename}.css`);
  let code = fs.readFileSync(filePath, "utf-8");

  const classMap = extractClassNames(code);
  console.log('classMap:', Array.from(classMap));

  if (classMap.size === 0) return;

  const tailwindClasses = Array.from(classMap.keys());
  let finalCSS = "";

  classMap.forEach((newClass, twClasses) => {
    const htmlStub = `<div class="${twClasses}"></div>`;
    const tempPath = path.join(__dirname, `stub-${newClass}.html`);
    const cssOut = path.join(__dirname, `out-${newClass}.css`);
    fs.writeFileSync(tempPath, htmlStub);
    execSync(`npx tailwindcss -i ${tempPath} -o ${cssOut} --content ${tempPath}`);
    let cssContent = fs.readFileSync(cssOut, "utf-8");
    cssContent = cssContent.replace(/\.([\w-]+)\s*/g, `.${newClass} `);
    finalCSS += cssContent + "\n";
    fs.unlinkSync(tempPath);
    fs.unlinkSync(cssOut);
  });

  fs.writeFileSync(cssPath, finalCSS);

  const updatedCode = replaceClassNames(code, classMap);
  const importLine = `import './${filename}.css';\n`;
  const finalCode = importLine + updatedCode;

  const formatted = prettier.format(finalCode, { parser: "typescript" });
  fs.writeFileSync(filePath, formatted);

  console.log(`✅ Migrated ${filePath}`);
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    if (EXCLUDED.some(part => file.includes(part))) {
      console.debug('Skip', file);
      return;
    } else {
      console.log('Processing', file);
    }

    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      walkDir(fullPath);
    } else {
      migrateFile(fullPath);
    }
  });
}

walkDir(SRC_DIR);
