let gameArray = [];
let gametiles = [];

//initialise sudoku
for(let i=0;i<9;i++){
    gameArray[i]=[];
    for(let j=0;j<9;j++){
        gameArray[i][j]=0;
    }
}

//initialise co-ordinates
for(let i=0;i<9;i=i+3){
    for(let j=0;j<9;j=j+3){
        
        gametiles.push({
            Xmin : i,
            Xmax : i+2,
            Ymin : j,
            Ymax : j+2,
        });
    }
}


function createBoard(){
    let table = document.createElement('table');
    table.id="gameBoard";
    table.classList.add("tableContainer");
    for(i=0;i<9;i++){
        let ele = document.createElement('tr');
        ele.id="row_"+i;
        table.appendChild(ele);
        for(j=0;j<9;j++){
            let column = document.createElement('td');
            column.id="cell_"+i+j;
            column.classList.add("cellClass");
            if(j==2 || j==5)
                column.classList.add("rightBorder");
            if(i==2 || i==5)
                column.classList.add("bottomBorder");
            ele.appendChild(column);
        }
    }

    document.body.appendChild(table);
}

function populate(){
    
    populateDiagonalCubes();

}

function populateCube(index){
    let isDiagonal = false;
    if(index ===0 || index ===4 || index ===8){
        isDiagonal = true;
    }
    
    let Xmin = gametiles[index].Xmin;
    let Xmax = gametiles[index].Xmax;
    let Ymin = gametiles[index].Ymin;
    let Ymax = gametiles[index].Ymax;
    
    for (let i = Xmin; i <= Xmax; i++) {
        for (let j = Ymin; j <= Ymax; j++) {
            let num = getRandomInt();
            debugger;
            if(isDiagonal){
                while (!isValid(Xmin, Xmax, Ymin, Ymax, num)) {
                    num = getRandomInt();
                }
            }else{
                while (!(isValidHorizontally(i, num) && isValidVertically(j,num) && isValid(Xmin, Xmax, Ymin, Ymax, num))) {
                    num = getRandomInt();
                }
            }
            gameArray[i][j] = num;
        }
    }

}

function populateDiagonalCubes(){
    populateCube(0);
    populateCube(4);
    // populateCube(8);
    populateCube(1);
}

function getRandomInt(){
    return Math.floor(Math.random()*9)+1;
}

function isValid(Xmin, Xmax, Ymin, Ymax, num) {
    let array = [];
    for (let i = Xmin; i <= Xmax; i++) {
        array[i-Xmin]=[];
        for (let j = Ymin; j <= Ymax; j++) {
            array[i - Xmin][j - Ymin] = gameArray[i][j];
        }
    }

    let value = array.find(function (val) {
        let inValue = val.find(function (invalue) {
            return invalue === num;
        });

        return inValue === undefined ? false : true;
    });

    return value === undefined ? true : false;
}

function isValidHorizontally(row, num){
    for(let i=0;i<9;i++){
        if(num === gameArray[row][i])
            return false;
    }
    return true;
}

function isValidVertically(column, num){
    for(let i=0;i<9;i++){
        if(num === gameArray[i][column])
            return false;
    }
    return true;

}



createBoard();
populate();


