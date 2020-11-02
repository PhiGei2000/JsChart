class Chart {
    constructor(canvas, data) {
        this.canvas = canvas;
        this.data = data;

        this.width = canvas.clientWidth;
        this.height = canvas.clientHeight;
        this.origin = new Point(this.width * 0.1, this.height * 0.9);
    }

    draw() {
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
        this.origin = new Point(this.width * 0.1, this.height * 0.9);

        var ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        return ctx;
    }

    static getStepSize(scale, minD, maxD) {
        var dx = scale;
        while (dx > maxD) {
            dx /= 2;
        }

        while (dx < minD) {
            dx *= 2;
        }

        return dx / scale;
    }
}