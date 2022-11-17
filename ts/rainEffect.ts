//An application that create a rain effect on the canvas
//Make rain drop desapear when collide with a circle suround the mouse
const canvasRain = document.getElementById('rain') as HTMLCanvasElement;
const ctxRain = canvasRain.getContext('2d') as CanvasRenderingContext2D;
var audio = new Audio('sounds/mixkit-intense-rain-in-a-calm-night-1252.wav');
audio.volume = 0.2;
audio.loop = true;
canvasRain.width = window.innerWidth;
canvasRain.height = window.innerHeight;

const widthRain = canvasRain.width;
const heightRain = canvasRain.height;

const rainDrops: RainDrop[] = [];
const numRainDrops = 1000;

let mousePosition = {
    x: 0,   
    y: 0
}

window.addEventListener('mousemove', (e) => {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
    drawCircle(e.clientX, e.clientY, 100);
})

window.addEventListener('click', () => {
    audio.play();
})

let wind = 20;
class RainDrop {
    x: number;
    y: number;
    length: number;
    speed: number;
    constructor(){
        this.x = Math.random() * widthRain;
        this.y = Math.random() * heightRain;
        this.speed = 1 + Math.random() * 20 ;
        this.length = 10 + Math.random() * 10  ;
    }

    draw(){
        ctxRain.beginPath();
        ctxRain.moveTo(this.x, this.y);
        ctxRain.lineTo(this.x, this.y + this.length);
        ctxRain.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctxRain.stroke();
    }

    update(){
        this.y += this.speed;
        if(this.y > heightRain){
            this.y = 0;
        }
    }
}

function init(){
    for(let i = 0; i < numRainDrops; i++){
        rainDrops.push(new RainDrop());
    }
}

function animate(){
    ctxRain.clearRect(0, 0, widthRain, heightRain);
    rainDrops.forEach(rainDrop => {
        rainDrop.draw();
        //Delete if rain drop distance from mouse center is less than 100
        if(Math.sqrt(Math.pow(rainDrop.x - mousePosition.x, 2) + Math.pow(rainDrop.y + rainDrop.length  - mousePosition.y , 2)) < 75){
            drawCircle(rainDrop.x, rainDrop.y + rainDrop.length , 2);
            drawCircle(mousePosition.x, mousePosition.y, 75);
            rainDrop.y = -30;
          
        }
        rainDrop.update();
    });
    requestAnimationFrame(animate);
}

//Draw temporary circle where the rain drop will be deleted
function drawCircle(x, y, radius){
    ctxRain.beginPath();
    ctxRain.arc(x, y, radius, 0, Math.PI * 2, false);
    ctxRain.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctxRain.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctxRain.stroke();
}
init();

animate();



