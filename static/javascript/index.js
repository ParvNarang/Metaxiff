var canvas = document.createElement("canvas");
const b =document.getElementsByClassName("matrix"); 
b[0].appendChild(canvas)

var ctx = canvas.getContext("2d");

var fontSize = 13;
var chars =
    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ0123456789";

function setup() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = canvas.width / fontSize;
    drops = [];
    for (x = 0; x < cols; x++) {
        drops[x] = (Math.random() * canvas.height) / fontSize;
    }
    ctx.font = "2rem monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
}

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#005e2c";
    ctx.font = fontSize + "px monospace";
    for (var i = 0; i < drops.length; i++) {
        var text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (
            drops[i] * fontSize > canvas.height - 200 * Math.random() &&
            Math.random() > 0.975
        ) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setup();
setInterval(draw, 33);

window.onresize = function () {
    setup();
};

const letters = "ABCDEFGHIJKHLMNOPQRSTUVWXYZ";

let interval = null;

document.getElementById("head-txt").onmouseover = event => {
    clearInterval(interval);
    let iter = 0;
    interval = setInterval(() => {
        event.target.innerHTML = event.target.innerText
        .split("")
        .map((letter,index) => {

            if(index < iter) {
                return event.target.dataset.value[index];
            }

            return letters[Math.floor(Math.random() * 26)]
        })
        .join("");

        if (iter >= event.target.dataset.value.length){
            clearInterval(interval);
        }
        iter += 1/3

    } , 30);
}