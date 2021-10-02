import Terrain from "../src/terrain";
import assert from 'assert'

describe('Terrain', () => {

    it('should poor water', () => {
        const terrain = new Terrain()

        terrain.poorWater(1)
        assert.equal(1,terrain["waterContent"])
    });
    it('should probe water with no water content', () => {
        const terrain = new Terrain()
        assert.equal(0,terrain.probeMoisture({x:0,y:0,z:0}))
    });
    it('should probe 10%', () => {
        const terrain = new Terrain()
        terrain.poorWater(100)
        const sample1 = terrain.probeMoisture({ x: 0, y: 0, z: 0 });

        assert.equal(sample1,0.1)
    });

    it('should probe 0.1%', () => {
        const terrain = new Terrain()
        terrain.poorWater(1)
        const sample1 = terrain.probeMoisture({ x: 0, y: 0, z: 0 });

        assert.equal(sample1, 0.001)
    });

    it('should poor water evenly', () => {
        const terrain = new Terrain()
        terrain.poorWater(1)
        const sample1 = terrain.probeMoisture({ x: 0, y: 0, z: 0 });
        const sample2 = terrain.probeMoisture({ x: 10, y: 10, z: 0 })
        
        assert.ok(Math.abs(sample1-sample2) < 0.0005,"too difference between two samples")
    });

    it('should consume water', () => {
        const terrain = new Terrain()
        terrain.poorWater(100)
        assert.equal(100, terrain["waterContent"])
        let sample = terrain.probeMoisture({ x: 0, y: 0, z: 0 });
        assert.equal(sample,0.1)

        terrain.consumeWater(10);
        assert.equal(90, terrain["waterContent"])
        sample = terrain.probeMoisture({ x: 0, y: 0, z: 0 });
        assert.equal(sample,0.09)
    });

    it('should poor water only in one point', () => {
        const terrain = new Terrain()
        terrain.poorWater(100,{x:0,y:0,z:0},1)
        
        const sampleCenter = terrain.probeMoisture({ x: 0, y: 0, z: 0 });
        const sampleFar = terrain.probeMoisture({ x: 100, y: 100, z: 0 });

        assert.ok(sampleCenter> sampleFar)
        
        
        assert.ok(sampleFar < 0.001,"Sample far is too high")
    });

    it('should dissipate water', () => {
        const terrain = new Terrain()
        terrain.poorWater(100, { x: 0, y: 0, z: 0 })
        const beforeWC = terrain["waterContent"]
        const beforeSampleCenter = terrain.probeMoisture({ x: 0, y: 0, z: 0 });
        

        terrain.spread(100)
        const afterWC = terrain["waterContent"]
        const afterSample = terrain.probeMoisture({ x: 0, y: 0, z: 0 });


        assert.equal(beforeWC,afterWC)
        assert.ok(beforeSampleCenter> afterSample,"No spread")

    });

    it('should not add an equation for the same poured point', () => {
        const terrain = new Terrain()
        terrain.poorWater(100, { x: 0, y: 0, z: 0 })

        assert.strictEqual(terrain["equations"].length,1);
        terrain.poorWater(100, { x: 0, y: 0, z: 0 })
        assert.strictEqual(terrain["equations"].length, 1);

    });
});