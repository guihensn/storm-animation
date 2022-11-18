import { Thunder } from "./thunder";

export class ThunderAnimator{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    thunderPoints: number[][];
    
    constructor(thunder: Thunder, canvas: HTMLCanvasElement){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.thunderPoints = thunder.thunderPoints;
    }

    animate(maxIntensity, duration){
        let time = 0.01;
        let timeGap = 50;
    
        let interval = setInterval(() =>{
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            let intensity = Math.abs(maxIntensity * Math.sin( time * Math.PI/ duration));

            this.draw(intensity);

            time += timeGap;
            if(time >= duration){
                clearInterval(interval);
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            } 
        }, timeGap);
    }

    private draw(intensity: number) {
        this.drawColoring(intensity);
        this.drawShadesOfGray(intensity);
    }

    private drawShadesOfGray(intensity: number) {
        for (let i = 1; i < 10; i++) {
            this.drawSimplePath(
                intensity * i * i,
                `rgba(
                ${125 + Math.random() * 125},
                ${125 + Math.random() * 125}, 
                ${125 + Math.random() * 125}, 
                ${1 / i})
            `);
        }
    }

    private drawColoring(intensity: number) {
        for (let i = 1; i < 10; i++) {
            this.drawSimplePath(
                intensity * i * i,
                `rgba(0, 0, ${125 + Math.random() * 125}, ${1 / i})`
            );
        }
    }

    private drawSimplePath(lineWidth: number, color: string){
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth ;

        this.ctx.beginPath();
        this.ctx.moveTo(this.thunderPoints[0][0], this.thunderPoints[0][1]);
        
        for(let thunderPoint of this.thunderPoints){
            this.ctx.lineTo(thunderPoint[0], thunderPoint[1]);
        }
        
        this.ctx.stroke();
    }
}
     






