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

type BSTDeleteMethod = (parent: iBST) => void;

const BSTDelete = {
  deleteLeaf: (left)=>(parent: iBST) => {
    if(left){
      parent.left = null;
    } else {
      parent.right = null;
    }
  },

  deleteNodeWithOneChild(parent: iBST) {
    parent.left
      ? (parent.left = parent.left.left || parent.left.right)
      : (parent.right = parent.right.left || parent.right.right);
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
  },
};

type Traits = {
  isLeaf: boolean,
  isOnlyChild: boolean,
  isLeft: boolean
};
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
    isOnlyChild: (parent.left && !parent.right) || (!parent.left && parent.right),
    isLeft: (parent.left && parent.left.value === child.value)
  };
}

function _deleteNode(root: iBST, value: number) {
  let nodeMeta = generateNodeMeta(root, value);
  let deleteFn = chooseDeleteMethod(nodeMeta);
  deleteFn(root);
}

module.exports = ((
  _deleteNode: (root: iBST, value: number) => void,
  _balanceIfNecessary: (root: iBST) => void,
) =>
  function deleteNode(value: number) {
    _deleteNode(this, value);
    _balanceIfNecessary(this);
  })(_deleteNode, balanceIfNecessary);
