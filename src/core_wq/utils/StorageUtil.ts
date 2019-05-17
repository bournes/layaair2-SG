import HttpMgr from "../net/HttpMgr";
import HttpRequestHelper from "../net/HttpRequestHelper";
import PathConfig from "../config/PathConfig";
import PlayerMgr from "../player/PlayerMgr";
import GlobalData from "../db/GlobalData";
import HeroConfigVO from "../db/vo/HeroConfigVO";
import HallControl from "../../module/hall/HallControl";
import HallModel from "../../module/hall/model/HallModel";
import MathUtil from "./MathUtil";
import ShareMgr from "../msg/ShareMgr";
import EventsMgr from "../event/EventsMgr";
import EventType from "../event/EventType";
import TimeUtil from "./TimeUtil";
import GuideMgr from "../guide/GuideMgr";
import AppConfig from "../config/AppConfig";

/**
 * 缓存工具
 */
export default class StorageUtil extends Laya.Script {

    private static storage_user_old: string = 'user_data'; //保存本地v1.0
    private static storage_user: string = 'user_data_111'; //保存本地
    private static hero_store_key: string = "car_store_key"; //本地保存兵营车辆
    private static s_version_clear = 's_version_clear'; //版本清理
    private static s_offlinePrize_time = 's_offlinePrize_time'; //离线奖励时间
    private static s_offline_time = 's_offline_time'; //离线服务器时间
    private static _isLoadStorage: boolean = false; //是否已加载本地数据
    private static carparkJsonRecord: string = ''; //防止提交相同数据给服务器
    private static carshopJsonRecord: string = ''; //防止提交相同数据给服务器

    constructor() { super(); }

    /** 新老版本更新检测（防止老数据覆盖） */
    public static versionCheck(callback: any): void {
        let that = this;
        if (AppConfig.isDebug) {
            callback && callback();
            return;
        }
        let storage = window.localStorage;
        HttpMgr.Ins.requestVersionCheck((_res: any) => {
            if (_res && _res.clear_flag) {
                //清理老数据
                storage.setItem(that.s_version_clear, 'true');
            }
        });
        //上一次记录清理
        let dataJson = storage.getItem(that.s_version_clear);
        if (dataJson) {
            //需要清理数据
            HttpMgr.Ins.requestVersionClear((_res: any) => {
                storage.removeItem(that.s_version_clear);
                that.clearLocalData();
                callback && callback();
            });
        } else {
            callback && callback();
        }
    }

    /** 保存缓存到本地 */
    private static guideStep: number = 0;
    public static saveStorageToLocal(upload: boolean = false): void {
        if (StorageUtil._isLoadStorage == false) {
            console.log("@David 未同步本地/服务器数据");
            return;
        } else if (HallControl.Ins.IsGuide) {
            return;
        }
        let localData: any = {};
        localData["userGold"] = PlayerMgr.Ins.Info.userGold;
        localData["userLevel"] = PlayerMgr.Ins.Info.userLevel;
        localData["userId"] = PlayerMgr.Ins.Info.userId;
        localData["userExp"] = PlayerMgr.Ins.Info.userExp;
        localData["AllHeros"] = HallControl.Ins.Model.AllHeros;
        localData["BuyHerosRecord"] = HallControl.Ins.Model.BuyHerosRecord;
        localData["AllHeros"] = HallControl.Ins.Model.AllHeros;
        localData["heroLevel"] = HallControl.Ins.Model.heroLevel;
        localData["heroCount"] = HallControl.Ins.Model.heroCount;
        localData["guideStep"] = GuideMgr.Ins.guideStep;
        let dataJson = JSON.stringify(localData);
        if (dataJson) {
            if (StorageUtil.guideStep != GuideMgr.Ins.guideStep) {
                HttpMgr.Ins.requestGuideStep(GuideMgr.Ins.guideStep);
                StorageUtil.guideStep = GuideMgr.Ins.guideStep;
            }
            let storage = window.localStorage;
            storage.setItem(StorageUtil.storage_user, dataJson);
        }

        if (upload) {
            StorageUtil.requestSaveHerosData();
            StorageUtil.requestSaveHeroShopData();
            StorageUtil.requestSaveUserInfoData();
        }
    }

