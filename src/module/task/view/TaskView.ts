import BaseView from "../../../core_wq/view/base/BaseView";
import LayerMgr from "../../../core_wq/layer/LayerMgr";
import { ui } from "../../../ui/layaMaxUI";
import TaskItem from "./TaskItem";
import HttpMgr from "../../../core_wq/net/HttpMgr";

/**
 * 任务界面
 */
export default class TaskView extends BaseView {

    public static redPointNum: number = 0;

    constructor() {
        super(LayerMgr.Ins.frameLayer, ui.moduleView.task.TaskViewUI);
        this.setResources(["task"]);
    }

    public initUI(): void {
        super.initUI();
        this.ui.txt_noTask.visible = true;
        this.ui.lists.visible = false;
        HttpMgr.Ins.requestTaskInfo((data: any) => {
            if (data && data.length > 0) {
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    if (element.task_status == 1) {
                        TaskView.redPointNum++;
                    }
                }
                this.ui.txt_noTask.visible = false;
                this.ui.lists.array = data;
                this.ui.lists.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
                this.ui.lists.visible = true;
            }
        });
    }

    private onListRender(cell: Laya.Box, index: number): void {
        if (index > this.ui.lists.array.length) {
            return;
        }
        let item: TaskItem = cell.getChildByName("item") as TaskItem;
        if (item) {
            item.dataSource = this.ui.lists.array[index];
        }
    }
}