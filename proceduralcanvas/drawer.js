/** @type {HTMLCanvasElement} */ //Used this to fix the Javascript checker to include canvas methods

// page variables
const canvas = document.getElementById("displayCanvas");
const draw = canvas.getContext("2d");
let redrawMode = "on change";
let pageDarkMode = false;

let instructions = [
    {
        type: "repeat",
        id: 1,
        number: 3,
        value: 8
    },
    {
        type: "set x",
        value: 200
    },
    {
        type: "set y",
        value: 200
    },
    {
        type: "clear",
        value: "#ff0000"
    },
    {
        type: "move",
        value: 50,
    },
    {
        type: "turn",
        value: 8,
    },
    {
        type: "move",
        value: 50,
    },
    {
        type: "turn",
        value: -2,
    }
]

// Replace this with the built in canvas pen drawing system
let pen = {
    x: 0,
    y: 0,
    dir: 0
}

// setInterval(drawImage, 33); (30 fps)
// clearInterval(drawImage, 33);

drawImage();

// Interation systems (adding instructions, removing insructions, changing theme, changing rendering mode, saving project, loading project)

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


function promptUploadProject(){
    fileUploadInput.click();
}

// stubbed out
function changeRedrawMode(){
    switch(redrawMode){
        case "on change":
            break;
        case "3 times a second":
            break;
        case "30 times a second":
            break;
        case "60 times a second":
            break;
        case "off":
            break;
        default:  // this should never be true
            console.log("Invalid Redraw Mode Detected");
            redrawMode = "on change";
            break;
    }
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

// implemented
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

// implemented
function loadProject(e){  // used modzilla to understand how to prompt and upload files

    const file = e.target.files[0];
    if (file) {
        reader.readAsText(file);
    }
}

// implemented
function onLoad(e){  // used modzilla
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

// implemented
function drawImage(){
    instructions.forEach(inst => {
    console.log(inst);
    run(inst);
    });
}

// incomplete
function run(inst){
    switch(inst.type){
        case("clear"):
            draw.fillStyle = inst.value;
            draw.fillRect(0,0,400,400);
            break;
        case("set x"):
            pen.x = inst.value;
            break;
        case("set y"):
            pen.y = inst.value;
            break;
        case("move"):
            draw.beginPath();
            draw.moveTo(pen.x, pen.y);
            pen.x = pen.x + Math.cos(pen.dir * Math.PI / 180) * inst.value;
            pen.y = pen.y + Math.sin(pen.dir * Math.PI / 180) * inst.value;
            draw.lineTo(pen.x, pen.y);
            draw.stroke();
            break;
        case("repeat"):
            let start = instructions.findIndex(check => check.id === inst.id) + 1;
            for(let n = 0; n < inst.value; n++){
                for(let i = start; i < start + inst.number - 1; i++){
                    run(instructions[i]);
                }
            }
            break;
        case("turn"):
            pen.dir += inst.value;
            break;
        default:
            console.log(`Error: unknown instruction - ${inst.type}`);
            break;
    }
}

