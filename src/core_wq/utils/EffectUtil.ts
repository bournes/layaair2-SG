import HeadItem from "../../module/hall/view/item/HeadItem";
import AlignUtils from "./AlignUtils";
import LayerMgr from "../layer/LayerMgr";
import BoneAnim from "../bone/BoneAnim";

export default class EffectUtil extends Laya.Script {


    /** 飘文字 */
    public static playTextEffect(parentNode: any, content: string, pos: { x: number, y: number } = null): void {
        var coinLabel = new Laya.Label();
        coinLabel.text = content;
        coinLabel.fontSize = 30;
        coinLabel.color = "#fff1ba";
        coinLabel.anchorX = 0.5;
        coinLabel.anchorY = 0.5;
        parentNode.addChild(coinLabel);
        if (pos) {
            coinLabel.pos(pos.x, pos.y);
        } else {
            coinLabel.pos(parentNode.width / 2, -parentNode.height / 2);
        }
        Laya.Tween.to(coinLabel, { x: coinLabel.x, y: (coinLabel.y - 70), alpha: 0 }, 2000,
            Laya.Ease.cubicInOut, Laya.Handler.create(this, (_coinLabel: Laya.Node) => {
                _coinLabel.removeSelf();
            }, [coinLabel]));
    }

    /** 两英雄合并效果 */
    public static playHeroMergeEffect(parentNode: any, heroId: number, newHeroObj: any): void {
        //基础节点
        let effectNode: Laya.Sprite = new Laya.Sprite();
        parentNode.addChild(effectNode);
        let pos = newHeroObj.localToGlobal(new Laya.Point(0, 0));
        pos = parentNode.globalToLocal(pos);
        effectNode.pos(pos.x, pos.y);
        newHeroObj.visible = false;

        let offsetX = 70;
        let leftHeadItem: HeadItem = Laya.Pool.getItemByClass("p_HeadItem", HeadItem); //new HeadItem();
        effectNode.addChild(leftHeadItem);
        leftHeadItem.updateHeadSkin(heroId);
        Laya.Tween.to(leftHeadItem, { x: -offsetX }, 300, Laya.Ease.elasticOut, Laya.Handler.create(this, () => {
            Laya.Tween.to(leftHeadItem, { x: 0 }, 100, Laya.Ease.linearIn, Laya.Handler.create(this, () => {
                effectNode.removeChildren();
                this.playCoinEffect(effectNode, 'images/common/star2.png', { x: 52, y: 80 }, () => {
                    effectNode.removeSelf();
                    Laya.Tween.clearTween(leftHeadItem);
                    leftHeadItem.reset();
                    Laya.Pool.recover("p_HeadItem", leftHeadItem);
                });
                if (newHeroObj && newHeroObj.Info.heroId > 0) {
                    newHeroObj.visible = true;
                }
            }));
        }));
        //复制品
        let copyHeadItem: HeadItem = Laya.Pool.getItemByClass("p_HeadItem", HeadItem); //new HeadItem();
        leftHeadItem.addChild(copyHeadItem);
        copyHeadItem.updateHeadSkin(heroId);
        copyHeadItem.pos(0, 0);
        Laya.Tween.to(copyHeadItem, { x: offsetX * 2 }, 300, Laya.Ease.elasticOut, Laya.Handler.create(this, () => {
            Laya.Tween.to(copyHeadItem, { x: 0 }, 100, Laya.Ease.linearIn, Laya.Handler.create(this, () => {
                Laya.Tween.clearTween(copyHeadItem);
                copyHeadItem.reset();
                Laya.Pool.recover("p_HeadItem", copyHeadItem);
            }));
        }));
    }

