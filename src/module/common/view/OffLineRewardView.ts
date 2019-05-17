import BaseView from "../../../core_wq/view/base/BaseView";
import LayerMgr from "../../../core_wq/layer/LayerMgr";
import { ui } from "../../../ui/layaMaxUI";
import MathUtil from "../../../core_wq/utils/MathUtil";
import ShareMgr from "../../../core_wq/msg/ShareMgr";
import MsgMgr from "../../../core_wq/msg/MsgMgr";
import HallControl from "../../hall/HallControl";

/**
 * 离线奖励界面
 */
export default class OffLineRewardView extends BaseView {

    private _gold: number = 0;

    constructor() {
        super(LayerMgr.Ins.subFrameLayer, ui.moduleView.common.OffLineRewardViewUI);
    }

    public initData(): void {
        super.initData();
        this._gold = this.datas[0];
        this.ui.txt_gold.text = MathUtil.unitConversion(this._gold);
    }

    public addEvents(): void {
        this.ui.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
    }

    public removeEvents(): void {
        this.ui.btn_get.off(Laya.Event.CLICK, this, this.onGetReward);
    }

    private onGetReward(): void {
        ShareMgr.Ins.showShareOrAdv(() => {
            MsgMgr.Ins.showMsg("您获得铜钱：" + MathUtil.unitConversion(this._gold));
            HallControl.Ins.updateGold(this._gold, false);
        }, 1)
    }
}