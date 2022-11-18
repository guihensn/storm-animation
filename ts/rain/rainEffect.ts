import { RainDropAnimator } from "./rainAnimator.js";

const canvas = document.getElementById('rain') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const audio = new Audio('sounds/mixkit-intense-rain-in-a-calm-night-1252.wav');
audio.volume = 0.2;
audio.loop = true;

let mousePosition = {
    x: 0,   
    y: 0
}

window.addEventListener('mousemove', (e)=>{
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
});

window.addEventListener('click', () => {
    audio.play();
})

let rainDropAnimator = new RainDropAnimator(canvas, mousePosition);
rainDropAnimator.animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    rainDropAnimator.finish();
    rainDropAnimator = new RainDropAnimator(canvas, mousePosition);
    rainDropAnimator.animate();
})





