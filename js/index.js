//An application that uses thunders on the canvas
const canvas = document.getElementById('thunder');
const ctx = canvas.getContext('2d');
var audio = new Audio('sounds/mixkit-cinematic-thunder-hit-1280.wav');
audio.volume = 1;
audio.loop = false;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const width = canvas.width;
const height = canvas.height;
var thunders = [];
var numThunders = 30;
class Thunder {
    constructor(finalPosition) {
        this.maxNumberOfPoints = 40;
        this.finalPosition = finalPosition;
        this.thunderPoints = [[finalPosition.x, -100]];
        while (this.thunderPoints[this.thunderPoints.length - 1][1] < finalPosition.y) {
            this.addPoint();
        }
        this.thunderPoints[this.thunderPoints.length - 1] = [finalPosition.x, finalPosition.y];
    }
    addPoint() {
        let [x, y] = this.thunderPoints[this.thunderPoints.length - 1];
        let x2 = x + Math.random() * 130 - 65;
        let y2 = y + Math.random() * 40 + 20;
        this.thunderPoints.push([x2, y2]);
    }
    drawLightning(lineWidth, color) {
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineWidth = lineWidth * (1.0 + Math.random() * 0.1 * (Math.random() > 0.5 ? 1 : -1));
        ctx.moveTo(this.thunderPoints[0][0], this.thunderPoints[0][1]);
        for (let i = 1; i < this.thunderPoints.length; i++) {
            ctx.lineTo(this.thunderPoints[i][0], this.thunderPoints[i][1]);
        }
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    lightEffect(maxIntensity, duration) {
        let time = 0.01;
        let timeGap = 50;
        let interval = setInterval(() => {
            ctx.clearRect(0, 0, width, height);
            let intensity = maxIntensity * Math.sin(time * Math.PI / duration);
            intensity = Math.abs(intensity);
            for (let i = 1; i < 10; i++) {
                this.drawLightning(intensity * i * i, `rgba(0,0 , ${125 + Math.random() * 125}, ${1 / i})`);
            }
            for (let i = 1; i < 10; i++) {
                this.drawLightning(intensity * i * i, `rgba(${125 + Math.random() * 125}, ${125 + Math.random() * 125}, ${125 + Math.random() * 125}, ${1 / i})`);
            }
            time += timeGap;
            console.log(time, timeGap);
            if (time >= duration) {
                clearInterval(interval);
                ctx.clearRect(0, 0, width, height);
            }
        }, timeGap);
    }
}
function thunderAnimation(position) {
    let thunder = new Thunder(position);
    setTimeout(() => {
        thunder.lightEffect(0.08, 250);
    }, 100);
    setTimeout(() => {
        thunder.lightEffect(20, 550);
    }, 350);
    setTimeout(() => {
        thunder.lightEffect(0.08, 750);
    }, 1200);
    setTimeout(() => {
        thunder.lightEffect(0.08, 750);
    }, 1400);
}
let mousePosition = {
    x: 0,
    y: 0
};
canvas.addEventListener('click', (e) => {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
    thunderAnimation(mousePosition);
    setTimeout(() => {
        audio.currentTime = 0;
        audio.play();
    }, 1000);
});
//# sourceMappingURL=index.js.map