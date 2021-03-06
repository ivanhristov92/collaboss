/**
 *
 * @param value {number}
 * @returns {*}
 * @constructor
 */
function BST(value) {
  return Object.assign(Object.create(BST.prototype), {

    // tree data
    value,
    left: null,
    right: null,

    // balancing data
    heightLeft: 0,
    heightRight: 0,
    balanceFactor: 0,
  });
}

BST.prototype.insert = require('./insert');
BST.prototype.inOrder = require('./inOrder');

let bst = BST(1);
bst.insert(-1);
bst.insert(2);
bst.insert(-3);
bst.insert(4);
bst.insert(-5);