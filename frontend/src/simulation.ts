import { Engine, Component } from "@trixt0r/ecs";
import SoilSensorSystem from "./systems/soilSensorSystem";
import ThingComponent from "./components/thingComponent";
import SoilSensorComponent from "./components/soilSensorComponent";
import FarmEntity from "./entity";
import MeshComponent from "./components/mesh";
import { MeshBuilder, Scene, Vector3, Color3, Color4, SceneLoader, Mesh, Vector4 } from "babylonjs";
import { Position } from "./components/position";
import MeshSystem from "./systems/meshSystem";
import SprinklerComponent from "./components/sprinklerComponent";
import SelectionSystem from "./systems/selectionSystem";
import SprinklerSystem from "./systems/sprinklerSystem";
import WateringSystem from "./systems/wateringSystem";
import UIInfoSystem from "./systems/UIInfoSystem";
import { WaterSpring } from "./components/waterSpringComponet";

async function discover(runtime:any) {
    const addr = !process.env.BACKEND_ADD ? "http://localhost:8000/" : process.env.BACKEND_ADD
    console.info("Fetching", process.env.BACKEND_ADD)
    
    const response = await fetch(addr)
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

    console.log(thingsIds);
    
    
    for (const selectedThing of things) {
        const selectedTD = await (await fetch(selectedThing)).json()
        const selectedConsumed = await runtime.consume(selectedTD);
        
        result.push(selectedConsumed);
    }

    return result;
}

export default async function loadSimulation(scene:Scene): Promise<Engine> {
    
    var servient = new Wot.Core.Servient({ clientOnly: true });
    servient.addClientFactory(new Wot.Http.HttpClientFactory());
    
    const engine = new Engine();
    engine.systems.add(new SoilSensorSystem())
    engine.systems.add(new MeshSystem(scene))
    engine.systems.add(new SelectionSystem(scene))
    engine.systems.add(new SprinklerSystem())
    engine.systems.add(new WateringSystem(scene))
    engine.systems.add(new UIInfoSystem())

    const runtime =  await servient.start();

    const things = await discover(runtime);
    console.log(things.length);
    
    for (const thing of things) {
        const e = new FarmEntity();
        engine.entities.add(e);
        const components = await _componentFactory(thing,scene);
        e.components.add(...components)
    }

    return engine;
}

export async function _componentFactory(thing:WoT.ConsumedThing,scene:Scene):Promise<Component[]> {
    const result:Component[] = []
    const td = thing.getThingDescription();
    
    result.push(new ThingComponent(thing))
    const meshLink = td.links.find((link: any) => link.rel === "model")?.href;

    if (td["@type"].includes("sosa:Sensor")) {
        result.push(new SoilSensorComponent(0, 0));
        
        const data = await SceneLoader.ImportMeshAsync("", meshLink, "",scene)

        result.push(new MeshComponent(data.meshes[0] as Mesh));
        result.push(new Position(new Vector3(td.position.x, td.position.z, -td.position.y)))
    } else {
        result.push(new SprinklerComponent(false));
        const data = await SceneLoader.ImportMeshAsync("", meshLink, "", scene)
        result.push(new MeshComponent(data.meshes[0] as Mesh))

        result.push(new Position(new Vector3(td.position.x, td.position.z, -td.position.y)))
        result.push(new WaterSpring(new Vector3(td.position.x,td.position.z + 1.7,-td.position.y + 0.55)))
    }
    return result;
}