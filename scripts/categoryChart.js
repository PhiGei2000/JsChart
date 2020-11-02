class CategoryChart extends Chart {
    constructor(canvas, categories, data) {
        super(canvas, data);
        
        this.categories = categories;
        this.grid = true;

        this.categoryScale = (this.width * 0.8) / (this.categories.length - 1);
        this.updateRange();
    }    

    draw() {
        var ctx = super.draw();

        this.drawAxes(ctx);

        if(this.grid) {
            this.drawGrid(ctx);
        }

        this.drawData(ctx);
    }

    updateRange() {
        var min = Number.MAX_VALUE, max = -Number.MAX_VALUE;

        for(var i = 0; i < this.data.length; i++) {
            for(var j = 0; j < this.data[i].values.length; j++) {
                var value = this.data[i].values[j];

                if(value < min) {
                    min = value;
                }

                if(value > max) {
                    max = value;
                }
            }
        }

        this.setValueRange(min, max);
    }

    setValueRange(min, max) {
        this.minValue = min;
        this.maxValue = max;

        this.valueScale = (this.height * 0.8) / (this.maxValue - this.minValue);
        this.valueStepSize = Chart.getStepSize(this.valueScale, this.height * 0.05, this.height * 0.1);
    }

    drawAxes(ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "12px Arial";

        ctx.beginPath();

        // category axis
        ctx.moveTo(this.origin.x, this.origin.y);
        ctx.lineTo(this.width * 0.9, this.origin.y);

        for(var i = 0; i < this.categories.length; i++) {
            var x = this.origin.x + i * this.categoryScale;

            ctx.moveTo(x, this.origin.y - 10);
            ctx.lineTo(x, this.origin.y + 10);

            ctx.fillText(this.categories[i], x, this.origin.y + 25);
        }

        // value axis
        ctx.textAlign = "right";
        ctx.moveTo(this.origin.x, this.origin.y);
        ctx.lineTo(this.origin.x, this.height * 0.1);
        
        for(var y = this.minValue; y <= this.maxValue; y += this.valueStepSize) {
            var py = this.origin.y - this.valueScale * (y - this.minValue);

            ctx.moveTo(this.origin.x - 10, py);
            ctx.lineTo(this.origin.x + 10, py);

            ctx.fillText(y.toString(), this.origin.x - 20, py);
        }

        ctx.stroke();
    }

    drawGrid(ctx) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "gray";
        ctx.fillStyle = "gray";
        ctx.beginPath();   

        for(var i = 0; i < this.categories.length; i++) {
            var x = this.origin.x + this.categoryScale * (i + 1);

            ctx.moveTo(x, this.origin.y - 10);
            ctx.lineTo(x, this.height * 0.1);
            ctx.stroke();
        }

        for(var y = this.minValue + this.valueStepSize; y <= this.maxValue; y += this.valueStepSize) {
            var py = this.origin.y - this.valueScale * (y - this.minValue);

            ctx.moveTo(this.origin.x + 10, py);
            ctx.lineTo(this.width * 0.9, py);
            ctx.stroke();
        }

    }

    drawData(ctx) {
        ctx.lineWidth = 2;

        for(var i = 0; i < this.data.length; i++) {
            if (this.data[i].color) {
                ctx.strokeStyle = this.data[i].color;
                ctx.fillStyle = this.data[i].color;
            }
            ctx.beginPath();     

            for(var j = 0; j < this.categories.length; j++) {
                var value = this.data[i].values[j];

                if(value) {
                    var x = this.origin.x + this.categoryScale * j;
                    var y = this.origin.y - this.valueScale * (value - this.minValue);

                    if(j == 0) {
                        ctx.moveTo(x, y);
                    }
                    else {
                        ctx.lineTo(x, y);
                    }
                }
            }

            ctx.stroke();
        }
    }
}