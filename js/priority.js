function PriorityQueue(){
	this.contents = []

	this.enqueue = function(data, priority){
		var node = new Node(data, priority);

		this.contents.push(node);
		this.contents.sort(this.sortFunc);
	}

	this.sortFunc = function(a, b){
		return a.priority - b.priority;
	}

	this.dequeue = function(){
		return this.contents.splice(0, 1)[0].data;
	}

	function Node(data, priority){
		this.data = data;
		this.priority = priority;
	}
}

