import Entity from "./entity";

class SystemEntity extends Entity {
    constructor() {
        super();
    }
}

export const Entities:Entity[] = [];

export default function createEntity(){
    const e = new SystemEntity();
    Entities.push(e)
    return e;
}

