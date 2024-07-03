const gridContainer = document.querySelector("#grid-container");
//section-right
const currentRowsCols = document.querySelector("#current-rows-cols");
const gridSizeBtn = document.querySelector("#grid-size-btn");
const defaultColorBtn = document.querySelector("#default-color-btn");
const rainbowColorBtn = document.querySelector("#rainbow-color-btn");
const hoverToggleBtn = document.querySelector("#hover-toggle-btn");
const clearGridBtn = document.querySelector("#clear-grid-btn");
const eraseToolBtn = document.querySelector("#erase-tool-btn");

const gridSizePopup = document.querySelector("#grid-size-popup");
const gridSizeOptions = document.querySelector("#grid-size-options");
const closePopupBtn = document.querySelector("#close-popup-btn");
const rowsColsVal = document.querySelector("#rows-cols-val");
const rowsColsSubmit = document.querySelector("#rows-cols-submit");
const errorCase = document.querySelector("#error-case");

implementRowsCols(16);

gridSizeBtn.addEventListener("click", () => {
    gridSizePopup.style.display = "block";
});

gridSizePopup.addEventListener("click", e => {
    if(e.target == gridSizePopup && e.target != gridSizeOptions) {
        gridSizePopup.style.display = "none";
    } else if (e.target == closePopupBtn) {
        gridSizePopup.style.display = "none";
    }
});

rowsColsSubmit.addEventListener("click", () => {
    console.log(rowsColsVal.value);
    if(!Number.isInteger(parseInt(rowsColsVal.value)) || rowsColsVal.value <= 0) {
        errorCase.style.display = "block";
    } else if(rowsColsVal.value > 100) {
        errorCase.style.display = "block";
        errorCase.textContent = "Error: Enter a value of 100 or less"
    } else {
        errorCase.style.display = "none";
        implementRowsCols(rowsColsVal.value);
        currentRowsCols.textContent = `${rowsColsVal.value} x ${rowsColsVal.value}`;
    }
});

defaultColorBtn.addEventListener("click", () => {
    if(!defaultColorBtn.classList.contains("selected")) {
        defaultColorBtn.classList.add("selected");
        rainbowColorBtn.classList.remove("selected");
        eraseToolBtn.classList.remove("selected");
    } 
});

rainbowColorBtn.addEventListener("click", () => {
    if(!rainbowColorBtn.classList.contains("selected")) {
        rainbowColorBtn.classList.add("selected");
        defaultColorBtn.classList.remove("selected");
        eraseToolBtn.classList.remove("selected");
    } 
});

clearGridBtn.addEventListener("click", () => {
    const gridSquares = document.querySelectorAll(".square");
    gridSquares.forEach(square => {
        square.style.backgroundColor = "#fff";
    });
});


eraseToolBtn.addEventListener("click", () => {
    if(!eraseToolBtn.classList.contains("selected")) {
        eraseToolBtn.classList.add("selected");
        defaultColorBtn.classList.remove("selected");
        rainbowColorBtn.classList.remove("selected");
    } 
});

function implementRowsCols(value) {
    gridContainer.innerHTML = "";
    for(let rowNum = 0; rowNum < value; rowNum++) {
        const rowContainer = document.createElement("div");
        rowContainer.classList.add("row-container");
        gridContainer.append(rowContainer);
        for(let colNum = 0; colNum < value; colNum++) {
            const square = document.createElement("div");
            square.classList.add("square");
            rowContainer.append(square);
        }
    }

    const gridSquares = document.querySelectorAll(".square");
    hoverActions(gridSquares);
}

hoverToggleBtn.addEventListener("click", () => {
    const gridSquares = document.querySelectorAll(".square");
    hoverActions(gridSquares);
});

function hoverActions(gridSquares) {
    let mouseAction = "";
        if(hoverToggleBtn.textContent == "Hover: On") {
            hoverToggleBtn.textContent = "Hover: Off";
            mouseAction = "mouseover";
        } else if (hoverToggleBtn.textContent == "Hover: Off") {
            hoverToggleBtn.textContent = "Hover: On";
            mouseAction = "mousedown";
        }

    gridSquares.forEach(square => {
        square.addEventListener(mouseAction, e => {
        console.log(mouseAction);
            if(rainbowColorBtn.classList.contains("selected")) {
                let rgbVal1 = Math.floor(Math.random() * (255 + 1));
                let rgbVal2 = Math.floor(Math.random() * (255 + 1));
                let rgbVal3 = Math.floor(Math.random() * (255 + 1));
                e.target.style.backgroundColor = `rgb(${rgbVal1}, ${rgbVal2}, ${rgbVal3})`;
            } else if (defaultColorBtn.classList.contains("selected")) {
                e.target.style.backgroundColor = "#000";
            } else if (eraseToolBtn.classList.contains("selected")) {
                e.target.style.backgroundColor = "#fff";
            }
        });
    });
}









