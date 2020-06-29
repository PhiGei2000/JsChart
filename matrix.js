class Matrix {
    constructor(size, values = []) {
        this.size = size;
        this.sizeSquared = size * size;
        this.values = values;

        if(values.length == 0) {
            for(var m = 0; m < this.size; m++){
                for(var n = 0; n < this.size; n++) {
                    if(m == n) {
                        this.values[m * this.size + n] = 1;
                    }
                    else {
                        this.values[m * this.size + n] = 0;
                    }
                }
            }
        }
    }

    clone() {
        var mat = new Matrix(this.size);
        for(var i = 0; i < this.size * this.size; i++) {
            mat.values[i] = this.values[i];
        }

        return mat;
    }

    getInverse() {
        var result = new Matrix(4);
        var curr = this.clone();

        // lower triangle
        for (var i = 0; i < this.size - 1; i++) { // column to eliminate
            for (var j = i + 1; j < this.size; j++) { // row
                var fact = curr.getValue(j, i) / curr.getValue(i, i);
                if (curr.getValue(i, i) == 0) {
                    curr.swapRows(i, i + 1);
                    result.swapRows(i, i + 1);
                    fact = curr.getValue(j, i) / curr.getValue(i, i);
                }

                for (var n = 0; n < this.size; n++) { // values in row                         
                    curr.setValue(j, n, curr.getValue(j, n) - fact * curr.getValue(i, n));
                    result.setValue(j, n, result.getValue(j, n) - fact * result.getValue(i, n));
                }
            }
        }

        // upper triangle
        for (var i = 3; i > 0; i--) { // column to eliminate
            for (var j = i - 1; j >= 0; j--) { // row
                var fact = curr.getValue(j, i) / curr.getValue(i, i);

                for (var n = 0; n < this.size; n++) { // values in row
                    curr.setValue(j, n, curr.getValue(j, n) - fact * curr.getValue(i, n));
                    result.setValue(j, n, result.getValue(j, n) - fact * result.getValue(i, n));
                }
            }
        }

        // transform to E
        for (var i = 0; i < this.size; i++) {
            var fact = 1 / curr.getValue(i, i);

            for (var n = 0; n < this.size; n++) {
                result.setValue(i, n, fact * result.getValue(i, n));
            }
        }

        return result;
    }

    getValue(m, n) {
        return this.values[m * this.size + n];
    }

    setValue(m, n, value) {
        this.values[m * this.size + n] = value;
    }

    swapRows(row1, row2) {
        for (var i = 0; i < this.size; i++) {
            var tmp = this.values[row2 * this.size + i];
            this.values[row2 * this.size + i] = this.values[row1 * this.size + i];
            this.values[row1 * this.size + i] = tmp;
        }
    }

    add(matrix) {
        var result = this.clone();
        for (var i = 0; i < this.sizeSquared; i++) {
            result.values[i] += matrix.values[i];
        }

        return result;
    }

    sub(matrix) {
        var result = this.clone();;
        for (var i = 0; i < 16; i++) {
            result.values[i] -= matrix.values[i];
        }

        return result;
    }

    multiply(matrix) {
        if(this.size != matrix.size)
            return;

        var result = new Matrix(this.size);
        for(var m = 0; m < this.size; m++) {
            for(var n = 0; n < this.size; n++) {
                var value = 0;
                
                for(var i = 0; i < this.size; i++) {
                    value += this.getValue(m, i) * matrix.getValue(i, n);
                }

                result.setValue(m, n, value);
            }
        }

        return result;
    }

    multiplyVector(vector) {
        if(vector.length != this.size) 
            return;

        var result = new Vector([]);
        for(var m = 0; m < this.size; m++) {
            var value = 0;
            for(var n = 0; n < this.size; n++) {
                value += this.getValue(m, n) * vector.values[n];
            }

            result.values[m] = value;
        }

        return result;
    }
}