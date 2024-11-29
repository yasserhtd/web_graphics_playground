import { vec2, vec4 } from "../utils/math";
import { Primitive } from "./Primitive";
import seedrandom from "seedrandom";
import { Rectangle } from "./Rectangle";

enum PrimitiveType {
    Circle,
    Rectangle,
    Triangle,
    Hexagon
}

export function generatePrimitives(numInstances: number) {
    const rng = seedrandom('my-seed');
    const density = numInstances / 10;
    let primitives: Primitive[] = [];
    for (let i = 0; i < numInstances; i++) {
        const randomColor = new vec4(rng(), rng(), rng(), 1.0);
        const randomPos = new vec2(density*(rng() * 2 - 1), density*(rng() * 2 - 1));
        const randomScale = new vec2(rng() + 0.25, rng() + 0.25);
  
        const note = new Rectangle(randomPos, randomScale, randomColor);
        primitives.push(note);
    }
    
}