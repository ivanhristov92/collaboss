/**
 * Created by Game Station on 3.9.2017 г..
 */
const inOrder = require('./inOrder');

module.exports = (inorder =>
  /**
     *
     * @param root {BST|null}
     * @param childValue {number}
     * @returns {{node: BST|null, fromLeft: boolean, fromRight: boolean}}
     */
  function findParent(root, childValue) {
    let parent = {
      node: null,
      fromLeft: false,
      fromRight: false,
    };

    inorder(root, current => {
      if (current.left && current.left.value === childValue) {
        parent.node = current;
        parent.fromLeft = true;
      } else if (current.right && current.right.value === childValue) {
        parent.node = current;
        parent.fromRight = true;
      }
    });
    return parent;
  })(inOrder);
