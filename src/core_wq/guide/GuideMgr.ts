import GuideMask from "./GuideMask";
import LayerMgr from "../layer/LayerMgr";
import EventsMgr from "../event/EventsMgr";
import EventType from "../event/EventType";
import GuideVO from "../db/vo/GuideVO";
import GlobalData from "../db/GlobalData";
import HallControl from "../../module/hall/HallControl";

/**
 * 新手引导
 */
export default class GuideMgr {

    private _maskView: GuideMask;
    private _guideStep: number = 1;
    private _guideVO: GuideVO;
    private _guideLen: number;
    /** 是否在进行新手流程 */
    public isGuide: boolean = false;

    constructor() {

    }

    public setup(): void {
        this._guideLen = GlobalData.getAllValue(GlobalData.GuideVO).length;
        if (this._guideStep < 0 || this._guideStep >= this._guideLen) return;
        this._maskView = new GuideMask();
        this._maskView.visible = false;
        LayerMgr.Ins.guideLayer.addChild(this._maskView);
        EventsMgr.Ins.addListener(EventType.GUIDE_NEXT_STEP, this.onNextStep, this);
        this.onNextStep();
    }

    public onNextStep(): void {
        if (this._maskView == null || this._guideStep < 0 || this._guideStep > this._guideLen) {
            this.isGuide = false;
            if (this._maskView) this._maskView.reset();
            return;
        }
        this._maskView.visible = true;
        this._guideVO = GlobalData.getData(GlobalData.GuideVO, this._guideStep);
        if (this._guideVO) {
            if (this.isNextStep()) {
                this.isGuide = true;
                this._maskView.visible = true;
                if (this._guideVO.isForce) {
                    this._maskView.drawCliclAreaSize({ x: this._guideVO.clickAreaParam[0], y: this._guideVO.clickAreaParam[1], w: this._guideVO.clickAreaParam[2], h: this._guideVO.clickAreaParam[3] });
                }
                if (this._guideVO.speakParam.length > 0) {
                    this._maskView.showSpeakView(this._guideVO.speakContent, { x: this._guideVO.speakParam[0], y: this._guideVO.speakParam[1] });
                }
                if (this._guideVO.fingerParam.length > 0) {
                    this._maskView.showFigner({ x: this._guideVO.fingerParam[0], y: this._guideVO.fingerParam[1] }, this._guideVO.fingerRotation, this._guideVO.fingerEffectType);
                }
                //特殊要求
                switch (this._guideStep) {
                    case 1: //第一次购买英雄
                        break;
                    case 2: //第一次合成英雄
                        break;
                }
            } else {
                return;
            }
        } else {
            this.isGuide = false;
            this._maskView.reset();
            console.log("@David 步骤ID无法找到表中对应数据  step：", this._guideStep);
            return;
        }
        this._guideStep++;
    }

    /** 是否可以进入下一步骤 */
    private isNextStep(): boolean {
        switch (this._guideVO.type) {
            case GUIDE_TYPE.PASS:
                return true;
            case GUIDE_TYPE.USER_LEVEL:

                break;
            case GUIDE_TYPE.HERO_LEVEL:

                break;
            case GUIDE_TYPE.HERO_COUNT:
                if (HallControl.Ins.Model.heroCount >= this._guideVO.condition) {
                    this._maskView.reset();
                    return true;
                }
                break;
            default:
                return false;
        }
        return false;
    }


    public get guideStep(): number {
        return this._guideStep;
    }

    public set guideStep(value: number) {
        this._guideStep = value;
    }

    public static get Ins(): GuideMgr {
        if (!this._instance) {
            this._instance = new GuideMgr();
        }
        return this._instance;
    }
    private static _instance: GuideMgr;
}

enum GUIDE_TYPE {
    PASS = 0,
    /** 用户等级 */
    USER_LEVEL = 1,
    /** 英雄等级 */
    HERO_LEVEL,
    /** 英雄数量 */
    HERO_COUNT,
}