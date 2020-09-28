import { System, AbstractEntitySystem, AbstractEntity, Component, EntityListener } from "@trixt0r/ecs";
import { Scene, InterpolateValueAction, ActionManager, Vector3, ExecuteCodeAction, Color3 } from "babylonjs";
import MeshComponent from "../components/mesh";
import {Selection} from "../components/selectionComponent"

export default class SelectionSystem extends AbstractEntitySystem {
    private previousSelectedEntity: AbstractEntity | undefined = undefined;

    constructor(private scene:Scene) {
        super(undefined,[MeshComponent])        
    }

    onAddedComponents?(entity: AbstractEntity,...components: Component[]){
        
        const meshComp = entity.components.get(MeshComponent)
        meshComp.mesh.actionManager = new ActionManager(this.scene)
        meshComp.mesh.actionManager?.registerAction(new InterpolateValueAction(
            ActionManager.OnPointerOverTrigger,
            meshComp.mesh,
            'scaling',
            new Vector3(1.3,1.3,1.3),
            200
        ))
        meshComp.mesh.actionManager?.registerAction(new InterpolateValueAction(
            ActionManager.OnPointerOutTrigger,
            meshComp.mesh,
            'scaling',
            new Vector3(1,1,1),
            200
        ))
        meshComp.mesh.actionManager?.registerAction(new ExecuteCodeAction(
            ActionManager.OnPickDownTrigger,
            ()=>{ 
                
                if(this.previousSelectedEntity){
                    let r = this.previousSelectedEntity.components.remove(this.previousSelectedEntity.components.get(Selection))
                    
                    if(this.previousSelectedEntity.id === entity.id){ 
                        this.previousSelectedEntity = undefined;
                        return
                    };
                }

                entity.components.add(new Selection())
                this.previousSelectedEntity = entity;
            } 
        ))
      
    }
    
    processEntity(entity: AbstractEntity<Component, EntityListener<Component>>, index?: number | undefined, entities?: import("@trixt0r/ecs").AbstractEntity<import("@trixt0r/ecs").Component, import("@trixt0r/ecs").EntityListener<import("@trixt0r/ecs").Component>>[] | undefined, options?: any): void {

        
    }
}