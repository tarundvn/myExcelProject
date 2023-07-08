let sheetButton = document.querySelector(".sheet-add-icon");
sheetButton.addEventListener("click", function () {
  let div = document.createElement("div");
  div.setAttribute("class", "sheet");
  let sheetFolder = document.querySelector(".sheet-folder");
  let sheet = document.querySelectorAll(".sheet");
  div.setAttribute("id", sheet.length);
  div.innerText = "Sheet" + (sheet.length + 1);
  sheetFolder.appendChild(div);
  createGraph();
  createSheet();
  createIndegree();
  handleSheet(div);
  div.click();
  handleSheetUI(div);
  removeSheet(div);
});

function removeSheet(div)
{
  div.addEventListener("dblclick", function()
  {
    let idx = div.getAttribute("id");
    console.log(idx);
    if(allsheetsDb.length == 1)
      alert("Minimum 1 sheet Must be present in Excel");
    if (allsheetsDb.length > 1) {
      allsheetsDb.splice(idx, 1);
      allgraphs.splice(idx, 1);
      allindegrees.splice(idx, 1);
      div.remove();
      let sheet1 = document.querySelector(".sheet");
      sheet1.click();
    }  
  });
}

function handleSheetDb(idx) {
  sheetDb = allsheetsDb[idx];
  graph = allgraphs[idx];
  indegree = allindegrees[idx];
}

function handleSheetUI(div)
{
  let allsheets = document.querySelectorAll(".sheet");
  for(let i = 0; i < allsheets.length; i++)
  {
    allsheets[i].style.backgroundColor = "#ecf0f1";
  }
  div.style.backgroundColor = "#c1d6dc";
}

function handleSheet(div) {
  div.addEventListener("click", function () {
    let idx = div.getAttribute("id");
    handleSheetDb(idx);
    handleSheetProperties();
    handleSheetUI(div);
  });
}

function handleSheetProperties() {
  for (let i = 1; i <= 100; i++) {
    for (let j = 1; j <= 26; j++) {
      let cell = document.querySelector(`.griddiv[rid="${i}"][cid="${j}"]`);
      cell.click();
    }
  }
  let firstCell = document.querySelector(".griddiv");
  firstCell.click();
}

function createSheet() {
  let sheetDb = [];
  for (let i = 1; i <= 100; i++) {
    let sheetRow = [];
    for (let j = 1; j <= 26; j++) {
      let cell = {
        bold: false,
        italic: false,
        underline: false,
        alignment: "left",
        fontFamily: "monospace",
        fontSize: "14",
        fontColor: "#000000",
        BGcolor: "#000000", // Just for indication purpose,
        value: 0,
        formula: "",
        children: [],
      };
      sheetRow.push(cell);
    }
    sheetDb.push(sheetRow);
  }
  allsheetsDb.push(sheetDb);
}

function createGraph() {
  let graph = [];
  for (let i = 1; i <= 100; i++) {
    let row = [];
    for (let j = 1; j <= 26; j++) {
      let col = [];
      row.push(col);
    }
    graph.push(row);
  }
  allgraphs.push(graph);
}

function createIndegree() {
  let indegree = [];
  for (let i = 0; i < 100; i++) {
    indegree[i] = [];
    for (let j = 0; j < 26; j++) {
      indegree[i][j] = 0;
    }
  }  
  allindegrees.push(indegree);
}