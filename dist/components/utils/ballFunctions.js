"use strict";
const getGradientCoordinates = (x, y, angle, radius) => {
    // converting the angle into positive value 
    const rotation = angle < 0 ? 360 - Math.abs(angle % 360) : angle % 360;
    const diff = radius / 45 * (rotation - (Math.floor(rotation / 45) * 45));
    if (rotation < 45)
        return {
            startX: x + diff,
            startY: y - radius,
            endX: x - diff,
            endY: y + radius,
        };
    else if (rotation < 90)
        return {
            startX: x + radius,
            startY: y - radius + diff,
            endX: x - radius,
            endY: y + radius - diff,
        };
    else if (rotation < 135)
        return {
            startX: x + radius,
            startY: y + diff,
            endX: x - radius,
            endY: y - diff,
        };
    else if (rotation < 180)
        return {
            startX: x + radius - diff,
            startY: y + radius,
            endX: x - radius + diff,
            endY: y - radius,
        };
    else if (rotation < 235)
        return {
            startX: x - diff,
            startY: y + radius,
            endX: x + diff,
            endY: y - radius,
        };
    else if (rotation < 270)
        return {
            startX: x - radius,
            startY: y + radius - diff,
            endX: x + radius,
            endY: y - radius + diff,
        };
    else if (rotation < 315)
        return {
            startX: x - radius,
            startY: y - diff,
            endX: x + radius,
            endY: y + diff,
        };
    // runs if rotation < 360
    return {
        startX: x - radius + diff,
        startY: y - radius,
        endX: x + radius - diff,
        endY: y + radius,
    };
};
const addBallStyles = (x, y, radius, rotation, colors, ctx, defaultGradient) => {
    const { startX, startY, endX, endY } = defaultGradient ? { ...defaultGradient }
        : getGradientCoordinates(x, y, rotation, radius);
    var gradient = ctx.createLinearGradient(startX, startY, endX, endY);
    for (let i = 0; i < colorsPerBall; i++) {
        gradient.addColorStop(i * 1 / (colorsPerBall - 1), colors[i]);
    }
    ctx.strokeStyle = gradient;
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.stroke();
};
const getRandomColors = (quantity) => {
    const randomColors = [];
    for (let i = 0; i < quantity; i++) {
        randomColors.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return randomColors;
};
