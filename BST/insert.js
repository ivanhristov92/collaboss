"use strict";
/**
 * Created by Game Station on 2.9.2017 г..
 */
var balance = require('./BalancingMethods').balanceIfNecessary;
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
module.exports = (function (_insertNode, _balanceIfNecessary) {
    return function insert(value) {
        var inserted = _insertNode({
            BST: Object.getPrototypeOf(this).constructor,
            root: this,
            value: value
        });
        if (inserted) {
            var balanced = _balanceIfNecessary(inserted);
            return balanced;
        }
        else {
            return this;
        }
    };
})(_insertNodeInBst, balance);
//# sourceMappingURL=insert.js.map