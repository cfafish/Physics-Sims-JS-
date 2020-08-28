function setup() {
   createCanvas(1000, 1000, WEBGL);
   camera(0, -30, 100, 0, 0, 0, 0, 1, 0);
   normalMaterial();
   debugMode();
 }
function draw() {
   background(200);
   orbitControl();
   box(150, 300);
   // Press the spacebar to turn debugMode off!
   if (keyIsDown(32)) {
     noDebugMode();
   }
}