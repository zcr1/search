//A basic priority queue created for A*

function PriorityQueue(){
	"use strict";
	this.contents = [];

	this.enqueue = function(data, priority){
		var node = new Node(data, priority);

		this.contents.push(node);
		this.contents.sort(this.sortFunc);
	};

	this.sortFunc = function(a, b){
		return a.priority - b.priority;
	};

	this.dequeue = function(){
		if (this.contents.length === 0) return null;
		else return this.contents.splice(0, 1)[0].data;
	};

	this.getLength = function(){
		return this.contents.length;
	};

	this.clear = function(){
		this.contents.length = 0;
	};

	this.indexOf = function(element){
		for (var i = 0; i < this.contents.length; i++){
			if (this.contents[i].data === element) return i;
		}

		return -1;
	};

	function Node(data, priority){
		this.data = data;
		this.priority = priority;
	}
}

