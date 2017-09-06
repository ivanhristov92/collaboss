/**
 *
 * @param root {BST}
 * @param fn {Function} - defaults to noop
 */
export default function(root, fn) {
    return (function traverse(_root) {
        if (_root === null) {
            return;
        }
        if(!_root){
            let c;
        }
        traverse(_root.left);
        fn(_root);
        traverse(_root.right);
    }(root));
};