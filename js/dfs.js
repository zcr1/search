function DFS(grid){
	this.grid = grid;
	this.delay = 1;

	this.search = function(){
		var unvisited = [],
			start = this.grid.getStart();

		console.log(start);
		start.setVisited(true);

		var neighbors = this.grid.getNeighbors(start);
		for(var i = 0; i < neighbors.length; i++){
			unvisited.push(neighbors[i]);
		}

		var self = this;
		function loop(){
			if (unvisited.length > 0){
				var square = unvisited.pop();
				square.setVisited(true);

				if (square.end){
					unvisited = [];
					console.log(square);
				}
				else{
					var neighbors = self.grid.getNeighbors(square);

					for(var i = 0; i < neighbors.length; i++){
						unvisited.push(neighbors[i]);
					}
				}
				setTimeout(loop, self.delay);
			}
		}
		loop();
	}
}