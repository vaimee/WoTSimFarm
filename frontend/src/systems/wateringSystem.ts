import { AbstractEntitySystem, AbstractEntity, Component, EntityListener } from '@trixt0r/ecs'
import ThingComponent from '../components/thingComponent'
import SoilSensorComponent from '../components/soilSensorComponent'
import SprinklerComponent from '../components/sprinklerComponent'
import MeshComponent from '../components/mesh'
import { ConeParticleEmitter, GPUParticleSystem, ParticleSystem, Scene, Texture, TransformNode, Vector3, VertexBuffer } from 'babylonjs'
import { Position } from '../components/position'
import { WaterSpring } from '../components/waterSpringComponet'
import { ParticleSysComponent } from '../components/particleSysComponent'

export default class WateringSystem extends AbstractEntitySystem {
    private _scene: Scene

    constructor(scene:Scene) {
        super(undefined, [SprinklerComponent,WaterSpring])
        this._scene = scene;
    }

    async processEntity(entity: AbstractEntity<Component, EntityListener<Component>>, index?: number | undefined, entities?: AbstractEntity<Component, EntityListener<Component>>[] | undefined, options?: any): Promise<void> {
        
        const sprinkler = entity.components.get(SprinklerComponent)
        const spring = entity.components.get(WaterSpring)
       
        
        if(sprinkler.isActive){
            console.log("Active!");
            let system = entity.components.get(ParticleSysComponent);
            
            if(!system){
                system = this.createSpring(spring);
                entity.components.add(system);
                system.particles.start();
            }
            !system.isActive && system.particles.start();
        }else{
            let system = entity.components.get(ParticleSysComponent);
            system && system.isActive && system.particles.stop() && system.particles.dispose();
        }
    }

    createSpring(data:WaterSpring){

        const watering = new GPUParticleSystem("watering",{capacity:2000}, this._scene);

        watering.particleTexture = new Texture("assets/systems/flare.png", this._scene); 1
        watering.textureMask = new BABYLON.Color4(1.0, 1.0, 1.0, 1.0);

        const type = new ConeParticleEmitter(1, 30)

        type.emitFromSpawnPointOnly = true;
        var emitter = new TransformNode("", this._scene);
        //emitter.position = new Vector3(9.8, 10, 9.3)
        emitter.position = data.position;

        emitter.rotation.x = -2.0;
        watering.particleEmitterType = type;
        //@ts-ignore 
        watering.emitter = emitter
        watering.addVelocityGradient(0, 10);
        watering.addVelocityGradient(1, 0);



        watering.minSize = 0.01;
        watering.maxSize = 0.5;

        watering.minLifeTime = 0.1;
        watering.maxLifeTime = 1;

        watering.emitRate = 2000;
        watering.color1 = new BABYLON.Color4(0.36, 0.58, 1);
        watering.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
        watering.gravity = new Vector3(0, -2, 0);

        return new ParticleSysComponent(watering);
    }
}