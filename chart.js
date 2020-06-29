class Chart {
    constructor(canvas) {
        this.canvas = canvas;
        this.values = [];  
        this.categories = [];            
        this.xScale = 0;
        this.yScale = 0;
        this.yAxis = new ValueAxis("vertical");
        this.xAxis = new Axis("horizontal");
    }

    set points(pts) {
        this.categories = [];
        this.values = [];

        var minVal = Infinity;
        var maxVal = -Infinity;

        pts.forEach(pt => {
            this.categories.push(pt.x);
            this.values.push(pt.y);

            minVal = Math.min(minVal, pt.y);
            maxVal = Math.max(maxVal, pt.y);
        });

        this.yAxis.minValue = minVal;
        this.yAxis.maxValue = maxVal;
        this.yScale = (this.canvas.height - 100) / (maxVal - minVal);
        this.xScale = (this.canvas.width - 100) / this.categories.length;        
    }

    setYAxisSize(min, max) {
        this.yAxis.minValue = min;
        this.yAxis.maxValue = max;
        this.yScale = (this.canvas.height - 100) / (this.yAxis.maxValue - this.yAxis.minValue);
    }

    setYStepSize(stepSize) {
        this.yAxis.stepSize = stepSize;
    }
    
    draw() {
        var ctx = this.canvas.getContext("2d");

        ctx.beginPath();
        ctx.moveTo(50, this.canvas.height - 50);
        ctx.lineTo(this.canvas.width - 50, this.canvas.height - 50);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(50, this.canvas.height - 50);
        ctx.lineTo(50, 50);
        ctx.stroke();

        var stepSize = this.yAxis.stepSize;
        for (var y = this.yAxis.minValue + stepSize; y <= this.yAxis.maxValue; y += stepSize) {
            var globalY = this.canvas.height - ((y - this.yAxis.minValue) * this.yScale + 50);

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

        for(var i = 0; i < this.values.length; i++) {
            var x = 50 + (i + 1) * this.xScale;
            var y = (this.canvas.height - 50) - this.values[i] * this.yScale;

            ctx.beginPath();
            ctx.moveTo(x, this.canvas.height - 40);
            ctx.lineTo(x, this.canvas.height - 60);
            ctx.stroke();

            ctx.font = "12px Arial";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.translate(x, this.canvas.height - 20);
            ctx.fillText(this.categories[i].toString(), 0, 0);
            ctx.translate(-x, -(this.canvas.height - 20));
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.stroke();
        }
    }
}
