import { PrimitiveType } from "../../../Components/PrimitiveType";
import { Scene } from "../../../Components/Scene";
import { tringulateCircle } from "../../../utils/Triangulator";
import { SceneRendererBase } from "../SceneRendererBase";
import { InstancedBasicShader } from "./InstancedBasicShader";
import { InstGeomRenderer } from "./InstGeomRenderer";

export class InstancedSceneRenderer extends SceneRendererBase {
    private rectRenderer: InstGeomRenderer = new InstGeomRenderer(PrimitiveType.Rectangle);
    private triangleRenderer: InstGeomRenderer = new InstGeomRenderer(PrimitiveType.Triangle);
    private circleRenderer: InstGeomRenderer = new InstGeomRenderer(PrimitiveType.Circle);
    private globalToLocalIdxMap: Map<number, number> = new Map();

    constructor(gl: WebGL2RenderingContext, scene: Scene) {
        super(gl, scene, new InstancedBasicShader(gl));
        this.initializeIndexMap();
        this.initializeRenderers();
     }
    sceneChanged(changedIdx: number): void {
        if(changedIdx !== -1) {
            const localIdx = this.globalToLocalIdxMap.get(changedIdx)!;
            const p = this.scene.primitives[changedIdx];
            const renderer = this.getRenderer(p.type)
            if(renderer) {
                renderer.setTranslation(localIdx, p.position);
                super.render();
            }
        }        
    }
    renderScene(): void {
        this.rectRenderer.render(this.gl);
        this.triangleRenderer.render(this.gl);
        this.circleRenderer.render(this.gl);
    }
    
    initializeRenderers(): void {
        this.initRectRenderer();
        this.initTriangleRenderer();
        this.initCircleRenderer();
    }

    private initRectRenderer() {
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

        const { positions, scales, colors, depths } = this.getAttributes(PrimitiveType.Rectangle);
        this.rectRenderer.initializeBuffers(this.gl,
            shader.positionAttribLoc,
            shader.transAttribLoc,
            shader.scaleAttribLoc,
            shader.colorAttribLoc,
            shader.depthAttribLoc,
            vertices,
            indices,
            positions,
            scales,
            colors,
            depths
        );
    }

    initTriangleRenderer(): void {
        const shader = this.shader as InstancedBasicShader;

        const vertices = new Float32Array([
            0.0, 0.0,
            0.5, 1.0,
            1.0, 0.0
        ]);
        const indices = new Uint16Array([
            0, 1, 2
        ]);

        const { positions, scales, colors, depths } = this.getAttributes(PrimitiveType.Triangle);
        this.triangleRenderer.initializeBuffers(this.gl,
            shader.positionAttribLoc,
            shader.transAttribLoc,
            shader.scaleAttribLoc,
            shader.colorAttribLoc,
            shader.depthAttribLoc,
            vertices,
            indices,
            positions,
            scales,
            colors,
            depths
        );
    }
    initCircleRenderer(): void {
        const shader = this.shader as InstancedBasicShader;
        const circle = tringulateCircle(10);
        const { positions, scales, colors, depths } = this.getAttributes(PrimitiveType.Circle);
        this.circleRenderer.initializeBuffers(this.gl,
            shader.positionAttribLoc,
            shader.transAttribLoc,
            shader.scaleAttribLoc,
            shader.colorAttribLoc,
            shader.depthAttribLoc,
            circle.vertices,
            circle.indices,
            positions,
            scales,
            colors,
            depths
        );
    }
    getAttributes(type: PrimitiveType) {
        const filtered = this.scene.primitives.filter(p => p.type === type);
        const count = filtered.length;
        const positions = new Float32Array(count * 2);
        const depths = new Float32Array(count);
        const scales = new Float32Array(count * 2);
        const colors = new Float32Array(count * 4);

        for(const [i, p] of filtered.entries()) {
            positions.set(p.position.data, 2 * i);
            depths[i] = -p.depth/this.scene.primitives.length;
            scales.set(p.scale.data, 2 * i);
            colors.set(p.color.data, 4 * i);
        }
        return { positions, scales, colors, depths };
    }
    initializeIndexMap(): void {
        const countMap: Map<PrimitiveType, number> = new Map();
        for (const [i, p] of this.scene.primitives.entries()) {
            const count = countMap.get(p.type) || 0;
            this.globalToLocalIdxMap.set(i, count);
            countMap.set(p.type, count + 1);
        }
    }

    getRenderer(type: PrimitiveType) : InstGeomRenderer | null{ 
        switch (type) {
            case PrimitiveType.Rectangle:
                return this.rectRenderer;
            case PrimitiveType.Triangle:
                return this.triangleRenderer;
            case PrimitiveType.Circle:
                return this.circleRenderer;
            default:
                return null;
        }
    }

    cleanup(): void {
        super.cleanup();
        this.rectRenderer.cleanup(this.gl);
    }
}