import PlayerInfo from "./data/PlayerInfo";

export default class PlayerMgr extends Laya.Script {

    private _info: PlayerInfo;

    constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._info = new PlayerInfo();
    }

    set Info(value: PlayerInfo) { this._info = value; }
    get Info(): PlayerInfo { return this._info; }


    private static _instance: PlayerMgr;
    public static get Ins(): PlayerMgr {
        if (PlayerMgr._instance == null) {
            PlayerMgr._instance = new PlayerMgr();
        }
        return PlayerMgr._instance;
    }
}