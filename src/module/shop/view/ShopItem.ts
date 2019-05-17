import { ui } from "../../../ui/layaMaxUI";
import HeroConfigVO from "../../../core_wq/db/vo/HeroConfigVO";
import HeroVO from "../../../core_wq/db/vo/HeroVO";
import GlobalData from "../../../core_wq/db/GlobalData";
import PathConfig from "../../../core_wq/config/PathConfig";
import HallControl from "../../hall/HallControl";
import ColorUtil from "../../../core_wq/utils/ColorUtil";
import ShareMgr from "../../../core_wq/msg/ShareMgr";
import MathUtil from "../../../core_wq/utils/MathUtil";
import PlayerMgr from "../../../core_wq/player/PlayerMgr";
import MsgMgr from "../../../core_wq/msg/MsgMgr";
import HeadItem from "../../hall/view/item/HeadItem";
import StorageUtil from "../../../core_wq/utils/StorageUtil";
import ViewMgr from "../../../core_wq/view/ViewMgr";
import ViewConst from "../../../core_wq/view/const/ViewConst";

export default class ShopItem extends ui.moduleView.shop.ShopItemUI {

    private _config: HeroConfigVO;
    private _vo: HeroVO;
    private _firstLockId: number = 0;
    private _buyPrice: number = 0;

    constructor() { super(); }

    set dataSource(value: any) {
        if (value) {
            this._config = value;
            this.init();
            this.addEvents();
        }
    }

    private init(): void {
        this._vo = GlobalData.getData(GlobalData.HeroVO, this._config.id);
        if (this._vo) {
            this.imgIcon.skin = PathConfig.HEAD_PATH + this._vo.imgUrl;
            if (HallControl.Ins.Model.heroLevel < this._config.id) {
                this.imgIcon.gray = true;
                this.boxName.visible = false;
            } else {
                this.imgIcon.gray = false;
                this.boxName.visible = true;
                this.txt_level.text = this._config.id + "";
                let strNewName: string = '';
                for (var index = 0; index < this._config.name.length; index++) {
                    var element = this._config.name[index];
                    if (element) {
                        strNewName += element + '\n';
                    }
                }
                this.txt_name.text = strNewName;
            }
            this.btn_buyLock.visible = HallControl.Ins.Model.heroLevel < this._config.unlockNeedId;
            this.btn_buy.visible = !this.btn_buyLock.visible;
            if (this.btn_buy.visible && HallControl.Ins.Model.heroLevel < this._config.unlockNeedId && this._firstLockId < 1) {
                this._firstLockId = this._config.unlockNeedId;
            }
            if (this._firstLockId > 0) {
                this.btn_buyDiamond.visible = this._firstLockId == this._config.unlockNeedId;
                if (this.btn_buyDiamond.visible) {
                    this.updateAdvBtn();
                }
            } else {
                this.btn_buyDiamond.visible = false;
            }
            this.updateBuyPrice();
            this.updateLockHeroBtn();
        }
    }

    private updateBuyPrice(): void {
        if (this.btn_buy.visible) {
            this._buyPrice = HallControl.Ins.Model.getHeroBuyPrice(this._config.buyPrice, HallControl.Ins.Model.queryBuyHeroRecord(this._config.id));
            this.txt_price.text = MathUtil.unitConversion(this._buyPrice);
        }
    }

    private addEvents(): void {
        this.btn_buy.on(Laya.Event.CLICK, this, this.onBuyHero);
        this.btn_adv.on(Laya.Event.CLICK, this, this.onLookAdv);
        this.btn_buyDiamond.on(Laya.Event.CLICK, this, this.onBuyDiamondHero);
    }

    private removeEvents(): void {
        this.btn_buy.off(Laya.Event.CLICK, this, this.onBuyHero);
        this.btn_adv.off(Laya.Event.CLICK, this, this.onLookAdv);
        this.btn_buyDiamond.off(Laya.Event.CLICK, this, this.onBuyDiamondHero);
    }

    /** 购买英雄 */
    private onBuyHero(): void {
        if (PlayerMgr.Ins.Info.userGold >= this._buyPrice) {
            HallControl.Ins.buyHero(this._config);
            this.updateBuyPrice();
        } else {
            MsgMgr.Ins.showMsg("主人,铜钱不够喔~快去做任务吧...");
        }
    }

    /** 看视频 */
    private onLookAdv(): void {
        ShareMgr.Ins.showShareOrAdv(() => {
            let hero: HeadItem = HallControl.Ins.createHero(this._config.id, true);
            if (hero == null) {
                StorageUtil.saveHeroStore(this._config.id);
                MsgMgr.Ins.showMsg("主人,武将已打包到箱子里了哦~记得点击箱子喲!");
            }
            this.updateAdvBtn();
        }, 11, false, true);
    }

    /** 钻石购买英雄 */
    private onBuyDiamondHero(): void {
        ViewMgr.Ins.open(ViewConst.DiamondBuyView, null, { type: "hero", value: this._config.id });
    }

    /** 未解锁按钮处理 */
    private updateLockHeroBtn(): void {
        if (!this.btn_buyLock.visible) return;
        let lockConfig: HeroVO = GlobalData.getData(GlobalData.HeroVO, this._config.unlockNeedId);
        if (lockConfig) {
            this.imgHero.skin = PathConfig.HEAD_PATH + lockConfig.imgUrl;
            // if (!this.imgHero.filters) {
            //     this.imgHero.filters = ColorUtil.createColorFilter(2);
            // }
            // this.imgHero.alpha = 0.6;
            this.txt_unlockLevel.text = this._config.unlockNeedId + "";
            if (this._config.unlockNeedId >= 1000) {
                this.txt_unlockLevel.text = "?";
            }
        }
    }

    private updateAdvBtn(): void {
        if (ShareMgr.Ins.getAdTimes(11) < 1 && ShareMgr.Ins.getShareTimes(11) < 1) {
            this.btn_adv.visible = false;
        } else {
            if (ShareMgr.Ins.isAdStage(11)) {
                this.btn_adv.skin = "images/shop/shop_free_video.png";
            } else {
                this.btn_adv.skin = "images/shop/shop_free_share.png";
            }
        }
    }
}