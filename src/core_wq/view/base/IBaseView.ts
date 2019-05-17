export default interface IBaseView {
    callback: Function;

    /**
     * 是否已经初始化
     * @returns {boolean}
     */
    isInit(): boolean;

    /**
     * 面板是否显示
     * @return
     *
     */
    isShow(): boolean;

    /**
     * 添加到父级
     */
    addToParent(): void;

    /** 初始化UI界面 */
    initUIView(): void;

    /**
     * 从父级移除
     */
    removeFromParent(): void;

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    initUI(): void;

    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    initData(): void;

    /**
     * 添加事件初始化，用于子类继承
     */
    addEvents(): void;

    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    open(...param: any[]): void;

    /**
     * 面板关闭执行函数，用于子类继承
     * @param param 参数
     */
    close(...param: any[]): void;

    /**
     * 销毁
     */
    destroy(): void;

    /**
     * 设置是否隐藏
     * @param value
     */
    setVisible(value: boolean): void;

    /**
     * 设置初始加载资源
     * @param resources
     */
    setResources(resources: string[]): void;

    /**
     * 分模块加载资源
     */
    loadResource(loadComplete: Function, initComplete: Function): void;
}