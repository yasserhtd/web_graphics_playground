import { Scene } from "../../Components/Scene";
import { ShaderBase } from "./ShaderBase";

export abstract class SceneRendererBase {
    gl: WebGL2RenderingContext;
    scene: Scene;
    shader: ShaderBase;
    constructor(gl: WebGL2RenderingContext, scene: Scene, shader: ShaderBase) {
        this.gl = gl;
        this.scene = scene;
        this.shader = shader;
        this.scene.dragger.setSceneChangedCallback(this.sceneChanged.bind(this));
        this.scene.camera.setSceneChangedCallback(this.sceneChanged.bind(this));
    }

    render(): void {
        this.gl.viewport(0, 0, this.scene.canvas.width, this.scene.canvas.height);
        this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    
        this.shader.useProgram();
        this.gl.uniform2fv(this.shader.cameraPosULoc, this.scene.camera.position.data);
        this.gl.uniform1f(this.shader.cameraZoomULoc, this.scene.camera.zoom);
        this.renderScene();
    }
    abstract sceneChanged(changedIdx: number): void;
    abstract renderScene(): void;
}