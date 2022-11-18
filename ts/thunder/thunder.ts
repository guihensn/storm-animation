export class Thunder {
    thunderPoints: number[][] = [];
    maxNumberOfPoints: number = 40;

    constructor( impactPosition){
        const firstPosition = [ impactPosition[0], -100];
        this.thunderPoints.push(firstPosition);

        while (this.isThunderFarFromImpact(impactPosition)) {
            this.addPoint();
        }
        
        this.thunderPoints.push(impactPosition);
    }

    private isThunderFarFromImpact(impactPosition: any) {
        let lastPosition = this.thunderPoints.slice(-1)[0];
        return lastPosition[1] < impactPosition[1];
    }

    private addPoint(){  
        let [x, y] = this.thunderPoints[this.thunderPoints.length - 1];
        let x2 = x + Math.random() * 130 - 65;
        let y2 = y + Math.random() * 40  + 20;

        this.thunderPoints.push([x2, y2]);
    } 
}