import { PrimitiveType } from "../../../Components/PrimitiveType";
import { vec2 } from "../../../utils/math";

export class InstGeomRenderer {

    vao: WebGLVertexArrayObject | null = null;
    positionBuffer: WebGLBuffer | null = null;
    colorBuffer: WebGLBuffer | null = null;
    transBuffer: WebGLBuffer | null = null;
    scaleBuffer: WebGLBuffer | null = null;
    indexBuffer: WebGLBuffer | null = null;

    numVertices: number = 0;
    numIndices: number = 0;
    numInstances: number = 0;

    lastModifiedIdx: number|null = null;
    lastModifiedTrans: vec2|null = null;

    type: PrimitiveType;
    constructor(type: PrimitiveType) {
      this.type = type;
    }
   setTranslation(index: number, position: vec2) {
    this.lastModifiedTrans = position;
    this.lastModifiedIdx = index;
   }

   initializeBuffers(gl: WebGL2RenderingContext,
    posAttribLoc: number,
    transAttribLoc: number,
    scaleAttribLoc: number,
    colorAttribLoc: number,
    vertices: Float32Array,
    indices: Uint16Array,
    translations: Float32Array,
    scales: Float32Array,
    colors: Float32Array) {
    
    this.numVertices = vertices.length / 2;
    this.numIndices = indices.length;
    this.numInstances = translations.length / 2;

    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(posAttribLoc);
    gl.vertexAttribPointer(posAttribLoc, 2, gl.FLOAT, false, 0, 0);
    
    this.transBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.transBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, translations, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(transAttribLoc);
    gl.vertexAttribPointer(transAttribLoc, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(transAttribLoc, 1);

    this.scaleBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.scaleBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, scales, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(scaleAttribLoc);
    gl.vertexAttribPointer(scaleAttribLoc, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(scaleAttribLoc, 1);

    this.colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(colorAttribLoc);
    gl.vertexAttribPointer(colorAttribLoc, 4, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(colorAttribLoc, 1);

    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
   }

   render(gl: WebGL2RenderingContext) {
    gl.bindVertexArray(this.vao);
    if(this.lastModifiedIdx !== null) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.transBuffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, this.lastModifiedIdx * 2 * 4, this.lastModifiedTrans!.data, 0, 2 );
      this.lastModifiedIdx = null;
      this.lastModifiedTrans = null;
    }
    gl.drawElementsInstanced(gl.TRIANGLES, this.numIndices, gl.UNSIGNED_SHORT, 0, this.numInstances);
   }

   cleanup(gl: WebGL2RenderingContext) {
    gl.deleteVertexArray(this.vao);
    gl.deleteBuffer(this.positionBuffer);
    gl.deleteBuffer(this.transBuffer);
    gl.deleteBuffer(this.scaleBuffer);
    gl.deleteBuffer(this.colorBuffer);
    gl.deleteBuffer(this.indexBuffer);

    this.vao = null;
    this.positionBuffer = null;
    this.transBuffer = null;
    this.scaleBuffer = null;
    this.colorBuffer = null;
    this.indexBuffer = null;
   }
}