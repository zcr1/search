/* Zachary Reinhardt
   Visual representations of various sorts
*/


// dijsktra, a*, bi-directional

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
			djk = new Dijkstra(grid),
			astar = new AStar(grid);

	$(document).keydown( function(event){
		if (event.keyCode == 32){ //space
			grid.createSquares();
		}
		else if(event.keyCode == 83) { //s
			//grid.createSquares();
			bfs.stopSearch();
			dfs.search();
		}
		else if(event.keyCode == 65){ //a
			//grid.createSquares();
			dfs.stopSearch();
			bfs.search();
		}
		else if(event.keyCode == 68){ //d
			//grid.createSquares();
			dfs.stopSearch();
			bfs.stopSearch();
			djk.search();

		}
		else if(event.keyCode == 70){ //f
			//astar.search();
		}

		//console.log(event.keyCode);
	});
}

// Uses setTimeout() if there is no requestAnimationFrame function defined
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