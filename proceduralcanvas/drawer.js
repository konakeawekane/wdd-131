/** @type {HTMLCanvasElement} */ //Used this to fix the Javascript checker to include canvas methods

// page variables
const canvas = document.getElementById("displayCanvas");
const draw = canvas.getContext("2d");
let redrawMode = "on change";
let pageDarkMode = false;
let deleteBtn = document.createElement("button");
let drawX = 0;
let drawY = 0;
let drawDirection = 0;

let instructionsCounter = document.getElementById("instructions");
let redrawModeSetting = document.getElementById("redraw-mode");

let instructionsContainer = document.getElementById("instruction-container");

let instructions = []

// Page systems (changing theme, changing rendering mode, saving project, loading project)

const redrawModeBtn = document.getElementById("redraw-mode-button");
const darkModeBtn = document.getElementById("night-mode-button");
const saveBtn = document.getElementById("save-button");
const loadBtn = document.getElementById("load-button");
const fileUploadInput = document.getElementById("json-upload");
const reader = new FileReader();  // file reader for loading imported projects

redrawModeBtn.addEventListener("click", changeRedrawMode);
darkModeBtn.addEventListener("click", toggleTheme);
saveBtn.addEventListener("click", saveProject);
loadBtn.addEventListener("click", promptUploadProject);
fileUploadInput.addEventListener("change", loadProject);
reader.addEventListener("load", onLoad);
deleteBtn.addEventListener("click", DeleteLastInstruction);

function promptUploadProject(){
    fileUploadInput.click();
}

function changeRedrawMode(){
    switch(redrawMode){
        case "on change":
            clearInterval(drawImage);
            setInterval(drawImage, 333.33);
            redrawMode = "3 times a second";
            break;
        case "3 times a second":
            clearInterval(drawImage);
            setInterval(drawImage, 33.33);
            redrawMode = "30 times a second";
            break;
        case "30 times a second":
            clearInterval(drawImage);
            setInterval(drawImage, 16);
            redrawMode = "60 times a second";
            break;
        case "60 times a second":
            clearInterval(drawImage);
            redrawMode = "on change";
            break;
        default:  // this should never be true
            console.log("Invalid Redraw Mode Detected");
            redrawMode = "on change";
            break;
    }
    redrawModeSetting.textContent = redrawMode;
}

// stubbed out
function toggleTheme(){
    if(pageDarkMode){
        // set to light mode
        pageDarkMode = false;
    } else {
        // set to dark mode
        pageDarkMode = true;
    }
}

function saveProject(){  // went to stack overflow to understand how to save files
    const data = JSON.stringify(instructions); 
    const blob = new Blob([data], {type: 'application/json'});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "project.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function loadProject(e){  // used modzilla to understand how to prompt and upload files

    const file = e.target.files[0];
    if (file) {
        reader.readAsText(file);
    }
}

function onLoad(e){  // used modzilla to understand this one
    const fileContent = e.target.result;
    try {
        let uploadedFile = JSON.parse(fileContent);
        if (Array.isArray(uploadedFile)) {
            instructions = uploadedFile;
            console.log("Loaded new project: ");
            console.log(instructions);
        } else {
            alert("Unable to load project.");
        }
    } catch (error) {
        alert("Unable to load project.");
    }
};

// Functional systems (processing instructions rendering output)
Init();

function Init(){
    CreateDefaultDesign();
    drawImage();
}


function drawImage(){
    instructions.forEach(inst => {
        run(inst);
    });
}

