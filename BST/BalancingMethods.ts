import { iBST, SBT, BST } from './BST';

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

    const _newIm = function() {
      return Object.freeze(
        Object.assign(Object.create(proto), newIm(...arguments)),
      );
    };

    let A = _newIm(imbalanced);
    let Ar = imbalanced.right ? _newIm(imbalanced.right) : null;
    let B = imbalanced.left ? _newIm(imbalanced.left) : null;
    let Br = imbalanced.left.right ? _newIm(imbalanced.left.right) : null;
    let C = imbalanced.left.left ? _newIm(imbalanced.left.left) : null;
    let newNode = _newIm(B);
    // newNode.right = _newIm(A);
    newNode = _newIm(newNode, {
      right: _newIm(A),
    });

    // newNode.right.right = Ar ? _newIm(Ar) : null;
    newNode = _newIm(newNode, {
      right: _newIm(A, {
        right: Ar ? _newIm(Ar) : null,
        left: Br ? _newIm(Br) : null,
      }),
      left: C ? _newIm(C) : null,
    });
    // newNode.right.left = Br ? _newIm(Br) : null;
    return newNode;
  },
  RR(imbalanced: iBST) {
    let proto = Object.getPrototypeOf(imbalanced);

    const _newIm = function() {
      return Object.freeze(
        Object.assign(Object.create(proto), newIm(...arguments)),
      );
    };

    let A = _newIm(imbalanced);
    let Al = imbalanced.left ? _newIm(imbalanced.left) : null;
    let B = imbalanced.right ? _newIm(imbalanced.right) : null;
    let Bl = imbalanced.right.left ? _newIm(imbalanced.right.left) : null;
    let C = imbalanced.right.right ? _newIm(imbalanced.right.right) : null;
    let Cl = imbalanced.right.right.left
      ? _newIm(imbalanced.right.right.left)
      : null;
    let Cr = imbalanced.right.right.right
      ? _newIm(imbalanced.right.right.right)
      : null;

    if (!A || !B || !C) {
      throw new Error('kofti');
    }

    let newNode = _newIm(B, {
      left: _newIm(A, {
        left: Al ? _newIm(Al) : null,
        right: Bl ? _newIm(Bl) : null,
      }),
      right: C
        ? _newIm(C, {
            left: Cl ? _newIm(Cl) : null,
            right: Cr ? _newIm(Cr) : null,
          })
        : null,
    });
    return newNode;
  },
  LR(imbalanced: iBST) {
    let proto = Object.getPrototypeOf(imbalanced);

    const _newIm = function() {
      return Object.freeze(
        Object.assign(Object.create(proto), newIm(...arguments)),
      );
    };

    let A = _newIm(imbalanced);
    let B = imbalanced.left ? _newIm(imbalanced.left) : null;
    let C = imbalanced.left.right ? _newIm(imbalanced.left.right) : null;

    let Cl = imbalanced.left.right.left
      ? _newIm(imbalanced.left.right.left)
      : null;
    let Cr = imbalanced.left.right.right
      ? _newIm(imbalanced.left.right.right)
      : null;

    if (!A || !B || !C) {
      throw new Error('kofti');
    }

    // let newNode = _newIm(C);
    let newNode = _newIm(C, {
      left: newIm(B, {
        right: Cl ? _newIm(Cl) : Cr ? _newIm(Cr) : null,
      }),
      right: newIm(A, { left: null }),
    });

    return newNode;
  },
  RL(imbalanced: iBST) {
    let proto = Object.getPrototypeOf(imbalanced);

    const _newIm = function() {
      return Object.freeze(
        Object.assign(Object.create(proto), newIm(...arguments)),
      );
    };

    let A = _newIm(imbalanced);
    let B = imbalanced.right ? _newIm(imbalanced.right) : null;
    let C = imbalanced.right.left ? _newIm(imbalanced.right.left) : null;
    let Cl = imbalanced.right.left.left
      ? _newIm(imbalanced.right.left.left)
      : null;
    let Cr = imbalanced.right.left.right
      ? _newIm(imbalanced.right.left.right)
      : null;

    if (!A || !B || !C) {
      throw new Error('kofti');
    }

    // let newNode = _newIm(C);
    let newNode = _newIm(C, {
      left: _newIm(A, {
        right: null,
      }),
      right: B
        ? _newIm(B, {
            left: Cl ? _newIm(Cl) : Cr ? _newIm(Cr) : null,
          })
        : null,
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
  balancingMethods.RL,
);

function attachingStrategy(
  root: iBST,
  parent: iFindParentOutput,
  balancedSubTree: iBST,
) {
  const proto = Object.getPrototypeOf(root);

  if (!parent.node) {
    // we are at root
    return Object.freeze(
      Object.assign(Object.create(proto), root, balancedSubTree),
    );
  }

  return (function fromParentUp({
    _root,
    parentValue,
  }: {
    _root: iBST;
    parentValue: number;
  }): iBST {
    if (_root.value === parentValue) {
      // we found the parent
      // now attach
      return Object.freeze(
        Object.assign(Object.create(proto), _root, {
          left: parent.fromLeft ? balancedSubTree : _root.left,
          right: parent.fromRight ? balancedSubTree : _root.right,
        }),
      );
    }

    let child = fromParentUp({
      _root: _root.value > parentValue ? _root.left : _root.right,
      parentValue,
    });

    // after we've found the parent
    // and attached the balanced subtree

    if ( _root.value > parentValue) {
      return Object.freeze(
        Object.assign(Object.create(proto), _root, { left: child }),
      );
    } else if (_root.value < parentValue) {
      return Object.freeze(
        Object.assign(Object.create(proto), _root, { right: child }),
      );
    }
  })({
    _root: root,
    parentValue: parent.node.value,
  });
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
  return function balancingStrategy(
    root: iBST,
    imbalancedSubTree: iBST,
  ): {apply: ()=>{balanced:iBST | null}} {

    let parent = findParent(root, imbalancedSubTree.value);
    let balanceFn = chooseMethod(imbalancedSubTree);


    return {
      apply() {
        let balancedSubTree = balanceFn(imbalancedSubTree);
        let balanced = attachingStrategy(root, parent, balancedSubTree);
        return {balanced};
      },
    };
  };
})(findParent, chooseTreeBalancingMethod, attachingStrategy);

module.exports.balanceIfNecessary = (function(
  isTreeBalanced: (root: iBST) => calculateHeightsOutput,
) {
  /**
     *
     * @param root {BST}
     */
  return function balanceIfNecessary(root: iBST): {root: iBST | null, balanced: boolean} {
    // update the balance factor across the tree
    // and look for imbalanced areas
    let isBalanced: calculateHeightsOutput = isTreeBalanced(root);

    if (isBalanced.balanced) {
      return {root: isBalanced.root, balanced: true};
    }

    // const balancedSubTree = balancingStrategy(isBalanced.root, isBalanced.imbalancedNode});
    const strategy = balancingStrategy(
      isBalanced.root,
      isBalanced.imbalancedNode,
    );
    const balancedTree = strategy.apply().balanced;


    // update the heights and balanceFactors
    // in all nodes
    // re-balance if necessary
    return balanceIfNecessary(balancedTree);
  };
})(calculateHeights);
