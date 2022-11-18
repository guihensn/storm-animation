export class RainDrop {
    constructor(canvasWidth, canvasHeight) {
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.speed = 1 + Math.random() * 20;
        this.length = 10 + Math.random() * 10;
    }
    update() {
        this.y += this.speed;
        if (this.y > this.canvasHeight) {
            this.y = 0;
        }
    }
}
//# sourceMappingURL=rainDrop.js.map