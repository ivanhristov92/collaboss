/**
 * Created by Game Station on 3.9.2017 г..
 */

import {iBST, BST} from "./BST";
/**
 *
 * @param root {BST}
 * @returns {BST|null} - only returns BST if it is unbalanced
 */
export function calculateHeights(root: iBST): iBST | null {
  let imbalanced = null;

  (function traverse(_root: iBST) {
    if (_root === null) {
      // * means we reached the end leaves
      // * and are even a step past them
      return {
        node: _root,
        height: 0
      };
    }



    if(_root == undefined){
      let h;
    }

    const BSTproto = Object.getPrototypeOf(_root);


    const _left = traverse(_root.left);
    const left = Object.freeze({
      heightLeft: _left.height,
      left: _left.node ? Object.freeze(Object.assign(Object.create(BSTproto),_left.node)) : null
    });
    const _right = traverse(_root.right);
    const right = Object.freeze({
      heightRight: _right.height,
      right: _right.node ? Object.freeze(Object.assign(Object.create(BSTproto),_right.node)) : null
    });

    _root = Object.freeze(Object.assign(Object.create(BSTproto), _root, left, right, {
      balanceFactor: left.heightLeft - right.heightRight
    }));

    if (_root.balanceFactor < -1 || _root.balanceFactor > 1) {
        imbalanced = _root;
    }

    return Object.freeze({
      node: _root,
      height: Math.max(_root.heightLeft, _root.heightRight) + 1
    });
  })(root);

  if(imbalanced instanceof BST){
    let da;
  } else {
    let ne;
  }

  return imbalanced;
}
