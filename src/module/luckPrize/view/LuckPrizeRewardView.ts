import BaseView from "../../../core_wq/view/base/BaseView";
import LayerMgr from "../../../core_wq/layer/LayerMgr";
import { ui } from "../../../ui/layaMaxUI";
import HallControl from "../../hall/HallControl";
import HeroConfigVO from "../../../core_wq/db/vo/HeroConfigVO";
import GlobalData from "../../../core_wq/db/GlobalData";
import MathUtil from "../../../core_wq/utils/MathUtil";
import HttpMgr from "../../../core_wq/net/HttpMgr";
import EventsMgr from "../../../core_wq/event/EventsMgr";
import EventType from "../../../core_wq/event/EventType";
import PathConfig from "../../../core_wq/config/PathConfig";
import HeroVO from "../../../core_wq/db/vo/HeroVO";
import HeadItem from "../../hall/view/item/HeadItem";
import StorageUtil from "../../../core_wq/utils/StorageUtil";
import MsgMgr from "../../../core_wq/msg/MsgMgr";
import LuckPrizeView from "./LuckPrizeView";
import DropVO from "../../../core_wq/db/vo/DropVO";

export default class LuckPrizeRewardView extends BaseView {

    private rewards: Array<any> = [
        { id: 1, name: "少量铜钱", num: 1, imgUrl: "images/luckPrize/luck_prize_4.png" },
        { id: 2, name: "大量元宝", num: 488, imgUrl: "images/luckPrize/luck_prize_6.png" },
        { id: 3, name: "双倍奖励", num: 2, imgUrl: "images/luckPrize/luck_prize_5.png" },
        { id: 4, name: "黄金宝箱", num: 1, imgUrl: "images/luckPrize/luck_prize_3.png" },
        { id: 5, name: "八倍奖励", num: 8, imgUrl: "images/luckPrize/luck_prize_7.png" },
        { id: 6, name: "少量元宝", num: 88, imgUrl: "images/luckPrize/luck_prize_6.png" },
        { id: 7, name: "大量铜钱", num: 1, imgUrl: "images/luckPrize/luck_prize_1.png" },
        { id: 8, name: "白银宝箱", num: 1, imgUrl: "images/luckPrize/luck_prize_8.png" }
    ]; //奖励物品列表

    private _itemId: number = 0;

    constructor() {
        super(LayerMgr.Ins.subFrameLayer, ui.moduleView.luckPrize.LuckPrizeRewardViewUI);
    }

    public initData(): void {
        super.initData();
        this._itemId = this.datas[0];
        if (this._itemId > 0) {
            let itemData = this.rewards[this._itemId - 1];
            this.ui.imgIcon.skin = itemData.imgUrl;
            if (this._itemId == 1 || this._itemId == 7) {   //金币
                let vo: HeroConfigVO = GlobalData.getData(GlobalData.HeroConfigVO, HallControl.Ins.Model.heroLevel);
                let heroPrice = 0;
                if (vo) {
                    heroPrice = HallControl.Ins.Model.getHeroBuyPrice(vo.buyPrice, HallControl.Ins.Model.queryBuyHeroRecord(vo.id));
                    if (this._itemId == 7) {//超多铜钱
                        heroPrice = heroPrice * 0.6;
                    } else {//大量铜钱
                        heroPrice = heroPrice * 0.2;
                    }
                }
                this.ui.txt_name.text = "获得：" + itemData.name + "x" + MathUtil.unitConversion(heroPrice * LuckPrizeView.magnification);
                HallControl.Ins.updateGold(heroPrice, false);
            } else if (this._itemId == 2 || this._itemId == 6) { //钻石
                this.ui.txt_name.text = "获得：" + itemData.name + "x" + itemData.num * LuckPrizeView.magnification;
                HttpMgr.Ins.requestDiamondData();
            } else if (this._itemId == 4) { //黄金宝箱 获得英雄
                let heroVO: HeroConfigVO = HallControl.Ins.Model.getPreNewHeroData(HallControl.Ins.Model.heroLevel, 1);
                if (heroVO) {
                    let vo: HeroVO = GlobalData.getData(GlobalData.HeroVO, heroVO.id);
                    if (vo) {
                        this.ui.imgIcon.skin = PathConfig.HEAD_PATH + vo.imgUrl;
                        this.ui.txt_name.text = "获得：" + heroVO.name + "x" + itemData.num * LuckPrizeView.magnification;
                        for (let index = 0; index < LuckPrizeView.magnification; index++) {
                            let hero: HeadItem = HallControl.Ins.createHero(heroVO.id, true);
                            if (hero == null) {
                                StorageUtil.saveHeroStore(heroVO.id);
                                MsgMgr.Ins.showMsg("主人,武将已打包到箱子里了哦~记得点击箱子喲!");
                            }
                        }
                    }
                }
            } else if (this._itemId == 8) { //白银宝箱 获得英雄
                let dropData: DropVO = GlobalData.getData(GlobalData.DropVO, HallControl.Ins.Model.heroLevel);
                if (dropData) {
                    let vo: HeroVO = GlobalData.getData(GlobalData.HeroVO, dropData.dropHeroLevel);
                    if (vo) {
                        this.ui.imgIcon.skin = PathConfig.HEAD_PATH + vo.imgUrl;
                        this.ui.txt_name.text = "获得：" + vo.name + "x" + itemData.num * LuckPrizeView.magnification;
                        for (let index = 0; index < LuckPrizeView.magnification; index++) {
                            let hero: HeadItem = HallControl.Ins.createHero(vo.id, true);
                            if (hero == null) {
                                StorageUtil.saveHeroStore(vo.id);
                                MsgMgr.Ins.showMsg("主人,武将已打包到箱子里了哦~记得点击箱子喲!");
                            }
                        }
                    }
                }
            }
        }
    }

    public close(...param: any[]): void {
        super.close(param);
        this.callback && this.callback();
    }
}