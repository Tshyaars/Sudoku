function getInput(rowNum,colNum) {
    return plateauEl.children[rowNum].children[colNum].firstChild;
}
function isColumnOk(value,colNum) {
    let count = 0;
    for (let index = 0; index < plateauEl.children.length; index++) {
        if (getInput(index,colNum).value == value ) {
            if (++count == 2) {
                return false;
            }
        }
    }
    return true;
};
function isRowOk(value,rowNum) {
    let count = 0;
    for (let index = 0; index < plateauEl.children.length; index++) {
        if (getInput(rowNum,index).value == value) {
            if (++count == 2) {
                return false;
            }
        }
    }
    return true;
};
function isSquareOk(value,rowNum,colNum) {
    let count = 0;
    let row = 0;
    let col = 0;
    if(3<=rowNum && rowNum<=5){row = 3;}
    if(6<=rowNum && rowNum<=8){row = 6;}
    if(3<=colNum && colNum<=5){col = 3;}
    if(6<=colNum && colNum<=8){col = 6;}
    for (let indexR = row; indexR < row+3; indexR++) {
        for (let indexC = col; indexC < col+3; indexC++) {
            if (getInput(indexR,indexC).value == value) {
                if (++count == 2) {
                    return false;
                }
            }
        }
    }
    return true;
}
function checkIfWon() {
    for (let rowIndex = 0; rowIndex < plateauEl.children.length; rowIndex++) {
        let check = 0;
        for (let index = 0; index < plateauEl.children.length; index++) {
            check += parseInt(getInput(rowIndex,index).value);
        }
        if (check != 45) {
            return false;
        }
    }
    for (let colIndex = 0; colIndex < plateauEl.children.length; colIndex++) {
        let check = 0;
        for (let index = 0; index < plateauEl.children.length; index++) {
            check += parseInt(getInput(index,colIndex).value);
        }
        if (check != 45) {
            return false;
        }
    }
    for (let squareRow = 0; squareRow < 9; squareRow+=3) {
        indexR=squareRow;
        for (let squareCol = 0; squareCol < 9; squareCol+=3) {
            indexC=squareCol;
            let check = 0;
            for (indexR; indexR < squareRow+3; indexR++) {
                for (indexC; indexC < squareCol+3; indexC++) {
                    check += parseInt(getInput(indexR,indexC).value);
                }
                indexC=squareCol;
            }
            if (check != 45) {
                return false;
            }
            indexR=squareRow;
        }
    }
    return true;
}
function checkValue(value,rowNum,colNum,el) {
    if ( value<1 || value>9 ) {
        el.value = "";
        const erreur = document.createElement("p");
        erreur.classList.add("toCorrect");
        erreur.innerText = "Vous ne devez saisir qu'UN chiffre entre 1 et 9 !";
        document.body.append(erreur);
        setTimeout(() => {
            erreur.remove()
        }, 3000);
    }else{
        getInput(rowNum,colNum).classList.remove("toCorrect");
        if (!isColumnOk(value,colNum) || !isRowOk(value,rowNum) || !isSquareOk(value,rowNum,colNum)) {
            getInput(rowNum,colNum).classList.add("toCorrect");
        }else{
            hasWon = checkIfWon();
        }
    }
}
const plateauEl = document.querySelector("#plateau");
let hasWon = false;
// const sudoku = [
//     [1,0,6,0,3,0,0,0,0],
//     [0,0,0,0,0,8,2,0,0],
//     [9,0,0,0,0,0,0,0,0],
//     [0,7,0,8,0,4,0,0,0],
//     [0,0,0,0,0,0,0,9,1],
//     [0,0,0,2,0,0,0,0,0],
//     [5,0,0,0,1,0,0,6,0],
//     [0,4,0,0,0,0,8,0,0],
//     [0,0,0,0,0,0,0,0,0],
// ];
const sudoku = [
    [5,9,8,7,4,1,3,2,6],
    [7,1,6,3,9,2,8,4,5],
    [2,4,3,5,8,6,9,7,1],
    [1,2,7,8,6,9,5,3,4],
    [6,3,4,1,7,5,2,9,8],
    [8,5,9,4,2,3,6,1,7],
    [3,6,1,9,5,7,4,8,2],
    [4,7,5,2,3,8,1,6,9],
    [9,8,2,6,1,4,7,0,0],
];
sudoku.forEach((row,rowNum)=>{
    row.forEach((boite,colNum)=>{
        const input = plateauEl.children[rowNum].children[colNum].firstChild;
        if (boite==0) {
            input.classList.add("toModify");
        }else{
            input.value = boite;
            input.setAttribute("readonly","readonly");
        }
        input.addEventListener("focusout",()=>{
            if(input.value!=""){
                checkValue(input.value,rowNum,colNum,input)
                if (hasWon) {
                    alert("win");
                    hasWon = false;
                }
            };
        });
    });
});