/**
 * Created by Game Station on 3.9.2017 г..
 */
"use strict";
/**
 *
 * @param root {BST}
 * @returns {BST|null} - only returns BST if it is unbalanced
 */
function calculateHeights(root) {
    var imbalanced = null;
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
}
exports.calculateHeights = calculateHeights;
;
//# sourceMappingURL=calculateHeights.js.map