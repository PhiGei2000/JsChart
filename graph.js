class Graph {
    constructor(pts) {
        this.points = pts;
        this.interpolate = "linear";
    }

    draw(canvas, diagram) {
        var ctx = canvas.getContext("2d");
        // draw graph
        ctx.beginPath();        
        
        switch(this.interpolate) {
            case "linear":
                
                var x = (this.points[0].x - diagram.xAxis.minValue) * diagram.xScale + 50;
                var y = canvas.height - ((this.points[0].y - diagram.yAxis.minValue) * diagram.yScale + 50);
                ctx.moveTo(x, y);
                for(var i = 1; i < this.points.length; i++) {
                    x = (this.points[i].x - diagram.xAxis.minValue) * diagram.xScale + 50;
                    y = canvas.height - ((this.points[i].y - diagram.yAxis.minValue) * diagram.yScale + 50);
                    ctx.lineTo(x, y);
                }
                break;
                
            case "cubic":
                var ptIndex = 0;
                var interp = cubicInterpolate(this.points, 0);
                
                ctx.moveTo(50, canvas.height - 50);
                for(var x = 50; x < canvas.width - 50; x += 5) {
                    if (ptIndex < this.points.length - 1) {
                        if (x >= (this.points[ptIndex + 1].x - diagram.xAxis.minValue) * diagram.xScale + 50) {                        
                            ptIndex++;
                            interp = cubicInterpolate(this.points, ptIndex, interp);
                        }
                        
                        try{
                            var xVal = diagram.xAxis.minValue + (x - 50) / diagram.xScale;
                            var yVal = interp.values[0] * Math.pow(xVal, 3) + interp.values[1] * Math.pow(xVal, 2) + interp.values[2] * xVal + interp.values[3];             
                            
                            var y = canvas.height - ((yVal - diagram.yAxis.minValue) * diagram.yScale + 50);
                            
                            ctx.lineTo(x, y);
                        } catch {
                            break;
                        }
                    }
                }                            
                break;
        }
        ctx.stroke();                
    }    
}