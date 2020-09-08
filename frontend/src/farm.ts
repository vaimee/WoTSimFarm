
import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, Mesh, MeshBuilder, SceneLoader } from 'babylonjs';
import {OBJFileLoader} from 'babylonjs-loaders';
import * as sim from "./simulation";
import("@node-wot/browser-bundle").then(sim.default);


SceneLoader.RegisterPlugin(new OBJFileLoader())

var canvas: any = document.getElementById("renderCanvas");
var engine: Engine = new Engine(canvas, true);


function createScene(): Scene {
    var scene: Scene = new Scene(engine);
    scene.createDefaultCameraOrLight();
    var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
    
    camera.wheelDeltaPercentage = 0.01;
    camera.attachControl(canvas, true);
    

    SceneLoader.Append("./assets/farm/", "Farm.obj", scene, function(scene) {
        console.log("here")
        // Create a default arc rotate camera and light.
        scene.createDefaultCameraOrLight(true, true, true);
    })
    
    return scene;
}

var scene: Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});
