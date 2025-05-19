class GradientAnimation{
    constructor() {
        this.cnv = document.getElementById("gradient__animation");
        
        this.ctx = this.cnv.getContext('2d');

        this.circlesNum = 20;
        this.speed = 0.005;
        this.minRadius = 200;
        this.maxRadius = 400;

        this.setCanvasSize();
        this.createCircle();
        this.drawAnimation();

        window.onresize = () => {
            this.setCanvasSize();
            this.createCircle();
        }
    }
    setCanvasSize() {
        this.w = this.cnv.width = window.innerWidth;
        this.h = this.cnv.height = 400;
    }
    createCircle() {
        this.circles = [];
        for (let i = 0; i < this.circlesNum; ++i) {
            this.circles.push(new Circle(this.w, this.h, this.minRadius, this.maxRadius));
        }
    }
    drawCircles() {
        this.circles.forEach(circle => circle.draw(this.ctx, this.speed));
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.w, this.h);
    }
    drawAnimation() {
        this.clearCanvas();
        this.drawCircles();
        window.requestAnimationFrame(() => this.drawAnimation());
    }
}

class Circle{
    constructor(w, h, minR, maxR) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.angle = Math.random() * 200 * Math.PI;
        this.radius = Math.random() * (maxR - minR) + minR;

        this.firstColor = `hsla(${Math.random() * 50 + 250}, ${Math.random()*50 + 50}%, 60%, 1)`;
        this.secondColor = `hsla(${Math.random() * 100 + 200}, ${Math.random()*50 + 50}%, 60%, 0.01)`;
    }
    draw(ctx, speed) {
        this.angle += speed;
        const x = this.x + Math.cos(this.angle) * 200;
        const y = this.y + Math.sin(this.angle) * 200;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);
        gradient.addColorStop(0, this.firstColor);
        gradient.addColorStop(1, this.secondColor);

        ctx.globalCompositeOperation = 'overlay';
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, 2 * Math.PI)
        ctx.fill();
    }
}


document.addEventListener("DOMContentLoaded", () => {
    new GradientAnimation();
});

