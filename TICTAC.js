let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-button");
let turnO = true;  //player X and Player O
let newgamebutton = document.querySelector("#new-button");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count = 0;
const winningpatterns=[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],

];

const resetgame = () => {
turnO = true;
enableallboxes();
msgcontainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
     console.log("clicked");       
     if(turnO){
        box.innerText="O";
        turnO = false;
     }
     else {
            box.innerText="X";
            turnO = true;
        }    
     box.disabled = true;
     count = count + 1;
     let waswinner = checkwinner();
     if (count === 9 && !waswinner){
        gamedraw();
     }
    });
});

const gamedraw = () => {
    msg.innerText = `Game was Draw`;
    msgcontainer.classList.remove("hide");
    disableallboxes();
};

const disableallboxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableallboxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) => {
    msg.innerText = ` player ${winner} won the game`;
    msgcontainer.classList.remove("hide");
    disableallboxes();
};

const checkwinner = () => {
    for( let pattern of winningpatterns){
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if(val1!= "" && val2 != "" && val3 != ""){
            if( val1 == val2 && val2 == val3 && val3 == val1 )
               {
                console.log("winner",val1);

                showWinner(val1);
               }
        }
    }
};

newgamebutton.addEventListener("click", resetgame);
reset.addEventListener("click", resetgame);



