const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const CANVASWIDTH = 800;
const CANVASHEIGHT = 400;

let lastKeyPressedPlayer1 = null;
let lastKeyPressedPlayer2 = null;

const explosionImg = new Image();
explosionImg.src = '../Pictures/Explotion transparent gif.gif';
let gameOver = false;

let explosionImgWidth = 0;
let explosionImgHeight = 0;
explosionImg.onload = function () {
    explosionImgWidth = explosionImg.width;
    explosionImgHeight = explosionImg.height;
};

class Player {
    constructor() {
        this.x = CANVASWIDTH;
        this.y = CANVASHEIGHT;
        this.radius = 10;
        this.moveSpeed = 4;
        this.dx = 0;
        this.dy = 0;
        this.health = 100;
        this.attacking = false;
        this.projectiles = [];
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.fill();
    }

    updatePosition() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x + this.radius > CANVASWIDTH) {
            this.x = CANVASWIDTH - this.radius;
        } else if (this.x - this.radius < 0) {
            this.x = this.radius;
        }
        if (this.y + this.radius > CANVASHEIGHT) {
            this.y = CANVASHEIGHT - this.radius;
        } else if (this.y - this.radius < 0) {
            this.y = this.radius;
        }
    }
}

class Projectile {
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
    }

    isOutOfBounds() {
        return (
            this.x + this.radius < 0 ||
            this.x - this.radius > CANVASWIDTH ||
            this.y + this.radius < 0 ||
            this.y - this.radius > CANVASHEIGHT
        );
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.fill();
    }
}

function collisionplayer2(player, player2) {
    for (let i = 0; i < player.projectiles.length; i++) {
        let proj = player.projectiles[i];
        if (
            proj.x + proj.radius >= player2.x - player2.radius &&
            proj.x - proj.radius <= player2.x + player2.radius &&
            proj.y + proj.radius >= player2.y - player2.radius &&
            proj.y - proj.radius <= player2.y + player2.radius
        ) {
            player2.health -= 10;
            player.projectiles.splice(i, 1);
            var player2health = document.getElementById("healthplayer2");
            player2health.textContent = player2.health;
            return true;
        }
    }
    return false;
}

function collisionplayer(player, player2) {
    var playerhealth = document.getElementById("healthplayer1");
    for (let i = 0; i < player2.projectiles.length; i++) {
        let proj = player2.projectiles[i];
        if (
            proj.x + proj.radius >= player.x - player.radius &&
            proj.x - proj.radius <= player.x + player.radius &&
            proj.y + proj.radius >= player.y - player.radius &&
            proj.y - proj.radius <= player.y + player.radius
        ) {
            player2.projectiles.splice(i, 1);
            player.health -= 10;
            playerhealth.textContent = player.health;
            return true;
        }
    }
    return false;
}

window.addEventListener("keydown", function (event) {
    if (gameOver) return;

    //CONTROLS FOR PLAYER1
    if (event.key === "ArrowRight") {
        player.dx = player.moveSpeed;
        player.dy = 0;
        lastKeyPressedPlayer1 = "ArrowRight";
    } else if (event.key === "ArrowLeft") {
        player.dx = -player.moveSpeed;
        player.dy = 0;
        lastKeyPressedPlayer1 = "ArrowLeft";
    } else if (event.key === "ArrowDown") {
        player.dy = player.moveSpeed;
        player.dx = 0;
        lastKeyPressedPlayer1 = "ArrowDown";
    } else if (event.key === "ArrowUp") {
        player.dy = -player.moveSpeed;
        player.dx = 0;
        lastKeyPressedPlayer1 = "ArrowUp";
    }

    // Projectile player 1
    if (event.key === ".") {
        player.attacking = true;
        var dx = 0, dy = 0;
        if (lastKeyPressedPlayer1 === "ArrowRight") {
            dx = 6;
        } else if (lastKeyPressedPlayer1 === "ArrowLeft") {
            dx = -6;
        } else if (lastKeyPressedPlayer1 === "ArrowUp") {
            dy = -6;
        } else if (lastKeyPressedPlayer1 === "ArrowDown") {
            dy = 6;
        }
        let newProjectile = new Projectile(player.x, player.y, 5, dx, dy);
        player.projectiles.push(newProjectile);
    }

    //CONTROLS FOR PLAYER2
    if (event.key === "d") {
        player2.dx = player2.moveSpeed;
        player2.dy = 0;
        lastKeyPressedPlayer2 = "d";
    } else if (event.key === "a") {
        player2.dx = -player2.moveSpeed;
        player2.dy = 0;
        lastKeyPressedPlayer2 = "a";
    } else if (event.key === "s") {
        player2.dy = player2.moveSpeed;
        player2.dx = 0;
        lastKeyPressedPlayer2 = "s";
    } else if (event.key === "w") {
        player2.dy = -player2.moveSpeed;
        player2.dx = 0;
        lastKeyPressedPlayer2 = "w";
    }

    // Projectile player 2
    if (event.key === " ") {
        player2.attacking = true;
        var dx = 0, dy = 0;
        if (lastKeyPressedPlayer2 === "d") {
            dx = 6;
        } else if (lastKeyPressedPlayer2 === "a") {
            dx = -6;
        } else if (lastKeyPressedPlayer2 === "w") {
            dy = -6;
        } else if (lastKeyPressedPlayer2 === "s") {
            dy = 6;
        }

        let newProjectile = new Projectile(player2.x, player2.y, 5, dx, dy);
        player2.projectiles.push(newProjectile);
    }
});

function animate() {
    if (gameOver) {
        return;
    }
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);

    collisionplayer2(player, player2);
    collisionplayer(player, player2);
    const winner = document.getElementById("winner");
    var audio = new Audio('femur-pipe-falling-the-absurd.mp3');
    if (player.health <= 0) {
        winner.textContent = "PLAYER 2 WINS";
        ctx.drawImage(explosionImg, player.x - explosionImgWidth / 2, player.y - explosionImgHeight / 2 - 50);
        audio.play();
        gameOver = true;
    }

    if (player2.health <= 0) {
        winner.textContent = "PLAYER 1 WINS";
        ctx.drawImage(explosionImg, player2.x - explosionImgWidth / 2, player2.y - explosionImgHeight / 2 - 50);
        audio.play();
        gameOver = true;
    }

    if (player2.attacking) {
        player2.projectiles = player2.projectiles.filter((proj) => {
            proj.update();
            if (!proj.isOutOfBounds()) {
                proj.draw();
                return true;
            }
            console.log("Out of bounce")
            return false;
        });
    }

    if (player.attacking) {
        player.projectiles = player.projectiles.filter((proj) => {
            proj.update();
            if (!proj.isOutOfBounds()) {
                proj.draw();
                return true;
            }
            return false;
        });
    }

    player.updatePosition();
    player.draw();
    player2.updatePosition();
    player2.draw();
}

let player = new Player();
let player2 = new Player();
player2.x = 0;
player2.y = 0;

animate();


// Menu and settings - html
function showSettings() {
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('settings').classList.remove('hidden');
}

function goBackSettings() {
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('settings').classList.add('hidden');
}

function goBackGame() {
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('main').classList.add('hidden');
}
 
function showGame() {
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('main').classList.remove('hidden');
}   

document.addEventListener("DOMContentLoaded", function () {
    let backgroundColor = document.getElementById("backgroundcolor");
    console.log(backgroundColor);
});

