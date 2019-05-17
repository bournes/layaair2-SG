import { ui } from "../../../../ui/layaMaxUI";
import SystemVO from "../../../../core_wq/db/vo/SystemVO";
import EventsMgr from "../../../../core_wq/event/EventsMgr";
import EventType from "../../../../core_wq/event/EventType";
import PathConfig from "../../../../core_wq/config/PathConfig";
import SystemConfig from "../../config/SystemConfig";
import PointUtils from "../../../../core_wq/utils/PointUtils";
import SDKMgr from "../../../../core_wq/msg/SDKMgr";

export default class SystemBtn extends ui.moduleView.hall.item.SystemBtnUI {

    private _info: SystemVO = null;

    set dataSource(value: any) {
        this._info = value;
        if (this._info) {
            this.init();
            this.addEvents();
        }
    }

    private init(): void {
        this.imgRenPoint.visible = false;
        this.btn_system.skin = PathConfig.SYSTEM_BTN_PATH.replace("{0}", this._info.icon);
        //投诉建议特殊处理
        if (this._info.id == SystemConfig.FEEDBACK) {
            let pos = PointUtils.localToGlobal(this.btn_system);
            // SDKMgr.Ins.wxCreateFeedbackButton({
            //     x: pos.x, y: pos.y,
            //     width: this.btn_system.width, height: this.btn_system.height
            // });
        }
    }

    private addEvents(): void {
        this.btn_system.on(Laya.Event.CLICK, this, this.onClickBtn);
        EventsMgr.Ins.addListener(EventType.UPDATE_SYSTEM_RED_POINT, this.onUpdateRedPoint, this);
    }

    private onClickBtn(): void {
        if (this._info) {
            EventsMgr.Ins.dispatch(EventType.OPEN_VIEW, this._info.id);
        } else {
            console.log("@David 功能按钮点击错误,没有找到System表对应的字段!");
        }
    }

    private onUpdateRedPoint(id: number, isShow: boolean): void {
        if (this._info && this._info.id == id) {
            this.imgRenPoint.visible = isShow;
        }
    }

}