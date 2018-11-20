// setTimeout(function(){
//     alert("Hello");
// }, 1000)

// setTimeout( () => {alert("Hi again")}, 3000)
const containerEl = document.querySelector(".container");

function createCanvas (w, h) {
    containerEl.innerHTML += "<h1>testing</h1>";
    containerEl.innerHTML += `<canvas width="w" height="h"></canvas>`;
}

function createButton(name){
    containerEl.innerHTML += `<button>${name}</button>`;
}


function setup(){
    createCanvas(600, 400);
    //background(200);
    let button = createButton("press");
    //button.mousePressed(() => background(random(255)));
    
    
}

setup();


