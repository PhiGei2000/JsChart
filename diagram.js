class Diagram {
    constructor(graphs, canvas) {        
        this.graphs = graphs;
        this.xAxis = new ValueAxis('horizontal', 0, 1, 0.1);
        this.yAxis = new ValueAxis('vertical', 0, 1, 0.1);

        this.canvas = canvas;
        this.width = canvas.clientWidth;
        this.height = canvas.clientHeight;
        this.xScale = 0;
        this.yScale = 0;
        this.xStepSize = 1;
        this.yStepSize = 1;

        this.calcAndSetAxisSize();
    }

    calcAndSetAxisSize() {
        var maxX = -Infinity;
        var maxY = -Infinity;
        var minX = Infinity;
        var minY = Infinity;

        this.graphs.forEach(graph => {
            graph.points.forEach(pt => {
                minX = Math.min(minX, pt.x);
                maxX = Math.max(maxX, pt.x);

                minY = Math.min(minY, pt.y);
                maxY = Math.max(maxY, pt.y);
            });
        });

        this.setAxisSize(minX, maxX, minY, maxY);
    }

    setAxisSize(minX, maxX, minY, maxY) {
        this.xAxis.minValue = minX;
        this.xAxis.maxValue = maxX;
        this.xScale = (this.width - 100) / (maxX - minX)

        this.yAxis.minValue = minY;
        this.yAxis.maxValue = maxY;
        this.yScale = (this.height - 100) / (maxY - minY);
    }

    setStepSize(xStepSize, yStepSize) {
        this.xAxis.stepSize = xStepSize;
        this.yAxis.stepSize = yStepSize;
    }

    draw() {
        var ctx = this.canvas.getContext("2d");
        
        ctx.beginPath();
        ctx.moveTo(50, this.height - 50);                
        ctx.lineTo(this.width - 50, this.height - 50);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(50, this.height - 50);                
        ctx.lineTo(50, 50);    
        ctx.stroke();
        
        var stepSize = this.xAxis.stepSize;

        for(var x = this.xAxis.minValue + stepSize; x <= this.xAxis.maxValue; x += stepSize) {
            var globalX = (x - this.xAxis.minValue) * this.xScale + 50;
            
            ctx.beginPath();
            ctx.moveTo(globalX, this.height - 40);
            ctx.lineTo(globalX, this.height - 60);
            ctx.stroke();

            ctx.font = "12px Arial";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.translate(globalX, this.height - 20);
            ctx.fillText(x.toString(), 0, 0);
            ctx.translate(-globalX, -(this.height - 20));
            ctx.stroke();
        }

        stepSize = this.yAxis.stepSize;
        for (var y = this.yAxis.minValue + stepSize; y <= this.yAxis.maxValue; y += stepSize) {
            var globalY = this.height - ((y - this.yAxis.minValue) * this.yScale + 50);

            ctx.beginPath();
            ctx.moveTo(40, globalY);
            ctx.lineTo(60, globalY);
            ctx.stroke();

            ctx.font = "12px Arial";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.translate(20, globalY);
            ctx.fillText(y.toString(), 0, 0);
            ctx.translate(-20, -globalY);
            ctx.stroke();
        }


        this.graphs.forEach(g => g.draw(this.canvas, this));
    }
}