import { Component } from "@trixt0r/ecs";
import { ParticleSystem, Vector3 } from "babylonjs";

export class ParticleSysComponent implements Component {
    constructor(public particles:ParticleSystem) {

    }

    get isActive(){
        return this.particles.isStarted() && this.particles.isAlive();
    }
}