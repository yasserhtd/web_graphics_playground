import { vec2, vec4 } from "../utils/math";
import { Primitive } from "./Primitive";

export class Rectangle extends Primitive {
    color: vec4;
    borderColor:vec4 = new vec4(0.0, 0.0, 0.0, 1.0);

    constructor(position: vec2, scale: vec2, color: vec4) {
        super(position, scale);
        this.color = color;
    }

    isInside(posWorldSpace: vec2) : boolean {
        const [x, y] = this.worldToModelSpace(posWorldSpace);
        return x >= 0 && x <= 1 && y >= 0 && y <= 1;
    }
}