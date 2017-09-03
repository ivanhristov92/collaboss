"use strict";
var calculateHeights_1 = require('./calculateHeights');
var findParent_1 = require('./findParent');
var inOrder = require('./inOrder');
var log = require('./utils').log;
var balancingMethods = Object.freeze({
    /**
       * Left-Left
       * @param root {BST}
       * @param imbalanced {BST|null}
       * @returns {*}
       */
    LL: function (imbalanced) {
        var A = imbalanced;
        var Ar = imbalanced.right;
        var B = imbalanced.left;
        var Br = imbalanced.left.right;
        var C = imbalanced.left.left;
        var newNode = Object.assign({}, B);
        newNode.right = Object.assign({}, A);
        newNode.right.right = Ar ? Object.assign({}, Ar) : null;
        newNode.right.left = Br ? Object.assign({}, Br) : null;
        newNode.left = Object.assign({}, C);
        return newNode;
    },
    RR: function () { },
    LR: function () { },
    RL: function () { },
});
var chooseTreeBalancingMethod = (function (LL, LR, RR, RL) {
    /**
       *
       * @param node {BST|null}
       * @returns {*}
       */
    return function chooseTreeBalancingMethod(node) {
        if (!node)
            return null;
        if (node.heightLeft > node.heightRight) {
            if (node.left.heightLeft > node.left.heightRight) {
                // Left-Left imbalance
                log('LL');
                return LL;
            }
            else if (node.left.heightLeft < node.left.heightRight) {
                // Left-Right imbalance
                log('LR');
                return LR;
            }
        }
        else if (node.heightLeft < node.heightRight) {
            if (node.right.heightLeft > node.right.heightRight) {
                // Right-Left imbalance
                log('RL');
                return RL;
            }
            else if (node.right.heightLeft < node.right.heightRight) {
                // Right-Right imbalance
                log('RR');
                return RR;
            }
        }
    };
})(balancingMethods.LL, balancingMethods.LR, balancingMethods.RR, balancingMethods.RL);
module.exports.balanceIfNecessary = (function (isTreeBalanced, findParent, chooseMethod) {
    /**
       *
       * @param root {BST}
       */
    return function (root) {
        // update the balance factor across the tree
        // and look for imbalanced areas
        var imbalancedSubTree = isTreeBalanced(root);
        if (imbalancedSubTree) {
            var parent_1 = findParent(root, imbalancedSubTree.value);
            var balanceFn = chooseMethod(imbalancedSubTree);
            parent_1.fromLeft
                ? (parent_1.node.left = balanceFn(imbalancedSubTree))
                : (parent_1.node.right = balanceFn(imbalancedSubTree));
            // update the heights and balanceFactors
            // in all nodes
            isTreeBalanced(root);
            log('root', root);
        }
    };
})(calculateHeights_1.calculateHeights, findParent_1.findParent, chooseTreeBalancingMethod);
//# sourceMappingURL=BalancingMethods.js.map