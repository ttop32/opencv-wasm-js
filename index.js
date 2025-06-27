const fs = require('fs');
const path = require('path');

let cv = null;
let loadPromise = null;

function loadOpenCV() {
  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    try {
      // Check if we're in Node.js or browser
      const isNode = typeof window === 'undefined' && typeof global !== 'undefined';
      
      if (isNode) {
        // Node.js environment - single file with embedded WASM
        global.Module = {
          onRuntimeInitialized() {
            cv = global.Module;
            resolve(cv);
          },
          onAbort: (error) => {
            reject(new Error('OpenCV WASM loading aborted: ' + error));
          }
        };

        // Load the single OpenCV JavaScript file (WASM is embedded)
        require('./opencv.js');
      } else {
        // Browser environment
        if (typeof Module === 'undefined') {
          global.Module = {};
        }

        Module.onRuntimeInitialized = () => {
          cv = Module;
          resolve(cv);
        };

        Module.onAbort = (error) => {
          reject(new Error('OpenCV WASM loading aborted: ' + error));
        };

        // In browser, opencv.js should be loaded via script tag
        // or the user should call the loader manually
        if (typeof cv !== 'undefined' && cv !== null) {
          resolve(cv);
        } else {
          // Try to load dynamically if in a module bundler environment
          try {
            require('./opencv.js');
          } catch (e) {
            reject(new Error('OpenCV not loaded. In browser, include opencv.js via script tag first.'));
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });

  return loadPromise;
}

// Create the main export function
function opencvLoader() {
  return loadOpenCV();
}

// Add ready property for convenience
Object.defineProperty(opencvLoader, 'ready', {
  get: function() {
    return loadOpenCV();
  }
});

// For CommonJS compatibility
opencvLoader.default = opencvLoader;

module.exports = opencvLoader;