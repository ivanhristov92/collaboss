"use strict";
/**
 * Created by Game Station on 3.9.2017 г..
 */
var inOrder_1 = require('./inOrder');
exports.findParent = (function (inorder) {
    /**
       *
       * @param root {BST|null}
       * @param childValue {number}
       * @returns {{node: BST|null, fromLeft: boolean, fromRight: boolean}}
       */
    return function findParent(root, childValue) {
        var parent = {
            node: null,
            fromLeft: false,
            fromRight: false,
        };
        inorder(root, function (current) {
            if (current.left && current.left.value === childValue) {
                parent.node = current;
                parent.fromLeft = true;
            }
            else if (current.right && current.right.value === childValue) {
                parent.node = current;
                parent.fromRight = true;
            }
        });
        return Object.freeze(parent);
    };
}(inOrder_1.default));
//# sourceMappingURL=findParent.js.map