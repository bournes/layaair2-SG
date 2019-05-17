import ShareMgr from "./ShareMgr";
import HallControl from "../../module/hall/HallControl";
import EventsMgr from "../event/EventsMgr";
import EventType from "../event/EventType";
import SystemConfig from "../../module/hall/config/SystemConfig";

/**
 * 红点管理类
 */
export default class RedPointMgr {

    public updateRedPoint(): void {
        EventsMgr.Ins.dispatch(EventType.UPDATE_SYSTEM_RED_POINT, SystemConfig.SIGN, this.isShowSignRedPoint);
        EventsMgr.Ins.dispatch(EventType.UPDATE_SYSTEM_RED_POINT, SystemConfig.TASK, this.isShowTaskRedPoint);
        EventsMgr.Ins.dispatch(EventType.UPDATE_SYSTEM_RED_POINT, SystemConfig.LUCK_PRIZE, this.isShowLuckPrizeRedPoint);
        EventsMgr.Ins.dispatch(EventType.UPDATE_SYSTEM_RED_POINT, SystemConfig.FOLLOW, this.isShowFollowRedPoint);
    }

    /** 是否显示商店红点 */
    public get isShowShopRedPoint(): boolean {
        return ((ShareMgr.Ins.getAdTimes(11) + ShareMgr.Ins.getShareTimes(11)) > 0) && (HallControl.Ins.Model.heroLevel >= 6 && HallControl.Ins.Model.heroLevel < HallControl.Ins.Model.heroMaxLevel);
    }
    /** 移除商店红点 */
    public removeCarShopRedPoin(): void {
        EventsMgr.Ins.dispatch(EventType.REMOVE_SHOP_REN_POINT, true);
    }

    /** 是否显示任务红点 */
    public get isShowTaskRedPoint(): boolean {
        return HallControl.Ins.Model.showTaskRedPoint;
    }
    /** 移除任务红点 */
    public removeTaskRedPoint(): void {
        HallControl.Ins.Model.showTaskRedPoint = false;
        EventsMgr.Ins.dispatch(EventType.UPDATE_SYSTEM_RED_POINT, SystemConfig.TASK, false);
    }

    /** 是否显示转盘红点 */
    public get isShowLuckPrizeRedPoint(): boolean {
        return HallControl.Ins.Model.showLuckPrizeRedPoint;
    }
    /** 移除转盘红点 */
    public removeLuckPrizeRedPoint(): void {
        HallControl.Ins.Model.showLuckPrizeRedPoint = false;
        EventsMgr.Ins.dispatch(EventType.UPDATE_SYSTEM_RED_POINT, SystemConfig.LUCK_PRIZE, false);
    }

    /** 是否显示每日签到红点 */
    public get isShowSignRedPoint(): boolean {
        return HallControl.Ins.Model.showDailySignRedPoint;
    }
    /** 移除签到红点 */
    public removeSignRedPoint(): void {
        HallControl.Ins.Model.showDailySignRedPoint = false;
        EventsMgr.Ins.dispatch(EventType.UPDATE_SYSTEM_RED_POINT, SystemConfig.SIGN, false);
    }

    /** 是否显示关注红点 */
    public get isShowFollowRedPoint(): boolean {
        return HallControl.Ins.Model.showFollowRedPoint;
    }
    /** 移除关注红点 */
    public removeFollowRedPoint(): void {
        HallControl.Ins.Model.showFollowRedPoint = false;
        EventsMgr.Ins.dispatch(EventType.UPDATE_SYSTEM_RED_POINT, SystemConfig.FOLLOW, false);
    }

    private static _instance: RedPointMgr;
    public static get Ins(): RedPointMgr {
        if (RedPointMgr._instance == null) {
            RedPointMgr._instance = new RedPointMgr();
        }
        return RedPointMgr._instance;
    }
}