import { ui } from "../../../ui/layaMaxUI";
import EventsMgr from "../../../core_wq/event/EventsMgr";
import EventType from "../../../core_wq/event/EventType";
import PlayerMgr from "../../../core_wq/player/PlayerMgr";
import PlayerInfo from "../../../core_wq/player/data/PlayerInfo";
import MathUtil from "../../../core_wq/utils/MathUtil";
import StorageUtil from "../../../core_wq/utils/StorageUtil";
import ViewMgr from "../../../core_wq/view/ViewMgr";
import ViewConst from "../../../core_wq/view/const/ViewConst";

/**
 * 货币界面
 */
export default class CurrencyView extends ui.moduleView.hall.CurrencyViewUI {

    constructor() { super(); }

    onAwake(): void {
        this.addEvents();
    }

    private addEvents(): void {
        EventsMgr.Ins.addListener(EventType.UPDATE_USER_LEVEL, this.onUpdateUserLevel, this);
        EventsMgr.Ins.addListener(EventType.UPDATE_CURRENCY, this.onUpdateCurrency, this);
        EventsMgr.Ins.addListener(EventType.UPDATE_USER_EXP, this.onUpdateUserExp, this);
        EventsMgr.Ins.addListener(EventType.UPDATE_INCOME, this.onUpdateIncome, this);
        this.btn_user.on(Laya.Event.CLICK, this, this.onShowUserInfoView);
    }

    /** 更新用户等级 */
    private onUpdateUserLevel(): void {
        this.txt_level.text = "Lv." + PlayerMgr.Ins.Info.userLevel;
        Laya.timer.callLater(this, StorageUtil.saveStorageToLocal);
    }

    /** 更新用户经验 */
    private onUpdateUserExp(upNeedexp: number): void {
        this.expBar.value = (1 * PlayerMgr.Ins.Info.userExp / upNeedexp);
        Laya.timer.callLater(this, StorageUtil.saveStorageToLocal);
    }

    /** 更新用户每秒收益 */
    private onUpdateIncome(userIncomeSec: number): void {
        PlayerMgr.Ins.Info.userIncomeSec = userIncomeSec;
        this.txt_Income.text = MathUtil.unitConversion(PlayerMgr.Ins.Info.userIncomeSec) + "/每秒";
    }

    /** 更新用户货币 */
    private onUpdateCurrency(type: number, value: number, isTotal: boolean = true): void {
        switch (type) {
            case PlayerInfo.GOLD:
                this.updateGold(value, isTotal);
                break;
            case PlayerInfo.DIAMOND:
                this.updateDiamond(value, isTotal);
                break;
        }
    }

    /** 显示用户信息界面 */
    private onShowUserInfoView(): void {
        ViewMgr.Ins.open(ViewConst.UserInfoView);
    }

    private updateGold(value: number, isTotal: boolean): void {
        let isInitGold = (PlayerMgr.Ins.Info.userGold == 0);
        if (isTotal) {
            PlayerMgr.Ins.Info.userGold = value;
        } else {
            PlayerMgr.Ins.Info.userGold += value;
        }
        this.txt_gold.text = MathUtil.unitConversion(PlayerMgr.Ins.Info.userGold);
        if (!isInitGold) {
            Laya.Tween.from(this.imgGold, { scaleX: 1.2, scaleY: 1.2 }, 300, null, Laya.Handler.create(this, () => { Laya.Tween.clearTween(this.imgGold); }));
        }
        Laya.timer.callLater(this, StorageUtil.saveStorageToLocal);
    }

    private updateDiamond(value: number, isTotal: boolean): void {
        let isInitDiamond = (PlayerMgr.Ins.Info.userDiamond == 0);
        if (isTotal) {
            PlayerMgr.Ins.Info.userDiamond = value;
        } else {
            PlayerMgr.Ins.Info.userDiamond += value;
        }
        this.txt_diamond.text = PlayerMgr.Ins.Info.userDiamond + "";
        if (!isInitDiamond) {
            Laya.Tween.from(this.imgDiamond, { scaleX: 1.2, scaleY: 1.2 }, 300, null, Laya.Handler.create(this, () => { Laya.Tween.clearTween(this.imgDiamond); }));
        }
    }
}