import { vec2, vec4 } from "../utils/math";
import { Primitive } from "./Primitive";
import seedrandom from "seedrandom";
import { Rectangle } from "./Rectangle";
import { PrimitiveType } from "./PrimitiveType";
import { Triangle } from "./Triangle";
import { Circle } from "./Circle";

function createPrimitive(primitiveType: PrimitiveType, p: vec2, s: vec2, c: vec4, d: number) : Primitive {
    switch (primitiveType) {
        case PrimitiveType.Circle:
            return new Circle(p, s, c, d);
        case PrimitiveType.Rectangle:
            return new Rectangle(p, s, c, d);
        case PrimitiveType.Triangle:
            return new Triangle(p, s, c, d);
        default:
            break;
    }
    return new Rectangle(p, s, c, d);
}

/**
 * Generates a specified number of random primitives.
 * 
 * @param numInstances - The number of primitives to generate.
 * 
 * This function uses a seeded random number generator to ensure consistent results
 * across invocations. For each primitive, it randomly selects a type, position, scale,
 * and color, then creates the primitive and adds it to the list. The position and scale
 * are influenced by the density, which is calculated as the number of instances divided by 10.
 * The generated primitives are stored in an array and returned.
 */
export function generatePrimitives(numInstances: number) : Primitive[] {
    const rng = seedrandom('my-seed');
    const density = Math.log(numInstances);
    let primitives: Primitive[] = [];
    for (let i = 0; i < numInstances; i++) {
        const randomColor = new vec4(rng(), rng(), rng(), 1.0);
        const randomPos = new vec2(density*(rng() * 2 - 1), density*(rng() * 2 - 1));
        const randomScale = new vec2(rng() + 0.25, rng() + 0.25);
        const randomPrimitiveType:PrimitiveType = Math.floor(rng() * PrimitiveType.END);
        const depth = i;
        const primitive = createPrimitive(randomPrimitiveType, randomPos, randomScale, randomColor, depth);
        primitives.push(primitive);
    }
    return primitives;
}