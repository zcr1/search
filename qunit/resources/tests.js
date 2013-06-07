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


test("Find start & end", function(){
	var source = createSource([1, 1], [5, 5]);
	var grid = new Grid(0, 0, 0);

	var start = grid.findStart(source),
		end = grid.findEnd(source);

	deepEqual(start, [1, 1], "Start is equal");
	deepEqual(end , [5, 5], "End is equal");
});



module("Depth First Search")

test("DFS", function(){
	var source = createSource([1, 1], [5, 5]),
		grid = new Grid(0, 0, 0),
		dfs = new DFS(source);

	dfs.setStart(grid.findStart(source));
	dfs.setEnd(grid.findEnd(source));

	
});


/*
module("Choices");



test("Choice clicks", function() {

	clickSetUp(null);

	$("#choiceNum").trigger('click');
	equal($("#choiceNum").data("default"), $("#inputBox").val(), "Number choice changes inputBox");

	$("#choiceStr").trigger('click');
	deepEqual($("#choiceStr").data("default"), $("#inputBox").val(), "String choice changes inputBox");

	$("#choiceList").trigger('click');
	deepEqual($("#choiceList").data("default"), $("#inputBox").val(), "List of strings choice changes inputBox");

});

module("Stacksort Object - basic startup");

test( "global pollution", function() {
	window.pollute = true;
	ok(pollute, "Nasty pollution");
});

*/