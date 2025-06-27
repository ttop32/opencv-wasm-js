const cv = require('../index.js');

async function runTests() {
  console.log('🧪 Running OpenCV WASM NPM tests...\n');

  try {
    // Load OpenCV
    console.log('📦 Loading OpenCV WASM...');
    const opencv = await cv();
    console.log('✅ OpenCV loaded successfully!');
    console.log('📋 Version:', opencv.getBuildInformation().split('\n')[0]);

    // Test 1: Basic matrix operations
    console.log('\n🧪 Test 1: Basic matrix operations');
    const mat = new opencv.Mat(10, 10, opencv.CV_8UC1);
    console.log('  ✅ Created 10x10 matrix');
    console.log('  📏 Size:', mat.rows + 'x' + mat.cols);
    console.log('  🔢 Type:', mat.type());
    mat.delete();
    console.log('  🗑️ Memory cleaned up');

    // Test 2: Image processing
    console.log('\n🧪 Test 2: Image processing');
    const src = new opencv.Mat(100, 100, opencv.CV_8UC3, new opencv.Scalar(255, 0, 0));
    const gray = new opencv.Mat();
    opencv.cvtColor(src, gray, opencv.COLOR_BGR2GRAY);
    console.log('  ✅ Color conversion successful');
    console.log('  📊 Original channels:', src.channels());
    console.log('  📊 Gray channels:', gray.channels());
    src.delete();
    gray.delete();

    // Test 3: Mathematical operations
    console.log('\n🧪 Test 3: Mathematical operations');
    const mat1 = opencv.Mat.ones(5, 5, opencv.CV_32FC1);
    const mat2 = opencv.Mat.zeros(5, 5, opencv.CV_32FC1);
    const result = new opencv.Mat();
    opencv.add(mat1, mat2, result);
    console.log('  ✅ Matrix addition successful');
    mat1.delete();
    mat2.delete();
    result.delete();

    console.log('\n🎉 All tests passed!');
    console.log('💡 OpenCV WASM NPM package is ready for use!');

  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  runTests();
}

module.exports = runTests;