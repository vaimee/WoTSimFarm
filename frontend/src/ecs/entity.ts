import Component from "./component";
type componentType<C> = { new(...args: unknown[]): C};

export default class Entity {
    private _components:Array<Component> = []
    
    protected constructor() {
        
    }

    public get components(): Component[] {
        return this._components
    }

    public addComponent(component: Component): void {
        this._components.push(component);
    }

    public removeComponent<C extends Component>(componentType: componentType<C>): void {
        this._components = this._components.filter(component => component instanceof componentType)
    }

    public getComponent<C extends Component>(componentType:componentType<C>): C | undefined {
        const found = this._components.find(component => component instanceof componentType);
        return found as C
    }

    public hasComponent<C extends Component>(componentType:componentType<C>): boolean {
        return this._components.includes((component:Component) => component instanceof componentType)
    }


}
