"use strict";
var inOrder_1 = require("./inOrder");
var _ = require("ramda");
/**
 *
 * @param value {number}
 * @returns {*}
 * @constructor
 */
function BST(value) {
    return Object.freeze(Object.assign(Object.create(BST.prototype), {
        // tree data
        value: value,
        left: null,
        right: null,
        // balancing data
        heightLeft: 0,
        heightRight: 0,
        balanceFactor: 0,
    }));
}
exports.BST = BST;
BST.prototype.insert = require('./insert');
BST.prototype.inOrder = inOrder_1.default;
BST.prototype.remove = require('./delete');
//# sourceMappingURL=BST.js.map