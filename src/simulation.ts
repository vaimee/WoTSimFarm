import Sprinkler from "./sprikler";
import SoilSensor from "./soilSensor";

export default class Simulation {
    private simObjects: Map<Sprinkler,Array<SoilSensor>>;
    private timeOfTheDay: number;

    constructor(sunRiseHour:number,sunSetHour:number) {
        this.simObjects = new Map();
        this.timeOfTheDay = 0;
    }

    add(sprinkler:Sprinkler,sensors:Array<SoilSensor> = []){
        this.simObjects.set(sprinkler,sensors)
    }

    step(){
        for (let [sprinkler, sensors] of this.simObjects) {
            sensors.forEach(sensor => {
                if (sprinkler.isActive){
                    sensor.moisture += 1
                }

                const timeOfTheDayBooster = 1
                // Evaporation
                sensor.moisture -= 0.2 * timeOfTheDayBooster;
            })
           
        }
       


    }
}