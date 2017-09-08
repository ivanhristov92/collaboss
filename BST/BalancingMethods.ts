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
    };


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
    };


    let A = _newIm(imbalanced);
    let Al = imbalanced.left ? _newIm(imbalanced.left) : null;
    let B = imbalanced.right ? _newIm(imbalanced.right) : null;
    let Bl = imbalanced.right.left ? _newIm(imbalanced.right.left) : null;
    let C = imbalanced.right.right ? _newIm(imbalanced.right.right) : null;
    let Cl = imbalanced.right.right.left ? _newIm(imbalanced.right.right.left) : null;
    let Cr = imbalanced.right.right.right ? _newIm(imbalanced.right.right.right) : null;

    if(!A || !B || !C){
      throw new Error("kofti");
    }

    let newNode = _newIm(B, {
      left: _newIm(A, {
        left: Al ? _newIm(Al) : null,
        right: Bl ? _newIm(Bl) : null
      }),
      right: C ? _newIm(C, {
        left: Cl ? _newIm(Cl) : null,
        right: Cr ? _newIm(Cr) : null
      }) : null
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

    let Cl = imbalanced.left.right.left ? _newIm(imbalanced.left.right.left) : null;
    let Cr = imbalanced.left.right.right ? _newIm(imbalanced.left.right.right) : null;

    if(!A || !B || !C){
      throw new Error("kofti");
    }

    // let newNode = _newIm(C);
    let newNode = _newIm(C, {
      left: newIm(B, {
        right: Cl ? _newIm(Cl) : (Cr ? _newIm(Cr) : null)
      }),
      right: newIm(A, {left: null})
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
    let Cl = imbalanced.right.left.left ? _newIm(imbalanced.right.left.left) : null;
    let Cr = imbalanced.right.left.right ? _newIm(imbalanced.right.left.right) : null;

    if(!A || !B || !C){
      throw new Error("kofti");
    }

    // let newNode = _newIm(C);
    let newNode = _newIm(C, {
      left: _newIm(A, {
        right: null
      }),
      right: B ? _newIm(B, {
        left: Cl ? _newIm(Cl) : (Cr ? _newIm(Cr) : null)
      }) : null
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
  balancingMethods.RL
);

function attachingStrategy(
  root: iBST,
  parent: iFindParentOutput,
  balancedSubTree: iBST,
) {

  let toAttach = null;

  const proto = Object.getPrototypeOf(root);
  if (parent.node) {
    if(parent.fromLeft){
      // toAttach = Object.freeze(Object.assign(Object.create(proto), parent.node, {left: balancedSubTree}));
      Object.freeze(Object.assign( parent.node, {left: balancedSubTree}));
    } else {
      // toAttach = Object.freeze(Object.assign(Object.create(proto), parent.node, {right: balancedSubTree}));
      toAttach = Object.freeze(Object.assign(parent.node, {right: balancedSubTree}));
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

    if(!parent.node && root.value !== imbalancedSubTree.value){
      let f;
    }

    return {
      parent: parent,
      fn: balanceFn,
      apply(){
        let balancedSubTree = balanceFn(imbalancedSubTree);
        let balanced = attachingStrategy(root, parent, balancedSubTree);
        if(parent.node && parent.node.value){
          let g;
        }
        return {balanced, balancedSubTree, imbalancedSubTree};
      }
    }
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
      // return _root;
      return {root: _root, fn: null};
    }


    // const balancedSubTree = balancingStrategy(isBalanced.root, isBalanced.imbalancedNode});
    const strategy =  balancingStrategy(isBalanced.root, isBalanced.imbalancedNode);
    const b = strategy.apply();
    const balanced = b.balanced;
    const imbalancedSubTree = b.imbalancedSubTree;
    const balancedSubTree = b.balancedSubTree;

    return {root: balanced, balancedSubTree, fn: strategy.fn, parent: strategy.parent.node, imbalancedSubTree};

    // update the heights and balanceFactors
    // in all nodes
    // re-balance if necessary
    return balanceIfNecessary(balanced);
  };
})(calculateHeights);
