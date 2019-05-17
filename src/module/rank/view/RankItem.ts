import { ui } from "../../../ui/layaMaxUI";

export default class RankItem extends ui.moduleView.rank.RankItemUI {

    constructor() { super(); }

    set dataSource(value: any) {
        if (value) {
            this.txt_name.text = value.nick_name;
            this.txt_position.text = value.city == null ? "火星" : value.city;
            this.imgHead.skin = value.avatar_url;
        }
    }
}