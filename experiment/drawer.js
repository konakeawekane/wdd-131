/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("displayCanvas");
const draw = canvas.getContext("2d");

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

let pen = {
    x: 0,
    y: 0,
    dir: 0
}

setInterval(drawImage, 33);

function drawImage(){
    instructions.forEach(inst => {
    run(inst);
    });
}

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