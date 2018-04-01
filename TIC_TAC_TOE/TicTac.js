console.log('hello loafding ');
var currentPlayer = false;
var gameArray = [];
var gameOverVar = false;
function initializeGameArray(square){
    if(square>=3){
        for(var i=0;i<square;i++){
            gameArray[i]=[];
            for(var j=0;j<square;j++){
                gameArray[i][j]=-1;
            }
        }
    }
}

function isGameOver(){
    if(checkRows() || checkColumns() || checkDiagonalOne() || checkDiagonalTwo())
       return true;
    return false;
} 

function checkRows(){
    for(var i=0;i<gameArray.length;i++){
        if(checkRow(i))
            return true;
    }
    return false;
}

function checkRow(row){
    for(var i=0;i<gameArray.length;i++){
        if(gameArray[row][i] !== currentPlayer )
            return false;
    }
    return true;
}

function checkColumns(){
    for(var i=0;i<gameArray.length;i++){
        if(checkColumn(i))
            return true;
    }
    return false;
}

function checkColumn(column){
    for(var i=0;i<gameArray.length;i++){
        if(gameArray[i][column] !== currentPlayer )
            return false;
    }
    return true;
}

function checkDiagonals(){
    if(checkDiagonalOne() || checkDiagonalTwo())
        return true;
    return false;
}

function checkDiagonalOne(){
    for(var i=0,j=0;i<gameArray.length;i++,j++){
        if(gameArray[i][j] !== currentPlayer)
            return false;
    }
    return true;
}

function checkDiagonalTwo(){
    for(var i=0,j=2;i<gameArray.length;i++,j--){
        if(gameArray[i][j] !== currentPlayer)
            return false;
    }
    return true;
}





function getSign(player){
    var element = document.createElement('p');
    element.className = "crossO";
    if(player)
    element.innerHTML = "X";
    else
    element.innerHTML = "O";

    return element;
};

function getSignTable(player){
    var element = document.createElement('p');
    element.className = "crossOTable";
    if(player)
    element.innerHTML = "X";
    else
    element.innerHTML = "O";

    return element;
};

function clickHandler(event){
console.log(event.target);
targetDiv = event.target.closest('div');
if(targetDiv.childElementCount===0){
    currentPlayer = !currentPlayer;
    event.target.appendChild(getSign(currentPlayer));
}

}

function clickHandlerTable(event){
    if(!gameOverVar){
    targetCol = event.target.closest('td');
    targetRow = targetCol.closest('tr');
    console.log('row :' + targetRow.rowIndex + ' column : '+ targetCol.cellIndex);
    document.getElementById('startGame').disabled=true;

    if(targetCol.childElementCount===0){
        currentPlayer = !currentPlayer;
        event.target.appendChild(getSignTable(currentPlayer));
        gameArray[targetRow.rowIndex][targetCol.cellIndex] = currentPlayer;
        if(isGameOver()){
            gameOverVar = true;
            showGameOver();
        }else if(isGameDraw()){
            document.getElementById('winnerDisplay').innerText = 'Game Draw';
            document.getElementById('startGame').disabled=false;
            gameOverVar = true;
        }
        
    }
}
}


function isGameDraw(){
    for(var i=0;i<gameArray.length;i++){
        for(var j=0;j<gameArray.length;j++){
            if(gameArray[i][j]===-1){
                return false;
            }
        }
    }
    return true;
}

function showGameOver(){
    var text;
    if(currentPlayer){
        text = 'Player 1 Won' ;
    }else{
        text = 'Player 2 Won' ;
    }
    document.getElementById('winnerDisplay').innerText = text;
    document.getElementById('startGame').disabled=false;
}

function clearAll(){
    initializeGameArray(3);
    for(var i=0;i<gameArray.length;i++){
        for(var j=0;j<gameArray.length;j++){
            document.getElementById('gameDiv').rows[i].cells[j].innerHTML=null;
        }
    }
    gameOverVar = false;
    
}

function startGame(){
    clearAll();
    document.getElementById('startGame').disabled=true;
    document.getElementById('winnerDisplay').innerText = 'Game in Progress';
}

initializeGameArray(3);





