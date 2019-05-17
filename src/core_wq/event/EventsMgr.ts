export default class EventsMgr extends Laya.Sprite {

    private dict: any;
    private eVec: Array<MessageVo>;
    private lastRunTime: number;
    private type: number = 1;

    constructor() {
        super();
        this.dict = {};
        this.eVec = new Array<MessageVo>();
        this.lastRunTime = 0;
        if (this.type == 0) {
            this.frameLoop(1, this, this.onRun);
        }
    }

    /**
     * 添加消息监听
     * @param type 消息唯一标识
     * @param listener 侦听函数
     * @param listenerObj 侦听函数所属对象
     *
     */
    public addListener(type: string, listener: Function, listenerObj: any): void {
        let arr: Array<any> = this.dict[type];
        if (arr == null) {
            arr = new Array<any>();
            this.dict[type] = arr;
        }
        //检测是否已经存在
        let i: number = 0;
        let len: number = arr.length;
        for (i; i < len; i++) {
            if (arr[i][0] == listener && arr[i][1] == listenerObj) {
                return;
            }
        }

        arr.push([listener, listenerObj]);
    }

    /**
     * 移除消息监听
     * @param type 消息唯一标识
     * @param listener 侦听函数
     * @param listenerObj 侦听函数所属对象
     */
    public removeListener(type: string, listener: Function, listenerObj: any): void {
        let arr: Array<any> = this.dict[type];
        if (arr == null) return;
        let i: number = 0;
        let len: number = arr.length;
        for (i; i < len; i++) {
            if (arr[i][0] == listener && arr[i][1] == listenerObj) {
                arr.splice(i, 1);
                break;
            }
        }
        if (arr.length == 0) {
            this.dict[type] = null;
            delete this.dict[type];
        }
    }

    /**
     * 移除某一对象的所有监听
     * @param listenerObj 侦听函数所属对象
     */
    public removeAll(listenerObj: any): void {
        let keys = Object.keys(this.dict);
        for (let i: number = 0, len = keys.length; i < len; i++) {
            let type = keys[i];
            let arr: Array<any> = this.dict[type];
            for (let j = 0; j < arr.length; j++) {
                if (arr[j][1] == listenerObj) {
                    arr.splice(j, 1);
                    j--;
                }
            }

            if (arr.length == 0) {
                this.dict[type] = null;
                delete this.dict[type];
            }
        }
    }

    /**
     * 触发消息
     * @param type 消息唯一标识
     * @param param 消息参数
     */
    public dispatch(type: string, ...param: any[]): void {
        if (this.dict[type] == null) {
            return;
        }
        let vo: MessageVo = Laya.Pool.getItemByClass("MessageVo", MessageVo);
        vo.type = type;
        vo.param = param;
        if (this.type == 0) {
            this.eVec.push(vo);
        }
        else if (this.type == 1) {
            this.dealMsg(vo);
        }
        else {
            // Log.trace("MessageCenter未实现的类型");
        }
    }

    /** 运行 */
    private onRun(): void {
        let currTime: number = Laya.Browser.now();
        let inSleep: boolean = currTime - this.lastRunTime > 100;
        this.lastRunTime = currTime;
        if (inSleep) {
            while (this.eVec.length > 0) {
                this.dealMsg(this.eVec.shift());
            }
        } else {
            while (this.eVec.length > 0) {
                this.dealMsg(this.eVec.shift());
                if ((Laya.Browser.now() - currTime) > 5) {
                    break;
                }
            }
        }
    }

    /** 处理一条消息 */
    private dealMsg(msgVo: MessageVo): void {
        let listeners: Array<any> = this.dict[msgVo.type];
        let i: number = 0;
        let len: number = listeners.length;
        let listener: Array<any> = null;
        while (i < len) {
            listener = listeners[i];
            listener[0].apply(listener[1], msgVo.param);
            if (listeners.length != len) {
                len = listeners.length;
                i--;
            }
            i++;
        }
        msgVo.dispose();
        Laya.Pool.recover("MessageVo", msgVo);
    }

    /** 清空处理 */
    public clear() {
        this.dict = {};
        this.eVec.splice(0);
    }

    private static _ins: EventsMgr;
    public static get Ins(): EventsMgr {
        if (EventsMgr._ins == null) {
            EventsMgr._ins = new EventsMgr();
        }
        return EventsMgr._ins;
    }
}

class MessageVo {
    public type: string;
    public param: any[];

    public constructor() {
    }

    public dispose(): void {
        this.type = null
        this.param = null;
    }
}