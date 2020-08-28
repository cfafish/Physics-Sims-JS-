function Boundary(x, y, w, h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.c = 150;

	var options ={
		isStatic: true,
	}
	this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options);
	World.add(world, this.body);
	this.pos = this.body.position;
	this.ang = this.body.angle;


	this.show = function(){
		this.pos = this.body.position;
		this.ang = this.body.angle;

		push();
		translate(this.pos.x, this.pos.y);
		rectMode(CENTER);
		fill(this.c);
		stroke(0);
		rect(0, 0, this.w, this.h);
		pop();

	}

}