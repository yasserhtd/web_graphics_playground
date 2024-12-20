import './style.css'
import { setupCounter } from './counter.ts'
import { buildScene } from './Components/SceneBuilder.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="card">
      <button id="counter" type="button"></button>
      <radiogroup id="backend"> 
        <input type="radio" name="mode" value="webgl"> WebGL
        <input type="radio" name="mode" value="webgpu" checked> WebGPU
      </radiogroup>
      <div id="primdiv">
        <label for="primlabel">Primitives</label>
        <input type="number" id="numPrimitives" name="numPrimitives" value="1000">
      </div>
      <div id="options">
        <label for="instanced">Instanced</label>
        <input type="checkbox" id="instanced" name="instanced" checked>
        <label for="sdf">SDF</label>
        <input type="checkbox" id="sdf" name="sdf" checked>
      </div>
      <canvas id="canvas" width="1024" height="1024"></canvas>
    </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

buildScene(document.querySelector<HTMLCanvasElement>('#canvas')!,
 document.querySelector<HTMLInputElement>('#backend')!,
 document.querySelector<HTMLInputElement>('#numPrimitives')!,
 document.querySelector<HTMLInputElement>('#instanced')!,
 document.querySelector<HTMLInputElement>('#sdf')!);