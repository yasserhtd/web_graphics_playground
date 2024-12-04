import { ShaderBase } from "../ShaderBase";
import { createProgram, createShader } from "../../utils/ShaderUtils";

var basicVShader = `#version 300 es
precision mediump float;

layout(location=0) in vec2 a_position;

uniform float u_depth;
uniform vec2 u_translation;
uniform vec2 u_scale;
uniform vec2 u_cameraPos;
uniform float u_cameraZoom;

void main() {
  vec2 position = u_cameraZoom * (u_scale * a_position + u_translation);
  gl_Position = vec4(position, u_depth, 1.0);
}
`;
 
var basicFShader = `#version 300 es
precision mediump float;

uniform vec4 u_color;
out vec4 outColor;
 
void main() {
  outColor = u_color;
}
`;

export class BasicShader extends ShaderBase{
    posAttribLoc: number = 0;
    depthULoc: WebGLUniformLocation | null = null;
    transULoc: WebGLUniformLocation | null = null;
    scaleULoc: WebGLUniformLocation | null = null;
    colorULoc: WebGLUniformLocation | null = null;

    constructor(gl: WebGL2RenderingContext, vShaderSrc: string = basicVShader, fShaderSrc: string = basicFShader) {
        super(gl, vShaderSrc, fShaderSrc);
        if(this.program) {
            gl.useProgram(this.program);
            this.posAttribLoc = gl.getAttribLocation(this.program, "a_position");
            this.depthULoc = gl.getUniformLocation(this.program, "u_depth");
            this.transULoc = gl.getUniformLocation(this.program, "u_translation");
            this.scaleULoc = gl.getUniformLocation(this.program, "u_scale");
            this.colorULoc = gl.getUniformLocation(this.program, "u_color");
            this.cameraPosULoc = gl.getUniformLocation(this.program, "u_cameraPos");
            this.cameraZoomULoc = gl.getUniformLocation(this.program, "u_cameraZoom");
        }
    }
}