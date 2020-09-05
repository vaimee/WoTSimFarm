import Sprinkler from "./sprinkler";
import SoilSensor from "./soilSensor";

export default class Simulation {
    private simObjects: Map<Sprinkler,Array<SoilSensor>>;
    private timeOfTheDay: number;

    constructor() {
        this.simObjects = new Map();
        this.timeOfTheDay = 0; // 60 = 1 hour
    }

    add(sprinkler:Sprinkler,sensors:Array<SoilSensor> = []){
        this.simObjects.set(sprinkler,sensors)
    }

    getSimObjects(){
        return this.simObjects
    }

    step(){
        this.timeOfTheDay++
        let dayHour = Math.floor(this.timeOfTheDay / 60)
        
        if (dayHour > 23){
            dayHour = 0;
            this.timeOfTheDay = 0
        }

        for (let [sprinkler, sensors] of this.simObjects) {
            sensors.forEach(sensor => {
                if (sprinkler.isActive){
                    sensor.moisture += 1
                }

                sensor.moisture = this.evaporate(sensor.moisture,dayHour);
            })
           
        }

    }

    private evaporate(moisture:number,dayHour:number) {
        // 2/(e^(x/2)+e^(-x/2)) min x = -6 and x = 6 max x = 0
        let x = dayHour - 12 //max solar evaporation at noon
        const e = Math.exp
        const timeOfTheDayBooster = 2 / (e(x / 2) + e(-x / 2))
        // Evaporation
        return moisture - 0.2 * timeOfTheDayBooster;
    }
}