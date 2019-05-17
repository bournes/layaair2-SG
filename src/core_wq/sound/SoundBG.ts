import BaseSound from "./BaseSound";

export default class SoundBG extends BaseSound {

    private _currBg: string;
    private _currSound: Laya.Sound;
    private _currSoundChannel: Laya.SoundChannel;
    private _volume: number;

    constructor() {
        super();
        this._currBg = "";
    }

    /**
     * 停止当前音乐
     */
    public stop(): void {
        let self = this;
        if (self._currSoundChannel) {
            self._currSoundChannel.stop();
        }
        self._currSoundChannel = null;
        self._currSound = null;
        self._currBg = "";
    }

    /**
     * 播放某个音乐
     * @param effectName
     */
    public play(effectName: string): void {
        let self = this;
        if (self._currBg == effectName)
            return;
        self.stop();
        self._currBg = effectName;
        var sound: Laya.Sound = self.getSound(effectName);
        if (sound) {
            self.playSound(self.soundPath);
        }
    }

    /**
     * 播放
     * @param sound
     */
    private playSound(soundPath: string): void {
        let self = this;
        self._currSoundChannel = Laya.SoundManager.playMusic(soundPath, 0);
        if (self._currSoundChannel) self._currSoundChannel.volume = this._volume;
    }

    /**
     * 设置音量
     * @param volume
     */
    public setVolume(volume: number): void {
        let self = this;
        self._volume = volume;
        if (self._currSoundChannel) {
            self._currSoundChannel.volume = self._volume;
        }
    }

    /**
     * 资源加载完成后处理播放
     * @param key
     */
    public loadedPlay(key: string, soundPath: string): void {
        let self = this;
        if (self._currBg == key) {
            var sound: Laya.Sound = Laya.loader.getRes(soundPath);
            if (sound) {
                self.playSound(soundPath);
            }
        }
    }

    /**
     * 检测一个文件是否要清除
     * @param key
     * @returns {boolean}
     */
    public checkCanClear(key: string): boolean {
        let self = this;
        return self._currBg != key;
    }
}