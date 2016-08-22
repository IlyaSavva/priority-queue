const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		if (maxSize != null)
			this.maxSize = maxSize;
		else
			this.maxSize = 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.size() != this.maxSize)
			this.heap.push(data, priority);
		else throw new Error();
	}

	shift() {
		if (!this.isEmpty()) 
			return this.heap.pop();
		else throw new Error();
	};

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
