function Dijkstra(grid){
	this.grid = grid;
	this.delay = 0.01;

	this.search = function(){
		var unvisited = [],
			self = this,
			previous,
			square;

		this.initVals(this.grid.squares);

		start = this.grid.getStart();
		start.distance = 0;

		unvisited.push(start);

		function loop(){

			if (unvisited.length > 0){
				square = self.getMin(unvisited);

				square.setVisited(true);

				var neighbors = self.grid.getNeighbors(square),
					newDist = square.distance + 1;

				for(var i = 0; i < neighbors.length; i++){

					if (newDist < neighbors[i].distance){
						neighbors[i].distance = newDist;
						neighbors[i].previous = square;
					}

					if(unvisited.indexOf(neighbors[i]) == -1){
						unvisited.push(neighbors[i]);
					}
				}

				if (square.end){
					console.log(square.distance);
					self.getPath(square);
				}
				else setTimeout(loop, self.delay);
			}
		}
		loop();
	}

	this.getPath = function(target){
		var square = target;
		while (!square.start){
			square = square.previous;
			square.setFinalPath(true);
		}
	}
	this.getMin = function(unvisited){
		var min = unvisited[0].distance,
			minI = 0;

		for(var i = 1; i < unvisited.length; i++){
			if (unvisited[i].distance < min){
				minI = i;
				min = unvisited[i].distance;
			}
		}
		return unvisited.splice(minI, 1)[0];
	}

	this.initVals = function(squares){
		for (var i = 0; i < squares.length; i++){
			for (var j = 0; j < squares[0].length; j++){
				squares[i][j].distance = Number.POSITIVE_INFINITY;
			}
		}	
	}
}