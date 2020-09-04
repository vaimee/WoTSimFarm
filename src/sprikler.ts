export default class Sprinkler {
    private _litersPerSecond: number;
    private active: boolean;
    
    constructor(litersPerSecond:number) {
        this._litersPerSecond = litersPerSecond;
        this.active = false;
    }
    
    public get waterPerSecond() : number {
        return this._litersPerSecond;
    }
    
    public get isActive() : boolean {
        return this.active
    }
    
}