import MathUtil from "../../utils/MathUtil";

export default class GuideVO {

    /** 步骤 */
    public stepId: number;
    /** 类型 0：任意   1：用户等级   2：英雄等级 */
    public type: number;
    /** 条件值 0就是没有条件 */
    public condition: number;
    /** 可点击区域参数  x#y#w#h */
    private _clickAreaParam: number[];
    /** 对话框位置参数  x#y */
    private _speakParam: number[];
    /** 手指指引位置参数 x#y */
    private _fingerParam: number[];
    /** 手指资源旋转角度 */
    public fingerRotation: number;
    /** 对话内容 */
    public speakContent: string;
    /** 指引动画类型 1:指引功能系统  2：指引合成英雄 */
    public fingerEffectType: number;


    private _isForce: boolean;
    public set isForce(value: any) {
        this._isForce = Number(value) == 0 ? false : true;
    }
    /** 是否强制引导 */
    public get isForce() {
        return this._isForce;
    }

    public set clickAreaParam(value) {
        this._clickAreaParam = MathUtil.splitToNumber(value);
    }
    /** 可点击区域参数  x#y#w#h */
    public get clickAreaParam(): number[] {
        return this._clickAreaParam;
    }

    public set fingerParam(value) {
        this._fingerParam = MathUtil.splitToNumber(value);
    }
    /** 手指指引位置参数 x#y */
    public get fingerParam(): number[] {
        return this._fingerParam;
    }

    public set speakParam(value) {
        this._speakParam = MathUtil.splitToNumber(value);
    }
    /** 对话框位置参数  x#y */
    public get speakParam(): number[] {
        return this._speakParam;
    }
}