import { IShader } from "./IShader";
import { createProgram, createShader } from "./ShaderUtils";

var vertexShaderSource = `#version 300 es
 
// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
layout(location=0) in vec2 a_position;

layout(location=1) in vec2 a_translation;
layout(location=2) in vec2 a_scale;
layout(location=3) in vec4 a_color;

uniform vec2 u_cameraPos;
uniform float u_cameraZoom;

out vec4 o_color;

// all shaders have a main function
void main() {
  vec2 position = u_cameraZoom * (a_scale * a_position + a_translation);

  gl_Position = vec4(position, 0.0, 1.0);

  o_color = a_color; 
}
`;
 
var fragmentShaderSource = `#version 300 es
precision mediump float;

in vec4 o_color;
out vec4 outColor;
 
void main() {
  outColor = o_color;
}
`;

export class InstancedBasicShader implements IShader {
    gl: WebGL2RenderingContext;
    program: WebGLProgram | null = null;

    positionAttribLoc: number = 0;
    transAttribLoc: number = 0;
    scaleAttribLoc: number = 0;
    colorAttribLoc: number = 0;

    cameraPosULoc: WebGLUniformLocation | null = null;
    cameraZoomULoc: WebGLUniformLocation | null = null;

    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        if(vertexShader && fragmentShader) {
            this.program = createProgram(gl, vertexShader, fragmentShader);

            if(this.program) {
                gl.useProgram(this.program);
                this.positionAttribLoc = gl.getAttribLocation(this.program, "a_position");
                this.transAttribLoc = gl.getAttribLocation(this.program, "a_translation");
                this.scaleAttribLoc = gl.getAttribLocation(this.program, "a_scale");
                this.colorAttribLoc = gl.getAttribLocation(this.program, "a_color");
                this.cameraPosULoc = gl.getUniformLocation(this.program, "u_cameraPos");
                this.cameraZoomULoc = gl.getUniformLocation(this.program, "u_cameraZoom");
            }

        }
    }

    useProgram() {
        this.gl.useProgram(this.program);
    }

}