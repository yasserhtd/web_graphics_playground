import { vec2 } from "../utils/math";

export abstract class Primitive {
    position: vec2;
    scale: vec2;

    constructor(position: vec2, scale: vec2) {
        this.position = position;
        this.scale = scale;
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