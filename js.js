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
            this.moveSpeed = 3;
            this.dx = 0;
            this.dy = 0;
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
                alert("U DED");
            } else if (this.x - this.radius < 0) {
                this.x = this.radius;
                alert("U DED");
            } else if (this.y + this.radius > CANVASHEIGHT) {
                this.y = CANVASHEIGHT - this.radius;
                alert("U DED");
            } else if (this.y - this.radius < 0) {
                this.y = this.radius;
                alert("U DED");
            }
        }
    }

    document.addEventListener("keydown", function(event) {
        //PLAYER1
        //STOPS PLAYER1 FROM GOING THE OPPESITE DIRECTION
        if ((event.key === "ArrowRight" && lastKeyPressedPlayer1 === "ArrowLeft") ||
            (event.key === "ArrowLeft" && lastKeyPressedPlayer1 === "ArrowRight") ||
            (event.key === "ArrowUp" && lastKeyPressedPlayer1 === "ArrowDown") ||
            (event.key === "ArrowDown" && lastKeyPressedPlayer1 === "ArrowUp"  )) 
            {return;}
        //CONTROLLS FOR PLAYER1
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
        //PLAYER2
        //STOPS PLAYER2 FROM GOING THE OPPESITE DIRECTION
    if ((event.key === "d" && lastKeyPressedPlayer2 === "a") ||
        (event.key === "a" && lastKeyPressedPlayer2 === "d") ||
        (event.key === "w" && lastKeyPressedPlayer2 === "s") ||
        (event.key === "s" && lastKeyPressedPlayer2 === "w")) 
        {return;}
        //CONTROLLS FOR PLAYER2
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
    });

    let player = new Player();
    let player2 = new Player();

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
        player.updatePosition();
        player.draw();
        player2.updatePosition();
        player2.draw();
    }

    animate();
}

startGame();