    /** 飘金币 */
    public static playCoinEffect(parentNode: any, imgUrl: string, offset: any = { x: 0, y: 0 }, callback: any = null): void {
        for (var index = 0; index < 15; index++) {
            let imgCoin: Laya.Image = Laya.Pool.getItemByClass("p_Image_star", Laya.Image);
            imgCoin.graphics.clear();
            imgCoin.loadImage(imgUrl);
            imgCoin.scale(1, 1);
            imgCoin.alpha = 1;
            imgCoin.pivot(imgCoin.width / 2, imgCoin.height / 2);
            parentNode.addChild(imgCoin);
            var randX = Math.random() - 0.5;
            var randY = Math.random() - 0.5;

            var cicleX = 10 * Math.cos(index * Math.PI / 7) + 10 * randX;
            var cicleY = 10 * Math.sin(index * Math.PI / 7) + 10 * randY;
            imgCoin.pos(parentNode.width / 2 + cicleX + offset.x, parentNode.height / 2 + cicleY + offset.y);
            var coinPos = { x: (imgCoin.x + cicleX * 5), y: (imgCoin.y + cicleY * 5) };

            Laya.Tween.to(imgCoin, { x: coinPos.x, y: coinPos.y, scaleX: 0.8, scaleY: 0.8, rotation: (randX + randY) * 360 }, 500, Laya.Ease.expoOut);
            imgCoin.frameOnce(10, this, (_coinSp: Laya.Node, _coinPos: any) => {
                Laya.Tween.to(_coinSp, { scaleX: 0, scaleY: 0, alpha: 0.2, rotation: (randX + randY) * 360 }, 1000,
                    Laya.Ease.linearNone, Laya.Handler.create(this, (_coinSp: Laya.Node) => {
                        _coinSp.removeSelf();
                        callback && callback();
                        imgCoin.removeChildren();
                        imgCoin.removeSelf();
                        imgCoin.scale(1, 1);
                        imgCoin.alpha = 1;
                        imgCoin.rotation = 0;
                        Laya.Pool.recover("p_Image_star", imgCoin);
                    }, [_coinSp]));
            }, [imgCoin, coinPos]);
        }
    }

    /** 人物自白弹框效果 */
    public static playDialogueEffect(parentNode: any, imgUrl: string, content: string, pos: { x: number, y: number } = null, zOrder: number = 0, isFlipX: boolean = false): void {
        let imgTips: Laya.Image = Laya.Pool.getItemByClass("p_Image", Laya.Image);
        imgTips.skin = imgUrl;
        imgTips.anchorX = 0;
        imgTips.anchorY = 1;
        parentNode.addChild(imgTips);
        if (pos) {
            imgTips.pos(pos.x, pos.y);
        } else {
            imgTips.pos(parentNode.width / 2, -parentNode.height / 2);
        }
        if (zOrder > 0) {
            imgTips.zOrder = zOrder;
        }
        //飘文字
        var coinLabel = Laya.Pool.getItemByClass("p_Label", Laya.Label);
        coinLabel.text = content;
        coinLabel.fontSize = 22;
        coinLabel.color = "#000000";
        coinLabel.anchorX = 0.5;
        coinLabel.anchorY = 0.5;
        coinLabel.width = 220;
        coinLabel.height = 100;
        coinLabel.wordWrap = true;
        coinLabel.valign = "middle";
        imgTips.addChild(coinLabel);
        coinLabel.pos(imgTips.width * 0.5, imgTips.height * 0.46);
        //镜像
        if (isFlipX) {
            imgTips.scaleX = -1;
            coinLabel.scaleX = -1;
        }
        //动画
        let timeLine = new Laya.TimeLine();
        timeLine.addLabel("tl1", 0).from(imgTips, { scaleX: 0, scaleY: 0 }, 300, Laya.Ease.linearNone)
            .addLabel("tl2", 300).to(imgTips, { alpha: 1 }, 1200, Laya.Ease.linearNone)
            .addLabel("tl3", 1500).to(imgTips, { alpha: 0 }, 1000, Laya.Ease.cubicInOut)
        timeLine.on(Laya.Event.COMPLETE, imgTips, () => {
            Laya.Pool.recover("p_Label", coinLabel);
            imgTips.removeChildren();
            imgTips.removeSelf();
            imgTips.scale(1, 1);
            imgTips.alpha = 1;
            Laya.Pool.recover("p_Image", imgTips);
        });
        timeLine.play(0, false);
    }

    public static playAccEffect(parentNode: any): void {
        let img: Laya.Image = Laya.Pool.getItemByClass("p_Image", Laya.Image);
        img.skin = "images/hall/acce_effect.png";
        img.anchorX = img.anchorY = 0.5;
        img.scale(0, -1);
        AlignUtils.setToScreenGoldenPos(img, 0, true);
        LayerMgr.Ins.screenEffectLayer.addChild(img);
        let timeLine = new Laya.TimeLine();
        timeLine.addLabel("tl1", 0).from(img, { scaleX: 0.4, scaleY: 1 }, 100)
            .addLabel("tl2", 0).to(img, { scaleX: 0.65, scaleY: -1 }, 200)
            .addLabel("tl3", 0).to(img, { scaleX: 1, scaleY: 1 }, 300)
            .addLabel("tl4", 0).to(img, { scaleX: 1, scaleY: 1 }, 500)
        timeLine.on(Laya.Event.COMPLETE, img, () => {
            img.removeSelf();
            img.scale(1, 1);
            Laya.Pool.recover("p_Image", img);
        });
        timeLine.play(0, false);
    }

