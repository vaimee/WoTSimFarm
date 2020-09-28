import {EventEmitter} from 'events'
import Position from "./position";
let ids = 0;
export default class SoilSensor extends EventEmitter {
    private _id: string;
    private _moisture: number;
    private _temperature: number;
    private tooDryTH: number;

    constructor(tooDryThreshHold: number,public position:Position) {
        super();
        this._id = ""+ids++;
        this.tooDryTH = tooDryThreshHold;
        this.moisture = 0;
        this.temperature = 0;
    }

    public get id(): string {
        return this._id;
    }

    public set moisture(v: number) {
        if (this._moisture - v < this.tooDryTH) {
            this.emit("tooDry")
        }

        if(this.moisture + v < 0 ){
            this._moisture = 0;
            return;
        }else if(this.moisture + v > 100){
            this._moisture = 100;
            return;
        }

        this._moisture = v;
        
        
    }

    public get moisture(): number {
        return this._moisture
    }

    public set temperature(v: number) {
        this._temperature = v;
    }

    public get temperature(): number {
        return this._temperature;
    }

}