import BaseView from "../../../core_wq/view/base/BaseView";
import LayerMgr from "../../../core_wq/layer/LayerMgr";
import { ui } from "../../../ui/layaMaxUI";
import HallControl from "../../hall/HallControl";
import HeroConfigVO from "../../../core_wq/db/vo/HeroConfigVO";
import MathUtil from "../../../core_wq/utils/MathUtil";
import ShareMgr from "../../../core_wq/msg/ShareMgr";
import MsgMgr from "../../../core_wq/msg/MsgMgr";

/**
 * 金币不足界面
 */
export default class GoldNotEnoughView extends BaseView {

    private _gold: number = 0;

    constructor() {
        super(LayerMgr.Ins.subFrameLayer, ui.moduleView.common.GoldNotEnoughViewUI);
    }

    public initUI(): void {
        super.initUI();
        let vo: HeroConfigVO = HallControl.Ins.Model.getPreNewHeroData(HallControl.Ins.Model.heroLevel);
        if (vo) {
            let price: number = HallControl.Ins.Model.getHeroBuyPrice(vo.buyPrice, HallControl.Ins.Model.queryBuyHeroRecordTop());
            this._gold = price * 5;
            this.ui.txt_price.text = MathUtil.unitConversion(this._gold);
        }
        let isAd = ShareMgr.Ins.isAdStage(12);
        if (isAd) {
            this.ui.txt_btn.text = "看视频领铜钱";
        } else {
            this.ui.txt_btn.text = "求助群友呀!";
        }
        this.ui.txt_lastTime.visible = !isAd;
        if (this.ui.txt_lastTime.visible) {
            this.ui.txt_lastTime.text = "今天剩余" + ShareMgr.Ins.getShareTimes(12) + "次";
        }
    }

    public addEvents(): void {
        this.ui.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
    }

    public removeEvents(): void {
        this.ui.btn_get.off(Laya.Event.CLICK, this, this.onGetReward);
    }

    private onGetReward(): void {
        ShareMgr.Ins.showShareOrAdv((res: any) => {
            MsgMgr.Ins.showMsg("您获得铜钱：" + Number(this.ui.txt_price.text));
            HallControl.Ins.updateGold(this._gold, false);
        }, 12, false, true);
    }
}