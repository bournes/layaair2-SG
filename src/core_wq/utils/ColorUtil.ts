export default class ColorUtil {

    /**
     * 滤镜
     * @param type  1：变暗 2：变黑
     */
    public static createColorFilter(type: number = 0): Array<Laya.ColorFilter> {
        if (type == 1) {//变暗
            var colorV = 0.6;
            var colorMat =
                [
                    colorV, 0, 0, 0, 0, //R
                    0, colorV, 0, 0, 0, //G
                    0, 0, colorV, 0, 0, //B
                    0, 0, 0, 1, 0, //A
                ];
            //创建一个颜色滤镜对象
            var colorFilter = new Laya.ColorFilter(colorMat);
            return [colorFilter];
        } else if (type == 2) {//变黑
            var colorV = 0.6;
            var colorMat =
                [
                    0, 0, 0, 0, 0, //R
                    0, 0, 0, 0, 0, //G
                    0, 0, 0, 0, 0, //B
                    0, 0, 0, 1, 0, //A
                ];
            //创建一个颜色滤镜对象
            var colorFilter = new Laya.ColorFilter(colorMat);
            return [colorFilter];
        }
        return [];
    }

}