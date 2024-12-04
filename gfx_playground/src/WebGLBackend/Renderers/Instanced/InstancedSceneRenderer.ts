import { PrimitiveType } from "../../../Components/PrimitiveType";
import { Scene } from "../../../Components/Scene";
import { SceneRendererBase } from "../SceneRendererBase";
import { InstancedBasicShader } from "./InstancedBasicShader";
import { InstGeomRenderer } from "./InstGeomRenderer";

export class InstancedSceneRenderer extends SceneRendererBase {
    private rectRenderer: InstGeomRenderer = new InstGeomRenderer(PrimitiveType.Rectangle);

    constructor(gl: WebGL2RenderingContext, scene: Scene) {
        super(gl, scene, new InstancedBasicShader(gl));
        this.initializeRenderers();
     }
    sceneChanged(changedIdx: number): void {
        this.rectRenderer.setTranslation(changedIdx, this.scene.primitives[changedIdx].position);
        super.render();
    }
    renderScene(): void {
        this.rectRenderer.render(this.gl);
    }
    
    initializeRenderers(): void {
        const shader = this.shader as InstancedBasicShader;

        const vertices = new Float32Array([
            0.0, 0.0,
            0.0, 1.0,
            1.0, 1.0,
            1.0, 0.0
        ]);
        const indices = new Uint16Array([
            0, 2, 1,
            0, 3, 2
        ]);

        const positions = new Float32Array(this.scene.primitives.length * 2);
        const scales = new Float32Array(this.scene.primitives.length * 2);
        const colors = new Float32Array(this.scene.primitives.length * 4);

        for (let i = 0; i < this.scene.primitives.length; i++) {
            positions.set(this.scene.primitives[i].position.data, 2 * i);
            scales.set(this.scene.primitives[i].scale.data, 2 * i);
            colors.set(this.scene.primitives[i].color.data, 4 * i);
        }
        this.rectRenderer.initializeBuffers(this.gl,
            shader.positionAttribLoc,
            shader.transAttribLoc,
            shader.scaleAttribLoc,
            shader.colorAttribLoc,
            vertices,
            indices,
            positions,
            scales,
            colors
        );
    }
}