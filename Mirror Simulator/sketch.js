const w = 1000;
const h = 1000;
var theta = 50;
var ray = [];
var wall1 = [];
var wallStartX = [];
var wallStartY = [];

var intercept;
var testVector;
var rayIntercept;
var reflection;
var wallCount = 8;
var cursorVector;
var cursorAngle;

function setup() {
	testVector = createVector(50, h/2);
	testVector2 = createVector(w/2, 100);
	testVector3 = createVector (900, h/2);
	createCanvas(w, h);
	frameRate(60);
	for (var i = 0; i < wallCount; i++){
		wallStartX [i] = random(w);
		wallStartY [i] = random(h);
	}
}


function ref(startRay, wall){	//Should return angle?/angle in degrees
	
	return ((2 * wall) - startRay);
}

function rayIntersect(){
	var rayCount = 1;
	ray [0] = new Ray(testVector2, degrees(thirdVector.heading()));
	//ray [1] = new Ray(testVector2, theta+90);
	//ray [2] = new Ray(testVector3, theta + 180);

	for (var j = rayCount; j <= rayCount; j++){
		var closest = null;
		var record = 2000;
		var wallCounter = null;
		var d = record;
		for(var i = 0; i < wallCount; i++){
			var temp = ray[j-1].cast(wall1 [i]);
			//console.log(temp);
			if (temp){
				temp.x = temp.x - cos(radians(ray[j-1].angle));
				temp.y = temp.y - sin(radians(ray[j-1].angle));
				var d = p5.Vector.dist(temp, ray[j-1].pos);
				//console.log(d);
				//console.log((d && (d < record)));
				if(d < record){
					record = d;
					closest = temp;
					wallCounter = i;
				}
			}
		}
		console.log("Closest:" + closest);
		ray[j-1].close = closest;
		if(closest){
			//console.log("Angle of Reflection: " +ref(ray.angle, wall1 [wallCounter].wallAngle))
			ray[j] = new Ray(ray[j-1].close, ref(ray[j-1].angle, wall1 [wallCounter].wallAngle));
  			//ray[j-1].show(ray[j-1].closest);	//have it loop so it can see if it bounces too........
  			rayCount++;
		}
		if (j > 20)
			break;
	}
	while(ray[0]){
		ray[0].show(ray[0].close);
		ray.shift();
	}
	//ray.show(closest);

}

var counter = 0;
function thetaShift(){
	if(theta > 90 || theta < -90)
  		counter++;
  	if(counter % 2 == 0)
  		theta += (.2);
  	else
  		theta -= .2;
}

function wallRotate(){
	//wall1 [0] = new Wall (w/2, h, w, h/2);
	//wall1[1] = new Wall (0, (3/4)*h, w/2, h);
	//wall1 [2] = new Wall (0, h/4, w/3, 0);
	//wall1 [3] = new Wall (10, h/2, 100, 100);
	for (var i = 0; i < wallCount; i++){
		wall1 [i] = new Wall (wallStartX [i], wallStartY [i], 400 * cos(radians(theta * (wallStartX [i] / 100))) + wallStartX [i], wallStartY [i] +  400 * sin(radians(theta * (wallStartX [i] / 100))));
		wall1 [i].show();
	}
}

function cursorPosition(){
	cursorVector = createVector(mouseX, mouseY);
	cursorAngle = degrees(cursorVector.heading());
	thirdVector = createVector(cursorVector.x - testVector2.x, cursorVector.y - testVector2.y);
}

function draw() {
	background (250);
	console.log(theta);
  	//thetaShift();
  	cursorPosition();
  	wallRotate();
  	//wall1.show();
  	rayIntersect();

}


/*To Do:
x Make ray rotate as function of time
x Extend ray further, add onto itself pixel-by-pixel
x Check for Intercept with wall and give feedback if so
x Find the position of the intersection and stop ray at that point
_ Store the end position and the direciton as a vector?
	_Find angle between ray and wall?
	_...
..._ Generate Random walls
_ Ray points towards mouse...
*/