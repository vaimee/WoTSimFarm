import * as BABYLON from "babylonjs"
import { Scene, ShaderMaterial, Vector3 } from "babylonjs"
import vertex from "./shaders/sky_vertex";
import fragment from "./shaders/sky_fragment";
export default class SkyMaterial extends ShaderMaterial {
    private _sunPosition: BABYLON.Vector3 = Vector3.Zero();
    
    constructor(scene:Scene) {
        
        super("skybox", scene, {
            vertexSource: vertex,
            fragmentSource: fragment
            },
            {
                uniforms: ["sunPosition", "worldViewProjection", "worldView", "world", "cameraPosition"]
            })
        
        this.backFaceCulling = false;
        this.sunPosition = new Vector3(0, 1, 0);
        this.onBind = () => {
            let cameraPosition = Vector3.Zero();
            const cameraWorldMatrix = scene.activeCamera?.getWorldMatrix();
            if (cameraWorldMatrix) {
                cameraPosition.x = cameraWorldMatrix.m[12];
                cameraPosition.y = cameraWorldMatrix.m[13];
                cameraPosition.z = cameraWorldMatrix.m[14];
                this.setVector3("cameraPosition", cameraPosition);
            }

        }
    }

    public set sunPosition(value:Vector3){
        this.setVector3("sunPosition", value);
        this._sunPosition = value;
    }

    
    public get sunPosition() : Vector3 {
        return this._sunPosition;
    }
    


}
