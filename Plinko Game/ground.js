function Ground(x, y, w, h){

	//if(this.a == null)
	//	this.a = 0;
	//if (this.t == null)
		//this.t = 0;
	let c = color(0);
	this.c = c;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.ballCnt;
	var options = {
		isStatic: true,
		friction: .05,
		restitution: .2,
		//angle: this.a
	}
	
	this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options);
	//this.body.motion = 1;
	World.add(world, this.body);

	this.show = function(){
		this.pos = this.body.position;
		this.angle = this.body.angle;
		//this.body.angle = this.a;
		push();
		//stroke(0);
		noStroke();
		translate(this.x, this.y);
		//rotate(this.a);
		fill(this.c);
		strokeWeight(1);
		rectMode(CENTER);
		rect(0, 0, this.w, this.h);
		pop();

		//console.log(this.body.torque);
	}

	this.removeBody = function(){
		World.remove(world, this.body);
		
	}

}