var theDojo = [ [1, 0, 1, 1, 1, 0, 4, 0, 8, 0],
                [3, 1, 0, 7, 0, 0, 6, 0, 8, 8],
                [5, 0, 7, 0, 3, 6, 6, 6, 0, 0],
                [2, 3, 0, 9, 0, 0, 6, 0, 8, 0],
                [6, 0, 3, 3, 0, 2, 0, 3, 0, 4],
                [0, 0, 3, 3, 0, 0, 2, 2, 3, 0],
                [0, 0, 0, 0, 5, 0, 1, 2, 0, 6],
                [2, 2, 2, 2, 0, 7, 1, 1, 1, 0],
                [5, 2, 0, 2, 0, 0, 0, 1, 1, 2],
                [9, 2, 2, 2, 0, 7, 0, 1, 1, 0] ];
var dojoDiv = document.querySelector("#the-dojo");
    
// Creates the rows of buttons for this game
function render(theDojo) {
    var result = "";
    for(var rowNum=0; rowNum<theDojo.length; rowNum++) {
        for(var colNum=0; colNum<theDojo[rowNum].length; colNum++) {
            //add id number for writing ninjas on square when clicked
            result += `<button class="tatami" id="${rowNum}${colNum}" onclick="howMany(${rowNum}, ${colNum}, this)"></button>`;
        }
    }
    return result;
}
    
//tell us how many ninjas are hiding under the adjacent (all sides and corners) squares.
//ninjas hiding in clicked square are not counted
var previousClick;
function howMany(rowNum, colNum, element) {
    //clear previous clicked cell
    if(previousClick!=null){
        var previousGuess = document.getElementById(previousClick);
        previousGuess.innerText = " ";    
    }
    //get info for current clicked cell
    idNum = rowNum.toString()+colNum.toString();
    playboard = document.getElementById(idNum);
    previousClick = idNum;
    
    var ninjas = 0;
    for(var row = rowNum-1 ; row<=rowNum+1 ; row++){ /* check rows --,++,== */
        if(row>=0 && row<=theDojo.length){ /* is row a valid row number? */
            for(var col = colNum-1 ; col<=colNum+1 ; col++){ /* check cols --,++,== */
                if(col>=0 && col<=theDojo[row].length){ /* is col a valid col number? */
                    ninjas+=theDojo[row][col]; /* add to ninja count */
                }
            }
        }
    }
    ninjas-=theDojo[rowNum][colNum]; /* do not include ninjas in clicked square */

    // BONUS CHALLENGE 1: draw the number onto the button instead of alerting it
    playboard.innerHTML = ninjas;
}
    
 
// start the game
// message to greet a user of the game
var style="color:cyan;font-size:1.5rem;font-weight:bold;";

// adds the rows of buttons into <div id="the-dojo"></div> 
dojoDiv.innerHTML = render(theDojo);    

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               BONUS CHALLENGES                                           //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 2. at the start randomly place 10 ninjas into theDojo with at most 1 on each spot
// 3. if you click on a ninja you must restart the game 
//    dojoDiv.innerHTML = `<button onclick="location.reload()">restart</button>`;
   