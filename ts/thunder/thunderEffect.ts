import { Thunder } from "./thunder.js";
import { ThunderAnimator } from "./thunderAnimator.js";

var audio = new Audio('sounds/mixkit-cinematic-thunder-hit-1280.wav');
audio.volume = 1;
audio.loop = false;

let canvas = document.getElementById('thunder') as HTMLCanvasElement;

canvas.addEventListener('click', (e)=>{
    thunderEffect([e.clientX, e.clientY]);

    setTimeout(()=>{
        audio.currentTime = 0;
        audio.play();
    }, 1000);
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})


function thunderEffect(position){
    let thunder = new Thunder(position);
    let thunderAnimator = new ThunderAnimator(thunder, canvas);
    let thunderAnimationsSequence = [
        {maxIntensity: 0.08, duration: 250, delay: 100},
        {maxIntensity: 20, duration: 550, delay: 350},
        {maxIntensity: 0.08, duration: 550, delay: 1200}
    ];

    thunderAnimationsSequence.forEach((animation) => {
        setTimeout(() =>{
            thunderAnimator.animate(animation.maxIntensity, animation.duration);
        }, animation.delay);
    });
}