import { vec2, vec4 } from "../../utils/math";

export class RectangleRenderer {

    private static _instance: RectangleRenderer;
    vao: WebGLVertexArrayObject | null = null;
    positionBuffer: WebGLBuffer | null = null;
    indexBuffer: WebGLBuffer | null = null;
    transULoc: WebGLUniformLocation|null = null;
    scaleULoc: WebGLUniformLocation|null = null;
    colorULoc: WebGLUniformLocation|null = null;

    constructor() {

    }

    initalizeBuffers(gl: WebGL2RenderingContext,
         positionAttributeLocation: number,
         transULoc: WebGLUniformLocation|null,
         scaleULoc: WebGLUniformLocation|null,
         colorULoc: WebGLUniformLocation|null): void {

        this.transULoc = transULoc;
        this.scaleULoc = scaleULoc;
        this.colorULoc = colorULoc;
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

    bind(gl: WebGL2RenderingContext) {

        gl.bindVertexArray(this.vao);
    }

    render(gl: WebGL2RenderingContext,  color: vec4, borderColor: vec4): void {

        //Draw border
        gl.uniform4fv(this.colorULoc, borderColor.data);
        gl.drawArrays(gl.LINE_LOOP, 0, 4);

        //fill the inside
        gl.uniform4fv(this.colorULoc, color.data);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    setTransform(gl: WebGL2RenderingContext, position: vec2, scale: vec2): void {
        gl.uniform2fv(this.transULoc, position.data);
        gl.uniform2fv(this.scaleULoc, scale.data);
    }
    setColor(gl: WebGL2RenderingContext,  color: vec4): void {
        gl.uniform4fv(this.colorULoc, color.data);
    }
    renderBorder(gl: WebGL2RenderingContext): void {
        gl.drawArrays(gl.LINE_LOOP, 0, 4);
    }

    renderFill(gl: WebGL2RenderingContext): void {
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());

    }
}