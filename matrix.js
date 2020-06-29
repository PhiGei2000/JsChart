class Matrix4x4 {
    constructor() {
        this.values = [];

        for(var m = 0; m < 4; m++) {
            for(var n = 0; n < 4; n++) {
                if(m == n) {
                    this.values.push(1);
                }
                else {
                    this.values.push(0);
                }
            }
        }
    }

    getInverse() {
        var result = new Matrix4x4();
        var curr = this;

        // lower triangle
        for(var i = 0; i < 3; i++) { // column to eliminate
            for(var j = i + 1; j < 4; j++) { // row
                var fact = curr.getValue(j, i) / curr.getValue(i, i);
                if (curr.getValue(i, i) == 0) {
                    curr.swapRows(i, i + 1);
                    result.swapRows(i, i + 1);
                    fact = curr.getValue(j, i) / curr.getValue(i, i);
                }

                for(var n = 0; n < 4; n++) { // values in row                         
                    curr.setValue(j, n, curr.getValue(j, n) - fact * curr.getValue(i, n));
                    result.setValue(j, n, result.getValue(j, n) - fact * result.getValue(i, n));
                }
            }
        }

        // upper triangle
        for(var i = 3; i > 0; i--) { // column to eliminate
            for(var j = i - 1; j >= 0; j--) { // row
                var fact = curr.getValue(j, i) / curr.getValue(i, i);                                

                for(var n = 0; n < 4; n++) { // values in row
                    curr.setValue(j, n, curr.getValue(j, n) - fact * curr.getValue(i, n));
                    result.setValue(j, n, result.getValue(j, n) - fact * result.getValue(i, n));
                }
            }
        }

        // transform to E
        for(var i = 0; i < 4; i++) { 
            var fact = 1 / curr.getValue(i, i);

            for(var n = 0; n < 4; n++) {
                result.setValue(i, n, fact * result.getValue(i, n));
            }
        }

        return result;
    }

    getValue(m, n) {
        return this.values[m * 4 + n];
    }

    setValue(m, n, value) {
        this.values[m * 4 + n] = value;
    }

    swapRows(row1, row2) {
        for(var i = 0; i < 4; i++) {
            var tmp = this.values[row2 * 4 + i];
            this.values[row2 * 4 + i] = this.values[row1 * 4 +i];
            this.values[row1 * 4 + i] = tmp;
        }
    }        
}