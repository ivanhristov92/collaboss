/**
 * Created by Game Station on 3.9.2017 г..
 */

/**
 *
 * @param root {BST}
 * @returns {BST|null} - only returns BST if it is unbalanced
 */
module.exports = function calculateHeights(root) {
  let imbalanced = null;

  (function traverse(root) {
    if (root === null) {
      // * means we reached the end leaves
      // * and are even a step past them
      return 0;
    }

    root.heightLeft = traverse(root.left);
    root.heightRight = traverse(root.right);
    root.balanceFactor = root.heightLeft - root.heightRight;

    if (root.balanceFactor < -1 || root.balanceFactor > 1) {
        imbalanced = root;
    }

    return Math.max(root.heightLeft, root.heightRight) + 1;
  })(root);

  return imbalanced;
};
