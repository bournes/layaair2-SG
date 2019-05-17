import HttpMgr from "../net/HttpMgr";
import ShareMgr from "./ShareMgr";
import PlayerMgr from "../player/PlayerMgr";
import SoundMgr from "../sound/SoundMgr";
import SoundType from "../sound/SoundType";
import MsgMgr from "./MsgMgr";
import StorageUtil from "../utils/StorageUtil";
import HallControl from "../../module/hall/HallControl";
import LayerMgr from "../layer/LayerMgr";

export default class SDKMgr extends Laya.Script {

    public bannerAd: any; //bannerAd
    public isForbidBannerAd: boolean; //是否禁止播放bannerAd
    public videoAd: any; //videoAd
    private _authenticLoginBtn: any = null; //授权/登录专用
    private _isSharing = false; //是否正在分享（离线奖励）

    constructor() { super(); }

    // /** 初始化微信 */
    // public initWX(): void {
    //     return;
    //     if (!Laya.Browser.onWeiXin) return;
    //     this.wxOnShow();
    //     this.wxOnHide();
    //     this.wxMemoryWarning();
    //     this.wxSetKeepScreenOn();
    // }

    // /** 跳转小程序 */
    // public onMiniProgram(_miniCode: string, _miniPagePath: string): void {
    //     if (_miniCode == null || _miniCode.length < 1) {
    //         return;
    //     }
    //     this.wxNavigateToMiniProgram({
    //         // appId: 'wx10e1554b604d7568',
    //         appId: _miniCode,
    //         path: _miniPagePath,
    //         // extraData: {
    //         //     box: '1'
    //         // },
    //         // envVersion: 'develop',
    //         success(res) {
    //             console.log("mini跳转成功", res);
    //         }
    //     });
    //     //小程序跳转次数统计
    //     HttpMgr.Ins.requestShareAdFinish("minipro_" + _miniCode);
    // }

    // /** 显示banner广告 */
    // public showBannerAd(_force: boolean = false, _offsetY: number = 0): void {
    //     console.log("@David 显示banner广告");
    //     if (this.isForbidBannerAd && _force == false) {
    //         return;
    //     }
    //     this.closeBannerAd();
    //     let bannerAd = this.wxCreateBannerAd({
    //         adUnitId: 'adunit-ac9d79e1b7532c21',
    //         top: (1334 + _offsetY)
    //     });
    //     if (bannerAd) {
    //         bannerAd.show();
    //     }
    //     this.bannerAd = bannerAd;
    //     return bannerAd;
    // }

    // public closeBannerAd(_forbid: boolean = false): void {
    //     if (_forbid) {
    //         this.isForbidBannerAd = true;
    //     }
    //     if (this.bannerAd) {
    //         this.bannerAd.hide();
    //         this.bannerAd.destroy();
    //         this.bannerAd = null;
    //     }
    // }

    // /** 显示激励视频 */
    // public showVideoAd(_callback: any, _noAdCallback: any = null, _shareEnabled: boolean = true): void {
    //     if (this.videoAd) return;
    //     let videoAd = this.wxCreateRewardedVideoAd({ adUnitId: 'adunit-1847f3675e9f5699' });
    //     if (videoAd) {
    //         this.videoAd = videoAd;
    //         videoAd.load().then(() => videoAd.show());
    //         let closeCallback = (res) => {
    //             // 用户点击了【关闭广告】按钮
    //             // 小于 2.1.0 的基础库版本，res 是一个 undefined
    //             if (res && res.isEnded || res === undefined) {
    //                 // 正常播放结束，可以下发游戏奖励
    //             }
    //             else {
    //                 // 播放中途退出，不下发游戏奖励
    //             }
    //             this.isForbidBannerAd = false;
    //             _callback && _callback(res);

    //             videoAd.offClose(closeCallback);
    //             this.videoAd = null;
    //         }
    //         videoAd.onClose(closeCallback);
    //         let errCallback = (err) => {
    //             _noAdCallback && _noAdCallback();
    //         };
    //         videoAd.onError(errCallback);
    //         this.isForbidBannerAd = true;
    //     }
    // }

    // public wxGetOpenDataContext() {
    //     return window["wx"] ? wx.getOpenDataContext() : null;
    // }

    // /** 通知域刷新 */
    // public wxPostMessage(data) {
    //     wx.postMessage(data);
    // }

    // /** 获取微信token */
    // public wxHttpToken(baseUrl: any, callBack: Function = null, forceNew: boolean = false): any {
    //     let token = window["wx"] ? wx.getStorageSync("token") : "";
    //     if (token && forceNew == false) {
    //         callBack && callBack(token);
    //     } else {
    //         this.wxCreateToken(baseUrl, (token) => {
    //             callBack && callBack(token);
    //         })
    //     }
    //     return token;
    // }

