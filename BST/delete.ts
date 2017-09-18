import { iBST } from './BST';
import { arch } from 'os';
import inOrder from './inOrder';
const balanceIfNecessary = require('./BalancingMethods').balanceIfNecessary;
import {findParent} from './findParent';

// ---------helper----
// -------------------
const findInorderSuccessor = (function(inOrder) {
  return function findInorderSuccessor(root, parentValue: number) {
    let reachedParent = false;
    let nextOfKin = null;
    inOrder(root, node => {
      if (node.value === parentValue) {
        reachedParent = true;
        return;
      }
      if (reachedParent) {
        nextOfKin = node;
      }
    });

    return nextOfKin;
  };
})(inOrder);
// -------------------

type BSTDeleteWithOneChild = (parent: iBST) => iBST;
type BSTDeleteWithTwoChildren = (parent: iBST) => iBST;
type BSTDeleteLeaf = (isLeft?: boolean)=>(parent: iBST) => iBST
type BSTDeleteMethod = BSTDeleteWithOneChild | BSTDeleteWithTwoChildren | BSTDeleteLeaf

type BSTDelete = {
  deleteLeaf: BSTDeleteLeaf,
  deleteNodeWithOneChild: BSTDeleteWithOneChild,
  deleteNodeWithTwoChildren: BSTDeleteWithTwoChildren
}

const BSTDelete: BSTDelete = {
  deleteLeaf: (isLeft: boolean)=>(parent: iBST) => {
    if(isLeft){
      parent.left = null;
    } else {
      parent.right = null;
    }
    return parent;
  },

  deleteNodeWithOneChild(parent: iBST) {
    /*
              A

           D     B

                   C
     */

    parent.left
      ? (parent.left = parent.left.left || parent.left.right)
      : (parent.right = parent.right.left || parent.right.right);

    return parent;
  },

  deleteNodeWithTwoChildren(parent: iBST) {
    let nextOfKin = findInorderSuccessor(parent, parent.value);

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
  isLeaf: boolean,
  isOnlyChild: boolean,
  isLeft: boolean
};

/**
 *
 * @param isLeaf
 * @param isOnlyChild - if the parent has no other subtrees
 * @param isLeft - shows if it is a left child or not
 * @returns {BSTDeleteMethod}
 */
function chooseDeleteMethod({ isLeaf, isOnlyChild, isLeft }: Traits): BSTDeleteMethod {
  if (isLeaf) return BSTDelete.deleteLeaf(isLeft);
  if (isOnlyChild) return BSTDelete.deleteNodeWithOneChild;
  return BSTDelete.deleteNodeWithTwoChildren;
}

type ParentAndChild = {
  parent: iBST | null;
  child: iBST | null;
};
function findParentAndChild(root: iBST, childValue: number): ParentAndChild {
  let toReturn = {
    parent: null,
    child: null,
  };

  inOrder(root, node => {
    if(node.value === childValue){
      let f;
    }
  });

  inOrder(root, node => {
    if (node.left && node.left.value === childValue) {
      toReturn.parent = node;
      toReturn.child = node.left;
    } else if (node.right && node.right.value === childValue) {
      toReturn.parent = node;
      toReturn.child = node.right;
    } else {
      let d;
    }
  });

  if(!toReturn.child){
    console.log("could not delete value ", childValue)

    let c;
  }

  return toReturn;
}

function generateNodeMeta(root, value): Traits {
  let { parent, child } = findParentAndChild(root, value);
  if(!child){
    let c;
  }
  return {
    isLeaf: !child.left && !child.right,
    isOnlyChild: !!(parent.left && !parent.right) || !!(!parent.left && parent.right),
    isLeft: (parent.left && parent.left.value === child.value)
  };
}

function _deleteNode(root: iBST, value: number): iBST{
  let nodeMeta = generateNodeMeta(root, value);
  let deleteFn = chooseDeleteMethod(nodeMeta);
  return deleteFn(root);
}

module.exports = ((
  _deleteNode: (root: iBST, value: number) => iBST,
  _balanceIfNecessary: (root: iBST) => {root: iBST},
) =>
  function deleteNode(value: number): iBST {
    let afterDeletion = _deleteNode(this, value);
    let balanced = _balanceIfNecessary(afterDeletion);
    return balanced.root;
  })(_deleteNode, balanceIfNecessary);
