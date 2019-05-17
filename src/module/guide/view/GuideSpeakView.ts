import { ui } from "../../../ui/layaMaxUI";
import EffectUtil from "../../../core_wq/utils/EffectUtil";

/**
 * 新手指引说话提示框
 */
export default class GuideSpeakView extends ui.moduleView.guide.GuideSpeakViewUI {

    private _content: string;
    private _speakComplete: Function

    constructor() {
        super();
    }

    onEnable(): void {
        EffectUtil.playTypewriterEffect(this.txt_content, this._content, 50, this._speakComplete);
    }

    /** 设置说话内容 */
    public setSpeakContent(content: string, speakComplete: Function = null): void {
        this._content = content;
        this._speakComplete = speakComplete;
        if (this.txt_content) {
            EffectUtil.playTypewriterEffect(this.txt_content, this._content, 50, this._speakComplete);
        }
    }
}