import BaseCharacter from "./base/BaseCharacter";
import GlobalData from "../../../core_wq/db/GlobalData";
import HeroVO from "../../../core_wq/db/vo/HeroVO";
import PathConfig from "../../../core_wq/config/PathConfig";
import EffectUtil from "../../../core_wq/utils/EffectUtil";
import HeroConfigVO from "../../../core_wq/db/vo/HeroConfigVO";
import PointUtils from "../../../core_wq/utils/PointUtils";
import MathUtil from "../../../core_wq/utils/MathUtil";
import ItemExplode from "../../../core_wq/effect/ItemExplode";

export default class Hero extends BaseCharacter {

    public heroId: number = 0;
    public hp: number = 6;
    public maxHp: number = 6;
    private _heroVO: HeroVO;
    /** 是否显示自白 */
    private _isShowDialogue: boolean = false;
    /** 自白列表 */
    private _dialogueList: Array<string> = [];
    /** 英雄模型路径 */
    private _heroPath: string = '';
    /** 坐骑模型路径 */
    private _horsePath: string = '';

    private _heroBone: Laya.Skeleton = null;
    private _horseBone: Laya.Skeleton = null;
    /** 攻击动画key */
    private _atkAnimKey: string = 'attack';
    private _walkKey: string = "walk";
    private _heroKey: string = "hero_key";
    private _horseKey: string = "horse_key";
    /** 骨骼动画模板 */
    private _spineFactory: Array<Laya.Templet> = [];
    private _enemyData: any = null;
    private _enemyModelUrlArray: Array<any> = [
        { id: "enemy_1", heroUrl: "images/boneAnim/enemy/bubinglv.sk", horseUrl: "" },
        { id: "enemy_2", heroUrl: "images/boneAnim/enemy/gongbinglv.sk", horseUrl: "" },
        { id: "enemy_3", heroUrl: "images/boneAnim/enemy/qibinglv.sk", horseUrl: "images/boneAnim/horse/shibingzuoqi.sk" },
    ]; //敌军模型

    constructor() { super(); }

    /** 设置人物龙骨 */
    public setCharacterBone(id: number): void {
        super.setCharacterBone(id);
        this.heroId = id;
        this._heroVO = GlobalData.getData(GlobalData.HeroVO, this.heroId);
        if (this._heroVO) {
            //设置独白
            this._dialogueList = [this._heroVO.dialogue];
            this._atkAnimKey = this._heroVO.atkAnimKey;
            //移除老模型
            this.removeChildByName(this._heroKey);
            this.removeChildByName(this._horseKey);
            this.state = -1;
            this.createHeroBone();

        }
    }

    /** 创建英雄龙骨动画 */
    private createHeroBone(): void {
        this._heroPath = this._heroVO.modelImgUrl;
        if (this._heroPath && this._heroPath.length > 0) {
            this._heroPath = PathConfig.BONE_PATH.replace("{0}", this._heroPath);
        }
        this._heroBone = Laya.Pool.getItemByClass("bone" + this.heroId, Laya.Skeleton);
        if (this._heroBone.name != (this._heroKey + this.heroId)) {
            if (this._heroPath && this._heroPath.length > 0) {
                this.createSpineTemplate(this._heroPath, (spineFactory: Laya.Templet) => {
                    this._heroBone = spineFactory.buildArmature(0);
                    this._heroBone.name = this._heroKey + this.heroId;
                    this._heroBone.zOrder = 1;
                    this._heroBone.playbackRate(0.7);
                    this.addChild(this._heroBone);
                    this._heroBone.pos(50, 140);
                    if (this._horsePath == null || this._horsePath.length < 1) {//没坐骑,坐标下调
                        this._heroBone.y += 50;
                    }
                    this._heroBone.play(this._walkKey, true);
                });
            }
        } else {
            this.addChild(this._heroBone);
            this._heroBone.play(this._walkKey, true);
        }
    }

