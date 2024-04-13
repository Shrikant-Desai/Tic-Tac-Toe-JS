const resultVar = document.getElementById('result');
const playagainbtn = document.getElementById("playagainbtn");
const buttons = document.getElementsByClassName("rowData");
const showUserVar = document.getElementById("userShow");
const undobtn = document.getElementById("undobtn");
const redobtn = document.getElementById("redobtn");

const msgObj = {
    winningMsgUser1: "Player 1 is winner",
    winningMsgUser2: "Player 2 is Winner",
    noWinnerMsg: "It's Equal, no one is winner",
    noUndoOp: "No Undo Operation left",
}

let boxValues = {
    firstValue: "",
    secondValue: "",
    thirdValue: "",
    fourthValue: "",
    fifthValue: "",
    sixthValue: "",
    sevenValue: "",
    eightValue: "",
    nineValue: "",
}

const USER1 = {
    SYMBOL: "X",
    MSG: "Player 1's Turn",
};
const USER2 = {
    SYMBOL: "O",
    MSG: "Player 2's Turn",
};

let oldArr = [], oldTurn;
let redoArr = [], counter;
const cleanupFunction = () => {
    for (const key in boxValues) {
        boxValues[key] = "";
    }
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
        buttons[i].innerHTML = "";
    }
    playagainbtn.innerHTML = "Clear";
    resultVar.innerHTML = "";
    oldArr = [];
    redoArr = [];
    showUserVar.innerHTML = USER1.MSG;
    userTurn = USER1.SYMBOL;
}
const showResult = () => {
    resultVar.innerHTML = USER1.SYMBOL === userTurn ? msgObj.winningMsgUser1 : msgObj.winningMsgUser2;
    showUserVar.innerHTML = "";
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
    redobtn.disabled = true;
    playagainbtn.innerHTML = "Play Again";
}

let userTurn = "X";

const addData = (id, redoFlag) => {
    boxValues[`${id}`] = userTurn;
    oldArr = [...oldArr, id];
    oldTurn = userTurn;
    showUserVar.innerHTML = (USER1.SYMBOL === userTurn) ? USER2.MSG : USER1.MSG;
    checkStatus();
    const div = document.getElementById(id)
    div.disabled = true;
    div.innerHTML = userTurn;
    counter = 1;
    userTurn = (USER1.SYMBOL === userTurn) ? USER2.SYMBOL : USER1.SYMBOL;
    if (!redoFlag) {
        redoArr = [];
    }
}

const undoFunction = () => {
    if (oldArr.length) {
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].innerHTML == "") buttons[i].disabled = false;
        }
        redobtn.disabled = false;
        const currentEle = oldArr[oldArr.length - counter]
        const div = document.getElementById(currentEle);
        const newOldTurn = (oldTurn === USER1.SYMBOL) ? USER2.SYMBOL : USER1.SYMBOL;
        if (div.innerHTML != "") {
            div.disabled = false;
            div.innerHTML = "";
            redoArr = [...redoArr, currentEle];
            boxValues[currentEle] = "";
        }
        else {
            div.disabled = true;
            div.innerHTML = newOldTurn;
            oldArr = [...oldArr, currentEle];
            boxValues[currentEle] = userTurn;
        }
        checkStatus();
        showUserVar.innerHTML = (oldTurn === USER1.SYMBOL) ? USER1.MSG : USER2.MSG;
        userTurn = (oldTurn === USER1.SYMBOL) ? USER1.SYMBOL : USER2.SYMBOL;
        // console.log(redoArr);
        oldTurn = newOldTurn
        if (counter != oldArr.length) counter++;
        else {
            oldArr = [];
        }
    }
}

const redoFunction = () => {
    if (redoArr.length) {
        addData(redoArr[redoArr.length - 1], true)
        redoArr.pop();
    }
}
const checkStatus = () => {

    resultVar.innerHTML = "";

    console.log(oldArr);
    const firstRow = [boxValues.firstValue, boxValues.secondValue, boxValues.thirdValue]
    const secondRow = [boxValues.fourthValue, boxValues.fifthValue, boxValues.sixthValue]
    const thirdRow = [boxValues.sevenValue, boxValues.eightValue, boxValues.nineValue]
    const firstCol = [boxValues.firstValue, boxValues.fourthValue, boxValues.sevenValue]
    const secondCol = [boxValues.secondValue, boxValues.fifthValue, boxValues.eightValue]
    const thirdCol = [boxValues.thirdValue, boxValues.sixthValue, boxValues.nineValue];

    const diagonalxy = [boxValues.firstValue, boxValues.fifthValue, boxValues.nineValue];
    const diagonalyx = [boxValues.thirdValue, boxValues.fifthValue, boxValues.sevenValue];

    let winner = false;
    if (firstRow.every(value => value == userTurn)) {
        /*  if (userTurn == "X") showResult(msgObj.winningMsgUser1)
         else showResult(msgObj.winningMsgUser2) */
        showResult();
        winner = true;
    }
    if (secondRow.every(value => value == userTurn)) {
        showResult();
        winner = true;
    }
    if (thirdRow.every(value => value == userTurn)) {
        showResult();
        winner = true;
    }
    if (firstCol.every(value => value == userTurn)) {
        showResult();
        winner = true;
    }
    if (secondCol.every(value => value == userTurn)) {
        showResult();
        winner = true;
    }
    if (thirdCol.every(value => value == userTurn)) {
        showResult();
        winner = true;
    }
    if (diagonalxy.every(value => value == userTurn)) {
        showResult();
        winner = true;
    }
    if (diagonalyx.every(value => value == userTurn)) {
        showResult();
        winner = true;
    }

    let allValueArrived = Object.values(boxValues).every(item => item != "");

    if (allValueArrived) {

        (!winner) ? resultVar.innerHTML = msgObj.noWinnerMsg : null;
    }
}



