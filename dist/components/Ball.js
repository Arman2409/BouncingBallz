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
    side = false;
    colors = [];
    bounceHeight = 0;
    status = "falling";
    rollSteps = 0;
    rollStepsCount = 0;
    fallHeight = 0;
    stoppedGradient = {};
    ctx;
    constructor(x, y, ballRadius, ctx) {
        if (!ctx) {
            console.error("Canvas context not provided!");
        }
        else {
            this.ctx = ctx;
        }
        ;
        this.fallHeight = ctx.canvas.height;
        this.radius = ballRadius;
        this.x = x;
        this.y = y > innerHeight - ballRadius ? innerHeight - ballRadius : y;
        this.colors = getRandomColors(colorsPerBall);
        this.side = Math.round(Math.random()) ? "left" : "right";
        const { fall, stop } = { ...this };
        // checking if is above the ground 
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
        if (status === "rolling")
            handleRolling();
        if (status === "bouncing")
            handleBouncing();
        if (status === "falling")
            handleFalling();
        const { dx, dy } = { ...this };
        if (dy)
            this.y += dy;
        if (dx)
            this.x += dx;
    };
    isOnBorder = () => {
        const { x, radius } = { ...this };
        if (x <= radius)
            return "left";
        if (x >= innerWidth - radius)
            return "right";
        return false;
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
        const { side, rollSteps, rollStepsCount, radius, stop, draw, isOnBorder } = { ...this };
        if (rollStepsCount >= rollSteps) {
            stop();
            return;
        }
        const borderStatus = isOnBorder();
        if (borderStatus === "left")
            this.side = "right";
        if (borderStatus === "right")
            this.side = "left";
        this.dx = side === "left" ? -rollingSpeed : rollingSpeed;
        this.rotation += side === "left" ? -8 : 8;
        this.rollStepsCount += 1;
        this.dy = 0;
        draw("circle");
    };
    handleFalling = () => {
        const { y, radius, side, draw, bounce } = { ...this };
        if (y >= innerHeight - (radius / 2))
            bounce();
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
        this.rotation += side === "right" ? 1 : -1;
    };
    handleBouncing = () => {
        const { y, bounceHeight, draw, fall, isOnBorder } = { ...this };
        if (y <= innerHeight - bounceHeight || isOnBorder())
            fall();
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
        const { side, radius, fallHeight, isOnBorder, roll, draw } = { ...this };
        // checking if is near the border and if so than reversing
        const borderStatus = isOnBorder();
        if (borderStatus === "left") {
            this.side = "right";
        }
        if (borderStatus === "right") {
            this.side = "left";
        }
        if (fallHeight < stopHeightExtra + radius * 2) {
            roll();
            return;
        }
        this.dy = -bounceSpeed;
        const deviation = bounceDeviationRange[0] + Math.round(Math.random() * bounceDeviationRange[1]);
        this.dx = side === "left" ? -deviation : deviation;
        this.bounceHeight = fallHeight * bounceHeightRange[0] + Math.round(Math.random() * (fallHeight * (bounceHeightRange[1] - bounceHeightRange[0])));
        this.status = "bouncing";
        draw("circle");
    };
    roll = () => {
        const { radius, draw } = { ...this };
        this.status = "rolling";
        this.y = innerHeight - radius;
        this.dy = 0;
        this.rollSteps = 30 + Math.random() * 20;
        draw("circle");
    };
    stop = () => {
        const { x, y, radius, rotation, draw } = { ...this };
        this.dx = 0;
        this.dy = 0;
        this.status = "stopped";
        // generating cached gradient for stopped status 
        const currentGradient = getGradientCoordinates(x, y, rotation, radius);
        this.stoppedGradient = currentGradient;
        draw("circle", undefined, undefined, currentGradient);
    };
}
