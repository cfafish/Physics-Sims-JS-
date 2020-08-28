function Plinko(x, y, r){
	
	var options = {
		isStatic: true,
		friction: .1,
		restitution: .8,

	}

	this.body = Bodies.circle(x, y, r, options);
	this.r = r;
	World.add(world, this.body);
}

Plinko.prototype.show = function(){

	push();
	fill(252, 255, 61);
	stroke(0);
	var pos = this.body.position;
	translate(pos.x, pos.y);
	ellipse(0, 0, this.r*2);
	pop();

}