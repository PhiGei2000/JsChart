var chart;

function setup() {
    var canvas = document.getElementById("canvas");
    var pts = [        
        new Point(10, 2),
        new Point(10.5, 1),
        new Point(11, 4),
        new Point(11.5, 1.5),
        new Point(12, 7),
        new Point(12.5, 2)
    ];    

    var data = [{
        color : "red",
        values: [2, 1, 4, 1.5, 7, 2]
    }];

    var categories = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30"];

    chart = new CategoryChart(canvas, categories, data);
    
    chart.setValueRange(0, 10);
}

function update() {
    chart.draw();
}