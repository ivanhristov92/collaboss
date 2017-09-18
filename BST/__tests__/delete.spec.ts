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


function find(root, value){
    return (function traverse(_root){
        if(_root === null){
            return null;
        }


        let a = traverse(_root.left);
        if(a){return a}
        if(_root.value === value){
            return _root;
        }
        return traverse(_root.right);

    }(root))
}



function deleteOne([first, ...values]){
    let bst = BST(first);
    values.forEach(val => {
        var before = bst;
        let after = bst.insert(val);
        if(after){
            bst = after;
            let found = find(bst, val);
            if(!found){
                let g;
            }

        }
    });
    let pass = isTreeBalanced(bst).balanced === true;

    let nodeValues = arguments[0];
    let randomIndex = Math.floor(Math.random()*(nodeValues.length-1));

    let pick = nodeValues[randomIndex];

    bst.remove(pick);

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