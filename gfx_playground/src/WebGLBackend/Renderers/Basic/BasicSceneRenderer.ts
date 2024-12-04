import { Primitive } from "../../../Components/Primitive";
import { PrimitiveType } from "../../../Components/PrimitiveType";
import { Scene } from "../../../Components/Scene";
import { tringulateCircle } from "../../../utils/Triangulator";
import { BasicShader } from "./BasicShader";
import { SceneRendererBase } from "../SceneRendererBase";
import { BasicPrimitiveRenderer } from "./BasicPrimitiveRenderer";
import { BasicRectangleRenderer } from "./BasicRectangleRenderer";
import { BasicTriangleRenderer } from "./BasicTriangleRenderer";
import { GeometryRenderer } from "./GeometryRenderer";

export class BasicSceneRenderer extends SceneRendererBase{
    private lastBoundRenderer: BasicPrimitiveRenderer | null = null;
    private circleRenderer: GeometryRenderer = new GeometryRenderer(PrimitiveType.Circle);

    constructor(gl: WebGL2RenderingContext, scene: Scene) {
        super(gl, scene, new BasicShader(gl));
        this.initializeRenderers();
    }

    sceneChanged(changedIdx: number) {
        // no need to update any buffers; just render
        this.render();
    }

    renderScene() {
        this.scene.primitives.forEach(primitive => {
            const renderer = this.bindRenderer(primitive);
            
            renderer.setTransform(this.gl, primitive.position, primitive.scale);

            renderer.setColor(this.gl, Primitive.borderColor);
            renderer.renderBorder(this.gl);

            renderer.setColor(this.gl, primitive.color);
            renderer.renderFill(this.gl);
        });
    }

    private bindRenderer(primitive: Primitive) : BasicPrimitiveRenderer {
        if(this.lastBoundRenderer?.type == primitive.type) {
            return this.lastBoundRenderer;
        }

        switch (primitive.type) {
            case PrimitiveType.Rectangle:
                this.lastBoundRenderer = BasicRectangleRenderer.Instance;
                break;
            case PrimitiveType.Triangle:
                this.lastBoundRenderer = BasicTriangleRenderer.Instance;
                break;
            case PrimitiveType.Circle:
                this.lastBoundRenderer = this.circleRenderer;
                break;
            default:
                this.lastBoundRenderer = BasicRectangleRenderer.Instance;
                break;
        }
        
        this.lastBoundRenderer.bind(this.gl);
        return this.lastBoundRenderer;
    }

    initializeRenderers() {
        const shader = this.shader as BasicShader;
        //TODO: check if scene types and initialize only necessary buffers.
        BasicRectangleRenderer.Instance.setUniformsLocations(shader.transULoc, shader.scaleULoc, shader.colorULoc);
        BasicRectangleRenderer.Instance.initializeBuffers(this.gl, shader.positionAttributeLocation);

        BasicTriangleRenderer.Instance.setUniformsLocations(shader.transULoc, shader.scaleULoc, shader.colorULoc);
        BasicTriangleRenderer.Instance.initializeBuffers(this.gl, shader.positionAttributeLocation);

        const circle = tringulateCircle(10);
        this.circleRenderer.setUniformsLocations(shader.transULoc, shader.scaleULoc, shader.colorULoc);
        this.circleRenderer.initializeBuffers(this.gl, shader.positionAttributeLocation, circle[0], circle[1]);
        
    }
}