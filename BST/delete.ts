import { iBST } from './BST';
import { arch } from 'os';
import inOrder from './inOrder';
const balanceIfNecessary = require('./BalancingMethods').balanceIfNecessary;
import { findParent } from './findParent';
const newIm = require('./utils').newIm;

// ---------helper----
// -------------------
function findInorderSuccessor(parent: iBST) {
  return (function leftMost(start) {
      return start.left ? leftMost(start.left) : start;
    }(parent.right))
}
// -------------------

type BSTDeleteWithOneChild = (parent: iBST) => iBST;
type BSTDeleteWithTwoChildren = (parent: iBST) => iBST;
type BSTDeleteLeaf = (isLeft?: boolean) => (parent: iBST) => iBST;

type BSTDeleteMethod =
    BSTDeleteWithOneChild
  | BSTDeleteWithTwoChildren
  | BSTDeleteLeaf;

type BSTDelete = {
  deleteLeaf: BSTDeleteLeaf;
  deleteNodeWithOneChild: BSTDeleteWithOneChild;
  deleteNodeWithTwoChildren: BSTDeleteWithTwoChildren;
};

const BSTDelete: BSTDelete = {
  deleteLeaf: (isLeft: boolean) => (parent: iBST) => {
    let proto = Object.getPrototypeOf(parent);
    const _newIm = function(...args: any[]) {
      return Object.freeze(
        (<any>Object).assign(Object.create(proto), newIm(...args)),
      );
    };

    if (isLeft) {
      return _newIm(parent, { left: null });
    } else {
      return _newIm(parent, { right: null });
    }
  },

  deleteNodeWithOneChild(parent: iBST) {
    /*
                10

           5         20

        1    7          30

          6           22
     */

    let proto = Object.getPrototypeOf(parent);
    const _newIm = function(...args: any[]) {
      return Object.freeze(
        (<any>Object).assign(Object.create(proto), newIm(...args)),
      );
    };

    if (parent.left) {
      return _newIm(parent, {
        left: _newIm(parent.left.left || parent.left.right),
      });
    } else if (parent.right) {
      return _newIm(parent, {
        right: _newIm(parent.right.left || parent.right.right),
      });
    }
  },

  deleteNodeWithTwoChildren(parent: iBST) {
    let nextOfKin = findInorderSuccessor(parent);

    // remove the nextOfKin from its original position
    let parentOfNextOfKin = findParent(parent, nextOfKin.value);

    // copy the 'nextOfKin' to where the parent is
    (<any>Object).assign(parent, nextOfKin);

    parentOfNextOfKin.left.value === nextOfKin.value
      ? (parentOfNextOfKin.left = null)
      : (parentOfNextOfKin.right = null);

    return parent;
  },
};

type Traits = {
  isLeaf: boolean;
  isOnlyChild: boolean;
  isLeft: boolean;
};

/**
 *
 * @param isLeaf
 * @param isOnlyChild - if the parent has no other subtrees
 * @param isLeft - shows if it is a left child or not
 * @returns {BSTDeleteMethod}
 */
function chooseDeleteMethod({
  isLeaf,
  isOnlyChild,
  isLeft,
}: Traits): BSTDeleteMethod {
  if (isLeaf) return BSTDelete.deleteLeaf(isLeft);
  if (isOnlyChild) return BSTDelete.deleteNodeWithOneChild;
  return BSTDelete.deleteNodeWithTwoChildren;
}

type ParentAndChild = {
  parent: iBST | null;
  child: iBST | null;
};
function findParentAndChild(root: iBST, childValue: number): ParentAndChild {
  return (function traverse(_root, _find) {
    if (_root === null) {
      return null;
    }

    if (_root.value === _find) {
      return _root;
    }

    let toTraverse = _root.value > _find ? _root.left : _root.right;
    let result = traverse(toTraverse, _find);
    if (result && !result.hasOwnProperty('parent')) {
      // we found the node to delete
      // and are currently in its parent node
      return {
        parent: _root,
        child: result,
      };
    } else if (result) {
      return result;
    }

    throw new Error('kvo stava tuk');
  })(root, childValue);
}

function generateNodeMeta(root, value): Traits {
  let { parent, child } = findParentAndChild(root, value);

  return {
    isLeaf: !child.left && !child.right,
    isOnlyChild:
      !!(parent.left && !parent.right) || !!(!parent.left && parent.right),
    isLeft: parent.left && parent.left.value === child.value,
  };
}

function _deleteNode(root: iBST, value: number): iBST {
  let nodeMeta = generateNodeMeta(root, value);
  let deleteFn = chooseDeleteMethod(nodeMeta);
  return deleteFn(root);
}

module.exports = ((
  _deleteNode: (root: iBST, value: number) => iBST,
  _balanceIfNecessary: (root: iBST) => { root: iBST },
) =>
  function deleteNode(value: number): iBST {
    let afterDeletion = _deleteNode(this, value);
    let balanced = _balanceIfNecessary(afterDeletion);
    return balanced.root;
  })(_deleteNode, balanceIfNecessary);
