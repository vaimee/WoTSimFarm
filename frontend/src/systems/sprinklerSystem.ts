import { AbstractEntitySystem, AbstractEntity, Component, EntityListener } from '@trixt0r/ecs'
import ThingComponent from '../components/thingComponent'
import SoilSensorComponent from '../components/soilSensorComponent'
import SprinklerComponent from '../components/sprinklerComponent'

export default class SoilSensorSystem extends AbstractEntitySystem {

    constructor() {
        super(undefined, [ThingComponent, SprinklerComponent])
    }

    async processEntity(entity: AbstractEntity<Component, EntityListener<Component>>, index?: number | undefined, entities?: AbstractEntity<Component, EntityListener<Component>>[] | undefined, options?: any): Promise<void> {
        const thing = entity.components.get(ThingComponent).webThing
        const sprinkler = entity.components.get(SprinklerComponent)

        const status = await thing.readProperty("status")
        sprinkler.isActive = status === "on"
    }
}