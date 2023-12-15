const getGradientCoordinates = (
    rotation: number,
    x: number,
    y: number,
    radius: number) => {
    let startX = 0, startY = 0, endX = 0, endY = 0;
    rotation = rotation % 360;
    if (rotation < 90) {
        if (rotation < 45) {
            const xDiff = radius / 45 * rotation;
            startX = x + xDiff;
            startY = y - radius;
            endX = x - xDiff;
            endY = y + radius;
        } else {
            const yDiff = radius / 45 * (rotation - 45);
            startX = x + radius;
            startY = y - radius + yDiff;
            endX = x - radius;
            endY = y + radius - yDiff;
        }
    } else if (rotation < 180) {
        if (rotation < 135) {
            const yDiff = radius / 45 * (rotation - 90);
            startX = x + radius;
            startY = y + yDiff;
            endX = x - radius
            endY = y - yDiff;
        } else {
            const xDiff = radius / 45 * (rotation - 135);
            startX = x + radius - xDiff;
            startY = y + radius;
            endX = x - radius + xDiff;
            endY = y - radius;
        }
    } else if (rotation < 270) {
        if (rotation < 235) {
            const xDiff = radius / 45 * (rotation - 180);
            startX = x - xDiff;
            startY = y + radius;
            endX = x + xDiff;
            endY = y - radius;
        } else {
            const yDiff = radius / 45 * (rotation - 235);
            startX = x - radius;
            startY = y + radius - yDiff;
            endX = x + radius;
            endY = y - radius + yDiff;
        }
    } else if (rotation < 360) {
        if (rotation < 315) {
            const yDiff = radius / 45 * (rotation - 270);
            startX = x - radius;
            startY = y - yDiff;
            endX = x + radius;
            endY = y + yDiff;
        } else {
            const xDiff = radius / 45 * (rotation - 315);
            startX = x - radius + xDiff;
            startY = y - radius;
            endX = x + radius - xDiff;
            endY = y + radius;
        }
    }
    return { startX, startY, endX, endY }
}

const addBallStyles = (
    x: number,
    y: number,
    radius: number,
    rotation: number,
    colors: string[],
    ctx: any
) => {
    const { startX, startY, endX, endY } = getGradientCoordinates(rotation, x, y, radius);

    var gradient = ctx.createLinearGradient(startX, startY, endX, endY);
    for (let i = 0; i < colorsPerBall; i++) {
        gradient.addColorStop(i * 1/(colorsPerBall - 1), colors[i]);
    }
    ctx.strokeStyle = gradient;
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.stroke();
}

const getRandomColors = (quantity: number): string[] => {
    const randomColors = [];
    for (let i = 0; i < quantity; i++) {
        randomColors.push(colors[Math.floor(Math.random() * colors.length)])
    }
    return randomColors;
}