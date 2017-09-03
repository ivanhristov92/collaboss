import { iBST } from './BST';
const inOrder = require('./inOrder');
const balanceIfNecessary = require('./BalancingMethods').balanceIfNecessary;
const findParent = require('./findParent');

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

type BSTDeleteMethod = (parent: iBST) => void;

const BSTDelete = {
  deleteLeaf(parent: iBST) {
    parent.left = parent.right = null;
  },

  deleteNodeWithOneChild(parent: iBST) {
    parent.left
      ? (parent.left = parent.left.left || parent.left.right)
      : (parent.right = parent.right.left || parent.right.right);
  },

  deleteNodeWithTwoChildren(parent: iBST) {
    let nextOfKin = findInorderSuccessor(parent, parent.value);

    // copy the 'nextOfKin' to where the parent is
    (<any>Object).assign(parent, nextOfKin);

    // remove the nextOfKin from its original position
    let parentOfNextOfKin = findParent(nextOfKin.value);

    parentOfNextOfKin.left.value === nextOfKin.value
      ? (parentOfNextOfKin.left = null)
      : (parentOfNextOfKin.right = null);
  },
};

type Traits = {
  isLeaf: boolean;
  isOnlyChild: boolean;
};
function chooseDeleteMethod({ isLeaf, isOnlyChild }: Traits): BSTDeleteMethod {
  if (isLeaf) return BSTDelete.deleteLeaf;
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
    if (node.left && node.left.value === childValue) {
      toReturn.parent = node;
      toReturn.child = node.left;
    } else if (node.right && node.right.value === childValue) {
      toReturn.parent = node;
      toReturn.child = node.right;
    }
  });

  return toReturn;
}

function generateNodeMeta(root, value): Traits {
  let { parent, child } = findParentAndChild(root, value);
  return {
    isLeaf: !child.left && !child.right,
    isOnlyChild: !(parent.left && parent.right),
  };
}

function _deleteNode(root: iBST, value: number) {
  let nodeMeta = generateNodeMeta(root, value);
  let deleteFn = chooseDeleteMethod(nodeMeta);
  deleteFn(root);
}

exports = (function(
  _deleteNode: (root: iBST, value: number) => void,
  _balanceIfNecessary: (root: iBST) => void,
) {
  return function deleteNode(root: iBST, value: number) {
    _deleteNode(root, value);
    _balanceIfNecessary(root);
  };
})(_deleteNode, balanceIfNecessary);
