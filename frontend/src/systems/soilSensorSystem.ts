import { AbstractEntitySystem, AbstractEntity, Component, EntityListener } from '@trixt0r/ecs'
import ThingComponent from '../components/thingComponent'
import SoilSensorComponent from '../components/soilSensorComponent'

export default class SoilSensorSystem extends AbstractEntitySystem {
    
    constructor() {
        super(undefined,[ThingComponent,SoilSensorComponent])
    }
    
    async processEntity(entity: AbstractEntity<Component, EntityListener<Component>>, index?: number | undefined, entities?: AbstractEntity<Component, EntityListener<Component>>[] | undefined, options?: any): Promise<void> {
        const thing = entity.components.get(ThingComponent).webThing
        const sensor = entity.components.get(SoilSensorComponent)

        const temperature = await thing.readProperty("temperature")
        const moisture = await thing.readProperty("moisture")
        
        sensor.moisture = moisture;
        sensor.temperature = temperature;
        

    }
}