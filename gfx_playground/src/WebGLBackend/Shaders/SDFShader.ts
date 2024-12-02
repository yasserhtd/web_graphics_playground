import { BasicShader } from "./BasicShader"
var sdfVShader = `#version 300 es
`;
var sdfFShader = `#version 300 es
precision mediump float;

in vec2 o_position;

//uniform vec2 u_center;
uniform vec4 u_color;

out vec4 outColor;
 
float sdCircle( vec2 p, float r )
{
    return length(p) - r;
}

float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

void main() {
  vec2 u_resolution = vec2(800,600);

  vec2 u_center = vec2(0.0,0.0);
  vec2 u_size = vec2(0.5);
  //vec2 p = (2.0*gl_FragCoord.xy-u_resolution)/u_resolution.y;
  vec2 p = o_position - vec2(0.5);
  //float distance = sdCircle(o_position + u_center, 1.0);
  float distance = sdBox(p, u_size);
  float thickness = 0.01;
  distance = 1.0-smoothstep(0.0,thickness,abs(distance));
  
  vec4 borderColor = vec4(0.0,0.0,0.0,1.0);
  outColor = mix(u_color, borderColor, distance);
  //outColor = vec4(distance,0.0,0.0,1.0);
  //outColor = u_color;
  //outColor = vec4(p, 0.0, 1.0);
}
`;
export class SDFShader extends BasicShader {

    constructor(gl: WebGL2RenderingContext) {
        super(gl, undefined, sdfFShader);
    }
}