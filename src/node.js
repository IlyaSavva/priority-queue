class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left == null) {
			this.left = node;
			this.left.parent = this;
		}
		else if (this.right == null) {
			 	this.right = node;
			 	this.right.parent = this;
			 }
	}

	removeChild(node) {
		if (this.left === node) {
			node.parent = null;
			this.left = null;
		}
		else if (this.right === node) {
				node.parent = null;
			 	this.right = null;
			 }
			 else throw new Error();
	}

	remove() {
		var tmp = this;
		if (this.parent != null) {
			if (this.left != null) 
				this.removeChild(this.left);
				if (this.right != null)
					this.removeChild(this.right);
			this.parent.removeChild(this);
		}
		return tmp;
	}

	swapWithParent() {
		if (this.parent != null ) {
			function isNodeLeftChild(node) {
				if (node.parent != null)
					if (node.parent.left === node)
						return true;
				return false;
			}
			function isHaveLeftChild(node) {
				if (node.left != null) 
					return true;
				return false;
			}
			function isHaveRightChild(node) {
				if (node.right != null) 
					return true;
				return false;
			}
			function isHaveParent(node) {
				if (node.parent != null) 
					return true;
				return false;
			}
			let isLeftChild = isNodeLeftChild(this);

			if (isHaveLeftChild(this))
				this.left.parent = this.parent;
			if (isHaveRightChild(this))
				this.right.parent = this.parent;

			if (isHaveParent(this.parent))
				if (isNodeLeftChild(this.parent))
					this.parent.parent.left = this;
				else
					this.parent.parent.right = this;

			var brotherTmp = null;
			if (isNodeLeftChild(this)) {
				if (isHaveRightChild(this.parent)) {
					brotherTmp = this.parent.right;
					brotherTmp.parent = this;
				}
				this.parent.left = this.left;
				this.parent.right = this.right;
				this.left = this.parent;
				this.right = brotherTmp;
			}
			else {
				brotherTmp = this.parent.left;
				brotherTmp.parent = this;
				this.left = brotherTmp;
				this.right = this.parent;
			}

			if (isHaveParent(this.parent))
				this.parent = this.parent.parent
			else
				this.parent = null;
			if (isLeftChild) 
				this.left.parent = this;
			else
				this.left.parent = this;	
		}
	}
}

module.exports = Node;
