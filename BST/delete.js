"use strict";
var inOrder_1 = require('./inOrder');
var balanceIfNecessary = require('./BalancingMethods').balanceIfNecessary;
var findParent_1 = require('./findParent');
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
})(inOrder_1.default);
var BSTDelete = {
    deleteLeaf: function (left) { return function (parent) {
        if (left) {
            parent.left = null;
        }
        else {
            parent.right = null;
        }
    }; },
    deleteNodeWithOneChild: function (parent) {
        parent.left
            ? (parent.left = parent.left.left || parent.left.right)
            : (parent.right = parent.right.left || parent.right.right);
    },
    deleteNodeWithTwoChildren: function (parent) {
        var nextOfKin = findInorderSuccessor(parent, parent.value);
        // remove the nextOfKin from its original position
        var parentOfNextOfKin = findParent_1.findParent(parent, nextOfKin.value);
        // copy the 'nextOfKin' to where the parent is
        Object.assign(parent, nextOfKin);
        parentOfNextOfKin.left.value === nextOfKin.value
            ? (parentOfNextOfKin.left = null)
            : (parentOfNextOfKin.right = null);
    },
};
function chooseDeleteMethod(_a) {
    var isLeaf = _a.isLeaf, isOnlyChild = _a.isOnlyChild, isLeft = _a.isLeft;
    if (isLeaf)
        return BSTDelete.deleteLeaf(isLeft);
    if (isOnlyChild)
        return BSTDelete.deleteNodeWithOneChild;
    return BSTDelete.deleteNodeWithTwoChildren;
}
function findParentAndChild(root, childValue) {
    var toReturn = {
        parent: null,
        child: null,
    };
    inOrder_1.default(root, function (node) {
        if (node.value === childValue) {
            var f = void 0;
        }
    });
    inOrder_1.default(root, function (node) {
        if (node.left && node.left.value === childValue) {
            toReturn.parent = node;
            toReturn.child = node.left;
        }
        else if (node.right && node.right.value === childValue) {
            toReturn.parent = node;
            toReturn.child = node.right;
        }
        else {
            var d = void 0;
        }
    });
    if (!toReturn.child) {
        console.log("could not delete value ", childValue);
        var c = void 0;
    }
    return toReturn;
}
function generateNodeMeta(root, value) {
    var _a = findParentAndChild(root, value), parent = _a.parent, child = _a.child;
    if (!child) {
        var c = void 0;
    }
    return {
        isLeaf: !child.left && !child.right,
        isOnlyChild: (parent.left && !parent.right) || (!parent.left && parent.right),
        isLeft: (parent.left && parent.left.value === child.value)
    };
}
function _deleteNode(root, value) {
    var nodeMeta = generateNodeMeta(root, value);
    var deleteFn = chooseDeleteMethod(nodeMeta);
    deleteFn(root);
}
module.exports = (function (_deleteNode, _balanceIfNecessary) {
    return function deleteNode(value) {
        _deleteNode(this, value);
        _balanceIfNecessary(this);
    };
})(_deleteNode, balanceIfNecessary);
//# sourceMappingURL=delete.js.map