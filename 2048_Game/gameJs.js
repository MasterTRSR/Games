let gameArray = [];
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;


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

    if(event.keyCode === 37){
        leftPressed = true;
        handleLeftPress();
    }
        
    if(event.keyCode === 38){
        upPressed = true;
        handleUpPress();
    }
        
    if(event.keyCode === 39){
        rightPressed = true;
        handleRightPress();
    }
        
    if(event.keyCode === 40){
        downPressed = true;
        handleDownPress();
    }
    
    
    if(!generateRandom())
        alert("Game OVer");

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

function getFirstEmptyRow(rand){
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(gameArray[i][j]===0){
                gameArray[i][j]=rand;
                return true;
            }
        }
    }
    return false;
}

function getFirstEmptyRowBottom(rand){
    for(let i=3;i>=0;i--){
        for(let j=0;j<4;j++){
            if(gameArray[i][j]===0){
                gameArray[i][j]=rand;
                return true;
            }
        }
    }
    return false;
}

function getFirstEmptyColumn(rand){
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(gameArray[j][i]===0){
                gameArray[j][i]=rand;
                return true;
            }
        }
    }
    return false;
}

function getFirstEmptyColumnRight(rand){
    for(let i=3;i>=0;i--){
        for(let j=0;j<4;j++){
            if(gameArray[j][i]===0){
                gameArray[j][i]=rand;
                return true;
            }
        }
    }
    return false;
}

function generateRandom(){
    let rand = Math.random() > 0.5 ? 4 : 2;
    if(leftPressed){
        return getFirstEmptyColumn(rand);
    }else if(rightPressed){
        return getFirstEmptyColumnRight(rand);
    }else if(upPressed){
        return getFirstEmptyRow(rand);
    }else if(downPressed){
        return getFirstEmptyRowBottom(rand);
    }

return true;
}

//for the first time
let i = Math.random() > 0.5 ? 3 : 0;
let j = Math.random() > 0.5 ? 3 : 0;
let rand = Math.random() > 0.8 ? 4 : 2;
gameArray[i][j] = rand;

refreshTiles();

