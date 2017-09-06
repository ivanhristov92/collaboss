"use strict";
/**
 *
 * @param value {number}
 * @returns {*}
 * @constructor
 */
function BST(value) {
    return Object.assign(Object.create(BST.prototype), {
        // tree data
        value: value,
        left: null,
        right: null,
        // balancing data
        heightLeft: 0,
        heightRight: 0,
        balanceFactor: 0,
    });
}
exports.BST = BST;
BST.prototype.insert = require('./insert');
BST.prototype.inOrder = require('./inOrder');
BST.prototype.remove = require('./delete');
var bst = BST(1);
bst.insert(-1);
bst.insert(2);
bst.insert(-3);
bst.insert(4);
bst.insert(-5);
//# sourceMappingURL=BST.js.map