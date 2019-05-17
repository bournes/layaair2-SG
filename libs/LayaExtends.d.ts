declare module laya.display {
    interface Sprite {
        layer_tween:Laya.Tween;
        layer_origin_scale:Laya.Point;
    }

    interface Animation {
        url_loaded:boolean;
        path:Laya.Point[];
        pathLength:number;
        pathIndex:number;
    }
}