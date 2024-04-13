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

let historyObj = [];
let oldTurn;
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
    historyObj = [];
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
    historyObj = [...historyObj, { position: id, value: userTurn }];
    console.log(historyObj);
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
    if (historyObj.length) {
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].innerHTML == "") buttons[i].disabled = false;
        }
        redobtn.disabled = false;
        const currentEle = historyObj[historyObj.length - counter]
        const div = document.getElementById(currentEle.position);
        if (div.innerHTML != "") {
            div.disabled = false;
            div.innerHTML = "";
            redoArr = [...redoArr, currentEle.position];
            boxValues[currentEle.position] = "";
        }
        else {
            div.disabled = true;
            div.innerHTML = currentEle.value;
            historyObj = [...historyObj, currentEle.position];
            boxValues[currentEle.position] = currentEle.value;
        }
        checkStatus();
        showUserVar.innerHTML = (oldTurn === USER1.SYMBOL) ? USER1.MSG : USER2.MSG;
        userTurn = currentEle.value

        if (counter != historyObj.length) counter++;
        else {
            historyObj = [];
        }
    }
}

const redoFunction = () => {
    if (redoArr.length) {
        addData(redoArr[redoArr.length - 1], true)
        redoArr.pop();
    }
}
const checkWin = (row) => {
    if (row.every(value => value == userTurn)) {
        showResult();
        return true;
    }
}
const checkStatus = () => {

    resultVar.innerHTML = "";

    const rowsObj = [
        [boxValues.firstValue, boxValues.secondValue, boxValues.thirdValue],
        [boxValues.fourthValue, boxValues.fifthValue, boxValues.sixthValue],
        [boxValues.sevenValue, boxValues.eightValue, boxValues.nineValue],
        [boxValues.firstValue, boxValues.fourthValue, boxValues.sevenValue],
        [boxValues.secondValue, boxValues.fifthValue, boxValues.eightValue],
        [boxValues.thirdValue, boxValues.sixthValue, boxValues.nineValue],
        [boxValues.firstValue, boxValues.fifthValue, boxValues.nineValue],
        [boxValues.thirdValue, boxValues.fifthValue, boxValues.sevenValue],
    ]

    let winner = rowsObj.some(currentRow => checkWin(currentRow));

    let allValueArrived = Object.values(boxValues).every(item => item != "");
    if (allValueArrived) {
        (!winner) ? resultVar.innerHTML = msgObj.noWinnerMsg : null;
    }
}



