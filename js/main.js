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


});