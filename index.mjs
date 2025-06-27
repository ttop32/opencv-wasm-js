let cv = null;
let loadPromise = null;

async function loadOpenCV() {
  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise(async (resolve, reject) => {
    try {
      // Check environment
      const isNode = typeof window === 'undefined' && typeof global !== 'undefined';
      
      if (isNode) {
        // Node.js environment
        const fs = await import('fs');
        const path = await import('path');
        const url = await import('url');
        
        const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
        const wasmPath = path.join(__dirname, 'opencv_js.wasm');
        
        if (!fs.existsSync(wasmPath)) {
          reject(new Error('OpenCV WASM file not found.'));
          return;
        }

        const wasmBinary = fs.readFileSync(wasmPath);
        
        globalThis.Module = {
          wasmBinary: wasmBinary,
          onRuntimeInitialized() {
            cv = globalThis.Module;
            resolve(cv);
          },
          onAbort: (error) => {
            reject(new Error('OpenCV WASM loading aborted: ' + error));
          }
        };

        // Dynamic import of OpenCV
        await import('./opencv.js');
      } else {
        // Browser environment
        if (typeof Module === 'undefined') {
          globalThis.Module = {};
        }

        Module.onRuntimeInitialized = () => {
          cv = Module;
          resolve(cv);
        };

        // For ES6 modules in browser, opencv.js should be imported
        reject(new Error('In browser with ES6 modules, import opencv.js directly'));
      }
    } catch (error) {
      reject(error);
    }
  });

  return loadPromise;
}

export default loadOpenCV;
export { loadOpenCV as ready };