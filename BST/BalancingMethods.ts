import { iBST } from './BST';

import { calculateHeights } from './calculateHeights';
import { findParent, iFindParent, iFindParentOutput } from './findParent';

const inOrder = require('./inOrder');
const log = require('./utils').log;

const balancingMethods = Object.freeze({
  /**
     * Left-Left
     * @param root {BST}
     * @param imbalanced {BST|null}
     * @returns {*}
     */
  LL(imbalanced: iBST) {
    let A = imbalanced;
    let Ar = imbalanced.right;
    let B = imbalanced.left;
    let Br = imbalanced.left.right;
    let C = imbalanced.left.left;

    let newNode = (<any>Object).assign({}, B);
    newNode.right = (<any>Object).assign({}, A);
    newNode.right.right = Ar ? (<any>Object).assign({}, Ar) : null;
    newNode.right.left = Br ? (<any>Object).assign({}, Br) : null;
    newNode.left = (<any>Object).assign({}, C);
    return newNode;
  },
  RR() {},
  LR() {},
  RL() {},
});

const chooseTreeBalancingMethod = (function(LL, LR, RR, RL) {
  /**
     *
     * @param node {BST|null}
     * @returns {*}
     */
  return function chooseTreeBalancingMethod(node: iBST) {
    if (!node) return null;

    if (node.heightLeft > node.heightRight) {
      if (node.left.heightLeft > node.left.heightRight) {
        // Left-Left imbalance
        log('LL');
        return LL;
      } else if (node.left.heightLeft < node.left.heightRight) {
        // Left-Right imbalance
        log('LR');
        return LR;
      }
    } else if (node.heightLeft < node.heightRight) {
      if (node.right.heightLeft > node.right.heightRight) {
        // Right-Left imbalance
        log('RL');
        return RL;
      } else if (node.right.heightLeft < node.right.heightRight) {
        // Right-Right imbalance
        log('RR');
        return RR;
      }
    }
  };
})(
  balancingMethods.LL,
  balancingMethods.LR,
  balancingMethods.RR,
  balancingMethods.RL,
);

module.exports.balanceIfNecessary = (function(
  isTreeBalanced: (root: iBST) => iBST | null,
  findParent: (root: iBST, childValue: number) => iFindParentOutput,
  chooseMethod: (root: iBST) => (imbalancedTree: iBST) => iBST,
) {
  /**
     *
     * @param root {BST}
     */
  return function(root: iBST) {
    // update the balance factor across the tree
    // and look for imbalanced areas
    let imbalancedSubTree = isTreeBalanced(root);
    if (imbalancedSubTree) {
      let parent = findParent(root, imbalancedSubTree.value);
      let balanceFn = chooseMethod(imbalancedSubTree);

      let balancedSubTree = balanceFn(imbalancedSubTree);

      if (parent.node) {
        parent.fromLeft
          ? (parent.node.left = balancedSubTree)
          : (parent.node.right = balancedSubTree);
      } else {
        // we modified the root node
       (<any>Object).assign(root, balancedSubTree);
      }
      // update the heights and balanceFactors
      // in all nodes
      isTreeBalanced(root);
      log('root', root);
    }
  };
})(calculateHeights, findParent, chooseTreeBalancingMethod);
