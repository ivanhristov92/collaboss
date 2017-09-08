"use strict";
var calculateHeights_1 = require('./calculateHeights');
var findParent_1 = require('./findParent');
var log = require('./utils').log;
var newIm = require('./utils').newIm;
var newImWith = require('./utils').newImWith;
var balancingMethods = Object.freeze({
    /**
       * Left-Left
       * @param root {BST}
       * @param imbalanced {BST|null}
       * @returns {*}
       */
    LL: function (imbalanced) {
        var proto = Object.getPrototypeOf(imbalanced);
        var _newIm = function () {
            return Object.freeze(Object.assign(Object.create(proto), newIm.apply(void 0, arguments)));
        };
        var A = _newIm(imbalanced);
        var Ar = imbalanced.right ? _newIm(imbalanced.right) : null;
        var B = imbalanced.left ? _newIm(imbalanced.left) : null;
        var Br = imbalanced.left.right ? _newIm(imbalanced.left.right) : null;
        var C = imbalanced.left.left ? _newIm(imbalanced.left.left) : null;
        var newNode = _newIm(B);
        // newNode.right = _newIm(A);
        newNode = _newIm(newNode, {
            right: _newIm(A)
        });
        // newNode.right.right = Ar ? _newIm(Ar) : null;
        newNode = _newIm(newNode, {
            right: _newIm(A, {
                right: Ar ? _newIm(Ar) : null,
                left: Br ? _newIm(Br) : null
            }),
            left: C ? _newIm(C) : null
        });
        // newNode.right.left = Br ? _newIm(Br) : null;
        return newNode;
    },
    RR: function (imbalanced) {
        var proto = Object.getPrototypeOf(imbalanced);
        var _newIm = function () {
            return Object.freeze(Object.assign(Object.create(proto), newIm.apply(void 0, arguments)));
        };
        var A = _newIm(imbalanced);
        var Al = imbalanced.left ? _newIm(imbalanced.left) : null;
        var B = imbalanced.right ? _newIm(imbalanced.right) : null;
        var Bl = imbalanced.right.left ? _newIm(imbalanced.right.left) : null;
        var C = imbalanced.right.right ? _newIm(imbalanced.right.right) : null;
        var Cl = imbalanced.right.right.left ? _newIm(imbalanced.right.right.left) : null;
        var Cr = imbalanced.right.right.right ? _newIm(imbalanced.right.right.right) : null;
        if (!A || !B || !C) {
            throw new Error("kofti");
        }
        var newNode = _newIm(B, {
            left: _newIm(A, {
                left: Al ? _newIm(Al) : null,
                right: Bl ? _newIm(Bl) : null
            }),
            right: C ? _newIm(C, {
                left: Cl ? _newIm(Cl) : null,
                right: Cr ? _newIm(Cr) : null
            }) : null
        });
        return newNode;
    },
    LR: function (imbalanced) {
        var proto = Object.getPrototypeOf(imbalanced);
        var _newIm = function () {
            return Object.freeze(Object.assign(Object.create(proto), newIm.apply(void 0, arguments)));
        };
        var A = _newIm(imbalanced);
        var B = imbalanced.left ? _newIm(imbalanced.left) : null;
        var C = imbalanced.left.right ? _newIm(imbalanced.left.right) : null;
        var Cl = imbalanced.left.right.left ? _newIm(imbalanced.left.right.left) : null;
        var Cr = imbalanced.left.right.right ? _newIm(imbalanced.left.right.right) : null;
        if (!A || !B || !C) {
            throw new Error("kofti");
        }
        // let newNode = _newIm(C);
        var newNode = _newIm(C, {
            left: newIm(B, {
                right: Cl ? _newIm(Cl) : (Cr ? _newIm(Cr) : null)
            }),
            right: newIm(A, { left: null })
        });
        return newNode;
    },
    RL: function (imbalanced) {
        var proto = Object.getPrototypeOf(imbalanced);
        var _newIm = function () {
            return Object.freeze(Object.assign(Object.create(proto), newIm.apply(void 0, arguments)));
        };
        var A = _newIm(imbalanced);
        var B = imbalanced.right ? _newIm(imbalanced.right) : null;
        var C = imbalanced.right.left ? _newIm(imbalanced.right.left) : null;
        var Cl = imbalanced.right.left.left ? _newIm(imbalanced.right.left.left) : null;
        var Cr = imbalanced.right.left.right ? _newIm(imbalanced.right.left.right) : null;
        if (!A || !B || !C) {
            throw new Error("kofti");
        }
        // let newNode = _newIm(C);
        var newNode = _newIm(C, {
            left: _newIm(A, {
                right: null
            }),
            right: B ? _newIm(B, {
                left: Cl ? _newIm(Cl) : (Cr ? _newIm(Cr) : null)
            }) : null
        });
        return newNode;
    },
});
var chooseTreeBalancingMethod = (function (LL, LR, RR, RL) {
    /**
       *
       * @param node {BST|null}
       * @returns {*}
       */
    return function chooseTreeBalancingMethod(node) {
        if (!node)
            return null;
        if (node.heightLeft > node.heightRight) {
            if (node.left.heightLeft > node.left.heightRight) {
                // Left-Left imbalance
                log('LL');
                return LL;
            }
            else if (node.left.heightLeft < node.left.heightRight) {
                // Left-Right imbalance
                log('LR');
                return LR;
            }
        }
        else if (node.heightLeft < node.heightRight) {
            if (node.right.heightLeft > node.right.heightRight) {
                // Right-Left imbalance
                log('RL');
                return RL;
            }
            else if (node.right.heightLeft < node.right.heightRight) {
                // Right-Right imbalance
                log('RR');
                return RR;
            }
        }
    };
})(balancingMethods.LL, balancingMethods.LR, balancingMethods.RR, balancingMethods.RL);
function attachingStrategy(root, parent, balancedSubTree) {
    var toAttach = null;
    var proto = Object.getPrototypeOf(root);
    if (parent.node) {
        if (parent.fromLeft) {
            // toAttach = Object.freeze(Object.assign(Object.create(proto), parent.node, {left: balancedSubTree}));
            Object.freeze(Object.assign(parent.node, { left: balancedSubTree }));
        }
        else {
            // toAttach = Object.freeze(Object.assign(Object.create(proto), parent.node, {right: balancedSubTree}));
            toAttach = Object.freeze(Object.assign(parent.node, { right: balancedSubTree }));
        }
    }
    else {
        // we modified the root node
        return Object.freeze(Object.freeze(Object.assign(Object.create(proto), root, balancedSubTree)));
    }
}
var balancingStrategy = (function (findParent, chooseMethod, attachingStrategy) {
    return function balancingStrategy(root, imbalancedSubTree) {
        var parent = findParent(root, imbalancedSubTree.value);
        var balanceFn = chooseMethod(imbalancedSubTree);
        if (!parent.node && root.value !== imbalancedSubTree.value) {
            var f = void 0;
        }
        return {
            parent: parent,
            fn: balanceFn,
            apply: function () {
                var balancedSubTree = balanceFn(imbalancedSubTree);
                var balanced = attachingStrategy(root, parent, balancedSubTree);
                if (parent.node && parent.node.value) {
                    var g = void 0;
                }
                return { balanced: balanced, balancedSubTree: balancedSubTree, imbalancedSubTree: imbalancedSubTree };
            }
        };
    };
})(findParent_1.findParent, chooseTreeBalancingMethod, attachingStrategy);
module.exports.balanceIfNecessary = (function (isTreeBalanced) {
    /**
       *
       * @param root {BST}
       */
    return function balanceIfNecessary(root) {
        // update the balance factor across the tree
        // and look for imbalanced areas
        var isBalanced = isTreeBalanced(root);
        if (isBalanced.balanced) {
            var _root = isBalanced.root;
            // return _root;
            return { root: _root, fn: null };
        }
        // const balancedSubTree = balancingStrategy(isBalanced.root, isBalanced.imbalancedNode});
        var strategy = balancingStrategy(isBalanced.root, isBalanced.imbalancedNode);
        var b = strategy.apply();
        var balanced = b.balanced;
        var imbalancedSubTree = b.imbalancedSubTree;
        var balancedSubTree = b.balancedSubTree;
        return { root: balanced, balancedSubTree: balancedSubTree, fn: strategy.fn, parent: strategy.parent.node, imbalancedSubTree: imbalancedSubTree };
        // update the heights and balanceFactors
        // in all nodes
        // re-balance if necessary
        return balanceIfNecessary(balanced);
    };
})(calculateHeights_1.calculateHeights);
//# sourceMappingURL=BalancingMethods.js.map