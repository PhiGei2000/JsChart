class Style {
    lineColor;
    lineWidth;    
    textColor;
    font;    

    constructor() {
        this.lineColor = "#000000";
        this.lineWidth = 2;
        this.textColor = "#000000";
        this.font = "12px Arial";        
    }
}

class DiagramStyle extends Style {    
    horizontalGridLineWidth;
    horizontalGridLineColor;

    verticalGridLineWidth;
    verticalGridLineColor;

    xAxisTextColor;
    xAxisFont;
    yAxisTextColor;
    yAxisFont;

    constructor() {
        super();

        this.horizontalGridLineWidth = 1;
        this.horizontalGridLineColor = "#666666";
        this.verticalGridLineWidth = 1;
        this.verticalGridLineColor = "#666666";
        
        this.xAxisTextColor = "#000000";
        this.xAxisFont = "24px Arial"

        this.yAxisTextColor = "#000000";
        this.yAxisFont = "24px Arial"
    }
}