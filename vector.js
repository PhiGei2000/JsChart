class Vector {    
    constructor(values) {
        this.values = values;
    }

    get length() {
        return this.values.length;
    }    
}

class Vector2 extends Vector {
    constructor(x, y) {
        super([x, y]);
    }

    get x() {
        return this.values[0];
    }

    set x(value) {
        this.values[0] = value;
    }

    get y() {
        return this.values[1];
    }

    set y(value) {
        this.values[1] = value;
    }
}

class Vector3 extends Vector {
    constructor(x, y, z) {
        super([x, y, z]);
    }

    get x() {
        return this.values[0];
    }

    set x(value) {
        this.values[0] = value;
    }

    get y() {
        return this.values[1];
    }

    set y(value) {
        this.values[1] = value;
    }

    get z() {
        return this.values[2];
    }

    set z(value) {
        this.values[2] = value;
    }
}

class Vector4 extends Vector {
    constructor(x, y, z, u) {
        super([x, y, z, u]);
    }

    get x() {
        return this.values[0];
    }

    set x(value) {
        this.values[0] = value;
    }

    get y() {
        return this.values[1];
    }

    set y(value) {
        this.values[1] = value;
    }

    get z() {
        return this.values[2];
    }

    set z(value) {
        this.values[2] = value;
    }

    get u() {
        return this.values[3];
    }

    set u(value) {
        this.values[3] = value;
    }
}