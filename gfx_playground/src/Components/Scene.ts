import { Camera } from "./Camera";
import { Dragger } from "./Dragger";
import { Primitive } from "./Primitive";

export class Scene {
    primitives: Primitive[] = [];
    camera: Camera;
    dragger: Dragger;
    canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement, primitives: Primitive[]) {
        this.canvas = canvas;
        this.primitives = primitives;
        this.camera = new Camera(canvas);
        this.dragger = new Dragger(this.primitives, canvas, this.camera);
    }
}