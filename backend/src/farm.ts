import sensorModel from './tds/sensor.td.json'
import sprinklerModel from './tds/sprinkler.td.json'
import SoilSensor from './soilSensor'
import Sprinkler from './sprinkler';
import Simulation from './simulation';
import simulationModel from "./assets/positions.json";
import Position from './position';



const sim = createSimulation()

sim.getSimObjects().forEach(async (sensors,sprinkler)=>{
    for (const sensor of sensors) {
        
        const copySensorModel = Object.assign({},sensorModel)
        copySensorModel.title = sensorModel.title + sensor.id;
        copySensorModel["position"] = sensor.position 
        const sensorThing = await WoT.produce(copySensorModel);

        bindSoilSensor(sensor,sensorThing);
        
        await sensorThing.expose();
    }
    
    sprinklerModel["position"] = sprinkler.position 
    const sprinklerThing = await WoT.produce(sprinklerModel);
    
    bindSprinkler(sprinkler,sprinklerThing);

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
    let sensors = simulationModel.filter((element) => element.type === "sensor" )
                                .map(element => new SoilSensor(10, element.position))
    
    
    for (const element of simulationModel) {
        if(element.type === "sprinkler" ){
            const sp1 = new Sprinkler(5,element.position);
            //TODO: do a real association
            sim.add(sp1, sensors);
        }
    }

    return sim;
}