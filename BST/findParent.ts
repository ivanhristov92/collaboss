import { iBST } from './BST';
/**
 * Created by Game Station on 3.9.2017 г..
 */
const inOrder = require('./inOrder');

export interface iFindParentOutput {
  node: iBST | null;
  fromLeft: boolean;
  fromRight: boolean;
}

export type iFindParent = (root: iBST, childValue: number) => iFindParentOutput;

export const findParent: iFindParent = (function(inorder: Function) {
  /**
     *
     * @param root {BST|null}
     * @param childValue {number}
     * @returns {{node: BST|null, fromLeft: boolean, fromRight: boolean}}
     */
  return function findParent(
    root: iBST,
    childValue: number,
  ): iFindParentOutput {
    let parent = {
      node: null,
      fromLeft: false,
      fromRight: false,
    };

    inorder(root, current => {
      if (current.left && current.left.value === childValue) {
        parent.node = current;
        parent.fromLeft = true;
      } else if (current.right && current.right.value === childValue) {
        parent.node = current;
        parent.fromRight = true;
      }
    });
    return parent;
  };
})(inOrder);
