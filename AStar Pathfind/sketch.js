
function removeFromArray(arr, elt){
	for (var i = arr.length - 1; i >= 0; i--){
		if(arr[i] == elt){
			arr.splice(i, 1);
		}
	}
}


//make the heuristic calculate the number of barriers/open spaces inbetween start and end.
function heuristic(a, b){
	var d = dist(a.i, a.j, b.i, b.j);
	//var d = abs(a.i - b.i) + abs(a.j - b.j);
	return d;
}


var cols = 90;
var rows = 90;
var w, h;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var path = [];
var wallCount = 0;
var noSolution = false;
var correctCount = 0;

//Main Spot object
//----------------------------------------------------------------------------------
function Spot(i, j){
	this.i = i;
	this.j = j;

	this.neighbors = [];	
	this.previous = undefined;
	this.wall = false;
	this.vWall = false;

	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.diagnal = false;

			//% chance there's an obstacle
	if(random(1) < .1){
		this.wall = true;
		wallCount +=1;
	}

	this.show = function(col){
		fill(col);
		if (this.wall && !this.diagnal){
			fill(0);
		}
		noStroke();
		rect(this.i * w, this.j * h, w - 1, h - 1);		

	}

	this.addNeighbors = function(grid){
		var i = this.i;
		var j = this.j;
		if(i < cols-1){
			this.neighbors.push(grid[i+1]  [j]);
		}

		if(i > 0){
			this.neighbors.push(grid[i-1]  [j]);
		}
		if(j < rows-1){
			this.neighbors.push(grid[i]  [j+1]);
		}
		if(j > 0){
			this.neighbors.push(grid[i]  [j-1]);
		}
		if(i > 0 && j > 0){
			this.neighbors.push(grid[i-1][j-1]);
		}
		if(i > cols - 1 && j > 0){
			this.neighbors.push(grid[i+1][j-1]);
		}
		if(i > 0 && j < rows - 1){
			this.neighbors.push(grid[i-1][j+1]);
		}
		if(i < cols - 1 && j < rows - 1){
			this.neighbors.push(grid[i+1][j+1]);
		}
	}

}

//p5 Setup function
//------------------------------------------------------------------------------------
function setup() {
	createCanvas(900, 900);
	w = width/cols;
	h = height/rows;
	console.log('A*');

	for (var i = 0; i < cols; i++){
		grid[i] = new Array(rows);
	}
	
	for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++){
			grid[i] [j] = new Spot(i, j);
		}
	}

	for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++){
			grid[i] [j].addNeighbors(grid);
		}
	}
	//Doesn't allow Diagnals
		for (var i = 1; i < cols-1; i++){
			for (var j = 1; j < rows-1; j++){
			if(grid[i+1][j].wall && grid[i][j+1].wall){
				grid[i+1][j+1].vWall =true;
				grid[i+1][j+1].diagnal =true;
			}

			if(grid[i+1][j].wall && grid[i][j-1].wall){
				grid[i+1][j-1].vWall =true;
				grid[i+1][j-1].diagnal =true;
			}

			if(grid[i][j-1].wall && grid[i-1][j].wall){
				grid[i-1][j-1].vWall =true;
				grid[i-1][j-1].diagnal =true;
			}

			if(grid[i-1][j].wall && grid[i][j+1].wall){
				grid[i-1][j+1].vWall = true;
				grid[i-1][j+1].diagnal = true;
			}
		}
	}


	start = grid[0][0];
	end = grid[cols -1][rows -1];
	start.wall = false;
	end.wall = false;
	for(var i = 1; i < 4; i++){
		grid[i][i].wall = false;
		grid[cols - i] [rows - i].wall = false
	}

	openSet.push(start);



	//console.log(grid);
}

//p5 Draw function	
//------------------------------------------------------------------------------------

//NEW TASK: Make diagnal moves in between obstacles invalid!

var t0 = performance.now();
function draw() {

	if(openSet.length > 0){
		//keep going
		var winner = 0;
		for(var i = 0; i < openSet.length; i++){
			if(openSet[i].f < openSet[winner].f){
				winner = i;
			}
		}

		var current = openSet[winner];
		if(current == end){
			noLoop();
			console.log("Done!");
			var t1 = performance.now();
			console.log("Search took " + (t1 - t0)/1000 + " seconds for a "+rows+" by "+cols+" grid with "+wallCount+" obstacles.")
			console.log(path.length + 1);
		}


		removeFromArray(openSet, current);
		closedSet.push(current);
		var neighbors = current.neighbors;
		for(var i = 0; i < neighbors.length; i++){
			var neighbor = neighbors[i];

			if(!closedSet.includes(neighbor) && !neighbor.wall && !neighbor.vWall){			
				var tempG = current.g + 1;
				
				var newPath = false;

				if(openSet.includes(neighbor)){
					if(tempG < neighbor.g){
						neighbor.g = tempG
						newPath = true;
					}
				} else{
					neighbor.g = tempG;
					newPath = true;
					openSet.push(neighbor);
				}
				if(newPath){
					neighbor.h = heuristic(neighbor, end);
					neighbor.f = neighbor.g + neighbor.h;
					neighbor.previous = current; 
				}
			}
		}


//			-----------Checks Open Set ^ --------------
	} else{
		//no solution
		alert("No Solution");
		console.log("No Solution");
		noSolution = true;
		noLoop();
	}

	background(0);

	for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++){
			grid[i][j].show(color(255));
		}
	}

	for (var i = 0; i < closedSet.length; i++){
		closedSet[i].show(color(255, 0, 0));
	}

	for (var i = 0; i < openSet.length; i++){
		openSet[i].show(color(0, 255, 0));	
	}
	if(!noSolution){
		path = [];
		var temp = current;
		path.push(temp);

		while(temp.previous){
			path.push(temp.previous);
			temp = temp.previous;
		}
	}

	for (var i = 0; i < path.length; i++){
		path[i].show(color(0, 0, 255));	
			}
}
