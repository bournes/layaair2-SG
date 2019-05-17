import HallModel from "./model/HallModel";
import HeroConfigVO from "../../core_wq/db/vo/HeroConfigVO";
import GlobalData from "../../core_wq/db/GlobalData";
import HeadItem from "./view/item/HeadItem";
import LevelVO from "../../core_wq/db/vo/LevelVO";
import PlayerMgr from "../../core_wq/player/PlayerMgr";
import EventsMgr from "../../core_wq/event/EventsMgr";
import EventType from "../../core_wq/event/EventType";
import HallScene from "./view/HallScene";
import PlayerInfo from "../../core_wq/player/data/PlayerInfo";
import MathUtil from "../../core_wq/utils/MathUtil";
import MsgMgr from "../../core_wq/msg/MsgMgr";
import StorageUtil from "../../core_wq/utils/StorageUtil";
import Hero from "./hero/Hero";
import SoundMgr from "../../core_wq/sound/SoundMgr";
import SoundType from "../../core_wq/sound/SoundType";
import ShareMgr from "../../core_wq/msg/ShareMgr";
import ViewMgr from "../../core_wq/view/ViewMgr";
import ViewConst from "../../core_wq/view/const/ViewConst";
import EffectUtil from "../../core_wq/utils/EffectUtil";
import GuideMgr from "../../core_wq/guide/GuideMgr";
import MapVO from "../../core_wq/db/vo/MapVO";
import SystemVO from "../../core_wq/db/vo/SystemVO";

export default class HallControl extends Laya.Script {

    private _model: HallModel;
    private _hallScene: HallScene;
    /** 兵营满席动画 */
    private _battleHeroTimeLine: Laya.TimeLine = null;
    private _battleHeroIndex: number = 0;
    private _startPos: { x: number, y: number };

    constructor() {
        super();
        this.initModel();
    }
    onAwake() {
        this.initModel();
    }

    private initModel(): void {
        if (this._model == null) {
            this._model = new HallModel();
        }
    }

    /** 购买英雄 */
    public buyHero(heroInfo: HeroConfigVO): void {
        if (heroInfo) {
            let buyPrice: number = this._model.getHeroBuyPrice(heroInfo.buyPrice, this._model.queryBuyHeroRecord(heroInfo.id));
            if (PlayerMgr.Ins.Info.userGold >= buyPrice) {
                if (this.createHero(heroInfo.id) == null) return;
                this.updateGold(PlayerMgr.Ins.Info.userGold - buyPrice);
                this._model.refreshBuyHeroRecord(heroInfo.id);
                buyPrice = this._model.getHeroBuyPrice(heroInfo.buyPrice, this._model.queryBuyHeroRecord(heroInfo.id));
                this.hallScene.txt_price.text = MathUtil.unitConversion(buyPrice);
                this.hallScene.frameOnce(1, this.hallScene, () => { this.sortHero(); });//英雄排序
            } else {
                if (ShareMgr.Ins.isShareEnable && (ShareMgr.Ins.getAdTimes(12) > 0 || ShareMgr.Ins.getShareTimes(12) > 0)) {
                    ViewMgr.Ins.open(ViewConst.GoldNotEnoughView);
                } else {
                    MsgMgr.Ins.showMsg("很抱歉，铜钱不足");
                }
            }
        }
    }

    /** 创建英雄 */
    public createHero(id: number, isBackward: boolean = false): HeadItem {
        for (let index = 0; index < this._model.allHeroCount; index++) {
            let curIndex = index;
            if (isBackward) {
                curIndex = this._model.allHeroCount - index - 1;
            }
            let cell = this.hallScene.lists_head.getCell(index);
            if (cell) {
                let headItem: HeadItem = cell.getChildByName("hero") as HeadItem;
                if (headItem && headItem.IsEmpty && !headItem.IsLock && !headItem.IsBox) {
                    headItem.Info.heroId = id;
                    headItem.updateHeadSkin(id, curIndex);
                    headItem.setStage(1);
                    //设置战斗中的英雄
                    this._battleHeroIndex++;
                    this._startPos = {
                        x: MathUtil.rangeInt(10, 50) + this.hallScene.width * 0.5 * Math.random(),
                        y: this.hallScene.beginEventView.y + MathUtil.rangeInt(-150, 200)
                    };
                    EffectUtil.playBoneEffect("ui_born", { x: this._startPos.x - 20, y: this._startPos.y + 200 });
                    if (this._battleHeroIndex >= this.hallScene.lists_head.array.length) {
                        this._battleHeroIndex = 0;
                    }
                    this._model.heroCount += 1;
                    this.hallScene.timerOnce(100, this.hallScene, () => {
                        this.createHeroBone(headItem, this._startPos);
                        this.setBattleHeroCount(PlayerMgr.Ins.Info.userRuncarCount + 1);
                        SoundMgr.Ins.playEffect(SoundType.SUMMON_HERO);
                        this.setSaveHeroData(headItem);
                        GuideMgr.Ins.onNextStep();
                    });
                    return headItem;
                }
            }
        }
        if (!isBackward) {
            MsgMgr.Ins.showMsg("兵营不足,快去合成武将哟!");
        }
        return null;
    }

