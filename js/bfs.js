function BFS(grid){
	this.grid = grid;
	this.delay = 0.01
	this.stop = false;

	this.search = function(){
		var unvisited = [],
			start = this.grid.getStart();

		start.setVisited(true);

		this.stop = false;

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
							if(unvisited.indexOf(neighbors[i]) == -1){
								unvisited.push(neighbors[i]);
							}
						}
					}
				}
				if (!self.stop) setTimeout(loop, self.delay);
			}
		}
		loop();
	}

	this.stopSearch = function(){
		this.stop = true;
	}
}