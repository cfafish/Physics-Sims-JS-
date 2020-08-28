// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Vector = Matter.Vector,
    boxes = [],
    ground1,
    canvasWidth = 800,
    canvasHeight = 800,
    count = 0,
    wallR,
    wallL,
    boundary = [],
    balls = [],
    ceiling,
    boundaryCount = 4,
    ballCount = 1,
    theta = .2,
    totalAng,
    tempWall = 20;

// create an engine
/*var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});*/

var world;
var engine;
//var boxA = Bodies.rectangle(200, 100, 80 , 80);

function setup() {
	createCanvas(canvasWidth, canvasHeight);
	frameRate(240);
	engine = Engine.create();
	world = engine.world;
	//world.gravity.scale = 0.000;
	world.gravity.y = .0;
	Engine.run(engine);
	/*engine.world.bounds.min.x = 0;
	engine.world.bounds.min.y = 0;
	engine.world.bounds.max.x = canvasWidth;
	engine.world.bounds.max.y = canvasHeight;*/

	//Walls & such...
	ground1 = new Ground(canvasWidth/2, canvasHeight, canvasWidth - tempWall, tempWall);
	wallL = new Ground(0, canvasHeight/2, tempWall, canvasHeight - tempWall);
	wallR = new Ground(canvasWidth, canvasHeight/2, tempWall, canvasHeight - tempWall);
	ceiling = new Ground(canvasWidth/2, 0, canvasWidth - tempWall, tempWall)
	//boundaryCreation(boundaryCount);
	ballCreation(ballCount);
	//....
	theta = radians(theta);
}

function boundaryCreation(n){
	var boundaryCnt = n;
	for(var i = 0; i < boundaryCnt; i++){
		boundary[i] = new Ground(canvasWidth*i/boundaryCnt, random(canvasHeight), canvasWidth/5, 10, radians(random(90)));
		//boundary[i].body.torque = .5;
	}
	console.log(boundary[0]);
}

function ballCreation(n){
	var ballCnt = n;
	for(var i = 0; i < ballCnt; i++){
		balls.push(new Balls(random(canvasWidth), random(canvasHeight), 40)); //old: canvasWidth/4 + (i * canvasWidth/(ballCnt*2)), 20, random(50, 55))
	}
}



//........Add Bodies to Draw and World
function mouseDragged(){
	balls.push(new Balls(mouseX, mouseY, random(30, 80)));
	//boxes.push(new Boxs(mouseX, mouseY, random(20)+5, random(20)+5));
}

//........Clear World and Draw of Bodies/Boxes
function keyPressed (){
	if(key == ' '){
		for(var i = 0; i < balls.length; i++){
			balls [i].removeBody();
		}
		while(balls.length > 0){
			balls.pop();
			console.log("Body Removed: ");
		}
		console.log("New Set: ");

		for(var i = 0; i < boundaryCount; i++){

			boundary[i].removeBody();
		}
		//boundaryCreation(boundaryCount);
		ballCreation(ballCount);
	}
	//boundary[0].body.velocity.x = 1;
}

function draw() {
	background(51);
	//let totalVel = createVector(0,0);
	//totalAng = 0;

	for(var i = 0; i < balls.length; i++){
		balls[i].show();
		//totalAng += balls[i].body.angularVelocity;
		//totalVel.x += balls[i].body.velocity.x;
		//totalVel.y += balls[i].body.velocity.y;
		
		
		//Removes Boxes who leave the canvas
		if(balls[i].pos.y > canvasHeight || balls[i].pos.x < -28 || balls[i].pos.x > canvasWidth){
			balls.splice(i, 1);
		}
	}
	ground1.show(200, 120, 120);
	wallL.show(200, 120, 120);
	wallR.show(200, 120, 120);
	ceiling.show(200, 120, 120);
	Engine.update(engine);
	//if (frameCount % 120 == 0){
		//console.log("Total Velocity: " + totalVel.mag() + "\nTotal Angular Vel.: " + totalAng + "\nBox Number(should be 20): " + balls.length);
	//}
	//for(var i = 0; i < boundaryCount; i++){
		//boundary[i].show(250, 250, 250);
		//boundary[i].body.rotate(boundary[i].body, radians(.2), {x: boundary[i].body.position.x, y: boundary[i].body.position.y});
		//boundary[i].torque = th;
	//}
}
