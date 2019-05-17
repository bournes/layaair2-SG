import BaseView from "../../../core_wq/view/base/BaseView";
import LayerMgr from "../../../core_wq/layer/LayerMgr";
import { ui } from "../../../ui/layaMaxUI";
import HttpMgr from "../../../core_wq/net/HttpMgr";
import MathUtil from "../../../core_wq/utils/MathUtil";
import RankItem from "./RankItem";
import PathConfig from "../../../core_wq/config/PathConfig";
import BoneAnim from "../../../core_wq/bone/BoneAnim";
import HeroVO from "../../../core_wq/db/vo/HeroVO";
import GlobalData from "../../../core_wq/db/GlobalData";

/**
 * 排行榜
 */
export default class RankView extends BaseView {


    private static isInitWorlHero: boolean = false;
    private curSelectedIndex: number = -1;
    private isWorldRanking: boolean = true;
    /** 收益榜数据 */
    private _incomeRankData: any;
    /** 世界榜数据 */
    private _worldRankData: any;

    constructor() {
        super(LayerMgr.Ins.frameLayer, ui.moduleView.rank.RankViewUI);
    }

    public initUI(): void {
        super.initUI();
        this.ui.lists.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this.initWorldRank();
    }

    /** 初始化世界榜 */
    private initWorldRank(): void {
        this.ui.imgBase.visible = false;
        HttpMgr.Ins.requestWorldRankingData((data: any) => {
            this._worldRankData = data;
            if (this._worldRankData) {
                this.updateRankList(this._worldRankData);
                this.ui.imgBase.visible = true;
                if (this._worldRankData.length > 0 && RankView.isInitWorlHero == false) {
                    this.showBaseHero(this._worldRankData);
                }
            }
            this.showMyWorldRank();
        })
    }

    /** 显示我的世界榜排名 */
    private showMyWorldRank(): void {
        HttpMgr.Ins.requestMyWorldRankData((rankNum: any) => {
            if (rankNum) {
                this.ui.txt_myRank.text = rankNum + "";
            }
        })
    }

    /** 初始化收益排行榜 */
    private initIncomeRank(): void {
        HttpMgr.Ins.requestIncomeRankingData((data: any) => {
            this._incomeRankData = data;
            if (this._incomeRankData) {
                if (this._incomeRankData && this._incomeRankData.length > 0) {
                    this._incomeRankData.forEach(element => {
                        let asset: number = MathUtil.parseStringNum(element.week_output);
                        if (asset < 0) element.week_output = 0;
                    });
                }
                this.updateRankList(this._incomeRankData);
            }
            this.showMyIncomeRank();
        });
    }

    /** 显示我的收益榜排名 */
    private showMyIncomeRank(): void {
        HttpMgr.Ins.requestMyIncomeRankData((rankNum: any) => {
            if (rankNum) {
                this.ui.txt_myRank.text = rankNum + "";
            }
        })
    }

    private updateRankList(rankData: any): void {
        this.ui.txt_noRank.visible = true;
        this.ui.lists.visible = false;
        this.ui.imgMyRank.visible = false;
        if (rankData && rankData.length > 0) {
            this.ui.txt_noRank.visible = false;
            this.ui.lists.visible = true;
            this.ui.imgMyRank.visible = true;
            this.ui.lists.array = rankData;
        }
    }

    /** 显示底座上的英雄 */
    private showBaseHero(rankData): void {
        let count: number = rankData.length <= 3 ? rankData.length : 3;
        RankView.isInitWorlHero = true;
        for (let index = 0; index < count; index++) {
            const data = rankData[index];
            if (data) {
                let vo: HeroVO = GlobalData.getData(GlobalData.HeroVO, data.car_level);
                if (vo) {
                    let heroBone: BoneAnim = new BoneAnim(vo.modelImgUrl, true, true);
                    this.ui.imgBase.addChild(heroBone);
                    heroBone.pos(this.ui["pos_" + index].x, this.ui["pos_" + index].y);
                    this.ui["txt_name" + index].text = data.nick_name;
                    this.ui["txt_name" + index].visible = true;
                }
            }
        }
    }

    public addEvents(): void {
        this.ui.tab_rank.on(Laya.Event.CLICK, this, this.onRankTab);
    }

    public removeEvents(): void {
        this.ui.tab_rank.off(Laya.Event.CLICK, this, this.onRankTab);
    }

    /** tab选择 0世界榜/1收益榜 */
    private onRankTab(): void {
        if (this.curSelectedIndex == this.ui.tab_rank.selectedIndex) return;
        this.curSelectedIndex = this.ui.tab_rank.selectedIndex;
        this.isWorldRanking = (0 == this.ui.tab_rank.selectedIndex);
        if (this.isWorldRanking) {  //世界榜
            this.ui.lists.height = 465;
            this.ui.lists.y = 454;
            this.ui.imgBase.visible = true;
            this._worldRankData != null ? this.updateRankList(this._worldRankData) : this.initWorldRank();
        } else {    //收益榜
            this.ui.lists.height = 735;
            this.ui.lists.y = 185;
            this.ui.imgBase.visible = false;
            this._incomeRankData != null ? this.updateRankList(this._incomeRankData) : this.initIncomeRank();
        }
    }

    private onListRender(cell: Laya.Box, index: number): void {
        if (index > this.ui.lists.array.length) return;
        let item: RankItem = cell.getChildByName("item") as RankItem;
        if (item) {
            let data = this.ui.lists.array[index]
            item.dataSource = data;
            item.box_title.visible = this.isWorldRanking;
            item.box_price.visible = !this.isWorldRanking;
            item.imgRank.visible = index < 3;
            item.txt_rank.visible = !item.imgRank.visible;
            if (item.imgRank.visible) {
                item.imgRank.skin = PathConfig.RANK_PATH.replace("{0}", (index + 1) + "");
            } else {
                item.txt_rank.text = (index + 1) + "";
            }
            if (this.isWorldRanking) {
                let vo: HeroVO = GlobalData.getData(GlobalData.HeroVO, data.car_level);
                if (vo) item.txt_title.text = vo.name;
            } else {
                item.txt_score.text = data.week_output;
            }
        }
    }
}