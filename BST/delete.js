"use strict";
var inOrder = require('./inOrder');
var balanceIfNecessary = require('./BalancingMethods').balanceIfNecessary;
var findParent = require('./findParent');
// ---------helper----
// -------------------
var findInorderSuccessor = (function (inOrder) {
    return function findInorderSuccessor(root, parentValue) {
        var reachedParent = false;
        var nextOfKin = null;
        inOrder(root, function (node) {
            if (node.value === parentValue) {
                reachedParent = true;
                return;
            }
            if (reachedParent) {
                nextOfKin = node;
            }
        });
        return nextOfKin;
    };
})(inOrder);
var BSTDelete = {
    deleteLeaf: function (parent) {
        parent.left = parent.right = null;
    },
    deleteNodeWithOneChild: function (parent) {
        parent.left
            ? (parent.left = parent.left.left || parent.left.right)
            : (parent.right = parent.right.left || parent.right.right);
    },
    deleteNodeWithTwoChildren: function (parent) {
        var nextOfKin = findInorderSuccessor(parent, parent.value);
        // copy the 'nextOfKin' to where the parent is
        Object.assign(parent, nextOfKin);
        // remove the nextOfKin from its original position
        var parentOfNextOfKin = findParent(nextOfKin.value);
        parentOfNextOfKin.left.value === nextOfKin.value
            ? (parentOfNextOfKin.left = null)
            : (parentOfNextOfKin.right = null);
    },
};
function chooseDeleteMethod(_a) {
    var isLeaf = _a.isLeaf, isOnlyChild = _a.isOnlyChild;
    if (isLeaf)
        return BSTDelete.deleteLeaf;
    if (isOnlyChild)
        return BSTDelete.deleteNodeWithOneChild;
    return BSTDelete.deleteNodeWithTwoChildren;
}
function findParentAndChild(root, childValue) {
    var toReturn = {
        parent: null,
        child: null,
    };
    inOrder(root, function (node) {
        if (node.left && node.left.value === childValue) {
            toReturn.parent = node;
            toReturn.child = node.left;
        }
        else if (node.right && node.right.value === childValue) {
            toReturn.parent = node;
            toReturn.child = node.right;
        }
    });
    return toReturn;
}
function generateNodeMeta(root, value) {
    var _a = findParentAndChild(root, value), parent = _a.parent, child = _a.child;
    return {
        isLeaf: !child.left && !child.right,
        isOnlyChild: !(parent.left && parent.right),
    };
}
function _deleteNode(root, value) {
    var nodeMeta = generateNodeMeta(root, value);
    var deleteFn = chooseDeleteMethod(nodeMeta);
    deleteFn(root);
}
exports = (function (_deleteNode, _balanceIfNecessary) {
    return function deleteNode(root, value) {
        _deleteNode(root, value);
        _balanceIfNecessary(root);
    };
})(_deleteNode, balanceIfNecessary);
//# sourceMappingURL=delete.js.map