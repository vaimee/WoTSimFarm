import sensorModel from './tds/sensor.td.json'
import sprinklerModel from './tds/sprinkler.td.json'
import SoilSensor from './soilSensor'
import Sprinkler from './sprinkler';
import Simulation from './simulation';
import simulationModel from "./assets/positions.json";
import Position from './position';
import Terrain from './terrain';
import copy from 'deep-copy';



const sim = createSimulation()
let sprinklerId = 0

sim.sensors.forEach(async sensor => {
    const copySensorModel = copy(sensorModel)
    copySensorModel.title = sensorModel.title + sensor.id;
    copySensorModel["position"] = sensor.position
    const sensorThing = await WoT.produce(copySensorModel);

    bindSoilSensor(sensor, sensorThing);

    await sensorThing.expose();
})

sim.sprinklers.forEach(async sprinkler => {
    const copySprinklerModel = copy(sprinklerModel);
    copySprinklerModel["position"] = sprinkler.position
    copySprinklerModel.title = sprinklerModel.title + sprinklerId++;
    const sprinklerThing = await WoT.produce(copySprinklerModel);

    bindSprinkler(sprinkler, sprinklerThing);

    await sprinklerThing.expose()
})


setInterval(()=>{
    sim.step();
},1000 )


function bindSoilSensor(soilSensor:SoilSensor,webThing:WoT.ExposedThing) {
    webThing.setPropertyReadHandler("moisture", async () => soilSensor.moisture);
    webThing.setPropertyWriteHandler("moisture", async (value) => soilSensor.moisture = value);
    webThing.setPropertyReadHandler("temperature", async () => soilSensor.temperature);
    webThing.setPropertyWriteHandler("temperature", async (value) => soilSensor.temperature = value);

    soilSensor.on("tooDry", webThing.emitEvent.bind(webThing, "tooDry"));
}

function bindSprinkler(sprinkler:Sprinkler,webThing:WoT.ExposedThing) {
    
    webThing.setActionHandler("startSprinkler", async (data) => {
        //TODO: use input timeout
        sprinkler.activate();
    })
    webThing.setActionHandler("stopSprinkler", async (data) => {
        sprinkler.stop();
    })
    webThing.setPropertyReadHandler("status",async ()=> sprinkler.isActive ? "on": "off")
}

function createSimulation() {
    const sim = new Simulation();
    let terrains = simulationModel.filter( element => element.type === "terrain")
                    .reduce((map,terrain)=>{
                        map.set(terrain.id,new Terrain())
                        return map;
                    },new Map<string,Terrain>())
    simulationModel.filter((element) => element.type === "sensor" )
        .forEach( sensor => sim.addSensor(terrains.get(sensor.terrainId),new SoilSensor(10, sensor.position)));
    simulationModel.filter((element) => element.type === "sprinkler" )
        .forEach(sprinkler => sim.addSprinkler(terrains.get(sprinkler.terrainId), new Sprinkler(1, sprinkler.position)));            

    return sim;
}