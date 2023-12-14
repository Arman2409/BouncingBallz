"use strict";
const addBallStyles = (x, y, radius, ctx) => {
    var gradient = ctx.createLinearGradient(x - radius, y - radius, x + radius, y + radius);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.5, 'white');
    ctx.strokeStyle = gradient;
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.stroke();
};
