import { PrimitiveType } from "../../../Components/PrimitiveType";
import { BasicPrimitiveRenderer } from "./BasicPrimitiveRenderer";

export class BasicRectangleRenderer extends BasicPrimitiveRenderer {

    type: PrimitiveType = PrimitiveType.Rectangle;
    
    initializeBuffers(gl: WebGL2RenderingContext, positionAttributeLocation: number): void {
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
    
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
            
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

    private static _instance: BasicRectangleRenderer;
    public static get Instance() : BasicPrimitiveRenderer {
        return this._instance || (this._instance = new this());

    }
}