function Fixed(bodA, bodB, stif){

	l = abs(bodB.pos.x - bodA.pos.x);

	var options = {
        bodyA: bodA.body,
        bodyB: bodB.body,
        length: l,
        stiffness: stif,
        collisionFilter: 1
        //damping: .3
    }

    var cons = Constraint.create(options);
    World.add(world, cons);

    this.show = function(bodAUpdate, bodBUpdate){
    	stroke(255);
    	line(bodAUpdate.pos.x, bodAUpdate.pos.y, bodBUpdate.pos.x, bodBUpdate.pos.y);

    }


}
