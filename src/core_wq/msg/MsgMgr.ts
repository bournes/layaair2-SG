import LayerMgr from "../layer/LayerMgr";
import AlignUtils from "../utils/AlignUtils";
import MsgTipsView from "../../module/common/view/MsgTipsView";

export default class MsgMgr extends Laya.Script {

    constructor() { super(); }

    /** 显示提示消息 */
    public showMsg(content: string): void {
        let tipView: MsgTipsView = Laya.Pool.getItemByClass("MsgTipsView", MsgTipsView);
        tipView.dataSource = content;
        tipView.visible = content == "测试测试测试测试测试" ? false : true;
        AlignUtils.setToScreenGoldenPos(tipView);
        LayerMgr.Ins.rollMessageLayer.addChild(tipView);

        Laya.Tween.to(tipView, { x: tipView.x, y: (tipView.y - 100), alpha: 0 }, 3000,
            Laya.Ease.cubicInOut, Laya.Handler.create(this, ($tipView: MsgTipsView) => {
                Laya.Tween.clearTween($tipView);
                $tipView.removeSelf();
                $tipView.alpha = 1;
                Laya.Pool.recover("MsgTipsView", $tipView);
            }, [tipView]));
    }

    /** 显示提示消息 */
    public showMsg1(content: string): void {
        var tipBarSp = new Laya.Image("images/component/tip_bg.png");
        AlignUtils.setToScreenGoldenPos(tipBarSp);
        LayerMgr.Ins.rollMessageLayer.addChild(tipBarSp);
        tipBarSp.zOrder = 1001;
        tipBarSp.width = 500;
        tipBarSp.height = 80;
        tipBarSp.pivot(tipBarSp.width / 2, tipBarSp.height / 2);
        tipBarSp.sizeGrid = "10,10,10,10";

        var coinLabel = new Laya.Label();
        coinLabel.text = content;
        coinLabel.fontSize = 40;
        coinLabel.color = "#ffffff";

        coinLabel.width = tipBarSp.width * 0.98;
        //设置文本水平居中
        coinLabel.align = "center";
        //设置文本垂直居中
        coinLabel.valign = "middle";
        //设置自动换行
        coinLabel.wordWrap = true;
        //重置背景高度
        tipBarSp.height = coinLabel.height + 20;

        tipBarSp.addChild(coinLabel);
        coinLabel.pos(tipBarSp.width / 2, tipBarSp.height / 2);
        coinLabel.pivot(coinLabel.width / 2, coinLabel.height / 2);

        Laya.Tween.to(tipBarSp, { x: tipBarSp.x, y: (tipBarSp.y - 100), alpha: 0 }, 3000,
            Laya.Ease.cubicInOut, Laya.Handler.create(this, (tipBarSp: Laya.Node) => {
                tipBarSp.removeSelf();
            }, [coinLabel]));
    }

    private static _instance: MsgMgr;
    public static get Ins(): MsgMgr {
        if (MsgMgr._instance == null) {
            MsgMgr._instance = new MsgMgr();
        }
        return MsgMgr._instance;
    }
}