    /** 创建坐骑龙骨动画 */
    private createHorseBone(): void {
        this._horsePath = this._heroVO.horse == "0" ? "" : this._heroVO.horse;
        if (this._horsePath && this._horsePath.length > 0) {
            this._horsePath = PathConfig.BONE_PATH.replace("{0}", this._horsePath);
        }
        this._horseBone = Laya.Pool.getItemByClass("horse_bone" + this.heroId, Laya.Skeleton);
        if (this._horseBone.name != (this._horseKey + this.heroId)) {
            if (this._horsePath && this._horsePath.length > 0) {
                this.createSpineTemplate(this._horsePath, (_spineFactory: Laya.Templet) => {
                    this._horseBone = _spineFactory.buildArmature(0);
                    this._horseBone.name = this._horseKey + this.heroId;
                    this._horseBone.playbackRate(0.7);
                    this.addChild(this._horseBone);
                    this._horseBone.pos(50, 140);
                    this._horseBone.play(this._walkKey, true);
                });
            }
        } else {
            this.addChild(this._horseBone);
            this._horseBone.play(this._walkKey, true);
        }
    }

    /** 动画播放状态 */
    public playAnimation(state: number = 0, callback: any = null): void {
        if (this.state == state) return;
        this.state = state;
        if (this.state == 1) {
            //自动切回步行
            this.timerOnce(180, this, () => {
                this.playAnimation(0);
            });
            if (this._heroBone && this._heroBone.name != "") this._heroBone.play(this._atkAnimKey, false);
        } else {
            if (this._heroBone && this._heroBone.name != "") this._heroBone.play(this._walkKey, true);
        }
    }

    /** 创建动画模版 */
    public createSpineTemplate(url: string, parseComplete: any) {
        if (url == null) return;
        let spineFactory = this._spineFactory[url];
        if (spineFactory == null) {
            spineFactory = new Laya.Templet();
            spineFactory.on(Laya.Event.COMPLETE, this, () => {
                parseComplete && parseComplete(spineFactory);
                this._spineFactory[url] = spineFactory;
            });
            spineFactory.loadAni(url);
        } else {
            parseComplete && parseComplete(spineFactory);
        }
    }

