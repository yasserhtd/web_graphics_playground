import './style.css'
import { setupCounter } from './counter.ts'
import { buildScene } from './Components/SceneBuilder.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="card">
      <button id="counter" type="button"></button>
      <radiogroup id="backend"> 
        <input type="radio" name="mode" value="webgl" checked> WebGL
        <input type="radio" name="mode" value="webgpu"> WebGPU
      </radiogroup>
      <canvas id="canvas" width="800" height="600"></canvas>
    </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

buildScene(document.querySelector<HTMLCanvasElement>('#canvas')!, document.querySelector<HTMLInputElement>('#backend')!)