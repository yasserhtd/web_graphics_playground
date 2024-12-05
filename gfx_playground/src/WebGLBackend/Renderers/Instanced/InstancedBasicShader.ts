import { ShaderBase } from "../ShaderBase";

var vertexShaderSource = `#version 300 es
 
// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
layout(location=0) in vec2 a_position;

layout(location=1) in vec2 a_translation;
layout(location=2) in vec2 a_scale;
layout(location=3) in vec4 a_color;
layout(location=4) in float a_depth;

uniform vec2 u_cameraPos;
uniform float u_cameraZoom;

out vec4 o_color;

// all shaders have a main function
void main() {
  vec2 position = u_cameraZoom * (a_scale * a_position + a_translation);

  gl_Position = vec4(position, a_depth, 1.0);

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

export class InstancedBasicShader extends ShaderBase {
    positionAttribLoc: number = 0;
    transAttribLoc: number = 0;
    scaleAttribLoc: number = 0;
    colorAttribLoc: number = 0;
    depthAttribLoc: number = 0;

    constructor(gl: WebGL2RenderingContext) {
        super(gl, vertexShaderSource, fragmentShaderSource);
        if(this.program) {
            gl.useProgram(this.program);
            this.positionAttribLoc = gl.getAttribLocation(this.program, "a_position");
            this.transAttribLoc = gl.getAttribLocation(this.program, "a_translation");
            this.scaleAttribLoc = gl.getAttribLocation(this.program, "a_scale");
            this.colorAttribLoc = gl.getAttribLocation(this.program, "a_color");
            this.depthAttribLoc = gl.getAttribLocation(this.program, "a_depth");
            this.cameraPosULoc = gl.getUniformLocation(this.program, "u_cameraPos");
            this.cameraZoomULoc = gl.getUniformLocation(this.program, "u_cameraZoom");
        }
    }
}