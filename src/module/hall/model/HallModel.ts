import HeroConfigVO from "../../../core_wq/db/vo/HeroConfigVO";
import GlobalData from "../../../core_wq/db/GlobalData";
import StorageUtil from "../../../core_wq/utils/StorageUtil";

export default class HallModel extends Laya.Script {

    /** 英雄最高等级 */
    public heroMaxLevel: number = 30;
    /** 英雄合成数量 */
    public heroCount: number = 0;
    /** 总英雄的数量 */
    public allHeroCount: number = 15;
    /** 屏幕滚动速度 */
    public viewRollSpeep: number = 2;
    /** 每屏 */
    public foregroundIndex: number = 0;
    /** 前景每屏宽度 */
    public foregroundWidth: number = 1991;//3034
    /** 每屏 */
    public fargroundIndex: number = 0;
    /** 远景每屏宽度 */
    public fargroundWidth: number = 1986;//2135
    /** 滚屏(最前景) */
    public topForegroundIndex: number = 0;
    /** 每屏宽度 */
    public topForegroundWidth: number = 750;
    /** 启动加速x2 */
    public userAcceValue: number = 1;
    /** 加速时间 */
    public userAcceTime: number = 0;
    /** 当前英雄最高等级 */
    public heroLevel: number = 1;
    /** 分享广告可点击次数 */
    public shareAdTimes: any = {};
    /** 广告 */
    public advert: Array<any> = [];
    /** 是否有视频广告 */
    public hasVideoAd: boolean = true;
    /** 每日元宝加速次数 */
    public diamond_acce_num: number = 0;
    /** 加速剩余时间 */
    public s_acceLeft_time = 's_acceLeft_time';
    /** 层次重拍 */
    public is_reset_zorder: boolean = false;

    /************************红点系列 start************************/
    /** 分享礼包红点 */
    public showShareGiftRedPoint: boolean = false;
    /** 每日签到红点 */
    public showDailySignRedPoint: boolean = false;
    /** 任务红点 */
    public showTaskRedPoint: boolean = false;
    /** 转盘红点 */
    public showLuckPrizeRedPoint: boolean = false;
    /** 关注奖励红点 */
    public showFollowRedPoint: boolean = false;
    /************************红点系列 end************************/

    /** 所有的英雄信息 { id: index, heroId: 0, isRunning: false } */
    private _allHeros: { id: number, heroId: number, isRunning: boolean }[] = [];
    /** 购买英雄记录  {heroId: 1, buyTimes:0}*/
    private _buyHerosRecord: { heroId: number, buyTimes: number, diamondBuyTimes: number }[] = [];
    /**
     * 英雄初始消费价格
     * 1、一级英雄单个钻石定价为：36
     * 2、英雄成本递增为上一级的1.3，购买次数递增为上一级的一点1.18，车（钻石价）=36*1.3^（n-1）
     */
    private _heroBaseDiamondPrice: number = 36;

    public constructor() {
        super();
        this.initAllHeros();
    }

    /** 初始化英雄信息 */
    public initAllHeros(): void {
        if (this._allHeros.length < 1) {
            for (let index = 0; index < this.allHeroCount; index++) {
                this._allHeros.push({ id: index, heroId: 0, isRunning: false });
            }
        }
    }

    /** 获取当前可以招募英雄的数据 */
    public getRecruitHeroData(): HeroConfigVO {
        let heroDatas = GlobalData.getDataByCondition(GlobalData.HeroConfigVO, (data: HeroConfigVO) => {
            return this.heroLevel >= data.unlockNeedId;
        });
        if (heroDatas && heroDatas.length > 0) {
            return heroDatas[heroDatas.length - 1];
        }
        return null;
    }

    /** 获取最新开锁(可购买)的前n位英雄的配置 */
    public getPreNewHeroData(unlockCarId: number, index: number = 0): HeroConfigVO {
        let heroData: HeroConfigVO[] = GlobalData.getAllValue(GlobalData.HeroConfigVO);
        if (heroData) {
            for (var key in heroData) {
                if (heroData.hasOwnProperty(key)) {
                    var element = heroData[key];
                    if (unlockCarId < element.unlockNeedId) {
                        let heroId: number = parseInt(key) + index;
                        return GlobalData.getData(GlobalData.HeroConfigVO, heroId)
                    }
                }
            }
        }
        return null;
    }

