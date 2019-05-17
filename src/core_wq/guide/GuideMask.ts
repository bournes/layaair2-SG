import EventsMgr from "../event/EventsMgr";
import EventType from "../event/EventType";
import LayerMgr from "../layer/LayerMgr";
import GuideSpeakView from "../../module/guide/view/GuideSpeakView";

export default class GuideMask extends Laya.Sprite {

    private guideContainer: Laya.Sprite;
    public hitArea: Laya.HitArea;
    private interactionArea: Laya.Sprite;
    private _speakView: GuideSpeakView;
    /** 是否点击空白区域进入下一步引导 */
    public isClickMaskNextStep: boolean = false;
    private _finger: Laya.Image;
    private _timeLine: Laya.TimeLine;

    constructor() {
        super();
        this.init();
    }

    private init(): void {
        //绘制一个蓝色方块，不被抠图
        var gameContainer: Laya.Sprite = new Laya.Sprite();
        gameContainer.alpha = 0;
        gameContainer.loadImage("images/component/tip_bg.png");
        this.addChild(gameContainer);

        // 引导所在容器
        this.guideContainer = new Laya.Sprite();
        // 设置容器为画布缓存
        this.guideContainer.cacheAs = "bitmap";
        this.addChild(this.guideContainer);
        gameContainer.on(Laya.Event.CLICK, this, this.onNextStep);

        //绘制遮罩区，含透明度，可见游戏背景
        var maskArea: Laya.Sprite = new Laya.Sprite();
        maskArea.alpha = 0.5;
        maskArea.graphics.drawRect(0, 0, LayerMgr.stageDesignWidth, LayerMgr.stageDesignHeight, "#000000");
        this.guideContainer.addChild(maskArea);

        //绘制一个圆形区域，利用叠加模式，从遮罩区域抠出可交互区
        this.interactionArea = new Laya.Sprite();
        //设置叠加模式
        this.interactionArea.blendMode = "destination-out";
        this.guideContainer.addChild(this.interactionArea);

        this.hitArea = new Laya.HitArea();
        this.hitArea.hit.drawRect(0, 0, LayerMgr.stageDesignWidth, LayerMgr.stageDesignHeight, "#000000");

        this.guideContainer.hitArea = this.hitArea;
        this.guideContainer.mouseEnabled = true;
    }

    private onNextStep(): void {
        if (this.isClickMaskNextStep) {
            this.reset();
            EventsMgr.Ins.dispatch(EventType.GUIDE_NEXT_STEP);
        }
    }

    /** 可点击区域的大小 */
    public drawCliclAreaSize(data: { x: number, y: number, w: number, h: number }): void {
        this.hitArea.unHit.clear();
        this.hitArea.unHit.drawRect(data.x, data.y, data.w, data.h, "#000000");

        this.interactionArea.graphics.clear();
        this.interactionArea.graphics.drawRect(data.x, data.y, data.w, data.h, "#000000");
    }

    /** 显示对话框 */
    public showSpeakView(content: string, pos: { x: number, y: number }, speakComplete: Function = null): void {
        if (this._speakView == null) {
            this._speakView = new GuideSpeakView();
            this._speakView.zOrder = 1000;
            this.addChild(this._speakView);
        }
        this._speakView.visible = true;
        this._speakView.pos(pos.x, pos.y);
        this._speakView.setSpeakContent(content, speakComplete);
    }

    /** 显示手指指引 */
    public showFigner(pos: { x: number, y: number }, rotation: number = -40, effectType: number = 1): void {
        if (this._finger == null) {
            this._finger = new Laya.Image("images/guide/guide_jiantou2.png");
            this._finger.zOrder = 1000;
            this._finger.anchorX = this._finger.anchorY = 0.5;
            this.addChild(this._finger);
        }
        this._finger.visible = true;
        this._finger.rotation = rotation;
        this._finger.pos(pos.x, pos.y);
        if (effectType == 1) {
            this._timeLine = new Laya.TimeLine();
            this._timeLine.addLabel("tl1", 0).to(this._finger, { x: this._finger.x - 20, y: this._finger.y + 20 }, 500)
                .addLabel("tl2", 0).to(this._finger, { x: this._finger.x, y: this._finger.y }, 500, Laya.Ease.backInOut);
            this._timeLine.play(0, true);
        } else if (effectType == 2) {
            this._timeLine = new Laya.TimeLine();
            this._timeLine.addLabel("tl1", 0).to(this._finger, { x: this._finger.x - 100, y: this._finger.y }, 500)
                .addLabel("tl2", 0).to(this._finger, { x: this._finger.x, y: this._finger.y }, 500, Laya.Ease.backInOut);
            this._timeLine.play(0, true);
        }
    }

    public reset(): void {
        if (this._speakView) {
            this._speakView.visible = false;
        }
        if (this._finger) {
            this._finger.visible = false;
        }
        if (this._timeLine) {
            this._timeLine.destroy();
            this._timeLine = null;
        }
        this.visible = false;
    }
}