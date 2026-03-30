const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'dist', 'frontend', 'browser', 'assets', 'esri');

const patchCode = `
// ArcGIS CSP Nonce Patch - Auto-generated
(function() {
  var nonce = document.currentScript && document.currentScript.getAttribute ? document.currentScript.getAttribute('nonce') : window.__CSP_NONCE__;
  if (!nonce) return;
  
  var originalCreateElement = Document.prototype.createElement;
  Document.prototype.createElement = function(tagName, options) {
    var element = originalCreateElement.call(this, tagName, options);
    if ((tagName === 'script' || tagName === 'style') && !element.hasAttribute('nonce')) {
      element.setAttribute('nonce', nonce);
    }
    return element;
  };
  
  var originalCreateElementNS = Document.prototype.createElementNS;
  Document.prototype.createElementNS = function(ns, tagName, options) {
    var element = originalCreateElementNS.call(this, ns, tagName, options);
    if ((tagName === 'script' || tagName === 'style') && !element.hasAttribute('nonce')) {
      element.setAttribute('nonce', nonce);
    }
    return element;
  };
  
  console.log('[CSP] ArcGIS nonce patch applied:', nonce);
})();
`;

function patchFile(filePath) {
  if (!filePath.endsWith('.js')) return;
  
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Skip if already patched
    if (content.includes('[CSP] ArcGIS nonce patch')) {
      console.log('Already patched:', filePath);
      return;
    }
    
    // Insert patch code at the beginning
    content = patchCode + '\n' + content;
    fs.writeFileSync(filePath, content);
    console.log('Patched:', filePath);
  } catch (err) {
    console.error('Error patching', filePath, err.message);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) {
    console.error('Directory not found:', dir);
    return;
  }
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (stat.isFile()) {
      patchFile(fullPath);
    }
  }
}

console.log('Patching ArcGIS assets in:', assetsDir);
walkDir(assetsDir);
console.log('ArcGIS assets patching complete');