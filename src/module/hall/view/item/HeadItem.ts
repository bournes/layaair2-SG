import { ui } from "../../../../ui/layaMaxUI";
import GlobalData from "../../../../core_wq/db/GlobalData";
import HeroVO from "../../../../core_wq/db/vo/HeroVO";
import PathConfig from "../../../../core_wq/config/PathConfig";
import HeroConfigVO from "../../../../core_wq/db/vo/HeroConfigVO";
import Hero from "../../hero/Hero";
import HallControl from "../../HallControl";
import PlayerMgr from "../../../../core_wq/player/PlayerMgr";
import GuideMgr from "../../../../core_wq/guide/GuideMgr";
import EffectUtil from "../../../../core_wq/utils/EffectUtil";
import HallScene from "../HallScene";
import PoolMgr from "../../../../core_wq/msg/PoolMgr";

export default class HeadItem extends ui.moduleView.hall.item.HeadItemUI {

    private _info: { id: number, heroId: number, isRunning: boolean };
    private _heroVO: HeroVO;
    /** 战斗的英雄 */
    private _battleHero: Hero = null;
    /** 0空,1战斗中,2拖动,3宝箱 */
    private _stage: number = HEAD_ITEM_STAGE.IDLE;
    /** 是否上锁 */
    private _isLock: boolean = false;
    /** 英雄位置下标 */
    public heroIndex: number = -1;
    private _reviveTime: number = 0;
    public isDie: boolean = false;

    constructor() { super(); }

    set dataSource(value: any) {
        this._info = value;
        this.imgHead.visible = false;
        if (this._info && this._info.heroId > 0) {
            this.updateHeadSkin(this._info.heroId);
        }
    }

    /** 更新头像 */
    public updateHeadSkin(heroId: number, index: number = -1): void {
        this.boxLevel.visible = this.imgHead.visible = heroId > 0;
        this.imgLock.visible = heroId < 0;
        if (index >= 0) {
            this.heroIndex = index;
        }
        if (heroId > 0) {
            if (this._info) this._info.heroId = heroId;
            this._heroVO = GlobalData.getData(GlobalData.HeroVO, heroId);
            if (this._heroVO) {
                this.imgHead.skin = PathConfig.HEAD_PATH + this._heroVO.imgUrl;
                this.txt_level.text = this._heroVO.id + "";
            }
        }
    }

    /** 创建战斗中的英雄 */
    public createBattleHero(parentNode: HallScene, startPos: { x: number, y: number }): Hero {
        if (this._battleHero == null) {
            let hero = new Hero();
            hero.setCharacterBone(this._info.heroId);
            hero.pivot(41, 35);
            if (parentNode) {
                parentNode.addChild(hero);
                hero.pos(startPos.x, startPos.y);
                let heroInfo: HeroConfigVO = GlobalData.getData(GlobalData.HeroConfigVO, this._info.heroId);
                if (heroInfo) {
                    hero.setMoveSpeedRatio(heroInfo.speed);
                }
                this.timerOnce(500, this, () => {
                    hero.playMoveAction();
                })
            }
            this._battleHero = hero;
            this.hpBar.value = hero.hp / hero.maxHp;
            this.hpBar.visible = true;
            this.reviveBar.visible = false;
            this.reviveBar.value = 0;
        }
        return this._battleHero;
    }

    /** 更新血量 */
    public updateHp(value: number = 1) {
        if (GuideMgr.Ins.isGuide || this._battleHero == null) return;
        EffectUtil.playBoneEffect("hit_01", { x: this._battleHero.x, y: this._battleHero.y + 100 });
        this._battleHero.hp = this._battleHero.hp - value;
        this.hpBar.value = this._battleHero.hp / this._battleHero.maxHp;
        if (this.hpBar.value <= 0) {
            this.isDie = true;
            this._battleHero.IsInPosition = false;
            this._battleHero.visible = false;
            HallControl.Ins.setBattleHeroCount(PlayerMgr.Ins.Info.userRuncarCount - 1);
            this.hpBar.visible = false;
            this.reviveBar.visible = true;
            this.timerLoop(1000, this, this.heroReviveTime);
        }
    }

