"use strict";
function findParent(root, childValue) {
    var parent = {
        node: null,
        fromLeft: false,
        fromRight: false,
    };
    if (root.value === childValue) {
        return parent;
    }
    if (root.value > childValue) {
        // go left
        if (root.left && root.left.value === childValue) {
            parent.node = root;
            parent.fromLeft = true;
            return Object.freeze(parent);
        }
        return findParent(root.left, childValue);
    }
    else if (root.value < childValue) {
        // go right
        if (root.right && root.right.value === childValue) {
            parent.node = root;
            parent.fromRight = true;
            return Object.freeze(parent);
        }
        return findParent(root.right, childValue);
    }
}
exports.findParent = findParent;
//# sourceMappingURL=findParent.js.map