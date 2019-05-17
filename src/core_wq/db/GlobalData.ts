import PathConfig from "../config/PathConfig";
import HeroVO from "./vo/HeroVO";
import TSDictionary from "../utils/TSDictionary";
import CSVParser from "./base/CSVParser";
import HeroConfigVO from "./vo/HeroConfigVO";
import LevelVO from "./vo/LevelVO";
import SoundVO from "./vo/SoundVO";
import GuideVO from "./vo/GuideVO";
import MapVO from "./vo/MapVO";
import SystemVO from "./vo/SystemVO";
import DropVO from "./vo/DropVO";
import LotteryRosterVO from "./vo/LotteryRosterVO";

export default class GlobalData extends Laya.Script {

    /** json数据是否全部解析完毕 */
    private _hasParasComplete: boolean = false;
    private _totalStepCsvList: TSDictionary<string, any>;
    private _needParseCount: number = 0;
    private _currParseCount: number = 0;
    private _jsonCount: number = 0;
    private _callBack: Function;
    private static AllCacheData: TSDictionary<string, TSDictionary<number, any>>;

    public setup(callback: Function): void {
        this._callBack = callback;
        this._totalStepCsvList = new TSDictionary<string, any>();
        GlobalData.AllCacheData = new TSDictionary<string, TSDictionary<number, any>>();
        this.initModel();
        this.initStep();
    }

    /** 英雄基础表 */
    public static HeroVO: string = "Hero_json";
    /** 英雄配置表 */
    public static HeroConfigVO: string = "HeroConfig_json";
    /** 等级配置表 */
    public static LevelVO: string = "Level_json";
    /** 声音表 */
    public static SoundVO: string = "Sound_json";
    /** 新手引导表 */
    public static GuideVO: string = "Guide_json";
    /** 地图表 */
    public static MapVO: string = "Map_json";
    /** 功能开放表 */
    public static SystemVO: string = "System_json";
    /** 掉落表 */
    public static DropVO: string = "Drop_json";
    /** 转盘中奖表 */
    public static LotteryRosterVO: string = "LotteryRoster_json";

    private initModel(): void {
        this._totalStepCsvList.Add(GlobalData.HeroVO, HeroVO);
        this._totalStepCsvList.Add(GlobalData.HeroConfigVO, HeroConfigVO);
        this._totalStepCsvList.Add(GlobalData.LevelVO, LevelVO);
        this._totalStepCsvList.Add(GlobalData.SoundVO, SoundVO);
        this._totalStepCsvList.Add(GlobalData.GuideVO, GuideVO);
        this._totalStepCsvList.Add(GlobalData.MapVO, MapVO);
        this._totalStepCsvList.Add(GlobalData.SystemVO, SystemVO);
        this._totalStepCsvList.Add(GlobalData.DropVO, DropVO);
        this._totalStepCsvList.Add(GlobalData.LotteryRosterVO, LotteryRosterVO);
    }

    // 解析初始数据表
    private initStep(): void {
        this._needParseCount = this._totalStepCsvList.GetLenght();
        this.onEnterFrameLoader();
    }

    private onEnterFrameLoader(): void {
        if (this._currParseCount >= this._needParseCount) {
            this._hasParasComplete = true;
            this._callBack && this._callBack();
        }
        else {
            //一次解析两个文件
            this.getCsvFile();
            // this.getCsvFile();
        }
    }

    /** 开始逐个逐个解析JSON文件 */
    private getCsvFile(): void {
        if (this._jsonCount < this._needParseCount) {
            let key: string = this._totalStepCsvList.getKeyByIndex(this._jsonCount);
            key = "config/csvJson/" + key;
            key = key.replace('_', '.');
            Laya.loader.load(key, Laya.Handler.create(this, this.onLoaded, [key]), null, Laya.Loader.TEXT, 0, true);
            this._jsonCount++;
        }
    }

    private onLoaded(key: string): void {
        let data = Laya.loader.getRes(key);
        try {
            if (data) {
                let data_json: any = JSON.parse(data);
                let csvStr: string = JSON.stringify(data_json);
                this.starSingleParse(csvStr);
            }
        } catch (error) {
            this._jsonCount--;
        } finally {
            this.onEnterFrameLoader();
        }
    }

    private starSingleParse(csvStr: string): void {
        let key: string = this._totalStepCsvList.getKeyByIndex(this._currParseCount);
        let DataClass: any = this._totalStepCsvList.getValueByIndex(this._currParseCount);
        let dic: TSDictionary<number, any> = CSVParser.ParseJsonData(DataClass, csvStr);
        GlobalData.AllCacheData.Add(key, dic);
        // console.log("@David 表数据：key:", key, " --- data:", dic);
        this._currParseCount++;
    }

    /** 获取对应表的指定某条数据 */
    public static getData(type: string, key: number): any {
        let dic: TSDictionary<number, any> = GlobalData.AllCacheData.TryGetValue(type);
        return dic.TryGetValue(key);
    }

    /**
     * 获取对应表的某条数据中指定名字下的数据
     * @param type 那张表
     * @param filterType 某一项名字
     * @param filterValue 值
     * 例如：parseInt(GlobleVOData.getDataByFilter(GlobleVOData.ServerConfigVO, "id", "MAX_MAP_COUNT")[0].value)
     */
    public static getDataByFilter(type: string, filterType: any, filterValue: any): any[] {
        let dic: TSDictionary<number, any> = GlobalData.AllCacheData.TryGetValue(type);
        if (dic == null) return [];
        let filterd: any[] = dic.TryGetListByCondition((bean) => bean[filterType] == filterValue);
        return filterd;
    }

    /** 获取对应表的所有数据 */
    public static getAllValue(type: string): Array<any> {
        let dic: TSDictionary<number, any> = GlobalData.AllCacheData.TryGetValue(type);
        return dic == null ? [] : dic.getValues();
    }
    /**
     * 查找对应条件的数据
     */
    public static getDataByCondition(type: string, value: (value: any) => boolean): Array<any> {
        let dic: TSDictionary<number, any> = GlobalData.AllCacheData.TryGetValue(type);
        if (dic == null) return [];
        let arr: any[] = dic.TryGetListByCondition(value);
        return arr;
    }

    private static _instance: GlobalData;
    public constructor() { super(); }
    public static get Ins(): GlobalData {
        if (!GlobalData._instance) {
            GlobalData._instance = new GlobalData();
        }
        return GlobalData._instance;
    }
}