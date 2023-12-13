"use strict";
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.addEventListener("click", (event) => {
    const { clientX, clientY } = event;
    const newBall = new Ball(clientX, clientY, 25, c, "/assets/ball.png");
    newBall.animate();
});
var x = Math.random() * innerWidth;
var y = Math.random() * innerHeight;
var dx = (Math.random() - 0.5) * 8;
var dy = (Math.random() - 0.5) * 8;
var radius = 30;
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, false);
    c.strokeStyle = 2;
    c.stroke();
    x += dx;
    y += dx;
}
animate();
