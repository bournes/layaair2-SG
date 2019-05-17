import BaseView from "../../../core_wq/view/base/BaseView";
import LayerMgr from "../../../core_wq/layer/LayerMgr";
import { ui } from "../../../ui/layaMaxUI";
import ShopItem from "./ShopItem";
import GlobalData from "../../../core_wq/db/GlobalData";
import ViewMgr from "../../../core_wq/view/ViewMgr";
import ViewConst from "../../../core_wq/view/const/ViewConst";

/**
 * 商店界面
 */
export default class ShopView extends BaseView {

    private _curBuyIndex: number = 0;

    constructor() {
        super(LayerMgr.Ins.frameLayer, ui.moduleView.shop.ShopViewUI);
        this.setResources(["shop"]);
    }

    //初始化
    public initUI(): void {
        super.initUI();
        let listDatas = GlobalData.getAllValue(GlobalData.HeroConfigVO);
        if (listDatas) {
            this.ui.lists.vScrollBarSkin = "";
            this.ui.lists.array = listDatas;
            this.ui.lists.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
            this.frameOnce(5, this, () => {
                if (this._curBuyIndex > 0) {
                    this.ui.lists.scrollTo(this._curBuyIndex);
                }
            })
        }
    }

    /** 添加监听事件 */
    public addEvents(): void {
        this.ui.btn_close.on(Laya.Event.CLICK, this, this.onCloseHandler);
    }

    /** 移除监听事件 */
    public removeEvents(): void {
        this.ui.btn_close.off(Laya.Event.CLICK, this, this.onCloseHandler);
    }

    private onListRender(cell: Laya.Box, index: number): void {
        if (index > this.ui.lists.array.length) {
            return;
        }
        let item: ShopItem = cell.getChildByName("shopItem") as ShopItem;
        if (item) {
            item.dataSource = this.ui.lists.array[index];
            if (item.btn_buy.visible && index < this.ui.lists.array.length - 3) {
                this._curBuyIndex = index - 2;
            }
        }
    }

    private onCloseHandler(): void {
        ViewMgr.Ins.close(ViewConst.ShopView);
    }

}