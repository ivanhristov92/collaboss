import { iBST } from './BST';
const inOrder = require('./inOrder');
const balanceIfNecessary = require('./BalancingMethods').balanceIfNecessary;
const findParent = require("./findParent");


const DeleteMethods = {
  deleteLeaf(parent: iBST) {
    parent.left = null;
    parent.right = null;
  },

  deleteNodeWithOneChild(parent: iBST) {
    if (parent.left) {
        let grandChild = parent.left.left ? parent.left.left : parent.left.right;
        parent.left = grandChild;
    } else {
        let grandChild = parent.right.left ? parent.right.left : parent.right.right;
        parent.right = grandChild;
    }
  },

    deleteNodeWithTwoChildren(parent: iBST){

      let reachedParent = false;
      let nextOfKin = null;
      inOrder(parent, node=>{
          if(node.value === parent.value){
              reachedParent = true;
                return;
          }
          if(reachedParent){
              nextOfKin = node;
          }
      })

      (<any>Object).assign(parent, nextOfKin);

      let parentOfNextOfKin = findParent(nextOfKin.value);

      if(parentOfNextOfKin.left.value = nextOfKin.value){
          parentOfNextOfKin.left = null;
      } else {
          parentOfNextOfKin.right = null;
      }

    }
};

function chooseDeleteMethod() {}

type ParentAndChild = {
  parent: iBST | null;
  child: iBST | null;
  isLeft: boolean;
  isRight: boolean;
};
function findParentAndChild(root: iBST, childValue: number): ParentAndChild {
  let toReturn = {
    parent: null,
    child: null,
    isLeft: false,
    isRight: false,
  };

  inOrder(root, node => {
    if (node.left && node.left.value === childValue) {
      toReturn.parent = node;
      toReturn.child = node.left;
      toReturn.isLeft = true;
      toReturn.isRight = false;
    } else if (node.right && node.right.value === childValue) {
      toReturn.parent = node;
      toReturn.child = node.right;
      toReturn.isLeft = false;
      toReturn.isRight = true;
    }
  });

  return toReturn;
}

function isLeaf(node: iBST): boolean {
  return node && (!node.left && !node.right);
}

function freeNode(node: iBST) {
  node.left = null;
  node.right = null;
}

exports = (function(inOrder) {
  return function deleteNode(root: iBST, value) {
    let parent = null;
    let isLeaf = false;
    let isLeftChild;

    inOrder(root, node => {
      if (node.left && node.left.value === value) {
        parent = node;
        if (!node.left.left && !node.left.right) {
          isLeaf = true;
        }
        isLeftChild = true;
      } else if (node.right && node.right.value === value) {
        parent = node;
        if (!node.right.left && !node.right.right) {
          isLeaf = true;
        }
        isLeftChild = false;
      }
    });

    if (isLeaf) {
      if (isLeftChild === true) {
        parent.left = null;
      } else if (isLeftChild === false) {
        parent.right = null;
      }
    }

    balanceIfNecessary(root);
  };
})(inOrder);
