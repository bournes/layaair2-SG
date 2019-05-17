import { ui } from "../../../ui/layaMaxUI";
import HallControl from "../HallControl";
import HeroConfigVO from "../../../core_wq/db/vo/HeroConfigVO";
import PlayerMgr from "../../../core_wq/player/PlayerMgr";
import EffectUtil from "../../../core_wq/utils/EffectUtil";
import EventsMgr from "../../../core_wq/event/EventsMgr";
import EventType from "../../../core_wq/event/EventType";
import PlayerInfo from "../../../core_wq/player/data/PlayerInfo";
import MathUtil from "../../../core_wq/utils/MathUtil";
import MsgMgr from "../../../core_wq/msg/MsgMgr";
import HttpMgr from "../../../core_wq/net/HttpMgr";
import Hero from "../hero/Hero";
import ShareMgr from "../../../core_wq/msg/ShareMgr";
import LayerMgr from "../../../core_wq/layer/LayerMgr";
import GameConfig from "../../../GameConfig";
import StorageUtil from "../../../core_wq/utils/StorageUtil";
import SoundMgr from "../../../core_wq/sound/SoundMgr";
import SoundType from "../../../core_wq/sound/SoundType";
import ViewRegisterMgr from "../../../core_wq/view/ViewRegisterMgr";
import ViewMgr from "../../../core_wq/view/ViewMgr";
import ViewConst from "../../../core_wq/view/const/ViewConst";
import HeadItem from "./item/HeadItem";
import GuideMgr from "../../../core_wq/guide/GuideMgr";
import SDKMgr from "../../../core_wq/msg/SDKMgr";
import HeroTips from "./HeroTips";
import RedPointMgr from "../../../core_wq/msg/RedPointMgr";
import SystemBtn from "./item/SystemBtn";
import SystemConfig from "../config/SystemConfig";
import AnimBone from "../bone/AnimBone";
import PointUtils from "../../../core_wq/utils/PointUtils";

export default class HallScene extends ui.moduleView.hall.HallSceneUI {

    private _control: HallControl;
    /** 当前点击的头像槽 */
    private _currHeadItem: HeadItem;
    private _copyHeadItem: HeadItem;
    private _currBuyHeroInfo: HeroConfigVO;
    private _battleHeroIndex: number = 0;
    private _heroTips: HeroTips;

    constructor() { super(); }

    onAwake(): void {
        // SDKMgr.Ins.wxShowUpdateVersionTips();
    }

    onEnable(): void {
        LayerMgr.Ins.initLayer(Laya.stage, GameConfig.width, GameConfig.height);
        this.scale(LayerMgr.adaptScaleX, LayerMgr.adaptScaleY);
        ViewRegisterMgr.Ins.initRegisterView();
        this.init();
        this.initUserData();
        this.haveStoreHero();
        this.showSurpassView();
        this.initSystemBtn();
        this.onUpdateShopRedPoint();
        this.addEvents();
    }

    private init(): void {
        MsgMgr.Ins.showMsg("测试测试测试测试测试");
        this._control = HallControl.Ins;
        this._control.hallScene = this;
        this.lists_head.vScrollBarSkin = "";
        if (this._control.Model.AllHeros.length < 1) {
            this._control.Model.initAllHeros();
        }
        this.lists_head.array = this._control.Model.AllHeros;
        this.lists_head.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this.foregroundTwo.x = this._control.Model.foregroundWidth;
        this.fargroundTwo.x = this._control.Model.fargroundWidth;
        this.list_btn.renderHandler = Laya.Handler.create(this, this.onRenderSystem, null, false);
        SoundMgr.Ins.playBg(SoundType.BG_MUSIC);
        if (PlayerMgr.Ins.Info.wxUserInfo) {
            HttpMgr.Ins.requestSaveWxUserinfoData(PlayerMgr.Ins.Info.wxUserInfo.nickName, PlayerMgr.Ins.Info.wxUserInfo.avatarUrl, PlayerMgr.Ins.Info.wxUserInfo.city, PlayerMgr.Ins.Info.wxUserInfo.gender);
        }
    }

