/*

Space Patrol
Nishant Suria
19 April 2022

Took about 6 hours to complete. 
-----------------------------------------------
Points for:
20 # Create new artwork and assets 
20 # Implement mouse control and click to fire
20 # Create smaller, faster spaceship worth more points
10 # Display time remaining in seconds
10 # Create new title screen
05 # Create new tile sprite for the background
05 # Implement a speed increase after 30 seconds
05 # Randomize each spaceship's movement direction
05 # Track high score

*/


// NS DAWN 
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config); 

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
let button, mouseClicked;

//reserve other vars
let remainingTime;
let p1isFiring;


function cl(out_var = "default data") {
    let e = new Error();
    e = e.stack.split("\n")[2].split(":");
    e.pop();
    let output = "line " + String(e.pop()) + " run";
    if (out_var != "default data") {output += " with output " + String(out_var)};
    console.log(output);
    return output
}

let hi_score = 0;