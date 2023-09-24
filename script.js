var tenNinjas = [ 
    [0, 0 ,0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0 ,0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0 ,0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0 ,0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0 ,0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0 ,0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0 ,0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0 ,0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0 ,0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0 ,0, 0, 0, 0, 0, 0, 0, 0] 
    ];
var dojoDiv = document.querySelector("#the-dojo");
var restartGame = document.querySelector("#restartArea");
var instructionsArea = document.querySelector("#instructions");
var guessing = "";
var playCounter = 0;
    
// Creates the rows of buttons for this game
function render(tenNinjas) {
    instructionsArea.innerHTML = `<p>Ten snakes are sleeping in the grass.<br>
                                    How far can you walk without stepping on one?<br>
                                    <br>
                                    Choose a square to see how many snakes are in the surrounding squares.<br>
                                    If you step on a snake, you lose.<br>
                                    <br>
                                    When you think you know where a snake is at<br>
                                    click the "Mark a Spot" button,<br>
                                    then click the square where you think the snake is.<br>
                                    If you change your mind, use the "Unmark a Spot" button the same way.</p><br>`;
    var result = "";
    for(var rowNum=0; rowNum<tenNinjas.length; rowNum++) {
        for(var colNum=0; colNum<tenNinjas[rowNum].length; colNum++) {
            //add id number for writing ninjas on square when clicked
            result += `<button class="tatami" id="${rowNum}${colNum}" onclick="howMany(${rowNum}, ${colNum}, this)"></button>`;
        }
    }
    setTimeout(hideNinjas,500); /* TESTING PURPOSES ONLY to see where Ninjas are hidden ************************************************/
    // hideNinjas();
    return result;
}

// BONUS CHALLENGE 2: at the start randomly place 10 ninjas into theDojo with at most 1 on each spot
function hideNinjas(){
    //for count of 10 (to hide 10 ninjas)
    for(var i=0;i<10;i++){
        //math.random row and col numbers (0-9)
        var hideAtRow = Math.floor(Math.random()*9);
        var hideAtCol = Math.floor(Math.random()*9);

        //if row/col combo already has a 1 in its spot, choose again
        if(tenNinjas[hideAtRow][hideAtCol]==0){
            tenNinjas[hideAtRow][hideAtCol] = 1;
            // var placedNinja = hideAtRow.toString() + hideAtCol.toString(); /* TESTING PURPOSES ONLY to mark squares where ninjas are placed ****************/
            // console.log("square = " + document.getElementById(placedNinja)); /* TESTING PURPOSES ONLY to mark squares where ninjas are placed ****************/
            // document.getElementById(placedNinja).innerHTML = "N"; /* TESTING PURPOSES ONLY to mark squares where ninjas are placed ****************/
        }else{
            i--;
        }        
    }
}

//tell how many ninjas are under adjacent (all sides and corners) squares, ninjas hiding in clicked square are not counted
function howMany(rowNum, colNum, element) {
    if(guessing=="mark"){
        squareID = rowNum.toString()+colNum.toString();
        document.getElementById(squareID).style.backgroundColor = "yellow";
        document.getElementById(squareID).innerText = "S";
        guessing = "";
    }else if(guessing=="unmark"){
        squareID = rowNum.toString()+colNum.toString();
        document.getElementById(squareID).style.backgroundColor = "rgb(104, 199, 104)";
        document.getElementById(squareID).innerText = "";
        guessing = "";
    }else{
        //BONUS CHALLENGE: if you click on a ninja you must restart the game 
        if(tenNinjas[rowNum][colNum]==1){
            //button to restart game is added
            restartGame.innerHTML = `<p>You stepped on a snake!</p>
                                    <p>You walked ${playCounter} steps before that.</p>
                                    <p>Try again?</p>
                                    <button onclick="location.reload()">Yes</button>
                                    <button onclick="hideGameArea()">No</button>`;
            //all squares with ninjas change to background-color:red
            //all squares without ninjas change to background-color:lightgray
            for(var i=0;i<tenNinjas.length;i++){
                for(var j=0;j<tenNinjas[i].length;j++){
                    squareNum = i.toString() + j.toString();
                    if(tenNinjas[i][j]==0){
                        document.getElementById(squareNum).style.backgroundColor = "lightgray";
                    }else{
                        document.getElementById(squareNum).style.backgroundColor = "red";
                        document.getElementById(squareNum).innerText = "X";
                    }
                }
            }
            //buttons and instructions disappear
            document.getElementById("markLocation").remove();
            document.getElementById("unmarkLocation").remove();
            instructionsArea.remove();
            //playcounter gets reset to 0
            playCounter = 0;
        }else{
            playCounter++;
            if(playCounter==90){
                youWin();
            }else{
                var ninjas = 0;
                for(var row = rowNum-1 ; row<=rowNum+1 ; row++){ /* check rows --,++,== */
                    if(row>=0 && row<=tenNinjas.length-1){ /* is row a valid row number? */
                        for(var col = colNum-1 ; col<=colNum+1 ; col++){ /* check cols --,++,== */
                            if(col>=0 && col<=tenNinjas[rowNum].length-1){ /* is col a valid col number? */
                                ninjas+=tenNinjas[row][col]; /* add to ninja count */
                            }
                        }
                    }
                }
                ninjas-=tenNinjas[rowNum][colNum]; /* do not include ninjas in clicked square */
                // BONUS CHALLENGE 1: draw the number onto the button instead of alerting it
                element.innerHTML = ninjas;        
            }
        
        }
    }
}

function markSquare(element){
    var squareID;  /* to identify squares to mark/unmark guesses */
    if(element.id=="markLocation"){
        guessing = "mark";
    }else{
        guessing = "unmark";
    }
}

//hide game area if user does not want to restart game
function hideGameArea(){
    dojoDiv.style.visibility = "hidden";
    restartGame.innerHTML = `Game Over`;
}

//when player has clicked 90 squares, they win
function youWin(){
    restartGame.innerHTML = `<p>You Won!<br>
                                You avoided all the snakes!<br>
                                <br>
                                Do you want to play again?
                            </p>
                            <button onclick="location.reload()">Yes</button>
                            <button onclick="hideGameArea()">No</button>`;
    //all squares with ninjas change to background-color:black
    for(var i=0;i<tenNinjas.length;i++){
        for(var j=0;j<tenNinjas[i].length;j++){
            squareNum = i.toString() + j.toString();
            if(tenNinjas[i][j]==1){
                document.getElementById(squareNum).style.backgroundColor = "black";
            }
        }
    }
    //buttons and instructions disappear
    document.getElementById("markLocation").remove();
    document.getElementById("unmarkLocation").remove();
    instructionsArea.remove();
    //playcounter gets reset to 0
    playCounter = 0;
}
    
// start the game
// message to greet a user of the game
var style="color:cyan;font-size:1.5rem;font-weight:bold;";

// adds the rows of buttons into <div id="the-dojo"></div> 
dojoDiv.innerHTML = render(tenNinjas);