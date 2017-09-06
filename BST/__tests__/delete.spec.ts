/**
 * Created by Game Station on 3.9.2017 г..
 */
const JSC = require("jscheck");
import{BST, iBST} from "../BST";
const balanceIfNecessary = require("../BalancingMethods").balanceIfNecessary;
const inOrder  = require("../inOrder");

/**
 * configuration
 */
JSC.on_report(console.log);
JSC.on_lost(console.log);


/**
 * Test 1
 * ------
 *
 * deleting one node after the root
 */

function deleteOne(rootValue: number, leafValue: number) {
    let bst:iBST = BST(rootValue);
    bst.insert(leafValue);

    if(rootValue < leafValue){
        return bst.right.value === leafValue;
    } else if (rootValue > leafValue){
        return bst.left.value === leafValue;
    }
    return bst.left === null && bst.right === null;
}

JSC.test(
    "BST insert method: (1)",
    function (verdict, rootValue, leafValue) {
        return verdict(deleteOne(rootValue, leafValue));
    },
    [
        JSC.integer(1000),
        JSC.integer(1000),
    ],
    function (rootValue, leafValue) {
        if(rootValue < leafValue){
            return "Right";
        } else if(rootValue > leafValue){
            return "Left";
        } else {
            return "Equal"
        }
    }
);
