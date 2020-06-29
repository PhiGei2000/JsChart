var diagram;

function setup() {
    //var canvas = document.getElementById("canvas");
    var pts = [
        { x: 0, y: 2 },
        { x: 1, y: 1 },
        { x: 2, y: 4 },
        { x: 3, y: 1.5 }      
    ];    
    
    diagram = new Diagram([new Graph(pts)], canvas);
    diagram.graphs[0].interpolate = "cubic";
    diagram.setAxisSize(0, 4, 0, 7);
    diagram.setStepSize(1, 1);
    
    cubicInterpolate(pts);
}

function update() {
    diagram.draw();
}