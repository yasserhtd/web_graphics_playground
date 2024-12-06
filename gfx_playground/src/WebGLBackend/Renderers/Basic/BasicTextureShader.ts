import { ShaderBase } from "../ShaderBase";

var basicVShader = `#version 300 es
precision mediump float;

layout(location=0) in vec2 a_position;
layout(location=1) in vec2 a_texcoord;

uniform float u_depth;
uniform vec2 u_translation;
uniform vec2 u_scale;
uniform vec2 u_cameraPos;
uniform float u_cameraZoom;

out vec2 v_texcoord;

void main() {
  vec2 position = u_cameraZoom * (u_scale * a_position + u_translation);
  gl_Position = vec4(position, u_depth, 1.0);

  v_texcoord = a_texcoord;
}
`;
 
var basicFShader = `#version 300 es
precision mediump float;

in vec2 v_texcoord;
out vec4 outColor;

uniform sampler2D u_texture;
void main() {
  outColor = texture(u_texture, v_texcoord);
}
`;

export class BasicTextureShader extends ShaderBase{
    posAttribLoc: number = 0;
    texcoordAttribLoc: number = 0;
    depthULoc: WebGLUniformLocation | null = null;
    transULoc: WebGLUniformLocation | null = null;
    scaleULoc: WebGLUniformLocation | null = null;

    constructor(gl: WebGL2RenderingContext, vShaderSrc: string = basicVShader, fShaderSrc: string = basicFShader) {
        super(gl, vShaderSrc, fShaderSrc);
        if(this.program) {
            gl.useProgram(this.program);
            this.posAttribLoc = gl.getAttribLocation(this.program, "a_position");
            this.texcoordAttribLoc = gl.getAttribLocation(this.program, "a_texcoord");
            this.depthULoc = gl.getUniformLocation(this.program, "u_depth");
            this.transULoc = gl.getUniformLocation(this.program, "u_translation");
            this.scaleULoc = gl.getUniformLocation(this.program, "u_scale");
            this.cameraPosULoc = gl.getUniformLocation(this.program, "u_cameraPos");
            this.cameraZoomULoc = gl.getUniformLocation(this.program, "u_cameraZoom");
        }
    }
}