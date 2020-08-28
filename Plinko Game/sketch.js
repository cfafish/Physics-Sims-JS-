var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    cw = 1800,
    ch = 1200,
    engine,
    world,
    particles = [],
    time = 0,
    plinkos = [],
    cols = 36,
    rows = 6,
    floors = [],
    dividers = [],
    dividerCnt = 20,
    scores = [];

function newParticle(){
    var p = new Particle(random(cw), 10, 12); //random(cw/4, cw*3/4)
    particles.push(p);
    console.log("Made Ball");
}
function plinkoMake(){
    //newParticle();
    var spacing = cw/cols;
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            if(j % 2 == 0)
                var plink = new Plinko(spacing/2 + i*spacing, j*1.2*spacing + 100, 5);
            else
                var plink = new Plinko(i*spacing, j*1.2*spacing + 100, 5);
            plinkos.push(plink);
        }
    }
}

function score(){
    this.count = 0;
    this.n;
    this.show = function(x, c){
        this.x = x;
        this.c = c;
        //this.n = n;
        fill(this.c);
        noStroke();
        text("Bin " + (this.n + 1) +": " + this.count, this.x, 10);

    }

}

function dividerMake(){
    var spacing = cw/(dividerCnt - 1);
    for(var i = 0; i < dividerCnt; i++){
        var div = new Ground(i*spacing, ch, 8, 240);
        dividers.push(div);
        if(floors.length < dividerCnt){
            var fl = new Ground(i*spacing + spacing/2, ch, spacing, 40);
            floors.push(fl);
        }
    }
}

function setup(){
    createCanvas(cw, ch);
    frameRate(60);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    world.gravity.y = .8;

    plinkoMake();
    //floor = new Ground(cw/2, ch, cw, 40);
    dividerMake();
    for(var i = 0; i < floors.length; i++){
        var sc = new score();
        scores.push(sc);
        scores[i].n = i;
    }
}

function draw(){
    background(250);
    Engine.update(engine);
    //console.log(time);

    if (frameCount % 6 == 0 && particles.length < 80){
        newParticle();    

        //time++;
    }

    for (var i = 0; i < particles.length; i++){
        if(particles[i].pos.y > (ch - dividers[0].h/2)){
            for(var j = 0; j < floors.length; j++){
                if( (particles[i].pos.x > (floors[j].x - floors[j].w/2)) && (particles[i].pos.x < (floors[j].x + floors[j].w/2))){
                   particles[i].c = floors[j].c;
                   particles[i].bucket = j;
                   break;
                }
                else
                    particles[i].bucket = null;
            }
        }
    
        if(particles[i].bucket != null){
            scores[particles[i].bucket].count++;
        }
        particles[i].show();

        if(particles[i].pos.y > ch || particles[i].pos.x < -28 || particles[i].pos.x > cw){
            particles[i].removeBody();
            particles.splice(i, 1);
            //console.log("removed Body");
        }
    }
    for (var i = 0; i < plinkos.length; i++){
        plinkos[i].show();
    }
    for (var i = 0; i < dividers.length; i++){
        var rev = dividers.length - i;
        var tempColor = color(255*(floors[i].x/cw), rev*2, 120);
        dividers[i].c = tempColor;
        dividers[i].show();
        if(i < floors.length){
            floors[i].c = dividers[i].c;
            floors[i].show();
            scores[i].show(floors[i].x - 10, tempColor);
            scores[i].count = 0;
            //console.log("Color: " + dividers[i].c + "\ni: " + i);
        }

    }   
    //floor.show();
    

}