    /** 取出本地数据 */
    public static loadStorage(callback: any): void {
        StorageUtil._isLoadStorage = true;
        let storage = window.localStorage;
        let dataJson = storage.getItem(StorageUtil.storage_user);
        if (dataJson) {
            let jsonObj = JSON.parse(dataJson);
            if (jsonObj) {
                PlayerMgr.Ins.Info.userGold = jsonObj["userGold"];
                PlayerMgr.Ins.Info.userLevel = jsonObj["userLevel"];
                PlayerMgr.Ins.Info.userId = jsonObj["userId"];
                PlayerMgr.Ins.Info.userExp = jsonObj["userExp"];
                HallControl.Ins.Model.AllHeros = jsonObj["AllHeros"];
                HallControl.Ins.Model.BuyHerosRecord = jsonObj["BuyHerosRecord"];
                HallControl.Ins.Model.heroLevel = jsonObj["heroLevel"];
                HallControl.Ins.Model.heroCount = jsonObj["heroCount"];
                GuideMgr.Ins.guideStep = jsonObj["guideStep"];
            }
            callback && callback(true);
        } else {
            // if (Laya.Browser.onPC) {  //测试用
                callback && callback(true);
                return;
            // }
            //从服务器同步数据
            let serverDataProgress = 3;
            HttpMgr.Ins.requestCarparkData((res: any) => {
                if (res.length > 0) {
                    HallControl.Ins.Model.AllHeros = res;
                }
                serverDataProgress--;
                if (serverDataProgress < 1) {
                    callback && callback(true);
                }
            });
            HttpMgr.Ins.requestCarshopData((res: any) => {
                serverDataProgress--;
                HallControl.Ins.Model.BuyHerosRecord = res;
                if (serverDataProgress < 1) {
                    callback && callback(true);
                }
            });
            HttpMgr.Ins.requestUserInfoData((res: any) => {
                if (res) {
                    console.log("@David 用户基础信息：", res);
                    PlayerMgr.Ins.Info.userId = res.id;
                    PlayerMgr.Ins.Info.userGold = MathUtil.parseStringNum(res.money);
                    PlayerMgr.Ins.Info.userDiamond = MathUtil.parseStringNum(res.diamond);
                    PlayerMgr.Ins.Info.userLevel = MathUtil.parseInt(res.level);
                    PlayerMgr.Ins.Info.userExp = MathUtil.parseStringNum(res.exp);
                    HallControl.Ins.Model.heroLevel = MathUtil.parseInt(res.car_level);
                    GuideMgr.Ins.guideStep = MathUtil.parseInt(res.tutorial);
                }
                serverDataProgress--;
                if (serverDataProgress < 1) {
                    callback && callback(true);
                }
            });
            //超时尝试重新请求
            Laya.stage.timerOnce(12000, this, () => {
                console.log("@David 超时尝试重新请求:", serverDataProgress);
                if (serverDataProgress > 0) {
                    StorageUtil.loadStorage(callback);
                }
            });
        }
        //请求分享开关
        HttpMgr.Ins.requestShareFlag((res: any) => {
            ShareMgr.Ins.shareSwitchOpen = res;
        });
        HttpMgr.Ins.requestUserBaseData((res: any) => {
            let model: HallModel = HallControl.Ins.Model;
            if (model) {
                model.shareAdTimes = res.operation;
                model.showShareGiftRedPoint = res.share_reward_flag;
                model.showDailySignRedPoint = res.sign_flag;
                model.showTaskRedPoint = res.task_flag;
                model.showLuckPrizeRedPoint = res.roulette_flag;
                model.showFollowRedPoint = res.follow_flag;
                model.advert = res.advert;
                model.diamond_acce_num = res.diamond_acce_num;
            }
        });
    }

    public static isLoadStorage(): boolean {
        return this._isLoadStorage;
    }

