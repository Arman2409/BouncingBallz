"use strict";
class Ball {
    x = 0;
    y = 0;
    // speed horizontally
    dx = 0;
    // speed vertically
    dy = 0;
    radius = 5;
    rotation = 0;
    // direction for bouncing or rolling 
    side = null;
    colors = [];
    bounceHeight = 0;
    fallHeight = 0;
    rollSteps = 0;
    rollStepsCount = 0;
    stoppedGradient = {};
    ctx;
    status = "falling";
    constructor(x, y, ballRadius, ctx) {
        if (ballRadius)
            this.radius = ballRadius;
        if (x)
            this.x = x;
        if (y) {
            if (y > innerHeight - ballRadius)
                this.y = innerHeight - ballRadius;
            else
                this.y = y;
        }
        ;
        if (!ctx) {
            console.error("Canvas context not provided!");
        }
        else {
            this.ctx = ctx;
            this.fallHeight = ctx.canvas.height;
        }
        ;
        this.colors = getRandomColors(colorsPerBall);
        const { fall, stop } = { ...this };
        if (innerHeight - (y + ballRadius) > 0) {
            fall();
        }
        else {
            stop();
        }
    }
    animate = () => {
        const { stoppedGradient, status, ctx, draw, animate, handleFalling, handleRolling, handleBouncing } = { ...this };
        if (typeof ctx !== "object") {
            console.error("Canvas context not provided!");
            return;
        }
        requestAnimationFrame(animate);
        ctx.beginPath();
        if (status === "stopped") {
            draw("circle", undefined, undefined, stoppedGradient);
            return;
        }
        ;
        if (status === "rolling") {
            handleRolling();
            draw("circle");
        }
        if (status === "bouncing") {
            handleBouncing();
        }
        if (status === "falling")
            handleFalling();
        const { dx, dy } = { ...this };
        if (dy || dx)
            this.rotation += 1;
        if (dy)
            this.y += dy;
        if (dx)
            this.x += dx;
    };
    draw = (type, ellipseX, ellipseY, gradient) => {
        const { x, y, radius, rotation, colors, ctx } = { ...this };
        if (type === "circle")
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        if (type === "ellipse")
            ctx.ellipse(x + radius / 2, y + radius / 2, ellipseX, ellipseY, 0, 0, Math.PI * 2);
        addBallStyles(x, y, radius, rotation, colors, ctx, gradient);
        ctx.restore();
    };
    handleRolling = () => {
        const { x, side, rollSteps, rollStepsCount, radius, stop } = { ...this };
        if (rollStepsCount >= rollSteps) {
            stop();
            return;
        }
        if (x <= radius || x >= innerWidth - radius) {
            this.side = this.side === "left" ? "right" : "left";
        }
        this.dx = side === "left" ? -1 : 1;
        this.rotation += side === "left" ? -8 : 8;
        this.rollStepsCount += 1;
        this.dy = 0;
    };
    handleFalling = () => {
        const { y, radius, side, fallHeight, draw, roll, bounce } = { ...this };
        if (y >= innerHeight - (radius / 2)) {
            if (!side)
                this.side = Math.round(Math.random()) ? "left" : "right";
            if (fallHeight < stopHeight) {
                this.y = innerHeight - radius;
                roll();
                return;
            }
            bounce();
        }
        else if (y >= innerHeight - (radius * 1.5)) {
            this.dy = 2;
            draw("ellipse", radius + radius / 6, radius / 1.5);
        }
        else if (y >= innerHeight - radius) {
            this.dy = 2;
            draw("ellipse", radius + radius / 4, radius / 2);
        }
        else
            draw("circle");
    };
    handleBouncing = () => {
        const { x, y, radius, bounceHeight, draw, fall } = { ...this };
        if (y <= innerHeight - bounceHeight) {
            fall();
        }
        ;
        if ((x <= radius || x >= innerWidth - radius)) {
            this.side = this.side === "left" ? "right" : "left";
            fall();
        }
        draw("circle");
    };
    fall = () => {
        const { y } = { ...this };
        this.dy = fallSpeed;
        this.dx = 0;
        this.status = "falling";
        this.fallHeight = innerHeight - y;
    };
    bounce = () => {
        const { side, fallHeight } = { ...this };
        this.dy = -bounceSpeed;
        const deviation = bounceDeviationRange[0] + Math.round(Math.random() * bounceDeviationRange[1]);
        this.dx = side === "left" ? -deviation : deviation;
        this.bounceHeight = fallHeight * bounceHeightRange[0] + Math.round(Math.random() * (fallHeight * (bounceHeightRange[1] - bounceHeightRange[0])));
        this.status = "bouncing";
    };
    roll = () => {
        this.status = "rolling";
        this.rollSteps = 30 + Math.random() * 20;
    };
    stop = () => {
        const { x, y, radius, rotation } = { ...this };
        this.dx = 0;
        this.dy = 0;
        this.status = "stopped";
        const currentGradient = getGradientCoordinates(x, y, rotation, radius);
        this.stoppedGradient = currentGradient;
    };
}
