import { AbstractEntitySystem, AbstractEntity, Component, EntityListener } from "@trixt0r/ecs";
import MeshComponent from "../components/mesh";
import { Position } from "../components/position";
import {Selection} from "../components/selectionComponent"
import { Scene, HighlightLayer, Color3 } from "babylonjs";

export default class MeshSystem extends AbstractEntitySystem {
    private highLight: HighlightLayer;
    
    constructor(public scene:Scene) {
        super(undefined, [MeshComponent, Position], undefined, [MeshComponent,Selection])
        this.highLight = new HighlightLayer("selection",scene)
    }

    onAddedComponents?(entity: AbstractEntity, ...components: Component[]): void {
      /*  // TODO: optimization use components parameter
        const meshComponent = entity.components.get(MeshComponent)
        const position = entity.components.get(Position)
        meshComponent.mesh.position = position.vector
        //Actually meshes are added automatically during their creation
        // this.scene.addMesh(meshComponent.mesh)*/
        
        const selection = components.find(c => c instanceof Selection)
        if(selection){
            const mesh = entity.components.get(MeshComponent).mesh
            this.highLight.addMesh(mesh,Color3.Yellow())
            
        }
    }
    onRemovedComponents?(entity: AbstractEntity, ...components: Component[]): void {
      /*  // TODO: optimization use components parameter
        const meshComponent = entity.components.get(MeshComponent)
        const position = entity.components.get(Position)
        meshComponent.mesh.position = position.vector
        //Actually meshes are added automatically during their creation
        // this.scene.addMesh(meshComponent.mesh)*/
        const selection = components.find(c => c instanceof Selection)
        if (selection) {
            const mesh = entity.components.get(MeshComponent).mesh
            this.highLight.removeMesh(mesh)
        }
    }

    processEntity(entity: AbstractEntity<Component, EntityListener<Component>>, index?: number | undefined, entities?: import("@trixt0r/ecs").AbstractEntity<import("@trixt0r/ecs").Component, import("@trixt0r/ecs").EntityListener<import("@trixt0r/ecs").Component>>[] | undefined, options?: any): void {
        const position = entity.components.get(Position)
        const meshComponent = entity.components.get(MeshComponent)
        meshComponent.mesh.position = position.vector;
    }
}