import Delaunator from 'delaunator';
import { getCirclePoints } from './CirclePtsGen';

export function tringulateCircle(lod: number) {
    const points = getCirclePoints(lod);
    const delaunay = new Delaunator(points);

    return {vertices: delaunay.coords, indices: new Uint16Array(delaunay.triangles)};
}