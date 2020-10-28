import { Component } from "@trixt0r/ecs";
import { GPUParticleSystem,  Vector3 } from "babylonjs";

export class ParticleSysComponent implements Component {
    private _isActive = false;
    constructor(public particles:GPUParticleSystem) {
        const old_stop = particles.stop.bind(particles)
        const old_start = particles.start.bind(particles)
        
        particles.stop = ((component:ParticleSysComponent) => {
            component._isActive = false;
            old_stop()
        }).bind(particles,this)

        particles.start = ((component: ParticleSysComponent) => {
            component._isActive = true;
            old_start()
        }).bind(particles, this)
    }

    get isActive(){
        return this._isActive
    }
}