    /** 金币雨 */
    public static playCoinRainEffect(imgUrl: string): void {
        let coinCount = 8;
        for (var index = 0; index < coinCount; index++) {
            let imgCoin: Laya.Image = Laya.Pool.getItemByClass("p_Image", Laya.Image);
            imgCoin.mouseEnabled = false;
            imgCoin.graphics.clear();
            imgCoin.loadImage(imgUrl);
            imgCoin.pivot(imgCoin.width / 2, imgCoin.height / 2);
            LayerMgr.Ins.screenEffectLayer.addChild(imgCoin);
            imgCoin.pos(index * (LayerMgr.stageDesignWidth / coinCount) + Math.random() * 100, Math.random() * 500 - 300);
            Laya.Tween.to(imgCoin, { x: imgCoin.x, y: LayerMgr.stageDesignHeight }, 3000,
                Laya.Ease.linearNone, Laya.Handler.create(this, (_coinSp: Laya.Node) => {
                    _coinSp.removeSelf();
                    Laya.Pool.recover("p_Image", _coinSp);
                }, [imgCoin]));
        }
    }

    public static playImageTextEffect(_parentNode: any, _imgUrl: string, _content: string, _pos: { x: number, y: number } = null, _zOrder: number = 0): void {
        let coinImg: Laya.Image = Laya.Pool.getItemByClass("p_Image", Laya.Image);
        coinImg.skin = _imgUrl;
        coinImg.anchorX = 0.5;
        coinImg.anchorY = 0.5;
        _parentNode.addChild(coinImg);
        if (_pos) {
            coinImg.pos(_pos.x, _pos.y);
        } else {
            coinImg.pos(_parentNode.width / 2, -_parentNode.height / 2);
        }
        if (_zOrder > 0) {
            coinImg.zOrder = _zOrder;
        }
        //飘文字
        var coinLabel = new Laya.Label();
        coinLabel.text = _content;
        coinLabel.fontSize = 30;
        coinLabel.color = "#fff1ba";
        coinLabel.anchorY = 0.5;
        coinImg.addChild(coinLabel);
        coinLabel.pos(coinImg.width, coinImg.height * 0.5);
        //动画
        let timeLine = new Laya.TimeLine();
        timeLine.addLabel("tl1", 0).from(coinImg, { scaleX: 0, scaleY: 0, y: (coinImg.y + 30) }, 300, Laya.Ease.linearNone)
            .addLabel("tl2", 500).to(coinImg, { x: coinImg.x, y: (coinImg.y - 50), alpha: 0 }, 1200, Laya.Ease.cubicInOut)
        timeLine.on(Laya.Event.COMPLETE, coinImg, () => {
            coinImg.removeChildren();
            coinImg.removeSelf();
            coinImg.alpha = 1;
            coinImg.scale(1, 1);
            Laya.Pool.recover("p_Image", coinImg);
        });
        timeLine.play(0, false);
    }

    /**
     * 文字打字机效果
     * obj           文本对象
     * content       文字
     * interval      打字间隔 毫秒
     */
    public static playTypewriterEffect(label: Laya.Label, content: string = "", interval: number = 50, callBack: Function = null): void {
        let self = this;
        label.text = "";
        let strArr: string[] = content.split("");
        let len: number = strArr.length;
        for (let i = 0; i < len; i++) {
            Laya.timer.once(interval * i, this, () => {
                label.text = label.text.concat(strArr[i]);
                if ((i >= len - 1) && (callBack != null)) {
                    callBack();
                }
            })
        }
    }

    /** 龙骨特效 */
    public static playBoneEffect(boneName: string, pos: { x: number, y: number },layer?:any): void {
        let bone: BoneAnim = new BoneAnim(boneName);
        bone.completeBack = () => {
            bone.destroy();
        }
     
        bone.x = pos.x;
        bone.y = pos.y;
        if(layer){
            layer.addChild(bone);
        }else{
            LayerMgr.Ins.flyLayer.addChild(bone);
        }
     
    }
}