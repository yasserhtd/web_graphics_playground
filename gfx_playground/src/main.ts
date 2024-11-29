import './style.css'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="card">
      <button id="counter" type="button"></button>
      <canvas id="canvas" width="800" height="600"></canvas>
    </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
