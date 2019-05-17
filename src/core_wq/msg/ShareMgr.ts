import HallControl from "../../module/hall/HallControl";
import HallModel from "../../module/hall/model/HallModel";
import MathUtil from "../utils/MathUtil";
import HttpMgr from "../net/HttpMgr";
import MsgMgr from "./MsgMgr";
import PlayerMgr from "../player/PlayerMgr";
import EventsMgr from "../event/EventsMgr";
import EventType from "../event/EventType";
import SDKMgr from "./SDKMgr";
import AppConfig from "../config/AppConfig";

export default class ShareMgr extends Laya.Script {

    private _model: HallModel;
    private _shareFailedTimes: number = 0; //分享失败保底
    private _isOpenShareAd: boolean = false; //打开视频分享
    public shareSwitchOpen: boolean = false; //分享开关打开

    constructor() {
        super();
        this._model = HallControl.Ins.Model;
    }

    /** 请求分享/视频 */
    public showShareOrAdv(callback: any = null, type: number = 0, isTask: boolean = false, isGroupShare: boolean = false): number {
        if (AppConfig.isDebug) {
            callback && callback();
            return;
        }
        if (this._isOpenShareAd) {
            return 0;
        }
        this._isOpenShareAd = true;
        Laya.stage.timerOnce(1000, this, () => {
            this._isOpenShareAd = false;
        })
        //是否优先视频广告
        if (this.getAdTimes(type) > 0) {
            // SDKMgr.Ins.showVideoAd((_res: any) => {
            //     if (_res && _res.isEnded || _res === undefined) {
            //         this.decreAdTimes(type);
            //         let adKey: string = "ad";
            //         if (type == 10) {
            //             adKey = "ad_acce";
            //         } else if (type == 11) {
            //             adKey = "ad_free_car";
            //         } else if (type == 12) {
            //             adKey = "ad_no_money";
            //         }
            //         HttpMgr.Ins.requestShareAdFinish(adKey);
            //         callback && callback();
            //     }
            // }, () => {
                //无视频回调
                this._model.hasVideoAd = false;
                this._isOpenShareAd = false;
                this.showShareOrAdv(callback, type, isTask, isGroupShare);
            // }, this.isShareEnable);
            return 0;
        }
        switch (type) {
            case 1:  //广告无限次数
                // SDKMgr.Ins.showVideoAd((_res: any) => {
                //     if (_res && _res.isEnded || _res === undefined) {
                //         callback && callback();
                //         HttpMgr.Ins.requestShareAdFinish("ad_other", _res);
                //     }
                // }, () => {
                    //无视频回调
                    this._model.hasVideoAd = false;
                    this._isOpenShareAd = false;
                    this.showShareOrAdv(callback, 0, isTask, isGroupShare);
                // });
                break;
            case 10://加速
                if (this.getShareTimes(type) < 1) {
                    MsgMgr.Ins.showMsg("今日分享次数已用完");
                    return 1;
                }
                this.toShare((_res: any) => {
                    this.decreShareTimes(type);
                    HttpMgr.Ins.requestShareAdFinish("share_acce", _res);
                    callback && callback();
                }, isTask, isGroupShare);
                break;
            case 11://免费的车
                if (this.getShareTimes(type) < 1) {
                    MsgMgr.Ins.showMsg("今日分享次数已用完");
                    return 1;
                }
                this.toShare((_res: any) => {
                    this.decreShareTimes(type);
                    HttpMgr.Ins.requestShareAdFinish("share_free_car", _res);
                    callback && callback();
                }, isTask, isGroupShare);
                break;
            case 12://无金币
                if (this.getShareTimes(type) < 1) {
                    MsgMgr.Ins.showMsg("今日分享次数已用完");
                    return 1;
                }
                this.toShare((_res: any) => {
                    MsgMgr.Ins.showMsg("求助已发出");
                    Laya.timer.once(30000, this, () => {
                        callback && callback();
                    });

                    this.decreShareTimes(type);
                    HttpMgr.Ins.requestShareAdFinish("share_no_money", _res);
                }, isTask, isGroupShare);
                break;
            default://分享无限次数
                this.toShare((_res: any) => {
                    callback && callback();
                    HttpMgr.Ins.requestShareAdFinish("share_other", _res);
                }, isTask, isGroupShare);
                break;
        }
        return 0;
    }

