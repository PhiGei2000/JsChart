class ContinuousChart extends Chart {
    constructor(canvas, data) {
        super(canvas, data);
                
        this.setRange();

        this.xScale = (this.width * 0.8) / (this.maxX - this.minX);
        this.yScale = (this.height * 0.8) / (this.maxY - this.minY);        
    }    

    draw() {
        var ctx = super.draw();

        this.drawAxes(ctx);
        this.xScale = (this.width * 0.8) / (this.maxX - this.minX);
        this.yScale = (this.height * 0.8) / (this.maxY - this.minY);   

        return ctx;
    }

    drawAxes(ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "12px Arial";

        ctx.beginPath();

        // x Axis
        ctx.moveTo(this.origin.x, this.origin.y);
        ctx.lineTo(this.width * 0.9, this.origin.y);

        for (var x = this.minX; x <= this.maxX; x += this.xStepSize) {
            var px = this.origin.x + this.xScale * (x - this.minX);

            ctx.moveTo(px, this.origin.y - 10);
            ctx.lineTo(px, this.origin.y + 10);            

            ctx.fillText(x.toString(), px, this.origin.y + 25);
        }

        // y Axis
        ctx.textAlign = "right";
        ctx.moveTo(this.origin.x, this.origin.y);
        ctx.lineTo(this.origin.x, this.height * 0.1);

        for (var y = this.minY; y <= this.maxY; y += this.yStepSize) {
            var py = this.origin.y - this.yScale * (y - this.minY);

            ctx.moveTo(this.origin.x - 10, py);
            ctx.lineTo(this.origin.x + 10, py);           

            ctx.fillText(y.toString(), this.origin.x - 20, py);
        }

        ctx.stroke();
    }

    setRange() {
        var minX = Number.MAX_VALUE, maxX = -Number.MAX_VALUE, minY = Number.MAX_VALUE, maxY = -Number.MAX_VALUE;

        for (var i = 0; i < this.data.length; i++) {
            for (var j = 0; j < this.data[i].points.length; j++) {
                var x = this.data[i].points[j].x;
                var y = this.data[i].points[j].y;

                if (x < minX) { minX = x; }
                if (x > maxX) { maxX = x; }
                if (y < minY) { minY = y; }
                if (y > maxY) { maxY = y; }
            }
        }

        this.setXRange(minX, maxX);
        this.setYRange(minY, maxY);
    }

    setXRange(minX, maxX) {
        this.minX = minX;
        this.maxX = maxX;

        this.xScale = (this.width * 0.8) / (maxX - minX);
        this.xStepSize = Chart.getStepSize(this.xScale, this.width * 0.05, this.width * 0.1);
    }

    setYRange(minY, maxY) {
        this.minY = minY;
        this.maxY = maxY;

        this.yScale = (this.height * 0.8) / (maxY - minY);
        this.yStepSize = Chart.getStepSize(this.yScale, this.height * 0.05, this.height * 0.1);
    }  

    setStepSize(xStepSize, yStepSize) {
        this.xStepSize = xStepSize;
        this.yStepSize = yStepSize;
    }
}