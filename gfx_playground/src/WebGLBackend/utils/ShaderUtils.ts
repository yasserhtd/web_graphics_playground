
export function createShader(gl: WebGL2RenderingContext,type: GLenum, source:string) : WebGLShader | null {
    let shader = gl.createShader(type);
    if (!shader) {
      return null;
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    console.log(gl.getShaderInfoLog(shader));  // eslint-disable-line
    gl.deleteShader(shader);
    return null;
  }
  
export function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) : WebGLProgram | null {
    let program = gl.createProgram();
    if (!program) {
      return null;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
  
    console.log(gl.getProgramInfoLog(program));  // eslint-disable-line
    gl.deleteProgram(program);
    return null;
  }