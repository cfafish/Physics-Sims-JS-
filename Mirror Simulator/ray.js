class Ray{
	constructor(pos, angle){
		this.pos = pos;
		this.angle = angle;
		this.end = p5.Vector.fromAngle(radians(angle));
		this.close = null;
		//this.end = createVector(cos(this.dir),- sin(this.dir));

	}

	show(pnt){
		//var angles = radians(ang);
		
		push();
		strokeWeight(1);
		//stroke((this.pos.x + this.pos.y)/10, this.pos.y * (255/1000), this.pos.x * (255/1000));
		stroke(255, 50, 50);
    	if (pnt){
    		line(this.pos.x, this.pos.y, pnt.x, pnt.y);
    	}
    	
    	else{
    		translate(this.pos.x, this.pos.y);
    		line(0, 0, this.end.x * 1000, this.end.y * 1000);
    	}

    	pop();
	}


	cast(wall) {
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.end.x;
    const y4 = this.pos.y + this.end.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den == 0) {
      return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (t > 0 && t < 1 && u > 0) {
      const pt = createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    } else {
      return;
    }
  }
}