// Constructing a Container "sheetDb" to store values of different properties of each cell

let allsheetsDb = [];
let sheetDb = [];

{
    let sheetButton = document.querySelector(".sheet-add-icon");
    sheetButton.click();
}

// for(let i = 1; i <= 100; i++)
// {
//     let sheetRow = [];
//     for(let j = 1; j <= 26; j++)
//     {
//         let cell = {
//             bold: false,
//             italic: false,
//             underline: false,
//             alignment: "left",
//             fontFamily: "monospace",
//             fontSize: "14",
//             fontColor: "#000000",
//             BGcolor: "#000000",  // Just for indication purpose,
//             value: 0,
//             formula: "",
//             children: [],
//         };
//         sheetRow.push(cell);
//     }
//     sheetDb.push(sheetRow);
// }

// Selectors for cell properties
const bold = document.querySelector(".bold");
const italic = document.querySelector(".italic");
const underline = document.querySelector(".underline");
const fontSize = document.querySelector(".font-size-prop");
const fontFamily = document.querySelector(".font-family-prop");
const fontColor = document.querySelector(".font-color-prop");
const BGcolor = document.querySelector(".BGcolor-prop");
const alignment = document.querySelectorAll(".alignment");
const leftAlign = alignment[0];
const centerAlign = alignment[1];
const rightAlign = alignment[2];

// Colours for Bold,Italic,UnderLine,Alignments
let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

// Function to return cell and cell prop container
function getCellAndCellProp(address) {
    let rid = Number(address.slice(1));
    let cid = Number(address.charCodeAt(0)) - 64;
    let cell = document.querySelector(`.griddiv[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDb[rid - 1][cid - 1];
    return [cell, cellProp];
}

// Adding event listeners to Bold, Italic, Underline, Alignment, Font-Family, Font-Size, Cell-fontColor, Cell-BGcolor

bold.addEventListener("click", function() {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);
    // Modification
    cellProp.bold = !cellProp.bold; // Data change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; // UI change (1)
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp; // UI change (2)
});

italic.addEventListener("click", function() {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modification
    cellProp.italic = !cellProp.italic; // Data change
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; // UI change (1)
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp; // UI change (2)
});

underline.addEventListener("click", function() {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modification
    cellProp.underline = !cellProp.underline; // Data change
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"; // UI change (1)
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp; // UI change (2)
});

fontFamily.addEventListener("change", function() {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modification
    cellProp.fontFamily = fontFamily.value; // Data change
    cell.style.fontFamily = cellProp.fontFamily; // UI Change 
});

fontSize.addEventListener("change", function() {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modification
    cellProp.fontSize = fontSize.value; // Data change
    cell.style.fontSize = cellProp.fontSize + "px"; // UI Change
});

fontColor.addEventListener("change", function() {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modification
    cellProp.fontColor = fontColor.value; // Data change
    cell.style.color = cellProp.fontColor; // UI Change
});

BGcolor.addEventListener("change", function() {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modification
    cellProp.BGcolor = BGcolor.value; // Data change
    cell.style.backgroundColor = cellProp.BGcolor; // UI Change
});

for(let i = 0; i < 3; i++)
{
    alignment[i].addEventListener("click", function()
    {
        let address = addressBar.value;
        let [cell, cellProp] = getCellAndCellProp(address);

        // Modification
        cellProp.alignment = alignment[i].classList[0]; // Data change
        cell.style.textAlign = cellProp.alignment; // UI Change (1)
        switch(cell.style.textAlign) { // UI change (2)
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
    });
}

// Adding Event Listeners to each cell

let allCells = document.querySelectorAll(".griddiv");
for (let i = 0; i < allCells.length;i++) {

    allCells[i].addEventListener("click", function() {
        let address = addressBar.value;
        let [cell, cellProp] = getCellAndCellProp(address);
        
        // Apply cell Properties
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor === "#000000" ? "transparent" : cellProp.BGcolor;
        cell.style.textAlign = cellProp.alignment;
        if(cellProp.value != 0)
            cell.innerText = cellProp.value;
        else
            cell.innerText = "";

        // Apply properties UI Props container
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontColor.value = cellProp.fontColor;
        BGcolor.value = cellProp.BGcolor;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        switch(cellProp.alignment) {
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
    });
}