# OpenCV WASM JS

OpenCV compiled to WebAssembly for JavaScript applications. **Features single `opencv.js` file with embedded WASM** for maximum simplicity. Works in both browser and Node.js environments with easy NPM installation.

## 📦 Installation

```bash
npm install opencv-wasm-js
```

## ✨ Key Features

- ✅ **Single File**: `opencv.js` contains everything - **WASM is embedded**
- ✅ **NPM Ready**: Direct installation and automatic loading
- ✅ **Node.js Support**: Automatic loading in Node.js
- ✅ **Browser Support**: Script tag loading or module bundler compatible
- ✅ **TypeScript**: Full TypeScript definitions included
- ✅ **Easy Deployment**: Only one file to serve

## 🚀 Quick Start

### Node.js (Automatic Loading)

The simplest way - let the package handle everything:

```javascript
const cv = require('opencv-wasm-js');

async function main() {
  try {
    // Load OpenCV (single file with embedded WASM)
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

For modern ES6 module syntax:

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

### Browser (Script Tag - Single File)

Load the single file directly in browser:

```html
<!DOCTYPE html>
<html>
<head>
    <title>OpenCV WASM Test</title>
</head>
<body>
    <script>
        // Configure OpenCV before loading
        var Module = {
            onRuntimeInitialized() {
                const cv = Module;
                console.log('OpenCV loaded!');
                console.log('Version:', cv.getBuildInformation().split('\n')[0]);
                
                // Test OpenCV
                const mat = new cv.Mat(100, 100, cv.CV_8UC1);
                console.log('Matrix:', mat.rows + 'x' + mat.cols);
                mat.delete();
            }
        };
    </script>
    <!-- Load single OpenCV.js file - WASM is embedded -->
    <script src="node_modules/opencv-wasm-js/opencv.js"></script>
</body>
</html>
```

### Browser (ES6 Modules with Bundler)

For webpack, rollup, vite, etc:

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

## 📁 File Structure & Access

When you install the package, you get a single file:

```
node_modules/opencv-wasm-js/
├── index.js          # CommonJS loader (automatic)
├── index.mjs         # ES6 module loader (automatic)
├── opencv.js         # OpenCV JavaScript runtime (SINGLE FILE with embedded WASM)
├── opencv.d.ts       # TypeScript definitions
├── package.json      # NPM package configuration
└── README.md         # Documentation
```

### Direct File Access

Access the single file directly when needed:

```javascript
// Get file path
const opencvJsPath = require.resolve('opencv-wasm-js/opencv.js');
console.log('OpenCV JS file:', opencvJsPath);

// Use with custom loaders
import opencvJs from 'opencv-wasm-js/opencv.js';
// No separate WASM file needed!
```

### Manual Loading (Advanced)

For custom loading scenarios:

```javascript
// Single file - no manual WASM loading needed
global.Module = {
    onRuntimeInitialized() {
        const cv = global.Module;
        console.log('OpenCV ready!');
        // Use OpenCV here
    }
};

// Load single OpenCV.js file
require('opencv-wasm-js/opencv.js');
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

## 🛠️ Webpack Configuration

For bundlers like Webpack, you might need to configure asset handling:

```javascript
// webpack.config.js
module.exports = {
    resolve: {
        fallback: {
            "fs": false,
            "path": false
        }
    }
};
```

## 🧪 Testing

Test your installation:

```bash
# Test Node.js (automatic loading)
npm test

# Test browser (manual)
npm run test:browser
```

## 🔍 Single File Benefits

**Why single file is better:**

✅ **Simplest Deployment**: Only one file to serve  
✅ **No File Dependencies**: WASM is embedded, no separate files  
✅ **CDN Friendly**: Single URL to include  
✅ **Easy Distribution**: One file to share  
✅ **No Path Issues**: No need to manage multiple file paths  
✅ **Instant Loading**: No separate WASM download needed  

## 💾 Memory Management

Always remember to delete OpenCV objects:

```javascript
const mat = new cv.Mat(100, 100, cv.CV_8UC1);
// ... use mat
mat.delete(); // Important: prevent memory leaks!
```

## 🚀 Usage in Different Environments

### Vite

```javascript
// vite handles single file automatically
import loadOpenCV from 'opencv-wasm-js';
const cv = await loadOpenCV();
```

### Next.js

```javascript
// Use dynamic import to avoid SSR issues
const loadOpenCV = dynamic(() => import('opencv-wasm-js'), {
    ssr: false
});
```

### React

```javascript
import { useEffect, useState } from 'react';
import loadOpenCV from 'opencv-wasm-js';

function OpenCVComponent() {
    const [cv, setCv] = useState(null);
    
    useEffect(() => {
        loadOpenCV().then(setCv);
    }, []);
    
    if (!cv) return <div>Loading OpenCV...</div>;
    
    // Use OpenCV here
    return <div>OpenCV ready!</div>;
}
```

### Vanilla JavaScript (Browser)

```html
<!-- Simplest way - just include and use -->
<script>
    var Module = {
        onRuntimeInitialized() {
            console.log('OpenCV ready!');
            // Use Module directly here
        }
    };
</script>
<script src="https://unpkg.com/opencv-wasm-js/opencv.js"></script>
```

## 📄 License

Apache License 2.0 - see LICENSE file.

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines.

## 📞 Support

- GitHub Issues: Report bugs and request features
- Documentation: See examples and API reference  
- Community: Join discussions and get help

## 🔗 Repository

This package is maintained at: https://github.com/ttop32/opencv-wasm-js