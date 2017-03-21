var cols, rows;
var w = 20;
var grid = [];
var current;
var destination;
var destination2;
var destination3;
var stack = [];

function setup(threshold=0.25) {
	
	createCanvas(420,420);
	cols = floor(width/w);
	rows = floor(width/w);
	// frameRate(15);

	for (var r = 0; r < rows; r++) {
		for (var c = 0; c < cols; c++) {
			var cell = Math.random() < threshold ? new Cell(c, r, true) : new Cell(c, r);
			grid.push(cell);
		}
	}
	// Choose a random destination on the grid
	var randomInRange = Math.ceil(Math.random() * grid.length) + 1;
	destination = grid[randomInRange];
	destination2 = grid[randomInRange -1];
	destination3 = grid[randomInRange +1];
	// Begin at the first cell
	current = grid[0];
}

function draw() {
	background('#3498db');
	for (var i = 0; i < grid.length; i++) {
		grid[i].show();
	}
	// Change color of visited cells
	current.visited = true;
	current.highlight();
	// Makes the target destination occupy more cells
	destination.destinationHighlight();
	destination2.destinationHighlight();
	destination3.destinationHighlight();

	var next = current.checkNeighbors();
	if (current === destination || current === destination2 || current === destination3) {
		destination.highlight();
		var completedMessages = ['aMAZEing!', ''];
		document.getElementById('message').innerHTML = completedMessages[Math.floor(Math.random()*completedMessages.length)];
		for (var i = 0; i < stack.length; i++) {
			stack[i].pathHighlight();
		}
		return;
	}
	if (next) {
		next.visited = true;
		stack.push(current);
		removeWalls(current, next);
		current = next;
	} else if (stack.length > 0) {
		current = stack.pop();
	} else if (stack.length === 0) {
		document.getElementById('message').innerHTML = 'No path :( Refresh and try again!';
	}
}
// Helper function to find index
function index(c, r) {
	if (c < 0 || r < 0 || c > cols-1 || r > rows-1) {
		return -1;
	}

	return c + r * cols;
}
// Removes walls when a cell advances
function removeWalls(a, b) {
	var x = a.c - b.c;
	if (x === 1) {
		a.walls[3] = false;
		b.walls[1] = false;
	} else if (x === -1) {
		a.walls[1] = false;
		b.walls[3] = false;
	}
	var y = a.r - b.r;
	if (y === 1) {
		a.walls[0] = false;
		b.walls[2] = false;
	} else if (y === -1) {
		a.walls[2] = false;
		b.walls[0] = false;
	}
}