export default class BaseCharacter extends Laya.Sprite {

    /** 移动方向(默认右,1为左) */
    protected moveDir: number = 0;
    /** 延迟移动时间 */
    protected delayMoveTime: number = 5;
    /** 移动速度倍率 */
    protected moveSpeedRatio: number = 1;
    /** 移动速度加速 */
    protected moveAccelerate: number = 1;
    /** 默认0步行，1为攻击 */
    protected state: number = -1;
    /** 攻击对象 */
    protected attackSprite: BaseCharacter = null;
    /** 初始位置x */
    protected orginalX: number = 0;
    /** 已经就位，可攻击 */
    protected isInPosition: boolean = false;
    /** 英雄模型路径 */
    protected heroPath: string = '';
    /** 坐骑模型路径 */
    protected horsePath: string = '';
    /** 攻击动画key */
    protected atkAnimKey: string = 'attack';
    /** 收益CD */
    protected incomeTime: number = 0;

    constructor() {
        super();
    }

    /** 设置人物龙骨 */
    public setCharacterBone(id: number): void {

    }

    /** 动画播放状态 */
    public playAnimation(state: number = 0, callback: any = null): void {

    }

    /** 创建攻击对象 */
    public createAttackTarget(parentNode: Laya.Node, startPos: Laya.Point): BaseCharacter {

        return this;
    }

    /** 移除攻击对象 */
    public removeEnemy(isKill: boolean = false): void {

    }

    /** 移动 */
    public playMoveAction(): void {
        this.orginalX = this.x;
        if (this.orginalX > Laya.stage.width / 2) {
            //后退
            let actionSp: BaseCharacter = this;
            this.orginalX = Laya.stage.width / 2 - Math.random() * 100;
            Laya.Tween.to(actionSp, { x: this.orginalX }, Math.abs(actionSp.x - this.orginalX) * 15, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                Laya.Tween.clearTween(actionSp);
                this.isInPosition = true;
            }))
        } else {
            this.isInPosition = true;
        }
    }

    /** 移动是否停止 */
    public get isMoveStop(): boolean {
        return this.delayMoveTime > 0;
    }

    /** 收益倒计时 */
    public setIncomeTime(): void {
        this.incomeTime = 60 * this.moveSpeedRatio;
    }

    /** 收益倒计时 */
    public get IncomeTime(): number {
        return this.incomeTime;
    }

    //攻击对象
    public get AttackTarget(): BaseCharacter {
        return this.attackSprite;
    }

    public set AttackTarget(attackSp: BaseCharacter) {
        this.attackSprite = attackSp;
    }

    public set IsInPosition(value: boolean) {
        this.isInPosition = value;
    }
    //是否攻击已就位
    public get IsInPosition(): boolean {
        return this.isInPosition;
    }

    //获取初始位置x
    public get OrginalX(): number {
        return this.orginalX;
    }

    public setMoveSpeedRatio(value: number): void {
        this.moveSpeedRatio = value;
    }

    public setMoveAccelerate(value: number): void {
        this.moveAccelerate = 1.0 / value;
    }

    //##贝塞尔曲线#################################
    // 以控制点cp计算曲线点
    public CalculateBeizer(cp: Array<any>, numOfPoints: number): Array<any> {
        var t = 1.0 / (numOfPoints - 1);
        var curve = [];
        for (var i = 0; i < numOfPoints; i++) {
            curve[i] = this.PointOnCubicBezier(cp, i * t);
        }
        return curve;
    }
    // 参数1: 4个点坐标(起点，控制点1，控制点2，终点)  
    // 参数2: 0 <= t <= 1   
    private PointOnCubicBezier(cp: Array<any>, t: number): any {
        var tPoint_x = this.MetaComputing(cp[0].x, cp[1].x, cp[2].x, cp[3].x, t);
        var tPoint_y = this.MetaComputing(cp[0].y, cp[1].y, cp[2].y, cp[3].y, t);
        return { x: tPoint_x, y: tPoint_y };
    }
    private MetaComputing(p0: number, p1: number, p2: number, p3: number, t: number): number {
        // 方法一:  
        var a: number, b: number, c: number;
        var tSquare: number, tCube: number;
        // 计算多项式系数
        c = 3.0 * (p1 - p0);
        b = 3.0 * (p2 - p1) - c;
        a = p3 - b - c - p0;

        // 计算t位置的点
        tSquare = t * t;
        tCube = t * tSquare;
        return (a * tCube) + (b * tSquare) + (c * t) + p0;

        // 方法二: 原始的三次方公式
        //  number n = 1.0 - t;
        //  return n*n*n*p0 + 3.0*p1*t*n*n + 3.0*p2*t*t*n + p3*t*t*t;
    }
    //##贝塞尔曲线#################################
}