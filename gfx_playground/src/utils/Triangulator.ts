import Delaunator from 'delaunator';
import { getCirclePoints } from './CirclePtsGen';

export function tringulateCircle(lod: number) : [Float32Array, Uint16Array] {
    const points = getCirclePoints(lod);
    const delaunay = new Delaunator(points);

    return [delaunay.coords, new Uint16Array(delaunay.triangles)];
}