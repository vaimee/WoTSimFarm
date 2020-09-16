import { AbstractEntitySystem, AbstractEntity, Component, EntityListener } from '@trixt0r/ecs'
import ThingComponent from '../components/thingComponent'
import SoilSensorComponent from '../components/soilSensorComponent'
import SprinklerComponent from '../components/sprinklerComponent'
import MeshComponent from '../components/mesh'
import { VertexBuffer } from 'babylonjs'

export default class WateringSystem extends AbstractEntitySystem {

    constructor() {
        super(undefined, [SprinklerComponent,MeshComponent])
    }

    async processEntity(entity: AbstractEntity<Component, EntityListener<Component>>, index?: number | undefined, entities?: AbstractEntity<Component, EntityListener<Component>>[] | undefined, options?: any): Promise<void> {
        const sprinkler = entity.components.get(SprinklerComponent)
        if(sprinkler.isActive){
            //TODO: start particles
            const mesh = entity.components.get(MeshComponent).mesh
            const data = mesh.getVerticesData(VertexBuffer.PositionKind)?.length
            const vertices = data ? data/3 : 0
            console.log(vertices)
            var colors = new Array(4 * vertices);
            colors = colors.fill(1);
            for (var i = 0; i < 4; i++) {
                console.log(colors.length,i);
                
                colors[4 * i++] = 1; // red
                colors[4 * i++] = 0; // green
                colors[4 * i++] = 0; // blue
                colors[4 * i++] = 1; // alpha
                console.log(colors.length, i);

            }
            mesh.setVerticesData(VertexBuffer.ColorKind,colors);
        }
    }
}