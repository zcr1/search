//Size: size of each square in grid
function Grid(width, height, size){
	this.width = width;
	this.height = height;
	this.size = size;
	this.dragSquare = null;

	this.createSquares = function(){
		this.squares = [];

		//Unary negation hack to truncate double without a function call
		var rows = ~~(this.height / this.size),
			cols = ~~(this.width / this.size);

		for (var i = 0; i < rows; i++){
			var row = [];

			for (var j = 0; j < cols; j++){
				var pos = [this.size * j, this.size * i];
				var square = new Square(pos, this.size);

				row.push(square);
			}

			this.squares.push(row);
		}

		this.setStartEnd()
	}

	this.setStartEnd = function(){
		var y = ~~((this.height / 2) / this.size),
			startX = ~~((this.width / 3) / this.size),
			endX = startX * 2;

		this.squares[y][startX].setStart();
		this.squares[y][endX].setEnd();
	}

	this.setContext = function(context){
		this.context = context;
	}

	this.animate = function(){
		this.context.clearRect(0, 0, this.width, this.height)
		this.drawSquares();
		requestAnimationFrame(this.animate.bind(this));
	}

	this.drawSquares = function(){
		var rows = this.squares.length,
			cols = this.squares[0].length;

		this.context.save()
		this.context.lineWidth = .75;
		this.context.strokeStyle = "#E3E4E6"
		//this.context.fillStyle = "#FA6969"

		for (var i = 0; i < rows; i++){
			for (var j = 0; j < cols; j++){
				var square = this.squares[i][j];
				if (square.start || square.end){
					this.context.fillStyle = "#000000";
					this.context.fillRect(square.pos[0] + 1, square.pos[1] + 1, this.size - 2, this.size - 2);
				}
				else{

					this.context.strokeRect(square.pos[0], square.pos[1], this.size, this.size);
				}
			}
		}


		this.context.restore();
	}

	//Pick up start or end square if mouse position intersects TODO: add a buffer for close clicks
	this.getSquare = function(x, y){
		var row = ~~(y / this.size),
			col = ~~(x / this.size);
		return this.squares[row][col];
	}

	this.mouseEvents = function(){
		var self = this;

		self.leftClick = false;

		$(document).mouseup( function(event){
			self.leftClick = false;
			self.dragSquare = null;
		});

		$(document).mousedown( function(event){
			if (event.button == 0){
				var square = self.getSquare(event.pageX, event.pageY);

				if (square.start || square.end){
					self.dragSquare = square;
					self.leftClick = true;
				}

				return false;
			}
		});

		$(document).mousemove( function(event){
			if (self.leftClick){

				var square = self.getSquare(event.pageX, event.pageY);

				if (square.pos != self.dragSquare.pos){
					square.start = self.dragSquare.start
					square.end = self.dragSquare.end

					self.dragSquare.start = false;
					self.dragSquare.end = false;

					self.dragSquare = square;
				}


			}
		});
	}

	this.findStart = function(source){
		var rows = source.length,
			cols = source[0].length;

		for (var i = 0; i < rows; i++){
			for (var j = 0; j < cols; j++){
				if (source[i][j].start) return [i,j];
			}
		}

		return null;
	}


	this.findEnd = function(source){
		var rows = source.length,
			cols = source[0].length;

		for (var i = 0; i < rows; i++){
			for (var j = 0; j < cols; j++){
				if (source[i][j].end) return [i,j];
			}
		}

		return null;
	}
}

function Square(pos, width){
	this.pos = pos;
	this.width = width;
	this.start = false;
	this.end = false;

	this.setStart = function(){
		this.start = true;
	}

	this.setEnd = function(){
		this.end = true;
	}
}