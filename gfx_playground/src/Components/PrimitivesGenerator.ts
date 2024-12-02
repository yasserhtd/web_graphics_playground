import { vec2, vec4 } from "../utils/math";
import { Primitive } from "./Primitive";
import seedrandom from "seedrandom";
import { Rectangle } from "./Rectangle";
import { PrimitiveType } from "./PrimitiveType";

function createPrimitive(primitiveType: PrimitiveType, p: vec2, s: vec2, c: vec4) : Primitive {
    switch (primitiveType) {
        case PrimitiveType.Circle:
            break;
        case PrimitiveType.Rectangle:
            return new Rectangle(p, s, c);
        case PrimitiveType.Triangle:
            break;
        case PrimitiveType.Hexagon:
            break;
        default:
            break;
    }
    return new Rectangle(p, s, c);
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
    const density = numInstances / 10;
    let primitives: Primitive[] = [];
    for (let i = 0; i < numInstances; i++) {
        const randomColor = new vec4(rng(), rng(), rng(), 1.0);
        const randomPos = new vec2(density*(rng() * 2 - 1), density*(rng() * 2 - 1));
        const randomScale = new vec2(rng() + 0.25, rng() + 0.25);
        const randomPrimitiveType:PrimitiveType = Math.floor(rng() * PrimitiveType.END);

        const primitive = createPrimitive(randomPrimitiveType, randomPos, randomScale, randomColor);
        primitives.push(primitive);
    }
    return primitives;
}