    /** 初始化用户数据 */
    private initUserData(): void {
        if (PlayerMgr.Ins.Info.wxUserInfo) {
            this.imgHead.skin = PlayerMgr.Ins.Info.wxUserInfo.avatarUrl;
        }
        this._control.setUserLevel(PlayerMgr.Ins.Info.userLevel);//用户等级
        this._control.setUserExp(PlayerMgr.Ins.Info.userExp);//用户经验
        this._control.updateGold(PlayerMgr.Ins.Info.userGold);
        EventsMgr.Ins.dispatch(EventType.UPDATE_INCOME, PlayerMgr.Ins.Info.userIncomeSec);//用户每秒可获得的金币
        EventsMgr.Ins.dispatch(EventType.UPDATE_CURRENCY, PlayerInfo.DIAMOND, PlayerMgr.Ins.Info.userDiamond);//更新用户获得钻石
        this.updateRecruitData();
        this.frameLoop(1, this, this.onUpdateBattleView);
        StorageUtil.requestOfflinePrizeData();
        this._control.updateMapData();
        GuideMgr.Ins.setup();
        HttpMgr.Ins.requestDiamondData();
    }

    /** 初始化功能按钮 */
    private initSystemBtn(): void {
        let datas = this._control.getSystemBtnList();
        if (datas && datas.length > 0 && (this.list_btn.array == null || datas.length > this.list_btn.array.length)) {
            this.list_btn.visible = true;
            this.list_btn.array = datas;
            this.timerOnce(1000, this, () => {
                RedPointMgr.Ins.updateRedPoint();
            })
        }
    }

    private addEvents(): void {
        this.btn_recruit.on(Laya.Event.CLICK, this, this.onClickBtnHandler);
        this.btn_acc.on(Laya.Event.CLICK, this, this.onClickBtnHandler);
        this.btn_shop.on(Laya.Event.CLICK, this, this.onClickBtnHandler);
        this.btn_heroStore.on(Laya.Event.CLICK, this, this.onClickBtnHandler);
        this.lists_head.on(Laya.Event.MOUSE_DOWN, this, this.onHeroSelect);

        EventsMgr.Ins.addListener(EventType.HERO_BOX, this.onShowHeroBox, this);
        EventsMgr.Ins.addListener(EventType.GAME_ACCE_START, this.onGameAcce, this);
        EventsMgr.Ins.addListener(EventType.SHOW_OFFLINE_REWARD, this.onOffLineReward, this);
        EventsMgr.Ins.addListener(EventType.UPDATE_SYSTEM_BTN, this.onUpdateSystemBtn, this);
        EventsMgr.Ins.addListener(EventType.OPEN_VIEW, this.onOpenSystemView, this);
        EventsMgr.Ins.addListener(EventType.REMOVE_SHOP_REN_POINT, this.onUpdateShopRedPoint, this);
    }

    private onOpenSystemView(id: number): void {
        switch (id) {
            case SystemConfig.SIGN:
                ViewMgr.Ins.open(ViewConst.DaySignView);
                break;
            case SystemConfig.RANK:
                ViewMgr.Ins.open(ViewConst.RankView);
                break;
            case SystemConfig.LUCK_PRIZE:
                ViewMgr.Ins.open(ViewConst.LuckPrizeView);
                break;
            case SystemConfig.TASK:
                ViewMgr.Ins.open(ViewConst.TaskView);
                break;
            case SystemConfig.INVITE:

                break;
            case SystemConfig.FOLLOW:
                ViewMgr.Ins.open(ViewConst.FollowView);
                break;
        }
    }

