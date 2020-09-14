import { AbstractEntitySystem, AbstractEntity, Component, EntityListener } from "@trixt0r/ecs";
import MeshComponent from "../components/mesh";
import { Position } from "../components/position";
import { Scene } from "babylonjs";

export default class MeshSystem extends AbstractEntitySystem {
    constructor(public scene:Scene) {
        super(undefined,[MeshComponent,Position])
    }

    onAddedComponents?(entity: AbstractEntity, ...components: Component[]): void {
        // TODO: optimization use components parameter
        const meshComponent = entity.components.get(MeshComponent)
        const position = entity.components.get(Position)
        meshComponent.mesh.position = position.vector
        this.scene.addMesh(meshComponent.mesh)
    }

    processEntity(entity: AbstractEntity<Component, EntityListener<Component>>, index?: number | undefined, entities?: import("@trixt0r/ecs").AbstractEntity<import("@trixt0r/ecs").Component, import("@trixt0r/ecs").EntityListener<import("@trixt0r/ecs").Component>>[] | undefined, options?: any): void {
        const position = entity.components.get(Position)
        const meshComponent = entity.components.get(MeshComponent)
        meshComponent.mesh.position = position.vector;
    }
}