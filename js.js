const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const CANVASWIDTH = 800;
const CANVASHEIGHT = 400;

let lastKeyPressedPlayer1 = null;
let lastKeyPressedPlayer2 = null;

const explosionImg = new Image();
explosionImg.src = 'Explotion transparent gif.gif';

class Player {
    constructor() {
        this.x = CANVASWIDTH - 100;
        this.y = CANVASHEIGHT / 2;
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
        } else if (this.y + this.radius > CANVASHEIGHT) {
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
            // console.log("Player1 Hit!");
            
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
    for (let i = 0; i < player2.projectiles.length; i++) {
        let proj = player2.projectiles[i];
        if (
            proj.x + proj.radius >= player.x - player.radius &&
            proj.x - proj.radius <= player.x + player.radius &&
            proj.y + proj.radius >= player.y - player.radius &&
            proj.y - proj.radius <= player.y + player.radius
        ) {
            // console.log("Player2 Hit!");
            player2.projectiles.splice(i, 1);
            player.health -= 10;
            var playerhealth = document.getElementById("healthplayer1");
            playerhealth.textContent = player.health;
            return true;
        }
    }
    return false;
}
let player = new Player();
let player2 = new Player();
player2.x = 50

window.addEventListener("keydown", function(event) {
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
        var dx, dy;
        if (lastKeyPressedPlayer1 == "ArrowRight"){
            dx = 6;
            dy = 0;
        }
        else if(lastKeyPressedPlayer1 == "ArrowLeft"){
            dx = -6;
            dy = 0;
        }
        else if(lastKeyPressedPlayer1 == "ArrowUp"){
            dx = 0;
            dy = -6;
        }
        else if(lastKeyPressedPlayer1 == "ArrowDown"){
            dx = 0;
            dy = 6;
        }
        let NewProjectile = new Projectile(player.x,player.y,5,dx,dy)
        player.projectiles.push(NewProjectile)
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
        var dx, dy;
        if (lastKeyPressedPlayer2 == "d"){
            dx = 6;
            dy = 0;
        }
        else if(lastKeyPressedPlayer2 == "a"){
            dx = -6;
            dy = 0;
        }
        else if(lastKeyPressedPlayer2 == "w"){
            dx = 0;
            dy = -6;
        }
        else if(lastKeyPressedPlayer2 == "s"){
            dx = 0;
            dy = 6;
        }
        
        let newProjectile = new Projectile(player2.x, player2.y, 5, dx, dy);
        player2.projectiles.push(newProjectile);
    }
});

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);


    collisionplayer2(player,player2) 
    collisionplayer(player,player2) 
        // Check player 1 health
    if (player.health <= 0) {
    ctx.drawImage(explosionImg, player.x - player.radius, player.y - player.radius);
    }
    console.log(player2.x)

    // Check player 2 health
    if (player2.health <= 0) {
        ctx.drawImage(explosionImg, player2.x - player2.radius, player2.y - player2.radius);
        // console.log(player2)
    }
    
    if (player2.attacking) {
        player2.projectiles.forEach((proj) => {
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, proj.radius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.fill();
    
            proj.x += proj.dx;
            proj.y += proj.dy;
        });
    }
    
    if (player.attacking) {
        player.projectiles.forEach((proj) => {
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, proj.radius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.fill();
    
            proj.x += proj.dx;
            proj.y += proj.dy;
        });
    }

    player.updatePosition();
    player.draw();
    player2.updatePosition();
    player2.draw();
}

animate();
