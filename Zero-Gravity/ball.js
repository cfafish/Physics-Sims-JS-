function Balls(x, y, r){
	//this.vel: {x: 15, y: .2};
	var options = {
		friction: 0.0,
		restitution: 1.1,
		frictionAir: 0,
		frictionStatic: .00,
		density:.1,
		//slop: .0
		//velocity: { x: 5, y: 1}
	}	

	//this.body = Bodies.circle(x, y, r, options);
	this.body = Bodies.rectangle(x, y, r, r, options);
	this.x = x;
	this.y = y;
	//this.r = r*2;
	World.add(world, this.body);
	Body.setVelocity(this.body, {x: random(-4, 4), y: random(-4, 4)});
	this.pos = this.body.position;

	//console.log(this.body);

	this.show = function(){
		var pos = this.body.position;
		var angle = this.body.angle;

		//console.log(this.body.velocity);
		push();
		translate(pos.x, pos.y);
		rotate(angle);
		rectMode(CENTER);
		strokeWeight(1);
		stroke(255);
		fill(127);
		rect(0, 0, r, r);
		//ellipse(0, 0, this.r);
		pop();
	}
	this.removeBody = function(){
		World.remove(world, this.body);
		
	}
}