/**
 * Created by Game Station on 2.9.2017 г..
 */
const balance = require('./BalancingMethods').balanceIfNecessary;
import {iBST} from "./BST";
import inOrder from "./inOrder";


/**
 *
 * @param BST {Function} - BST constructor
 * @param root {BST} - a BST instance
 * @param value {any} - the value to be inserted
 * @param indentation {string} - used for logging in debug mode
 * @private
 */
interface args{BST:Function, root: iBST, value: number, indentation?: string}
function _insertNodeInBst({ BST, root, value} : args): iBST {

  if (value < root.value) {

    // Go left

    if (root.left) {
      let acc = _insertNodeInBst({
        BST,
        root: root.left,
        value
      });
      root = Object.freeze(Object.assign(Object.create(BST.prototype), root, {left: acc} ));
      return root;
    } else {
      root = Object.freeze(Object.assign(Object.create(BST.prototype), root, {left: BST(value)}));
      return root;
    }

  } else if (value > root.value) {

    // Go right

    if (root.right) {
      let acc = _insertNodeInBst({
        BST,
        root: root.right,
        value
      });
      root = Object.freeze(Object.assign(Object.create(BST.prototype), root, {right: acc} ));
      return root;
    } else {
      root = Object.freeze(Object.assign(Object.create(BST.prototype), root, {right: BST(value)}));
      return root;
    }
  } else if(value === root.value){
    return null;
  } else {
    throw new Error("bad")
  }
}

module.exports = ((_insertNode, _balanceIfNecessary) =>
  function insert(value) {

    let inserted: iBST = _insertNode({
      BST: Object.getPrototypeOf(this).constructor,
      root: this,
      value
    });

    if(inserted){
      var balanced = _balanceIfNecessary(inserted);
      return balanced;
    } else {
      return this;
    }

  })(_insertNodeInBst, balance);
