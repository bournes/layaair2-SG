import ColorUtil from "../../../core_wq/utils/ColorUtil";

export default class ScaleAnimScript {

    private scaleBox: Laya.Box;
    private scaleOrginValue: { x: number, y: number };
    private isMouseDown: boolean = false; //按下
    private isMouseOut: boolean = false; //移除
    private _originAnchor: Laya.Point;

    public set owner(value: any) {
        this.scaleBox = value;
        //自定义的脚本会有时序问题，所以在此添加一个延时
        this.scaleBox.frameOnce(2, this, this.onLoaded);
    }
    private onLoaded(): void {
        this.scaleOrginValue = { x: this.scaleBox.scaleX, y: this.scaleBox.scaleY }
        this.scaleBox.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        this.scaleBox.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        this.scaleBox.on(Laya.Event.MOUSE_OUT, this, this.mouseOut);
    }
    private mouseDown(): void {
        this.isMouseDown = true;
        this.isMouseOut = false;
        this.scaleSmall();
    }
    private mouseUp(): void {
        if (this.isMouseDown) {
            this.scaleNormal();
        }
        this.isMouseDown = false;
    }
    private mouseOut(): void {
        if (this.isMouseDown) {
            this.scaleNormal();
        }
        this.isMouseDown = false;
        this.isMouseOut = true;
    }
    private mouseMove(): void {
        if (this.isMouseOut) {
            if (this.isHit(this.scaleBox)) {
                this.scaleSmall();
            } else {
                this.scaleNormal();
            }
        }
    }
    private scaleSmall(): void {
        if (this.scaleBox) {
            this.scaleBox.scale(this.scaleOrginValue.x * 0.95, this.scaleOrginValue.y * 0.95);
            this.scaleBox.filters = ColorUtil.createColorFilter(1);
        }
    }
    private scaleNormal(): void {
        if (this.scaleBox) {
            this.scaleBox.scale(this.scaleOrginValue.x, this.scaleOrginValue.y);
            this.scaleBox.filters = [];
        }
    }
    //点击检测
    private isHit(_checkBox: Laya.Box, _extW: number = 0, _extH: number = 0) {
        if (_checkBox) {
            let touchPos: Laya.Point = _checkBox.getMousePoint();
            let touchArea: Laya.Rectangle = new Laya.Rectangle(0 - _extW / 2, 0 - _extH / 2,
                _checkBox.width + _extW, _checkBox.height + _extH);
            return touchArea.contains(touchPos.x, touchPos.y);
        }
        return false;
    }
}