let leftPressed = true;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
let gameArray = [];
let eggX ;
let eggY ;
let timer;
let score = 0;
let wrapToggle = document.getElementById('wrapToggle').checked;


let snakeX = [];
let snakeY = [];

function cleanBoard(){
    for(let i=0;i<75;i++){
        gameArray[i] = [];
        for(let j=0;j<75;j++){
            gameArray[i][j]=0;
        }
    }
}


function createBoard(){
    let table = document.getElementById('snakeBoard');
    table.innerHTML="";
    for(i=0;i<75;i++){
        let ele = document.createElement('tr');
        ele.id="row_"+i;
        table.appendChild(ele);
        for(j=0;j<75;j++){
            let column = document.createElement('td');
            column.id="cell_"+i+j;
            column.classList.add("cellClass");
            ele.appendChild(column);
        }
    }
}


document.addEventListener('keydown', keydownHandler, false);
// document.addEventListener('keyup', keyupHandler,false);

function keydownHandler(event){

        if(event.keyCode === 37 && !rightPressed){
            console.log("left Hnadler");
            leftPressed = true;
            upPressed = false;
            downPressed = false;
            rightPressed =false;
        }
    
        if(event.keyCode === 38 && !downPressed){
            console.log("up Hnadler");
            leftPressed = false;
            rightPressed = false;
            upPressed = true;
            downPressed = false;
        }
    
        if(event.keyCode === 39 && !leftPressed){
            console.log("right Hnadler");
            rightPressed = true;
            upPressed = false;
            downPressed = false;
            leftPressed = false;
        }
    
        if(event.keyCode === 40 && !upPressed){
            console.log("down Hnadler");
            leftPressed = false;
            rightPressed = false;
            downPressed = true;
            upPressed = false;
        }
        reBuildLayout();

}


function paintBoard(){
    // console.log("x" + snakeX);
    // console.log("y" + snakeY)
    wrapToggle = document.getElementById('wrapToggle').checked;
    for(let i=0;i<snakeX.length;i++){
        gameArray[snakeX[i]][snakeY[i]]=1;
    }

    gameArray[eggX][eggY]=2;

    for(let i=0;i<75;i++){
        for(let j=0;j<75;j++){
            let ele = document.getElementsByTagName('table')[0].rows[i].cells[j];
            if(gameArray[i][j]===2){
                ele.classList.add('redBack');
            }
            else if(gameArray[i][j]===1){
                ele.classList.add('blackBack');
                ele.classList.remove('redBack');
            }else{
                ele.classList.remove('blackBack');
                ele.classList.remove('redBack');
            }
        }
    }

}

function isGameOver(){
    console.log('wrapToggle::::'+wrapToggle);
    if((snakeX[0]<0 || snakeX[0]>74 || snakeY[0]<0 || snakeY[0]>74) && (!wrapToggle)){
        return true;
    }
        for(let i=3;i<snakeX.length;i++){
            if(snakeX[0]===snakeX[i] && snakeY[0]===snakeY[i])
                return true;
        }
    return false;
}

function isEggTaken(){
    if(snakeX[0]===eggX && snakeY[0]===eggY){
        snakeX.push(0);
        snakeY.push(0);
        score++;
        document.getElementById('score').value = score;
        eggX =Math.floor(Math.random()*74)+1;
        eggY =Math.floor(Math.random()*74)+1;
    }
    
}

function handleMove(){
    if(isGameOver()){
        clearInterval(timer);
        buttonSettings(false);
        startGameSetting(false);
        document.getElementById('modal-dialog').style.display = "block";
        return;
    }
    if(snakeX[0]<0) snakeX[0]=74;
    if(snakeX[0]>74) snakeX[0]=0;
    if(snakeY[0]<0) snakeY[0]=74;
    if(snakeY[0]>74) snakeY[0]=0;
    for(let i=snakeX.length-1;i>0;i--){
        snakeX[i]=snakeX[i-1];
        snakeY[i]=snakeY[i-1];
    }
    if(leftPressed){
        snakeY[0]--;
        console.log("left pressed: " + snakeY);
        
    }
    if(rightPressed){
        snakeY[0]++;
        console.log("left pressed: " + snakeY);
    }
    if(upPressed){
        snakeX[0]--;
        console.log("left pressed: " + snakeY);
    }
    if(downPressed){
        snakeX[0]++;
        console.log("down Pressed: "+ snakeX);
    }
}

function levelSetUp(event){
    console.log(event);

    document.getElementById('score').value=0;
    boardSetup();
    buttonSettings(true);
    startGameSetting(false);
    
}


function reBuildLayout(){
    isEggTaken();
    handleMove();
    cleanBoard();
    paintBoard();
}

function boardSetup(){
    cleanBoard();
    eggX =Math.floor(Math.random()*74)+1;
    eggY =Math.floor(Math.random()*74)+1;
    snakeX = [32,32,32,32];
    snakeY = [32,33,34,35];
    gameArray[32][32]=1;
    gameArray[32][33]=1;
    gameArray[32][34]=1;
    gameArray[32][35]=1;
    createBoard();
    paintBoard();
}

function boardSetup2(){
    cleanBoard();
    eggX =Math.floor(Math.random()*74)+1;
    eggY =Math.floor(Math.random()*74)+1;
    snakeX = [32,32,32,32];
    snakeY = [32,33,34,35];
    gameArray[32][32]=1;
    gameArray[32][33]=1;
    gameArray[32][34]=1;
    gameArray[32][35]=1;
    createBoard();
    paintBoard();
}



function buttonSettings(disable){
    let arr = document.getElementById('levelParent').children;
    for(let i=0;i<arr.length;i++){
        arr[i].disabled = disable;
    }
    
}

function startGameSetting(disable){
    document.getElementById('startGame').disabled = disable;
}

function closeGameOver(){
    document.getElementById('modal-dialog').style.display = "none";
}

function startGame(){
    
    buttonSettings(true);
    startGameSetting(true);
    timer = setInterval(reBuildLayout, 150);
}


