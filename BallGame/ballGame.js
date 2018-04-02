
        let container = document.getElementById('container');
        let scoreContainer = document.getElementById('scoreCard');
        let startGameButton = document.getElementById('startGame');
        let height = container.offsetHeight;
        let width = container.offsetWidth;
        let ball = document.getElementById('ball');
        let ballRadius = 12.5;
        let paddleWidth = 100;
        let paddle = document.getElementById('paddle');
        let rightPressed = false;
        let leftPressed = false;
        let brickRowCount = 4;
        let brickColumnCount = 9;
        let bricks = [];
        let brickOffsetLeft = 30;
        let brickOffsetTop = 30;
        let brickHeight = 15;
        let brickWidth = 50;
        let brickPadding = 10;
        let score = 0;
        let timer;
        scoreContainer.innerText = score;



        let x ;
        let y ;
        let paddleX ;
        let paddleY;

        let dx = 2;
        let dy = 2;
        let dPaddlex = 2;
        let dPaddley = 2;

        function buildBricks() {
            for (let i = 0; i < brickColumnCount; i++) {
                bricks[i] = [];
                for (let j = 0; j < brickRowCount; j++) {
                    bricks[i][j] = {
                        x: 0,
                        y: 0,
                        status: 1,
                        id: "brick" + i + j
                    }
                }
            }
        }



        //event Listeners on document
        document.addEventListener("keyup", keyUpHandler, false);
        document.addEventListener("keydown", keyDownHandler, false);



        function moveBall() {
            if (x + dx > width - 2 * ballRadius || x + dx < 0) {
                dx = -dx;
            }

            if (y + dy < 0) {
                dy = -dy;
            } else if (y + dy > height - 25 - 2 * ballRadius) {
                if (x > paddleX - ballRadius && x < paddleX + paddleWidth) {
                    dy = -dy;
                } else {
                    alert("game over");
                    clearInterval(timer);
                    startGameButton.disabled= false;
                }
            }


            x += dx;
            y += dy;
            ball.style.left = "" + x + "px";
            ball.style.top = "" + y + "px";

        }

        function movePaddle() {
            if (leftPressed && paddleX > 0)
                paddleX -= dPaddlex;
            if (rightPressed && paddleX + paddleWidth < width)
                paddleX += dPaddlex;

            paddle.style.left = "" + paddleX + "px";
            paddle.style.top = "" + paddleY + "px";
        }

        function drawBricks() {

            for (let i = 0; i < brickColumnCount; i++) {
                for (let j = 0; j < brickRowCount; j++) {
                    if (bricks[i][j].status === 1) {
                        brickX = i * (brickWidth + brickPadding) + brickOffsetLeft;
                        brickY = j * (brickHeight + brickPadding) + brickOffsetTop;
                        bricks[i][j].x = brickX;
                        bricks[i][j].y = brickY;
                        createBrick(brickX, brickY, "" + i + j);
                    }
                }
            }
        }

        function destroyBrick(i, j) {
            document.getElementById("brick" + i + j).outerHTML = "";
        }

        function modifyBricks() {

            for (let i = 0; i < brickColumnCount; i++) {
                for (let j = 0; j < brickRowCount; j++) {
                    let b = bricks[i][j];
                    if (b.status === 1) {
                        // console.log(x > b.x && y > b.y && x < b.x + brickWidth && y < b.y + brickHeight);
                        if (x > b.x && y > b.y && x < b.x + brickWidth && y < b.y + brickHeight) {
                            // console.log("X="+x+" Y="+y);
                            dy = -dy;
                            b.status = 0;
                            destroyBrick(i, j);
                            score++;
                            modifySpeed();
                            scoreContainer.innerText = score;
                        }

                    }
                }
            }
        }

        function modifySpeed(){
            // console.log("Modifying Speed");
            if(dx>0) dx+=(score/100);
            else dx-=(score/100);
            if(dy>0) dy+=(score/100);
            else dy-=(score/100);
            dPaddlex+=(score/100);
            dPaddley+=(score/100);
            // console.log("DX="+dx+" DY="+dy);
        }

        function wholeGame() {
            moveBall();
            movePaddle();
            modifyBricks();
        }

        function createBrick(x, y, id) {
            ele = document.createElement('div');
            ele.style.left = "" + x + "px";
            ele.style.top = "" + y + "px";
            ele.id = "brick" + id;
            ele.style.position = "absolute";
            ele.style.height = brickHeight + "px";
            ele.style.width = brickWidth + "px";
            ele.style.backgroundColor = "black";
            container.appendChild(ele);

        }

        function keyUpHandler(event) {
            // console.log("Key UP");
            if (event.keyCode === 37)
                leftPressed = false;
            if (event.keyCode === 39)
                rightPressed = false;

        }

        function keyDownHandler(event) {
            // console.log("Key DOWN");
            if (event.keyCode === 37)
                leftPressed = true;
            if (event.keyCode === 39)
                rightPressed = true;
        }

        function startGame() {
            score = 0;
            x = width / 2;
            y = height - 50;
            paddleX = (height / 2) - 50;
            paddleY = (width - 25);
            leftPressed= false;
            rightPressed = false;
            buildBricks();
            drawBricks();
            startGameButton.disabled = true;
            timer = setInterval(wholeGame, 10);
        }

        startGame();
    




