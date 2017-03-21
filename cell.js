function Cell(c, r, dead=false) {
	this.c = c;
	this.r = r;
	this.walls = [true, true, true, true];
	this.visited = false;
	this.dead = dead;
	// Function chooses random cell from array of eligible neighboring cells
	// For a cell to be eligible it must not be visited, it must be on the grid and it must not be dead
	this.checkNeighbors = function() {
		var neighbors = [];

		var top = grid[index(c, r-1)];
		var right = grid[index(c+1, r)];
		var bottom = grid[index(c, r+1)];
		var left = grid[index(c-1, r)];
	

		if (top && !top.visited && !top.dead) {
			neighbors.push(top);
		}
		if (right && !right.visited && !right.dead) {
			neighbors.push(right);
		}
		if (bottom && !bottom.visited && !bottom.dead) {
			neighbors.push(bottom);
		}
		if (left && !left.visited && !left.dead) {
			neighbors.push(left);
		}

		if (neighbors.length > 0) {
			var rando = floor(random(0, neighbors.length));
			return neighbors[rando];
		} else {
			return undefined;
		}
	};
	// Current cell
	this.highlight = function() {
		var x = this.c*w;
		var y = this.r*w;
		noStroke();
		fill('#bdc3c7');
		rect(x, y, w, w);
	};
	// Destination 
	this.destinationHighlight = function() {
		var x = this.c*w;
		var y = this.r*w;
		noStroke();
		fill('#e74c3c');
		rect(x, y, w, w);
	};
	// Completed path
	this.pathHighlight = function() {
		var x = this.c*w;
		var y = this.r*w;
		noStroke();
		fill('#f1c40f');
		rect(x, y, w, w);
	};
	// Draw lines for cell
	this.show = function() {
		var x = this.c * w;
		var y = this.r * w;
		stroke(255);

		if (this.walls[0]) {
			// top
			line(x,y,x+w,y);
		}
		if (this.walls[1]) {
			// right
			line(x+w,y,x+w,y);
		}
		if (this.walls[2]) {
			// bottom
		line(x+w,y+w,x,y+w);
		}
		if (this.walls[3]) {
			// left
			line(x,y+w,x,y);
		}
		
		// Optional highlight for visited cells
		if (this.visited) {
			// noStroke();
			// fill("#ff6e42");
			// rect(x, y, w, w);
		}
		// Dead zone
		if (this.dead) {
			noStroke();
			fill('#2c3e50'); 
			rect(x, y, w, w);
		}
	};
}