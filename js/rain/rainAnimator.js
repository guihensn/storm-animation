import { RainDrop } from "./rainDrop.js";
export class RainDropAnimator {
    constructor(canvas, mousePosition) {
        this.numRainDrops = 1000;
        this.rainDrops = [];
        this.finished = false;
        this.canvas = canvas;
        this.numRainDrops = this.canvas.width * this.canvas.height / 400;
        this.ctx = canvas.getContext('2d');
        this.mousePosition = mousePosition;
        this.initRainDrops();
    }
    initRainDrops() {
        for (let i = 0; i < this.numRainDrops; i++) {
            this.rainDrops.push(new RainDrop(this.canvas.width, this.canvas.height));
        }
    }
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.rainDrops.forEach(rainDrop => {
            this.draw(rainDrop);
            if (Math.sqrt(Math.pow(rainDrop.x - this.mousePosition.x, 2) + Math.pow(rainDrop.y + rainDrop.length - this.mousePosition.y, 2)) < 75) {
                this.drawCircle(rainDrop.x, rainDrop.y + rainDrop.length, 2);
                this.drawCircle(this.mousePosition.x, this.mousePosition.y, 75);
                rainDrop.y = -30;
            }
            rainDrop.update();
        });
        if (!this.finished) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }
    finish() {
        this.finished = true;
    }
    draw(rainDrop) {
        this.ctx.beginPath();
        this.ctx.moveTo(rainDrop.x, rainDrop.y);
        this.ctx.lineTo(rainDrop.x, rainDrop.y + rainDrop.length);
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.stroke();
    }
    drawCircle(x, y, radius) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.stroke();
    }
}
//# sourceMappingURL=rainAnimator.js.map