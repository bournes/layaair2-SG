import BaseView from "../../../core_wq/view/base/BaseView";
import LayerMgr from "../../../core_wq/layer/LayerMgr";
import { ui } from "../../../ui/layaMaxUI";
import HallControl from "../../hall/HallControl";
import MathUtil from "../../../core_wq/utils/MathUtil";
import PlayerMgr from "../../../core_wq/player/PlayerMgr";
import HttpMgr from "../../../core_wq/net/HttpMgr";
import MsgMgr from "../../../core_wq/msg/MsgMgr";
import HeroConfigVO from "../../../core_wq/db/vo/HeroConfigVO";
import GlobalData from "../../../core_wq/db/GlobalData";

export default class DiamondBuyView extends BaseView {

    private _data: { type: string, value: number };
    private _price: number = 0;
    private _heroConfig: HeroConfigVO;

    constructor() {
        super(LayerMgr.Ins.subFrameLayer, ui.moduleView.common.DiamondBuyViewUI);
    }

    public initData(): void {
        super.initData();
        this._data = this.datas[0];
        if (this._data) {
            if (this._data.type == "hero") {
                this._heroConfig = GlobalData.getData(GlobalData.HeroConfigVO, this._data.value);
                this._price = HallControl.Ins.Model.getDiamondBuyHeroPrice(this._data.value, HallControl.Ins.Model.queryBuyHeroRecord(this._data.value, true));
                this.ui.txt_diamond.text = MathUtil.unitConversion(this._price);
                if (this._heroConfig) {
                    this.ui.txt_title.text = "购买" + this._heroConfig.name;
                }
            }
        }
    }

    public addEvents(): void {
        this.ui.btn_buy.on(Laya.Event.CLICK, this, this.onBuyHandler);
    }

    public removeEvents(): void {
        this.ui.btn_buy.off(Laya.Event.CLICK, this, this.onBuyHandler);
    }

    private onBuyHandler(): void {
        if (this._data.type == "hero") {
            this.buyHeroHandler();
        }
    }

    private buyHeroHandler(): void {
        let heroPriceInt = Math.floor(this._price);
        if (PlayerMgr.Ins.Info.userDiamond >= heroPriceInt) {
            HttpMgr.Ins.requestDiamondBuyOrder(heroPriceInt, (res: any) => {
                if (res) {
                    if (HallControl.Ins.createHero(this._data.value) == null) return;
                    HttpMgr.Ins.requestDiamondBuy(res.order_id, (_res: any) => {
                        if (this._heroConfig) {
                            MsgMgr.Ins.showMsg("武将购买成功：" + this._heroConfig.name + "x1");
                        } else {
                            MsgMgr.Ins.showMsg("武将购买成功");
                        }
                        HttpMgr.Ins.requestDiamondData();
                        //刷新消费记录
                        HallControl.Ins.Model.refreshBuyHeroRecord(this._data.value, true);
                    });
                } else {
                    MsgMgr.Ins.showMsg("购买失败");
                }
            });
        } else {
            MsgMgr.Ins.showMsg("元宝不足,做任务领元宝噢!")
        }
    }
}