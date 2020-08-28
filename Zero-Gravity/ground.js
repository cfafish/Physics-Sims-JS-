function Ground(x, y, w, h, a){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.a = a;
	//this.t = t;

	if(this.a == null)
		this.a = 0;
	//if (this.t == null)
		//this.t = 0;

	var options = {
		isStatic: true,
		friction: 0.0,
		restitution: 1.1,
		frictionAir: 0,
		frictionStatic: .000,
		//slop: .0,
		frictionAir: 0,
		//density: .05
		//angle: this.a
	}
	
	this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options);
	//this.body.motion = 1;
	World.add(world, this.body);
	//if(this.a != 0){
		//Body.rotate(this.body, radians(1));
	//}

	this.show = function(r, g, b){
		//if(this.a != 0){
			//Body.setAngle(this.body, this.body.angle+radians(0));
		//}
		var pos = this.body.position;
		var angle = this.body.angle;
		this.a = angle;

		push();
		stroke(0);
		translate(this.x, this.y);
		//rotate(this.a);
		fill(r, g, b);
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