var diagram;

function setup() {
    //var canvas = document.getElementById("canvas");
    var pts = [
        { x: 0, y: 2 },
        { x: 1, y: 1 },
        { x: 2, y: 4 },
        { x: 3, y: 1.5 },
        { x: 4, y: 7 },
        { x: 5, y: 2 }
    ];    

    var graph = new Graph(pts, "Temperature");
    graph.style.lineColor = "#FF0000";
    graph.style.lineWidth = 4;
    
    diagram = new Diagram([graph], canvas);    

    diagram.xAxisTitle = "Time";
    diagram.yAxisTitle = "Temperature";
    diagram.setAxisSize(0, 5, 0, 7);
    diagram.setStepSize(1, 1);    
}

function update() {
    diagram.draw();
}