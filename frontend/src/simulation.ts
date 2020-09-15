import { Engine } from "@trixt0r/ecs";
import SoilSensorSystem from "./systems/soilSensorSystem";
import ThingComponent from "./components/thingComponent";
import SoilSensorComponent from "./components/soilSensorComponent";
import FarmEntity from "./entity";
import MeshComponent from "./components/mesh";
import { MeshBuilder, Scene, Vector3, Color3, Color4 } from "babylonjs";
import { Position } from "./components/position";
import MeshSystem from "./systems/meshSystem";
import SprinklerComponent from "./components/sprinklerComponent";

async function discover(runtime:any) {
    const response = await fetch("http://localhost:8000/")
    let things = await response.json()
    let thingsIds: any = {}
    const result = [];

    things = things.filter((thingAddr: string) => {
        const url = new URL(thingAddr)
        const thingId: string = url.pathname
        if (!thingsIds[thingId] && (thingId.includes("SoilSensor") || thingId.includes("Sprinkler"))) {
            thingsIds[thingId] = true;
            return true;
        }
        return false;

    })
    
    for (const selectedThing of things) {
        const selectedTD = await (await fetch(selectedThing)).json()
        const selectedConsumed = await runtime.consume(selectedTD);
        
        result.push(selectedConsumed);
    }

    return result;
}

export default (scene:Scene) => {
    var servient = new Wot.Core.Servient({ clientOnly: true });
    servient.addClientFactory(new Wot.Http.HttpClientFactory());
    const engine = new Engine();
    engine.systems.add(new SoilSensorSystem())
    engine.systems.add(new MeshSystem(scene))
    
    servient.start().then(async (runtime: any) => {
        
        const things = await discover(runtime);
        for (const thing of things) {
            const thingComp = new ThingComponent(thing);
            
            let modelComponent;
            let meshComponent;
            let position;
            const td = thing.getThingDescription();

            if(td["@type"].includes("sosa:Sensor")){
                modelComponent = new SoilSensorComponent(0, 0);
                meshComponent = new MeshComponent(MeshBuilder.CreateBox("box", {}))
                
                position = new Position(new Vector3(td.position.x, td.position.z,-td.position.y))
            }else{
                modelComponent = new SprinklerComponent(false);
                
                const box = MeshBuilder.CreateBox("box", { faceColors: Array(6).fill(new Color4(0.2,0.59,0.85,1))})
                meshComponent = new MeshComponent(box)
               
                position = new Position(new Vector3(td.position.x, td.position.z, -td.position.y))
            }
            
           

            const e = new FarmEntity();

            e.components.add(thingComp,modelComponent,meshComponent,position)
            engine.entities.add(e);
        }

        await engine.run()
    })
}