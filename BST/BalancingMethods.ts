import {iBST, SBT, BST} from './BST';

import { calculateHeights, calculateHeightsOutput } from './calculateHeights';
import { findParent, iFindParent, iFindParentOutput } from './findParent';

import inOrder from './inOrder';
const log = require('./utils').log;
const newIm = require('./utils').newIm;
const newImWith = require('./utils').newImWith;

const balancingMethods = Object.freeze({
  /**
     * Left-Left
     * @param root {BST}
     * @param imbalanced {BST|null}
     * @returns {*}
     */
  LL(imbalanced: iBST) {

    let proto = Object.getPrototypeOf(imbalanced);

    const _newIm = function(){
      return Object.freeze(Object.assign(Object.create(proto), newIm(...arguments)))
    }


    let A = _newIm(imbalanced);
    let Ar = imbalanced.right ? _newIm(imbalanced.right) : null;
    let B = imbalanced.left ? _newIm(imbalanced.left) : null;
    let Br = imbalanced.left.right ? _newIm(imbalanced.left.right) : null;
    let C = imbalanced.left.left ? _newIm(imbalanced.left.left) : null;
    let newNode = _newIm(B);
    // newNode.right = _newIm(A);
    newNode = _newIm(newNode, {
      right: _newIm(A)
    });

    // newNode.right.right = Ar ? _newIm(Ar) : null;
    newNode = _newIm(newNode, {
      right: _newIm(A, {
        right: Ar ? _newIm(Ar) : null,
        left: Br ? _newIm(Br) : null
      }),
      left: C ? _newIm(C) : null
    });
    // newNode.right.left = Br ? _newIm(Br) : null;
    return newNode;
  },
  RR(imbalanced: iBST) {

    let proto = Object.getPrototypeOf(imbalanced);

    const _newIm = function(){
      return Object.freeze(Object.assign(Object.create(proto), newIm(...arguments)))
    }


    let A = _newIm(imbalanced);
    let Al = imbalanced.left ? _newIm(imbalanced.left) : null;
    let B = imbalanced.right ? _newIm(imbalanced.right) : null;
    let Bl = imbalanced.right.left ? _newIm(imbalanced.right.left) : null;
    let C = imbalanced.right.right ? _newIm(imbalanced.right.right) : null;

    let newNode = _newIm(B, {
      left: _newIm(A, {
        left: Al ? _newIm(Al) : null,
        right: Bl ? _newIm(Bl) : null
      }),
      right: C ? _newIm(C) : null
    });
    return newNode;
  },
  LR(imbalanced: iBST) {

    let proto = Object.getPrototypeOf(imbalanced);

    const _newIm = function(){
      return Object.freeze(Object.assign(Object.create(proto), newIm(...arguments)))
    }

    let A = _newIm(imbalanced);
    let B = imbalanced.left ? _newIm(imbalanced.left) : null;
    let C = imbalanced.left.right ? _newIm(imbalanced.left.right) : null;

    // let newNode = _newIm(C);
    let newNode = _newIm(C, {
      left: B ? _newIm(B, {right: null}) : null,
      right: A ? _newIm(A, {left: null}) : null
    });

    return newNode;
  },
  RL(imbalanced: iBST) {

    let proto = Object.getPrototypeOf(imbalanced);

    const _newIm = function(){
      return Object.freeze(Object.assign(Object.create(proto), newIm(...arguments)))
    }

    let A = _newIm(imbalanced);
    let B = imbalanced.right ? _newIm(imbalanced.right) : null;
    let C = imbalanced.right.left ? _newIm(imbalanced.right.left) : null;

    // let newNode = _newIm(C);
    let newNode = _newIm(C, {
      left: _newIm(A, {
        right: null
      }),
      right: B ? _newIm(B, {left: null}) : null
    });
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
  balancingMethods.RL
);

function attachingStrategy(
  root: iBST,
  parent: iFindParentOutput,
  balancedSubTree: iBST,
) {
  const proto = Object.getPrototypeOf(root);
  if (parent.node) {
    if(parent.fromLeft){
      return Object.freeze(Object.assign(Object.create(proto), parent.node, {left: balancedSubTree}));
    } else {
      return Object.freeze(Object.assign(Object.create(proto), parent.node, {right: balancedSubTree}));
    }
  } else {
    // we modified the root node
    return Object.freeze(Object.freeze(Object.assign(Object.create(proto), root, balancedSubTree)));
  }
}

const balancingStrategy = (function(
  findParent: (root: iBST, childValue: number) => iFindParentOutput,
  chooseMethod: (root: iBST) => (imbalancedTree: iBST) => iBST,
  attachingStrategy: (
    root: iBST,
    parent: iFindParentOutput,
    balancedSubTree: iBST,
  ) => iBST | null,
) {
  return function balancingStrategy(root: iBST, imbalancedSubTree: iBST): iBST | null {
    let parent = findParent(root, imbalancedSubTree.value);
    let balanceFn = chooseMethod(imbalancedSubTree);
    let balancedSubTree = balanceFn(imbalancedSubTree);

    let balanced = attachingStrategy(root, parent, balancedSubTree);
    if(balanced instanceof BST){

    } else {
      let ne;
    }
    return balanced;
  };
})(findParent, chooseTreeBalancingMethod, attachingStrategy);

module.exports.balanceIfNecessary = (function(
  isTreeBalanced: (root: iBST) => calculateHeightsOutput,
) {
  /**
     *
     * @param root {BST}
     */
  return function balanceIfNecessary(root: iBST) :iBST | null {
    // update the balance factor across the tree
    // and look for imbalanced areas
    let isBalanced: calculateHeightsOutput = isTreeBalanced(root);

    if (isBalanced.balanced) {
      var _root = isBalanced.root;
      return _root;
    }

    const balancedSubTree = balancingStrategy(isBalanced.root, isBalanced.imbalancedNode);

    // update the heights and balanceFactors
    // in all nodes
    // re-balance if necessary
    return balanceIfNecessary(balancedSubTree);
  };
})(calculateHeights);
