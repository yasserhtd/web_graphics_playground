import { vec2, vec4 } from "../utils/math";
import { PrimitiveType } from "./PrimitiveType";

export abstract class Primitive {
    position: vec2;
    scale: vec2;
    color: vec4;
    depth: number;
    public static borderColor = new vec4(0.0, 0.0, 0.0, 1.0);
    type: PrimitiveType;
    
    constructor(position: vec2, scale: vec2, color: vec4, depth: number) {
        this.position = position;
        this.scale = scale;
        this.color = color;
        this.depth = depth;
        this.type = PrimitiveType.END;
    }

    abstract isInside(pos: vec2): boolean;
    
    translate(delta: vec2) {
        this.position.add(delta);
    }

    worldToModelSpace(posWorldSpace: vec2) : [number, number] {
        const modelSpaceX = (posWorldSpace.data[0] - this.position.data[0]) / this.scale.data[0];
        const modelSpaceY = (posWorldSpace.data[1] - this.position.data[1]) / this.scale.data[1];
        return [modelSpaceX, modelSpaceY];
    }
}