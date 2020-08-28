const w = 800;
const h = 800;
var balls = [];
var count = 50;
var tempRad = 15;
var posVector = [];
var velVector = [];
var maxSpeed = 2;
//tempBall = createVector();
var ballStart;
var ballEnd;
var infectedCount = 0;
//var bounceVel = createVector();

function wall(){
	this.start = 100;
	this.end = 700;
	
	this.show = function(){
		stroke(250, 100, 100);
		line(this.start, this.start, this.start, this.end);
		line(this.start, this.end, this.end, this.end);
		line(this.end, this.end, this.end, this.start);
		line(this.end, this.start, this.start, this.start);
	}
}

function bounceOne(bO, bT){
	var newOne = createVector();
	var m1 = bO.mass; var m2 = bT.mass;
	var v1 = bO.vel; var v2 = bT.vel;
	newOne.x = (((m1 * v1.x) - (m2 * v1.x) + (2 * m2 * v2.x))/(m1 + m2));
	newOne.y = (((m1 * v1.y) - (m2 * v1.y) + (2 * m2 * v2.y))/(m1 + m2));
	//newOne = v2;
	return newOne;
}

function bounceTwo(bO, bT){
	var newTwo = createVector();
	var m1 = bO.mass; var m2 = bT.mass;
	var v1 = bO.vel; var v2 = bT.vel;
	newTwo.x = ((2 * m1 * v1.x - m1 * v2.x + m2 * v2.x)/(m1 + m2));
	newTwo.y = ((2 * m1 * v1.y - m1 * v2.y + m2 * v2.y)/(m1 + m2));
	
	//newTwo = v1;
	return newTwo;
}

function setup() {
	createCanvas(w, h);
	frameRate(200);
	tempBall = createVector();
	border = new wall();
	//ballStart = (tempRad + border.start);
	//ballEnd = 	(border.end - border.start - (2 * tempRad));
	var randomRad;
	
	//test for big ------------------------
	/*
	var testPos = createVector();
	testPos.x = 400;
	testPos.y = 400;
	var testVel = createVector();
	testVel.x = 7;
	testVel.y = 5;
	var testRad = 60;

	balls[0] = new bouncy(testPos, testVel, testRad);	
	*/
	//end test------------------------------
		
	for(var i = 0; i < count; i++){
		randomRad = random(tempRad/2) + (tempRad/2);
		ballStart = (randomRad + border.start);
		ballEnd = 	(border.end - border.start - (2 * randomRad));
		
		posVector[i] = createVector();
		posVector[i].x = ((ballStart) + floor(random(1) * (ballEnd)));
		posVector[i].y = ((ballStart) + floor(random(1) * (ballEnd)));
		
		velVector[i] = createVector();
		velVector[i].x = random(maxSpeed) - maxSpeed/2; //!!! change to -
		velVector[i].y = random(maxSpeed) - maxSpeed/2;
		
		balls[i] = new bouncy(posVector[i], velVector[i], randomRad);
	}
//balls[1].infected = true;
	balls[0].rad = 30;
	balls[0].infected = true;
  	
}

function draw() {
  background(50);
  border.show();

  for(var i = 0; i < count; i++){
		ballEnd = border.end - balls[i].rad;
		if(!((balls[i].pos.x < ballEnd) && (balls[i].pos.x > ballStart))){
			balls[i].pos.x -= balls[i].vel.x;
			balls[i].pos.y -= balls[i].vel.y;
			balls[i].vel.x *= -1;
			//balls[i].show();
		}
		
		else if(!((balls[i].pos.y < ballEnd) && (balls[i].pos.y > ballStart))){
			balls[i].pos.x -= balls[i].vel.x;
			balls[i].pos.y -= balls[i].vel.y;
			balls[i].vel.y *= -1;
			//balls[i].show();
		}
			
		else if(i != (count - 1)){
			for(var j = (i+1); j < (count); j++){
				var sepparation = dist(balls[i].pos.x, balls[i].pos.y, balls[j].pos.x, balls[j].pos.y);			
			
				if ((sepparation) < ((balls[i].rad + balls[j].rad)/2)){
					balls[i].pos.x -= balls[i].vel.x;
					balls[i].pos.y -= balls[i].vel.y;
				
					//var bounceVel = new bouncy(balls[j].pos, balls[j].vel, balls[j].rad);
	  				var bounceVel = bounceTwo(balls[i], balls[j]);
	  				balls[i].vel = bounceOne(balls[i], balls[j]);
	  				balls[j].vel = bounceVel;


		  			//balls[j].vel = balls[i].vel;
		  			//balls[i].vel = bounceVel;
		  			if((i == 0) && (balls[j].infected == false)){
		  				infectedCount++;
		  				console.log(infectedCount);
		  			}
		  			if(balls[i].infected == true || balls[j].infected == true){
		  				balls[i].infected = true;
		  				balls[j].infected = true;
		  			}

	  				//console.log("collision");
				}
	
			}
			//console.log(balls[i].pos);
			//console.log(balls[i].vel);
			//console.log(balls[i].rad);
			//balls[i].show();
		}
		balls[i].show();
	
		
	}
  
  
}


