    /** 创建英雄龙骨动画 */
    public createHeroBone(headItem: HeadItem, startPos: { x: number, y: number }): void {
        headItem.removeBattleHero();
        headItem.createBattleHero(this.hallScene, startPos);
        this._model.is_reset_zorder = true;
        if (this._model.userAcceValue > 1) {
            headItem.BattleHero.setMoveAccelerate(this._model.userAcceValue);
        }
    }

    /** 设置格子是否锁 */
    public setCellIsLock(lockIndex: number): void {
        for (let index = 0; index < this._model.allHeroCount; index++) {
            let cell = this.hallScene.lists_head.getCell(index);
            if (cell) {
                let headItem: HeadItem = cell.getChildByName("hero") as HeadItem;
                if (headItem) {
                    headItem.setLock(index >= lockIndex);
                }
            }
        }
    }

    /** 设置用户等级 */
    public setUserLevel(level: number): void {
        PlayerMgr.Ins.Info.userLevel = level;
        EventsMgr.Ins.dispatch(EventType.UPDATE_USER_LEVEL);
        EventsMgr.Ins.dispatch(EventType.UPDATE_SYSTEM_BTN);
        this.refreshUserData();
    }

    /** 刷新用户相关数据 */
    private refreshUserData(): void {
        let levelVO: LevelVO = GlobalData.getData(GlobalData.LevelVO, PlayerMgr.Ins.Info.userLevel);
        if (levelVO) {
            this.setCellIsLock(levelVO.openCellCount);
            this.setBattleHeroCountMax(levelVO.battleCount);
        }
    }

    /** 设置用户经验 */
    public setUserExp(upExp: number): void {
        PlayerMgr.Ins.Info.userExp = upExp;
        let upNeedexp: number = 0;
        let nextLevel: number = PlayerMgr.Ins.Info.userLevel + 1;
        let levelVO: LevelVO = GlobalData.getData(GlobalData.LevelVO, nextLevel);
        if (levelVO) {
            upNeedexp = levelVO.upNeedexp;
            let exp = PlayerMgr.Ins.Info.userExp - upNeedexp;
            if (exp >= 0) {
                this.setUserLevel(nextLevel);
                PlayerMgr.Ins.Info.userLevelExtraIncome = 1 + levelVO.extraProduce;
                if (levelVO.goldGift > 0) { //等级奖励
                    ViewMgr.Ins.open(ViewConst.LevelRewardView, null, levelVO);
                } else {
                    MsgMgr.Ins.showMsg("主人,恭喜您升级了!");
                    SoundMgr.Ins.playEffect(SoundType.UPGRADE_HERO);
                }
                this.setUserExp(exp);
                this.updateMapData(true);
            }
            EventsMgr.Ins.dispatch(EventType.UPDATE_USER_EXP, upNeedexp);
        }
    }

    /** 更新地图数据 */
    public updateMapData(isUpLevel: boolean = false): void {
        //更新城池名字
        let mapVO: MapVO = GlobalData.getData(GlobalData.MapVO, PlayerMgr.Ins.Info.userLevel);
        if (mapVO) {
            this._hallScene.txt_mapName.text = mapVO.name;
        }
    }

    /** 刷新每秒金币收益 */
    public refreshIncomeSec(): void {
        let incomePerSec = 0;
        for (let index = 0; index < this._model.allHeroCount; index++) {
            let cell = this.hallScene.lists_head.getCell(index);
            if (cell) {
                let headItem: HeadItem = cell.getChildByName("hero") as HeadItem;
                if (headItem) {
                    incomePerSec += this.getHeroIncomeSecGold(headItem.Info.heroId) * PlayerMgr.Ins.Info.userExtraIncome * PlayerMgr.Ins.Info.userAcceValue * PlayerMgr.Ins.Info.userLevelExtraIncome;
                }
            }
        }
        EventsMgr.Ins.dispatch(EventType.UPDATE_INCOME, incomePerSec);
    }

