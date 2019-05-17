import SoundEffects from "./SoundEffects";
import SoundBG from "./SoundBG";

export default class SoundMgr {

    /** 音乐文件清理时间 */
    public static CLEAR_TIME: number = 3 * 60 * 1000;
    private _effect: SoundEffects;
    private _bg: SoundBG;
    private _effectOn: boolean;
    private _bgOn: boolean;
    private _currBg: string;
    private _bgVolume: number;
    private _effectVolume: number;

    constructor() {
        this._bgOn = true;
        this._effectOn = true;

        this._bgVolume = 0.5;
        this._effectVolume = 0.5;

        this._bg = new SoundBG();
        this._bg.setVolume(this._bgVolume);

        this._effect = new SoundEffects();
        this._effect.setVolume(this._effectVolume);
    }

    /**
     * 播放音效
     * @param effectName
     */
    public playEffect(effectId: string): void {
        if (!this._effectOn) return;
        this._effect.play(effectId);
    }

    /**
     * 播放背景音乐
     * @param key
     */
    public playBg(bgName: string): void {
        this._currBg = bgName;
        if (!this._bgOn) return;
        this._bg.play(bgName);
    }

    /**
     * 停止背景音乐
     */
    public stopBg(): void {
        this._bg.stop();
    }

    /**
     * 设置音效是否开启
     * @param $isOn
     */
    public setEffectOn($isOn: boolean): void {
        this._effectOn = $isOn;
    }

    /**
     * 设置背景音乐是否开启
     * @param $isOn
     */
    public setBgOn($isOn: boolean): void {
        this._bgOn = $isOn;
        if (!this._bgOn) {
            this.stopBg();
        } else {
            if (this._currBg) {
                this.playBg(this._currBg);
            }
        }
    }

    /**
     * 设置背景音乐音量
     * @param volume
     */
    public setBgVolume(volume: number): void {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this._bgVolume = volume;
        this._bg.setVolume(this._bgVolume);
    }

    /**
     * 获取背景音乐音量
     * @returns {number}
     */
    public getBgVolume(): number {
        return this._bgVolume;
    }

    /**
     * 设置音效音量
     * @param volume
     */
    public setEffectVolume(volume: number): void {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this._effectVolume = volume;
        this._effect.setVolume(this._effectVolume);
    }

    /**
     * 获取音效音量
     * @returns {number}
     */
    public getEffectVolume(): number {
        return this._effectVolume;
    }

    public get bgOn(): boolean {
        return this._bgOn;
    }

    public get effectOn(): boolean {
        return this._effectOn;
    }

    private static _instance: SoundMgr;
    public static get Ins(): SoundMgr {
        if (SoundMgr._instance == null) {
            SoundMgr._instance = new SoundMgr();
        }
        return SoundMgr._instance;
    }
}