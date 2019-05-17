export default class TimeConfig {
    /**
	 * 以秒为单位时，表示1秒的值，即1
	 */
    public static SEC: number = 1;
	/**
	 * 以秒为单位时，表示1分钟的值，即60
	 */
    public static MIN: number = 60;
	/**
	 * 以秒为单位时，表示1小时的值，即60 x 60
	 */
    public static HOUR: number = 60 * 60;

	/**
	 * 以毫秒为单位时，表示1秒的值，即1000
	 */
    public static SEC_IN_MILI: number = 1000;
	/**
	 * 以毫秒为单位时，表示1分钟的值，即1000 x 60
	 */
    public static MIN_IN_MILI: number = 1000 * 60;
	/**
	 * 以毫秒为单位时，表示1小时的值，即1000 x 60 x 60
	 */
    public static HOUR_IN_MILI: number = 1000 * 60 * 60;
}