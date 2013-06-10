/* Zachary Reinhardt
   Visual representations of various sorts
*/

"use strict";

$(function(){
	var $canvas = $("#canvas");
	var context = $canvas[0].getContext("2d");

	var width = $(window).width(),
		height = $(window).height();

	height -= 10

	$canvas.attr({width: width, height: height});

	var grid = new Grid(width, height, 10);

	grid.setContext(context);
	grid.createSquares();
	grid.mouseEvents();
	grid.animate(context);

	keyboardEvents(grid);
});

function keyboardEvents(grid){
	var self = this,
		dfs = new DFS(grid),
		bfs = new BFS(grid),
		//djk = new Dijkstra(grid),
		astar = new AStar(grid);

	$(document).keydown( function(event){
		if (event.keyCode == 32){ //space
			grid.createSquares();
		}
		else if(event.keyCode == 83) { //s
			resetGrid();
			dfs.search();
		}
		else if(event.keyCode == 65){ //a
			resetGrid();
			bfs.search();
		}
		else if(event.keyCode == 68){ //d
			resetGrid();
			djk.search();

		}
		else if(event.keyCode == 70){ //f
			grid.visitReset();
			astar.search();
		}
	});

	function resetGrid(){
		grid.visitReset();
		bfs.stopSearch();
		dfs.stopSearch();
		astar.stopSearch();
	}
}

// Fallback to setTimeout() if browser does not define requestAnimationFrame
window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

//Returns a copy of array
Array.prototype.copy = function() {
	return this.slice(0);
};