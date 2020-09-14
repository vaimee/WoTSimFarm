import {Component} from "@trixt0r/ecs";

export default class SoilSensorComponent implements Component {
    constructor(public moisture:number,public temperature:number) {
        
    }
}