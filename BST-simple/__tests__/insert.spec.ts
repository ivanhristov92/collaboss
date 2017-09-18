import {version} from "punycode";
const JSC = require("jscheck");
import{BST, iBST} from "../BST";
import { calculateHeights as isTreeBalanced } from '../calculateHeights';
const _ = require("ramda");

import inOrder from "../inOrder";

/**
 * configuration
 */
JSC.on_report(console.log);
JSC.on_lost(console.log);


/**
 * Test 1
 * ------
 *
 * inserting one node after the root
 */

function insertOne(rootValue: number, leafValue: number) {
    let bst:iBST = BST(rootValue);
    bst = bst.insert(leafValue);

    if(rootValue < leafValue){
        return bst.right.value === leafValue;
    } else if (rootValue > leafValue){
        return bst.left.value === leafValue;
    }
    return bst.left === null && bst.right === null;
}

/**
 * Test 1
 * ------
 *
 * inserting a random number node after the root LR-rotation
 * then check if the tree is balanced
 */

function checkIsBST(node){
    if(node === null) return true;

    let pass = true;
    if(node.left){
        pass = node.left.value < node.value
    }

    if(node.right){
        pass = node.right.value > node.value
    }

    return pass;

}



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


function insertMany(values){

    let unique = _.uniq(values).sort();
    let [first, ...rest] = unique;

    let bst = BST(first);

    let pass = true;

    let added = [];
    let order = [];
    let ordered = [];

    rest.forEach((val, i)=>{
        let isAdded = bst.insert(val);
        if(isAdded){

            bst = isAdded;
            let _find = find(bst, val);
            if(_find === null){
                pass = false;
            } else {
                added[val] = bst;
                order[val] = i;
                ordered[order.length] = bst;
            }

            Object.keys(added).forEach(val=>{
                let k = Number(val)
                let found = find(bst, k);
                if(!found){
                    pass = false
                }
            })
        }

    });


    // if(isTreeBalanced(bst).balanced !== true){
    //     pass = false;
    // };

    inOrder(bst, node=>{
        if(!checkIsBST(node)){
            pass = false;
        }
    });

    let nodes = [];
    inOrder(bst, node => {
       nodes.push(node.value);
    });
    nodes = nodes.sort();

    if(nodes.length !== unique.length){
        pass = false;
    }
    return pass;
}

JSC.test(
    "BST insert method: many",
    function (verdict, values) {
        let ver = insertMany(values);
        return verdict(ver);
    },
    [
        JSC.array(Math.ceil(Math.random()*40), JSC.integer(-100000, 100000))
    ],
    function (values) {
        return "values";
    }
)
