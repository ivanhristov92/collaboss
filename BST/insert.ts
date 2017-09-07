import {calculateHeights} from "./calculateHeights";
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

function find(root, value){
  return (function traverse(_root){
    if(_root === null){
      return null;
    }


    let a = traverse(_root.left);
    if(a){return a}
    if(_root.value === value){
      return _root;
    }
    return traverse(_root.right);

  }(root))
}

module.exports = ((_insertNode, _balanceIfNecessary) =>
  function insert(value) {

    let inserted: iBST = _insertNode({
      BST: Object.getPrototypeOf(this).constructor,
      root: this,
      value
    });


    if(inserted){

      var _find = find(inserted, value);

      // var balanced = calculateHeights(inserted).root;

      var _balanced = _balanceIfNecessary(inserted);
      var balanced = _balanced.root;

      var _find2 = find(balanced, value);

      if(_balanced.parent){
        var _find3 = find(_balanced.parent, value);
        if(!_find3){
          let a;
        }
      }
      if(_balanced.balancedSubTree){
        var _find4 = find(_balanced.balancedSubTree, value);
        if(!_find4 ){
          let a;
        }
      }

      if(_balanced.balanced){
        var _find5 = find(_balanced.balanced, value);
        if(!_find5){
          let a;
        } else {
          let b;
        }
      }
      if(!_find || !_find2){
        let d;
      }

      return balanced;
    } else {
      return this;
    }

  })(_insertNodeInBst, balance);
