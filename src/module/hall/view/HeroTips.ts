import { ui } from "../../../ui/layaMaxUI";
import PointUtils from "../../../core_wq/utils/PointUtils";
import HeadItem from "./item/HeadItem";
import LayerMgr from "../../../core_wq/layer/LayerMgr";
import HeroConfigVO from "../../../core_wq/db/vo/HeroConfigVO";
import GlobalData from "../../../core_wq/db/GlobalData";
import BoneAnim from "../../../core_wq/bone/BoneAnim";
import PathConfig from "../../../core_wq/config/PathConfig";

export default class HeroTips extends ui.moduleView.hall.HeroTipsUI {

    private _data: HeadItem;
    private _bone: BoneAnim;

    constructor() { super(); }

    onEnable(): void {
        if (this._data) {
            // let pos: Laya.Point = PointUtils.localToGlobal(this._data);
            // this.pos(pos.x, pos.y);
            this.pos(this._data.x, this._data.y);
            if (this.x < 0) {
                this.x = 0;
            } else if (this.x > LayerMgr.stageDesignWidth) {
                this.x = LayerMgr.stageDesignWidth - this.width;
            }
            let config: HeroConfigVO = GlobalData.getData(GlobalData.HeroConfigVO, this._data.Info.heroId);
            if (config) {
                this.txt_name.text = config.name;
                this.txt_speed.text = config.speed + "";
                this.txt_secCoin.text = config.PerSecCoin + "";
                this.txt_sellPrice.text = config.sellPrice + "";
            }
            if (this._data && this._data.heroVO) {
                this._bone = new BoneAnim(this._data.heroVO.modelImgUrl, true, true);
                this.addChild(this._bone);
                this._bone.pos(174, 420);
            }
        }
    }

    public removeTips(): void {
        if (this._bone) this._bone.destroy();
        this.removeSelf();
    }

    set dataSource(value: any) {
        this._data = value;
    }
}