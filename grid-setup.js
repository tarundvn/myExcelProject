const rowbar = document.querySelector(".row-cont");
const colbar = document.querySelector(".col-cont");
const grid = document.querySelector(".grid");
const addressBar = document.querySelector(".address-bar");

for(let i = 1; i <= 100; i++)
{
    let rowDiv = document.createElement("div");
    rowDiv.innerHTML = i;
    rowDiv.classList.add("rowdiv");
    rowbar.appendChild(rowDiv);
}

for(let i = 1; i <= 26; i++)
{
    let colDiv = document.createElement("div");
    colDiv.classList.add("coldiv");
    colDiv.innerHTML = String.fromCharCode(64 + i);
    colbar.appendChild(colDiv);
}

for(let i = 1; i <= 100; i++)
{
    for(let j = 1; j <= 26; j++)
    {
        let gridDiv = document.createElement("div");
        gridDiv.classList.add("griddiv");
        gridDiv.setAttribute("rid" , i);
        gridDiv.setAttribute("cid" , j);
        gridDiv.setAttribute("contenteditable",true);
        grid.appendChild(gridDiv);
        addEventListener(i, j, gridDiv);
    }
}

function addEventListener(rowId, colId, gridDiv)
{
    gridDiv.addEventListener("click", function() {
        addressBar.value = String.fromCharCode(64 + colId) + rowId;
    });
}