    private onClickBtnHandler(e: Laya.Event): void {
        if (e.target instanceof Laya.Button) {
            switch (e.target) {
                case this.btn_recruit://招募英雄
                    this.recruitHero();
                    break;
                case this.btn_acc://加速
                    this.openGameAcc();
                    break;
                case this.btn_shop://商店
                    ViewMgr.Ins.open(ViewConst.ShopView);
                    break;
                case this.btn_heroStore://英雄保存箱
                    this.popHeroStore();
                    break;
            }
        }
    }

    /** 招募英雄 */
    private recruitHero(): void {
        this._currBuyHeroInfo = this._control.Model.getRecruitHeroData();
        if (this._currBuyHeroInfo) {
            this._control.buyHero(this._currBuyHeroInfo);
            this.updateRecruitData(this._currBuyHeroInfo);
        }
    }

    /** 更新招募英雄数据 */
    public updateRecruitData(buyHeroInfo: HeroConfigVO = null): void {
        if (buyHeroInfo) {
            this._currBuyHeroInfo = buyHeroInfo;
        } else {
            this._currBuyHeroInfo = this._control.Model.getRecruitHeroData();
        }
        let buyPrice: number = this._control.Model.getHeroBuyPrice(this._currBuyHeroInfo.buyPrice, this._control.Model.queryBuyHeroRecord(this._currBuyHeroInfo.id));
        this.txt_price.text = MathUtil.unitConversion(buyPrice);
        if (PlayerMgr.Ins.Info.userGold < buyPrice) {
            this.txt_price.color = "#FF0000";
        } else {
            this.txt_price.color = "#FFF1BA";
        }
        this.txt_level.text = "Lv." + this._currBuyHeroInfo.id;
    }

    private onHeroSelect(e: Laya.Event): void {
        if (this._copyHeadItem) return;
        for (let index = 0; index < this._control.Model.allHeroCount; index++) {
            let cell = this.lists_head.getCell(index);
            if (cell) {
                let headItem: HeadItem = cell.getChildByName("hero") as HeadItem;
                if (headItem && headItem.IsBattle && !headItem.IsBox && this._control.isHit(headItem)) {
                    headItem.setStage(2);
                    this._currHeadItem = headItem;
                    this._currHeadItem.visible = false;
                    this._copyHeadItem = Laya.Pool.getItemByClass("copyHeadItem", HeadItem);
                    this._copyHeadItem.updateHeadSkin(headItem.Info.heroId, index);
                    this._copyHeadItem.pivot(126 / 2, 127 / 2);
                    this._copyHeadItem.zOrder = 999;
                    this.addChild(this._copyHeadItem);
                    this.showHeroTips();
                    this._copyHeadItem.pos(this.mouseX, this.mouseY);
                    this.imgDelete.alpha = 1.0;
                    this.on(Laya.Event.MOUSE_MOVE, this, this.onMouseHeadItemMove);
                    this.on(Laya.Event.MOUSE_UP, this, this.onMouseHeadItemUp);
                    break;
                }
            }
        }
    }

    private onMouseHeadItemMove(e: Laya.Event): void {
        if (this._copyHeadItem) {
            this._copyHeadItem.pos(this.mouseX, this.mouseY);
        }
    }

