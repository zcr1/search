/* Zachary Reinhardt
   Visual representations of various sorts
*/

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

	var dfs = new DFS(grid);
	dfs.search();
});

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