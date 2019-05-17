export default class HeroConfigVO {

    public id: number;
    public name: string;
    /** 初始成本价 */
    public buyPrice: number;
    /** 产出金币 */
    public totalCoin: number;
    /** 每秒产出金币 */
    public PerSecCoin: number;
    /** 移动速度 */
    public speed: number;
    /** 回收价格 */
    public sellPrice: number;
    /** 合成下一级鱼种需求数量 */
    public upNeedNum: number;
    /** 图鉴解锁制造需求解锁鱼种 */
    public unlockNeedId: number;
    /** 合成经验 */
    public syntheticExp: number;
}