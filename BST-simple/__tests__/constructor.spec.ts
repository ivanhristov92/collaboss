/**
 * Created by Game Station on 3.9.2017 г..
 */
const JSC = require("jscheck");
import{BST, iBST} from "../BST";

function predicate(value: number) {
    let bst:iBST = BST(value);

    return !(bst.balanceFactor === undefined ||
            bst.heightLeft === undefined ||
            bst.heightRight === undefined ||
            bst.value !== value ||
            bst.left === undefined ||
            bst.right === undefined ||
            bst.inOrder === undefined ||
            bst.insert === undefined);
}


JSC.on_report(function (str) {
    console.log(str);
});

JSC.test(
    "BST constructor",
    function (verdict, value) {
        return verdict(predicate(value));
    },
    [
        JSC.integer(1000),
    ],
    function (value) {
        return "value: " + value;
    }
);
