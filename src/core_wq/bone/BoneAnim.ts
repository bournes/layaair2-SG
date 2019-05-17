import PathConfig from "../config/PathConfig";

/** 龙骨动画 */
export default class BoneAnim extends Laya.Sprite {

    public completeBack: Function;

    private _aniPath: string;
    private _factory: Laya.Templet;
    private _armature: Laya.Skeleton;
    private _currIndex: number = 0;
    private _isLoop: boolean = false;

    constructor(boneName: string, isLoop: boolean = false, isHeroBone: boolean = false) {
        super();
        this._isLoop = isLoop;
        if (isHeroBone) {
            this._aniPath = PathConfig.BONE_PATH.replace("{0}", boneName);
        } else {
            this._aniPath = "images/boneAnim/common/" + boneName + ".sk";
        }
        this._factory = new Laya.Templet();
        this.addEvents();
        this._factory.loadAni(this._aniPath);
    }

    private addEvents(): void {
        this._factory.on(Laya.Event.COMPLETE, this, this.parseComplete);
        this._factory.on(Laya.Event.ERROR, this, this.onError);
    }

    private removeEvents(): void {
        this._factory.off(Laya.Event.COMPLETE, this, this.parseComplete);
        this._factory.off(Laya.Event.ERROR, this, this.onError);
        this._armature.off(Laya.Event.STOPPED, this, this.completeHandler);
    }

    private onError(): void {
        console.log("@David 龙骨动画路径：" + this._aniPath + " - 创建失败！");
    }

    private parseComplete(): void {
        if (Laya.loader.getRes(this._aniPath)) {
            this._armature = this._factory.buildArmature(0);
            this.addChild(this._armature);
            this._armature.on(Laya.Event.STOPPED, this, this.completeHandler);
            this._armature.play(0, this._isLoop);
        } else {
            this.destroy();
        }
    }

    private completeHandler(): void {
        if (this._armature && !this._isLoop) {
            this.completeBack && this.completeBack();
        }
    }

    public play(playName: any = 0, isLoop: boolean = false): void {
        if (this._armature) {
            this._armature.play(playName, this._isLoop);
        }
    }

    public destroy(): void {
        if (this._armature) {
            this.removeEvents();
            this._armature.stop();//停止龙骨动画播放
            this._armature.removeSelf();//从显示列表移除龙骨动画本身
            this._armature.removeChildren();//从显示列表移除龙骨动画子对象
            this._armature.destroy(true);//从显存销毁龙骨动画及其子对象
            this._armature = null;
            this._factory.destroy();//释放动画模板类下的纹理数据
            this.removeChildren();
            this.removeSelf();
        }
    }

    public get armature(): Laya.Skeleton {
        return this._armature;
    }
    public set armature(value: Laya.Skeleton) {
        this._armature = value;
    }
}