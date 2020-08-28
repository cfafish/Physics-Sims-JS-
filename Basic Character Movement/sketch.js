// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    cw = 2000,
    ch = 600,
    mainChar,
    clickCnt = 0,
    ground,
    moveCont = 1;


function setup() {
    createCanvas(cw, ch);
    frameRate(60);

    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    world.gravity.y = 1;

    ground = new Boundary(cw/2, ch, cw, 40);

}

function mousePressed(){
    if (clickCnt < 1){
        mainChar = new Character(mouseX, mouseY, 10, 10);
        clickCnt++;
    }
    else{
        
    }
}

function keyPressed(){
    if(key === ' '){
        mainChar.jump();
    }
    else if (keyCode === RIGHT_ARROW){
        mainChar.moveCond = true;
        mainChar.dir = 1;
    }
    else if (keyCode === LEFT_ARROW){
        mainChar.moveCond = true;
        mainChar.dir = -1;
    }
}

function keyReleased(){
    if (key != ' '){
        mainChar.moveCond = false;
        moveCont = 0;
        console.log(mainChar.body.velocity);  
    }
}


function draw() {
    background(40);
    Engine.update(engine);

    if(clickCnt > 0){
        mainChar.show();
        mainChar.move();

    }
    ground.show();

}
/*Resizing window/canvas:

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 100, 200);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

*/