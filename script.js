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
var firstMove = true;
    
// Creates the rows of buttons for this game
function render(tenNinjas) {
    instructionsArea.innerHTML = `<p>Ten ninjas are hiding in the grass.<br>
                                    <br>
                                    Choose a square to see how many ninjas are hiding in the surrounding squares.<br>
                                    If you click on a ninja, you lose.<br>
                                    <br>
                                    When you think you know where a ninja is hiding<br>
                                    click the "Mark Location" button,<br>
                                    Then click the square where you think the ninja is.<br>
                                    If you change your mind, use the "Unmark Location" button the same way.</p><br>`;
    var result = "";
    for(var rowNum=0; rowNum<tenNinjas.length; rowNum++) {
        for(var colNum=0; colNum<tenNinjas[rowNum].length; colNum++) {
            //add id number for writing ninjas on square when clicked
            result += `<button class="tatami" id="${rowNum}${colNum}" onclick="howMany(${rowNum}, ${colNum}, this)"></button>`;
        }
    }
    // setTimeout(hideNinjas,500); /* TESTING PURPOSES ONLY to see where Ninjas are hidden ************************************************/
    hideNinjas();
    return result;
}

function markSquare(element){
    var squareID;  /* to identify squares to mark/unmark guesses */
    if(element.id=="markLocation"){
        guessing = "mark";
    }else{
        guessing = "unmark";
    }
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

//hide game area if user does not want to restart game
function hideGameArea(){
    dojoDiv.style.visibility = "hidden";
    restartGame.innerHTML = `Game Over`;
}
    
//tell how many ninjas are under adjacent (all sides and corners) squares, ninjas hiding in clicked square are not counted
function howMany(rowNum, colNum, element) {
    if(guessing=="mark"){
        squareID = rowNum.toString()+colNum.toString();
        document.getElementById(squareID).style.backgroundColor = "yellow";
        document.getElementById(squareID).innerText = "?";
        guessing = "";
    }else if(guessing=="unmark"){
        squareID = rowNum.toString()+colNum.toString();
        document.getElementById(squareID).style.backgroundColor = "rgb(104, 199, 104)";
        document.getElementById(squareID).innerText = "";
        guessing = "";
    }else{
        if(firstMove == true){
            firstMove == false;
            document.getElementById("markLocation").style.visibility = "visible";
            document.getElementById("unmarkLocation").style.visibility = "visible";
        }
        //BONUS CHALLENGE: if you click on a ninja you must restart the game 
        if(tenNinjas[rowNum][colNum]==1){
            //button to restart game is added
            restartGame.innerHTML = `<p>Oops!</p>
                                    <p>Restart Game?</p>
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


// start the game
// message to greet a user of the game
var style="color:cyan;font-size:1.5rem;font-weight:bold;";

// adds the rows of buttons into <div id="the-dojo"></div> 
dojoDiv.innerHTML = render(tenNinjas);