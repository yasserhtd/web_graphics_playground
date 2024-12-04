import { PrimitiveType } from "../../../Components/PrimitiveType";
import { BasicPrimitiveRenderer } from "./BasicPrimitiveRenderer";

export class GeometryRenderer extends BasicPrimitiveRenderer {

    numVertices: number = 0;
    numIndices: number = 0;

    constructor(type: PrimitiveType) {
        super(type);
    }
    initializeBuffers(gl: WebGL2RenderingContext,
        positionAttributeLocation: number,
        vertices: Float32Array,
        indices: Uint16Array): void {
            this.numVertices = vertices.length / 2;
            this.numIndices = indices.length;
            this.vao = gl.createVertexArray();
            gl.bindVertexArray(this.vao);
            this.positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

            this.indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

            gl.bindVertexArray(null);
    }

    renderBorder(gl: WebGL2RenderingContext): void {
        gl.drawArrays(gl.LINE_LOOP, 0, this.numVertices);
    }

    renderFill(gl: WebGL2RenderingContext): void {
        gl.drawElements(gl.TRIANGLES, this.numIndices, gl.UNSIGNED_SHORT, 0);
    }
}