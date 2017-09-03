/**
 * Created by Game Station on 2.9.2017 г..
 */
const balance = require('./BalancingMethods').balanceIfNecessary;
const log = require("./utils").log;
import {iBST} from "./BST";


/**
 *
 * @param BST {Function} - BST constructor
 * @param root {BST} - a BST instance
 * @param value {any} - the value to be inserted
 * @param indentation {string} - used for logging in debug mode
 * @private
 */
interface args{BST:Function, root: iBST, value: number, indentation?: string}
function _insertNodeInBst({ BST, root, value, indentation = '|-' } : args) {

  log(indentation + `root:(${root.value}), new value:(${value})`);

  if (value < root.value) {

    // Go left

    log(indentation + 'go left'); // TODO create a JSC test

    if (root.left) {
      log(indentation + 'a left is found');
      _insertNodeInBst({
        BST,
        root: root.left,
        value,
        indentation: indentation + '-',
      });
    } else {
      log(indentation + 'no left value found, inserting');
      root.left = BST(value);
    }

  } else if (value > root.value) {

    // Go right

    log(indentation + 'go right'); // TODO create a JSC test

    if (root.right) {
      log(indentation + 'a right is found');
      _insertNodeInBst({
        BST,
        root: root.right,
        value,
        indentation: indentation + '-',
      });
    } else {
      log(indentation + 'no right value found, inserting');
      root.right = BST(value);
    }
  }
}

module.exports = ((_insertNode, _balanceIfNecessary) =>
  function insert(value) {
    _insertNode({
      BST: Object.getPrototypeOf(this).constructor,
      root: this,
      value
    });
    _balanceIfNecessary(this);
  })(_insertNodeInBst, balance);
