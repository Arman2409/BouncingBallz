class Ball {
    x = 0;
    y = 0;
    dx = 0;
    dy = 0;
    radius = 5;
    bounceHeight = 0;
    fallHeight = 0;
    stopSteps = 0;
    stopStepsCount = 0;
    rotation = 0;
    colors: string[] = [];
    ctx;
    direction: "left" | "right" = "left";
    status: "bouncing" | "stopping" | "falling" | "stopped" = "falling";

    constructor(
        x: number,
        y: number,
        ballRadius: number,
        ctx: any,
    ) {
        if (ballRadius) this.radius = ballRadius;
        if (x) this.x = x;
        if (y) {
            if (y > innerHeight - ballRadius) this.y = innerHeight - ballRadius;
            else this.y = y
        };
        if (!ctx) {
            console.error("Canvas context not provided!")
        } else {
            this.ctx = ctx;
            this.fallHeight = ctx.canvas.height;
        };
        this.colors = getRandomColors(colorsPerBall);
        if (innerHeight - (this.y + this.radius) > 0) {
            this.fall();
        } else {
            this.status = "stopped";
        }
    }

    animate = () => {
        if (typeof this.ctx !== "object") {
            console.error("Canvas context not provided!")
            return;
        }
        const { y, dy, dx,
            radius, status, bounceHeight,
            fallHeight, ctx,
            draw, fall, stop, animate, bounce, handleStopping } = { ...this };
        requestAnimationFrame(animate);
        ctx.beginPath();
        // border limit handling
        // if ((this.x <= radius || this.x >= innerWidth - radius) && (this.status !=="falling")) {
        //     if(this.status === "stopping") {

        //     }Math.round(Math.random()) ? 1 : -1
        //     this.dx = 0;
        //     if(this.status === "bouncing") {
        //         this.dy = fallSpeed;
        //         this.status = "falling";
        //         this.fallHeight = innerHeight - this.y;
        //     }
        // }
        if (status === "stopped") {
            draw("circle");
            return;
        };
        if (status === "bouncing") {
            if (y <= innerHeight - bounceHeight) {
                fall()
            };
            draw("circle")
        } else if (y >= innerHeight - (radius / 1.5)
            && this.status !== "stopping") {
            bounce();
            if (fallHeight < stopHeight) {
                stop();
            } else {
                if (!bounceHeight) this.direction = Math.round(Math.random()) ? "left" : "right";
                this.dx = this.direction === "left" ? -5 : 5;
                this.bounceHeight = this.fallHeight / (Math.random() * 4 + 1);
            }
        } else if (y >= innerHeight - radius && status !== "stopping") {
            this.dy = 2;
            this.draw("ellipse", radius + radius / 4, radius / 2,)
        } else if (y >= innerHeight - (radius * 1.5) && this.status !== "stopping") {
            this.dy = 2;
            this.draw("ellipse", radius + radius / 6, radius / 1.5,)
            // ctx.ellipse(x, y, radius + radius / 6, radius / 1.5, 0, 0, Math.PI * 2);
            // addBallStyles(x, y, radius, rotation, colors, ctx);
            // ctx.restore();
        } else {
            if (status === "stopping") {
                handleStopping();
            }
            draw("circle")
        }
        if (dy || dx) this.rotation += 1;
        if (dy) this.y += dy;
        if (dx) this.x += dx;
    }

    private draw = (type: "circle" | "ellipse", ellipseX?: number, ellipseY?: number) => {
        const { x, y, radius, rotation, colors, ctx } = { ...this }
        if (type === "circle") {
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        }
        if (type === "ellipse") {
            ctx.ellipse(x, y, ellipseX, ellipseY, 0, 0, Math.PI * 2);
        }
        addBallStyles(x, y, radius, rotation, colors, ctx);
        ctx.restore();
    }

    private handleStopping = () => {
        const { stopSteps, stopStepsCount } = { ...this };
        if (stopStepsCount >= stopSteps) {
            this.dx = 0;
            this.status = "stopped";
        }
        else {
            this.dx = this.direction === "left" ? -1 : 1;
            this.rotation += 8;
        }
        this.stopStepsCount += 1;
        this.dy = 0;
    }

    fall = () => {
        const { y } = { ...this };
        this.dy = fallSpeed;
        this.dx = 0;
        this.status = "falling";
        this.fallHeight = innerHeight - y;
    }

    bounce = () => {
        this.dy = -10;
        this.status = "bouncing";
    }

    stop = () => {
        this.status = "stopping";
        this.stopSteps = 30 + Math.random() * 20;
    }
}
