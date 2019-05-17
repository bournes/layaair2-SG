import BaseSound from "./BaseSound";

export default class SoundEffects extends BaseSound {

    private _volume: number;

    constructor() { super(); }

    /**
     * 播放一个音效
     * @param effectName
     */
    public play(effectId: string): void {
        let sound: Laya.Sound = this.getSound(effectId);
        if (sound) {
            this.playSound(this.soundPath);
        }
    }

    /**
     * 播放
     * @param sound
     */
    private playSound(soundPath: string): void {
        let channel: Laya.SoundChannel = Laya.SoundManager.playSound(soundPath, 1);
        if (channel) channel.volume = this._volume;
    }

    /**
     * 设置音量
     * @param volume
     */
    public setVolume(volume: number): void {
        this._volume = volume;
    }

    /**
     * 资源加载完成后处理播放
     * @param key
     */
    public loadedPlay(key: string, soundPath: string): void {
        let sound: Laya.Sound = Laya.loader.getRes(soundPath);
        if (sound) {
            this.playSound(this.soundPath);
        }
    }
}