import { AbstractEntity } from "@trixt0r/ecs";

let ids = 0;

export default class FarmEntity extends AbstractEntity{
    constructor() {
        super(ids++)
    }
}