import MathUtil from "../utils/MathUtil";
import PoolMgr from "../msg/PoolMgr";
import PathUtil from "../utils/PathUtil";

export default class ItemFly extends Laya.Sprite {

    private _anims: Laya.Animation[];
    private _animNum: number;
    private _animLen: number;
    private _animationName: string;

    constructor(animationName: string = "rollingCoin") {
        super();
        this._animationName = animationName;
        this._anims = [];
    }

    public play(fromX: number, fromY: number, toX: number = 38, toY: number = 42): Laya.Sprite {
        this._animNum = 0;
        this._animLen = 7;

        this.createAnim(fromX, fromY, toX, toY);
        Laya.timer.frameLoop(1, this, this.onLoop);
        return this;
    }

    private createAnim(fromX: number, fromY: number, toX: number, toY: number): void {
        this._animNum++;
        const anim: Laya.Animation = PoolMgr.Ins.get(
            Laya.Animation,
            this._animationName
        );

        // @ts-ignore
        if (!anim.url_loaded) {
            // @ts-ignore
            anim.url_loaded = true;
            anim.loadAtlas("images/effect/" + this._animationName + ".json");
            anim.interval = 25;
        }

        const scale: number = Math.random() * 0.15 + 0.65;
        anim
            .pivot(30, 30)
            .pos(fromX + MathUtil.rangeInt(5, 10), fromY + MathUtil.rangeInt(5, 10))
            .scale(scale, scale);
        anim.play(0, true);
        anim.alpha = 1;

        const iX: number = fromX + Math.random() * (toX - fromX);
        const iY: number = fromY + Math.random() * (toY - fromY);

        const points: Laya.Point[] = [];
        points.push(new Laya.Point(anim.x, anim.y));
        points.push(new Laya.Point(iX, iY));
        points.push(new Laya.Point(toX, toY));

        // prettier-ignore
        const path: Laya.Point[] = PathUtil.CreateBezierPoints(points, MathUtil.rangeInt(25, 40));

        // @ts-ignore
        anim.path = path;
        // @ts-ignore
        anim.pathLength = path.length - 1;
        // @ts-ignore
        anim.pathIndex = 0;

        this.addChild(anim);
        this._anims.push(anim);

        if (this._animNum < this._animLen) {
            // prettier-ignore
            Laya.timer.frameOnce(MathUtil.rangeInt(4, 12), this, this.createAnim, [fromX, fromY, toX, toY]);
        }
    }

    private onLoop() {
        let len: number = this._anims.length;
        for (let i: number = 0; i < len; i++) {
            const anim: Laya.Animation = this._anims[i];
            // @ts-ignore
            const idx: number = anim.pathIndex++;
            // @ts-ignore
            if (idx === anim.pathLength) {
                this._anims.splice(i, 1);
                this.onAnimComplete(anim);
                i--;
                len--;
            } else {
                // @ts-ignore
                const point: Point = anim.path[idx];
                anim.pos(point.x, point.y);
            }
        }
    }

    private onAnimComplete(anim: Laya.Animation) {
        if (anim) {
            anim.stop();
            anim.removeSelf();
            PoolMgr.Ins.return(anim, this._animationName);
        }
        if (this.numChildren <= 0) {
            Laya.timer.clear(this, this.onLoop);
            this.destroy(true);
        }
    }
}