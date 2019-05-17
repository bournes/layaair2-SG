import LayerMgr from "../layer/LayerMgr";

export default class AlignUtils {
	/**
	 * 把现实对象设置到屏幕水平居中，垂直居中的位置上，使用前请确认<code>sprite</code>宽高不为0
	 * @param sprite
	 * @param delayFrames
	 * @param useRegisterPoint
	 *
	 */
	public static setToScreenCenter(
		sprite: Laya.Sprite,
		delayFrames?: number,
		useRegisterPoint?: boolean
	): void {
		if (delayFrames) {
			Laya.timer.frameOnce(
				delayFrames,
				AlignUtils,
				AlignUtils.setToScreenCenter,
				[sprite],
				false
			);
		}
		if (useRegisterPoint) {
			sprite.x = LayerMgr.stageDesignWidth * 0.5;
			sprite.y = LayerMgr.stageDesignHeight * 0.5;
		} else {
			sprite.x = (LayerMgr.stageDesignWidth - sprite.width) * 0.5;
			sprite.y = (LayerMgr.stageDesignHeight - sprite.height) * 0.5;
		}

	}

	/**
	 * 把现实对象设置到屏幕水平居中，垂直在0.618的黄金分割点位置上，使用前请确认<code>sprite</code>宽高不为0
	 * @param sprite
	 * @param delayFrames
	 * @param useRegisterPoint
	 *
	 */
	public static setToScreenGoldenPos(
		sprite: Laya.Sprite,
		delayFrames?: number,
		useRegisterPoint?: boolean
	): void {
		if (delayFrames) {
			Laya.timer.frameOnce(
				delayFrames,
				AlignUtils,
				AlignUtils.setToScreenGoldenPos,
				[sprite],
				false
			);
		}
		if (useRegisterPoint) {
			sprite.x = LayerMgr.stageDesignWidth * 0.5;
			sprite.y = LayerMgr.stageDesignHeight * 0.382;
		} else {
			sprite.x = (LayerMgr.stageDesignWidth - sprite.width) * 0.5;
			sprite.y = (LayerMgr.stageDesignHeight - sprite.height) * 0.382;
		}
	}

	/**
	 * 仅将目标对象target的x坐标和y坐标设置为到ref的中心。（注意，如果ref没有宽高可能会导致意外的问题）
	 * @param target
	 * @param ref
	 *
	 */
	public static setToSpriteCenter(target: Laya.Sprite, ref: Laya.Sprite): void {
		if (!target || !ref) {
			throw new Error("Either target or ref is null.");
		} else {
			target.pos(ref.width * 0.5, ref.height * 0.5);
		}
	}

	/**
	 * 仅将目标对象target根据对齐方式设置坐标。仅设置x坐标和y坐标，忽略目标对象target的宽高。（注意，如果ref没有宽高可能会导致意外的问题）
	 * @param target
	 * @param ref
	 *
	 */
	public static setTo(
		align: string,
		target: Laya.Sprite,
		ref: Laya.Sprite
	): void {
		if (align === "center") {
			AlignUtils.setToSpriteCenter(target, ref);
		}
	}
}
