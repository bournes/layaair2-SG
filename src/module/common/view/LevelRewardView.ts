import BaseView from "../../../core_wq/view/base/BaseView";
import LayerMgr from "../../../core_wq/layer/LayerMgr";
import { ui } from "../../../ui/layaMaxUI";
import LevelVO from "../../../core_wq/db/vo/LevelVO";
import PlayerMgr from "../../../core_wq/player/PlayerMgr";
import MathUtil from "../../../core_wq/utils/MathUtil";
import HallControl from "../../hall/HallControl";
import EventsMgr from "../../../core_wq/event/EventsMgr";
import EventType from "../../../core_wq/event/EventType";
import ViewMgr from "../../../core_wq/view/ViewMgr";
import ViewConst from "../../../core_wq/view/const/ViewConst";
import ShareMgr from "../../../core_wq/msg/ShareMgr";
import SDKMgr from "../../../core_wq/msg/SDKMgr";
import HttpMgr from "../../../core_wq/net/HttpMgr";

/**
 * 等级礼包界面
 */
export default class LevelRewardView extends BaseView {

    private _levelVO: LevelVO;
    private _gold: number;
    private _isGetAllReward: boolean = false;

    constructor() {
        super(LayerMgr.Ins.subFrameLayer, ui.moduleView.common.LevelRewardViewUI);
    }

    public initData(): void {
        super.initData();
        this._levelVO = this.datas[0];
        if (this._levelVO) {

        }
    }

    private initView(): void {
        this._gold = Math.floor(this._levelVO.goldGift * PlayerMgr.Ins.Info.userIncomeSec);
        let diamond: number = Math.floor(this._levelVO.diamondsGift);
        let isAdvanced = diamond > 0;
        let shareItems = [];
        let isGetPrize: boolean = false; //是否已领取

        this.ui.txt_levelGift.text = this._levelVO.id + "";
        this.ui.txt_acc.text = Math.floor(this._levelVO.accSpeedTime) + "";
        this.ui.txt_gold.text = MathUtil.unitConversion(this._gold);
        this.ui.txt_diamond.text = Math.floor(this._levelVO.diamondsGift) + "";

        this.ui.btn_get.text.text = "领取";
        this.ui.btn_get.disabled = false;

        this.ui.btn_share.text.text = "炫耀";
        this.ui.btn_share.disabled = false;
    }

    public addEvents(): void {
        this.ui.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
        this.ui.btn_share.on(Laya.Event.CLICK, this, this.onGetShareReward);
    }

    public removeEvents(): void {
        this.ui.btn_get.off(Laya.Event.CLICK, this, this.onGetReward);
        this.ui.btn_share.off(Laya.Event.CLICK, this, this.onGetShareReward);
    }

    /** 普通礼包奖励 */
    private onGetReward(): void {
        if (Math.floor(this._levelVO.accSpeedTime) > 0) {
            EventsMgr.Ins.dispatch(EventType.GAME_ACCE_START, Math.floor(this._levelVO.accSpeedTime));
        }
        if (this._gold > 0) {
            HallControl.Ins.updateGold(this._gold, false);
            this._gold = 0;
        }
        this.ui.btn_get.text.text = "已领取";
        this.ui.btn_get.disabled = true;
        this.closeView();
    }

    private onGetShareReward(): void {
        // SDKMgr.Ins.showVideoAd((_res: any) => {
        //     if (_res && _res.isEnded || _res === undefined) {
        //         this.ui.btn_share.text.text = "已领取";
        //         this.ui.btn_share.disabled = true;
        //         HttpMgr.Ins.requestDiamondData();
        //         HttpMgr.Ins.requestShareAdFinish("levelReward", _res);
        //     }
        // }, () => {
            //无视频回调
            this.shareGetReward();
        // });
        this.closeView();
    }

    private shareGetReward(): void {
        ShareMgr.Ins.showShareOrAdv((res: any) => {
            this.ui.btn_share.text.text = "已领取";
            this.ui.btn_share.disabled = true;
            HttpMgr.Ins.requestDiamondData();
        })
    }

    private closeView(): void {
        if (this._isGetAllReward) {
            ViewMgr.Ins.close(ViewConst.LevelRewardView);
        }
        this._isGetAllReward = true;
    }
}