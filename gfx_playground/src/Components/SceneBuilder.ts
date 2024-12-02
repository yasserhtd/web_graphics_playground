import { BasicSceneRenderer } from "../WebGLBackend/Renderers/BasicSceneRenderer";
import { generatePrimitives } from "./PrimitivesGenerator";
import { Scene } from "./Scene";

export function buildScene(canvas: HTMLCanvasElement, backend: HTMLInputElement,
    numPrimitives: HTMLInputElement,
    instanced: HTMLInputElement,
    useSDF: HTMLInputElement) {

    const scene = initializeScene(canvas, numPrimitives.valueAsNumber);

    const radioGroup = backend as HTMLDivElement;
    const selectedRadio = (radioGroup.querySelector('input[name="mode"]:checked') as HTMLInputElement).value;

    initializeBackend(canvas, selectedRadio, scene, instanced.checked, useSDF.checked);

    numPrimitives.addEventListener('change', (e) => {
        const numPrimitives = (e.target as HTMLInputElement).valueAsNumber;
        //scene.primitives = generatePrimitives(numPrimitives);
        const scene = initializeScene(canvas, numPrimitives);
        initializeBackend(canvas, selectedRadio, scene, instanced.checked, useSDF.checked);
    })

    backend.addEventListener('change', (e) => {
        const selectedRadio = (e.target as HTMLInputElement).value;
        //TODO: destroy old backend
        initializeBackend(canvas, selectedRadio, scene, instanced.checked, useSDF.checked);
    });
}

function initializeScene(canvas: HTMLCanvasElement, numPrimitives: number) {
    const primitives = generatePrimitives(numPrimitives);
    return new Scene(canvas, primitives);
}

function initializeBackend (canvas: HTMLCanvasElement, backend: string, scene: any, instanced: boolean, useSDF: boolean) { 
    if(backend === 'webgl') {
        initializeWebGL(canvas, scene, instanced, useSDF);
    } else if(backend === 'webgpu') {
        initializeWebGPU(canvas, scene, instanced, useSDF);
    }
}

function initializeWebGL(canvas: HTMLCanvasElement, scene: any, instanced: boolean, useSDF: boolean) {
    const gl = canvas.getContext('webgl2')!;
    const renderer = new BasicSceneRenderer(gl, scene);
    renderer.render();
}

function initializeWebGPU(canvas: HTMLCanvasElement, scene: any, instanced: boolean, useSDF: boolean) {
   // const ctx = canvas.getContext('webgpu')!
    
}