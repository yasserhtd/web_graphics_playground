export class vec2 {
    data: Float32Array;

    constructor(x: number, y: number) {
        this.data = new Float32Array([x, y]);
    }   

    //plus(vec: vec2) {
    //    return new vec2(this.data[0] + vec.data[0], this.data[1] + vec.data[1]);
    //}

    add(vec: vec2) {
        this.data[0] += vec.data[0];
        this.data[1] += vec.data[1];
    }
    
    minus(vec: vec2) {
        return new vec2(this.data[0] - vec.data[0], this.data[1] - vec.data[1]);
    }
}

export class vec4 {
    data: Float32Array;

    constructor(r: number, g: number, b: number, a: number) {
        this.data = new Float32Array([r, g, b, a]);
    }
}