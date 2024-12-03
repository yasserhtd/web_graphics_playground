import { Primitive } from "../../../Components/Primitive";
import { PrimitiveType } from "../../../Components/PrimitiveType";
import { Scene } from "../../../Components/Scene";
import { tringulateCircle } from "../../../utils/Triangulator";
import { BasicShader } from "../../Shaders/BasicShader";
import { BasicPrimitiveRenderer } from "./BasicPrimitiveRenderer";
import { BasicRectangleRenderer } from "./BasicRectangleRenderer";
import { BasicTriangleRenderer } from "./BasicTriangleRenderer";
import { GeometryRenderer } from "./GeometryRenderer";

export class BasicSceneRenderer {
    scene: Scene;
    gl: WebGL2RenderingContext;
    shader: BasicShader;
    private lastBoundRenderer: BasicPrimitiveRenderer | null = null;
    private circleRenderer: GeometryRenderer = new GeometryRenderer(PrimitiveType.Circle);

    constructor(gl: WebGL2RenderingContext, scene: Scene) {
        this.gl = gl;
        this.scene = scene;
        this.scene.dragger.setSceneChangedCallback(this.sceneChanged.bind(this));
        this.scene.camera.setSceneChangedCallback(this.sceneChanged.bind(this));
        this.shader = new BasicShader(gl);
    
        this.initializeRenderers();
    }

    private sceneChanged(changedIdx: number) {
        // no need to update any buffers; just render
        this.render();
    }

    render() {
        this.gl.viewport(0, 0, this.scene.canvas.width, this.scene.canvas.height);
        this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    
        this.shader.useProgram();
        
        // set camera uniforms
        this.gl.uniform2fv(this.shader.cameraPosULoc, this.scene.camera.position.data);
        this.gl.uniform1f(this.shader.cameraZoomULoc, this.scene.camera.zoom);
        
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
        //TODO: check if scene types and initialize only necessary buffers.
        BasicRectangleRenderer.Instance.setUniformsLocations(this.shader.transULoc, this.shader.scaleULoc, this.shader.colorULoc);
        BasicRectangleRenderer.Instance.initializeBuffers(this.gl, this.shader.positionAttributeLocation);

        BasicTriangleRenderer.Instance.setUniformsLocations(this.shader.transULoc, this.shader.scaleULoc, this.shader.colorULoc);
        BasicTriangleRenderer.Instance.initializeBuffers(this.gl, this.shader.positionAttributeLocation);

        const circle = tringulateCircle(10);
        this.circleRenderer.setUniformsLocations(this.shader.transULoc, this.shader.scaleULoc, this.shader.colorULoc);
        this.circleRenderer.initializeBuffers(this.gl, this.shader.positionAttributeLocation, circle[0], circle[1]);
        
    }
}