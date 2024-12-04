import { createProgram, createShader } from "../utils/ShaderUtils";

export class ShaderBase {
    program: WebGLProgram | null = null;
    gl: WebGL2RenderingContext;
    cameraPosULoc: WebGLUniformLocation | null = null;
    cameraZoomULoc: WebGLUniformLocation | null = null;
    
    constructor(gl: WebGL2RenderingContext,
        vShaderSrc: string, fShaderSrc: string) {
            this.gl = gl;
            const vertexShader = createShader(gl, gl.VERTEX_SHADER, vShaderSrc);
            const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fShaderSrc);
            if(vertexShader && fragmentShader) {
                this.program = createProgram(gl, vertexShader, fragmentShader);
            }
    }

    useProgram() {
        this.gl.useProgram(this.program);
    }
}