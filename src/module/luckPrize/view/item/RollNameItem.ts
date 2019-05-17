import { ui } from "../../../../ui/layaMaxUI";
import LotteryRosterVO from "../../../../core_wq/db/vo/LotteryRosterVO";

export default class RollNameItem extends ui.moduleView.luckPrize.item.RollNameItemUI {

    private _data: LotteryRosterVO;

    constructor() { super(); }

    set dataSource(value: any) {
        this._data = value;
        this.updateView();
    }

    private updateView(): void {
        if (this._data && this.txt_name) {
            this.txt_name.text = this._data.lotteryName;
            this.txt_reward.text = this._data.lotterydata;
            this.hbox.refresh();
        }
    }
}