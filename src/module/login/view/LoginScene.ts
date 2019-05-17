import { ui } from "../../../ui/layaMaxUI";
import GlobalData from "../../../core_wq/db/GlobalData";
import AppConfig from "../../../core_wq/config/AppConfig";
import SDKMgr from "../../../core_wq/msg/SDKMgr";
import StorageUtil from "../../../core_wq/utils/StorageUtil";
import MathUtil from "../../../core_wq/utils/MathUtil";

export default class LoginScene extends ui.moduleView.login.LoginSceneUI {

    private _authorityState: number = 3;
    private tipsArr: string[] = [
        "等待时间越久离线金币越多哟",
        "正在召集英雄上阵",
        "别忘每天的免费转盘抽奖哟",
        "签到天数越久奖励越丰盛~",
        "邀请好友召唤英雄，获取超多奖励",
        "每天登陆都有大量离线金币领取"
    ]

    constructor() {
        super();
    }

    onEnable(): void {
        this.showStartuplogo();
        this.initData();
    }

    private initData(): void {
        this.txt_tips.visible = true;
        StorageUtil.versionCheck(() => {
            GlobalData.Ins.setup(() => {
                StorageUtil.loadStorage((isOK: boolean) => {
                    if (isOK) {
                        this.checkAuthority();
                    }
                })
            })
        })
    }

    /** 检查是否用户授权 */
    private checkAuthority(): void {
        // if (Laya.Browser.onWeiXin) {
        //     SDKMgr.Ins.wxLogin((state: number) => {
        //         this._authorityState = state;
        //         switch (state) {
        //             case 1://已经授权
        //                 this.txt_tips.text = this.tipsArr[MathUtil.rangeInt(0, this.tipsArr.length - 1)];
        //                 break;
        //             case 2://授权成功进入大厅
        //                 SDKMgr.Ins.initWX();
        //                 this.enterHallScene();
        //                 break;
        //             case 3://没有授权
        //                 this.txt_tips.text = "点击任意位置进入游戏";
        //                 break;
        //         }
        //         this.onShowBreathEffect();
        //         this.timerLoop(1500, this, this.onShowBreathEffect);
        //     });
        // } else {
           this.enterHallScene();
        // }
    }

    /** 进入大厅 */
    private enterHallScene(): void {
        this.removeImgStartTween();
        this.clearTimer(this, this.onShowBreathEffect);
        AppConfig.HallScene && Laya.Scene.open(AppConfig.HallScene);
    }

    /** 显示开机图 */
    private showStartuplogo(): void {
        // let timeLine = new Laya.TimeLine();
        // timeLine.addLabel("tl1", 0).to(this.imgStart, { alpha: 1 }, 2000, Laya.Ease.linearNone)
        //     .addLabel("tl2", 2000).to(this.imgStart, { alpha: 0 }, 200, Laya.Ease.linearNone);
        // timeLine.on(Laya.Event.COMPLETE, this.imgStart, () => {
        //     timeLine.destroy();
        //     timeLine = null;
        //     this.imgStart.removeSelf();
        // });
        // timeLine.play(0, false);

        Laya.Tween.to(this.imgStart, { alpha: 1 }, 2000);
        Laya.Tween.to(this.imgStart, { alpha: 0, delay: 2000 }, 200, null, Laya.Handler.create(this, () => {
            this.removeImgStartTween();
        }));
    }

    private removeImgStartTween(): void {
        Laya.Tween.clearTween(this.imgStart);
        this.imgStart.removeSelf();
    }

    private onShowBreathEffect(): void {
        if (this._authorityState != 3) {
            this.txt_tips.text = this.tipsArr[MathUtil.rangeInt(0, this.tipsArr.length - 1)];
        }
        Laya.Tween.clearTween(this.txt_tips);
        Laya.Tween.to(this.txt_tips, { scaleX: 0.9, scaleY: 0.9 }, 900, null, Laya.Handler.create(this, () => {
            Laya.Tween.to(this.txt_tips, { scaleX: 1, scaleY: 1 }, 900);
        }))
    }
}