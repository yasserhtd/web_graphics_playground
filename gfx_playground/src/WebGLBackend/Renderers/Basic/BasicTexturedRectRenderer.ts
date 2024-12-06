import { PrimitiveType } from "../../../Components/PrimitiveType";
import { BasicRendererBase } from "./BasicRendererBase";

export class BasicTextureRectRenderer extends BasicRendererBase {

    texCoordBuffer: WebGLBuffer | null = null;

    constructor() {
        super(PrimitiveType.Rectangle);
    }

    initializeBuffers(gl: WebGL2RenderingContext, posAttribLoc: number, texcoordAttribLoc: number): void {
            this.vao = gl.createVertexArray();
            gl.bindVertexArray(this.vao);
            this.positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                0.0, 0.0,
                0.0, 1.0,
                1.0, 1.0,
                1.0, 0.0
            ]), gl.STATIC_DRAW);
    
            gl.enableVertexAttribArray(posAttribLoc);
            gl.vertexAttribPointer(posAttribLoc, 2, gl.FLOAT, false, 0, 0);
    
            this.texCoordBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                0.0, 0.0,
                0.0, 1.0,
                1.0, 1.0,
                1.0, 0.0
            ]), gl.STATIC_DRAW);
    
            gl.enableVertexAttribArray(texcoordAttribLoc);
            gl.vertexAttribPointer(texcoordAttribLoc, 2, gl.FLOAT, false, 0, 0);

            this.indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([
                0, 2, 1,
                0, 3, 2
            ]), gl.STATIC_DRAW);
    
            gl.bindVertexArray(null);
    }

    renderBorder(gl: WebGL2RenderingContext): void {
        gl.drawArrays(gl.LINE_LOOP, 0, 4);
    }

    renderFill(gl: WebGL2RenderingContext): void {
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    private static _instance: BasicTextureRectRenderer;
    public static get Instance() : BasicRendererBase {
        return this._instance || (this._instance = new this());

    }
}