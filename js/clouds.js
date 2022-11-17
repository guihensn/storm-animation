//An application that create a clouds effect on the canvas
const canvasClouds = document.getElementById('clouds');
const ctxClouds = canvasClouds.getContext('2d');
canvasClouds.width = window.innerWidth;
canvasClouds.height = window.innerHeight;
const widthClouds = canvasClouds.width;
const heightClouds = canvasClouds.height;
const clouds = [];
class Cloud {
    constructor(x, y, radius, speedX) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
    }
    draw() {
        ctxClouds.beginPath();
        ctxClouds.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctxClouds.arc(this.x + 2 * this.radius, this.y, this.radius, 0, Math.PI * 2, false);
        ctxClouds.fillStyle = 'rgba(155, 155, 155, 1)';
        ctxClouds.fill();
        ctxClouds.closePath();
        ctxClouds.beginPath();
        ctxClouds.moveTo(this.x, this.y);
        ctxClouds.lineTo(this.x + this.radius * 2, this.y);
        ctxClouds.strokeStyle = 'rgba(155, 155, 155, 1)';
        ctxClouds.lineWidth = this.radius * 2;
        ctxClouds.stroke();
    }
    update() {
        this.draw();
        this.x += this.speedX;
    }
}
//smaller clouds on the bottom
function init() {
    for (let i = 0; i < 5; i++) {
        let x = Math.random() * widthClouds;
        let y = Math.random() * heightClouds;
        let radius = 100;
        let speedX = Math.random() * 2;
        clouds.push(new Cloud(x, y, radius, speedX));
    }
}
function animate() {
    requestAnimationFrame(animate);
    ctxClouds.clearRect(0, 0, widthClouds, heightClouds);
    for (let i = 0; i < clouds.length; i++) {
        clouds[i].update();
    }
}
init();
animate();
//# sourceMappingURL=clouds.js.map