declare interface Platform {
    getUserInfo(): Promise<any>;
    login(): Promise<any>;

    startLoading(_callback: any): Promise<any>;

    authenticLogin(_callback: any, _btnVect: any, _statusCallback: any): void;
    hideAuthenticLoginBtn(): void;
    createFeedbackButton(_btnVect: any): void;

    onShow(_callback: any): void;
    onHide(_callback: any): void;
    httpToken(_url: string, _callback: any, _forceNew: boolean): any;
    httpRequest(_url: string, _params: any, _noToken: boolean): any;

    onShare(_data: any): void;
    isSharing(): any;

    navigateToMiniProgram(_data: any): void;

    createBannerAd(_param): any;
    createRewardedVideoAd(_param): any;

    openCustomerService(_param): any;

    setUserCloudStorage(_kvDataList): Promise<any>;
    getOpenDataContext(): Promise<any>;
    postMessage(_data: any): void;

    //编码（名字表情）
    encode(_txt: string): string;
    //解码（名字表情）
    decode(_txt: string): string;
}
class DebugPlatform implements Platform {
    async getUserInfo() {
        return { nickName: "username" }
    }
    async login() {
    }

    async startLoading(_callback: any) {

    }

    authenticLogin(_callback: any, _btnVect: any, _statusCallback: any) {
        _callback && _callback(true)
    }
    hideAuthenticLoginBtn() { }
    createFeedbackButton(_btnVect: any) { }

    async onShow(_callback: any) { }
    async onHide(_callback: any) { }
    httpToken(_url: string, _callback: any, _forceNew: boolean = false) {
        // var token = "ebb90e41c7af14ce03ac4c19ff797f08"
        // _callback && _callback(token)
        // return token
    }
    httpRequest(_url: string, _params: any, _noToken: boolean = false) {
    }
    onShare(_data: any) { }
    isSharing(): any { }

    navigateToMiniProgram(_data: any) { }

    createBannerAd(_param) { }
    createRewardedVideoAd(_param) { }

    openCustomerService(_param) { }

    setUserCloudStorage(_kvDataList): any { }
    getOpenDataContext(): any { }
    postMessage(_data: any): void { }

    //编码（名字表情）
    encode(_txt: string): string {
        return _txt;
    }
    //解码（名字表情）
    decode(_txt: string): string {
        return _txt;
    }
}
if (!window.platform) {
    window.platform = new DebugPlatform();
}
declare let platform: Platform;
declare interface Window {
    platform: Platform
}
