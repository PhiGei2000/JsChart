function cubicInterpolate(points, ptIndex, coe) {
    var mat = new Matrix4x4();
    var vec = new Vector4();

    if(ptIndex == 0) {        
        mat.values = [
            Math.pow(points[0].x, 3), Math.pow(points[0].x, 2), points[0].x, 1,
            Math.pow(points[1].x, 3), Math.pow(points[1].x, 2), points[1].x, 1,
            Math.pow(points[2].x, 3), Math.pow(points[2].x, 2), points[2].x, 1,
            6 * points[0].x, 2, 0, 0
        ];

        vec.values = [
            points[0].y, 
            points[1].y,
            points[2].y,
            0
        ];        
    }
    else if(ptIndex < points.length - 2) {        
        mat.values = [
            3 * Math.pow(points[ptIndex].x, 2), 2 * points[ptIndex].x, 1, 0,
            Math.pow(points[ptIndex].x, 3), Math.pow(points[ptIndex].x, 2), points[ptIndex].x, 1,
            Math.pow(points[ptIndex + 1].x, 3), Math.pow(points[ptIndex + 1].x, 2), points[ptIndex + 1].x, 1,
            Math.pow(points[ptIndex + 2].x, 3), Math.pow(points[ptIndex + 2].x, 2), points[ptIndex + 2].x, 1
        ];

        vec.values = [
            3 * coe.values[0] * Math.pow(points[ptIndex].x, 2) + 2 * coe.values[1] * points[ptIndex].x + coe.values[2],
            points[ptIndex].y,
            points[ptIndex + 1].y,
            points[ptIndex + 2].y
        ];

    }      
    else if (ptIndex < points.length - 1) {
        mat.values = [
            3 * Math.pow(points[ptIndex].x, 2), 2 * points[ptIndex].x, 1, 0,
            Math.pow(points[ptIndex].x, 3), Math.pow(points[ptIndex].x, 2), points[ptIndex].x, 1,
            Math.pow(points[ptIndex + 1].x, 3), Math.pow(points[ptIndex + 1].x, 2), points[ptIndex + 1].x, 1,
            Math.pow(points[ptIndex - 1].x, 3), Math.pow(points[ptIndex - 1].x, 2), points[ptIndex - 1].x, 1
        ];

        vec.values = [
            3 * coe.values[0] * Math.pow(points[ptIndex].x, 2) + 2 * coe.values[1] * points[ptIndex].x + coe.values[2],
            points[ptIndex].y,
            points[ptIndex + 1].y,
            points[ptIndex - 1].y
        ];
    }
    else {
        var lastIndex = points.length - 1;
        
        mat.values = [
            Math.pow(points[lastIndex].x, 3), Math.pow(points[lastIndex].x, 2), points[lastIndex].x, 1,
            Math.pow(points[lastIndex - 1].x, 3), Math.pow(points[lastIndex - 1].x, 2), points[lastIndex - 1].x, 1,
            3 * Math.pow(points[ptIndex].x, 2), 2 * points[ptIndex].x, 1, 0,
            6 * points[lastIndex].x, 2, 0, 0
        ];
        
        vec.values = [
            points[lastIndex].y, 
            points[lastIndex - 1].y,
            3 * coe.values[0] * Math.pow(points[ptIndex].x, 2) + 2 * coe.values[1] * points[ptIndex].x + coe.values[2],
            0
        ];
    }  
    return mat.getInverse().multiplyVector(vec);                    
}