    // /** 微信登陆 */
    // public wxLogin(statusCallback: Function): void {
    //     wx.getSetting({
    //         success: (result: _getSettingSuccessObject) => {
    //             if (result.authSetting['scope.userInfo']) { //授权成功
    //                 statusCallback && statusCallback(1);
    //                 wx.getUserInfo({
    //                     /** 是否带上登录态信息 */
    //                     withCredentials: true,
    //                     lang: "zh_CN",
    //                     success: (result: _getUserInfoSuccessObject) => {
    //                         // 获取用户信息
    //                         if (this._authenticLoginBtn) {
    //                             this._authenticLoginBtn.destroy();
    //                             this._authenticLoginBtn = null;
    //                         }
    //                         console.log("@David userInfo:", result.userInfo);
    //                         PlayerMgr.Ins.Info.wxUserInfo = result.userInfo;
    //                         statusCallback && statusCallback(2);
    //                     },
    //                     fail: () => { },
    //                     complete: () => { }
    //                 })
    //             } else { //没有授权
    //                 statusCallback && statusCallback(3);
    //                 if (this._authenticLoginBtn) {
    //                     this._authenticLoginBtn.show();
    //                     return;
    //                 }
    //                 if (this._authenticLoginBtn == null) {
    //                     let button = wx.createUserInfoButton({
    //                         type: 'text',
    //                         text: '', //'获取用户信息',
    //                         style: {
    //                             left: 0,
    //                             top: 0,
    //                             width: Laya.stage.width,
    //                             height: Laya.stage.height,
    //                             lineHeight: 40,
    //                             textAlign: 'center',
    //                             fontSize: 16,
    //                             borderRadius: 4
    //                         }
    //                     });
    //                     button.onTap((res1) => {
    //                         button.hide();
    //                         //重新验证
    //                         this.wxLogin(statusCallback);
    //                     })
    //                     this._authenticLoginBtn = button;
    //                 }
    //             }
    //         },
    //         fail: () => {

    //         },
    //         complete: () => {

    //         }
    //     });
    // }

    // /** 设置游戏常亮 */
    // public wxSetKeepScreenOn(): void {
    //     wx.setKeepScreenOn({
    //         /**
    //          * 是否保持屏幕常亮
    //          */
    //         keepScreenOn: true,
    //         success: (result: _setKeepScreenOnSuccessObject) => { },
    //         fail: () => { },
    //         complete: () => { }
    //     })
    // }

    // private wxCreateToken(url: string, callback: Function = null): void {
    //     let launchOptions = window["wx"] ? wx.getLaunchOptionsSync() : "";
    //     // 获取⼴告id
    //     let aid = 0;
    //     let channel = "0_" + launchOptions.scene;
    //     if (launchOptions && launchOptions.query && launchOptions.query.channel) {
    //         let gdt_vid = launchOptions.query.gdt_vid;
    //         let weixinadinfo = launchOptions.query.weixinadinfo;
    //         if (weixinadinfo) {
    //             let weixinadinfoArr = weixinadinfo.split(".");
    //             aid = weixinadinfoArr[0];
    //         }
    //         channel = "" + launchOptions.query.channel + "_" + launchOptions.scene;
    //     } else if (launchOptions && launchOptions.referrerInfo) {
    //         if (launchOptions.referrerInfo.extraData && launchOptions.referrerInfo.extraData.channel) {
    //             channel = "" + launchOptions.referrerInfo.extraData.channel + "_" + launchOptions.scene;
    //         } else {
    //             if (launchOptions.referrerInfo.appId) {
    //                 channel = launchOptions.referrerInfo.appId + "_" + launchOptions.scene;
    //             }
    //         }
    //     }
    //     if (window["wx"]) {
    //         // wx.login({
    //         //     success: (result: _loginSuccessObject) => {
    //         //         wx.request({
    //         //             url: url + "v1/token/user",
    //         //             data: {
    //         //                 code: result.code,
    //         //                 channel: channel,
    //         //                 aid: aid
    //         //             },
    //         //             header: {
    //         //                 'content-type': 'application/json' // 默认值
    //         //             },
    //         //             method: 'POST',
    //         //             dataType: "json",
    //         //             responseType: "text",
    //         //             success: (result: _requestSuccessObject) => {
    //         //                 console.log("@David TOKEN:", result);
    //         //                 wx.setStorage({
    //         //                     key: "token",
    //         //                     data: result.data.token,
    //         //                     success: () => { },
    //         //                     fail: () => { },
    //         //                     complete: () => { }
    //         //                 });
    //         //                 callback && callback(result.data.token);
    //         //             },
    //         //             fail: () => { },
    //         //             complete: () => { }
    //         //         })
    //         //     },
    //         //     fail: () => { },
    //         //     complete: () => { }
    //         // })
    //     }
    // }

