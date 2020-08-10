function cubicInterpolate(points, ptIndex, coe) {
    var mat = new Matrix(4, []);
    var vec = new Vector([]);

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

function catmullRomInterpolation(points, numberOfPoints) {
    var result = [];
    const alpha = 0.5;

    function getT(t, p0, p1) {
        return Math.pow((Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2)), alpha / 2);
    }

    function multPoint(val, pt) {
        return { x: val * pt.x, y: val * pt.y };
    }

    function addPoint(pt0, pt1) {
        return { x: pt0.x + pt1.x, y: pt0.y + pt1.y };
    }

    for(var p = 0; p < points.length - 1; p++) {
        var p0, p1, p2, p3;
        
        if(p == 0) {
            p0 = { x: points[0].x - 1, y: points[0].y };
            p1 = points[p];
            p2 = points[p + 1];
            p3 = points[p + 2];
        }     
        else if(p == points.length - 2) {
            p0 = points[p - 1];
            p1 = points[p];
            p2 = points[p + 1];
            p3 = { x: points[p + 1].x + 1, y: points[p + 1].y };
        }
        else {
            p0 = points[p - 1];
            p1 = points[p];
            p2 = points[p + 1];
            p3 = points[p + 2];            
        }

        const t0 = 0;
        const t1 = getT(t0, p0, p1);
        const t2 = getT(t1, p1, p2);
        const t3 = getT(t2, p2, p3);

        const dt = t2 - t1;
        const stepSize = dt / numberOfPoints;

        for(var t = t1; t < t2; t += stepSize) {
            var a1 = addPoint(multPoint((t1 - t) / (t1 - t0), p0), multPoint((t - t0) / (t1 - t0), p1));
            var a2 = addPoint(multPoint((t2 - t) / (t2 - t1), p1), multPoint((t - t1) / (t2 - t1), p2));
            var a3 = addPoint(multPoint((t3 - t) / (t3 - t2), p2), multPoint((t - t2) / (t3 - t2), p3));            

            var b1 = addPoint(multPoint((t2 - t) / (t2 - t0), a1), multPoint((t - t0) / (t2 - t0), a2));
            var b2 = addPoint(multPoint((t3 - t) / (t3 - t1), a2), multPoint((t - t1) / (t3 - t1), a3));

            var c = addPoint(multPoint((t2 - t) / (t2 - t1), b1), multPoint((t - t1) / (t2 - t1), b2));

            result.push(c);
        }

    }
    return result;
}

function getDist(p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    
    return Math.sqrt(dx * dx + dy * dy);
}