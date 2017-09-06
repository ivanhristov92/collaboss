/**
 * Created by Game Station on 3.9.2017 г..
 */
const JSC = require("jscheck");
import{BST, iBST} from "../BST";
import { calculateHeights as isTreeBalanced } from '../calculateHeights';

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

function deleteOne([first, ...values]){
    let bst = BST(first);
    values.forEach(val=>bst.insert);
    let pass = isTreeBalanced(bst) === null;

    let nodeValues = arguments[0];
    let randomIndex = Math.floor(Math.random()*(nodeValues.length-1));

    let pick = nodeValues[randomIndex];

    bst.delete(pick.value);

    return pass;
}

JSC.test(
    "BST delete method: (1)",
    function (verdict, values) {
        let ver = deleteOne(values);
        return verdict(ver);
    },
    [
        JSC.array(Math.ceil(Math.random()*200), JSC.integer(1000))
    ],
    function (values) {
        return "values";
    }
);