    private heroReviveTime(): void {
        this._reviveTime += 1;
        this.reviveBar.value = this._reviveTime / 6;
        if (this._reviveTime >= 6) {
            this.clearTimer(this, this.heroReviveTime);
            this.reviveBar.visible = false;
            this.reviveBar.value = 0;
            this._reviveTime = 0;
            if (this._battleHero) {
                EffectUtil.playBoneEffect("ui_born", { x: this._battleHero.x - 20, y: this._battleHero.y + 200 });
            }
            this.timerOnce(100, this, () => {
                if (this._battleHero) {
                    this._battleHero.hp = this._battleHero.maxHp;
                    this.hpBar.value = this._battleHero.maxHp;
                    this._battleHero.visible = true;
                    this._battleHero.IsInPosition = true;
                }
                this.hpBar.visible = true;
                HallControl.Ins.setBattleHeroCount(PlayerMgr.Ins.Info.userRuncarCount + 1);
                this.isDie = false;
            });
        }
    }

    /** 移除战斗中的英雄 */
    public removeBattleHero(): void {
        if (this._battleHero) {
            this._battleHero.removeEnemy();
            this._battleHero.removeSelf();
            Laya.Pool.recover("bone" + this._battleHero.heroId, this._battleHero.heroBone);
            this._battleHero = null;
        }
    }

    /** 获取战斗中的英雄 */
    public get BattleHero(): Hero {
        return this._battleHero;
    }

    /** 设置战斗中的英雄 */
    public set BattleHero(battleHero: Hero) {
        this._battleHero = battleHero;
    }

    /** 英雄出售价格 */
    public getSellPrice(): number {
        if (this._heroVO) {
            let heroConfigVO: HeroConfigVO = GlobalData.getData(GlobalData.HeroConfigVO, this._heroVO.id);
            if (heroConfigVO) return heroConfigVO.buyPrice * 0.8;
        }
        return 0;
    }

    /** 重置 */
    public reset(): void {
        if (this._info) this._info.heroId = 0;
        if (this._heroVO) this._heroVO = null;
        this.hpBar.visible = false;
        this.reviveBar.visible = false;
        this.hpBar.value = 1;
        this.reviveBar.value = 0;
        this.updateHeadSkin(0);
        this.setStage(0);
        this.removeBattleHero();
    }

    /** 设置锁 */
    public setLock(isLock: boolean): void {
        this._isLock = this.imgLock.visible = isLock;
    }

    /** 0空,1战斗中,2拖动,3宝箱 */
    public setStage(stage: number): void {
        if (this._isLock) return;
        this._stage = stage;
    }

    /** 是否在战斗中 */
    public get IsBattle(): boolean {
        return this._stage == HEAD_ITEM_STAGE.BATTLE;
    }

    /** 是否闲置 */
    public get IsEmpty(): boolean {
        return this._stage <= HEAD_ITEM_STAGE.IDLE;
    }

    /** 是否宝箱 */
    public get IsBox(): boolean {
        return this._stage == HEAD_ITEM_STAGE.BOX;
    }

    /** 是否上锁 */
    public get IsLock(): boolean {
        return this._isLock;
    }

    /** 0空,1战斗中,2拖动,3宝箱 */
    get HeroStage(): number { return this._stage; }
    get Info(): { id: number, heroId: number, isRunning: boolean } { return this._info; }
    public get heroVO(): HeroVO {
        return this._heroVO;
    }
}

enum HEAD_ITEM_STAGE {
    /** 空闲 */
    IDLE = 0,
    /** 战斗中 */
    BATTLE,
    /** 拖动 */
    DROP,
    /** 宝箱 */
    BOX
}