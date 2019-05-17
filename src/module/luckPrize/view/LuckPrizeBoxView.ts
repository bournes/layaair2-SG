import { ui } from "../../../ui/layaMaxUI";
import BaseView from "../../../core_wq/view/base/BaseView";
import LayerMgr from "../../../core_wq/layer/LayerMgr";
import SDKMgr from "../../../core_wq/msg/SDKMgr";
import ViewMgr from "../../../core_wq/view/ViewMgr";
import ViewConst from "../../../core_wq/view/const/ViewConst";
import LuckPrizeView from "./LuckPrizeView";
import HttpMgr from "../../../core_wq/net/HttpMgr";
import AppConfig from "../../../core_wq/config/AppConfig";

/**
 * 转盘抽中倍率界面
 */
export default class LuckPrizeBoxView extends BaseView {

    private isLookAdv: boolean = false;

    constructor() {
        super(LayerMgr.Ins.subFrameLayer, ui.moduleView.luckPrize.LuckPrizeBoxViewUI);
    }

    public initData(): void {
        super.initData();
        this.isLookAdv = false;
        if (this.datas[0]) {
            switch (this.datas[0]) {
                case 3://2倍奖励
                    if (LuckPrizeView.magnification < 2) {
                        LuckPrizeView.magnification = 2;
                    }
                    break;
                case 5://8倍奖励
                    if (LuckPrizeView.magnification < 8) {
                        LuckPrizeView.magnification = 8;
                    }
                    break;
            }
            this.ui.imgTitle.skin = "images/luckPrize/luck_item_title_" + LuckPrizeView.magnification + ".png";
        }
    }

    public addEvents(): void {
        this.ui.btn_adv.on(Laya.Event.CLICK, this, this.onShowAdv);
    }

    public removeEvents(): void {
        this.ui.btn_adv.off(Laya.Event.CLICK, this, this.onShowAdv);
    }

    private onShowAdv(): void {
        if (AppConfig.isDebug) {
            this.isLookAdv = true;
            ViewMgr.Ins.close(ViewConst.LuckPrizeBoxView);
        } else {
            // SDKMgr.Ins.showVideoAd((res) => {
            //     if (res && res.isEnded || res === undefined) {
            //         // 正常播放结束，可以下发游戏奖励
            //         this.isLookAdv = true;
            //         ViewMgr.Ins.close(ViewConst.LuckPrizeBoxView);
            //     }
            // }, () => {
            // })
        }
    }

    public close(...param: any[]): void {
        super.close(param);
        this.callback && this.callback(this.isLookAdv);
    }

}