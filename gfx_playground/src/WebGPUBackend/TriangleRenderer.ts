export class TriangleRenderer {
    static initialize(swapChainFormat: GPUTextureFormat, device: GPUDevice, pass: GPURenderPassEncoder) {
        const vertexShaderCode = `
        @vertex
        fn main(@builtin(vertex_index) vertexIndex: u32) -> @builtin(position) vec4<f32> {
          var positions = array<vec2<f32>, 3>(
            vec2<f32>(0.0, 0.5),
            vec2<f32>(-0.5, -0.5),
            vec2<f32>(0.5, -0.5)
          );
          let position = positions[vertexIndex];
          return vec4<f32>(position, 0.0, 1.0);
        }
      `;
  
      // Fragment shader
      const fragmentShaderCode = `
        @fragment
        fn main() -> @location(0) vec4<f32> {
          return vec4<f32>(1.0, 0.0, 0.0, 1.0);
        }
      `;
        const shaderModule = {
            vertex: device.createShaderModule({ code: vertexShaderCode }),
            fragment: device.createShaderModule({ code: fragmentShaderCode }),
          };
        let pipeline = device.createRenderPipeline({
            layout: "auto",
            vertex: {
              module: shaderModule.vertex,
              entryPoint: "main",
            },
            fragment: {
              module: shaderModule.fragment,
              entryPoint: "main",
              targets: [{ format: swapChainFormat }],
            },
            primitive: {
              topology: "triangle-list",
            },
          });
          pass.setPipeline(pipeline);
          pass.drawIndexed
    }    

}