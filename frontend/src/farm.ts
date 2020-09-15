
import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, Mesh, MeshBuilder, SceneLoader } from 'babylonjs';
import {OBJFileLoader} from 'babylonjs-loaders';
import * as sim from "./simulation";



SceneLoader.RegisterPlugin(new OBJFileLoader())

var canvas: any = document.getElementById("renderCanvas");
var engine: Engine = new Engine(canvas, true);


function createScene(): Scene {
    var scene: Scene = new Scene(engine);
    scene.createDefaultCameraOrLight();
    SceneLoader.Append("./assets/farm/", "farm_cliff.obj", scene, function(scene) {
       scene.createDefaultCameraOrLight(true, true, true);
        sim.default(scene);
    const cam = scene.cameras[0] as ArcRotateCamera
        cam.wheelDeltaPercentage = 0.01;
    })
    
    return scene;
}

var scene: Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});
