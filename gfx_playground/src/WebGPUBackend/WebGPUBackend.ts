// Import WebGPU types (optional, depends on your setup)
 import { GPUDevice, GPUSwapChain } from "@webgpu/types";
import { TriangleRenderer } from "./TriangleRenderer";

export class WebGPUTriangleRenderer {
    private canvas: HTMLCanvasElement;
    private device!: GPUDevice;
    private context!: GPUCanvasContext;
    private commandEncoder!: GPUCommandEncoder;
    private renderPassEncoder!: GPURenderPassEncoder;
    private commandBuffer!: GPUCommandBuffer;

    constructor(canvas: HTMLCanvasElement) {
      this.canvas = canvas;
    }
  
    async initialize() {
      if (!navigator.gpu) {
        throw new Error("WebGPU is not supported on this browser.");
      }
  
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        throw new Error("Failed to get GPU adapter.");
      }
  
      this.device = await adapter.requestDevice();
  
      // Configure the canvas context
      this.context = this.canvas.getContext("webgpu") as GPUCanvasContext;
      const swapChainFormat = navigator.gpu.getPreferredCanvasFormat();
  
      this.context.configure({
        device: this.device,
        format: swapChainFormat,
        alphaMode: "opaque",
      });
  
      const textureView = this.context.getCurrentTexture().createView();
  
      this.commandEncoder = this.device.createCommandEncoder();
  
      this.renderPassEncoder = this.commandEncoder.beginRenderPass({
        colorAttachments: [
          {
            view: textureView,
            clearValue: { r: 0, g: 0, b: 0, a: 1 },
            loadOp: "clear",
            storeOp: "store",
          },
        ],
      });
  
      TriangleRenderer.initialize(swapChainFormat, this.device, this.renderPassEncoder);
      this.renderPassEncoder.end();
      this.commandBuffer = this.commandEncoder.finish();
    }
  
    render() {  
      this.device.queue.submit([this.commandBuffer]);
    }
  }
  