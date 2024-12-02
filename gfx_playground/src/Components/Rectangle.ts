import { vec2, vec4 } from "../utils/math";
import { Primitive } from "./Primitive";
import { PrimitiveType } from "./PrimitiveType";

export class Rectangle extends Primitive {
    constructor(position: vec2, scale: vec2, color: vec4) {
        super(position, scale, color);
        this.type = PrimitiveType.Rectangle;
    }

    /**
     * Checks if the given position is inside the rectangle.
     * @param posWorldSpace - world space position to check
     * @returns true if the position is inside the rectangle, false otherwise
     */
    isInside(posWorldSpace: vec2) : boolean {
        const [x, y] = this.worldToModelSpace(posWorldSpace);
        return x >= 0 && x <= 1 && y >= 0 && y <= 1;
    }
}