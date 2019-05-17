import ShopView from "../../module/shop/view/ShopView";
import ViewMgr from "./ViewMgr";
import ViewConst from "./const/ViewConst";
import DiamondBuyView from "../../module/common/view/DiamondBuyView";
import LuckPrizeView from "../../module/luckPrize/view/LuckPrizeView";
import DaySignView from "../../module/daySign/view/DaySignView";
import TaskView from "../../module/task/view/TaskView";
import FollowView from "../../module/follow/view/FollowView";
import RankView from "../../module/rank/view/RankView";
import GoldNotEnoughView from "../../module/common/view/GoldNotEnoughView";
import LevelRewardView from "../../module/common/view/LevelRewardView";
import OffLineRewardView from "../../module/common/view/OffLineRewardView";
import UserInfoView from "../../module/hall/view/UserInfoView";
import NewHeroView from "../../module/hall/view/NewHeroView";
import LuckPrizeRewardView from "../../module/luckPrize/view/LuckPrizeRewardView";
import LuckPrizeBoxView from "../../module/luckPrize/view/LuckPrizeBoxView";

/**
 * 界面注册类
 */
export default class ViewRegisterMgr {


    /** 初始化注册界面 */
    public initRegisterView(): void {
        ViewMgr.Ins.register(ViewConst.ShopView, new ShopView());
        ViewMgr.Ins.register(ViewConst.DiamondBuyView, new DiamondBuyView());
        ViewMgr.Ins.register(ViewConst.LuckPrizeView, new LuckPrizeView());
        ViewMgr.Ins.register(ViewConst.DaySignView, new DaySignView());
        ViewMgr.Ins.register(ViewConst.TaskView, new TaskView());
        ViewMgr.Ins.register(ViewConst.FollowView, new FollowView());
        ViewMgr.Ins.register(ViewConst.RankView, new RankView());
        ViewMgr.Ins.register(ViewConst.GoldNotEnoughView, new GoldNotEnoughView());
        ViewMgr.Ins.register(ViewConst.LevelRewardView, new LevelRewardView());
        ViewMgr.Ins.register(ViewConst.OffLineRewardView, new OffLineRewardView());
        ViewMgr.Ins.register(ViewConst.UserInfoView, new UserInfoView());
        ViewMgr.Ins.register(ViewConst.NewHeroView, new NewHeroView());
        ViewMgr.Ins.register(ViewConst.LuckPrizeRewardView, new LuckPrizeRewardView());
        ViewMgr.Ins.register(ViewConst.LuckPrizeBoxView, new LuckPrizeBoxView());

    }

    private static _instance: ViewRegisterMgr;
    public static get Ins(): ViewRegisterMgr {
        if (ViewRegisterMgr._instance == null) {
            ViewRegisterMgr._instance = new ViewRegisterMgr();
        }
        return ViewRegisterMgr._instance;
    }
}
