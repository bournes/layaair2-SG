export default class TimeUtil {

    public static cs_time_diff: number = 0; //客户端与服务器时间差

    /** 00:00:00格式时间 */
    public static timeFormatStr(_time: number, _isHour: boolean = false): string {
        let hour = Math.floor(_time / 3600);
        let minute = Math.floor(_time / 60) % 60;
        let sec = _time % 60;
        if (_isHour) {
            return (hour < 10 ? ('0' + hour) : hour) + ':' + (minute < 10 ? ('0' + minute) : minute) + ':' + (sec < 10 ? ('0' + sec) : sec);
        } else {
            return (minute < 10 ? ('0' + minute) : minute) + ':' + (sec < 10 ? ('0' + sec) : sec);
        }
    }

    /** 获取本地与服务器时间差(s减c) */
    public static csDiffTime(): number {
        let that = this;
        return that.cs_time_diff;
    }

    /** 获取服务器当前时间 */
    public static serverTime(): number {
        let that = this;
        let cur_time: number = (new Date()).getTime() / 1000;
        return (cur_time + that.csDiffTime());
    }

}