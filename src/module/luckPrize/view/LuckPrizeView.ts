import BaseView from "../../../core_wq/view/base/BaseView";
import LayerMgr from "../../../core_wq/layer/LayerMgr";
import { ui } from "../../../ui/layaMaxUI";
import HttpMgr from "../../../core_wq/net/HttpMgr";
import MathUtil from "../../../core_wq/utils/MathUtil";
import TimeUtil from "../../../core_wq/utils/TimeUtil";
import PlayerMgr from "../../../core_wq/player/PlayerMgr";
import MsgMgr from "../../../core_wq/msg/MsgMgr";
import ViewMgr from "../../../core_wq/view/ViewMgr";
import ViewConst from "../../../core_wq/view/const/ViewConst";
import SDKMgr from "../../../core_wq/msg/SDKMgr";
import EventsMgr from "../../../core_wq/event/EventsMgr";
import EventType from "../../../core_wq/event/EventType";
import PlayerInfo from "../../../core_wq/player/data/PlayerInfo";
import RollNameItem from "./item/RollNameItem";
import LotteryRosterVO from "../../../core_wq/db/vo/LotteryRosterVO";
import GlobalData from "../../../core_wq/db/GlobalData";
import AppConfig from "../../../core_wq/config/AppConfig";
import RedPointMgr from "../../../core_wq/msg/RedPointMgr";

export default class LuckPrizeView extends BaseView {

    public static magnification: number = 1;

    private costDiamond: number = 80;
    /** 视频抽奖次数 */
    private _videoCount: number = 0;
    private _freeCount: number = 0;

    constructor() {
        super(LayerMgr.Ins.frameLayer, ui.moduleView.luckPrize.LuckPrizeViewUI);
    }

    public initUI(): void {
        super.initUI();
        this.initLuckPrizeData();
    }

    /** 初始化转盘数据 */
    private initLuckPrizeData(): void {
        HttpMgr.Ins.requestPrizeInfo((_res: any) => {
            if (_res) {
                this._freeCount = _res.roulette_free_num;
                this._videoCount = _res.roulette_ad_num;
                LuckPrizeView.magnification = _res.reward_x;
                console.log("@David 转盘的次数：", this._freeCount, " 视频免费次数--", this._videoCount, " 倍率--", LuckPrizeView.magnification);
                this.ui.imgMagnification.skin = "images/luckPrize/luck_" + LuckPrizeView.magnification + ".png";
                this.refreshDiamondText();
                this.onUpdateDiamond();
                this.onUpdateRollName();
            }
        });
    }

    private refreshDiamondText(): void {
        this.ui.imgDiamond.skin = "images/common/game_diamondIcon.png";
        if (this._freeCount > 0 || this._videoCount > 0) {
            this.ui.txt_diamond.text = "免费";
            if (this._freeCount <= 0 && this._videoCount > 0) {
                this.ui.imgDiamond.skin = "images/common/video_icon.png";
            }
        } else {
            this.ui.txt_diamond.changeText('' + this.costDiamond);
            if (RedPointMgr.Ins.isShowLuckPrizeRedPoint) {
                RedPointMgr.Ins.removeLuckPrizeRedPoint();
            }
        }
    }

    public addEvents(): void {
        this.ui.btn_start.on(Laya.Event.CLICK, this, this.onStartHandler);
        EventsMgr.Ins.addListener(EventType.UPDATE_CURRENCY, this.onUpdateCurrency, this);
    }

    public removeEvents(): void {
        this.ui.btn_start.off(Laya.Event.CLICK, this, this.onStartHandler);
        EventsMgr.Ins.addListener(EventType.UPDATE_CURRENCY, this.onUpdateCurrency, this);
    }

    /** 开始抽奖 */
    private onStartHandler(): void {
        let that = this;
        that.startBtnEnabled(false);
        if (this._freeCount > 0) {   //免费抽奖
            this.doLotteryByType(LOTTERY_TYPE.FREE);
        }
        else if (this._videoCount > 0) { //看视频抽奖
            this.handlerLookVideoLottery();
        }
        else if (PlayerMgr.Ins.Info.userDiamond >= this.costDiamond) { //钻石抽奖
            this.doLotteryByType(LOTTERY_TYPE.DIAMOND);
        }
        else {
            MsgMgr.Ins.showMsg("主人,元宝不足噢~");
            this.startBtnEnabled();
        }
    }

    private doLotteryByType(type: number): void {
        HttpMgr.Ins.requestDrawPrize(type, (data: any) => {
            if (!data || data.id == null) {
                console.log("@David 无法正常抽奖 type:", type);
                this.startBtnEnabled();
                return;
            }
            console.log("@David 转盘的抽奖：", data.id, "--", type);
            let itemId: number = data.id;
            let rotation: number = (8 - itemId) * 360 / 8 + 360 / 16;
            this.onRotation(360 * 3 + rotation, itemId);
            switch (type) {
                case LOTTERY_TYPE.FREE:
                    this._freeCount--;
                    this.refreshView();
                    break;
                case LOTTERY_TYPE.VIDEO:
                    this._videoCount--;
                    this.refreshView();
                    break;
                case LOTTERY_TYPE.DIAMOND:
                    HttpMgr.Ins.requestDiamondData();
                    break;
            }
        })
    }

