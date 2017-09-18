"use strict";
/**
 *
 * @param root {BST}
 * @param fn {Function} - defaults to noop
 */
function default_1(root, fn) {
    return (function traverse(_root) {
        if (_root === null) {
            return;
        }
        if (!_root) {
            var c = void 0;
        }
        traverse(_root.left);
        traverse(_root.right);
        fn(_root);
    }(root));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
//# sourceMappingURL=postOrder.js.map