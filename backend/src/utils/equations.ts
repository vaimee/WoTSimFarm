export interface Vec3 {
    x: number,
    y: number,
    z: number
}

const e = Math.exp
/*
* implements sech(x,y,z)
*/
export function sech(input: Vec3) {
    const x = e(input.x) + e(-input.x)
    const y = e(input.y) + e(-input.y)
    const z = e(input.z) + e(-input.z)
    return 6 / (x + y + z)
}
export interface SechParameters {
    center?: Vec3;
    range?: number;
    peak?: number;
}
export function parametrizedSech(input: Vec3, parameters: SechParameters = {
    center: { x: 0, y: 0, z: 0 },
    range: 1,
    peak: 1
}) {
    if (parameters.range === 0) throw new Error("Range should be different than 0");

    const center = parameters.center || { x: 0, y: 0, z: 0 }
    const range = parameters.range || 1
    const peak = parameters.peak || 1
    
    const _input = {
        x: (input.x - center.x) / range,
        y: (input.y - center.y) / range,
        z: (input.z - center.z) / range
    }
    return sech(_input) * peak
}