    /** 分享广告可点击次数 */
    public getAdTimes(type: number): number {
        if (this._model && this._model.shareAdTimes && this._model.hasVideoAd) {
            if (type == 10) {
                return MathUtil.parseInt(this._model.shareAdTimes.ad_acce_num);
            } else if (type == 11) {
                return MathUtil.parseInt(this._model.shareAdTimes.ad_free_car_num);
            } else if (type == 12) {
                return MathUtil.parseInt(this._model.shareAdTimes.ad_no_money_num);
            }
        }
        return 0;
    }

    /** 分享剩余次数 */
    public getShareTimes(type: number): number {
        if (this._model && this._model.shareAdTimes) {
            if (type == 10) {
                return MathUtil.parseInt(this._model.shareAdTimes.share_acce_num);
            } else if (type == 11) {
                return MathUtil.parseInt(this._model.shareAdTimes.share_free_car_num);
            } else if (type == 12) {
                return MathUtil.parseInt(this._model.shareAdTimes.share_no_money_num);
            }
        }
        return 0;
    }

    /** 减少分享广告可点击次数 */
    public decreAdTimes(type: number): void {
        if (this._model && this._model.shareAdTimes) {
            if (type == 10) {
                this._model.shareAdTimes.ad_acce_num--;
            } else if (type == 11) {
                this._model.shareAdTimes.ad_free_car_num--;
            } else if (type == 12) {
                this._model.shareAdTimes.ad_no_money_num--;
            } else {
                this._model.shareAdTimes.ad_num--;
            }
        }
        console.log("@David 减少分享广告可点击次数:", this._model.shareAdTimes);
    }

    /** 减少分享可点击次数 */
    public decreShareTimes(type: number): void {
        if (this._model.shareAdTimes) {
            if (type == 10) {
                this._model.shareAdTimes.share_acce_num--;
            } else if (type == 11) {
                this._model.shareAdTimes.share_free_car_num--;
            } else if (type == 12) {
                this._model.shareAdTimes.share_no_money_num--;
            }
        }
        console.log("@David 减少分享可点击次数:", this._model.shareAdTimes);
    }

    /** 分享或广告开关 */
    public isAdStage(type: number): boolean {
        return (this.getAdTimes(type) > 0);
    }


    //请求分享
    private toShare(callback: any = null, isTask: boolean = false, isGroupShare: boolean = false): void {
        HttpMgr.Ins.requestShareSubject((_res) => {
            if (!_res) {
                MsgMgr.Ins.showMsg("今日分享次数已用完");
                return;
            }
            let shareCfg = { imageUrl: _res.image, content: _res.describe, id: _res.id };
            let queryData: string = null;
            if (isTask) {
                queryData = "userId=" + PlayerMgr.Ins.Info.userId + "&shareId=" + shareCfg.id + "&shareType=task";
            } else {
                queryData = "userId=" + PlayerMgr.Ins.Info.userId + "&shareId=" + shareCfg.id + "&shareType=share";
            }
            //重返游戏
            let curTime: number = (new Date()).getTime() / 1000;
            let isAutoShare: boolean = true;
            EventsMgr.Ins.addListener(EventType.COME_BACK_GAME, (data: any) => {
                let backTime: number = (new Date()).getTime() / 1000;
                let leaveTime = backTime - curTime;
                if (isAutoShare && leaveTime > 2.3) {
                    if (this._shareFailedTimes > 1 || Math.random() > 0.5) {
                        this._shareFailedTimes = 0;
                        callback && callback(shareCfg.id);
                        HttpMgr.Ins.requestShareFinish(shareCfg.id);
                    } else {
                        this._shareFailedTimes++;
                        MsgMgr.Ins.showMsg("分享失败，请尝试重新分享");
                    }
                }
            }, this);

            // SDKMgr.Ins.wxOnShare({
            //     title: shareCfg.content,
            //     imageUrl: shareCfg.imageUrl,
            //     query: queryData,
            //     isGroupShare: isGroupShare,
            //     success: function (_res) {
            //     },
            //     fail: function () {
            //         console.log("转发失败!!!");
            //     }
            // })
        })
    }

    public get isShareEnable(): boolean {
        return this.shareSwitchOpen;
    }

    private static _instance: ShareMgr;
    public static get Ins(): ShareMgr {
        if (ShareMgr._instance == null) {
            ShareMgr._instance = new ShareMgr();
        }
        return ShareMgr._instance;
    }
}