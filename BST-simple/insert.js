"use strict";
function find(root, value) {
    return (function traverse(_root, _find) {
        if (_root === null) {
            return null;
        }
        if (_root.value === _find) {
            return _root;
        }
        if (_root.value < _find) {
            // go right
            return traverse(_root.right, _find);
        }
        else if (_root.value > _find) {
            // go left
            return traverse(_root.left, _find);
        }
    }(root, value));
}
function _insertNodeInBst(_a) {
    var BST = _a.BST, root = _a.root, value = _a.value;
    if (value < root.value) {
        // Go left
        if (root.left) {
            var acc = _insertNodeInBst({
                BST: BST,
                root: root.left,
                value: value
            });
            root = Object.freeze(Object.assign(Object.create(BST.prototype), root, { left: acc }));
            return root;
        }
        else {
            root = Object.freeze(Object.assign(Object.create(BST.prototype), root, { left: BST(value) }));
            return root;
        }
    }
    else if (value > root.value) {
        // Go right
        if (root.right) {
            var acc = _insertNodeInBst({
                BST: BST,
                root: root.right,
                value: value
            });
            root = Object.freeze(Object.assign(Object.create(BST.prototype), root, { right: acc }));
            return root;
        }
        else {
            root = Object.freeze(Object.assign(Object.create(BST.prototype), root, { right: BST(value) }));
            return root;
        }
    }
    else if (value === root.value) {
        return null;
    }
    else {
        throw new Error("bad");
    }
}
module.exports = (function (_insertNode) {
    return function insert(value) {
        var inserted = _insertNode({
            BST: Object.getPrototypeOf(this).constructor,
            root: this,
            value: value
        });
        if (inserted) {
            var found = find(inserted, value);
            if (found === null) {
                var c = void 0;
            }
        }
        return inserted;
    };
})(_insertNodeInBst);
//# sourceMappingURL=insert.js.map