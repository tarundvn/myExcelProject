for (let i = 1; i <= 100; i++) {
    for (let j = 1; j <= 26; j++) {
        let cell = document.querySelector(`.griddiv[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("input",function(e){
            let address = addressBar.value;
            let [activecell, cellProp] =  getCellAndCellProp(address);
            let enteredData = activecell.innerText;
            cellProp.value = enteredData;
            removeParents(address);
            cellProp.formula = "";
            for (let i = 0; i < cellProp.children.length; i++) {
                let childAddress = cellProp.children[i];
                updateChildrenCells(childAddress);
            }
        });
    }
}

const formulabar = document.querySelector(".formula-bar");
formulabar.addEventListener("keydown", function(e) {
    if(e.code === 'Enter')
    {
        let address = addressBar.value;
        removeParents(address);
        let formula = formulabar.value.split(" ");
        addChildrens(address, formula);
        // detect cycle 
        let res = isCycle();
        if(res === true)
            updateChildrenCells(address);
        else
            alert("CYCLIC FORMULA IS PRESESNT");
    }
});

// Parent Child RelationShip Establishment
function addChildrens(childAdress, formula)
{
    let [child, childProp] = getCellAndCellProp(childAdress);
    childProp.formula = formula;
    let newFormula = childProp.formula;
    for(let i = 0; i < newFormula.length; i++)
    {
        if(newFormula[i].charCodeAt(0) >= 65 && newFormula[i].charCodeAt(0) <= 90)
        {
            let parentAddress = newFormula[i];
            let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
            // console.log("Adding " + childAdress + " as child in " + parentAddress);
            let crid = Number(childAdress.slice(1));
            let ccid = Number(childAdress.charCodeAt(0)) - 64;
            let prid = Number(parentAddress.slice(1));
            let pcid = Number(parentAddress.charCodeAt(0)) - 64;
            graph[prid - 1][pcid - 1].push([crid - 1, ccid - 1]);
            indegree[crid - 1][ccid - 1]++;
            parentCellProp.children.push(childAdress);
        }
    }
}

function removeParents(childAdress)
{
    let [child, childProp] = getCellAndCellProp(childAdress);
    let oldFormula = childProp.formula;
    for(let i = 0; i < oldFormula.length; i++)
    {
        if(oldFormula[i].charCodeAt(0) >= 65 && oldFormula[i].charCodeAt(0) <= 90)
        {
            let parentAddress = oldFormula[i];
            let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
            let idx = parentCellProp.children.indexOf(childAdress);
            if(idx != -1)
            {
                //console.log("Removing " + childAdress + " as child in " + parentAddress);
                let crid = Number(childAdress.slice(1));
                let ccid = Number(childAdress.charCodeAt(0)) - 64;
                let prid = Number(parentAddress.slice(1));
                let pcid = Number(parentAddress.charCodeAt(0)) - 64;
                const index = graph[prid - 1][pcid - 1].findIndex(
                    (item) => item[0] === crid - 1 && item[1] === ccid - 1
                );
                if (index !== -1) {
                    graph[prid - 1][pcid - 1].splice(index, 1);
                    indegree[crid - 1][ccid - 1]--;
                } 
                parentCellProp.children.splice(idx, 1);
            }
        }
    }
}


//Updates values in child nodes of the curr cell
function updateChildrenCells(parentAddress) {
    let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
    let evaluatedValue = evaluateFormula(parentCellProp.formula);
    setCellUIAndCellProp(evaluatedValue, parentAddress);
    for (let i = 0; i < parentCellProp.children.length; i++) {
        let childAddress = parentCellProp.children[i];
        updateChildrenCells(childAddress);
    }
}

function evaluateFormula(formula) {
    let encodedFormula = [...formula];
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [cell, cellProp] = getCellAndCellProp(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}

//Updates UI and DB
function setCellUIAndCellProp(evaluatedValue, address) {
    let [cell, cellProp] = getCellAndCellProp(address);
    //UI update
    cell.value = evaluatedValue;
    cell.innerText = evaluatedValue;
    // DB update
    cellProp.value = evaluatedValue;
}
