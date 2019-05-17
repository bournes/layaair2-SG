import BaseView from "../../../core_wq/view/base/BaseView";
import LayerMgr from "../../../core_wq/layer/LayerMgr";
import { ui } from "../../../ui/layaMaxUI";
import GlobalData from "../../../core_wq/db/GlobalData";
import PlayerMgr from "../../../core_wq/player/PlayerMgr";
import LevelVO from "../../../core_wq/db/vo/LevelVO";

/**
 * 用户信息界面
 */
export default class UserInfoView extends BaseView {

    private _levelVO: LevelVO;
    private _nextLevelVO: LevelVO;

    constructor() {
        super(LayerMgr.Ins.frameLayer, ui.moduleView.hall.UserInfoViewUI);
    }

    public initData(): void {
        super.initData();
        this._levelVO = GlobalData.getData(GlobalData.LevelVO, PlayerMgr.Ins.Info.userLevel)
        this._nextLevelVO = GlobalData.getData(GlobalData.LevelVO, PlayerMgr.Ins.Info.userLevel + 1);
        this.ui.txt_userId.text = PlayerMgr.Ins.Info.userId + "";

        this.ui.expBar.value = (1.0 * PlayerMgr.Ins.Info.userExp / this._nextLevelVO.upNeedexp);
        this.ui.txt_exp.text = Math.floor(PlayerMgr.Ins.Info.userExp) + "/" + Math.floor(this._nextLevelVO.upNeedexp);
        this.ui.txt_price.text = Math.floor(100 * this._levelVO.extraProduce) + "%";
        this.ui.txt_heroCount.text = this._levelVO.openCellCount + "个";
        this.ui.txt_battleCount.text = this._levelVO.battleCount + "个";
    }
}