/*******************************************
	Unit Tests for the ol' Visual Search           
*******************************************/
module("Grid")

function createSource(start, end){
	var rows = 10,
		cols = 10;

	var source = [];

	for(var i = 0; i < rows; i++){
		var row = [];

		for(var j = 0; j < cols; j++){
			square = new Square(0, 0);
			row.push(square);
		}
		source.push(row);
	}	

	source[start[0]][start[1]].setStart();
	source[end[0]][end[1]].setEnd();

	return source;
}

test("Global pollution", function() {
	window.pollute = true;
	ok(pollute, "Nasty pollution");
});

test("Find start & end", function(){
	var source = createSource([1, 1], [5, 5]);
	var grid = new Grid(0, 0, 0);

	var start = grid.findStart(source),
		end = grid.findEnd(source);

	deepEqual(start, [1, 1], "Start is equal");
	deepEqual(end , [5, 5], "End is equal");
});


test("Get Neighbors", function(){
	var grid = new Grid(100, 100, 10);

	grid.createSquares();

	//Neighbor order north, east, south, west
	var start = grid.getStart(),
		index = start.getIndex(),
		neighbors = grid.getNeighbors(start);

	var west = neighbors[3].getIndex(),
		east = neighbors[1].getIndex(),
		north = neighbors[0].getIndex(),
		south = neighbors[2].getIndex();

	deepEqual([index[0], index[1] - 1], west, "West");
	deepEqual([index[0], index[1] + 1], east, "East");
	deepEqual([index[0] - 1, index[1]], north, "North");
	deepEqual([index[0] + 1, index[1]], south, "South");
});

module("Depth First Search")

test("DFS", function(){

	
});