    // /** 游戏新版本提示 */
    // public wxShowUpdateVersionTips(): void {
    //     return;
    //     if (!Laya.Browser.onWeiXin) return;
    //     const updateManager = wx.getUpdateManager();
    //     if (updateManager) {
    //         updateManager.onCheckForUpdate(function (res) {
    //             // 请求完新版本信息的回调
    //             console.log(res.hasUpdate)
    //         })
    //         updateManager.onUpdateReady(function () {
    //             wx.showModal({
    //                 title: "更新提示",
    //                 content: "新版本已经准备好，是否重启应用？",
    //                 /**
    //                  * 是否显示取消按钮，默认为 true
    //                  */
    //                 showCancel: true,
    //                 /**
    //                  * 取消按钮的文字，默认为"取消"，最多 4 个字符
    //                  */
    //                 cancelText: "取消",
    //                 /**
    //                  * 取消按钮的文字颜色，默认为"#000000"
    //                  */
    //                 cancelColor: "#000000",
    //                 /**
    //                  * 确定按钮的文字，默认为"确定"，最多 4 个字符
    //                  */
    //                 confirmText: "确定",
    //                 /**
    //                  * 确定按钮的文字颜色，默认为"#3CC51F"
    //                  */
    //                 confirmColor: "#3CC51F",
    //                 success: (result: _showModalSuccessObject) => { },
    //                 fail: () => { },
    //                 complete: () => { }
    //             })
    //         })
    //         updateManager.onUpdateFailed(function () {
    //             MsgMgr.Ins.showMsg("游戏新版本更新失败！");
    //         })
    //     }
    // }

    // public wxOnShow(): void {
    //     wx.onShow((options: any) => {
    //         console.log("@David onLaunch:", options);
    //         PlayerMgr.Ins.Info.wxLaunch = options;
    //         if (!SoundMgr.Ins.bgOn) {
    //             SoundMgr.Ins.setBgOn(true);
    //             SoundMgr.Ins.setEffectOn(true);
    //             SoundMgr.Ins.playBg(SoundType.BG_MUSIC);
    //         }
    //         //查询是否有离线奖励
    //         StorageUtil.requestOfflinePrizeData();
    //     })
    // }

    // public wxOnHide(): void {
    //     wx.onHide(() => {
    //         SoundMgr.Ins.setBgOn(false);
    //         SoundMgr.Ins.setEffectOn(false);
    //         StorageUtil.saveStorageToLocal(true);
    //         this.wxSetUserCloudStorage();
    //     })
    // }

    // /** 上传数据到开放域 */
    // public wxSetUserCloudStorage(): void {
    //     //上传微信云
    //     let money = Math.floor(PlayerMgr.Ins.Info.userGold + HallControl.Ins.Model.heroAllAsset()).toString();
    //     let kvDataList = [{
    //         "key": "score",
    //         "value": money
    //     }, {
    //         "key": "city",
    //         "value": (PlayerMgr.Ins.Info.wxUserInfo ? PlayerMgr.Ins.Info.wxUserInfo.city : '火星')
    //     }, {
    //         "key": "userId",
    //         "value": PlayerMgr.Ins.Info.userId.toString()
    //     }];
    //     wx.setUserCloudStorage({
    //         "KVDataList": kvDataList,
    //         success: function (src) {
    //             console.log("setUserCloudStorage success", src)
    //         },
    //         fail: function (src) {
    //             console.log("setUserCloudStorage fail", src)
    //         }
    //     })
    // }

    // /** 内存警告 */
    // public wxMemoryWarning(): void {
    //     wx.onMemoryWarning(() => {
    //         console.log("@David 内存过高警告！！！");
    //         wx.triggerGC();
    //     });
    // }

