function Particle(x, y, w, h, still){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.moveCond = false;
	this.dir;
	var velMax = 0;

	this.c = color(0, 50, 255);
	var options = {
		isStatic: still,
		friction: 0,
		density: .004,
		restitution: 1,
		frictionAir: 0,
		collisionFilter: -1
	}

	this.body = Bodies.circle(this.x, this.y, this.w, options);
	World.add(world, this.body);
	this.pos = this.body.position;
	this.ang = this.body.angle;

	this.show = function(){

		this.pos = this.body.position;
		this.ang = this.body.angle;
		this.vel = Matter.Vector.magnitude(this.body.velocity);
		//var velMax = 0;
		if(this.vel > velMax){
			velMax = this.vel;
		}
		if (this.vel != 0)
			this.c = color((this.vel/velMax)*255, 40, (255)*(1 - (this.vel/velMax)));

		
		push();
		translate(this.pos.x, this.pos.y);
		rectMode(CENTER);
		fill(this.c);
		stroke(0);
		ellipse(0, 0, this.w*2, 2*this.h);
		line(0, 0, this.w, 0);
		pop();


	}

	/*this.move = function(){
		if(abs(this.body.velocity.x) < 5 && this.moveCond){
			Body.applyForce(this.body, {x: this.pos.x, y: this.pos.y}, {x: .003*this.dir, y: -.0});
		}
		
	}
	this.jump = function(){
		if(this.body.velocity.y < 1){
			Body.applyForce(this.body, {x: this.pos.x, y: this.pos.y}, {x: 0, y: -.006});
		}
	}*/

}