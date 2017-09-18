/**
 * Created by Game Station on 3.9.2017 г..
 */
const JSC = require("jscheck");
import{BST, iBST} from "../BST";

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
    return (function traverse(_root, _find){
        if(_root === null){
            return null;
        }


        if(_root.value === _find){
            return _root;
        }

        if(_root.value <_find){
            // go right
            return traverse(_root.right, _find)
        } else if (_root.value > _find){
            // go left
            return traverse(_root.left, _find)
        }

    }(root, value))
}



function deleteOne(values){
    let [first, ...rest] = values;

    let bst = BST(first);

    let added = {};

    rest.forEach(val => {
        var before = bst;
        let isAdded = bst.insert(val);
        if(isAdded){
            added[isAdded.value] = isAdded;
            bst = isAdded;
            let _find = find(bst, val);
            if(_find === null){
                pass = false;
            }

        }
    });
    let pass = true;

    let nodeValues = arguments[0];
    let randomIndex = Math.floor(Math.random()*(nodeValues.length-1));

    let pick = nodeValues[randomIndex];

    let found = find(bst, pick);
    if(!found){
        let g;
    }

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
        JSC.array(Math.ceil(Math.random()*20), JSC.integer(1000))
    ],
    function (values) {
        return "values";
    }
);