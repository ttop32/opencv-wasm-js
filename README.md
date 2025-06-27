# OpenCV WASM JS

OpenCV compiled to WebAssembly for JavaScript applications.

## Quick Test

```html
<!DOCTYPE html>
<html>
<body>
    <script>
        var Module = {
            onRuntimeInitialized() {
                // Create a 3x3 matrix
                const mat = new cv.Mat(3, 3, cv.CV_8UC1);
                console.log('Mat created:', mat.rows + 'x' + mat.cols);
                console.log('OpenCV version:', cv.getBuildInformation().split('\n')[0]);
                mat.delete(); // Cleanup
            }
        };
    </script>
    <script src="opencv.js"></script>
</body>
</html>