    private onMouseHeadItemUp(e: Laya.Event): void {
        this.imgDelete.alpha = 0.5;
        if (this._copyHeadItem) {
            this.off(Laya.Event.MOUSE_MOVE, this, this.onMouseHeadItemMove);
            this.off(Laya.Event.MOUSE_UP, this, this.onMouseHeadItemUp);
            if (this._control.isHit(this.imgDelete)) {//出售英雄
                let sellPrice: number = this._currHeadItem.getSellPrice();
                this._currHeadItem.reset();
                EffectUtil.playCoinEffect(this.imgDelete, 'images/common/star2.png');
                EffectUtil.playTextEffect(this.imgDelete, "金币+" + MathUtil.unitConversion(sellPrice));
                this._control.updateGold(PlayerMgr.Ins.Info.userGold + sellPrice);
                this._control.setSaveHeroData(this._currHeadItem);
                this._control.setBattleHeroCount(PlayerMgr.Ins.Info.userRuncarCount - 1);
            } else {
                this._currHeadItem.setStage(1);
                for (let index = 0; index < this._control.Model.allHeroCount; index++) {
                    let cell = this.lists_head.getCell(index);
                    if (cell) {
                        let headItem: HeadItem = cell.getChildByName("hero") as HeadItem;
                        if (headItem && this._control.isHit(headItem) && headItem != this._currHeadItem && !headItem.IsBox && !headItem.IsLock) {
                            let heroId: number = headItem.Info.heroId;
                            if (heroId == this._currHeadItem.Info.heroId) {
                                if (heroId >= this._control.Model.heroMaxLevel) {
                                    MsgMgr.Ins.showMsg("已达最高级！");
                                } else { //合并英雄
                                    let nextLevel: number = heroId + 1;
                                    let exp: number = this._control.getHeroExp(heroId);
                                    headItem.updateHeadSkin(nextLevel, index);
                                    headItem.removeBattleHero();
                                    let startPos = {
                                        x: 50 + this.width * 0.5 * Math.random(),
                                        y: this.beginEventView.y - 150 + (this.beginEventView.height - 30) / this.lists_head.array.length
                                    };
                                    headItem.createBattleHero(this, startPos);
                                    EffectUtil.playBoneEffect("ui_born", { x: startPos.x - 20, y: startPos.y + 200 });
                                    this._currHeadItem.reset();
                                    //合并效果
                                    EffectUtil.playHeroMergeEffect(this, heroId, headItem);
                                    //更新英雄等级
                                    if (this._control.updateHeroLevel(nextLevel)) {
                                        ViewMgr.Ins.open(ViewConst.NewHeroView, null, nextLevel);
                                        SoundMgr.Ins.playEffect(SoundType.UNLOCK);
                                    } else {
                                        SoundMgr.Ins.playEffect(SoundType.MAKE_HERO);
                                    }
                                    if (exp > 0) {
                                        this._control.setUserExp(PlayerMgr.Ins.Info.userExp + exp);
                                        let headItemPos = PointUtils.localToGlobal(headItem);
                                        let pos: { x: number, y: number } = { x: headItemPos.x + headItem.width * 0.5, y: headItemPos.y + 2 };
                                        EffectUtil.playTextEffect(this, "Exp+" + exp, pos);
                                        headItemPos = null;
                                    }
                                    this.updateRecruitData();
                                    this._control.refreshIncomeSec();
                                    this._control.setSaveHeroData(headItem, this._currHeadItem);
                                    //刷新战斗英雄的数量
                                    this._control.setBattleHeroCount(PlayerMgr.Ins.Info.userRuncarCount - 1);
                                    HttpMgr.Ins.requestDailyTaskData(1);
                                    GuideMgr.Ins.onNextStep();
                                }
                            } else {    //交换
                                let isEmpty: boolean = headItem.IsEmpty;
                                headItem.updateHeadSkin(this._currHeadItem.Info.heroId);
                                headItem.setStage(this._currHeadItem.HeroStage);
                                if (isEmpty) {
                                    this._control.createHeroBone(headItem, { x: this._currHeadItem.BattleHero.x, y: this._currHeadItem.BattleHero.y });
                                    this._currHeadItem.reset();
                                } else {
                                    this._currHeadItem.updateHeadSkin(heroId);
                                    let oldBattleHero = this._currHeadItem.BattleHero;
                                    this._currHeadItem.BattleHero = headItem.BattleHero;
                                    headItem.BattleHero = oldBattleHero;
                                }
                                this._control.setSaveHeroData(headItem, this._currHeadItem);
                                SoundMgr.Ins.playEffect(SoundType.DRAW_HERO);
                            }
                            break;
                        }
                    }
                }
            }
            this.removeHeroTips();
            this._currHeadItem.visible = true;
            this._copyHeadItem.removeSelf();
            Laya.Pool.recover("copyHeadItem", this._copyHeadItem);
            this._copyHeadItem = null;
        }
    }

