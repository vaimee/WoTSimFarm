import Sprinkler from "./sprinkler";
import SoilSensor from "./soilSensor";
import Terrain from "./terrain";

export default class Simulation {
    private simObjects: Map<Sprinkler,Array<SoilSensor>>;
    private terrainSensor: Map<Terrain, Array<SoilSensor>>
    private terrainSprinkler: Map<Terrain, Array<Sprinkler>>
    private timeOfTheDay: number;

    constructor() {
        this.simObjects = new Map();
        this.timeOfTheDay = 0; // 60 = 1 hour
        this.terrainSensor= new Map();
        this.terrainSprinkler = new Map();
    }

    addSprinkler(terrain:Terrain,sprinkler:Sprinkler){
        if(!this.terrainSprinkler.has(terrain)){
            this.terrainSprinkler.set(terrain,[])
        }
        this.terrainSprinkler.get(terrain).push(sprinkler)
    }

    addSensor(terrain:Terrain,sensor:SoilSensor){
        if (!this.terrainSensor.has(terrain)) {
            this.terrainSensor.set(terrain, [])
        }
        this.terrainSensor.get(terrain).push(sensor)
    }

    
    public get sensors() : SoilSensor[] {
        return Array.from(this.terrainSensor.values()).reduce((result,current)=>{
            return result.concat(current);
        },[])
    }

    
    public get sprinklers() : Sprinkler[] {
        return Array.from(this.terrainSprinkler.values()).reduce((result, current) => {
            return result.concat(current);
        }, [])
    }
    
    

    step(){
        this.timeOfTheDay++
        let dayHour = Math.floor(this.timeOfTheDay / 60)
        
        if (dayHour > 23){
            dayHour = 0;
            this.timeOfTheDay = 0
        }

        for (const [terrain, sprinklers] of this.terrainSprinkler) {
            for (const sprinkler of sprinklers) {
                if(sprinkler.isActive){
                    terrain.poorWater(sprinkler.waterPerSecond,sprinkler.position,10)
                    
                }
            }
        }
        
        for (const [terrain, sensors] of this.terrainSensor) {
            for (const sensor of sensors) {
                sensor.moisture = terrain.probeMoisture(sensor.position)
            }
        }

        for (const [terrain] of this.terrainSprinkler) {
            terrain.consumeWater(this.evaporate(this.timeOfTheDay))
            terrain.spread(1)
        }
    }

    private evaporate(dayHour:number) {
        // 2/(e^(x/2)+e^(-x/2)) min x = -6 and x = 6 max x = 0
        let x = dayHour - 12 //max solar evaporation at noon
        const e = Math.exp
        const timeOfTheDayBooster = 2 / (e(x / 2) + e(-x / 2))
        // Evaporation
        return 0.2 * timeOfTheDayBooster;
    }
}