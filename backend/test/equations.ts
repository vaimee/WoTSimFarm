import { sech, parametrizedSech } from "../src/utils/equations";
import assert from 'assert'

describe('utils', () => {
    describe('equations', () => {
        describe('BellExponential', () => {
            it('should work on x', () => {
                const groundTruth = [0.039365,   0.368900,   1.000000,   0.368900,   0.039365]
                const xInput = [-5.00000, -2.50000,   0.00000,   2.50000,   5.00000]
                
                for (let i = 0; i < xInput.length; i++) {
                    const x = xInput[i];
                    let out = sech({ x: x, y: 0, z: 0 })
                    // Round to the correct decimal position
                    out = Math.round((out + Number.EPSILON) * 1000000) / 1000000
                    assert.equal(out,groundTruth[i])   
                }
            });
            it('should work on y', () => {
                const groundTruth = [0.039365,   0.368900,   1.000000,   0.368900,   0.039365]
                const yInput = [-5.00000, -2.50000,   0.00000,   2.50000,   5.00000]
                
                for (let i = 0; i < yInput.length; i++) {
                    const y = yInput[i];
                    let out = sech({ x: 0, y: y, z: 0 })
                    // Round to the correct decimal position
                    out = Math.round((out + Number.EPSILON) * 1000000) / 1000000
                    assert.equal(out,groundTruth[i])   
                }
            });
            it('should work on z', () => {
                const groundTruth = [0.039365,   0.368900,   1.000000,   0.368900,   0.039365]
                const zInput = [-5.00000, -2.50000,   0.00000,   2.50000,   5.00000]
                
                for (let i = 0; i < zInput.length; i++) {
                    const z = zInput[i];
                    let out = sech({ x: 0, y: 0, z: z })
                    // Round to the correct decimal position
                    out = Math.round((out + Number.EPSILON) * 1000000) / 1000000
                    assert.equal(out,groundTruth[i])   
                }
            });
            it('should work on xy', () => {
                const groundTruth = [0.020078,   0.226166,   1.000000,   0.226166,   0.020078]
                const xyInput = [-5.00000, -2.50000,   0.00000,   2.50000,   5.00000]
                
                for (let i = 0; i < xyInput.length; i++) {
                    const xy = xyInput[i];
                    let out = sech({ x: xy, y: xy, z: 0 })
                    // Round to the correct decimal position
                    out = Math.round((out + Number.EPSILON) * 1000000) / 1000000
                    assert.equal(out,groundTruth[i])   
                }
            });
            it('should work on xz', () => {
                const groundTruth = [0.020078,   0.226166,   1.000000,   0.226166,   0.020078]
                const xzInput = [-5.00000, -2.50000,   0.00000,   2.50000,   5.00000]
                
                for (let i = 0; i < xzInput.length; i++) {
                    const xz = xzInput[i];
                    let out = sech({ x: xz, y: 0, z: xz })
                    // Round to the correct decimal position
                    out = Math.round((out + Number.EPSILON) * 1000000) / 1000000
                    assert.equal(out,groundTruth[i])   
                }
            });
            it('should work on yz', () => {
                const groundTruth = [0.020078, 0.226166, 1.000000, 0.226166, 0.020078]
                const yzInput = [-5.00000, -2.50000, 0.00000, 2.50000, 5.00000]

                for (let i = 0; i < yzInput.length; i++) {
                    const yz = yzInput[i];
                    let out = sech({ x: 0, y: yz, z: yz })
                    // Round to the correct decimal position
                    out = Math.round((out + Number.EPSILON) * 1000000) / 1000000
                    assert.equal(out, groundTruth[i])
                }
            });
            it('should work on xyz', () => {
                const groundTruth = [0.013475,   0.163071,   1.000000,   0.163071,   0.013475]
                const xyzInput = [-5.00000, -2.50000, 0.00000, 2.50000, 5.00000]

                for (let i = 0; i < xyzInput.length; i++) {
                    const xyz = xyzInput[i];
                    let out = sech({ x: xyz, y: xyz, z: xyz })
                    // Round to the correct decimal position
                    out = Math.round((out + Number.EPSILON) * 1000000) / 1000000
                    assert.equal(out, groundTruth[i])
                }
            });
            it('should move the center to 1 1 1', () => {
                const groundTruth = [0.004957,   0.06034,   0.648054,   0.425096,   0.036619]
                const xyzInput = [-5.00000, -2.50000, 0.00000, 2.50000, 5.00000]

                for (let i = 0; i < xyzInput.length; i++) {
                    const xyz = xyzInput[i];
                    let out = parametrizedSech({ x: xyz, y: xyz, z: xyz },{
                        center: {x:1,y:1,z:1}
                    })
                    // Round to the correct decimal position
                    out = Math.round((out + Number.EPSILON) * 1000000) / 1000000
                    assert.equal(out, groundTruth[i])
                }
            });

            it('should increase the range', () => {
                const groundTruth = [0.52954,  0.83212,   1.00000,   0.83212,   0.52954]
                const xyzInput = [-5.00000, -2.50000, 0.00000, 2.50000, 5.00000]

                for (let i = 0; i < xyzInput.length; i++) {
                    const xyz = xyzInput[i];
                    let out = parametrizedSech({ x: xyz, y: xyz, z: xyz }, {
                        range: 4
                    })
                    // Round to the correct decimal position
                    out = Math.round((out + Number.EPSILON) * 100000) / 100000
                    assert.equal(out, groundTruth[i])
                }
            });


        });
    });
});