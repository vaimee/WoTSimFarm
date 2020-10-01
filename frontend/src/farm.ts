
import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, Mesh, MeshBuilder, SceneLoader, ParticleHelper, ParticleSystem, Texture, ConeParticleEmitter, PointParticleEmitter, GPUParticleSystem, TransformNode } from 'babylonjs';
import {OBJFileLoader} from 'babylonjs-loaders';
import loadSimulation from "./simulation";
import SkyMaterial from './materials/skymaterial';
import { lightFragment } from 'babylonjs/Shaders/ShadersInclude/lightFragment';
import { WoTLoadingScreen } from './loading';


document.onkeypress = function (e) {
    e = e || window.event;
    // use e.keyCode
    if(e.key === "s"){
        const w = document.querySelector("#w");
        const o = document.querySelector("#oLetter");
        const t = document.querySelector("#t");
        w?.classList.toggle("pop")
        o?.classList.toggle("pop")
        t?.classList.toggle("pop")
    }
    if (e.key === "l") {
        const right = document.querySelector("#right");
        const left = document.querySelector("#left"); 
        right?.classList.toggle("slideRight")
        left?.classList.toggle("slideLeft")
    }

    if (e.key === "e") {
        const right = document.querySelector("#right");
        const left = document.querySelector("#left");
        const o = document.querySelector("#oLetter");
        o?.classList.add("full")
        o?.classList.remove("pop","letter")
        right?.addEventListener("animationiteration",()=>{
            right?.classList.toggle("endRight")
            o?.classList.toggle("spin")
        },{once:true});
        left?.addEventListener("animationiteration",()=>{
            left?.classList.toggle("endLeft")
        },{once:true});
        
        
    }


};


SceneLoader.RegisterPlugin(new OBJFileLoader())

var canvas: any = document.getElementById("renderCanvas");
var engine: Engine = new Engine(canvas, true,{ stencil: true });
engine.loadingScreen = new WoTLoadingScreen(document.getElementById("splash"))
engine.displayLoadingUI();

function createScene(): Scene {
    var scene: Scene = new Scene(engine);
    scene.createDefaultCameraOrLight();
    scene.useRightHandedSystem = true;
    SceneLoader.ShowLoadingScreen = false;
    SceneLoader.Append("./assets/farm/", "farm_cliff.obj", scene, async function(scene) {
       scene.createDefaultCameraOrLight(true, true, true);
        const simulationEngine = await loadSimulation(scene)
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
        setInterval(()=> simulationEngine.run(),1000)
        engine.hideLoadingUI();
    })
    
    return scene;
}

window.addEventListener("resize", function () { engine.resize(); });
var scene: Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});