    /** 英雄数据 */
    private static requestSaveHerosData(): void {
        let self = this;
        let dataJson = JSON.stringify(HallControl.Ins.Model.AllHeros);
        //非法数据过滤
        if (dataJson == null || dataJson.length < 1 || HallControl.Ins.Model.AllHeros.length < 1) {
            return;
        } else if (self.carparkJsonRecord == dataJson) {
            console.log("@David requestSaveHerosData数据未刷新");
            return;
        }
        self.carparkJsonRecord = dataJson;
        let dataString = 'info=' + dataJson;
        console.log("@David requestSaveHerosData:", dataString);
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v3/seat/post',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("@David requestSaveHerosData:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 英雄商店数据 */
    private static requestSaveHeroShopData(): void {
        let dataJson = JSON.stringify(HallControl.Ins.Model.BuyHerosRecord);
        //非法数据过滤
        if (dataJson == null || dataJson.length < 1 || HallControl.Ins.Model.BuyHerosRecord.length < 1) {
            return;
        } else if (this.carshopJsonRecord == dataJson) {
            console.log("@David requestSaveHeroShopData数据未刷新");
            return;
        }
        this.carshopJsonRecord = dataJson;
        let dataString = 'info=' + dataJson;
        console.log("@David requestSaveHeroShopData:", dataString);
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v3/shop/post',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("@David requestSaveHeroShopData:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 保存用户信息金币 */
    private static requestSaveUserInfoData(): void {
        let dataString = 'money=' + PlayerMgr.Ins.Info.userGold +
            '&car_level=' + HallControl.Ins.Model.heroLevel +
            '&level=' + PlayerMgr.Ins.Info.userLevel +
            '&exp=' + PlayerMgr.Ins.Info.userExp +
            '&asset=' + Math.floor(PlayerMgr.Ins.Info.userGold + HallControl.Ins.Model.heroAllAsset());
        console.log("@David 保存用户信息金币:", dataString);
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v3/userinfo/post',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("@David 保存用户信息金币:", res);
            },
            fail: function (res) {
                console.log("@David 保存用户信息金币错误:", res);
            }
        });
    }

    /** 保存加速剩余时间 */
    public static saveAcceLeftTime(_acceLeftTime: number): void {
        let storage = window.localStorage;
        if (_acceLeftTime > 0) {
            storage.setItem(HallControl.Ins.Model.s_acceLeft_time, _acceLeftTime.toString());
        } else {
            storage.removeItem(HallControl.Ins.Model.s_acceLeft_time);
        }
    }

    /** 获取加速剩余时间 */
    public static getAcceLeftTime(): number {
        let storage = window.localStorage;
        let dataJson = storage.getItem(HallControl.Ins.Model.s_acceLeft_time);
        if (dataJson) {
            let acceLeftTime: number = MathUtil.parseInt(dataJson);
            storage.removeItem(HallControl.Ins.Model.s_acceLeft_time);
            return acceLeftTime;
        }
        return 0;
    }

    /** 缓存单个英雄 */
    public static saveHeroStore(heroId: number): void {
        if (heroId < 1) return;
        let heroAry: number[] = [];
        let storage = window.localStorage;
        let dataJson = storage.getItem(this.hero_store_key);
        if (dataJson) {
            let jsonObj = JSON.parse(dataJson) as Array<number>;
            if (jsonObj) {
                heroAry = jsonObj;
            }
        }
        if (heroAry) {
            heroAry.push(heroId);
            let dataJson = JSON.stringify(heroAry);
            if (dataJson) {
                storage.setItem(this.hero_store_key, dataJson);
            }
        }
        EventsMgr.Ins.dispatch(EventType.HERO_BOX);
    }

    /** 取出缓存英雄 */
    public static popHeroStore(isRemove: boolean = false): number {
        let storage = window.localStorage;
        let dataJson = storage.getItem(this.hero_store_key);
        if (dataJson) {
            let jsonObj = JSON.parse(dataJson) as Array<number>;
            if (jsonObj) {
                let carId = jsonObj.shift() as number;
                //保存移除
                if (isRemove) {
                    let dataJson = JSON.stringify(jsonObj);
                    if (dataJson) {
                        storage.setItem(this.hero_store_key, dataJson);
                    }
                }
                if (carId) {
                    return carId;
                }
            }
        }
        return 0;
    }

    /** 离线奖励 */
    public static offlinePrize(): number {
        let that = this;
        let storage = window.localStorage;
        let dataJson = storage.getItem(that.s_offlinePrize_time);
        let offlineTime: number = MathUtil.parseInt(dataJson);
        if (offlineTime > 0) {
            storage.removeItem(that.s_offlinePrize_time);
        }
        return offlineTime;
    }

    /** 查询离线奖励 */
    public static requestOfflinePrizeData(): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v3/login',
            success: function (res) {
                console.log("@David 查询离线奖励:", res);
                let offlineTime = MathUtil.parseInt(res.time); //离线时长
                let login_time = MathUtil.parseInt(res.login_time); //登录当前服务器时间
                let cur_time = (new Date()).getTime() / 1000;
                TimeUtil.cs_time_diff = login_time - cur_time;
                let storage = window.localStorage;
                let dataJson = storage.getItem(that.s_offline_time);
                console.log("读取本地离线:", dataJson);
                if (dataJson) {
                    offlineTime = 0;
                    let last_logout_time = MathUtil.parseInt(dataJson); //上次离线时间
                    console.log(login_time, cur_time, last_logout_time, (login_time - last_logout_time), TimeUtil.cs_time_diff);
                    if (!isNaN(last_logout_time) && login_time > last_logout_time) {
                        offlineTime = login_time - last_logout_time;
                    }
                    storage.removeItem(that.s_offline_time);
                }
                console.log("离线奖励:", offlineTime);
                if (offlineTime > 0) {
                    storage.setItem(that.s_offlinePrize_time, offlineTime.toString());
                    EventsMgr.Ins.dispatch(EventType.SHOW_OFFLINE_REWARD);
                }
                HttpMgr.Ins.requestNotifyServerPrize();
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    //保存离线时间
    public static saveOfflineTime(): void {
        let that = this;
        let storage = window.localStorage;
        let offlineServerTime: number = TimeUtil.serverTime();
        storage.setItem(that.s_offline_time, offlineServerTime.toString());
    }

    /** 移除缓存数据 */
    public static clearLocalData(): void {
        let storage = window.localStorage;
        if (storage) {
            storage.removeItem(this.storage_user_old);
            storage.removeItem(this.storage_user);
        }
    }
}