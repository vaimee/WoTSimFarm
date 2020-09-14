import { Component } from "@trixt0r/ecs";
import { Mesh } from "babylonjs";

export default class MeshComponent implements Component {
    constructor(public mesh: Mesh) {
        
    }
}