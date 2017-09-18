"use strict";
var inOrder_1 = require('./inOrder');
var balanceIfNecessary = require('./BalancingMethods').balanceIfNecessary;
var findParent_1 = require('./findParent');
var newIm = require('./utils').newIm;
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
    deleteLeaf: function (isLeft) { return function (parent) {
        var proto = Object.getPrototypeOf(parent);
        var _newIm = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return Object.freeze(Object.assign(Object.create(proto), newIm.apply(void 0, args)));
        };
        if (isLeft) {
            return _newIm(parent, { left: null });
        }
        else {
            return _newIm(parent, { right: null });
        }
    }; },
    deleteNodeWithOneChild: function (parent) {
        /*
                  A
    
               D     B
    
                       C
         */
        var proto = Object.getPrototypeOf(parent);
        var _newIm = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return Object.freeze(Object.assign(Object.create(proto), newIm.apply(void 0, args)));
        };
        if (parent.left) {
            return _newIm(parent, {
                left: _newIm(parent.left.left || parent.left.right)
            });
        }
        else if (parent.right) {
            return _newIm(parent, {
                right: _newIm(parent.right.left || parent.right.right)
            });
        }
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
        return parent;
    },
};
/**
 *
 * @param isLeaf
 * @param isOnlyChild - if the parent has no other subtrees
 * @param isLeft - shows if it is a left child or not
 * @returns {BSTDeleteMethod}
 */
function chooseDeleteMethod(_a) {
    var isLeaf = _a.isLeaf, isOnlyChild = _a.isOnlyChild, isLeft = _a.isLeft;
    if (isLeaf)
        return BSTDelete.deleteLeaf(isLeft);
    if (isOnlyChild)
        return BSTDelete.deleteNodeWithOneChild;
    return BSTDelete.deleteNodeWithTwoChildren;
}
function findParentAndChild(root, childValue) {
    return (function traverse(_root, _find) {
        if (_root === null) {
            return null;
        }
        if (_root.value === _find) {
            return _root;
        }
        var toTraverse = (_root.value > _find) ? _root.left : _root.right;
        var result = traverse(toTraverse, _find);
        if (result && !result.hasOwnProperty("parent")) {
            // we found the node to delete
            // and are currently in its parent node
            return {
                parent: _root,
                child: result
            };
        }
        else if (result) {
            return result;
        }
        throw new Error("kvo stava tuk");
    }(root, childValue));
}
function generateNodeMeta(root, value) {
    var _a = findParentAndChild(root, value), parent = _a.parent, child = _a.child;
    return {
        isLeaf: !child.left && !child.right,
        isOnlyChild: !!(parent.left && !parent.right) || !!(!parent.left && parent.right),
        isLeft: (parent.left && parent.left.value === child.value)
    };
}
function _deleteNode(root, value) {
    var nodeMeta = generateNodeMeta(root, value);
    var deleteFn = chooseDeleteMethod(nodeMeta);
    return deleteFn(root);
}
module.exports = (function (_deleteNode, _balanceIfNecessary) {
    return function deleteNode(value) {
        var afterDeletion = _deleteNode(this, value);
        var balanced = _balanceIfNecessary(afterDeletion);
        return balanced.root;
    };
})(_deleteNode, balanceIfNecessary);
//# sourceMappingURL=delete.js.map