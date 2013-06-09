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
				var square = new Square(pos, this.size, [i, j]);

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

		this.start = this.squares[y][startX];
		this.end = this.squares[y][endX];

		this.squares[y][startX].setStart();
		this.squares[y][endX].setEnd();
	}

	this.setContext = function(context){
		this.context = context;
	}

	this.animate = function(){
		this.drawSquares();
		window.requestAnimFrame(this.animate.bind(this));
	}

	this.drawSquares = function(){
		var rows = this.squares.length,
			cols = this.squares[0].length;

		this.context.save();
		this.context.strokeStyle = "#E3E4E6";
		this.context.lineWidth = 1.2;

		for (var i = 0; i < rows; i++){
			for (var j = 0; j < cols; j++){
				var square = this.squares[i][j];

				if (square.getRedraw())
				{				
					this.context.clearRect(square.pos[0], square.pos[1], this.size, this.size);

					if (square.start || square.end){
						this.context.fillStyle = "#000000";
					}
					else if (square.getVisited()){
						this.context.fillStyle = "#FA6969";
					}
					else{
						this.context.fillStyle = "#6DA7D1";
					}

					this.context.fillRect(square.pos[0] + 1, square.pos[1] + 1, this.size - 2, this.size - 2)		
					this.context.strokeRect(square.pos[0], square.pos[1], this.size, this.size)

					square.setRedraw(false);
				}
			}
		}

		this.context.restore();
	}

	//Pick up start or end square if mouse position intersects TODO: add a buffer for close clicks
	this.getSquare = function(x, y){
		var index = this.getCoordinate(x,y);
		return this.squares[index[0]][index[1]];
	}

	this.getCoordinate = function(x, y){
		var row = ~~(y / this.size),
			col = ~~(x / this.size);

		return [row, col];
	}

	this.mouseEvents = function(){
		var self = this;

		self.leftClick = false;

		$(document).mouseup( function(event){
			self.leftClick = false;
			self.dragSquare = null;
		});

		$(document).mousedown( function(event){
			if (self.validMouse(event.pageX, event.pageY)){
				if (event.button == 0){
					var square = self.getSquare(event.pageX, event.pageY);

					if (square.start || square.end){
						self.dragSquare = square;
						self.leftClick = true;
						square.setRedraw(true);
					}

					return false;
				}
			}
		});

		$(document).mousemove( function(event){
			if (self.leftClick){
				if (self.validMouse(event.pageX, event.pageY))
				{
					console.log(event.pageY);
					var square = self.getSquare(event.pageX, event.pageY);

					if (square.pos != self.dragSquare.pos){
						square.start = self.dragSquare.start
						square.end = self.dragSquare.end

						if (square.start) self.start = square;
						if (square.end) self.end = square;

						self.dragSquare.start = false;
						self.dragSquare.end = false;
						self.dragSquare.setRedraw(true);

						self.dragSquare = square;
						self.dragSquare.setRedraw(true);
					}
				}
			}
		});
	}


	this.validMouse = function(x, y){
		if (x < 0 || x > this.width || y < 0 || (y > this.height - this.size)) return false;
		else return true;
	}
	this.getStart = function(){
		return this.start;
	}

	this.getEnd = function(){
		return this.end;
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

	// Find non-visited neighbors for a given square
	this.getNeighbors = function(square){
		var index = this.getCoordinate(square.pos[0], square.pos[1]),
			neighbors = [],
			square;

		// north
		if (index[0] > 0){
			square = this.squares[index[0] - 1][index[1]];
			if (!square.getVisited()) neighbors.push(square);
		}

		// east
		if (index[1] < (this.squares[0].length - 1)){
			square = this.squares[index[0]][index[1] + 1];
			if (!square.getVisited()) neighbors.push(square);
		}	

		// south
		if (index[0] < (this.squares.length - 1)){
			square = this.squares[index[0] + 1][index[1]];
			if (!square.getVisited()) neighbors.push(square);
		}

		// west
		if (index[1] > 0){
			square = this.squares[index[0]][index[1] - 1];
			if (!square.getVisited()) neighbors.push(square);
		}

		return neighbors;
	}
}

function Square(pos, width, index){
	this.pos = pos;
	this.width = width;
	this.start = false;
	this.end = false;
	this.index = index;
	this.visited = false;
	this.redraw = true;

	this.setStart = function(){
		this.start = true;
	}

	this.setVisited = function(bool){
		this.visited = bool;
		this.setRedraw(true);
	}

	this.getVisited = function(){
		return this.visited;
	}

	this.setEnd = function(){
		this.end = true;
	}

	this.getIndex = function(){
		return this.index;
	}

	this.setRedraw = function(bool){
		this.redraw = bool;
	}

	this.getRedraw = function(){
		return this.redraw;
	}
}