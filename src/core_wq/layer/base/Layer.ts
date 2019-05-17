import ILayer from "./ILayer";
import EffectUtil from "../../utils/EffectUtil";

export default class Layer extends Laya.Sprite implements ILayer {

    public get layerId(): number {
        return this._layerId;
    }

    protected _layerId: number;
    constructor(layerId: number, $name: string = null) {
        super();
        this._layerId = layerId;
        this.mouseEnabled = true;
        this.mouseThrough = true;
        this.name = $name;
 
    }

    public getLayerId(): number {
        return 0;
    }
}