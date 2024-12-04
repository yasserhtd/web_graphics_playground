import { ShaderBase } from "../ShaderBase";
import { createProgram, createShader } from "../../utils/ShaderUtils";

var basicVShader = `#version 300 es
 
// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
layout(location=0) in vec2 a_position;

uniform vec2 u_translation;
uniform vec2 u_scale;
uniform vec2 u_cameraPos;
uniform float u_cameraZoom;

out vec2 o_position;
// all shaders have a main function
void main() {
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  vec2 position = u_cameraZoom * (u_scale * a_position + u_translation);
  o_position = a_position;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;
 
var basicFShader = `#version 300 es
precision mediump float;

in vec2 o_position;

uniform vec4 u_color;

out vec4 outColor;
 
void main() {
  outColor = u_color;
}
`;

export class BasicShader extends ShaderBase{
    positionAttributeLocation: number = 0;
    transULoc: WebGLUniformLocation | null = null;
    scaleULoc: WebGLUniformLocation | null = null;
    colorULoc: WebGLUniformLocation | null = null;

    constructor(gl: WebGL2RenderingContext, vShaderSrc: string = basicVShader, fShaderSrc: string = basicFShader) {
        super(gl, vShaderSrc, fShaderSrc);
        if(this.program) {
            gl.useProgram(this.program);
            this.positionAttributeLocation = gl.getAttribLocation(this.program, "a_position");
            this.transULoc = gl.getUniformLocation(this.program, "u_translation");
            this.scaleULoc = gl.getUniformLocation(this.program, "u_scale");
            this.colorULoc = gl.getUniformLocation(this.program, "u_color");
            this.cameraPosULoc = gl.getUniformLocation(this.program, "u_cameraPos");
            this.cameraZoomULoc = gl.getUniformLocation(this.program, "u_cameraZoom");
        }
    }
}