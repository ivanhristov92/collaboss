import { iBST } from './BST';
import { arch } from 'os';
import inOrder from './inOrder';
const balanceIfNecessary = require('./BalancingMethods').balanceIfNecessary;
import { findParent } from './findParent';
const newIm = require('./utils').newIm;

// ---------helper----
// -------------------
function findInorderSuccessorOf(root: iBST, value: number) {

  let start = (function traverse(_root, _find){
    if(_root.value === _find){
      return _root;
    }
    if(_root.value < _find){
      // go right
      return traverse(_root.right, _find)
    } else if(_root.value > _find){
      // go left
      return traverse(_root.left, _find)
    }
  }(root, value))


  return (function leftMost(_start) {
      return _start.left ? leftMost(_start.left) : _start;
    }(start.right))
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
  deleteLeaf: (isLeft: boolean) => (root: iBST, value: number) => {
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

    // attach
  },

  deleteNodeWithOneChild(root: iBST, value: number) {
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

    // attach

  },

  deleteNodeWithTwoChildren(root: iBST, value: number) {

    let proto = Object.getPrototypeOf(root);
    const _newIm = function(...args: any[]) {
      return Object.freeze(
          (<any>Object).assign(Object.create(proto), newIm(...args)),
      );
    };

    let nextOfKin = findInorderSuccessorOf(root, value);

    // remove the nextOfKin from its original position
    let parentOfNextOfKin = findParent(root, nextOfKin.value);
    // node: iBST | null;
    // fromLeft: boolean;
    // fromRight: boolean;


    (function traverse(_root, _find){

      // if parent of next of kin - set one of the child nodes to null
      // return new parent of next of kin

      if(_root.value === parentOfNextOfKin.node.value){
        return _newIm(parentOfNextOfKin.node, {
          left: parentOfNextOfKin.fromLeft ? null : parentOfNextOfKin.node.left,
          right: parentOfNextOfKin.fromRight ? null : parentOfNextOfKin.node.right,
        })
      }

      // if parent node - set node to next of kin
      // return new parent

      if(_root.left && _root.left.value === _find){
        // found parent, attach
        return _newIm(_root, {
          left: nextOfKin.node
        })
      } else if (_root.right && _root.right.value === _find){
        // found parent, attach
        return _newIm(_root, {
          right: nextOfKin.node
        })
      }

      // ----
      // else return new node with updated links, traverse??

      if(_root.value < parentOfNextOfKin.node.value){
        // go right
        let child = traverse(_root.right, _find);
        return _newIm(_root, {
          right: child
        })
      } else if (_root.value > parentOfNextOfKin.node.value){
        // go left
        let child = traverse(_root.left, _find);
        return _newIm(_root, {
          left: child
        })
      }

    }(root, value));
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
  return deleteFn(root, value);
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
