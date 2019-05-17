export default class PathConfig extends Laya.Script {

    public static AppUrl: string = "https://sanguo.xiaoduogame.cn/api/"; //正式服地址
    public static AppResUrl: string = "https://miniapp.vuggame.com/sanguo_xiaoduogame_cn/v1/";
    public static RES_URL: string = PathConfig.AppResUrl + "images/";
    public static HEAD_PATH: string = PathConfig.RES_URL + "headImg/";
    public static BONE_PATH: string = PathConfig.RES_URL + "boneAnim/{0}.sk";
    public static BONE_MONSTER_PATH: string = PathConfig.RES_URL + "boneAnim/enemy/{0}.sk";
    /** 声音路径 */
    public static SOUND_PATH: string = Laya.Browser.onPC ? "musics/mp3/{0}.mp3" : "musics/ogg/{0}.ogg"  ;
    /** 排行榜排名图片路径 */
    public static RANK_PATH: string = "images/rank/cell_top{0}.png";
    /** 功能按钮图片路径 */
    public static SYSTEM_BTN_PATH: string = "images/hall/{0}.png";
}