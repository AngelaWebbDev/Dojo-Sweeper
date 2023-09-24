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
    
// Creates the rows of buttons for this game
function render(tenNinjas) {
    var result = "";
    for(var rowNum=0; rowNum<tenNinjas.length; rowNum++) {
        for(var colNum=0; colNum<tenNinjas[rowNum].length; colNum++) {
            //add id number for writing ninjas on square when clicked
            result += `<button class="tatami" id="${rowNum}${colNum}" onclick="howMany(${rowNum}, ${colNum}, this)"></button>`;
        }
    }
    hideNinjas();
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
            console.log("ninja placed at " + hideAtRow + " " + hideAtCol);
        }else{
            i--;
        }        
    }
}
    
//tell us how many ninjas are hiding under the adjacent (all sides and corners) squares.
//ninjas hiding in clicked square are not counted
// var previousClick;
function howMany(rowNum, colNum, element) { //element = the block that was clicked
    //clear previous clicked cell
    // if(previousClick!=null){
    //     var previousGuess = document.getElementById(previousClick);
    //     previousGuess.innerText = " ";    
    // }
    //get info for current clicked cell
    idNum = rowNum.toString()+colNum.toString();
    playboard = document.getElementById(idNum);
    // previousClick = idNum;
    

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                          FIX ME            //
    //                       CLICKS HAVE NO EFFECT ON ROW 9                                       //
    /////////////////////////////////////////////////////////////////////////////////////////////////

    var ninjas = 0;
    for(var row = rowNum ; row<=rowNum ; row++){ /* check rows --,++,== */
        console.log("line 66 rowNum = " + rowNum + "  colNum = " + colNum);
        if(row>=0 && row<=tenNinjas.length){ /* is row a valid row number? */
            for(var col = colNum-1 ; col<=colNum+1 ; col++){ /* check cols --,++,== */
                if(col>=0 && col<=tenNinjas[row].length){ /* is col a valid col number? */
                    ninjas+=tenNinjas[row][col]; /* add to ninja count */
                }
            }
        }
    }
    ninjas-=tenNinjas[rowNum][colNum]; /* do not include ninjas in clicked square */

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////


    // BONUS CHALLENGE 1: draw the number onto the button instead of alerting it
    playboard.innerHTML = ninjas;
}
    
 
// start the game
// message to greet a user of the game
var style="color:cyan;font-size:1.5rem;font-weight:bold;";

// adds the rows of buttons into <div id="the-dojo"></div> 
dojoDiv.innerHTML = render(tenNinjas);    

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               BONUS CHALLENGES                                           //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
// 3. if you click on a ninja you must restart the game 
//    dojoDiv.innerHTML = `<button onclick="location.reload()">restart</button>`;
   