    /**
     * 更新金币
     * @param gold 金币数量
     * @param isTotal true:是否直接替换金额  false:差额
     */
    public updateGold(gold: number, isTotal: boolean = true): void {
        EventsMgr.Ins.dispatch(EventType.UPDATE_CURRENCY, PlayerInfo.GOLD, gold, isTotal);//更新用户获得金币
        this.hallScene.updateRecruitData();
    }

    /** 更新英雄等级 */
    public updateHeroLevel(level: number): boolean {
        if (this._model.heroLevel < this._model.heroMaxLevel) {
            if (this._model.heroLevel < level) {
                this._model.heroLevel = level;
                Laya.timer.callLater(this, StorageUtil.saveStorageToLocal, [true]);
                return true;
            }
        } else {
            MsgMgr.Ins.showMsg("已达到最高级了耶!");
        }
        return false;
    }

    /** 获取英雄合成经验 */
    public getHeroExp(heroId: number): number {
        let heroConfig: HeroConfigVO = GlobalData.getData(GlobalData.HeroConfigVO, heroId);
        if (heroConfig) {
            return heroConfig.syntheticExp;
        }
        return 0;
    }

    /** 获取英雄每秒产出金币 */
    public getHeroIncomeSecGold(heroId: number): number {
        let heroConfig: HeroConfigVO = GlobalData.getData(GlobalData.HeroConfigVO, heroId);
        if (heroConfig) {
            return heroConfig.PerSecCoin;
        }
        return 0;
    }

    /** 获取英雄一共的收益金币 */
    public getHeroIncomeTotalGold(heroId: number): number {
        let heroConfig: HeroConfigVO = GlobalData.getData(GlobalData.HeroConfigVO, heroId);
        if (heroConfig) {
            return heroConfig.totalCoin;
        }
        return 0;
    }

    /** 是否新手 */
    public get IsGuide(): boolean {
        return this._model.heroLevel < 3;
    }

    /** 是否被点击 */
    public isHit(checkObj: Laya.Sprite, extW: number = 0, extH: number = 0) {
        if (checkObj) {
            let touchPos: Laya.Point = checkObj.getMousePoint();
            let touchArea: Laya.Rectangle = new Laya.Rectangle(0 - extW / 2, 0 - extH / 2,
                checkObj.width + extW, checkObj.height + extH);
            return touchArea.contains(touchPos.x, touchPos.y);
        }
        return false;
    }

    /** 英雄按等级排序 */
    public sortHero(): void {
        let heroSortList = [];
        for (var index = 0; index < this._model.allHeroCount; index++) {
            let cell = this.hallScene.lists_head.getCell(index);
            if (cell) {
                let headItem: HeadItem = cell.getChildByName("hero") as HeadItem;
                if (headItem && !headItem.IsEmpty && !headItem.IsBox && !headItem.IsLock) {
                    let heroData = {
                        heroId: headItem.Info.heroId,
                        heroStage: headItem.HeroStage,
                        battleHero: headItem.BattleHero,
                        currHp: headItem.hpBar.value
                    };
                    if (index < 1) {
                        heroSortList.push(heroData)
                    } else {
                        let maxCount = heroSortList.length;
                        let maxIndex = maxCount;
                        for (var j = 0; j < maxCount; j++) {
                            if (heroSortList[j] && heroSortList[j].heroId < headItem.Info.heroId) {
                                maxIndex = j;
                                break;
                            }
                        }
                        heroSortList.splice(maxIndex, 0, heroData);
                    }
                }
            }
        }
        let heroIndex: number = 0;
        for (var index = 0; index < this._model.allHeroCount; index++) {
            let cell = this.hallScene.lists_head.getCell(index);
            if (cell) {
                let headItem: HeadItem = cell.getChildByName("hero") as HeadItem;
                if (headItem && !headItem.IsBox && !headItem.IsLock) {
                    if (heroIndex >= heroSortList.length) {
                        headItem.reset();
                    } else {
                        let heroData = heroSortList[heroIndex];
                        headItem.updateHeadSkin(heroData.heroId);
                        headItem.setStage(heroData.heroStage);
                        if (headItem.BattleHero == null) {
                            headItem.BattleHero = heroData.battleHero;
                            headItem.hpBar.value = heroData.currHp;
                            headItem.hpBar.visible = true;
                        }
                        heroIndex++;
                    }
                    this.setSaveHeroData(headItem);
                }
            }
        }
    }

    /** 设置英雄数据并保存 */
    public setSaveHeroData(headItemOne: HeadItem, headItemTwo: HeadItem = null): void {
        for (let key in this._model.AllHeros) {
            let element = this._model.AllHeros[key];
            if (headItemOne) {
                if (element && element.id == headItemOne.heroIndex) {
                    element.heroId = headItemOne.Info.heroId;
                }
            }
            //交换车辆
            if (headItemTwo) {
                if (element && element.id == headItemTwo.heroIndex) {
                    element.heroId = headItemTwo.Info.heroId;
                }
            }
        }
        Laya.timer.callLater(this, StorageUtil.saveStorageToLocal, [true]);
    }