    /** 看视频抽奖 */
    private handlerLookVideoLottery(): void {
        if (AppConfig.isDebug) {
            this.doLotteryByType(LOTTERY_TYPE.VIDEO);
        } else {
            // SDKMgr.Ins.showVideoAd((res) => {
            //     if (res && res.isEnded || res === undefined) {
            //         // 正常播放结束，可以下发游戏奖励
            //         this.doLotteryByType(LOTTERY_TYPE.VIDEO);
            //     }
            //     else {
            //         // 播放中途退出，不下发游戏奖励
            //         this.startBtnEnabled();
            //     }
            // }, () => {
                this.startBtnEnabled();
            // });
        }
    }

    private refreshView() {
        this.refreshDiamondText();
    }

    /** 转盘 */
    private onRotation(rotation: number, itemId: number): void {
        let fAdd: number = 0.2;
        this.ui.imgBg.rotation = this.ui.imgBg.rotation % 360;
        if (this.ui.imgBg.rotation > rotation) {
            fAdd = -fAdd;
        }
        let fAddLength: number = 0;
        let fTotalLength: number = Math.abs(rotation - this.ui.imgBg.rotation);
        let animFun = () => {
            if (fAdd > 0) {
                if (this.ui.imgBg.rotation < rotation) {
                    let progress = fAddLength / fTotalLength;
                    //加速
                    if (progress < 0.2) {
                        fAdd += 0.2;
                    } else if (progress > 0.6) {
                        fAdd -= 0.1;
                    }
                    if (fAdd < 0.2) {
                        fAdd = 0.2;
                    }
                    fAddLength += fAdd;
                    this.ui.imgBg.rotation += fAdd;
                } else {
                    this.ui.imgBg.rotation = rotation;
                    this.ui.imgBg.clearTimer(this, animFun);
                    this.startBtnEnabled();
                    //显示奖励物品
                    this.showRewardView(itemId);
                }
            } else if (fAdd < 0) {
                if (this.ui.imgBg.rotation > rotation) {
                    this.ui.imgBg.rotation += fAdd;
                } else {
                    this.ui.imgBg.rotation = rotation;
                    this.ui.imgBg.clearTimer(this, animFun);
                    this.startBtnEnabled();
                }
            }
        }
        this.ui.imgBg.timerLoop(10, this, animFun);
    }

    /** 显示奖励界面 */
    private showRewardView(itemId: number): void {
        if (itemId != 3 && itemId != 5) {
            ViewMgr.Ins.open(ViewConst.LuckPrizeRewardView, () => {
                LuckPrizeView.magnification = 1;
                this.ui.imgMagnification.skin = "images/luckPrize/luck_" + LuckPrizeView.magnification + ".png";
            }, itemId);
        } else {    //倍率界面
            ViewMgr.Ins.open(ViewConst.LuckPrizeBoxView, (flag: boolean) => {
                this.ui.imgMagnification.skin = "images/luckPrize/luck_" + LuckPrizeView.magnification + ".png";
                if (flag) this.freeLottery();
            }, itemId);
        }
    }

    private freeLottery(): void {
        console.log("@David 转盘抽中物品后关闭界面：", LuckPrizeView.magnification);
        if (LuckPrizeView.magnification > 1) {
            this.startBtnEnabled();
            this.doLotteryByType(LOTTERY_TYPE.FREE_VIDEO);
            console.log("@David 转盘抽中多倍后再一次免费抽奖");
        }
    }

    /** 更新用户货币 */
    private onUpdateCurrency(type: number, diamond: number, isTotal: boolean = true): void {
        if (type == PlayerInfo.DIAMOND) {
            this.onUpdateDiamond(diamond);
        }
    }

    /** 更新钻石数量 */
    private onUpdateDiamond(diamond: number = -1): void {
        if (diamond > -1) {
            this.ui.txt_myDiamond.text = diamond + "";
        } else {
            this.ui.txt_myDiamond.text = PlayerMgr.Ins.Info.userDiamond + "";
        }
    }

    /** 更新滚动的名字 */
    private onUpdateRollName(): void {
        (this.ui.rollBox as Laya.Box).scrollRect = new Laya.Rectangle(0, 0, this.ui.rollBox.width, this.ui.rollBox.height);
        this.timerLoop(600, this, this.timeLoopRollName);
    }

    private timeLoopRollName(): void {
        let vo: LotteryRosterVO = GlobalData.getData(GlobalData.LotteryRosterVO, MathUtil.rangeInt(1, 100));
        let rollName: RollNameItem = Laya.Pool.getItemByClass("RollNameItem", RollNameItem);
        rollName.dataSource = vo;
        if (rollName.txt_name) {
            this.ui.rollBox.addChild(rollName);
            rollName.x = 63;
            rollName.y = this.ui.rollBox.height + rollName.height;
            Laya.Tween.to(rollName, { y: -rollName.height }, 2500, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                Laya.Tween.clearTween(rollName);
                rollName.removeSelf();
                Laya.Pool.recover("RollNameItem", rollName);
            }));
        }
    }

    private startBtnEnabled(_isEnabled: boolean = true): void {
        this.ui.btn_start.mouseEnabled = _isEnabled;
    }
}

enum LOTTERY_TYPE {
    /** 免费抽奖 */
    FREE = 0,
    /** 钻石抽奖 */
    DIAMOND = 1,
    /** 免费抽奖的看视频 */
    VIDEO = 2,
    /** 这个是比较特殊的，只有抽中多倍后观看视频就免费赠送一次抽奖 */
    FREE_VIDEO = 3,
}