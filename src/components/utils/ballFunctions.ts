const getGradientCords = (
    rotation: number,
    x: number,
    y: number,
    radius: number) => {
    let startX = 0, startY = 0, endX = 0, endY = 0;
    rotation = rotation % 360;
    if (rotation < 90) {
        if(rotation < 45){
            const xDiff = radius / 45 * (45 - rotation); 
            startX = x - xDiff;
            startY = y - radius;
            endX = x + xDiff;
            endY = y + radius;
        } else {
            const yDiff = radius / 45 * (45 - rotation);
            startX = x + radius;
            startY = y - yDiff;
            endX = x - radius;
            endY = y + yDiff;
        }
    } else if (rotation < 180) {
        const xDiff = radius / 45 * (180 - rotation);
        startX = x + xDiff;
        startY = y + radius;
        endX = x - xDiff
        endY = y - radius;
    } else if (rotation < 270) {

    } else if (rotation < 360) {

    }
    return { startX, startY, endX, endY }
}

const addBallStyles = (
    x: number,
    y: number,
    radius: number,
    rotation: number,
    ctx: any
) => {
    const { startX, startY, endX, endY } = getGradientCords(rotation, x, y, radius);

    var gradient = ctx.createLinearGradient(startX, startY, endX, endY);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.5, 'white');
    gradient.addColorStop(0.75, 'green');
    gradient.addColorStop(1, 'blue');
    ctx.strokeStyle = gradient;
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.stroke();
}