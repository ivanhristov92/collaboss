"use strict";
/**
 * Created by Game Station on 2.9.2017 г..
 */
var balance = require('./BalancingMethods').balanceIfNecessary;
var inOrder_1 = require("./inOrder");
var _ = require("ramda");
function _insertNodeInBst(_a) {
    var BST = _a.BST, root = _a.root, value = _a.value;
    if (value < root.value) {
        // Go left
        if (root.left) {
            var acc = _insertNodeInBst({
                BST: BST,
                root: root.left,
                value: value
            });
            root = Object.freeze(Object.assign(Object.create(BST.prototype), root, { left: acc }));
            return root;
        }
        else {
            root = Object.freeze(Object.assign(Object.create(BST.prototype), root, { left: BST(value) }));
            return root;
        }
    }
    else if (value > root.value) {
        // Go right
        if (root.right) {
            var acc = _insertNodeInBst({
                BST: BST,
                root: root.right,
                value: value
            });
            root = Object.freeze(Object.assign(Object.create(BST.prototype), root, { right: acc }));
            return root;
        }
        else {
            root = Object.freeze(Object.assign(Object.create(BST.prototype), root, { right: BST(value) }));
            return root;
        }
    }
    else if (value === root.value) {
        return null;
    }
    else {
        throw new Error("bad");
    }
}
function find(root, value) {
    return (function traverse(_root) {
        if (_root === null) {
            return null;
        }
        var a = traverse(_root.left);
        if (a) {
            return a;
        }
        if (_root.value === value) {
            return _root;
        }
        return traverse(_root.right);
    }(root));
}
module.exports = (function (_insertNode, _balanceIfNecessary) {
    return function insert(value) {
        var before = [];
        inOrder_1.default(this, function (node) { return before.push(node.value); });
        var inserted = _insertNode({
            BST: Object.getPrototypeOf(this).constructor,
            root: this,
            value: value
        });
        if (inserted) {
            var _find = find(inserted, value);
            // var balanced = calculateHeights(inserted).root;
            var _balanced = _balanceIfNecessary(inserted);
            var balanced = _balanced.root;
            var _find2 = find(balanced, value);
            if (_balanced.parent) {
                var _find3 = find(_balanced.parent, value);
                if (!_find3) {
                    var a = void 0;
                }
            }
            if (_balanced.balancedSubTree) {
                var _find4 = find(_balanced.balancedSubTree, value);
                if (!_find4) {
                    var a = void 0;
                }
            }
            if (_balanced.balanced) {
                var _find5 = find(_balanced.balanced, value);
                if (!_find5) {
                    var a = void 0;
                }
                else {
                    var b = void 0;
                }
            }
            if (!_find || !_find2) {
                var d = void 0;
            }
            var after_1 = [];
            inOrder_1.default(balanced, function (node) { return after_1.push(node.value); });
            if (_.uniq(before).length !== _.uniq(after_1).length - 1) {
                var c = void 0;
            }
            return balanced;
        }
        else {
            return this;
        }
    };
})(_insertNodeInBst, balance);
//# sourceMappingURL=insert.js.map