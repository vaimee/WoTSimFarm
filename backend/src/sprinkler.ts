import Position from './position'
export default class Sprinkler {
    private _litersPerSecond: number;
    private active: boolean;
    
    constructor(litersPerSecond:number,public position:Position) {
        this._litersPerSecond = litersPerSecond;
        this.active = false;
    }
    
    public get waterPerSecond() : number {
        return this._litersPerSecond;
    }
    
    public get isActive() : boolean {
        return this.active
    }

    /**
     * activate
     */
    public activate() {
        this.active = true;
    }
    
    /**
     * stop
     */
    public stop() {
        this.active = false;
    }
}