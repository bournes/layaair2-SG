import TSDictionary from "../../utils/TSDictionary";

/**
 * CSV解析类
 */
export default class CSVParser {

    //用json替换csv,json解析文件
    public static ParseJsonData(infoClass: any, sourceText: string): TSDictionary<number, any> {
        let self = this;
        var result: TSDictionary<number, any> = new TSDictionary<number, any>();
        sourceText = sourceText.trim();
        let obj = JSON.parse(sourceText);
        var keyList: Array<string> = null;
        var typeList: Array<string> = null;
        var dataList: Array<any> = null;
        var itemList: Array<any> = null;

        keyList = obj.titles;
        if (obj.data == null) return result;//空表不做处理
        dataList = obj.data;//数据是从0开始
        typeList = dataList[0];
        var i: number = 0;
        var dataLen: number = dataList.length;

        for (i = 0; i < dataLen; i++) {
            var record: any = new infoClass();
            itemList = dataList[i];
            self.ParseRecord(keyList, itemList, record);
            result.Add(parseInt(itemList[0]), record);
        }
        sourceText = null;
        return result;
    }

    private static ParseRecord(keyList: Array<string>, itemList: Array<string>, record: Object) {
        let self = this;
        var n: number = itemList.length;
        for (var i: number = 0; i < n; i++) {
            record[keyList[i]] = itemList[i];
        }
    }
}