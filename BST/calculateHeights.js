/**
 * Created by Game Station on 3.9.2017 г..
 */
"use strict";
var BST_1 = require("./BST");
/**
 *
 * @param root {BST}
 * @returns {BST|null} - only returns BST if it is unbalanced
 */
function calculateHeights(root) {
    var imbalanced = null;
    (function traverse(_root) {
        if (_root === null) {
            // * means we reached the end leaves
            // * and are even a step past them
            return {
                node: _root,
                height: 0
            };
        }
        if (_root == undefined) {
            var h = void 0;
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
            imbalanced = _root;
        }
        return Object.freeze({
            node: _root,
            height: Math.max(_root.heightLeft, _root.heightRight) + 1
        });
    })(root);
    if (imbalanced instanceof BST_1.BST) {
        var da = void 0;
    }
    else {
        var ne = void 0;
    }
    return imbalanced;
}
exports.calculateHeights = calculateHeights;
//# sourceMappingURL=calculateHeights.js.map