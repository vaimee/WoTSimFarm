import { Component } from "@trixt0r/ecs";
import { Vector3 } from "babylonjs";

export class WaterSpring implements Component {
    //TODO: introduce a direction
    /**
     * 
     * @param position 
     */
    constructor(public position:Vector3) {

    }
}