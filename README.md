# OpenCV WASM JS

OpenCV compiled to WebAssembly for JavaScript applications. Works in both browser and Node.js environments with easy NPM installation.

## 📦 Installation

```bash
npm install opencv-wasm-js
```

## 🚀 Quick Start

### Node.js (CommonJS)

```javascript
const cv = require('opencv-wasm-js');

async function main() {
  try {
    // Load OpenCV
    const opencv = await cv();
    
    // Create a test matrix
    const mat = new opencv.Mat(100, 100, opencv.CV_8UC1);
    console.log('Matrix created:', mat.rows + 'x' + mat.cols);
    console.log('OpenCV version:', opencv.getBuildInformation().split('\n')[0]);
    
    // Clean up
    mat.delete();
    console.log('✅ OpenCV WASM loaded successfully!');
  } catch (error) {
    console.error('❌ Failed to load OpenCV:', error);
  }
}

main();
```

### Node.js (ES6 Modules)

```javascript
import loadOpenCV from 'opencv-wasm-js';

async function main() {
  try {
    const cv = await loadOpenCV();
    
    // Your OpenCV code here
    const mat = new cv.Mat(100, 100, cv.CV_8UC1);
    console.log('Matrix created:', mat.rows + 'x' + mat.cols);
    mat.delete();
  } catch (error) {
    console.error('Failed to load OpenCV:', error);
  }
}

main();
```

### Browser (Script Tag)

```html
<!DOCTYPE html>
<html>
<head>
    <title>OpenCV WASM Test</title>
</head>
<body>
    <script>
        // Load from CDN or local files
        var Module = {
            onRuntimeInitialized() {
                const cv = Module;
                console.log('OpenCV loaded!');
                
                // Test OpenCV
                const mat = new cv.Mat(100, 100, cv.CV_8UC1);
                console.log('Matrix:', mat.rows + 'x' + mat.cols);
                mat.delete();
            }
        };
    </script>
    <script src="node_modules/opencv-wasm-js/opencv.js"></script>
</body>
</html>
```

### Browser (ES6 Modules with Bundler)

```javascript
import loadOpenCV from 'opencv-wasm-js';

async function initOpenCV() {
  try {
    const cv = await loadOpenCV();
    
    // OpenCV is ready
    const mat = new cv.Mat(100, 100, cv.CV_8UC1);
    console.log('OpenCV ready!', mat.rows + 'x' + mat.cols);
    mat.delete();
  } catch (error) {
    console.error('OpenCV load error:', error);
  }
}

initOpenCV();
```

## 🧪 Complete Example

```javascript
const cv = require('opencv-wasm-js');

async function imageProcessingExample() {
  try {
    const opencv = await cv();
    
    // Create a sample image (blue 200x200 image)
    const src = new opencv.Mat(200, 200, opencv.CV_8UC3, new opencv.Scalar(255, 0, 0));
    console.log('Created source image:', src.rows + 'x' + src.cols);
    
    // Convert to grayscale
    const gray = new opencv.Mat();
    opencv.cvtColor(src, gray, opencv.COLOR_BGR2GRAY);
    console.log('Converted to grayscale');
    
    // Apply Gaussian blur
    const blurred = new opencv.Mat();
    const ksize = new opencv.Size(15, 15);
    opencv.GaussianBlur(gray, blurred, ksize, 0);
    console.log('Applied Gaussian blur');
    
    // Edge detection
    const edges = new opencv.Mat();
    opencv.Canny(blurred, edges, 50, 150);
    console.log('Edge detection completed');
    
    // Clean up memory
    src.delete();
    gray.delete();
    blurred.delete();
    edges.delete();
    
    console.log('✅ Image processing example completed!');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

imageProcessingExample();
```

## 🔧 TypeScript Support

Full TypeScript definitions included:

```typescript
import loadOpenCV from 'opencv-wasm-js';

async function typedExample(): Promise<void> {
  const cv = await loadOpenCV();
  
  const mat: Mat = new cv.Mat(100, 100, cv.CV_8UC1);
  const size: Size = mat.size();
  
  console.log(`Matrix size: ${size.width}x${size.height}`);
  mat.delete();
}
```

## 🛠️ API Reference

The API is identical to OpenCV.js. Key classes and methods available after loading.

## 💾 Memory Management

Always remember to delete OpenCV objects:

```javascript
const mat = new cv.Mat(100, 100, cv.CV_8UC1);
// ... use mat
mat.delete(); // Important!
```

## 📄 License

Apache License 2.0 - see [LICENSE](LICENSE) file.