import LayerMgr from "../../../core_wq/layer/LayerMgr";
import ResUtils from "../../../core_wq/utils/ResUtils";
import PathConfig from "../../../core_wq/config/PathConfig";
import AverageUtils from "../../../core_wq/utils/AverageUtils";

export default class SmallLoading extends Laya.Sprite {

    private _content: Laya.Sprite = null;
    private _speed: number = 0;
    private _uiContainer: Laya.Sprite;
    private _averageUtils: AverageUtils;

    constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._averageUtils = new AverageUtils();
        this._speed = 10 / (1000 / 60);
        this._content = Laya.Pool.getItemByClass("Sprite", Laya.Sprite);
        this._content.graphics.drawRect(0, 0, LayerMgr.stageDesignWidth, LayerMgr.stageDesignHeight, "#000000");
        this._content.mouseEnabled = true;

        this._uiContainer = Laya.Pool.getItemByClass("Sprite", Laya.Sprite);

        let url: string = "images/common/load_Reel.png";
        Laya.loader.load([{ url: url, type: Laya.Loader.IMAGE }], Laya.Handler.create(this, (texture: Laya.Texture) => {
            let img: Laya.Image = Laya.Pool.getItemByClass("Image", Laya.Image);
            img.texture = Laya.loader.getRes(url);
            img.x = -img.width * 0.5;
            img.y = -img.height * 0.5;
            this._uiContainer.addChild(img);
        }));
    }

    public showLoading(): void {
        LayerMgr.Ins.smallLoadingLayer.addChild(this._content);
        this.frameLoop(1, this, this.enterFrame);
    }

    public hideLoading(): void {
        if (this._content && this._content.parent) {
            this._uiContainer.rotation = 0;
            this._uiContainer.removeChildren();
            this._uiContainer.removeSelf();
            this._content.removeChildren();
            this._content.removeSelf();
            Laya.Pool.recover("Sprite", this._uiContainer);
            Laya.Pool.recover("Sprite", this._content);
        }
        this.clearTimer(this, this.enterFrame);
    }

    private enterFrame(time: number) {
        this._averageUtils.push(this._speed * time);
        this._uiContainer.rotation += this._averageUtils.getValue();
    }

    private static _instance: SmallLoading;
    public static get Ins(): SmallLoading {
        if (SmallLoading._instance == null) {
            SmallLoading._instance = new SmallLoading();
        }
        return SmallLoading._instance;
    }
}