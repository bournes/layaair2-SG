export default class PlayerInfo {

    public static GOLD: number = 0;
    public static DIAMOND: number = 1;

    /** 微信用户信息 */
    public wxUserInfo: any = null;
    public wxLaunch: any = null;

    /** 拥有金币 */
    public userGold: number = 100000;
    /** 拥有钻石 */
    public userDiamond: number = 0;
    /** 用户ID */
    public userId: number = 0;
    /** 用户等级 */
    public userLevel: number = 1;
    /** 用户经验 */
    public userExp: number = 0;
    /** 等级增长的收益 */
    public userLevelExtraIncome: number = 1;
    /** 本地缓存数据 */
    public store_key: string = "store_key";
    /** 每秒收益 */
    public userIncomeSec: number = 0;
    /** 额外收益-战斗人数满后+10% */
    public userExtraIncome: number = 1;
    /** 启动加速x2 */
    public userAcceValue: number = 1;
    /** 加速时间 */
    public userAcceTime: number = 0;
    /** 跑道车数量 */
    public userRuncarCount: number = 0;
    /** 跑道车数量最大值 */
    public userRuncarCountMax: number = 0;
}