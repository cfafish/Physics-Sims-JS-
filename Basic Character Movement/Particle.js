function Character(x, y, w, h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.moveCond = false;
	this.dir;

	this.c = 255;
	var options = {
		friction: .3,
		density: .003,

	}

	this.body = Bodies.circle(this.x, this.y, this.w, options);
	World.add(world, this.body);






	this.show = function(){

		this.pos = this.body.position;
		this.ang = this.body.angle;

		
		push();
		translate(this.pos.x, this.pos.y);
		rectMode(CENTER);
		fill(this.c);
		stroke(0);
		ellipse(0, 0, this.w*2, 2*this.h);
		pop();


	}

	this.move = function(){
		if(abs(this.body.velocity.x) < 5 && this.moveCond){
			Body.applyForce(this.body, {x: this.pos.x, y: this.pos.y}, {x: .003*this.dir, y: -.0});
		}
		
	}
	this.jump = function(){
		if(this.body.velocity.y < 1){
			Body.applyForce(this.body, {x: this.pos.x, y: this.pos.y}, {x: 0, y: -.006});
		}
	}

}