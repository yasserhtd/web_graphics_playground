import { vec2 } from "../utils/math";
import { Primitive } from "./Primitive";

export class Dragger {

    primitives: Primitive[];
    protected dragIdx: number|null = null;
    private prevMousePos: vec2|null = null;
    
    constructor(primitives: Primitive[]) {
        this.primitives = primitives;
    }

    onMouseMove(posWorldSpace: vec2) : boolean {
        if (this.dragIdx !== null && this.prevMousePos) {
            const delta = posWorldSpace.minus(this.prevMousePos);
            this.primitives[this.dragIdx].translate(delta);
            this.prevMousePos = posWorldSpace;
            return true;
        }
        return false;
    }

    onMouseDown(posWorldSpace: vec2) : boolean{
        //O(n) what a shame!
        for (let i = this.primitives.length - 1; i >= 0; i--) {
            const primitive = this.primitives[i];
            if (primitive.isInside(posWorldSpace)) {
                this.dragIdx = i;
                this.prevMousePos = posWorldSpace;
                return true;
            }
        }
        this.dragIdx = null;
        this.prevMousePos = null;
        return false;
    }

    onMouseUp() {
        this.dragIdx = null;
        this.prevMousePos = null;
    }
}