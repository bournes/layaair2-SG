import Layer from "../layer/base/Layer";

export default  class PointUtils {
	/**
	 * 按位置取得两个点之间连线上某个点的位置
	 * @param startPt 起始点
	 * @param endPt 结束点
	 * @param position 要取点的位置，<code>position</code>的值越接近0，取出的点越靠近<code>startPt</code>；<code>position</code>的值越接近1，取出的点越靠近<code>endPt</code>；
	 * @return
	 *
	 */
	public static interpolate(
		startPt: Laya.Point,
		endPt: Laya.Point,
		position: number
	): Laya.Point {
		return new Laya.Point(
			startPt.x + (endPt.x - startPt.x) * position,
			startPt.y + (endPt.y - startPt.y) * position
		);
	}
	/**
	 * 计算两个点之间的距离
	 * @param p1 第一个点
	 * @param p2 第二个点
	 * @return 距离
	 *
	 */
	public static distance(p1: Laya.Point, p2: Laya.Point): number {
		return Math.sqrt(
			(p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
		);
	}
	/**
	 * 计算两组坐标之间的距离
	 * @param x1 第一个点的x坐标
	 * @param y1 第一个点的y坐标
	 * @param x2 第二个点的y坐标
	 * @param y2 第二个点的y坐标
	 * @return 距离
	 *
	 */
	public static distanceByAxis(
		x1: number,
		y1: number,
		x2: number,
		y2: number
	): number {
		return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	}

	/**
	 * 获得从p1至p2的朝向，当p1在左侧时返回1，当p1在右侧时返回-1
	 * @param p1
	 * @param p2
	 * @return
	 *
	 */
	public static getDirection(p1: Laya.Point, p2: Laya.Point): number {
		if (p1.x <= p2.x) {
			return 1;
		}
		if (p1.x > p2.x) {
			return -1;
		}
		return 1;
	}

	/**
	 * 获得target在LayerManager的全局坐标
	 * @param target
	 * @param moveRightNow 是否同时把target的位置移到新的位置
	 * @return
	 *
	 */
	public static localToGlobal(target: Laya.Sprite, moveRightNow?: boolean): Laya.Point {
		let pt: Laya.Point = new Laya.Point(target.x, target.y);
		let parent: Laya.Sprite = target.parent as Laya.Sprite;
		while (parent && !(parent instanceof Layer)) {
			pt.x += parent.x - parent.pivotX - (parent.scrollRect ? parent.scrollRect.x : 0);
			pt.y += parent.y - parent.pivotY - (parent.scrollRect ? parent.scrollRect.y : 0);
			parent = parent.parent as Laya.Sprite;
		}
		if (moveRightNow) {
			target.pos(pt.x, pt.y);
		}
		return pt;
	}

    /**
     * 保持target对象的全局位置不变的情况下，计算target显示对象在新的显示对象容器中的本地坐标位置
     * @param target
     * @param newParent
     * @param moveRightNow
     * @return
     *
     */
	public static parentToParent(
		target: Laya.Sprite,
		newParent: Laya.Sprite,
		moveRightNow?: boolean
	): Laya.Point {
		let pt: Laya.Point = PointUtils.localToGlobal(target);
		let zeroPt: Laya.Point = new Laya.Point();
		let parent: Laya.Sprite = newParent;
		while (parent && !(parent instanceof Layer)) {
			zeroPt.x += parent.x;
			zeroPt.y += parent.y;
			parent = parent.parent as Laya.Sprite;
		}

		pt.x = pt.x - zeroPt.x;
		pt.y = pt.y - zeroPt.y;

		if (moveRightNow) {
			target.pos(pt.x, pt.y);
		}
		return pt;
	}
}