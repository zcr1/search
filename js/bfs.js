function BFS(grid){
	this.grid = grid;
	this.delay = 0.1

	this.search = function(){
		var unvisited = [],
			start = this.grid.getStart();

		start.setVisited(true);

		var neighbors = this.grid.getNeighbors(start);
		for(var i = 0; i < neighbors.length; i++){
			unvisited.push(neighbors[i]);
		}

		var self = this;

		function loop(){
			if (unvisited.length > 0){
				var square = unvisited.shift();
				if (!square.getVisited()){
					square.setVisited(true);

					if (square.end){
						unvisited = [];
					}
					else{
						var neighbors = self.grid.getNeighbors(square);

						for(var i = 0; i < neighbors.length; i++){
							unvisited.push(neighbors[i]);
						}
					}
				}
				setTimeout(loop, self.delay);
			}
		}
		loop();
	}
}