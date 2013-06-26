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


module("Priority Queue")

test("Basic Priority Queue Tests", function(){
	var pq = new PriorityQueue();

	pq.enqueue('a', 1);
	pq.enqueue('d', 4);
	pq.enqueue('e', 5);
	pq.enqueue('c', 3);

	equal(pq.getLength(), 4, "Length")
	equal('a', pq.dequeue(), "Dequeue");
	equal('c', pq.dequeue(), "Dequeue");
	equal('d', pq.dequeue(), "Dequeue");
	equal('e', pq.dequeue(), "Dequeue");

	pq.enqueue('a', 1);
	pq.enqueue('d', 4);
	pq.enqueue('e', 5);
	pq.enqueue('c', 3);

	equal(pq.indexOf('z'), -1, "Index of non-existent element")
	equal(pq.indexOf('c'), 1, "Index element that exists")

	pq.clear();

	equal(pq.getLength(), 0, "Clear");
});


module("Square")

test("Distance between points", function(){
	var a = new Square([10, 10], 0, 0),
		b = new Square([5, 5], 0, 0);

	equal(a.distanceTo(b), Math.sqrt(50), "Distance")

});

/*
test("Manhattan Distance", function(){
	var a = new Square([10, 10], 0, 0),
		b = new Square([5, 5], 0, 0);

	equal(a.distanceTo(b), Math.sqrt(50), "Distance")

});*/
