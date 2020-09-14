import { Component } from "@trixt0r/ecs";
import { Vector3 } from "babylonjs";

export class Position implements Component {
    constructor(public vector:Vector3) {
        
    }
}