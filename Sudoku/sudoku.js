let gameArray = [];
let unTriedArray = [];
let clearedArray = [];

function box(value, index){
    this.value = value;
    this.index = index;
    this.row = getRow(index);
    this.column = getColumn(index);
    this.region = getRegion(index);
    return this;
}

function getRow(index){
    let ind = index + 1;
    if(getColumn(index) === 9)
        return Math.floor(ind/9);
    else
        return Math.floor(ind/9) + 1;
} 

function getColumn(index){
    let ind = index+1;
    if(ind%9 === 0)
        return 9;
    else 
        return ind%9;
}

function getRegion(index){
    let row = getRow(index);
    let column = getColumn(index);
    if(row<=3){
        if(column <=3)
            return 1;
        else if(column > 6)
            return 3;
        else 
            return 2;
    }else if(row > 6){
        if(column <=3)
            return 7;
        else if(column > 6)
            return 9;
        else 
            return 8;
    }else{
        if(column <=3)
            return 4;
        else if(column > 6)
            return 6;
        else 
            return 5;
    }
}

function getRandomAvailable(index){
    console.log(index);
    let length = unTriedArray[index].length ;
    if(length > 0){
        rand = Math.floor(Math.random()*(length));
    }else
        return false;
    return unTriedArray[index][rand];
}

function resetUntriedForIndex(index){
    unTriedArray[index]=[1,2,3,4,5,6,7,8,9];
}


function isValid(index, num){
    let isValidinRow = isValidHorizontally( getRow(index), num);
    let isValidinColumn = isValidVertically( getColumn(index),num);
    
    if(isValidinRow && isValidinColumn){
    let region = getRegion(index);
        let found = gameArray.find(function(val){
            if(val.region === region && val.value === num)
                return true;
        })
        return !found;
    }else{
        return false;
    }
}

function isValidHorizontally(row, num){
    let start = (row-1)*9;
    for(let i=start;i<start+9;i++){
        if(gameArray[i] && num === gameArray[i].value)
            return false;
    }
    return true;
}

function isValidVertically(column, num){
    for(let i=column-1;i<81;i=i+9){
        if(gameArray[i] && num === gameArray[i].value)
            return false;
    }
    return true;
}


function createBoard(){
    let table = document.createElement('table');
    table.id="gameBoard";
    table.classList.add("tableContainer");
    for(i=1;i<10;i++){
        let ele = document.createElement('tr');
        ele.id="row_"+i;
        table.appendChild(ele);
        for(j=1;j<10;j++){
            let column = document.createElement('td');
            column.id="cell_"+i+j;
            column.classList.add("cellClass");
            if(j==3 || j==6)
                column.classList.add("rightBorder");
            if(i==3 || i==6)
                column.classList.add("bottomBorder");
            ele.appendChild(column);
        }
    }

    document.body.appendChild(table);
}

function populateUntriedArray(){
    unTriedArray = [];
    for(let i=0;i<81;i++){
        unTriedArray.push([1,2,3,4,5,6,7,8,9]);
    }
}

function generateBoard(){
    let index = 0;
    let value = getRandomAvailable(index);
    while(index < 81){
        if(!value){
            debugger;
            resetUntriedForIndex(index);
            index--;
            gameArray.splice(index,1);
        }else{
            debugger;
            if(isValid(index, value)){
                let boxer = new box(value,index);
                gameArray.push(boxer);
                unTriedArray[index] = unTriedArray[index].filter(ele => ele!==value);
                index++;
            }else{
                unTriedArray[index] = unTriedArray[index].filter(ele => ele!==value);
            }
            
        }
        if(index<81)
            value = getRandomAvailable(index);
        
    }


}

function manipulateBoard(level){
    while(clearedArray.length !== level){
        let rand = Math.floor(Math.random()*81);
        if(clearedArray.indexOf(rand)<0)
            clearedArray.push(rand);
    }
}

function populateBoard(){
    for(let i=0;i<clearedArray.length;i++){
        gameArray[clearedArray[i]].value = 0;
    }
}

function fillBoard(){
    for(let i=0;i<81;i++){
        if(gameArray[i].value > 0){
            let ele = document.getElementById('cell_'+gameArray[i].row+gameArray[i].column);
            ele.innerText = gameArray[i].value;
            ele.classList.add('numClass');
        }else{
            let ele = document.createElement('input');
            ele.id='input_'+ gameArray[i].row + gameArray[i].column;
            ele.classList.add("inputClass");
            document.getElementById('cell_'+gameArray[i].row+gameArray[i].column).appendChild(ele);
        }

    }
}

createBoard();
populateUntriedArray();
generateBoard();
manipulateBoard(60);
populateBoard();
fillBoard();


