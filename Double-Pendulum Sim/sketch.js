// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    cw = 1200,
    ch = 1287,
    boundaries = [],
    particles = [],
    particleCount = 3,
    constraints = [],
    constraintStiff = .9,
    mConstr,
    points = [],
    FR = 60;

function makeBodies(){
    for(var i = 0; i < particleCount; i++){
        if(i == 0)
            var ball = new Particle(cw/2, ch/2, 10, 10, true);
        else
            var ball = new Particle(cw/2 + (cw/1.5)*(i/(particleCount)), ch/2 - 140, 10, 10, false);
        particles.push(ball);
        if (i > 0){
            var constrain = new Fixed(particles[i-1], particles[i], constraintStiff);
            constraints.push(constrain);
        }
    }
}

function setup() {
	var canvas = createCanvas(cw, ch);
    frameRate(180);

    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    world.gravity.y = .02;
    engine.timing.timeScale = 1;

    var canvasMouse = Mouse.create(canvas.elt);
    var options = {
        mouse: canvasMouse,

    }
    mConstr = MouseConstraint.create(engine, options);
    World.add(world, mConstr);

    var ground = new Boundary(cw/2, ch, cw, 40);
    boundaries.push(ground);
    makeBodies();
    
}

function draw() {
    if (frameCount % 30 == 0)
        FR = 100*(frameRate()/60)
   
    background(FR)
	
    fill(200);
    noStroke();
    text("Frame count: " + frameCount + "\nFrame rate: " + frameRate(), 50, 50);
    for(var i = 0; i < particles.length; i++){
        if(i < constraints.length){
            constraints[i].show(particles[i], particles[i+1]);        
        }
        particles[i].show();
    }
    
    boundaries[0].show();
    //if(frameCount % 3 == 0)
    points.push(createVector(particles[particles.length - 1].pos.x, particles[particles.length - 1].pos.y));
    //pointCnt++;
    for(var i = 0; i < points.length; i++){
        stroke(200, 180, 250*(i/points.length), 180*i/points.length+70);
        line(points[i].x, points[i].y, points[i].x + 1, points[i].y + 1);
    }
   // if(frameCount % 120 == 0){
        //world.gravity.y *= -1;
        //console.log(frameRate());

    //}
}