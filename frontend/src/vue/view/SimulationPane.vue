<template>
    <div style="width:100%; height:100%">
         <canvas id="renderCanvas"></canvas>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, Mesh, MeshBuilder, SceneLoader, ParticleHelper, ParticleSystem, Texture, ConeParticleEmitter, PointParticleEmitter, GPUParticleSystem, TransformNode } from 'babylonjs';
    import {OBJFileLoader} from 'babylonjs-loaders';
    import loadSimulation from "../../simulation";
    import SkyMaterial from '../../materials/skymaterial';
    import { lightFragment } from 'babylonjs/Shaders/ShadersInclude/lightFragment';
    import { WoTLoadingScreen } from '../../loading';

    SceneLoader.RegisterPlugin(new OBJFileLoader()) //register the file loader
    @Component
    export default class SimulationPane extends Vue {
        code : string = "" ;
        codeEnabled : boolean = true;
        private scene : Scene | null = null;
        private engine : Engine | null = null;

        private createScene(engine : Engine) : Scene {
            var scene: Scene = new Scene(engine);
            scene.createDefaultCameraOrLight();
            scene.useRightHandedSystem = true;
            SceneLoader.ShowLoadingScreen = false;
            SceneLoader.Append("./assets/farm/", "farm_cliff.obj", scene, async function(scene) {
            scene.createDefaultCameraOrLight(true, true, true);
                
            if (scene.getMeshByName("cliff_Plane.001")){
                    scene.getMeshByName("cliff_Plane.001")!.checkCollisions = true;
                }
            
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
                cam.collisionRadius = new Vector3(5, 5, 5)
                scene.useRightHandedSystem = true;
                setInterval(()=> simulationEngine.run(),1000)
                engine.hideLoadingUI();
            })
            return scene;
        }
        mounted() {
            var canvas: any = document.getElementById("renderCanvas");
            this.engine = new Engine(canvas, true,{ stencil: true });
            this.engine.loadingScreen = new WoTLoadingScreen(document.getElementById("splash"));
            this.engine.displayLoadingUI();
            //problem with flex resize
            window.addEventListener("resize", () => this.engine!.resize()); 
            this.scene = this.createScene(this.engine);
            this.engine.runRenderLoop(() => this.scene!.render())
        }
    }
</script>

<style scoped>
#renderCanvas {
    width: 100%;
    height: 100%;
    touch-action: none;
}
</style>