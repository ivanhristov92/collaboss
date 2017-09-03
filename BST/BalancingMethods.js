/**
 * Created by Game Station on 2.9.2017 г..
 */

const calculateHeights = require('./calculateHeights');
const findParent = require('./findParent');
const inOrder = require('./inOrder');
const log = require('./utils').log;

const balancingMethods = Object.freeze({
  /**
     * Left-Left
     * @param root {BST}
     * @param imbalanced {BST|null}
     * @returns {*}
     */
  LL(root, imbalanced) {
    let A = imbalanced;
    let Ar = imbalanced.right;
    let B = imbalanced.left;
    let Br = imbalanced.left.right;
    let C = imbalanced.left.left;

    let newNode = Object.assign({}, B);
    newNode.right = Object.assign({}, A);
    newNode.right.right = Ar ? Object.assign({}, Ar) : null;
    newNode.right.left = Br ? Object.assign({}, Br) : null;
    newNode.left = Object.assign({}, C);
    return newNode;
  },
  RR() {},
  LR() {},
  RL() {},
});

const chooseTreeBalancingMethod = ((LL, LR, RR, RL) =>
    /**
     *
     * @param node {BST|null}
     * @returns {*}
     */
  function chooseTreeBalancingMethod(node) {
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
  })(
  balancingMethods.LL,
  balancingMethods.LR,
  balancingMethods.RR,
  balancingMethods.RL
);


module.exports.balanceIfNecessary = ((isTreeBalanced, findParent, chooseMethod) =>
  /**
     *
     * @param root {BST}
     */
  function(root) {
    // update the balance factor across the tree
    // and look for imbalanced areas
      let imbalancedSubTree = isTreeBalanced(root);
    if (imbalancedSubTree) {
      let parent = findParent(root, imbalancedSubTree.value);
      let balanceFn = chooseTreeBalancingMethod(root, imbalancedSubTree);

      parent.fromLeft
        ? (parent.node.left = balanceFn(root, imbalancedSubTree))
        : (parent.node.right = balanceFn(root, imbalancedSubTree));

      // update the heights and balanceFactors
      // in all nodes
      isTreeBalanced(root);
      log('root', root);
    }
  })(calculateHeights, findParent, chooseTreeBalancingMethod);