    /** 更新战斗界面 */
    private onUpdateBattleView(): void {
        let isRollView: boolean = false;
        for (let index = 0; index < this._control.Model.allHeroCount; index++) {
            let cell = this.lists_head.getCell(index);
            if (cell) {
                let headItem: HeadItem = cell.getChildByName("hero") as HeadItem;
                if (headItem && headItem.Info && headItem.Info.heroId > 0 && !headItem.isDie) {
                    isRollView = true;
                    let battleHero: Hero = headItem.BattleHero;
                    if (battleHero) {
                        if (this._control.Model.is_reset_zorder) {
                            battleHero.zOrder = Math.floor(battleHero.y);
                        }
                        //是否攻击就位
                        if (battleHero.IsInPosition) {
                            if (battleHero.AttackTarget == null) {
                                let posX = battleHero.OrginalX + battleHero.IncomeTime * this._control.Model.viewRollSpeep + 340;
                                battleHero.createAttackTarget(battleHero.parent, new Laya.Point(posX, battleHero.y));
                            } else {
                                battleHero.AttackTarget.x -= this._control.Model.viewRollSpeep * this._control.Model.userAcceValue;
                            }
                            battleHero.refreshIncomeTime(() => {
                                let txtPos: any = { x: battleHero.x, y: battleHero.y - 30 }
                                //移除攻击对象
                                let attackSp = battleHero.AttackTarget as Hero;
                                if (attackSp) {
                                    headItem.updateHp();
                                    txtPos = { x: attackSp.x - 50, y: attackSp.y + 50 }
                                    battleHero.removeEnemy(true);
                                }
                                let obtainMoney: number = this._control.getHeroIncomeTotalGold(headItem.Info.heroId) * PlayerMgr.Ins.Info.userExtraIncome * PlayerMgr.Ins.Info.userLevelExtraIncome;
                                //飘数字
                                EffectUtil.playImageTextEffect(this, "images/common/coin.png", "+" + MathUtil.unitConversion(obtainMoney), txtPos, 1000);
                                this._control.updateGold(PlayerMgr.Ins.Info.userGold + obtainMoney);
                            });
                        }
                    }
                }
            }
        }
        this.doRollView(isRollView);
    }

    /** 滚动屏幕 */
    private doRollView(isRollView: boolean): void {
        if (isRollView) {
            //前景屏幕
            this.box_foreground.x -= this._control.Model.viewRollSpeep * this._control.Model.userAcceValue;
            let pageIndex: number = Math.floor(-this.box_foreground.x / this._control.Model.foregroundWidth);
            if (this._control.Model.foregroundIndex != pageIndex) {
                this._control.Model.foregroundIndex = pageIndex;
                this.viewMoveHandler(this.foregroundOne, this.foregroundTwo, this._control.Model.foregroundWidth, pageIndex);
            }
            //远景屏幕
            this.box_farground.x -= this._control.Model.viewRollSpeep * this._control.Model.userAcceValue * 0.5;
            let farPageIndex: number = Math.floor(-this.box_farground.x / this._control.Model.fargroundWidth);
            if (this._control.Model.fargroundIndex != farPageIndex) {
                this._control.Model.fargroundIndex = farPageIndex;
                this.viewMoveHandler(this.fargroundOne, this.fargroundTwo, this._control.Model.fargroundWidth, farPageIndex);
            }
            //最前景屏幕
            this.box_obstacle.x -= this._control.Model.viewRollSpeep * this._control.Model.userAcceValue * 1.2;
            let obstaclePageIndex: number = Math.floor(-this.box_obstacle.x / this._control.Model.topForegroundWidth);
            if (this._control.Model.topForegroundIndex != obstaclePageIndex) {
                this._control.Model.topForegroundIndex = obstaclePageIndex
                this.viewMoveHandler(this.obstacleOne, this.obstacleTwo, this._control.Model.topForegroundWidth, obstaclePageIndex);
            }
        }
    }