    // public wxOnShare(_data): void {
    //     if (this._isSharing) {
    //         return
    //     }
    //     this._isSharing = true;
    //     setTimeout(() => {
    //         this._isSharing = false;
    //     }, 350);
    //     // 群分享设置withShareTicket:true 
    //     if (_data.isGroupShare) {
    //         wx.updateShareMenu({
    //             withShareTicket: true,
    //             success: () => { }, fail: () => { }, complete: () => { }
    //         });
    //     } else {
    //         wx.updateShareMenu({
    //             withShareTicket: false,
    //             success: () => { }, fail: () => { }, complete: () => { }
    //         });
    //     }
    //     setTimeout(() => {
    //         wx.shareAppMessage({
    //             title: _data.title,
    //             imageUrl: _data.imageUrl,
    //             query: _data.query, //"必须是 key1=val1&key2=val2 的格式"
    //             success: function (res) {
    //                 if (_data.isGroupShare) {
    //                     wx.getSystemInfo({
    //                         success: (result: _getSystemInfoSuccessObject) => {
    //                             if (result.platform == 'android') {
    //                                 //获取群详细信息
    //                                 wx.getShareInfo({
    //                                     shareTicket: res.shareTickets,
    //                                     success: (result: _getShareInfoSuccessObject) => {
    //                                         //这里写你分享到群之后要做的事情，比如增加次数什么的
    //                                         _data.success && _data.success(result);
    //                                     },
    //                                     fail: () => {
    //                                         _data.success && _data.success(false);
    //                                     },
    //                                     complete: () => { },
    //                                 });
    //                             }
    //                             if (result.platform == 'ios') {//如果用户的设备是IOS
    //                                 if (res.shareTickets != undefined) {
    //                                     // console.log("分享的是群:", res);
    //                                     wx.getShareInfo({
    //                                         shareTicket: res.shareTickets,
    //                                         success: (result: _getShareInfoSuccessObject) => {
    //                                             //分享到群之后你要做的事情
    //                                             _data.success && _data.success(res);
    //                                         },
    //                                         fail: () => { },
    //                                         complete: () => { },
    //                                     });
    //                                 } else {//分享到个人要做的事情，我给的是一个提示
    //                                     // console.log("分享的是个人");
    //                                     _data.success && _data.success(false);
    //                                 }
    //                             }
    //                         },
    //                         fail: () => { },
    //                         complete: () => { }
    //                     });
    //                 } else {
    //                     _data.success && _data.success(res)
    //                 }
    //             },
    //             fail: function (res) {
    //                 _data.fail && _data.fail(res)
    //             },
    //             complete: function (res) {
    //                 this._isSharing = true;
    //                 setTimeout(() => {
    //                     this._isSharing = false;
    //                 }, 350)
    //             }
    //         })
    //     }, 1)
    // }

    // /** 创建激励视频 */
    // private wxCreateRewardedVideoAd(param) {
    //     let video1 = wx.createRewardedVideoAd({ adUnitId: param.adUnitId })
    //     return video1;
    // }

    // /** 创建Banner广告 */
    // private wxCreateBannerAd(_param) {
    //     let systemInfo = wx.getSystemInfoSync();
    //     let pRatio = systemInfo.windowWidth / 750.0;
    //     let bannerY = 1334 * pRatio;
    //     if (_param.top) {
    //         bannerY = _param.top * pRatio;
    //     }
    //     let bannerAd = wx.createBannerAd({
    //         adUnitId: _param.adUnitId,
    //         style: {
    //             left: (systemInfo.screenWidth - 300) / 2,
    //             top: bannerY - 100,
    //             width: 300,
    //             height: 100,
    //         }
    //     });
    //     if (bannerAd) {
    //         let isResize = false;
    //         bannerAd.onResize(res => {
    //             //适配
    //             if (isResize == false) {
    //                 isResize = true;
    //                 bannerAd.style.top = bannerY - res.height;
    //             }
    //         });
    //     }
    //     return bannerAd;
    // }

    // /** 跳转小程序 */
    // private wxNavigateToMiniProgram(data) {
    //     wx.navigateToMiniProgram(data);
    // }

    // /** 客服 */
    // public wxOpenCustomerService(param) {
    //     wx.openCustomerServiceConversation(param);
    // }

    // /** 投诉建议按钮 */
    // public wxCreateFeedbackButton(btnVect) {
    //     if (window["wx"]) {
    //         let systemInfo = wx.getSystemInfoSync();
    //         let pRatio = systemInfo.windowWidth / 750.0;
    //         let button = wx.createFeedbackButton({
    //             type: 'text',
    //             text: '', //打开意见反馈页面
    //             style: {
    //                 left: btnVect.x * pRatio,
    //                 top: btnVect.y * pRatio,
    //                 width: btnVect.width * pRatio,
    //                 height: btnVect.height * pRatio,
    //                 lineHeight: 40,
    //                 textAlign: 'center',
    //                 fontSize: 16,
    //                 borderRadius: 4,
    //                 opacity: 0.1
    //             }
    //         });
    //     }
    // }

    private static _instance: SDKMgr;
    public static get Ins(): SDKMgr {
        if (SDKMgr._instance == null) {
            SDKMgr._instance = new SDKMgr();
        }
        return SDKMgr._instance;
    }
}