import { vec2 } from "../utils/math";

export class Camera {
    position: vec2 = new vec2(0, 0);
    zoom: number = 1; //zoom level: from 0.1 to 10
    minZoom: number = 0.05;
    maxZoom: number = 2;
    private sceneChangedCallback: (changedIdx: number)=>void = () => {};

    constructor(canvas: HTMLCanvasElement) {
        canvas.addEventListener('wheel', this.wheel.bind(this));
    }
    
    setSceneChangedCallback(callback: (changedIdx: number)=>void) {
        this.sceneChangedCallback = callback;
    }

    wheel(event: WheelEvent) {
        const prevZoom = this.zoom;
        const deltaScale = 0.001;
        //clamp zoom between minScale and maxScale
        this.zoom = Math.min(this.maxZoom, Math.max(this.minZoom, this.zoom + event.deltaY * deltaScale));
        if (prevZoom !== this.zoom) {
            this.sceneChangedCallback(-1);
        }            
    }

    moveCamera(pos: vec2) {
        this.position = pos;
    }

    screenToWorldSpace(pos: vec2) {
        return new vec2((pos.data[0] - this.position.data[0]) / this.zoom, (pos.data[1] - this.position.data[1]) / this.zoom);
    }
}