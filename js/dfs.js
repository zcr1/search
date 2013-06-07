function DFS(source){
	this.source = source;

	//Set the start and end indeces
	this.setStart = function(start){
		this.start = start;
	}

	this.setEnd = function(end){
		this.end = end;
	}

	this.search = function(){
		var unvisited = [];

		this.setVisited(this.start);

	}


	this.getNeighbors = function(index){
		neighbors = [];

		// west
		if (index[1] > 0){
			neighbors.append(this.source[index[0][index[1] - 1]);
		}

		// east
		if (index[1] < (this.source[0].length - 1)){
			neighbors.append(this.source[index[0]][index[1] + 1]);
		}

		// north
		if (index[0] > 0){
			neighbors.append(this.source[index[0] - 1][index[1]);
		}

		// south

	}

	this.setVisited = function(index){
		this.source[index[0], index[1]].visited = true;
	}

}