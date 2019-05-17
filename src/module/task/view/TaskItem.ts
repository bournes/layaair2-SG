import { ui } from "../../../ui/layaMaxUI";
import HttpMgr from "../../../core_wq/net/HttpMgr";
import MsgMgr from "../../../core_wq/msg/MsgMgr";
import TaskView from "./TaskView";
import RedPointMgr from "../../../core_wq/msg/RedPointMgr";

export default class TaskItem extends ui.moduleView.task.TaskItemUI {

    private _info: any;

    constructor() { super(); }

    set dataSource(value: any) {
        this._info = value;
        if (this._info) {
            let finishNum: number = this._info.task_num || 0;
            if (finishNum > this._info.num) {
                finishNum = this._info.num;
            }
            this.txt_title.text = this._info.title + "(" + finishNum + "/" + this._info.num + ")";
            this.txt_diamond.text = "+" + this._info.reward;
            if (this._info.task_status > 0) {
                if (this._info.task_status > 1) {//已领取
                    this.updateGetBtnState(STATE.HaveReceived);
                } else {//可领取
                    this.updateGetBtnState(STATE.Receive);
                }
            } else {
                this.updateGetBtnState(STATE.Uncollected);
            }
            this.addEvents();
        }
    }

    private updateGetBtnState(state: number): void {
        switch (state) {
            case STATE.Uncollected:
                this.btn_get.label = "未领取";
                this.btn_get.disabled = true;
                break;
            case STATE.Receive:
                this.btn_get.label = "可领取";
                this.btn_get.disabled = false;
                break;
            case STATE.HaveReceived:
                this.btn_get.label = "已领取";
                this.btn_get.disabled = true;
                break;
        }
    }

    private addEvents(): void {
        this.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
        this.btn_go.on(Laya.Event.CLICK, this, this.onGotoView);
    }

    private onGetReward(): void {
        HttpMgr.Ins.requestTaskPrize(this._info.id, (res: any) => {
            if (res) {
                this._info.status = 2;
                this.updateGetBtnState(STATE.HaveReceived);
                MsgMgr.Ins.showMsg("任务奖励领取成功!");
                TaskView.redPointNum--;
                if (TaskView.redPointNum < 1) {
                    TaskView.redPointNum = 0;
                    RedPointMgr.Ins.removeTaskRedPoint();
                }
                HttpMgr.Ins.requestDiamondData();
            }
        });
    }

    private onGotoView(): void {

    }
}

enum STATE {
    /** 未领取 */
    Uncollected,
    /** 可领取 */
    Receive,
    /** 已领取 */
    HaveReceived
}