import {iBST} from "./BST";
const inOrder = require("./inOrder");

exports = (function(inOrder){
    return function deleteNode(root: iBST, value){
        inOrder(root, node=>{
            if(node.left && node.left.value === value){

            } else if (node.right && node.right.value === value){

            }
        })
    }
}(inOrder));