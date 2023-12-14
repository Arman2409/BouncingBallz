class Ball {
    x = 0;  
    y = 0;
    dx = 0;  
    dy = 15;
    radius = 5;
    bounceHeight = 0;
    fallHeight = 0;
    stopSteps = 0;
    stopStepsCount = 0;
    rotation = 0;
    ctx;
    status: "bouncing" | "stopping" | "falling" = "falling";


    constructor(
        x: number,
        y: number,
        ballRadius: number,
        ctx: any,
    ) {
        if (ballRadius) this.radius = ballRadius;
        if (x) this.x = x;
        if (y) this.y = y;
        if (!ctx) {
            console.error("Canvas context not provided!")
        } else {
            this.ctx = ctx;
            this.fallHeight = ctx.canvas.height;
        };
    }

    animate = () => {
        if (typeof this.ctx !== "object") {
            console.error("Canvas context not provided!")
            return;
        }
        const { x, y, radius } = { ...this };
        requestAnimationFrame(this.animate);
        this.ctx.beginPath();
        if (this.status === "bouncing") {
            if (this.y <= innerHeight - this.bounceHeight) {
                this.dy = 10 + Math.random() * 5;
                this.dx = 0;
                this.status = "falling";
                this.fallHeight = innerHeight - this.y;
            }
            this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        } else if (y >= innerHeight - (radius / 2.5) && this.status !== "stopping") {
            this.dy = -15;
            this.status = "bouncing";
            if (this.fallHeight < 200) {
                this.status = "stopping";
                this.stopSteps = Math.random() * 5;
            } else {
                this.dx = Math.random() * 5;
                this.bounceHeight = this.fallHeight / (Math.random() * 4 + 1);
            }
        } else if (y >= innerHeight - radius && this.status !== "stopping") {
            this.dy = 2;
            this.ctx.ellipse(x, y, radius + radius / 4, radius / 2, 0, 0, Math.PI * 2);
        } else if (y >= innerHeight - (radius * 1.5) && this.status !== "stopping") {
            this.dy = 2;
            this.ctx.ellipse(x, y, radius + radius / 6, radius / 1.5, 0, 0, Math.PI * 2);
        } else {
            if (this.status == "stopping") {
                this.stopStepsCount += 1;
                if (this.stopStepsCount >= this.stopSteps) {
                    this.dx = 0;
                }
                else {
                    this.dx = 5;
                }
                this.dy = 0;
            }
            this.ctx.arc(x, y, radius, 0, Math.PI * 2 + 1, false);
            this.rotation += 2;
        }
        addBallStyles(x, y, radius, this.rotation, this.ctx);
        if (this.dy) this.y += this.dy;
        if (this.dx) this.x += this.dx;
    }
}
