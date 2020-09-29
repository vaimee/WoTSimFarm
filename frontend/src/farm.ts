
import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, Mesh, MeshBuilder, SceneLoader, ParticleHelper, ParticleSystem, Texture, ConeParticleEmitter, PointParticleEmitter, GPUParticleSystem, TransformNode } from 'babylonjs';
import {OBJFileLoader} from 'babylonjs-loaders';
import loadSimulation from "./simulation";
import SkyMaterial from './materials/skymaterial';
import { lightFragment } from 'babylonjs/Shaders/ShadersInclude/lightFragment';




SceneLoader.RegisterPlugin(new OBJFileLoader())

var canvas: any = document.getElementById("renderCanvas");
var engine: Engine = new Engine(canvas, true,{ stencil: true });


function createScene(): Scene {
    var scene: Scene = new Scene(engine);
    scene.createDefaultCameraOrLight();
    scene.useRightHandedSystem = true;
    SceneLoader.Append("./assets/farm/", "farm_cliff.obj", scene, async function(scene) {
       scene.createDefaultCameraOrLight(true, true, true);
        const engine = await loadSimulation(scene)
        const box = MeshBuilder.CreateBox("skyBox", {size:1000 }, scene);
        box.position.y -= 100;
        scene.ambientColor = new BABYLON.Color3(0.3, 0.3, .3);
        const sky = new SkyMaterial(scene);
        box.material = sky;

        const cam = scene.cameras[0] as ArcRotateCamera
        cam.wheelDeltaPercentage = 0.01;
        cam.upperRadiusLimit = 200;
        cam.checkCollisions = true;
        scene.useRightHandedSystem = true;
        setInterval(()=> engine.run(),1000)
    })
    
    return scene;
}

window.addEventListener("resize", function () { engine.resize(); });
var scene: Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});
