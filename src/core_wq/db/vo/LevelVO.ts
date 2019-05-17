export default class LevelVO {

    public id: number;
    /** 位置开放数量 */
    public openCellCount: number;
    /** 上阵战斗数量 */
    public battleCount: number;
    /** 升级所需经验 */
    public upNeedexp: number;
    /** 升级额外产出奖励 */
    public extraProduce: number;
    /** 双倍加速时间(s) */
    public accSpeedTime: number;
    /** 金币礼包（20*秒产金币） */
    public goldGift: number;
    /** 钻石（礼包2）等级*2.03 */
    public diamondsGift: number;
}