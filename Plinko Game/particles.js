function Particle(x, y, r){
	let c = color(80);
	this.c = c;
	this.bucket = null;

	var options = {
		friction: .1,
		restitution: 1,
		density: .009
	}

	this.body = Bodies.circle(x, y, r, options);
	this.r = r;
	World.add(world, this.body);
	//Body.setVelocity(this.body, {x: 5, y: 0});
	this.pos = this.body.position;
}

Particle.prototype.show = function(){
	push();
	fill(this.c);
	//noStroke();
	stroke(0);
	strokeWeight(.8);
	this.pos = this.body.position;
	translate(this.pos.x, this.pos.y);
	ellipse(0, 0, this.r*2);
	pop();
}

Particle.prototype.removeBody = function(){
	World.remove(world, this.body);
}
