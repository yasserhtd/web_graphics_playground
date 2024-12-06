import { PrimitiveType } from "../../../Components/PrimitiveType";
import { BasicRendererBase } from "./BasicRendererBase";

export class BasicTriangleRenderer extends BasicRendererBase {

    constructor() {
        super(PrimitiveType.Triangle);
    }

    initializeBuffers(gl: WebGL2RenderingContext, positionAttributeLocation: number): void {
            this.vao = gl.createVertexArray();
            gl.bindVertexArray(this.vao);
            this.positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                0.0, 0.0,
                0.5, 1.0,
                1.0, 0.0
            ]), gl.STATIC_DRAW);
    
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

            gl.bindVertexArray(null);
    }

    renderBorder(gl: WebGL2RenderingContext): void {
        gl.drawArrays(gl.LINE_LOOP, 0, 3);
    }

    renderFill(gl: WebGL2RenderingContext): void {
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    private static _instance: BasicTriangleRenderer;
    public static get Instance() : BasicRendererBase {
        return this._instance || (this._instance = new this());

    }
}