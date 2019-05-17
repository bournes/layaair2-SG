import PathConfig from "../config/PathConfig";
import HttpRequestHelper from "./HttpRequestHelper";
import MsgMgr from "../msg/MsgMgr";
import EventsMgr from "../event/EventsMgr";
import EventType from "../event/EventType";
import PlayerInfo from "../player/data/PlayerInfo";
import PlayerMgr from "../player/PlayerMgr";
import StorageUtil from "../utils/StorageUtil";
import MathUtil from "../utils/MathUtil";

export default class HttpMgr extends Laya.Script {

    /** 元宝购车订单 */
    public requestDiamondBuyOrder(diamond: number, callback: any, type: number = 0): void {
        let strKind: string = 'buy_car';
        if (type == 1) strKind = 'diamond_acce';
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/diamond/order/' + diamond + '&kind=' + strKind,
            success: function (res) {
                console.log("@David 元宝购车订单", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 元宝购车 */
    public requestDiamondBuy(orderId: number, callback: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/diamond/buy_car/' + orderId,
            success: function (res) {
                console.log("@David 元宝购车", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 请求等级奖励元宝 */
    public requestLevelPrizeDiamond(level: number, diamond: number, callback: any): void {
        let dataString = 'level=' + level + '&diamond=' + diamond;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v2/userinfo/upgrade_reward_diamond',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("@David 请求等级奖励元宝:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 拉取分享信息 */
    public requestTaskInfo(callback: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/task/info',
            success: function (res) {
                console.log("@David 拉取分享信息:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 拉取任务奖励 */
    public requestTaskPrize(itemId: number, callback: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/task/rewards/' + itemId,
            success: function (res) {
                console.log("@David 拉取任务奖励:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 拉取分享信息 */
    public requestShareInfo(callback: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/friend_num',
            success: function (res) {
                console.log("@David 拉取分享信息:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 拉取任务奖励 */
    public requestTaskRewardPrize(itemId: number, callback: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/friend_rewards/' + itemId,
            success: function (res) {
                console.log("@David 拉取任务奖励", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 拉取每日签到奖励 */
    public requestDaySignPrize(itemId: number, callback: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/sign/commit/' + itemId,
            success: function (res) {
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 拉取签到信息 */
    public requestSignInfo(callback: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/sign/info',
            success: function (res) {
                console.log("@David 拉取签到信息", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 拉取公众二维码 */
    public requestOfficialAccData(callback: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/subscription/get_info',
            success: function (res) {
                console.log("requestOfficialAccData", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 拉取公众奖励 */
    public requestAccountRewardPrize(): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/subscription/rewards',
            success: function (res) {
                console.log("requestPrize", res);
                if (res.code == 1) {
                    MsgMgr.Ins.showMsg("奖励领取成功")
                    this.requestDiamondData();
                    //移除红点
                    // if (userData) {
                    //     userData.removeFollowRedPoint();
                    // }
                } else if (res.code == 2) {
                    MsgMgr.Ins.showMsg("未关注公众号")
                } else if (res.code == 3) {
                    MsgMgr.Ins.showMsg("奖励已领取")
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /**刷新用户元宝数量 */
    public requestDiamondData(): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v3/userinfo/get_diamond',
            success: function (res) {
                console.log("@David 刷新用户元宝数量:", res);
                if (res) {
                    EventsMgr.Ins.dispatch(EventType.UPDATE_CURRENCY, PlayerInfo.DIAMOND, res.diamond);
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 英雄数据 */
    public requestCarparkData(callback: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v3/seat/get',
            success: function (res) {
                console.log("@David 英雄数据:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
                // CommonFun.stopWaitEffect();
                MsgMgr.Ins.showMsg("网络异常");
            }
        });
    }

    /** 每日任务统计 */
    public requestDailyTaskData(taskId: number): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/task/progress/' + taskId,
            success: function (res) {
                console.log("requestDailyTaskData:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 分享广告完成 */
    public requestShareAdFinish(type: string, shareId: number = 0): void {
        let dataString = 'type=' + type + '&share_id=' + shareId;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/operational/post_info',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 商店数据 */
    public requestCarshopData(callback: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v3/shop/get',
            success: function (res) {
                console.log("@David 商店数据:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
                // CommonFun.stopWaitEffect();
                MsgMgr.Ins.showMsg("网络异常");
            }
        });
    }

    /** 分享完成 */
    public requestShareFinish(shareId: number, encryptedData: string = '', iv: string = '', callback: any = null): void {
        let dataString = 'share_id=' + shareId + '&encryptedData=' + encryptedData + '&iv=' + iv;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/finish',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log(res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 获取分享主题 */
    public requestShareSubject(callback: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/to',
            success: function (res) {
                console.log(res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 通知服务器已领取离线收益 */
    public requestNotifyServerPrize(): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v3/userinfo/reward',
            success: function (res) {
                console.log("requestNotifyServerPrize:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 新老版本更新检测（防止老数据覆盖） */
    public requestVersionCheck(callback: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/check/version',
            success: function (res) {
                console.log("requestVersionCheck", res);
                if (res && res.clear_flag) {
                    //清理老数据
                    StorageUtil.clearLocalData();
                }
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 新老版本清理回调 */
    public requestVersionClear(callback: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/clear/user_data',
            success: function (res) {
                console.log("requestVersionClear", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 用户基础数据 */
    public requestUserInfoData(callback: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v3/userinfo/get',
            success: function (res) {
                console.log("@David 用户基础数据:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
                MsgMgr.Ins.showMsg("网络异常");
            }
        });
    }

    /** 请求分享开关 */
    public requestShareFlag(callback: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/flag',
            success: function (res) {
                if (res) {
                    callback && callback();
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 用户基础数据赋值 */
    public requestUserBaseData(callback: any = null): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v2/user/info',
            success: function (res) {
                console.log("@David 用户基础数据赋值:", res);
                if (res) {
                    callback && callback(res);
                }
            },
            fail: function (res) {
                console.log("@David 用户基础数据赋值失败:", res);
            }
        });
    }

    //获取抽奖信息
    public requestPrizeInfo(callback: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v3/activity/get/roulette',
            success: function (res) {
                console.log("@David 获取抽奖信息:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 转盘抽奖 */
    public requestDrawPrize(type: number, callback: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v3/activity/roulette/' + type,
            success: function (res) {
                console.log("requestDrawPrize", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
                callback && callback(false);
            }
        });
    }

    /** 转盘统计 */
    public requestPrizeCensus(itemId: number, num: number): void {
        let dataString = 'prizeId=' + itemId + '&prizeNum=' + num;
        console.log("requestPrizeCensus:", dataString);
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/activity/roulette/log',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestPrizeCensus:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 请求世界排行数据 */
    public requestWorldRankingData(callback: any): void {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/rank/world',
            success: function (res) {
                console.log("@David 请求世界排行数据:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 请求我的世界排行数据 */
    public requestMyWorldRankData(callback: any): void {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/rank/my',
            success: function (res) {
                console.log("@David 请求我的世界排行数据:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 请求收益周排行数据 */
    public requestIncomeRankingData(callback: any): void {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/rank/week',
            success: function (res) {
                console.log("@David 请求收益周排行数据:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 请求我的收益周排行数据 */
    public requestMyIncomeRankData(callback: any): void {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/rank/my',
            success: function (res) {
                console.log("@David 请求我的收益周排行数据:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 发送保存新手步骤 */
    public requestGuideStep(step: number): void {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v3/novice/' + step,
            success: function (res) {
                console.log("@David 发送保存新手步骤成功");
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    //提交用户名称位置等信息
    public requestSaveWxUserinfoData(_nickName: string, _avatarUrl: string, _city: string, _gender: number): void {
        let that = this;
        let dataString = 'nickName=' + _nickName + '&avatarUrl=' + _avatarUrl + '&city=' + _city + '&gender=' + _gender;
        console.log("requestSaveWxUserinfoData:", dataString);
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/update',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestSaveWxUserinfoData2", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    private static _instance: HttpMgr;
    public static get Ins(): HttpMgr {
        if (HttpMgr._instance == null) {
            HttpMgr._instance = new HttpMgr();
        }
        return HttpMgr._instance;
    }
}