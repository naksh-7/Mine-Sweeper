let board = []
let mineCount = 5;
let rows =8,cols =8
let over =0;
let gamewon=0;
let flag = false;
let mineloc = [];
let tilesclicked = 0;

window.onload = function(){
    start();
}

function placeMines(){
    let minesLeft = mineCount;
    while (minesLeft > 0) { 
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);
        let id = r.toString() + "-" + c.toString();

        if (!mineloc.includes(id)) {
            mineloc.push(id);
            minesLeft -= 1;
        }
    }
}

function start(){
    document.getElementById("minecount").innerHTML = "Mines: "+mineCount;
    document.getElementById("flag").addEventListener("click",placeFlag);
    placeMines();
    console.log(mineloc);
    for(let r=0;r<8;r++){
        let row =[];
        for(let c=0;c<8;c++){
            let tile = document.createElement("div");
            tile.id = r.toString()+"-"+c.toString();
            tile.addEventListener("click",click);
            document.getElementById("board").appendChild(tile);
            row.push(tile);
        }
        board.push(row);
    }
}

function placeFlag(){
    if(flag==false){
        flag = true;
        document.getElementById("flag").style.backgroundColor = "rgb(108, 128, 239)";
    }
    else{
        flag = false;
        document.getElementById("flag").style.backgroundColor = "rgb(182, 191, 239)";
    }
}

function click(){
    if(over==1|| this.classList.contains("tile-clicked")){
        return;
    }

    let tile = this;
    if(flag==true){
        if(tile.innerHTML=="🚩"){
            tile.innerHTML = "";
        }
        else if(tile.innerHTML==""){
            tile.innerHTML = "🚩";
            
        }
        return;
    }
    if(mineloc.includes(tile.id)){
        show();
        
        gamewon =0;
        document.getElementById("minecount").innerHTML = "Game Over"; 
        let t1 = document.getElementById("overlay");
           
        document.getElementById("overlayc1").innerHTML = "Game Over";    
        document.getElementById("restart").innerHTML = "restart";
        document.getElementById("restart").addEventListener("click",refresh);
        t1.style.display = "flex";
            
        over = 1;
        return;
    }
    let arr = tile.id.split("-");
    let r = parseInt(arr[0]);
    let c = parseInt(arr[1]);
    check(r,c);
}


function show() {
    for (let r= 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let tile = board[r][c];
            if (mineloc.includes(tile.id)) {
                tile.innerText = "💣";
                tile.style.backgroundColor = "red";                
            }
        }
    }
}

function check(r,c){
    if(r<0 || r>=rows || c<0 || c>=cols){
        return;
    }
    if(board[r][c].classList.contains("tile-clicked")){
        return;
    }
    board[r][c].classList.add("tile-clicked");
    tilesclicked++;    
    let minefound =0;
    minefound += checkMine(r-1,c-1);
    minefound += checkMine(r-1,c);
    minefound += checkMine(r-1,c+1);
    minefound += checkMine(r,c-1);
    minefound += checkMine(r,c+1);
    minefound += checkMine(r+1,c-1);
    minefound += checkMine(r+1,c);
    minefound += checkMine(r+1,c+1);
    if(minefound>0){
        board[r][c].innerText = minefound;
        board[r][c].classList.add("x"+minefound);
    }
    else{
        check(r-1,c-1);
        check(r-1,c);
        check(r-1,c+1);
        check(r,c-1);
        check(r,c+1);
        check(r+1,c-1);
        check(r+1,c);
        check(r+1,c+1);
    }
    if(tilesclicked==rows*cols-mineCount){
        document.getElementById("minecount").innerHTML = "Mines: Cleared";
        
        gamewon=1;
        let t1 = document.getElementById("overlay");
           
        document.getElementById("overlayc1").innerHTML = "Congratulations! You Won";    
        document.getElementById("restart").innerHTML = "Play again";
        document.getElementById("restart").addEventListener("click",refresh);
        t1.style.display = "flex";
        over =1;
    }
}

function checkMine(r,c){
    if(r<0 || r>=rows || c<0 || c>=cols){
        return 0;
    }
    let tile = board[r][c];
    if(mineloc.includes(tile.id)){
        return 1;
    }
    return 0;
}

function refresh(){
    over =0;
    gamewon=0;
    flag = false;
    board =[];
    mineloc = [];
    tilesclicked = 0;
    let boardElement = document.getElementById("board");  
    while (boardElement.firstChild) {  
        boardElement.removeChild(boardElement.firstChild);  
    }  
    let restartButton = document.getElementById("restart");  
    restartButton.removeEventListener("click", refresh);  
    board = [];  
    let t1 = document.getElementById("overlay");  
    t1.style.display = "none";
    document.getElementById("minecount").innerHTML = "Mines: 0";
    start();
}