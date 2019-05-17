import BaseView from "../../../core_wq/view/base/BaseView";
import LayerMgr from "../../../core_wq/layer/LayerMgr";
import { ui } from "../../../ui/layaMaxUI";
import AppConfig from "../../../core_wq/config/AppConfig";
import GlobalData from "../../../core_wq/db/GlobalData";
import HeroVO from "../../../core_wq/db/vo/HeroVO";
import BoneAnim from "../../../core_wq/bone/BoneAnim";
import HallControl from "../HallControl";
import HeroConfigVO from "../../../core_wq/db/vo/HeroConfigVO";
import MathUtil from "../../../core_wq/utils/MathUtil";
import MsgMgr from "../../../core_wq/msg/MsgMgr";
import ShareMgr from "../../../core_wq/msg/ShareMgr";
import ViewMgr from "../../../core_wq/view/ViewMgr";
import ViewConst from "../../../core_wq/view/const/ViewConst";

/**
 * 新武将界面
 */
export default class NewHeroView extends BaseView {

    private _heroVO: HeroVO;
    private _heroInfo: HeroConfigVO;
    private _bone: BoneAnim;
    private _money: number = 0;

    constructor() {
        super(LayerMgr.Ins.frameLayer, ui.moduleView.hall.NewHeroViewUI);
    }

    public initData(): void {
        super.initData();
        if (this.datas && this.datas.length > 0) {
            this._heroVO = GlobalData.getData(GlobalData.HeroVO, this.datas[0]);
            if (this._heroVO) {
                this.ui.txt_name.text = this._heroVO.name;
                this._bone = new BoneAnim(this._heroVO.modelImgUrl, true, true);
                this._bone.completeBack = () => {
                    
                }
                this.addChild(this._bone);
                this._bone.scale(1.5, 1.5);
                this._bone.pos(238, 445);
            }
            this._heroInfo = GlobalData.getData(GlobalData.HeroConfigVO, HallControl.Ins.Model.heroLevel);
            if (this._heroInfo) {
                this.ui.txt_exp.text = "经验: +" + this._heroInfo.syntheticExp;
                this.ui.txt_income.text = "收益: +" + MathUtil.unitConversion(this._heroInfo.PerSecCoin) + "/秒";
                let curPrice = HallControl.Ins.Model.getHeroBuyPrice(this._heroInfo.buyPrice, HallControl.Ins.Model.queryBuyHeroRecord(this._heroInfo.id));
                this._money = curPrice * 0.6;
            }
            this.ui.txt_price.text = "+" + MathUtil.unitConversion(this._money);
        }
    }

    public addEvents(): void {
        this.ui.btn_reward.on(Laya.Event.CLICK, this, this.onGetReward);
    }

    public removeEvents(): void {
        this.ui.btn_reward.off(Laya.Event.CLICK, this, this.onGetReward);
    }

    private onGetReward(): void {
        if (AppConfig.isDebug && Laya.Browser.onPC) {
            this.sendReward();
        } else {
            ShareMgr.Ins.showShareOrAdv(() => {
                this.sendReward();
            })
        }
    }

    private sendReward(): void {
        MsgMgr.Ins.showMsg("您已获得铜钱:" + MathUtil.unitConversion(this._money));
        HallControl.Ins.updateGold(this._money, false);
        ViewMgr.Ins.close(ViewConst.NewHeroView);
    }

    public close(...param: any[]): void {
        super.close(param);
        this._heroVO = null;
        this._heroInfo = null;
        if (this._bone) this._bone.destroy();
    }
}