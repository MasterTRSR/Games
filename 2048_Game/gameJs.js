let gameArray = [];
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
let canMerge = false;
let leftPossible = false;
let rightPossible = false;
let topPossible = false;
let bottomPossible = false;
let latestI = 0;
let latestJ = 0;


for(let i=0;i<4;i++){
    gameArray[i]=[];
    for(let j=0;j<4;j++){
        gameArray[i][j]=0;
    }
}


function refreshTiles(){
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            let ele = document.getElementById('gameTable').rows[i].cells[j];
            ele.innerHTML = "";
            ele.appendChild(createTileValue(i,j));
            ele.className = "table-item tileClass"+gameArray[i][j];
            if(i===latestI && j===latestJ){
                ele.classList.add('currentTile');
            }
        }
    }
}

function createTileValue(i,j){
    ele = document.createElement('p');
    ele.id="tileValue"+i+j;
    if(gameArray[i][j]>0){
        ele.innerText = ""+gameArray[i][j];
    }else{
        ele.innerText = "";
    }
    return ele;
}

document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('keydown', keyDownHadler, false)

function keyUpHandler(event){
    canMerge = false;

    if(event.keyCode === 37)
        leftPressed = false;
    if(event.keyCode === 38)
        upPressed = false;
    if(event.keyCode === 39)
        rightPressed = false;
    if(event.keyCode === 40)
        downPressed = false;
}

function keyDownHadler(event){
    canMerge = false;

    if(event.keyCode === 37){
        leftPressed = true;
        leftPossible = false;
        if(checkLeftMove())
            leftPossible = true;
        handleLeftPress();
    }
        
    if(event.keyCode === 38){
        upPressed = true;
        topPossible = false;
        if(checkTopMove())
            topPossible = true;
        handleUpPress();
    }
        
    if(event.keyCode === 39){
        rightPressed = true;
        rightPossible = false;
        if(checkRightMove())
            rightPossible = true;
        handleRightPress();
    }
        
    if(event.keyCode === 40){
        downPressed = true;
        bottomPossible = false;
        if(checkBottomMove())
            bottomPossible = true;
        handleDownPress();
    }
    
    
    // if(!generateRandom())
    //     alert("Game OVer");
    generateRandom();
    refreshTiles();

}


function processArray(arr){

    arr = arr.filter(item => item != 0);
    while(arr.length < 4){
        arr.push(0);
    }
    for(let i=0;i<3;i++){
        if(arr[i]!==0 && arr[i]===arr[i+1]){
            arr[i] = arr[i] + arr[i+1];
            canMerge = true;
            arr.splice(i+1,1);
            arr.push(0);
        }
    }
    return arr;
}

function handleLeftPress(){
    for(let i=0;i<4;i++){
        gameArray[i] = processArray(gameArray[i]);
    }
}

function handleRightPress(){
    for(let i=0;i<4;i++){
        gameArray[i] = processArray(gameArray[i].reverse()).reverse();
    }
}

function handleUpPress(){
    for(let i=0;i<4;i++){
        let arr = [];
        for(let j=0;j<4;j++){
            arr.push(gameArray[j][i]);
        }
        arr = processArray(arr);
        for(let j=0;j<4;j++){
            gameArray[j][i] = arr[j];
        }
    }
}

function handleDownPress(){
    for(let i=0;i<4;i++){
        let arr = [];
        for(let j=0;j<4;j++){
            arr.push(gameArray[j][i]);
        }
        arr = processArray(arr.reverse()).reverse();
        for(let j=0;j<4;j++){
            gameArray[j][i] = arr[j];
        }
    }
}

function getRandomEmpty(rand){
    let arr = [];
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(gameArray[i][j]===0){
                arr.push(gameArray[i][j]);
            }
        }
    }
    let randTile = getRandomInt(0,arr.length);
    let count = 0;
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(gameArray[i][j]===0){
                if(count===randTile){
                    gameArray[i][j]=rand;
                    latestI = i;
                    latestJ = j;
                    return;
                }else{
                    count++;
                }
            }
        }
    }
}

function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min))+min;

}

function checkLeftMove(){
    for(let i=0;i<4;i++){
        arr = gameArray[i];
        if(isShiftPossible(arr))
            return true;
    }
    return false;
}

function checkRightMove(){
    for(let i=0;i<4;i++){
        arr = gameArray[i];
        if(isRightShiftPossible(arr))
            return true;
    }
    return false;
}

function checkTopMove(){
    for(let i=0;i<4;i++){
        let arr = [];
        for(let j=0;j<4;j++){
            arr.push(gameArray[j][i]);
        }
        if(isShiftPossible(arr))
            return true;
    }
    return false;
}

function checkBottomMove(){
    for(let i=0;i<4;i++){
        let arr = [];
        for(let j=0;j<4;j++){
            arr.push(gameArray[j][i]);
        }
        if(isShiftPossible(arr.reverse()))
            return true;
    }
    return false;
}

function isShiftPossible(arr){
    for(let i=0;i<4;i++){
        if(arr[i]===0){
            while(i<4){
                if(arr[i]!==0){
                    return true;
                }
                i++;
            }
            
        }
    }
    return false;
}

function isRightShiftPossible(arr){
    for(let i=3;i>=0;i--){
        if(arr[i]===0){
            while(i>=0){
                if(arr[i]!==0){
                    return true;
                }
                i--;
            }
            
        }
    }
    return false;
}



function generateRandom(){
    let rand = Math.random() >= 0.8 ? 4 : 2;   
    if(leftPressed && (leftPossible || canMerge )){
        return getRandomEmpty(rand);
    }else if(rightPressed && (rightPossible || canMerge )){
        return getRandomEmpty(rand);
    }else if(upPressed && (topPossible || canMerge )){
        return getRandomEmpty(rand);
    }else if(downPressed && (bottomPossible || canMerge )){
        return getRandomEmpty(rand);
    }

return true;
}

//for the first time
let i = Math.random() >= 0.5 ? 3 : 0;
let j = Math.random() >= 0.5 ? 3 : 0;
latestI = i;
latestJ = j;
let rand = Math.random() >= 0.8 ? 4 : 2;
gameArray[i][j] = rand;

refreshTiles();

