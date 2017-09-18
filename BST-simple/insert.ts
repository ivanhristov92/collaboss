/**
 * Created by Game Station on 2.9.2017 г..
 */
import {iBST} from "./BST";



function find(root, value){
  return (function traverse(_root, _find){
    if(_root === null){
      return null;
    }


    if(_root.value === _find){
      return _root;
    }

    if(_root.value <_find){
      // go right
      return traverse(_root.right, _find)
    } else if (_root.value > _find){
      // go left
      return traverse(_root.left, _find)
    }

  }(root, value))
}




/**
 *
 * @param BST {Function} - BST constructor
 * @param root {BST} - a BST instance
 * @param value {any} - the value to be inserted
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

module.exports = ((_insertNode) =>
  function insert(value) {
    let inserted = _insertNode({
      BST: Object.getPrototypeOf(this).constructor,
      root: this,
      value
    });

    if(inserted){
      let found = find(inserted, value);
      if(found === null){
        let c;
      }
    }

    return inserted;
  })(_insertNodeInBst);
