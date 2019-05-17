/*
* 字典;
*/
export default class TSDictionary<KT, VT>{
    /**
      * 字典这个数据结构，其本质是一个个键值对<key,value>形成的数据集合，
      * 但为了能查找到正确的数据，key值必须保证唯一性。我们可以通过使用
      * Typescript中的两个数组来分别存储key值和value值来模拟实现这种结构。
      * 数据存储时把key和value分别存储在两个数组相同的索引位置，
      * 这样在查找数据时就可以通过这个索引把数据关联起来，找到对应的值。。
      * 
      */

    private keys: KT[] = [];
    private values: VT[] = [];
    private _len: number = 0;
    public constructor() { }

    public toJsonObject(): any {
        const result: any = {};
        result.keys = this.keys;
        result.values = this.values;
        return result;
    }

    public fromJsonObject(obj: any): void {
        this.keys = obj.keys;
        this.values = obj.values;
    }

    public Add(key: any, value: any) {
        let self = this;
        self.keys.push(key);
        self.values.push(value);
        self._len++;
    }

    public Remove(key: any) {
        let self = this;
        let index = self.keys.indexOf(key, 0);
        if (index != -1) {
            self.keys.splice(index, 1);
            self.values.splice(index, 1);
            self._len--;
        }
    }

    /**获取字典中对应key的值，不存在则返回null */
    public TryGetValue(key: KT): VT {
        let self = this;
        var index = self.keys.indexOf(key, 0);
        if (index != -1) {
            return self.values[index];
        }
        return null;
    }

    public TryGetKey(value: VT): KT {
        let self = this;
        var index = self.values.indexOf(value, 0);
        if (index != -1) {
            return self.keys[index];
        }
        return null;
    }
    /**
     * 通过判断条件获取相关列表
     * @param value 判断条件例如：
     * this.TryGetListByCondition(function(VT){
     *      if(VT.xx==xx){
     *          return true
     *
     *      return false;
     * });
     * cache.TryGetListByCondition((bean:Type)=>bean.xxx==xxx);
     * 获取列表全部cache.TryGetListByCondition((bean:Type)=>true);
     */
    public TryGetListByCondition(value: (value: VT) => boolean): Array<VT> {
        let self = this;
        let list = [];
        for (let o of self.values) {
            if (value(o)) {
                list[list.length] = o;
            }
        }
        return list;
    }
    public TryGetAnyByCondition(value: (value: VT) => boolean): Array<VT> {
        let self = this;
        let dic: any = {};
        for (let s of self.keys) {
            var index = self.keys.indexOf(s, 0);
            if (value(self.values[index])) {
                dic[s] = self.values[index];
            }
        }
        return dic;
    }
    /**
     * 通过判断条件获取相关列表
     * @param value 判断条件例如：
     * this.TryGetListByCondition(function(VT){
     *      if(VT.xx==xx){
     *          return true
     *
     *      return false;
     * });
     * cache.TryGetListByCondition((bean:Type)=>bean.xxx==xxx);
     * 获取列表全部cache.TryGetListByCondition((bean:Type)=>true);
     */
    public TryGetKeyListByCondition(value: (v: KT) => boolean): Array<VT> {
        let self = this;
        let list = [];
        for (let i = 0; i < self.keys.length; i++) {

            if (value(self.keys[i])) {
                list[list.length] = self.values[i];
            }
        }
        return list;
    }

    /**判断字典中是否存在对应key的值，返回boolean */
    public ContainsKey(key: any): boolean {
        let self = this;
        let ks = self.keys;
        for (let i = 0; i < ks.length; ++i) {
            if (ks[i] == key) {
                return true;
            }
        }
        return false;
    }

    /**虽然可以通过上面的TryGetValue()函数获取到字典里的引用数据，
     * 再对数据进行修改更新，但当数据是值类型时是无法实现修改保存的。
     * 为了更方便的修改字典里的数据，增加一个修改数据的函数:(并在返回值中返回是否修改成功) */
    public SetDicValue(key: any, value: any): boolean {
        var index = this.keys.indexOf(key, 0);
        if (index != -1) {
            this.keys[index] = key;
            this.values[index] = value;
            return true;
        }
        this.Add(key, value);
        return true;
    }

    /**key为number的，可以按从小到大的顺序重新排序 */
    public SortByKey(): boolean {
        let self = this;
        for (let j = self.keys.length - 1; j > 0; j--) {
            for (let i = 0; i < j; i++) {
                if (Number(self.keys[i]) > Number(self.keys[i + 1])) {
                    let temKey: any = self.keys[i];
                    let temValue: any = self.values[i];
                    self.keys[i] = self.keys[i + 1];
                    self.values[i] = self.values[i + 1];
                    self.keys[i + 1] = temKey;
                    self.values[i + 1] = temValue;
                }
            }
        }
        return true;
    }

    public GetLenght(): number {
        return this._len;
    }

    public getValueByIndex(index: number): VT {
        let self = this;
        if (index < 0 || index >= self._len) {
            return;
        }
        let value: VT = self.values[index];
        return value;
    }

    public getKeyByIndex(index: number): KT {
        let self = this;
        if (index < 0 || index >= self._len) {
            return;
        }
        let value: KT = self.keys[index];
        return value;
    }

    public getValues(): VT[] {
        return this.values;
    }
    public getkeys(): KT[] {
        return this.keys;
    }

    public clear(): void {
        let self = this;
        while (self.keys.length > 0) {
            self.keys.pop();
        }

        while (self.values.length > 0) {
            let vt: VT = self.values.pop();
            vt = null;
        }
        self.keys.length = 0;
        self.values.length = 0;
        self._len = 0;
    }
}