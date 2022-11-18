import { RainDropAnimator } from "./rainAnimator.js";
const canvas = document.getElementById('rain');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var audio = new Audio('sounds/mixkit-intense-rain-in-a-calm-night-1252.wav');
audio.volume = 0.2;
audio.loop = true;
let mousePosition = {
    x: 0,
    y: 0
};
window.addEventListener('mousemove', (e) => {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
});
window.addEventListener('click', () => {
    audio.play();
});
const rainDropAnimator = new RainDropAnimator(canvas, mousePosition);
rainDropAnimator.animate();
//# sourceMappingURL=rainEffect.js.map