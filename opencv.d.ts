declare module 'opencv-wasm-js' {
    interface Mat {
      rows: number;
      cols: number;
      type(): number;
      channels(): number;
      depth(): number;
      empty(): boolean;
      size(): Size;
      clone(): Mat;
      copyTo(dst: Mat): void;
      convertTo(dst: Mat, rtype: number, alpha?: number, beta?: number): void;
      setTo(value: Scalar | number): void;
      delete(): void;
      data: Uint8Array | Uint16Array | Float32Array;
      data8U: Uint8Array;
      data8S: Int8Array;
      data16U: Uint16Array;
      data16S: Int16Array;
      data32S: Int32Array;
      data32F: Float32Array;
      data64F: Float64Array;
    }
  
    interface Size {
      width: number;
      height: number;
    }
  
    interface Point {
      x: number;
      y: number;
    }
  
    interface Rect {
      x: number;
      y: number;
      width: number;
      height: number;
    }
  
    interface Scalar {
      constructor(v0: number, v1?: number, v2?: number, v3?: number): Scalar;
    }
  
    interface MatVector {
      size(): number;
      get(index: number): Mat;
      push_back(mat: Mat): void;
      delete(): void;
    }
  
    interface OpenCVAPI {
      // Mat constructors
      Mat: {
        new(): Mat;
        new(rows: number, cols: number, type: number): Mat;
        new(rows: number, cols: number, type: number, scalar: Scalar): Mat;
        new(size: Size, type: number): Mat;
        new(size: Size, type: number, scalar: Scalar): Mat;
        eye(rows: number, cols: number, type: number): Mat;
        ones(rows: number, cols: number, type: number): Mat;
        zeros(rows: number, cols: number, type: number): Mat;
      };
  
      // Basic types
      Size: { new(width: number, height: number): Size };
      Point: { new(x: number, y: number): Point };
      Rect: { new(x: number, y: number, width: number, height: number): Rect };
      Scalar: { new(v0: number, v1?: number, v2?: number, v3?: number): Scalar };
      MatVector: { new(): MatVector };
  
      // Constants
      CV_8UC1: number;
      CV_8UC2: number;
      CV_8UC3: number;
      CV_8UC4: number;
      CV_8SC1: number;
      CV_16UC1: number;
      CV_16SC1: number;
      CV_32SC1: number;
      CV_32FC1: number;
      CV_64FC1: number;
  
      // Color conversion codes
      COLOR_BGR2GRAY: number;
      COLOR_BGR2RGB: number;
      COLOR_RGB2BGR: number;
      COLOR_GRAY2BGR: number;
      COLOR_BGR2HSV: number;
      COLOR_HSV2BGR: number;
  
      // Border types
      BORDER_CONSTANT: number;
      BORDER_REPLICATE: number;
      BORDER_REFLECT: number;
      BORDER_WRAP: number;
      BORDER_REFLECT_101: number;
      BORDER_TRANSPARENT: number;
      BORDER_DEFAULT: number;
  
      // Morphological operations
      MORPH_ERODE: number;
      MORPH_DILATE: number;
      MORPH_OPEN: number;
      MORPH_CLOSE: number;
      MORPH_GRADIENT: number;
      MORPH_TOPHAT: number;
      MORPH_BLACKHAT: number;
  
      // Image processing functions
      cvtColor(src: Mat, dst: Mat, code: number, dstCn?: number): void;
      resize(src: Mat, dst: Mat, dsize: Size, fx?: number, fy?: number, interpolation?: number): void;
      GaussianBlur(src: Mat, dst: Mat, ksize: Size, sigmaX: number, sigmaY?: number, borderType?: number): void;
      blur(src: Mat, dst: Mat, ksize: Size, anchor?: Point, borderType?: number): void;
      Canny(src: Mat, dst: Mat, threshold1: number, threshold2: number, apertureSize?: number, L2gradient?: boolean): void;
      threshold(src: Mat, dst: Mat, thresh: number, maxval: number, type: number): number;
      adaptiveThreshold(src: Mat, dst: Mat, maxValue: number, adaptiveMethod: number, thresholdType: number, blockSize: number, C: number): void;
  
      // Morphological operations
      erode(src: Mat, dst: Mat, kernel: Mat, anchor?: Point, iterations?: number, borderType?: number, borderValue?: Scalar): void;
      dilate(src: Mat, dst: Mat, kernel: Mat, anchor?: Point, iterations?: number, borderType?: number, borderValue?: Scalar): void;
      morphologyEx(src: Mat, dst: Mat, op: number, kernel: Mat, anchor?: Point, iterations?: number, borderType?: number, borderValue?: Scalar): void;
  
      // Filtering
      filter2D(src: Mat, dst: Mat, ddepth: number, kernel: Mat, anchor?: Point, delta?: number, borderType?: number): void;
      bilateralFilter(src: Mat, dst: Mat, d: number, sigmaColor: number, sigmaSpace: number, borderType?: number): void;
  
      // Geometric transformations
      warpAffine(src: Mat, dst: Mat, M: Mat, dsize: Size, flags?: number, borderMode?: number, borderValue?: Scalar): void;
      warpPerspective(src: Mat, dst: Mat, M: Mat, dsize: Size, flags?: number, borderMode?: number, borderValue?: Scalar): void;
      getRotationMatrix2D(center: Point, angle: number, scale: number): Mat;
  
      // Feature detection
      findContours(image: Mat, contours: MatVector, hierarchy: Mat, mode: number, method: number, offset?: Point): void;
      drawContours(image: Mat, contours: MatVector, contourIdx: number, color: Scalar, thickness?: number, lineType?: number, hierarchy?: Mat, maxLevel?: number, offset?: Point): void;
  
      // Math operations
      add(src1: Mat, src2: Mat, dst: Mat, mask?: Mat, dtype?: number): void;
      subtract(src1: Mat, src2: Mat, dst: Mat, mask?: Mat, dtype?: number): void;
      multiply(src1: Mat, src2: Mat, dst: Mat, scale?: number, dtype?: number): void;
      divide(src1: Mat, src2: Mat, dst: Mat, scale?: number, dtype?: number): void;
      addWeighted(src1: Mat, alpha: number, src2: Mat, beta: number, gamma: number, dst: Mat, dtype?: number): void;
  
      // Utility functions
      split(src: Mat, dst: MatVector): void;
      merge(src: MatVector, dst: Mat): void;
      flip(src: Mat, dst: Mat, flipCode: number): void;
      transpose(src: Mat, dst: Mat): void;
  
      // System functions
      getBuildInformation(): string;
      onRuntimeInitialized(): void;
    }
  
    interface OpenCVLoader {
      (): Promise<OpenCVAPI>;
      ready: Promise<OpenCVAPI>;
    }
  
    const cv: OpenCVLoader;
    export = cv;
  }