class Graph {
    constructor(pts) {
        this.points = pts;
        this.interpolate = "linear";
    }

    draw(canvas, diagram) {
        var ctx = canvas.getContext("2d");

        // draw graph
        ctx.beginPath();        
        
        var x = (this.points[0].x - diagram.xAxis.minValue) * diagram.xScale + 50;
        var y = canvas.clientHeight - ((this.points[0].y - diagram.yAxis.minValue) * diagram.yScale + 50);
        ctx.moveTo(x, y);

        switch(this.interpolate) {
            case "linear":
                for(var i = 1; i < this.points.length; i++) {
                    x = (this.points[i].x - diagram.xAxis.minValue) * diagram.xScale + 50;
                    y = canvas.clientHeight - ((this.points[i].y - diagram.yAxis.minValue) * diagram.yScale + 50);
                    ctx.lineTo(x, y);
                }
                break;
            
            case "cubic":
                
        }
                
        ctx.stroke();
    }    
}