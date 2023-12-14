const canvas:any = document.createElement("canvas");
document.body.appendChild(canvas);
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.addEventListener("click", (event: MouseEvent) => {
    const { clientX, clientY } = event;
    const newBall = new Ball(clientX, clientY, 25, context);
    newBall.animate();
})

function clear() {
    requestAnimationFrame(clear);
    context.clearRect(0, 0, innerWidth, innerHeight);
}
clear()