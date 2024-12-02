
export function getCirclePoints(lod: number) : Float32Array { 
    const points = new Float32Array(360 * 2);
    const increment = 1;
    let index = 0;
    for (let i = 0; i < 360; i += increment) {
        points[index++] = Math.cos(i * Math.PI / 180);
        points[index++] = Math.sin(i * Math.PI / 180);
    }
    return points;
}