    /** 刷新收益时间 */
    public refreshIncomeTime(actCallback: any = null): boolean {
        if (this.incomeTime > 0) {
            this.incomeTime -= 1 / this.moveAccelerate;
            //人物自白
            if (this._isShowDialogue == false && (this.incomeTime > 90 && this.incomeTime < 91)) {
                let dialogueIndex: number = Math.floor(Math.random() * 10) % (this._dialogueList.length);
                let dialogueText = this._dialogueList[dialogueIndex] as string;
                if (Math.random() < 0.1 && dialogueText) {
                    this._isShowDialogue = true;
                    let isFlipX: boolean = this.x > Laya.stage.width * 0.8;
                    let txtPos = { x: this.width / 2, y: 50 };
                    //适配大将军
                    if (isFlipX == false) {
                        txtPos.x += 50;
                        if (this._horsePath == null || this._horsePath.length < 1) {
                            txtPos.y += 60;
                        }
                    }
                    EffectUtil.playDialogueEffect(this, "images/component/game_dialogue_frame.png", dialogueText, txtPos, 1, isFlipX);
                }
            }
        } else {
            this.delayMoveTime = 50; //停止动画
            this.setIncomeTime();   //重置收益
            this._isShowDialogue = false;
            Laya.Tween.to(this, { x: (this.orginalX + 180) }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                Laya.Tween.clearTween(this);
                this.playAnimation(1);
                actCallback && actCallback();
                Laya.Tween.to(this, { x: this.orginalX }, Math.abs(this.x - this.orginalX) * 15, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                    Laya.Tween.clearTween(this);
                }))
            }));
            return true;
        }
        return false;
    }

    /** 创建攻击对象 */
    public createAttackTarget(parentNode: Laya.Node, startPos: Laya.Point): BaseCharacter {
        if (this.attackSprite == null) {
            let hero = new Hero();
            hero.size(100, 100);
            hero.pivot(50, 50);
            hero.scaleX = -1;
            this._enemyData = this._enemyModelUrlArray[Math.floor(Math.random() * 10) % this._enemyModelUrlArray.length];
            let animName: string = 'walk';
            let isLoop: boolean = true;
            let frameRate: number = 0.7;
            let enemy = Laya.Pool.getItemByClass(this._enemyData.id, Laya.Skeleton);
            if (enemy.name != this._enemyData.id) {
                if (this._enemyData.heroUrl != "") {
                    this.createSpineTemplate(this._enemyData.heroUrl, (_spineFactory: Laya.Templet) => {
                        enemy = _spineFactory.buildArmature(0);
                        enemy.name = this._enemyData.id;
                        enemy.zOrder = 1;
                        enemy.playbackRate(frameRate);
                        hero.addChild(enemy);
                        enemy.pos(50, 200);
                        if (this._enemyData.horseUrl != "") {//有坐骑,坐标下调
                            enemy.y -= 50;
                        }
                        enemy.play(animName, isLoop);
                    });
                }
            } else {
                hero.addChild(enemy);
                enemy.play(animName, isLoop);
            }
            //敌人坐骑
            let enemyHorse = hero.getChildByName(this._horseKey) as Laya.Skeleton;
            if (enemyHorse == null) {
                if (this._enemyData.horseUrl != "") {
                    this.createSpineTemplate(this._enemyData.horseUrl, (_spineFactory: Laya.Templet) => {
                        enemyHorse = _spineFactory.buildArmature(0);
                        enemyHorse.name = this._horseKey;
                        enemyHorse.playbackRate(frameRate);
                        hero.addChild(enemyHorse);
                        enemyHorse.pos(50, 150);
                        enemyHorse.play(animName, isLoop);
                    });
                }
            } else {
                enemyHorse.play(animName, isLoop);
            }
            if (parentNode) {
                parentNode.addChild(hero);
                hero.pos(startPos.x, startPos.y);
                let heroInfo: HeroConfigVO = GlobalData.getData(GlobalData.HeroConfigVO, this.heroId);
                if (heroInfo) {
                    hero.setMoveSpeedRatio(heroInfo.speed);
                }
                hero.zOrder = Math.floor(hero.y);
            }
            this.attackSprite = hero;
        }
        return this.attackSprite;
    }

    /** 移除敌人 */
    public removeEnemy(isKill: boolean = false): void {
        if (this.attackSprite) {
            if (isKill) {
                let heroSp = this.attackSprite.getChildByName(this._enemyData.id) as Laya.Skeleton;
                if (heroSp) heroSp.stop();
                let horseSp = this.attackSprite.getChildByName(this._horseKey) as Laya.Skeleton;
                if (horseSp) horseSp.stop();
                //渐隐
                let targetPos: any = PointUtils.localToGlobal(this.attackSprite);
                EffectUtil.playBoneEffect("ui_hit_03", { x: targetPos.x, y: targetPos.y + 100 });
                let explode = new ItemExplode();
                if (this.attackSprite && this.attackSprite.parent && explode) {
                    this.attackSprite.parent.addChild(explode.play(this.attackSprite.x, this.attackSprite.y + 100).scale(0.8, 0.8));
                }
                this.frameLoop(1, this, this.onRemoveEnemyFly);
            } else {
                let enemy = this.attackSprite.getChildByName(this._enemyData.id);
                if (enemy) Laya.Pool.recover(this._enemyData.id, enemy);
                this.attackSprite.removeSelf();
                this.attackSprite = null;
            }
        }
    }

    private onRemoveEnemyFly(): void {
        if (this.attackSprite) {
            this.attackSprite.rotation += 7;
            this.attackSprite.x += MathUtil.rangeInt(5, 20);
            this.attackSprite.y -= MathUtil.rangeInt(5, 10);
            if (this.attackSprite.y <= -this.attackSprite.height) {
                this.clearTimer(this, this.onRemoveEnemyFly);
                this.attackSprite.removeSelf();
                let enemy = this.attackSprite.getChildByName(this._enemyData.id);
                if (enemy) Laya.Pool.recover(this._enemyData.id, enemy);
                this.attackSprite = null;
            }
        }
    }

    public get heroKey(): string {
        return this._heroKey;
    }

    public get heroBone(): Laya.Skeleton {
        return this._heroBone;
    }
}