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
  RR(imbalanced: iBST) {
    let A = imbalanced;
    let Al = imbalanced.left;
    let B = imbalanced.right;
    let Bl = imbalanced.right.left;
    let C = imbalanced.right.right;

    let newNode = (<any>Object).assign({}, B);
    newNode.left = (<any>Object).assign({}, A);
    newNode.left.left = Al ? (<any>Object).assign({}, Al) : null;
    newNode.left.right = Bl ? (<any>Object).assign({}, Bl) : null;
    newNode.right = (<any>Object).assign({}, C);
    return newNode;
  },
  LR(imbalanced: iBST) {
    let A = imbalanced;
    let B = imbalanced.left;
    let C = imbalanced.left.right;

    let newNode = (<any>Object).assign({}, C);
    newNode.left = (<any>Object).assign({}, B);
    newNode.left.right = null;
    newNode.right = (<any>Object).assign({}, A);
    newNode.right.left = null;
    return newNode;
  },
  RL(imbalanced: iBST) {
    let A = imbalanced;
    let B = imbalanced.right;
    let C = imbalanced.right.left;

    let newNode = (<any>Object).assign({}, C);
    newNode.left = (<any>Object).assign({}, A);
    newNode.left.right = null;
    newNode.right = (<any>Object).assign({}, B);
    newNode.right.left = null;
    return newNode;
  },
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
      if (node.left.heightLeft >= node.left.heightRight) {
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
      } else if (node.right.heightLeft <= node.right.heightRight) {
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

function attachingStrategy(
  root: iBST,
  parent: iFindParentOutput,
  balancedSubTree: iBST,
) {
  if (parent.node) {
    parent.fromLeft
      ? (parent.node.left = balancedSubTree)
      : (parent.node.right = balancedSubTree);
  } else {
    // we modified the root node
    (<any>Object).assign(root, balancedSubTree);
  }
}

const balancingStrategy = (function(
  findParent: (root: iBST, childValue: number) => iFindParentOutput,
  chooseMethod: (root: iBST) => (imbalancedTree: iBST) => iBST,
  attachingStrategy: (
    root: iBST,
    parent: iFindParentOutput,
    balancedSubTree: iBST,
  ) => void,
) {
  return function balancingStrategy(root: iBST, imbalancedSubTree: iBST) {
    let parent = findParent(root, imbalancedSubTree.value);
    let balanceFn = chooseMethod(imbalancedSubTree);
    if(!balanceFn){
      let b;
    }
    let balancedSubTree = balanceFn(imbalancedSubTree);

    attachingStrategy(root, parent, balancedSubTree);
  };
})(findParent, chooseTreeBalancingMethod, attachingStrategy);

module.exports.balanceIfNecessary = (function(
  isTreeBalanced: (root: iBST) => iBST | null,
) {
  /**
     *
     * @param root {BST}
     */
  return function balanceIfNecessary(root: iBST) {
    // update the balance factor across the tree
    // and look for imbalanced areas
    let imbalancedSubTree = isTreeBalanced(root);

    if (!imbalancedSubTree) {
      return;
    }

    balancingStrategy(root, imbalancedSubTree);

    // update the heights and balanceFactors
    // in all nodes
    // re-balance if necessary
    balanceIfNecessary(root);
  };
})(calculateHeights);
