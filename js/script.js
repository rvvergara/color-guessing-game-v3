// 1. Declare all selectors

let redDisplay = document.getElementById("red"); //Red rgb in da display
let greenDisplay = document.getElementById("green"); //Green rgb in da display
let blueDisplay = document.getElementById("blue"); //Blue rgb in da display
let boxes = document.getElementsByClassName("box"); //the colored boxes
let hardBoxes = document.getElementsByClassName("hard"); //boxes 4-6 which will not be included if isEasy is true
let isEasy = false; //Game mode, 3 boxes if true 6 boxes if false
let chosenBox = document.getElementById(chosenBoxId());//This will be the box that has the correct color every page load and every time Easy, New Game or Hard is pressed 
let pageHeader = document.querySelector("header");//Header block that contains the h1
let easy = document.getElementById("easy");//Easy button
let hard = document.getElementById("hard");//Hard button
let reset = document.getElementById("reset"); //New Game or Play Again display 
let message = document.getElementById("message");//The message span that says 'Try Again' or 'Correct'

initialize(); //Initialize all functionalities

//1. Function that will initialize everything when page loads:

function initialize(){
    generateColorCode(); //Generate RGB code to be guessed
    colorTheBoxes(); //Generate colors on included boxes
    //Adding event listeners:
    addBoxListeners();
    addButtonListeners();
}

//2. Function to add event listeners to boxes
function addBoxListeners(){
    for(let box of boxes){ //Add event listeners to each box
        box.addEventListener("click",isRightBox);
        box.addEventListener("mouseenter",onHoverBox);
        box.addEventListener("mouseleave",onHoverBox);
    }
}

//3.Function to add event listeners to buttons
function addButtonListeners(){
    easy.addEventListener("click",toggleEasy); //Add event listeners to each nav buttons
    hard.addEventListener("click",toggleEasy); //Add event listeners to each nav buttons
    reset.addEventListener("click",resetGame); //Add event listeners to each nav buttons
}

//4. Function to generate new RGB Code:
function generateColorCode(){
    redDisplay.textContent = Math.floor(Math.random()*255+1);
    greenDisplay.textContent = Math.floor(Math.random()*255+1);
    blueDisplay.textContent = Math.floor(Math.random()*255+1);
}

//5. Function to determine ID of chosen box
function chosenBoxId(){
    let numberOfBoxes = includedBoxes(isEasy).length;
    let boxID = Math.floor(Math.random()*numberOfBoxes+1);
    return boxID;
}

//6. Function to generate individual box colors where chosen box will have color indicated in the RGB display in h1 and if isEasy is true then only three boxes will be colored
function colorTheBoxes(){
    let correctBox = chosenBox;
    let boxesToUse = includedBoxes(isEasy);
    for(let box of boxes){
        box.style.background = "none";
    }
    for(let box of boxesToUse){
        box.style.background = "rgb("+Math.floor(Math.random()*255+1)+","+Math.floor(Math.random()*255+1)+","+Math.floor(Math.random()*255+1) +")";
        if(box == chosenBox){
            box.style.background = "rgb("+red.textContent+","+green.textContent+","+blue.textContent+")";
        }
    }
}

//7. Function to determine included boxes: 3 if isEasy is true and 6 if isEasy if false
function includedBoxes(isEasy){
    let includedBoxesArr = [];
    let numberOfBoxes = 6;
    if(isEasy){
        numberOfBoxes = 3;
    }
    for(let i=0;i<numberOfBoxes;i++){
        includedBoxesArr.push(boxes[i]);
    }
    return includedBoxesArr;
}

//8. Function to handle when not the right box is clicked
function isRightBox(){
    if(this.id<=includedBoxes(isEasy).length){
        if(this.style.background != chosenBox.style.background){
            message.textContent = "try again!";
            this.style.background = "none";
        }
    }
    if(this == chosenBox){
        message.textContent = "correct!";
        reset.textContent = "play again?";
        for(let box of includedBoxes(isEasy)){
            box.style.background = chosenBox.style.background;
        }
        pageHeader.style.background = chosenBox.style.background;
    }
}

//9. Function to call when Easy is clicked
function toggleEasy(){
    if(!isEasy && this.id == "easy"){
        isEasy = true;
        resetGame();
        hard.classList.remove("highlight");
    }
    else if(isEasy && this.id == "hard"){
        isEasy = false;
        resetGame();
        easy.classList.remove("highlight");
    }
    this.classList.add("highlight");
}

//10. Function to handle clicking of New Game/Play Again
function resetGame(){
    chosenBox = document.getElementById(chosenBoxId());
    generateColorCode();
    colorTheBoxes();
    message.textContent = "";
    reset.textContent = "new colors";
    pageHeader.style.background = "#186c6c";
}

//11. Function to handle hovering over boxes
function onHoverBox(e){
    if(this.id<=includedBoxes(isEasy).length){
        if(e.type == "mouseenter") this.classList.add("hoverBox");
        else if(e.type == "mouseleave") this.classList.remove("hoverBox");            
    }
}