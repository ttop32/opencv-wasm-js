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
        // Node.js environment - single file with embedded WASM
        globalThis.Module = {
          onRuntimeInitialized() {
            cv = globalThis.Module;
            resolve(cv);
          },
          onAbort: (error) => {
            reject(new Error('OpenCV WASM loading aborted: ' + error));
          }
        };

        // Dynamic import of OpenCV single file
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

        Module.onAbort = (error) => {
          reject(new Error('OpenCV WASM loading aborted: ' + error));
        };

        // For ES6 modules in browser, opencv.js should be imported
        reject(new Error('In browser with ES6 modules, import opencv.js directly or use script tag'));
      }
    } catch (error) {
      reject(error);
    }
  });

  return loadPromise;
}

export default loadOpenCV;
export { loadOpenCV as ready };