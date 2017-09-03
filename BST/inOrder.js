/**
 *
 * @param root {BST}
 * @param fn {Function} - defaults to noop
 */
module.exports = function(root, fn = ()=>{}) {
    return (function traverse(root) {
        if (root === null) {
            return;
        }
        traverse(root.left, fn);
        fn(root);
        traverse(root.right, fn);
    })(root);
};