// helper functions to help with RGB to Hex
function componentToHex(c) {
  const hex = Number(c).toString(16);
  return hex.padStart(2, "0");
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


function run(inst){
    switch(inst.type){
        case("clear"):
            draw.fillStyle = rgbToHex(inst.r, inst.g, inst.b);
            draw.fillRect(0,0,400,400);
            break;
        case("set x"):
            drawX = Number(inst.value);
            break;
        case("set y"):
            drawY = Number(inst.value);
            break;
        case("set dir"):
            drawDirection = Number(inst.value);
            break;
        case("move"):
            draw.strokeStyle = rgbToHex(inst.r, inst.g, inst.b);
            draw.beginPath();
            draw.moveTo(drawX, drawY);
            let stepX = Math.cos(drawDirection * Math.PI / 180) * Number(inst.value);
            let stepY = Math.sin(drawDirection * Math.PI / 180) * Number(inst.value);
            drawX += stepX;
            drawY += stepY;
            draw.lineTo(drawX, drawY);
            draw.stroke();
            break;
        case("repeat"):
            let start = Math.max(instructions.findIndex((item) => item == inst), 0);
            for(let n = 0; n < inst.repeat; n++){
                for(let i = start; i > 0; i++){
                    run(instructions[i]);
                    console.log(i);
                }
            }
            break;
        case("turn"):
            drawDirection += inst.value;
            break;
        default:
            console.log(`Error: unknown instruction - ${inst.type}`);
            break;
    }
}

// Creative systems (creating and destroying instructions)

const addClearblockBtn = document.getElementById("addClearBlock");
const addLineBlockBtn = document.getElementById("addLineBlock");
const addTurnBlockBtn = document.getElementById("addTurnBlock");
const addRepeatBlockBtn = document.getElementById("addRepeatBlock");
const addXBlockBtn = document.getElementById("addXBlock");
const addYBlockBtn = document.getElementById("addYBlock");
const addDirBlockBtn = document.getElementById("addDirBlock");

addClearblockBtn.addEventListener("click", CreateClearBlock);
addLineBlockBtn.addEventListener("click", CreateLineBlock);
addTurnBlockBtn.addEventListener("click", CreateTurnBlock);
addRepeatBlockBtn.addEventListener("click", CreateRepeatBlock);
addXBlockBtn.addEventListener("click", CreateXBlock);
addYBlockBtn.addEventListener("click", CreateYBlock);
addDirBlockBtn.addEventListener("click", CreateDirBlock);

function CreateClearBlock(){
    instructions.push({
        type: "clear",
        r: 225,
        g: 200,
        b: 150
    });
    RebuildInstructionLayout();
}

function CreateLineBlock(){
    instructions.push({
        type: "move",
        value: 10,
        r: 0,
        g: 0,
        b: 0
    });
    RebuildInstructionLayout();
}

function CreateTurnBlock(){
    instructions.push({
        type: "turn",
        value: 30
    });
    RebuildInstructionLayout();
}

function CreateRepeatBlock(){
    instructions.push({
        type: "repeat",
        jumpUp: 2,
        repeat: 10
    })
    RebuildInstructionLayout();
}

function CreateXBlock(){
    instructions.push({
        type: "set x",
        value: 0
    })
    RebuildInstructionLayout();
}

function CreateYBlock(){
    instructions.push({
        type: "set y",
        value: 0 
    })
    RebuildInstructionLayout();
}

function CreateDirBlock(){
    instructions.push({
        type: "set dir",
        value: 0
    })
    RebuildInstructionLayout();
}

// Graphical systems (Rebuilding page)

function RebuildInstructionLayout(){
    let html = "";

    instructions.forEach((inst) => {
        html += GetInstructionTemplate(inst);
    });

    deleteBtn.classList = "delete-btn";
    deleteBtn.ariaLabel = "delete last block";
    deleteBtn.textContent = "X";

    let deleteBlock = document.createElement("div");
    deleteBlock.classList = "delete-block";
    deleteBlock.ariaLabel = "delete block";

    deleteBlock.appendChild(deleteBtn);
    instructionsContainer.innerHTML = html;
    instructionsContainer.appendChild(deleteBlock);

    instructionsCounter.textContent = instructions.length;

    drawImage()
}

function GetInstructionTemplate(inst){
    document.createElement("button");
    switch (inst.type){
        case "set dir":
            return `
            <div class="dir-block" aria-label="Set direction Block">
                <p class="block-name">Set Direction</p>
                <p class="block-attribute">Angle:</p>
                <input class="block-field" type="number" value="${inst.value}" aria-label="direction input">
            </div>
            `;
        case "set x":
            return `
            <div class="x-block" aria-label="Set x position Block">
                <p class="block-name">Set X</p>
                <p class="block-attribute">Position:</p>
                <input class="block-field" type="number" value="${inst.value}" aria-label="x position input">
            </div>
            `;
        case "set y":
            return `
            <div class="y-block" aria-label="Set y position Block">
                <p class="block-name">Set Y</p>
                <p class="block-attribute">Position:</p>
                <input class="block-field" type="number" value="${inst.value}" aria-label="y position input">
            </div>
            `;
        case "repeat":
            return `
            <div class="repeat-block" aria-label="Repeat Block">
                <p class="block-name">Repeat</p>
                <p class="block-attribute">Starting:</p>
                <input class="block-field" type="number" value="${inst.jumpUp}" aria-label="Blocks above to start from">
                <p class="block-attribute">Repetitions:</p>
                <input class="block-field" type="number" value="${inst.repeat}" aria-label="Repetitions">
            </div>
            `;
        case "turn":
            return `
            <div class="turn-block" aria-label="Turn Block">
                <p class="block-name">Turn</p>
                <p class="block-attribute">Angle:</p>
                <input class="block-field" type="number" value="${inst.value}" aria-label="Angle">
            </div>
            `;
        case "move":
            return `
            <div class="move-block" aria-label="Move forward Block">
                <p class="block-name">Move</p>
                <p class="block-attribute">Distance:</p>
                <input class="block-field" type="number" value="${inst.value}" aria-label="Distance">
                <p class="block-attribute">Color:</p>
                <input class="block-field" type="number" value="${inst.r}" aria-label="Line Color Red Value">
                <input class="block-field" type="number" value="${inst.g}" aria-label="Line Color Green Value">
                <input class="block-field" type="number" value="${inst.b}" aria-label="Line Color Blue Value">
            </div>
            `;
        case "clear":
            return `
            <div class="clear-block" aria-label="Clear Block">
                <p class="block-name" >Clear:</p>
                <p class="block-attribute" aria-label="Color Attribute">Color</p>
                <input class="block-field" type="number" value="${inst.r}" aria-label="Clear Color Red value">
                <input class="block-field" type="number" value="${inst.g}" aria-label="Clear Color Green value">
                <input class="block-field" type="number" value="${inst.b}" aria-label="Clear Color Blue value">
            </div>
            `;
        default:
            console.warn(`Invalid instruction detected: ${inst.type}`)
            return ``;
    }
}

function CreateDefaultDesign(){
    CreateClearBlock();
    CreateXBlock();
    CreateYBlock();
    CreateTurnBlock();
    CreateLineBlock();
}

function DeleteLastInstruction(){
    instructions.pop();
    RebuildInstructionLayout();
    drawImage();
}

function PassEditToSystem(e){
    const targetInput = e.target;
    if (targetInput.type !== 'number') return;

    const parentBlock = targetInput.closest('div');

    const inputsInBlock = Array.from(parentBlock.querySelectorAll('input'));
    const inputIndex = inputsInBlock.indexOf(targetInput);

    const allBlocks = Array.from(instructionsContainer.querySelectorAll('div'));
    const blockIndex = allBlocks.indexOf(parentBlock);

    switch(instructions[blockIndex].type){
        case "clear":
            switch(inputIndex){
                case 0:
                    instructions[blockIndex].r = targetInput.value;
                    break;
                case 1:
                    instructions[blockIndex].g = targetInput.value;
                    break;
                case 2:
                    instructions[blockIndex].b = targetInput.value;
                    break;
            }
            break;
        case "move":
            switch(inputIndex){
                case 0:
                    instructions[blockIndex].value = targetInput.value;
                    break;
                case 1:
                    instructions[blockIndex].r = targetInput.value;
                    break;
                case 2:
                    instructions[blockIndex].g = targetInput.value;
                    break;
                case 3:
                    instructions[blockIndex].b = targetInput.value;
                    break;
            }
            break;
        case "turn":
                instructions[blockIndex].value = targetInput.value;
            break;
        case "set x":
                instructions[blockIndex].value = targetInput.value;
            break;
        case "set y":
                instructions[blockIndex].value = targetInput.value;
            break;
        case "set dir":
                instructions[blockIndex].value = targetInput.value;
            break;
        case "repeat":
            switch(inputIndex){
                case 0:
                    instructions[blockIndex].jumpUp = targetInput.value;
                    break;
                case 1:
                    instructions[blockIndex].repeat = targetInput.value;
                    break;
            }
            break;
        default:
            console.warn("Invalid Edit Detected");
    }

    drawImage();
}

instructionsContainer.addEventListener("input", PassEditToSystem);