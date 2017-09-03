"use strict";
/**
 * Created by Game Station on 2.9.2017 г..
 */
var balance = require('./BalancingMethods').balanceIfNecessary;
var log = require("./utils").log;
function _insertNodeInBst(_a) {
    var BST = _a.BST, root = _a.root, value = _a.value, _b = _a.indentation, indentation = _b === void 0 ? '|-' : _b;
    log(indentation + ("root:(" + root.value + "), new value:(" + value + ")"));
    if (value < root.value) {
        // Go left
        log(indentation + 'go left'); // TODO create a JSC test
        if (root.left) {
            log(indentation + 'a left is found');
            _insertNodeInBst({
                BST: BST,
                root: root.left,
                value: value,
                indentation: indentation + '-',
            });
        }
        else {
            log(indentation + 'no left value found, inserting');
            root.left = BST(value);
        }
    }
    else if (value > root.value) {
        // Go right
        log(indentation + 'go right'); // TODO create a JSC test
        if (root.right) {
            log(indentation + 'a right is found');
            _insertNodeInBst({
                BST: BST,
                root: root.right,
                value: value,
                indentation: indentation + '-',
            });
        }
        else {
            log(indentation + 'no right value found, inserting');
            root.right = BST(value);
        }
    }
}
module.exports = (function (_insertNode, _balanceIfNecessary) {
    return function insert(value) {
        _insertNode({
            BST: Object.getPrototypeOf(this).constructor,
            root: this,
            value: value
        });
        _balanceIfNecessary(this);
    };
})(_insertNodeInBst, balance);
//# sourceMappingURL=insert.js.map