import MathUtil from "../utils/MathUtil";
import TimeConfig from "../config/TimeConfig";
import PoolMgr from "../msg/PoolMgr";

export default class ItemExplode extends Laya.Sprite {

    private static lastTimestamp: number = 0;
    private static COOL_DOWN: number = 500;

    private _animNum: number;
    private _animLen: number;
    private _animationName: string;

    constructor(animationName: string = "rollingCoin") {
        super();
        this._animationName = animationName;
    }

    public play(fromX: number, fromY: number): Laya.Sprite {
        const timestamp: number = new Date().getTime();
        if (timestamp - ItemExplode.lastTimestamp > ItemExplode.COOL_DOWN) {
            ItemExplode.lastTimestamp = timestamp;
            this._animNum = 0;
            this._animLen = 7;
            this.pos(fromX, fromY);
            this.createAnim();
        } else {
            Laya.timer.frameOnce(5, this, this.onAnimComplete);
        }
        return this;
    }

    private createAnim(): void {
        this._animNum++;
        const anim: Laya.Animation = PoolMgr.Ins.get(Laya.Animation, this._animationName);
        // @ts-ignore
        if (!anim.url_loaded) {
            // @ts-ignore
            anim.url_loaded = true;
            anim.loadAtlas("images/boneAnim/effect/" + this._animationName + ".json");
            anim.interval = 25;
        }

        const scale: number = MathUtil.range(0.6, 0.8);
        anim
            .pivot(30, 30)
            .pos(MathUtil.rangeInt(-5, 5), MathUtil.rangeInt(-5, 5))
            .scale(scale, scale);
        anim.play(0, true);
        anim.alpha = 1;

        const tx: number = (Math.abs(anim.x) / anim.x) * MathUtil.rangeInt(30, 220);

        // @ts-ignore
        anim.speedY = MathUtil.range(-7.5, -5);
        // @ts-ignore
        anim.g = 0.3;
        // @ts-ignore
        anim.updateHandler = Laya.Handler.create(this, this.onAnimUpdate, [anim], false);
        const duration: number = TimeConfig.SEC_IN_MILI * MathUtil.range(0.6, 0.8);
        // prettier-ignore
        // @ts-ignore
        Laya.Tween.to(anim, { x: tx, update: anim.updateHandler }, duration * 1.5, Laya.Ease.quadOut);
        // prettier-ignore
        Laya.Tween.to(anim, { alpha: 0, complete: Laya.Handler.create(this, this.onAnimComplete, [anim]) }, duration * 0.4, Laya.Ease.quadOut, null, duration * 0.6);

        Laya.timer.frameOnce(1, this, () => {
            this.addChild(anim);
        });

        if (this._animNum < this._animLen) {
            // prettier-ignore
            this.createAnim();
        }
    }

    private onAnimUpdate(anim: Laya.Animation) {
        // @ts-ignore
        anim.y += anim.speedY;
        // @ts-ignore
        anim.speedY += anim.g;
    }

    private onAnimComplete(anim?: Laya.Animation) {
        if (anim) {
            anim.stop();
            anim.removeSelf();
            // @ts-ignore
            anim.updateHandler.clear();
            PoolMgr.Ins.return(anim, this._animationName);
        }
        try {
            if (this && this.numChildren <= 0) {
                this.destroy(true);
            }
        } catch (e) {
            console.log('@FREEMAN: ItemExplode.ts => ', e);
        }
    }
}