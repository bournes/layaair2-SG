export default class PoolMgr {

    private _instances: any;

    constructor() {
        this._instances = {};
    }

    public get(classDefinition: any, name?: string): any {
        if (!name) {
            name = classDefinition.__className;
        }
        let instances: any[] = this._instances[name];
        if (!instances) {
            instances = [];
            this._instances[name] = instances;
        }

        if (instances.length > 0) {
            return instances.pop();
        }

        return new classDefinition();
    }

    public return(instance: any, name?: string): any {
        if (!name) {
            name = instance.__proto__.__className;
        }
        let instances: any[] = this._instances[name];
        if (!instances) {
            instances = [];
            this._instances[name] = instances;
        }
        instances.push(instance);
        return instance;
    }


    private static _instance: PoolMgr;
    public static get Ins(): PoolMgr {
        if (PoolMgr._instance == null) {
            PoolMgr._instance = new PoolMgr();
        }
        return PoolMgr._instance;
    }
}