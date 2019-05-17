import PathConfig from "../config/PathConfig";
import SoundVO from "../db/vo/SoundVO";
import GlobalData from "../db/GlobalData";
import SoundMgr from "./SoundMgr";

export default class BaseSound {

    private _cache: any;
    private _loadingCache: Array<string>;
    private _key: string;
    public soundPath: string = "";

    constructor() {
        let self = this;
        self._cache = {};
        self._loadingCache = new Array<string>();
        Laya.timer.loop(1 * 60 * 1000, self, self.dealSoundTimer);
    }

    /**
     * 处理音乐文件的清理
     */
    private dealSoundTimer(): void {
        let self = this;
        let currTime: number = Laya.Browser.now();
        let keys = Object.keys(self._cache);
        for (let i: number = 0, len = keys.length; i < len; i++) {
            let key = keys[i];
            if (!self.checkCanClear(key))
                continue;
            if (currTime - self._cache[key] >= SoundMgr.CLEAR_TIME) {
                delete self._cache[key];
                Laya.loader.clearRes(key);
            }
        }
    }

    /**
     * 获取Sound
     * @param key
     * @returns {egret.Sound}
     */
    public getSound(key: string): Laya.Sound {
        let self = this;
        self._key = key;
        let vo: SoundVO = GlobalData.getData(GlobalData.SoundVO, Number(key));
        if (vo == null) return null;
        self.soundPath = PathConfig.SOUND_PATH.replace("{0}", vo.file);
        let sound: Laya.Sound = Laya.loader.getRes(self.soundPath);
        if (sound) {
            if (self._cache[self.soundPath]) {
                self._cache[self.soundPath] = Laya.Browser.now();
            }
        } else {
            if (self._loadingCache.indexOf(self.soundPath) != -1) {
                return sound;
            }
            self._loadingCache.push(self.soundPath);
            Laya.loader.load([{ url: self.soundPath, type: Laya.Loader.SOUND }], Laya.Handler.create(self, () => {
                let index: number = self._loadingCache.indexOf(self.soundPath);
                if (index != -1) {
                    self._loadingCache.splice(index, 1);
                    self._cache[self.soundPath] = Laya.Browser.now();
                    self.loadedPlay(self._key, self.soundPath);
                }
            }, null, false));
        }
        return sound;
    }

    /**
     * 资源加载完成后处理播放，子类重写
     * @param key
     */
    public loadedPlay(key: string, soundPath: string): void {

    }

    /**
     * 检测一个文件是否要清除，子类重写
     * @param key
     * @returns {boolean}
     */
    public checkCanClear(key: string): boolean {
        return true;
    }
}