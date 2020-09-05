import sensorModel from './tds/sensor.td.json'
import sprinklerModel from './tds/sprinkler.td.json'
import SoilSensor from './soilSensor'
import Sprinkler from './sprinkler';
import Simulation from './simulation';



const sim = createSimulation()

sim.getSimObjects().forEach(async (sensors,sprinkler)=>{
    for (const sensor of sensors) {
        
        const copySensorModel = Object.assign({},sensorModel)
        copySensorModel.title = sensorModel.title + sensor.id;
        const sensorThing = await WoT.produce(copySensorModel);

        bindSoilSensor(sensor,sensorThing);
        
        await sensorThing.expose();
    }

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
}

function createSimulation() {
    let sensors = []
    for (let i = 0; i < 5; i++) {
        sensors.push(new SoilSensor(10))
    }
   
    const sp1 = new Sprinkler(5);
    
    const sim = new Simulation();
    sim.add(sp1,sensors);

    return sim;
}