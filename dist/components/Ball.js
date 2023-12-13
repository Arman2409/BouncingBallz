"use strict";
class Ball {
    constructor(x, y, ballRadius, ctx, backgroundSrc) {
        this.id = 0;
        this.y = 0;
        this.x = 0;
        this.fallHeight = 0;
        this.radius = 5;
        this.dy = 15;
        this.dx = 0;
        this.isBouncing = false;
        this.isStoping = false;
        this.bounceHeight = 0;
        this.stopSteps = 0;
        this.stopStepsCount = 0;
        this.src = "";
        this.animate = () => {
            const { x, y, radius } = Object.assign({}, this);
            requestAnimationFrame(this.animate);
            c.beginPath();
            if (this.isBouncing && !this.isStoping) {
                if (this.y <= innerHeight - this.bounceHeight) {
                    this.dy = 15;
                    this.isBouncing = false;
                    this.fallHeight = innerHeight - this.y;
                }
                c.arc(x, y, radius, 0, Math.PI * 2, false);
            }
            else if (y >= innerHeight - (radius / 2) && !this.isStoping) {
                this.dy = -15;
                this.isBouncing = true;
                if (this.fallHeight < 200) {
                    this.isStoping = true;
                    this.stopSteps = Math.random() * 50;
                }
                else {
                    this.dx = Math.random() * 5;
                    this.bounceHeight = this.fallHeight / (Math.random() * 4 + 1);
                }
            }
            else if (y >= innerHeight - radius && !this.isStoping) {
                this.dy = 2;
                c.ellipse(x, y, radius, radius / 2, 0, 0, Math.PI * 2);
            }
            else if (y >= innerHeight - (radius * 2) && !this.isStoping) {
                this.dy = 2;
                c.ellipse(x, y, radius, radius / 1.5, 0, 0, Math.PI * 2);
            }
            else {
                if (this.isStoping) {
                    this.stopStepsCount += 1;
                    if (this.stopSteps >= this.stopSteps) {
                        this.isStoping = false;
                        this.dx = 0;
                    }
                    else {
                        this.dx = 5;
                    }
                    this.dy = 0;
                }
                c.arc(x, y, radius, 0, Math.PI * 2 + 1, false);
            }
            const backgroundImage = new Image();
            backgroundImage.src = this.src;
            backgroundImage.onload = () => {
                console.log("loaded", backgroundImage);
                var pattern = this.context.createPattern(backgroundImage, "repeat");
                c.fillStyle = pattern;
                c.fill();
            };
            c.strokeStyle = 2;
            c.stroke();
            if (this.dy)
                this.y += this.dy;
            if (this.dx)
                this.x += this.dx;
        };
        if (ballRadius)
            this.radius = ballRadius;
        if (x)
            this.x = x;
        if (y)
            this.y = y;
        if (!ctx)
            console.error("Canvas context not provided!");
        this.src = backgroundSrc;
        this.context = ctx;
        this.fallHeight = ctx.canvas.height;
    }
}
