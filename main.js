var chart;

function setup() {
    //var canvas = document.getElementById("canvas");
    var pts = [
        { x: "A", y: 4 },
        { x: "B", y: 2 },
        { x: "C", y: 3 },
        { x: "D", y: 5 },
        { x: "E", y: 5.5 }
    ];    
    
    chart = new Chart(canvas);
    chart.points = pts;
    chart.setYAxisSize(0, 6);
    chart.setYStepSize(1);

    var mat = new Matrix4x4();
    mat.values = [
        -1,  5,  1, -3,
        -1, -1, -2,  0,
         3,  1,  5, -2,
         0,  3,  4, -2
    ];

    var matInv = mat.getInverse();
    console.log(matInv);
}

function update() {
    chart.draw();
}