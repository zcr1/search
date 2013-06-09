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

	$canvas.attr({width: width, height: height});

	var grid = new Grid(width, height, 10);

	grid.setContext(context);
	grid.createSquares();
	grid.mouseEvents();
	grid.animate(context);

	var dfs = new DFS(grid),
		bfs = new BFS(grid);
	
	keyboardEvents(grid, dfs, bfs);
});

function keyboardEvents(grid, dfs, bfs){
		var self = this;

	$(document).keydown( function(event){
		if (event.keyCode == 32){ //space
			grid.createSquares();
		}
		else if(event.keyCode == 83) { //s
			dfs.search();
		}
		else if(event.keyCode == 65){ //a
			bfs.search();
		}

	//	console.log(event.keyCode);
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