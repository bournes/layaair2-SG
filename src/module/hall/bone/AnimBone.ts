export default class AnimBone extends Laya.Sprite {

    public completeBack: Function;

    private _bone: Laya.Skeleton = null;
    /** 骨骼动画模板 */
    private _spineFactory: Array<Laya.Templet> = [];
    private _keyName: string = "Rosefinch";
    private _attackKey: string = "attack";
    private _dieKey: string = "death";
    private _standKey: string = "stand";
    private _isLoop: boolean = false;

    constructor() {
        super();
    }

    public createBone(path: string, isLoop: boolean = true, playName: string = "stand"): void {
        this._bone = Laya.Pool.getItemByClass(this._keyName, Laya.Skeleton);
        if (this._bone.name != this._keyName) {
            this._isLoop = isLoop;
            this.createSpineTemplate(path, (spineFactory: Laya.Templet) => {
                this._bone = spineFactory.buildArmature(0);
                this._bone.name = this._keyName;
                this._bone.zOrder = 1;
                this.addChild(this._bone);
                this._bone.pos(50, 140);
                this._bone.play(playName, isLoop);
                this._bone.on(Laya.Event.STOPPED, this, this.onAnimComplete);
            });
        } else {
            this.addChild(this._bone);
            this._bone.play(playName, isLoop);
            this._bone.on(Laya.Event.STOPPED, this, this.onAnimComplete);
        }
    }

    /** 创建动画模版 */
    private createSpineTemplate(url: string, parseComplete: any) {
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
    /**
     * 执行动画动作
     * @param playName 需要动画执行的动画名字，如果为空就走状态
     * @param isLoop 是否循环
     * @param state 1：攻击 2：死亡 3：站立
     */
    public playAnimation(playName: string = "", isLoop: boolean = false, state: number = 1): void {
        this._isLoop = isLoop;
        if (playName == "") {
            if (state == 1) {
                if (this._bone && this._bone.name != "") this._bone.play(this._attackKey, isLoop);
            } else if (state == 2) {
                if (this._bone && this._bone.name != "") {
                    this._bone.play(this._dieKey, isLoop);
                }
            } else {
                if (this._bone && this._bone.name != "") this._bone.play(this._standKey, isLoop);
            }
        } else {
            if (this._bone && this._bone.name != "") this._bone.play(playName, isLoop);
        }
    }

    private onAnimComplete(): void {
        if (this._bone && !this._isLoop) {
            this.completeBack && this.completeBack(this._bone.getAniNameByIndex(0));
        }
    }

    public removeBone(isDestroy: boolean = false): void {
        if (this._bone) {
            this._bone.off(Laya.Event.COMPLETE, this, this.onAnimComplete);
            this._bone.stop();//停止龙骨动画播放
            this._bone.removeSelf();
            if (isDestroy) {
                this._bone.removeChildren();//从显示列表移除龙骨动画子对象
                this._bone.destroy(true);//从显存销毁龙骨动画及其子对象
            } else {
                Laya.Pool.recover(this._keyName, this._bone);
            }
            this._bone = null;
        }
    }

}