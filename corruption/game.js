const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gameStarted = false;

let player = {
    x: 100,
    y: 100,
    width: 30,
    height: 30,
    vx: 0,
    vy: 0,
    speed: 4,
    jump: -12,
    grounded: false
};

let gravity = 0.6;
let keys = {};

let platforms = [
    {x: 0, y: canvas.height - 40, width: canvas.width, height: 40},
    {x: 300, y: canvas.height - 150, width: 200, height: 20}
];

let exit = {x: canvas.width - 80, y: canvas.height - 80, size: 40};

document.addEventListener("keydown", e => {
    keys[e.key] = true;

    if (!gameStarted && e.key === "Enter") {
        gameStarted = true;
        document.getElementById("message").innerText = getMessage();
    }
});

document.addEventListener("keyup", e => {
    keys[e.key] = false;
});

function update() {

    if (!gameStarted) return;

    // Control corruption
    let left = keys["ArrowLeft"];
    let right = keys["ArrowRight"];

    if (Math.random() < getControlInversionChance()) {
        [left, right] = [right, left];
    }

    if (left) player.vx = -player.speed;
    else if (right) player.vx = player.speed;
    else player.vx = 0;

    if (keys[" "] && player.grounded) {
        player.vy = player.jump;
        player.grounded = false;
    }

    player.vy += gravity;
    player.x += player.vx;
    player.y += player.vy;

    player.grounded = false;

    platforms.forEach(p => {
        if (
            player.x < p.x + p.width &&
            player.x + player.width > p.x &&
            player.y < p.y + p.height &&
            player.y + player.height > p.y
        ) {
            player.y = p.y - player.height;
            player.vy = 0;
            player.grounded = true;
        }
    });

    // Fall reset
    if (player.y > canvas.height) {
        registerRestart();
        player.x = 100;
        player.y = 100;
    }

    // Exit
    if (
        player.x < exit.x + exit.size &&
        player.x + player.width > exit.x &&
        player.y < exit.y + exit.size &&
        player.y + player.height > exit.y
    ) {
        increaseCorruption(10);
        player.x = 100;
        player.y = 100;
    }

    document.getElementById("message").innerText = getMessage();
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background corruption flicker
    if (corruptionLevel > 60 && Math.random() < 0.05) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Platforms
    ctx.fillStyle = "white";
    platforms.forEach(p => {
        ctx.fillRect(p.x, p.y, p.width, p.height);
    });

    // Exit
    ctx.fillStyle = corruptionLevel > 70 ? "red" : "white";
    ctx.fillRect(exit.x, exit.y, exit.size, exit.size);

    // Player glitch
    if (Math.random() < getVisualGlitchChance()) {
        ctx.fillStyle = "red";
    } else {
        ctx.fillStyle = "white";
    }

    ctx.fillRect(player.x, player.y, player.width, player.height);

    applyVisualCorruption(ctx, canvas);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
