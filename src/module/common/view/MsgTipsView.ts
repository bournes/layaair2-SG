import { ui } from "../../../ui/layaMaxUI";

export default class MsgTipsView extends ui.moduleView.common.MsgTipsViewUI {

    private _content: string = "";
    constructor() { super(); }

    onEnable(): void {
        this.txt_content.text = this._content;
        this.imgBg.width = this.txt_content.width + 80;
        this.width = this.imgBg.width;
    }

    set dataSource(value: any) {
        this._content = value;
    }
}