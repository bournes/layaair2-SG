import Layer from "./Layer";
import LayerEvent from "../event/LayerEvent";
import LayerMgr from "../LayerMgr";

export default class MaskLayer extends Layer {

    public set maskEnabled(value: boolean) {
        this._maskEnabled = value;
        if (value) {
            if (this.numChildren > 0) {
                super.addChildAt(this._mask, 0);
            }
        } else {
            this._mask.removeSelf();
        }
    }

    public set maskAlpha(value: number) {
        this._mask.alpha = value;
    }

    public set useAnimation(value: boolean) {
        this._useAnimation = value;
    }

    public get animationComplete(): boolean {
        return this._animationComplete
    }

    public static DEFAULT_MASK_ALPHA: number = 0.7;

    protected _mask: Laya.Sprite;
    protected _maskEnabled: boolean;
    protected _useAnimation: boolean;
    protected _animationComplete: boolean;
    protected _handlers: Laya.Handler[];

    protected _usingCustomMask: boolean;
    protected _customMask: Laya.Sprite;
    protected _customMaskParent: Laya.Sprite;
    protected _customMaskIndex: number;

    constructor(layerId: number, $name: string = null) {
        super(layerId, $name);
        this.initMask();
        this._handlers = [];
        this._maskEnabled = true;
        this._useAnimation = true;
    }

    /**
     * 添加的回调只会触发，一般用来关闭已打开的视图窗口
     * @param caller
     * @param listener
     * @param args
     * @param maskAlpha
     */
    public addChildWithMaskCall(
        caller: any,
        listener: (...args) => void,
        args: any[] = null,
        maskAlpha: number = MaskLayer.DEFAULT_MASK_ALPHA
    ): void {
        this.maskEnabled = true;
        if (maskAlpha !== MaskLayer.DEFAULT_MASK_ALPHA) {
            this._mask.alpha = maskAlpha;
        }
        this.addChild(caller);
        this._handlers.push(Laya.Handler.create(caller, listener, args));
    }

    public addChildWithCustomMask(
        customMask: Laya.Sprite,
        caller: Laya.Node,
        listener: (...args) => void,
        args: any[] = null
    ): void {
        if (!customMask) {
            return;
        }
        this.maskEnabled = true;
        this._usingCustomMask = true;
        this._customMask = customMask;
        if (this._customMask.parent) {
            this._customMaskParent = this._customMask.parent as Laya.Sprite;
            this._customMaskIndex = this._customMask.parent.getChildIndex(this._customMask);
        }
        this._mask.alpha = 0;
        this.addChild(caller);
        this._handlers.push(Laya.Handler.create(caller, listener, args));
    }

    public addChild(node: Laya.Node): Laya.Node {
        this.superAddChild(node);
        if (this._usingCustomMask && this._customMask) {
            super.addChildAt(this._customMask, 0);
        }
        if (this._maskEnabled) {
            super.addChildAt(this._mask, 0);
        }
        this.event(LayerEvent.CHILD_ADDED, this.numChildren);
        return node;
    }

    public removeChild(node: Laya.Node): Laya.Node {
        super.removeChild(node);

        let sp: Laya.Sprite = node as Laya.Sprite;
        if (sp) {
            if (sp.layer_tween) {
                sp.layer_tween.complete();
                sp.scale(sp.layer_origin_scale.x, sp.layer_origin_scale.y);
                delete sp.layer_tween;
            }
        }

        if (this.numChildren === 2 && this._usingCustomMask) {
            if (this._customMask) {
                if (this._customMaskParent) {
                    this._customMaskParent.addChildAt(this._customMask, this._customMaskIndex);
                }
                this._usingCustomMask = false;
                this._customMask = null;
                this._customMaskParent = null;
                this._customMaskIndex = 0;
            }
        }
        if (this.numChildren === 1 && this.getChildAt(0) === this._mask) {
            super.removeChild(this._mask);
            this._animationComplete = false;
            this._mask.alpha = MaskLayer.DEFAULT_MASK_ALPHA;
        }

        this.event(LayerEvent.CHILD_REMOVED, this.numChildren);
        return node;
    }

    protected initMask(): void {
        this._mask = new Laya.Sprite();
        this._mask.graphics.clear();
        this._mask.graphics.drawRect(0, 0, LayerMgr.stageDesignWidth, LayerMgr.stageDesignHeight, "#000000");
        this._mask.alpha = MaskLayer.DEFAULT_MASK_ALPHA;
        this._mask.size(LayerMgr.stageDesignWidth, LayerMgr.stageDesignHeight);
        this._mask.on(Laya.Event.CLICK, this, this.applyClick);
    }

    protected superAddChild(node: any, index?: number): Laya.Node {
        if (this._useAnimation && !this._animationComplete) {
            let sp: Laya.Sprite = node as Laya.Sprite;
            if (sp && !sp.layer_tween) {
                if (!sp.layer_origin_scale) {
                    sp.layer_origin_scale = new Laya.Point(sp.scaleX, sp.scaleY);
                }

                let comp: Laya.Component = node as Laya.Component;
                let size: Laya.Point = new Laya.Point();
                if (comp) {
                    size.setTo(sp.displayWidth, sp.displayHeight);
                } else {
                    let rect: Laya.Rectangle = sp.getBounds();
                    size.setTo(rect.width, rect.height);
                }
                sp.layer_tween = Laya.Tween.from(node, { x: sp.x + (size.x >> 1), y: sp.y + (size.y >> 1), scaleX: 0, scaleY: 0 }, 300, Laya.Ease.backInOut, Laya.Handler.create(this, () => {
                    this._animationComplete = true;
                    this.event(LayerEvent.LAYER_ANIMATION_COMPLETE, this._animationComplete);
                }));
            }
        }
        this._mask.off(Laya.Event.CLICK, this, this.applyClick);
        Laya.timer.once(1000 * 2, this, () => {
            this._mask.on(Laya.Event.CLICK, this, this.applyClick);
        });
        if (index) {
            super.addChildAt(node, index);
        } else {
            super.addChild(node);
        }
        return node;
    }

    protected applyClick(): void {
        if (this._handlers.length) {
            (this._handlers.pop() as Laya.Handler).run();
        }
    }
}