export default class MathUtil extends Laya.Script {

    /** 生成随机浮点数，随机数范围包含min值，但不包含max值 */
    public static range(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    /** 生成随机整数，随机整数范围包含min值和max值 */
    public static rangeInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /** 单位转换 */
    public static unitConversion(value: number): string {
        if (value < 1000000) {
            return Math.floor(value).toString();
        }
        if (value === 0) return '0';
        let k: number = 1000, // or 1024
            sizes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
            i = Math.floor(Math.log(value) / Math.log(k));
        let unit: string = '';
        if (i < sizes.length) {
            unit = sizes[i];
        } else {
            let numLenght: number = i - sizes.length;
            unit = String.fromCharCode(97 + numLenght % 26);
            for (let index: number = 0, len: number = 1 + Math.floor(numLenght / 65); index < len; index++) {
                unit = unit + unit;
            }
        }
        return (value / Math.pow(k, i)).toPrecision(3) + ' ' + unit;
    }

    /** 字符串转数字 */
    public static parseStringNum(_strNum: string): number {
        let intNum = parseFloat(_strNum);
        if (intNum) {
            return intNum;
        }
        return 0;
    }

    /** 字符串转整形 */
    public static parseInt(_strNum: string): number {
        let intNum = parseFloat(_strNum);
        if (intNum) {
            return Math.floor(intNum);
        }
        return 0;
    }

    public static splitToNumber(value, sprelator: string = "#"): number[] {
        if (value == "0") return [];
        let result: number[] = [];
        let sArray: string[] = value.split(sprelator);
        for (let i: number = 0; i < sArray.length; i++) {
            result.push(parseInt(sArray[i]));
        }
        return result;
    }

    public static splitToString(value, sprelator: string = "#"): any[] {
        if (value == "0") return [];
        let result: string[] = [];
        let sArray: string[] = value.split(sprelator);
        for (let i: number = 0; i < sArray.length; i++) {
            result.push(sArray[i]);
        }
        return result;
    }

    public static removeFromArray(target: any, array: any[]): any[] {
        let index = array.indexOf(target);
        if (index >= 0) array.splice(index, 1);
        return array;
    }

    /** 替换数组中的数据 */
    public static replaceItemToArray(array: any[], inde: number, item: any) {
        array.splice(inde, 1, item);
    }
}