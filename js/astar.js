function AStar(grid){
	this.grid = grid;
	this.delay = 0.1;
	this.manhattan = false;

	this.search = function(){
		var closedSet = [],
			openSet = new PriorityQueue(),
			start = this.grid.getStart(),
			end = this.grid.getEnd(),
			self = this;

		start.gScore = 0;
		start.fScore = start.gScore + this.heuristic(start, end);

		openSet.enqueue(start, start.fScore);
		start.setVisited(true);

		function loop(){
			if (openSet.getLength() > 0){
				var current = openSet.dequeue();

				if (current.end == true)
				{
					openSet.clear();
					self.computePath(current);
					return;
				}

				closedSet.push(current);

				var neighbors = self.grid.getNeighbors(current);

				for (var i = 0; i < neighbors.length; i++){
					var tmpGScore = current.gScore + current.distanceTo(neighbors[i]);

					if ((closedSet.indexOf(neighbors[i]) >= 0) && (tmpGScore >= neighbors[i].gScore)){
						continue;
					}
					else if ((openSet.indexOf(neighbors[i]) == -1) || (tmpGScore < neighbors[i].gScore)){
						neighbors[i].previous = current;
						neighbors[i].gScore = tmpGScore;
						neighbors[i].fScore = tmpGScore + self.heuristic(neighbors[i], end);

						if (openSet.indexOf(neighbors[i]) == -1){

							openSet.enqueue(neighbors[i], neighbors[i].fScore);
							neighbors[i].setVisited(true);
						}
					}
				}
				setTimeout(loop, self.delay);
			}
		}
		loop();
	}

	// Computes the final path by starting at the end and traversing each previous square
	this.computePath = function(end){
		var current = end.previous;

		while(current && !current.start){
			current.setFinalPath(true);
			current = current.previous;
		}
	}

	this.stopSearch = function(){
		this.stop = true;
	}

	this.setManhattan = function(bool){
		this.manhattan = bool;
	}

	//Heuristic - either manhattan distance or regular distance between points
	this.heuristic = function(a, b){
		if (this.manhattan) return a.manhattan(b);
		else return a.distanceTo(b);
	}
}
