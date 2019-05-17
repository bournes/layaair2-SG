import BaseView from "../../../core_wq/view/base/BaseView";
import LayerMgr from "../../../core_wq/layer/LayerMgr";
import { ui } from "../../../ui/layaMaxUI";
import ViewMgr from "../../../core_wq/view/ViewMgr";
import ViewConst from "../../../core_wq/view/const/ViewConst";
import HttpMgr from "../../../core_wq/net/HttpMgr";

export default class FollowView extends BaseView {

    constructor() {
        super(LayerMgr.Ins.frameLayer, ui.moduleView.follow.FollowViewUI);
    }

    public initUI(): void {
        super.initUI();
    }

    public addEvents(): void {
        this.ui.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
        this.ui.btn_close.on(Laya.Event.CLICK, this, this.onCloseHandler);
    }

    public removeEvents(): void {
        this.ui.btn_get.off(Laya.Event.CLICK, this, this.onGetReward);
        this.ui.btn_close.off(Laya.Event.CLICK, this, this.onCloseHandler);
    }

    private onGetReward(): void {
        HttpMgr.Ins.requestAccountRewardPrize();
    }

    private onCloseHandler(): void {
        ViewMgr.Ins.close(ViewConst.FollowView);
    }
}