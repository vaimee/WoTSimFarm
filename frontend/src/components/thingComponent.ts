import {Component} from "@trixt0r/ecs"
import WoT from "wot-typescript-definitions"

export default class ThingComponent implements Component{
    constructor(public webThing:WoT.ConsumedThing) {
        
    }
}