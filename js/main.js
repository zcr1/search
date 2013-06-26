/* Zachary Reinhardt
   Visual representations of various sorts
*/

"use strict";

$(function(){
	var $canvas = $("#canvas");
	var context = $canvas[0].getContext("2d");

	var width = $(window).width(),
		height = $(window).height();

	height -= 10;

	$canvas.attr({width: width, height: height});

	var grid = new Grid(width, height, 10);

	grid.setContext(context);
	grid.createSquares();
	grid.mouseEvents();
	grid.animate(context);

	mouseEvents(grid);
});

function mouseEvents(grid){

	var $algorithms = $("#algorithms > li"),
		$start = $("#start"),
		$bfs = $("#bfs"),
		$dfs = $("#dfs"),
		$djk = $("#djk"),
		$astar = $("#astar"),
		dfs = new DFS(grid),
		bfs = new BFS(grid),
		astar = new AStar(grid),
		djk = new Dijkstra(grid);


	$astar.addClass("active");

	// Search choices
	$algorithms.click(function (){
		var id = $(this).attr("id");
		$(this).addClass("active");

		switch(id){
			case "dfs":
				$(this).addClass("active");
				$bfs.removeClass("active");
				$djk.removeClass("active");
				$astar.removeClass("active");
				break;

			case "bfs":
				$(this).addClass("active");
				$dfs.removeClass("active");
				$djk.removeClass("active");
				$astar.removeClass("active");
				break;

			case "djk":
				$(this).addClass("active");
				$bfs.removeClass("active");
				$dfs.removeClass("active");
				$astar.removeClass("active");
				break;

			case "astar":
				$(this).addClass("active");
				$bfs.removeClass("active");
				$djk.removeClass("active");
				$dfs.removeClass("active");
				break;
		}
	});

	// Start a new search at a delay to deal with the setTimeout loop in each search
	$start.click(function(){
		$algorithms.each(function(){
			if ($(this).hasClass("active")){

				var id = $(this).attr("id");
				resetGrid();

				if (id === "dfs") setTimeout(dfs.search.bind(dfs), 500);
				if (id === "bfs") setTimeout(bfs.search.bind(bfs), 500);
				if (id === "djk") setTimeout(djk.search.bind(djk), 500);
				if (id === "astar") setTimeout(astar.search.bind(astar), 500);
			}
		});
	});

	$("#redraw").click(function(){
		var width = $(window).width(),
			height = $(window).height()- 10;

		grid.width = width;
		grid.height = height;

		$("#canvas").attr({width: width, height: height});

		resetGrid();
		grid.createSquares();
	});

	function resetGrid(){
		bfs.stopSearch();
		dfs.stopSearch();
		astar.stopSearch();
		djk.stopSearch();

		setTimeout(grid.visitReset.bind(grid), 200);
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