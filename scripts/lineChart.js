class LineChart extends ContinuousChart {
    constructor(canvas, data) {
        super(canvas, data);                        
        this.grid = true;        
    }          

    draw() {
        var ctx = super.draw();              

        if(this.grid) {
            this.drawGrid(ctx);
        }

        this.drawData(ctx);
    }    

    drawGrid(ctx) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "gray";
        ctx.fillStyle = "gray";    
        ctx.beginPath();    

        for(var x = this.minX + this.xStepSize; x <= this.maxX; x += this.xStepSize) {
            var px = this.origin.x + this.xScale * (x - this.minX);

            ctx.moveTo(px, this.origin.y - 10);
            ctx.lineTo(px, this.height * 0.1);            
        }

        for(var y = this.minY + this.yStepSize; y <= this.maxY; y += this.yStepSize) {
            var py = this.origin.y - this.yScale * (y - this.minY);
            
            ctx.moveTo(this.origin.x + 10, py);
            ctx.lineTo(this.width * 0.9, py);
        }

        ctx.stroke();
    }

    drawData(ctx) {
        ctx.lineWidth = 2;        
        
        for(var i = 0; i < this.data.length; i++) {
            if(this.data[i].color) {
                ctx.strokeStyle = this.data[i].color;
                ctx.fillStyle = this.data[i].color;
            }
            ctx.beginPath();     

            for(var j = 0; j < this.data[i].points.length; j++) {
                var x = this.data[i].points[j].x;
                var y = this.data[i].points[j].y;

                var px = this.origin.x + this.xScale * (x - this.minX);
                var py = this.origin.y - this.yScale * (y - this.minY);

                if(j == 0) {
                    ctx.moveTo(px, py);                
                }
                else {
                    ctx.lineTo(px, py);
                }            
            }

            ctx.stroke();
        }

    }
}