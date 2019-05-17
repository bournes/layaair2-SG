import { ui } from "../../../ui/layaMaxUI";
import DaySignView from "./DaySignView";
import HttpMgr from "../../../core_wq/net/HttpMgr";
import MsgMgr from "../../../core_wq/msg/MsgMgr";
import ViewMgr from "../../../core_wq/view/ViewMgr";
import ViewConst from "../../../core_wq/view/const/ViewConst";
import EventsMgr from "../../../core_wq/event/EventsMgr";
import EventType from "../../../core_wq/event/EventType";

export default class DaySignItem extends ui.moduleView.daySign.DaySignItemUI {


    private _diamond: number = 0;
    private _day: number = 0;

    constructor() { super(); }

    set dataSource(value: any) {
        this._day = value;
        this._diamond = DaySignView.SignData.prize["day_" + this._day];
        this.txt_title.text = "第" + this._day + "天";
        this.txt_diamond.text = "x" + this._diamond;
        if (this._day <= DaySignView.SignData.sign.day) {
            this.btn_get.skin = "images/daySign/day_prize_item1.png";
            this.imgGet.skin = "images/daySign/day_prize_get.png";
            if (this._day == DaySignView.SignData.sign.day && DaySignView.SignData.sign.status == 0) {
                this.imgGet.skin = "images/daySign/day_prize_get_no.png";
                this.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
                EventsMgr.Ins.addListener(EventType.DAYSIGN_REWARD_COMPLETE, this.onRewardGetComplete, this);
            }
        }
    }

    private onGetReward(): void {
        if (DaySignView.SignData && DaySignView.SignData.sign) {
            let day: number = DaySignView.SignData.sign.day;
            HttpMgr.Ins.requestDaySignPrize(day, (_res) => {
                if (_res) {
                    if (_res.code == 1) {
                        this.onRewardGetComplete();
                    } else if (_res.code == 2) {
                        MsgMgr.Ins.showMsg("今日签到奖励已领取");
                    } else {
                        MsgMgr.Ins.showMsg("签到奖励领取失败");
                    }
                }
            });
        }
    }

    private onRewardGetComplete(): void {
        MsgMgr.Ins.showMsg("签到奖励领取成功：元宝x" + this._diamond);
        this.imgGet.skin = "images/daySign/day_prize_get.png";
        HttpMgr.Ins.requestDiamondData();
        ViewMgr.Ins.close(ViewConst.DaySignView);
    }
}