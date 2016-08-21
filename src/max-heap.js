const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		var newNode = new Node(data, priority);
		this.insertNode(newNode);
		this.shiftNodeUp(newNode);
		delete this.parentNodes[-1];
	}

	pop() {
		
	}

	detachRoot() {
		
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		
	}

	isEmpty() {
		if (this.root === null)
			return true;
		return false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (this.isEmpty()) {
			this.root = node;
			this.parentNodes[0] = node;
		}
		else {
			this.parentNodes.splice(this.parentNodes.length, 0, node);
			this.parentNodes[0].appendChild(node);
			if (this.parentNodes[0].right != null)
				this.parentNodes.splice(0, 1)
		}
	}

	shiftNodeUp(node) {
		if ((node != this.root) && (node.parent.priority < node.priority)) {
			let indexOfChild = this.parentNodes.indexOf(node);
			let indexOfParent = this.parentNodes.indexOf(node.parent);
			this.parentNodes[indexOfParent] = node;
			this.parentNodes[indexOfChild] = node.parent;
			if (node.parent === this.root) 
				this.root = node;
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
