"use strict";
var inOrder = require('./inOrder');
var balanceIfNecessary = require('./BalancingMethods').balanceIfNecessary;
var findParent = require("./findParent");
var DeleteMethods = {
    deleteLeaf: function (parent) {
        parent.left = null;
        parent.right = null;
    },
    deleteNodeWithOneChild: function (parent) {
        if (parent.left) {
            var grandChild = parent.left.left ? parent.left.left : parent.left.right;
            parent.left = grandChild;
        }
        else {
            var grandChild = parent.right.left ? parent.right.left : parent.right.right;
            parent.right = grandChild;
        }
    },
    deleteNodeWithTwoChildren: function (parent) {
        var reachedParent = false;
        var nextOfKin = null;
        inOrder(parent, function (node) {
            if (node.value === parent.value) {
                reachedParent = true;
                return;
            }
            if (reachedParent) {
                nextOfKin = node;
            }
        })(Object).assign(parent, nextOfKin);
        var parentOfNextOfKin = findParent(nextOfKin.value);
        if (parentOfNextOfKin.left.value = nextOfKin.value) {
            parentOfNextOfKin.left = null;
        }
        else {
            parentOfNextOfKin.right = null;
        }
    }
};
function chooseDeleteMethod() { }
function findParentAndChild(root, childValue) {
    var toReturn = {
        parent: null,
        child: null,
        isLeft: false,
        isRight: false,
    };
    inOrder(root, function (node) {
        if (node.left && node.left.value === childValue) {
            toReturn.parent = node;
            toReturn.child = node.left;
            toReturn.isLeft = true;
            toReturn.isRight = false;
        }
        else if (node.right && node.right.value === childValue) {
            toReturn.parent = node;
            toReturn.child = node.right;
            toReturn.isLeft = false;
            toReturn.isRight = true;
        }
    });
    return toReturn;
}
function isLeaf(node) {
    return node && (!node.left && !node.right);
}
function freeNode(node) {
    node.left = null;
    node.right = null;
}
exports = (function (inOrder) {
    return function deleteNode(root, value) {
        var parent = null;
        var isLeaf = false;
        var isLeftChild;
        inOrder(root, function (node) {
            if (node.left && node.left.value === value) {
                parent = node;
                if (!node.left.left && !node.left.right) {
                    isLeaf = true;
                }
                isLeftChild = true;
            }
            else if (node.right && node.right.value === value) {
                parent = node;
                if (!node.right.left && !node.right.right) {
                    isLeaf = true;
                }
                isLeftChild = false;
            }
        });
        if (isLeaf) {
            if (isLeftChild === true) {
                parent.left = null;
            }
            else if (isLeftChild === false) {
                parent.right = null;
            }
        }
        balanceIfNecessary(root);
    };
})(inOrder);
//# sourceMappingURL=delete.js.map