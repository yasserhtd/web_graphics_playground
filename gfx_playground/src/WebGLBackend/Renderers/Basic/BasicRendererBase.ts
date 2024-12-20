import { PrimitiveType } from "../../../Components/PrimitiveType";
import { vec2, vec4 } from "../../../utils/math";

export abstract class BasicRendererBase {

    type: PrimitiveType;
    vao: WebGLVertexArrayObject | null = null;
    positionBuffer: WebGLBuffer | null = null;
    indexBuffer: WebGLBuffer | null = null;

    depthULoc: WebGLUniformLocation|null = null;
    transULoc: WebGLUniformLocation|null = null;
    scaleULoc: WebGLUniformLocation|null = null;
    colorULoc: WebGLUniformLocation|null = null;

    constructor(type: PrimitiveType) {
        this.type = type;
    }

    bind(gl: WebGL2RenderingContext) {
        gl.bindVertexArray(this.vao);
    }

    setUniformsLocations(transULoc: WebGLUniformLocation|null,
        scaleULoc: WebGLUniformLocation|null,
        colorULoc: WebGLUniformLocation|null,
        depthULoc: WebGLUniformLocation|null): void {

        this.depthULoc = depthULoc;
        this.transULoc = transULoc;
        this.scaleULoc = scaleULoc;
        this.colorULoc = colorULoc;
    }

    setTransform(gl: WebGL2RenderingContext, position: vec2, scale: vec2): void {
        gl.uniform2fv(this.transULoc, position.data);
        gl.uniform2fv(this.scaleULoc, scale.data);
    }

    setDepth(gl: WebGL2RenderingContext, depth: number): void {
        gl.uniform1f(this.depthULoc, depth);
    }

    setColor(gl: WebGL2RenderingContext,  color: vec4): void {
        gl.uniform4fv(this.colorULoc, color.data);
    }

    abstract initializeBuffers(gl: WebGL2RenderingContext,
        positionAttributeLocation: number,
        texcoordAttribLoc?: number,
        vertices?: Float32Array,
        indices?: Uint16Array): void;
        
    abstract renderBorder(gl: WebGL2RenderingContext): void;
    abstract renderFill(gl: WebGL2RenderingContext): void;
}