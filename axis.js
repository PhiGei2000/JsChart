class Axis {
    constructor(orientation) {
        this.orientation = orientation;        
    }
}

class ValueAxis extends Axis {
    constructor(orientation, minVal = 0, maxVal = 1, stepSize = 1) {
        super(orientation);

        this.minValue = minVal;
        this.maxValue = maxVal;
        this.stepSize = stepSize;
    }
}