import { iBST } from './BST';
/**
 * Created by Game Station on 3.9.2017 г..
 */
import inOrder from './inOrder';

export interface iFindParentOutput {
  node: iBST | null;
  fromLeft: boolean;
  fromRight: boolean;
}

export type iFindParent = (root: iBST, childValue: number) => iFindParentOutput;

export function findParent(root: iBST, childValue: number): iFindParentOutput {
  let parent = {
    node: null,
    fromLeft: false,
    fromRight: false,
  };

  if (root.value === childValue) {
    return parent;
  }

  if (root.value > childValue) {
    // go left
    if (root.left && root.left.value === childValue) {
      parent.node = root;
      parent.fromLeft = true;
      return Object.freeze(parent);
    }
    return findParent(root.left, childValue);
  } else if (root.value < childValue) {
    // go right
    if (root.right && root.right.value === childValue) {
      parent.node = root;
      parent.fromRight = true;
      return Object.freeze(parent);
    }
    return findParent(root.right, childValue);
  }
}
