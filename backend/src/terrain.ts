import { Vec3, parametrizedSech, SechParameters } from "./utils/equations";
import Position from "./position";
//TODO: depth is not well simulated
// the function should move the water in depth every time it dissipate
export default class Terrain {
    private waterContent: number;
    
    private equations:((input:Vec3)=>number)[];
    private parameters:SechParameters[];
    private cache:Map<number,SechParameters>;
    
    constructor() {
        this.waterContent = 0;
        this.equations = [];
        this.parameters = [];
        this.cache = new Map()
    }
    
    public probeMoisture(position:Position) : number {
        if(this.waterContent === 0){
            return 0;
        }

        let result = 0;
        for (const equation of this.equations) {
            result+= Math.max(equation(position),0)
        }
        return Math.min(result/1000,100)
    }
    
    public poorWater(milliliters:number,position?:Position,range?:number) {
        this.waterContent+= milliliters
        
        let _range = range || 100
        _range = position ? 1 : range;

        if (this.cache.has(positionToMapKey(position))){
            const p = this.cache.get(positionToMapKey(position))
            p.peak += milliliters;
            //TODO: should we update also the range?
            return;
        }

        const params = {
            center: position,
            range: range || 100,
            peak: milliliters
        }
        
        this.equations.push( input =>{
            return parametrizedSech(input,params)
        })
        
        this.parameters.push(params)
        this.cache.set(positionToMapKey(position),params)
    }
    
    public consumeWater(milliliters:number):number{
        const diff= this.waterContent - milliliters
        this.waterContent-=milliliters
        this.waterContent = Math.max(this.waterContent,0)
        
        if(this.waterContent <=0){
            // no water all the equations are less than 0
            this.parameters = []
            this.equations = []
            this.cache = new Map()
        }

        for (const param of this.parameters) {
            const amount = milliliters/this.parameters.length
            param.peak -= amount
        }

        return Math.max(diff,0);
    }

    public spread(velocity:number){
        for (const param of this.parameters) {
            param.range += velocity
            param.peak /= velocity
        }
    }
}

function positionToMapKey(position:Position):number {
    if(!position){
        return Number.POSITIVE_INFINITY;
    }
    const x = position.x ?? 0
    const y = position.y ?? 0
    const z = position.z ?? 0
    return 2**x * 3**y * 5**z;
}