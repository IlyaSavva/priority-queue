const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.count = 0;
	}

	push(data, priority) {
		var newNode = new Node(data, priority);
		this.insertNode(newNode);
		this.shiftNodeUp(newNode);
		this.count++;
		delete this.parentNodes[-1];
	}

	pop() {
		if (this.root != null) {
			var detached = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);
			this.count = this.count - 1;
			detached.right = null;
			detached.left = null;
			return detached.data;
		}
	}

	detachRoot() {
		var tmpRoot = this.root;
		if (this.parentNodes.indexOf(tmpRoot) != -1)
			this.parentNodes.splice(this.parentNodes.indexOf(tmpRoot),1);
		this.root = null;
		return tmpRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (detached.left != null) {
			var tmpNewRoot = this.parentNodes[this.parentNodes.length - 1];
			tmpNewRoot.remove();
			this.parentNodes.splice(this.parentNodes.indexOf(tmpNewRoot), 1);
			this.root = tmpNewRoot;
			if (detached.left != null && detached.left != this.root)
				this.root.appendChild(detached.left);
			if (detached.right != null && detached.right != this.root)
				this.root.appendChild(detached.right);
			if (this.root.left == null || this.root.right == null) {
				this.parentNodes.splice(0, 0, this.root);
			}
		}
		else {
			this.clear();
			this.count = 1;
		}
	}

	size() {
		return this.count;
	}

	isEmpty() {
		if (this.root === null)
			return true;
		return false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.count = 0;
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
		function isNodeHaveTwoChild (node) {
			if (node.left != null && node.right != null)
				return true;
			return false;
		}
		if (this.root != null && (node.right != null || node.left != null)) {
			let nextToChange = null;
			if (isNodeHaveTwoChild(node))
				nextToChange = (node.left.priority > node.right.priority) ? node.left : node.right;
			else 
				if (node.right == null) 
				   	nextToChange = node.left;
				else 
				   	nextToChange = node.right;
			if (nextToChange.priority > node.priority) {
				let indexOfChild = this.parentNodes.indexOf(nextToChange);
				let indexOfParent = this.parentNodes.indexOf(node);
				this.parentNodes[indexOfParent] = nextToChange;
				this.parentNodes[indexOfChild] = node;
				if (node === this.root) 
					this.root = nextToChange;
				nextToChange.swapWithParent();
				this.shiftNodeDown(node);		
			}
		}	
	}
}

module.exports = MaxHeap;