    /** 购买单个英雄价格 */
    public getHeroBuyPrice(price: number, buyTimes: number): number {
        if (buyTimes > 0) {
            return price * Math.pow(1.15, buyTimes);
        }
        return price;
    }

    /** 查询购买英雄记录 */
    public queryBuyHeroRecord(heroId: number, isDiamond: boolean = false): number {
        for (let key in this._buyHerosRecord) {
            let element = this._buyHerosRecord[key];
            if (element) {
                if (element.heroId == heroId) {
                    if (isDiamond) {
                        return this._buyHerosRecord[key].diamondBuyTimes;
                    } else {
                        return this._buyHerosRecord[key].buyTimes;
                    }
                }
            }
        }
        return 0;
    }

    /** 查询购买英雄最高记录 */
    public queryBuyHeroRecordTop(): number {
        let buyTimes: number = 0;
        let index: number = 0;
        for (let key in this._buyHerosRecord) {
            let element = this._buyHerosRecord[key];
            if (element) {
                if (index > (this._buyHerosRecord.length - 4)) {
                    if (buyTimes < this._buyHerosRecord[key].buyTimes) {
                        buyTimes = this._buyHerosRecord[key].buyTimes;
                    }
                }
                index++;
            }
        }
        return buyTimes;
    }

    /** 刷新购买英雄记录 */
    public refreshBuyHeroRecord(heroId: number, isDiamond: boolean = false): void {
        let isNew: boolean = true;
        for (let key in this._buyHerosRecord) {
            let element = this._buyHerosRecord[key];
            if (element && element.heroId == heroId) {
                if (isDiamond) {
                    this._buyHerosRecord[key].diamondBuyTimes++;
                } else {
                    this._buyHerosRecord[key].buyTimes++;
                }
                isNew = false;
                return;
            }
        }
        if (isNew) {
            if (isDiamond) {
                this._buyHerosRecord.push({ heroId: heroId, buyTimes: 0, diamondBuyTimes: 1 });
            } else {
                this._buyHerosRecord.push({ heroId: heroId, buyTimes: 1, diamondBuyTimes: 0 });
            }
        }
        Laya.timer.callLater(this, StorageUtil.saveStorageToLocal, [true]);
    }

    /** 每日元宝加速次数 */
    public diamondAcceTimes(isAdd: boolean = false): number {
        let diamondAcceTimes = this.diamond_acce_num;
        if (isAdd) {
            this.diamond_acce_num++;
        }
        return diamondAcceTimes;
    }

    /** 钻石购买英雄的价格 */
    public getDiamondBuyHeroPrice(heroId: number, buyTimes: number): number {
        if (heroId < 1) return this._heroBaseDiamondPrice;
        var heroPrice = this._heroBaseDiamondPrice;
        var foreCarId = 20;
        if (heroId > foreCarId) {
            heroPrice = heroPrice * Math.pow(1.085, (foreCarId - 1)) * Math.pow(1.25, (heroId - foreCarId));
        } else {
            heroPrice = heroPrice * Math.pow(1.085, (heroId - 1));
        }
        if (buyTimes > 0) {
            heroPrice = heroPrice * Math.pow(1.2, buyTimes);
        }
        heroPrice = Math.ceil(heroPrice); //四舍五入
        return heroPrice;
    }

    /** 计算英雄总资产（基础价格） */
    public heroAllAsset(): number {
        let allAsset = 0;
        if (this._allHeros && this._allHeros.length > 0) {
            this._allHeros.forEach(element => {
                if (element && element.heroId > 0) {
                    let vo: HeroConfigVO = GlobalData.getData(GlobalData.HeroConfigVO, element.heroId);
                    if (vo) {
                        allAsset += this.getHeroBuyPrice(vo.buyPrice, this.queryBuyHeroRecord(vo.id));
                    }
                }
            });
        }
        return allAsset;
    }

    set AllHeros(value: any[]) { this._allHeros = value; }
    get AllHeros(): any[] { return this._allHeros; }

    set BuyHerosRecord(value: any[]) { this._buyHerosRecord = value; }
    /** 购买英雄记录  {heroId: 1, buyTimes:0} */
    get BuyHerosRecord(): any[] { return this._buyHerosRecord; }

}