    private viewMoveHandler(rollViewOne: any, rollViewTwo: any, width: number, pageIndex: number): void {
        if (this._control.Model.viewRollSpeep > 0) {
            //左移
            if (pageIndex % 2 == 0) {
                rollViewTwo.x = width * (pageIndex + 1);
            } else {
                rollViewOne.x = width * (pageIndex + 1);
            }
        } else {
            //右移
            if (pageIndex % 2 == 0) {
                rollViewOne.x = width * pageIndex;
            } else {
                rollViewTwo.x = width * pageIndex;
            }
        }
    }

    private onListRender(cell: Laya.Box, index: number): void {
        if (index > this.lists_head.array.length) {
            return;
        }
        let headItem: HeadItem = cell.getChildByName("hero") as HeadItem;
        if (headItem) {
            let info = this.lists_head.array[index];
            headItem.dataSource = info;
            if (info.heroId > 0) {
                Laya.timer.frameOnce(index + (Math.random() * 45), this, () => {
                    this._battleHeroIndex++;
                    let startPos = {
                        x: MathUtil.rangeInt(10, 50) + this.width * 0.5 * Math.random(),
                        y: this.beginEventView.y + MathUtil.rangeInt(-150, 200)//- 150 + (this.beginEventView.height - 30) / (this.lists_head.array.length) * this._battleHeroIndex
                    };
                    EffectUtil.playBoneEffect("ui_born", { x: startPos.x - 20, y: startPos.y + 200 });
                    this.timerOnce(100, this, () => {
                        headItem.createBattleHero(this, startPos); //汽车放入跑道
                        headItem.setStage(1);
                        this._control.Model.is_reset_zorder = true;
                        //刷新战斗英雄的数量
                        this._control.setBattleHeroCount(PlayerMgr.Ins.Info.userRuncarCount + 1);
                    })
                });
            }
        }
    }

    /** 打开游戏加速 */
    private openGameAcc(): void {
        let stage = ShareMgr.Ins.showShareOrAdv(() => {
            this.playAccEffect();
            // let effect: AnimBone = new AnimBone();
            // effect.createBone("images/boneAnim/zhuque.sk", true);
            // effect.scale(0.5, 0.5);
            // effect.pos(197, 198);
            // effect.completeBack = (animName: string) => {
            //     if (animName == "attack") {
            //         effect.playAnimation("", true, 3);
            //     }
            // }
            // this.addChild(effect);
            // this.timerLoop(3000, this, () => {
            //     effect.playAnimation("", false, 1);
            // })
        }, 10, false, true);
    }

    /** 加速效果 */
    private playAccEffect(_acceTime: number = 90, _isEffect: boolean = true): void {
        if (this._control.Model.userAcceTime > 1) {
            this._control.Model.userAcceTime += _acceTime;
            return;
        }
        this.btn_acc.mouseEnabled = false;
        this.imgAcce.visible = true;
        this._control.Model.userAcceTime += _acceTime;
        if (_isEffect) {
            EffectUtil.playAccEffect(this);
        }
        this._control.setBattleHeroAcce(2);
        this.refreshAcceTime();
        this.timerLoop(1000, this, this.refreshAcceTime);
        SoundMgr.Ins.playEffect(SoundType.GAME_ACCE);
    }

    /** 刷新加速时间 */
    private refreshAcceTime(): void {
        let minute = Math.floor(this._control.Model.userAcceTime / 60);
        let sec = this._control.Model.userAcceTime % 60;
        this.txt_accTimes.text = (minute < 10 ? ('0' + minute) : minute) + ':' + (sec < 10 ? ('0' + sec) : sec);
        if (this._control.Model.userAcceTime > 0) {
            this._control.Model.userAcceTime--;
            StorageUtil.saveAcceLeftTime(this._control.Model.userAcceTime);
        } else {
            this._control.setBattleHeroAcce(1);
            this.clearTimer(this, this.refreshAcceTime);
            this.imgAcce.visible = false;
            this.btn_acc.mouseEnabled = true;
        }
    }

