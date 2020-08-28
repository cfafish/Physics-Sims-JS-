class Wall{
	constructor(x1, y1, x2, y2){
		this.a = createVector(x1, y1);
		this.b = createVector(x2, y2);
		this.w = createVector(x2 - x1, y2 - y1);
		this.wallAngle = degrees(atan(this.w.y / this.w.x));
	}

	show(){
		strokeWeight(4);
		stroke(0);

		//modify eventually to make into a rectangle
		line(this.a.x, this.a.y, this.b.x, this.b.y);
	}
}