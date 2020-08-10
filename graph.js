class Graph {
    constructor(pts, name = "") {
        this.points = pts;
        this.interpolate = "linear";
        this.style = new Style();
        this.name = name;
    }

    draw(canvas, diagram) {
        var ctx = canvas.getContext("2d");
        // draw graph
        ctx.beginPath();       
        ctx.strokeStyle = this.style.lineColor;
        ctx.lineWidth = this.style.lineWidth;
        ctx.fillStyle = this.style.lineColor;
        
        switch(this.interpolate) {
            case "linear":
                for(var i = 0; i < this.points.length; i++) {
                    var p = diagram.pointToPixel(this.points[i]);
                    
                    if(i == 0) {
                        ctx.moveTo(p.x, p.y);
                    }
                    else {                                    
                        ctx.lineTo(p.x, p.y);
                    }
                
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, this.style.lineWidth, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.stroke();

                    ctx.moveTo(p.x, p.y);
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

            case "smooth":
                const pts = catmullRomInterpolation(this.points, (canvas.width - 100) / 5);
                var p = diagram.pointToPixel(pts[0]);

                ctx.moveTo(p.x, p.y);
                for(var pt = 1; pt < pts.length; pt++) {
                    p = diagram.pointToPixel(pts[pt]);                    

                    ctx.lineTo(p.x, p.y);
                }                
        }
        
        ctx.stroke();                
    }    
}