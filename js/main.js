/* Zachary Reinhardt
   Visual representations of various sorts
*/

"use strict";

$(function(){
});



//Pos: [x, y] of top left corner
/*function square(context, pos, width){
	context.save();
	context.fillStyle = 'black';
	context.fillRect(pos[0], pos[1], width, width)
	context.restore();
}*/

//Size: size of each square in grid
function grid(width, height, size){
	this.width = width;
	this.height = height;
	this.size = size;

	this.createSquares = function(){
		this.squares = [];
		rows = int(size / this.height)
		cols = int(size / this.width)
	}
}

function square(pos, width){
	this.pos = pos;
	this.width = width;
}

