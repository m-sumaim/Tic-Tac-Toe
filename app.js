let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; // playerX, player0
let count = 0;

const winPatterns = [       // all cases for winning
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "0";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count===9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
     msg.innerText = `Congratulations! ${winner} is the Winner`;
     msgContainer.classList.remove("hide");
     disableBoxes();
};




const checkWinner = () => {
    for(let pattern of winPatterns){
        let p1 = boxes[pattern[0]].innerText;
        let p2 = boxes[pattern[1]].innerText;
        let p3 = boxes[pattern[2]].innerText;

        if(p1 != "" && p2 != "" && p3 !=""){
            if(p1 === p2 && p2 === p3){
                console.log("winner", p1);
                showWinner(p1);
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);


