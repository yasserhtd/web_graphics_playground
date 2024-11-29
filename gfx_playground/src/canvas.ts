export function setupCanvas(canvas: HTMLCanvasElement, backend: HTMLInputElement) {

    const scene = initializeScene(canvas);
    const init = (backend: string, scene: any) => { 
        if(backend === 'webgl') {
            initializeWebGL(canvas, scene);
        } else if(backend === 'webgpu') {
            initializeWebGPU(canvas, scene);
        }
    }

    backend.addEventListener('change', (e) => {
        const selectedRadio = (e.target as HTMLInputElement).value;
        //TODO: destroy old backend
        init(selectedRadio, scene);
      })

    const radioGroup = backend as HTMLDivElement;
    const selectedRadio = (radioGroup.querySelector('input[name="mode"]:checked') as HTMLInputElement).value;
    init(selectedRadio, scene);
}

function initializeScene(canvas: HTMLCanvasElement) {

}

function initializeWebGL(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl')!
    gl.clearColor(1, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT) 
}

function initializeWebGPU(canvas: HTMLCanvasElement) {
   // const ctx = canvas.getContext('webgpu')!
    
}