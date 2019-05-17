import BaseView from "../../../core_wq/view/base/BaseView";
import LayerMgr from "../../../core_wq/layer/LayerMgr";
import { ui } from "../../../ui/layaMaxUI";
import DaySignItem from "./DaySignItem";
import ViewMgr from "../../../core_wq/view/ViewMgr";
import ViewConst from "../../../core_wq/view/const/ViewConst";
import HttpMgr from "../../../core_wq/net/HttpMgr";
import MsgMgr from "../../../core_wq/msg/MsgMgr";
import EventsMgr from "../../../core_wq/event/EventsMgr";
import EventType from "../../../core_wq/event/EventType";
import RedPointMgr from "../../../core_wq/msg/RedPointMgr";

/**
 * 每日签到界面
 */
export default class DaySignView extends BaseView {

    public static SignData: any = null;

    constructor() {
        super(LayerMgr.Ins.frameLayer, ui.moduleView.daySign.DaySignViewUI);
        this.setResources(["daySign"]);
    }

    public initUI(): void {
        super.initUI();

        HttpMgr.Ins.requestSignInfo((data: any) => {
            DaySignView.SignData = data;
            if (DaySignView.SignData) {
                this.ui.lists.array = [1, 2, 3, 4, 5, 6];
                this.ui.lists.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
                this.ui.txt_diamond.text = "x" + DaySignView.SignData.prize["day_7"];
                if (7 <= DaySignView.SignData.sign.day) {
                    this.ui.btn_lastGet.skin = "images/daySign/day_prize_item2.png";
                    this.ui.imgGet.skin = "images/daySign/day_prize_get.png";
                    if (7 == DaySignView.SignData.sign.day && DaySignView.SignData.sign.status == 0) {
                        this.ui.imgGet.visible = false;
                        this.ui.btn_lastGet.on(Laya.Event.CLICK, this, this.onGetReward);
                    }
                }
            }
        });
    }

    public addEvents(): void {
        this.ui.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
        this.ui.btn_close.on(Laya.Event.CLICK, this, this.onCloseHandler);
    }

    public removeEvents(): void {
        this.ui.btn_get.off(Laya.Event.CLICK, this, this.onGetReward);
        this.ui.btn_lastGet.off(Laya.Event.CLICK, this, this.onGetReward);
        this.ui.btn_close.off(Laya.Event.CLICK, this, this.onCloseHandler);
    }

    /** 领取奖励 */
    private onGetReward(): void {
        if (DaySignView.SignData && DaySignView.SignData.sign) {
            let day: number = DaySignView.SignData.sign.day;
            HttpMgr.Ins.requestDaySignPrize(day, (_res) => {
                if (_res) {
                    if (_res.code == 1) {
                        if (day < 7) {
                            EventsMgr.Ins.dispatch(EventType.DAYSIGN_REWARD_COMPLETE);
                        } else {
                            HttpMgr.Ins.requestDiamondData();
                            this.ui.imgGet.visible = true;
                            ViewMgr.Ins.close(ViewConst.DaySignView);
                            MsgMgr.Ins.showMsg("签到奖励领取成功：元宝x" + DaySignView.SignData.prize["day7"]);
                        }
                        if (RedPointMgr.Ins.isShowSignRedPoint) {
                            RedPointMgr.Ins.removeSignRedPoint();
                        }
                    } else if (_res.code == 2) {
                        MsgMgr.Ins.showMsg("今日签到奖励已领取");
                    } else {
                        MsgMgr.Ins.showMsg("签到奖励领取失败");
                    }
                }
            });
        }
    }

    private onCloseHandler(): void {
        ViewMgr.Ins.close(ViewConst.DaySignView);
    }

    private onListRender(cell: Laya.Box, index: number): void {
        if (index > this.ui.lists.array.length) {
            return;
        }
        let item: DaySignItem = cell.getChildByName("item") as DaySignItem;
        if (item) {
            let info = this.ui.lists.array[index];
            item.dataSource = info;
        }
    }
}