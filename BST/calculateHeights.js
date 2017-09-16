/**
 * Created by Game Station on 3.9.2017 г..
 */
"use strict";
var BST_1 = require("./BST");
function calculateHeights(root) {
    var isBalanced = {
        balanced: true,
        imbalancedNode: null,
        root: root
    };
    var node = (function traverse(_root) {
        if (_root === null) {
            // * means we reached the end leaves
            // * and are even a step past them
            return {
                node: _root,
                height: 0
            };
        }
        var BSTproto = Object.getPrototypeOf(_root);
        var _left = traverse(_root.left);
        var left = Object.freeze({
            heightLeft: _left.height,
            left: _left.node ? Object.freeze(Object.assign(Object.create(BSTproto), _left.node)) : null
        });
        var _right = traverse(_root.right);
        var right = Object.freeze({
            heightRight: _right.height,
            right: _right.node ? Object.freeze(Object.assign(Object.create(BSTproto), _right.node)) : null
        });
        _root = Object.freeze(Object.assign(Object.create(BSTproto), _root, left, right, {
            balanceFactor: left.heightLeft - right.heightRight
        }));
        if (_root.balanceFactor < -1 || _root.balanceFactor > 1) {
            if (isBalanced.balanced) {
                // if we've already located an imbalanced
                // subtree, it must have been closer to the leafs,
                // so we do not replace it
                isBalanced.imbalancedNode = _root;
                isBalanced.balanced = false;
            }
        }
        return Object.freeze({
            node: _root,
            height: Math.max(_root.heightLeft, _root.heightRight) + 1
        });
    })(root).node;
    if (isBalanced.imbalancedNode instanceof BST_1.BST) {
        var da = void 0;
    }
    else {
        var ne = void 0;
    }
    isBalanced.root = node;
    return isBalanced;
}
exports.calculateHeights = calculateHeights;
//# sourceMappingURL=calculateHeights.js.map