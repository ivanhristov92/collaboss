"use strict";
var balanceIfNecessary = require('./BalancingMethods').balanceIfNecessary;
var findParent_1 = require('./findParent');
var newIm = require('./utils').newIm;
// ---------helper----
// -------------------
function findInorderSuccessorOf(root, value) {
    var start = (function traverse(_root, _find) {
        if (_root.value === _find) {
            return _root;
        }
        if (_root.value < _find) {
            // go right
            return traverse(_root.right, _find);
        }
        else if (_root.value > _find) {
            // go left
            return traverse(_root.left, _find);
        }
    }(root, value));
    return (function leftMost(_start) {
        return _start.left ? leftMost(_start.left) : _start;
    }(start.right));
}
var BSTDelete = {
    deleteLeaf: function (isLeft) { return function (root, value) {
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
        // attach
    }; },
    deleteNodeWithOneChild: function (root, value) {
        var proto = Object.getPrototypeOf(parent);
        var _newIm = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return Object.freeze(Object.assign(Object.create(proto), newIm.apply(void 0, args)));
        };
        (function traverse(_root, _find) {
            // if there is no such node,
            // return null
            if (_root === null) {
                return null;
            }
            // find the node to delete and return it
            // to get to the parent
            if (_root.value === _find) {
                return { node: _root, isTarget: true };
            }
            // if we did not find it, continue searching
            if (_root.value < _find) {
                var child = traverse(_root.right, _find);
                // when we find the child, remove the 
                // node to delete by updating the parent links
                if (child && child.isTarget) {
                    return {
                        node: _newIm(_root, {
                            right: _newIm(_root.right.left || _root.right.right),
                        }),
                        isTarget: false
                    };
                }
                else if (child !== null) {
                    return {
                        node: _newIm(_root, {
                            right: child.node
                        }),
                        isTarget: false
                    };
                }
                else {
                    return {
                        node: _newIm(_root, {
                            right: null
                        }),
                        isTarget: false
                    };
                }
            }
            else if (_root.value > _find) {
                // go left
                var child = traverse(_root.left, _find);
                // when we find the child, remove the 
                // node to delete by updating the parent links
                if (child && child.isTarget) {
                    return {
                        node: _newIm(_root, {
                            left: _newIm(_root.left.left || _root.left.right),
                        }),
                        isTarget: false
                    };
                }
                else if (child !== null) {
                    return {
                        node: _newIm(_root, {
                            left: child.node
                        }),
                        isTarget: false
                    };
                }
                else {
                    return {
                        node: _newIm(_root, {
                            left: null
                        }),
                        isTarget: false
                    };
                }
            }
        }(root, value));
        // attach
    },
    deleteNodeWithTwoChildren: function (root, value) {
        var proto = Object.getPrototypeOf(root);
        var _newIm = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return Object.freeze(Object.assign(Object.create(proto), newIm.apply(void 0, args)));
        };
        var nextOfKin = findInorderSuccessorOf(root, value);
        // remove the nextOfKin from its original position
        var parentOfNextOfKin = findParent_1.findParent(root, nextOfKin.value);
        // node: iBST | null;
        // fromLeft: boolean;
        // fromRight: boolean;
        (function traverse(_root, _find) {
            // if parent of next of kin - set one of the child nodes to null
            // return new parent of next of kin
            if (_root.value === parentOfNextOfKin.node.value) {
                return _newIm(parentOfNextOfKin.node, {
                    left: parentOfNextOfKin.fromLeft ? null : parentOfNextOfKin.node.left,
                    right: parentOfNextOfKin.fromRight ? null : parentOfNextOfKin.node.right,
                });
            }
            // if parent node - set node to next of kin
            // return new parent
            if (_root.left && _root.left.value === _find) {
                // found parent, attach
                return _newIm(_root, {
                    left: nextOfKin.node
                });
            }
            else if (_root.right && _root.right.value === _find) {
                // found parent, attach
                return _newIm(_root, {
                    right: nextOfKin.node
                });
            }
            // ----
            // else return new node with updated links, traverse??
            if (_root.value < parentOfNextOfKin.node.value) {
                // go right
                var child = traverse(_root.right, _find);
                return _newIm(_root, {
                    right: child
                });
            }
            else if (_root.value > parentOfNextOfKin.node.value) {
                // go left
                var child = traverse(_root.left, _find);
                return _newIm(_root, {
                    left: child
                });
            }
        }(root, value));
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
        var toTraverse = _root.value > _find ? _root.left : _root.right;
        var result = traverse(toTraverse, _find);
        if (result && !result.hasOwnProperty('parent')) {
            // we found the node to delete
            // and are currently in its parent node
            return {
                parent: _root,
                child: result,
            };
        }
        else if (result) {
            return result;
        }
        throw new Error('kvo stava tuk');
    })(root, childValue);
}
function generateNodeMeta(root, value) {
    var _a = findParentAndChild(root, value), parent = _a.parent, child = _a.child;
    return {
        isLeaf: !child.left && !child.right,
        isOnlyChild: !!(parent.left && !parent.right) || !!(!parent.left && parent.right),
        isLeft: parent.left && parent.left.value === child.value,
    };
}
function _deleteNode(root, value) {
    var nodeMeta = generateNodeMeta(root, value);
    var deleteFn = chooseDeleteMethod(nodeMeta);
    return deleteFn(root, value);
}
module.exports = (function (_deleteNode, _balanceIfNecessary) {
    return function deleteNode(value) {
        var afterDeletion = _deleteNode(this, value);
        var balanced = _balanceIfNecessary(afterDeletion);
        return balanced.root;
    };
})(_deleteNode, balanceIfNecessary);
//# sourceMappingURL=delete.js.map