import { AbstractEntitySystem, AbstractEntity, Component, EntityListener, Engine } from '@trixt0r/ecs'
import { Rectangle, StackPanel, TextBlock, Image, Control, AdvancedDynamicTexture, Container } from "babylonjs-gui";
import { ThingDescription } from 'wot-typescript-definitions';
import MeshComponent from '../components/mesh';
import ThingComponent from '../components/thingComponent';
import {Selection} from "../components/selectionComponent";
import { reflectionFunction } from 'babylonjs/Shaders/ShadersInclude/reflectionFunction';


export default class UISystem extends AbstractEntitySystem {
    private _ui: AdvancedDynamicTexture;
    private _info: Container | undefined;

    constructor() {
        super(undefined, [ThingComponent, MeshComponent], undefined, [ThingComponent,Selection] );
        this._ui = AdvancedDynamicTexture.CreateFullscreenUI("UI");
    }

    onAddedToEngine(engine:Engine){
        super.onAddedToEngine(engine);
        //TODO: pre load icons
    }

    onAddedComponents?(entity: AbstractEntity, ...components: Component[]): void {
        
        const selection = components.find(c => c instanceof Selection);
        console.log(selection);
        
        if (selection) { 
            
            
            const thing = entity.components.get(ThingComponent);
            const mesh = entity.components.get(MeshComponent).mesh;
            console.log(thing.webThing.getThingDescription());
           
            
           
            this._info = this.createTDInfoUI(thing.webThing.getThingDescription());
            this._ui.addControl(this._info);
            this._info.linkOffsetY = -110;
            this._info.linkWithMesh(mesh);
    
            this._info.isVisible = true;
           
            
        }
    }
    onRemovedComponents?(entity: AbstractEntity, ...components: Component[]): void {
        
        const selection = components.find(c => c instanceof Selection)
        if (selection && this._info) {
           this._ui.removeControl(this._info);
        }
    }
    async processEntity(entity: AbstractEntity<Component, EntityListener<Component>>, index?: number | undefined, entities?: AbstractEntity<Component, EntityListener<Component>>[] | undefined, options?: any): Promise<void> {
       
    }

    createTDInfoUI(td:ThingDescription){
        let rect = new Rectangle()
        rect.cornerRadius = 5;
        rect.background = "#00000070";
        rect.widthInPixels = 150;
        rect.height = 0.25;
        rect.thickness = 0;
        rect.isVisible = false;
        
        let main = new StackPanel()
        main.paddingTopInPixels = 10;

        let label = new TextBlock();
        label.text = td.title;
        label.resizeToFit = true;
        label.paddingBottomInPixels = 5;
        label.color = "white";

        main.addControl(label);

        let line = new Rectangle();
        line.width = 0.9;
        line.heightInPixels = 1;

        main.addControl(line);
        let last: Control = line;
        Object.keys(td.properties).forEach(key => {
            let name = td.properties[key].title ? td.properties[key].title : key;
            let affInfo = this.createAffordanceInfo(name, "wrench");
            affInfo.height = "40px";
            last = affInfo;
            main.addControl(affInfo)
        })

        Object.keys(td.actions).forEach(key => {
            let name = td.actions[key].title ? td.actions[key].title : key;
            let affInfo = this.createAffordanceInfo(name, "play");
            affInfo.height = "40px";
            last = affInfo;
            main.addControl(affInfo)
        })

        Object.keys(td.events).forEach(key => {
            let name = td.events[key].title ? td.events[key].title : key;
            let affInfo = this.createAffordanceInfo(name, "bolt");
            affInfo.height = "40px";
            last = affInfo;
            main.addControl(affInfo)
        })

        last.paddingBottomInPixels = 10;
        rect.onBeforeDrawObservable.addOnce(_ => rect.heightInPixels = main.heightInPixels)

        rect.addControl(main);
        return rect;
    }

    private createAffordanceInfo(name: string, iconName: string) {
        var panel = new StackPanel();
        panel.isVertical = false;


        let iconPromise = this.createIconControl(iconName);
        
        var aName = new TextBlock();
        aName.text = name
        aName.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_LEFT
        aName.resizeToFit = true;

        aName.color = "white";
        aName.paddingLeftInPixels = 7;

        iconPromise.then( icon => {
            panel.addControl(icon);
            panel.addControl(aName);
        })
      

        return panel;
    }

    createIconControl(iconName:string):Promise<Image>{
        return new Promise(resolve => {
            let icon = new Image("icon", "assets/iconset.svg#" + iconName);

            if (icon.svgAttributesComputationCompleted) {
                icon.width = String(icon.sourceWidth / 1.5) + "px";
                icon.height = String(icon.sourceHeight / 1.5) + "px";
                resolve(icon);
            } else {
                icon.onSVGAttributesComputedObservable.addOnce(function () {
                    icon.width = String(icon.sourceWidth / 1.5) + "px";
                    icon.height = String(icon.sourceHeight / 1.5) + "px";
                    resolve(icon);
                });
            }
        })
    }
}