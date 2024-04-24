function startGame() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const CANVASWIDTH = 800;
    const CANVASHEIGHT = 400;

    let lastKeyPressedPlayer1 = null;
    let lastKeyPressedPlayer2 = null;

    class Player {
        constructor() {
            this.x = CANVASWIDTH / 2;
            this.y = CANVASHEIGHT / 2;
            this.radius = 10;
            this.moveSpeed = 2;
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

    function collision(player, player2) {
        let isHit = false

        player.projectiles.forEach((proj) =>{
            if (proj.x >= player2.x - player2.radius && proj.x <= player2.x + player2.radius
                && proj.y >= player2.y - player2.radius && proj.y <= player2.y + player2.radius) {
                return true;
            } else {
                return false;
            }
        })

        return isHit

    }

    let player = new Player();
    let player2 = new Player();

    window.addEventListener("keydown", function(event) {
        //PLAYER1
        //STOPS PLAYER1 FROM GOING THE OPPOSITE DIRECTION
        // if ((event.key === "ArrowRight" && lastKeyPressedPlayer1 === "ArrowLeft") ||
        //     (event.key === "ArrowLeft" && lastKeyPressedPlayer1 === "ArrowRight") ||
        //     (event.key === "ArrowUp" && lastKeyPressedPlayer1 === "ArrowDown") ||
        //     (event.key === "ArrowDown" && lastKeyPressedPlayer1 === "ArrowUp")) {
        //     return;
        // }
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
        if (event.key === " ") {
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

        //PLAYER2
        //STOPS PLAYER2 FROM GOING THE OPPOSITE DIRECTION
        // if ((event.key === "d" && lastKeyPressedPlayer2 === "a") ||
        //     (event.key === "a" && lastKeyPressedPlayer2 === "d") ||
        //     (event.key === "w" && lastKeyPressedPlayer2 === "s") ||
        //     (event.key === "s" && lastKeyPressedPlayer2 === "w")) {
        //     return;
        // }
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
        if (event.key === "f") {
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
    
        if (collision(player, player2)) {
            console.log("hello");
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
}
startGame();