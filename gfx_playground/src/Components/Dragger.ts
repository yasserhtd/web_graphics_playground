import { vec2 } from "../utils/math";
import { Camera } from "./Camera";
import { Primitive } from "./Primitive";

export class Dragger {

    primitives: Primitive[];
    protected dragIdx: number|null = null;
    private prevMousePos: vec2|null = null;
    private sceneChangedCallback: (changedIdx: number)=>void = () => {};
    private camera: Camera;
    private canvas: HTMLCanvasElement;

    private mouseMoveHandler = this.onMouseMove.bind(this);
    private mouseDownHandler= this.onMouseDown.bind(this);
    private mouseUpHandler= this.onMouseUp.bind(this);

    constructor(primitives: Primitive[], canvas: HTMLCanvasElement, camera: Camera) {
        this.primitives = primitives;

        canvas.addEventListener('mousemove', this.mouseMoveHandler);
        canvas.addEventListener('mousedown', this.mouseDownHandler);
        canvas.addEventListener('mouseup', this.mouseUpHandler);
        this.camera = camera;
        this.canvas = canvas;
    }

    setSceneChangedCallback(callback: (changedIdx: number)=>void) {
        this.sceneChangedCallback = callback;
    }

    private calcPosWorldSpace(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        const x = (2.0 * (event.clientX - rect.left) / this.canvas.clientWidth) - 1.0;
        const y = -((2.0 * (event.clientY - rect.top) / this.canvas.clientHeight) - 1.0);
        let pos = new vec2(x, y);
        pos = this.camera.screenToWorldSpace(pos);
        return pos;
      }
      
    
    private onMouseMove(event: MouseEvent) : void {
        if (this.dragIdx !== null && this.prevMousePos) {
            const posWorldSpace = this.calcPosWorldSpace(event);
            const delta = posWorldSpace.minus(this.prevMousePos);
            this.primitives[this.dragIdx].translate(delta);
            this.prevMousePos = posWorldSpace;
            this.sceneChangedCallback(this.dragIdx); //assume only pos can be changed for now
        }
    }

    private onMouseDown(event: MouseEvent) : boolean{
        const posWorldSpace = this.calcPosWorldSpace(event);
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

    private onMouseUp() {
        this.dragIdx = null;
        this.prevMousePos = null;
    }

    cleanup() {
        this.canvas.removeEventListener('mousemove', this.mouseMoveHandler);
        this.canvas.removeEventListener('mousedown', this.mouseDownHandler);
        this.canvas.removeEventListener('mouseup', this.mouseUpHandler);
    }
}