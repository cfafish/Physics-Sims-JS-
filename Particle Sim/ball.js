class bouncy{
	constructor(pos, vel, radius){
		this.pos = pos;
		this.vel = vel;
		this.rad = radius;
		this.mass = this.rad * this.rad;
		this.infected = false;
	}
	
	show(){
		this.trad = this.rad;
		this.travel();
		if (this.infected)
			fill(1);
		else
			fill(255);
		ellipse(this.pos.x, this.pos.y, this.trad, this.trad);
		noStroke();
	}
	
	travel(){
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
	}
	
	
	
	
}