export default class PathUtil {
    public static CreateBezierPoints(
        anchorpoints: Laya.Point[],
        pointsAmount: number = 120
    ): Laya.Point[] {
        const points = [];
        for (let i = 0; i < pointsAmount; i++) {
            const point = this.MultiPointBezier(anchorpoints, i / pointsAmount);
            points.push(point);
        }
        return points;
    }

    private static MultiPointBezier(points, t): Laya.Point {
        const len: number = points.length;
        let x: number = 0;
        let y: number = 0;
        for (let i: number = 0; i < len; i++) {
            const point: any = points[i];
            x +=
                point.x *
                Math.pow(1 - t, len - 1 - i) *
                Math.pow(t, i) *
                this.erxiangshi(len - 1, i);
            y +=
                point.y *
                Math.pow(1 - t, len - 1 - i) *
                Math.pow(t, i) *
                this.erxiangshi(len - 1, i);
        }
        return new Laya.Point(x, y);
    }

    private static erxiangshi(start: number, end: number): number {
        let cs: number = 1;
        let bcs: number = 1;
        while (end > 0) {
            cs *= start;
            bcs *= end;
            start--;
            end--;
        }
        return cs / bcs;
    }
}