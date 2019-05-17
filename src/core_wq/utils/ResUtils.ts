export default class ResUtils {
    
    public static loadGroup(group: string[], onComplete: Function, thisObject: any) {
        Laya.loader.load(this.combGroupList(group), Laya.Handler.create(thisObject, onComplete));
    }

    /** 组合资源组名 */
    private static combGroupList(group: string[]): any[] {
        let newGroup: any[] = [];
        for (let i: number = 0, len: number = group.length; i < len; i++) {
            newGroup.push({ url: "res/atlas/images/" + group[i] + ".atlas", type: Laya.Loader.ATLAS });
        }
        return newGroup;
    }
}