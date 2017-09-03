"use strict";
var inOrder = require("./inOrder");
exports = (function (inOrder) {
    return function deleteNode(root, value) {
        inOrder(root, function (node) {
            if (node.left && node.left.value === value) {
            }
            else if (node.right && node.right.value === value) {
            }
        });
    };
}(inOrder));
//# sourceMappingURL=delete.js.map