    /** 设置战斗英雄的数量 */
    public setBattleHeroCount(value: number): void {
        PlayerMgr.Ins.Info.userRuncarCount = value;
        this.refreshBattleHeroCount();
        this.refreshIncomeSec();
        SoundMgr.Ins.playEffect(SoundType.ENTER_GAME);
    }

    /** 设置战斗英雄的最大数量 */
    public setBattleHeroCountMax(value: number): void {
        PlayerMgr.Ins.Info.userRuncarCountMax = value;
        this.refreshBattleHeroCount();
    }

    /** 刷新战斗中英雄数量 */
    public refreshBattleHeroCount(): void {
        if (PlayerMgr.Ins.Info.userRuncarCount < PlayerMgr.Ins.Info.userRuncarCountMax) {
            PlayerMgr.Ins.Info.userExtraIncome = 1;
            this.hallScene.txt_battleCount.text = PlayerMgr.Ins.Info.userRuncarCount + "/" + PlayerMgr.Ins.Info.userRuncarCountMax;
        } else {
            PlayerMgr.Ins.Info.userExtraIncome = 1.1;
            this.hallScene.txt_battleCount.text = "+10%";
        }
        //跑道已满效果
        if ((PlayerMgr.Ins.Info.userRuncarCount < PlayerMgr.Ins.Info.userRuncarCountMax)) {
            this.hallScene.imgBattleCount.skin = "images/hall/game_running_num1.png";
            this.hallScene.txt_battleCount.y = 3;
            this.hallScene.txt_battleCount.color = "#000000";
            //停止缩放
            if (this._battleHeroTimeLine) {
                this._battleHeroTimeLine.pause();
                this.hallScene.imgBattleCount.scale(1, 1);
            }
        } else {
            this.hallScene.imgBattleCount.skin = "images/hall/game_running_num2.png";
            this.hallScene.txt_battleCount.y = 25;
            this.hallScene.txt_battleCount.color = "#b11a1a";
            //开始缩放动画
            if (this._battleHeroTimeLine == null) {
                this._battleHeroTimeLine = new Laya.TimeLine();
                this._battleHeroTimeLine.addLabel("scale1", 0).to(this.hallScene.imgBattleCount, { scaleX: 0.9, scaleY: 0.9 }, 300)
                    .addLabel("scale2", 100).to(this.hallScene.imgBattleCount, { scaleX: 1, scaleY: 1 }, 300);
            }
            this._battleHeroTimeLine.play(0, true);
        }
        this.hallScene.imgBattleGold.visible = !(PlayerMgr.Ins.Info.userRuncarCount < PlayerMgr.Ins.Info.userRuncarCountMax);
        this.hallScene.imgBattleGold.x = 92;
        this.hallScene.imgBattleGold.y = 21;
        this.hallScene.imgBattleCount.alpha = 0.9;
    }

    /** 设置战斗英雄加速效果 */
    public setBattleHeroAcce(accValue: number): void {
        this._model.userAcceValue = accValue;
        for (var index = 0; index < this._model.allHeroCount; index++) {
            let cell = this.hallScene.lists_head.getCell(index);
            if (cell) {
                let headItem: HeadItem = cell.getChildByName("hero") as HeadItem;
                if (headItem && headItem.HeroStage == 1) {
                    let battleHero: Hero = headItem.BattleHero;
                    if (battleHero) {
                        battleHero.setMoveAccelerate(this._model.userAcceValue);
                    }
                }
            }
        }
        this.refreshIncomeSec();
    }

    /** 获取功能开放列表 */
    public getSystemBtnList(): SystemVO[] {
        let datas: SystemVO[] = GlobalData.getDataByCondition(GlobalData.SystemVO, (item: SystemVO) => {
            return PlayerMgr.Ins.Info.userLevel >= item.openLevel;
        });
        if (datas && datas.length > 0) {
            datas.sort((item1: SystemVO, item2: SystemVO) => item1.sort - item2.sort);
            return datas;
        }
        return null;
    }

    set Model(value: HallModel) { this._model = value; }
    get Model(): HallModel { return this._model; }

    set hallScene(value: HallScene) {
        this._hallScene = value;
    }
    get hallScene(): HallScene {
        return this._hallScene;
    }

    private static _instance: HallControl;
    public static get Ins(): HallControl {
        if (HallControl._instance == null) {
            HallControl._instance = new HallControl();
        }
        return HallControl._instance;
    }
}