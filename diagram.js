class Diagram {
    constructor(graphs, canvas) {        
        this.graphs = graphs;
        this.xAxis = new ValueAxis('horizontal', 0, 1, 0.1);
        this.yAxis = new ValueAxis('vertical', 0, 1, 0.1);

        this.canvas = canvas;
        
        this.xScale = 0;
        this.yScale = 0;
        this.xStepSize = 1;
        this.yStepSize = 1;
        this.style = new DiagramStyle();
        this.drawHorizontalGrid = true;        
        this.drawVerticalGrid = true;     
        
        this.xAxisTitle = "";
        this.yAxisTitle = "";    
        this.selectedPoint = null;           

        this.calcAndSetAxisSize();
        canvas.addEventListener("mousemove", e => {
            var f = this.onMouseMove.bind(this);
            f(e);
        });
    }

    get height() {
        return this.canvas.clientHeight;
    }

    get width() {
        return this.canvas.clientWidth;
    }    

    set xAxisTitle(title) {
        this._xAxisTitle = title;
        this.origin = {
            x: this._yAxisTitle == "" ? 50 : 75,
            y: this._xAxisTitle == "" ? this.height - 50 : this.height - 75
        };
        this.yScale = (this.origin.y - 50) / (this.yAxis.maxValue - this.yAxis.minValue);
    }

    get xAxisTitle() {
        return this._xAxisTitle;
    }

    set yAxisTitle(title) {
        this._yAxisTitle = title;
        this.origin = {
            x: this._yAxisTitle == "" ? 50 : 75,
            y: this._xAxisTitle == "" ? this.height - 50 : this.height - 75
        };
        this.xScale = (this.width - (this.origin.x + 50)) / (this.xAxis.maxValue - this.xAxis.minValue);
    }

    get yAxisTitle() {
        return this._yAxisTitle;
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
        this.xScale = (this.width - (this.origin.x + 50)) / (maxX - minX);

        this.yAxis.minValue = minY;
        this.yAxis.maxValue = maxY;
        this.yScale = (this.origin.y - 50) / (maxY - minY);
    }

    setStepSize(xStepSize, yStepSize) {
        this.xAxis.stepSize = xStepSize;
        this.yAxis.stepSize = yStepSize;
    }

    draw() {
        var ctx = this.canvas.getContext("2d");
        

        ctx.lineWidth = this.style.lineWidth;
        ctx.strokeStyle = this.style.lineColor;
        ctx.font = this.style.font;    
        ctx.fillStyle = this.style.textColor;    

        // draw x axis
        ctx.beginPath();
        ctx.moveTo(this.origin.x, this.origin.y);                
        ctx.lineTo(this.width - 50, this.origin.y);
        ctx.stroke();
        
        // draw y axis
        ctx.beginPath();
        ctx.moveTo(this.origin.x, this.origin.y);                
        ctx.lineTo(this.origin.x, 50);    
        ctx.stroke();
        
        var stepSize = this.xAxis.stepSize;

        for(var x = this.xAxis.minValue + stepSize; x <= this.xAxis.maxValue; x += stepSize) {
            var globalX = (x - this.xAxis.minValue) * this.xScale + this.origin.x;
            
            ctx.beginPath();
            ctx.moveTo(globalX, this.origin.y + 10);
            ctx.lineTo(globalX, this.origin.y - 10);
            ctx.stroke();
                        
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";                        
            ctx.fillText(x.toString(), globalX, this.origin.y + 30);                        
            ctx.stroke();

            if(this.drawHorizontalGrid) {
                ctx.strokeStyle = this.style.horizontalGridLineColor;
                ctx.lineWidth = this.style.horizontalGridLineWidth;

                ctx.moveTo(globalX, this.origin.y - 10);
                ctx.lineTo(globalX, 50);

                ctx.stroke();

                ctx.strokeStyle = this.style.lineColor;
                ctx.lineWidth = this.style.lineWidth;
            }
        }

        if(this._xAxisTitle != "") {
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";      
            ctx.font = this.style.xAxisFont;
            ctx.fillStyle = this.style.xAxisTextColor;  

            ctx.fillText(this._xAxisTitle, (this.width - this.origin.x) / 2 + this.origin.x, this.height - 25);
            ctx.stroke();

            ctx.font = this.style.font;
            ctx.fillStyle = this.style.textColor;   
        }

        stepSize = this.yAxis.stepSize;
        for (var y = this.yAxis.minValue + stepSize; y <= this.yAxis.maxValue; y += stepSize) {
            var globalY = this.origin.y - ((y - this.yAxis.minValue) * this.yScale);

            ctx.beginPath();
            ctx.moveTo(this.origin.x - 10, globalY);
            ctx.lineTo(this.origin.x + 10, globalY);
            ctx.stroke();
            
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";            
            ctx.fillText(y.toString(), this.origin.x - 30, globalY);            
            ctx.stroke();
            
            if(this.drawVerticalGrid) {
                ctx.strokeStyle = this.style.verticalGridLineColor;
                ctx.lineWidth = this.style.verticalGridLineWidth;

                ctx.moveTo(this.origin + 10, globalY);
                ctx.lineTo(this.width - 50, globalY);
                ctx.stroke();

                ctx.strokeStyle = this.style.lineColor;
                ctx.lineWidth = this.style.lineWidth;
            }
        }   
        
        if (this._xAxisTitle != "") {
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.font = this.style.yAxisFont;
            ctx.fillStyle = this.style.yAxisTextColor;

            ctx.translate(25, this.origin.y / 2);
            ctx.rotate(-Math.PI * 0.5);

            ctx.fillText(this._yAxisTitle, 0, 0);

            ctx.rotate(Math.PI * 0.5);
            ctx.translate(-25, -this.origin.y / 2);

            ctx.stroke();

            ctx.font = this.style.font;
            ctx.fillStyle = this.style.textColor;
        }

        this.graphs.forEach(g => g.draw(this.canvas, this));

        if(this.selectedPoint) {
            var pt = this.pointToPixel(this.selectedPoint.point);

            var text = "x: " + this.selectedPoint.point.x + "\r\ny: " + this.selectedPoint.point.y;

            var ctx = this.canvas.getContext("2d");
            ctx.font = "12px Arial"
            ctx.textAlign = "center";
            ctx.textStyle = "#000000"                  
            
            var nextPoint = this.graphs[this.selectedPoint.graphIndex].points.length < this.selectedPoint.pointIndex + 1 ? this.graphs[this.selectedPoint.graphIndex].points[this.selectedPoint.pointIndex + 1] : null;

            var xOffset = 0, yOffset = 0;

            if (this.graphs[this.selectedPoint.graphIndex].points.length > this.selectedPoint.pointIndex + 1) {
                xOffset = this.selectedPoint.pointIndex == 0 ? 40 : 20;
                yOffset = this.graphs[this.selectedPoint.graphIndex].points[this.selectedPoint.pointIndex + 1].y < this.selectedPoint.point.y ? -20 : 20;                
            }
            else {                
                xOffset = -40;
                yOffset = this.graphs[this.selectedPoint.graphIndex].points[this.selectedPoint.pointIndex - 1].y < this.selectedPoint.point.y ? -20 : 20;                
            }

            ctx.translate(pt.x + xOffset, pt.y + yOffset);
            ctx.fillText(text, 0, 0);
            ctx.translate(-pt.x - xOffset, -pt.y - yOffset);
            ctx.stroke();

            //ctx.strokeRect(0, 0, textWidth, textHeight);
            //ctx.stroke();
        }
    }

    pointToPixel(pt) {
        return {
             x: (pt.x - this.xAxis.minValue) * this.xScale + this.origin.x,
             y: this.origin.y - ((pt.y - this.yAxis.minValue) * this.yScale)
        };
    }

    pixelToPoint(px) {
        if(px.x < this.origin.x || px.x > this.width - 50 || px.y < 50 || px.y > this.height - 50)
            return null;

        return {
            x: (px.x - this.origin.x) / this.xScale + this.xAxis.minValue,
            y: (this.origin.y - px.y) / this.yScale + this.yAxis.minValue
        };
    }

    onMouseMove(e) {        
        var cursorPixel = { x: e.x, y: e.y };
        var cursorPos = this.pixelToPoint(cursorPixel);
        
        if(cursorPos) {
            var dist = Number.MAX_VALUE;
            var pt = null;
            var ptIndex = -1;
            var graphIndex = -1;

            this.graphs.forEach((graph, i) => {
                graph.points.forEach((point, j) => {
                    var currDist = getDist(point, cursorPos);
                    if(currDist < dist) {
                        dist = currDist;
                        pt = point;
                        ptIndex = j;
                        graphIndex = i;
                    }
                });
            });

            var pointPixel = this.pointToPixel(pt);

            if(getDist(pointPixel, cursorPixel) < 25) {                
                this.selectedPoint = {
                    point: pt,
                    pointIndex: ptIndex,
                    graphIndex: graphIndex
                };
            }
            else {
                this.selectedPoint = null;                
            }
        }
    }
}