    /** 显示英雄保存箱 */
    private onShowHeroBox(): void {
        this.btn_heroStore.visible = true;
    }

    /** 取出英雄箱中的英雄 */
    private popHeroStore(): void {
        let heroId: number = StorageUtil.popHeroStore();
        if (heroId > 0) {
            let hero: HeadItem = this._control.createHero(heroId);
            if (hero) {
                StorageUtil.popHeroStore(true);
                this.haveStoreHero();
            }
        }
    }

    /** 是否拥有缓存的英雄 */
    private haveStoreHero(): void {
        this.btn_heroStore.visible = StorageUtil.popHeroStore() > 0;
    }

    /** 转盘奖励加速 */
    private onGameAcce(time: number): void {
        this.playAccEffect(time);
    }

    /** 离线奖励 */
    private onOffLineReward(): void {
        let offlinePrize: number = StorageUtil.offlinePrize();
        if (offlinePrize > 10 * 60 && PlayerMgr.Ins.Info.userIncomeSec > 0 && this._control.IsGuide == false) {
            // 1) 离线0-8小时：100%收益
            // 2) 8-24小时：8小时100%收益+（X-8）*50%收益
            // 3) 24小时以上：8小时100%收益+16小时*50%收益（意思就是超出24小时后的部分不计算收益）
            // 20180726-离线奖励规则修改：8小时内100%调整为25%；8小时-24小时50%调整为10%。
            // 20180728-离线奖励再降低下，只计算8小时内的。8小时以外不给奖励。
            // 20180806-有收益的最长时间改为：2个小时
            let gold: number = 0;
            let secondForHour: number = 60 * 60;
            let secHourMax = 2 * secondForHour;
            if (offlinePrize > secHourMax) {
                gold = (secHourMax * PlayerMgr.Ins.Info.userIncomeSec) * 0.05;
            } else {
                gold = (offlinePrize * PlayerMgr.Ins.Info.userIncomeSec) * 0.05;
            }
            if (gold > 0) {
                gold = gold * 4;
                this._control.updateGold(gold, false);
                if (PlayerMgr.Ins.Info.userLevel > 8) {
                    ViewMgr.Ins.open(ViewConst.OffLineRewardView, null, gold);
                } else {
                    MsgMgr.Ins.showMsg("获得离线奖励:" + MathUtil.unitConversion(gold));
                }
            }
        }
    }

    private onRenderSystem(cell: Laya.Box, index: number): void {
        if (index > this.list_btn.array.length) {
            return;
        }
        let btn: SystemBtn = cell.getChildByName("item") as SystemBtn;
        if (btn) {
            btn.dataSource = this.list_btn.array[index];
        }
    }

    /** 更新系统功能按钮 */
    private onUpdateSystemBtn(): void {
        this.initSystemBtn();
    }

    /** 商店红点 */
    private onUpdateShopRedPoint(): void {
        this.imgFree.visible = RedPointMgr.Ins.isShowShopRedPoint;
    }

    /** 显示英雄信息Tips */
    private showHeroTips(): void {
        if (this._heroTips == null) {
            this._heroTips = Laya.Pool.getItemByClass("HeroTips", HeroTips);
            this._heroTips.dataSource = this._currHeadItem;
            this._copyHeadItem.addChild(this._heroTips);
        }
    }

    /** 移除英雄信息Tips */
    private removeHeroTips(): void {
        this.clearTimer(this, this.showHeroTips);
        if (this._heroTips) {
            this._heroTips.removeTips();
            Laya.Pool.recover("HeroTips", this._heroTips);
            this._heroTips = null;
        }
    }

    /** 显示超越好友 */
    private showSurpassView(): void {
        // if (window["wx"]) {
        //     SDKMgr.Ins.wxSetUserCloudStorage();
        //     this.surpassView.postMsg({ message: "showSurpassFriend" });
        // }
    }

}