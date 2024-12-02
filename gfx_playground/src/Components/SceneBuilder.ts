import { BasicSceneRenderer } from "../WebGLBackend/Renderers/BasicSceneRenderer";
import { generatePrimitives } from "./PrimitivesGenerator";
import { Scene } from "./Scene";

export function buildScene(canvas: HTMLCanvasElement, backend: HTMLInputElement) {

    const scene = initializeScene(canvas);
    const init = (backend: string, scene: any, instanced: boolean, useSDF: boolean) => { 
        if(backend === 'webgl') {
            initializeWebGL(canvas, scene, instanced, useSDF);
        } else if(backend === 'webgpu') {
            initializeWebGPU(canvas, scene, instanced, useSDF);
        }
    }

    const instanced = false;
    const useSDF = false;
    backend.addEventListener('change', (e) => {
        const selectedRadio = (e.target as HTMLInputElement).value;
        //TODO: destroy old backend
        init(selectedRadio, scene, instanced, useSDF);
      })

    const radioGroup = backend as HTMLDivElement;
    const selectedRadio = (radioGroup.querySelector('input[name="mode"]:checked') as HTMLInputElement).value;
    init(selectedRadio, scene, instanced, useSDF);
}

function initializeScene(canvas: HTMLCanvasElement) {
    const primitives = generatePrimitives(10);
    return new Scene(canvas, primitives);
}

function initializeWebGL(canvas: HTMLCanvasElement, scene: any, instanced: boolean, useSDF: boolean) {
    const gl = canvas.getContext('webgl2')!;
    const renderer = new BasicSceneRenderer(gl, scene);
    renderer.render();
}

function initializeWebGPU(canvas: HTMLCanvasElement, scene: any, instanced: boolean, useSDF: boolean) {
   // const ctx = canvas.getContext('webgpu')!
    
}