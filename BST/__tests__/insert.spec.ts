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
 * inserting one node after the root
 */

function insertOne(rootValue: number, leafValue: number) {
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
        return verdict(insertOne(rootValue, leafValue));
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

/**
 * Test 2
 * ------
 *
 * inserting two nodes after the root LL-rotation
 */
function insertTwoLL(rootValue: number, firstValue: number, secondValue: number){
    // let bst = BST(rootValue);
    // bst.insert(firstValue);
    // bst.insert(secondValue);

    // test LL rotation
    if(rootValue > firstValue && firstValue > secondValue){

        let bst = BST(rootValue);
        bst.insert(firstValue);
        bst.insert(secondValue);

        let nodes = [];
        inOrder(bst, node=>
            nodes.push(node.value)
        );

        let pass = (bst.value === firstValue);
        return pass;
    }

    return false;
}

JSC.test(
    "BST insert method: (2) LL",
    function (verdict, rootValue, firstValue, secondValue) {
        let ver = insertTwoLL(rootValue, firstValue, secondValue)
        return verdict(ver);
    },
    [
        JSC.integer(100, 1000),
        JSC.integer(5, 10),
        JSC.integer(1,2),
    ],
    function (rootValue, firstValue, secondValue) {
        if(rootValue > firstValue && firstValue > secondValue){
            return "LeftLeft";
        }
        return "wrong values"
    }
);

/**
 * Test 3
 * ------
 *
 * inserting two nodes after the root RR-rotation
 */
function insertTwoRR(rootValue: number, firstValue: number, secondValue: number){

    // test RR rotation
    if(rootValue < firstValue && firstValue < secondValue){

        let bst = BST(rootValue);
        bst.insert(firstValue);
        bst.insert(secondValue);

        let nodes = [];
        inOrder(bst, node=>
            nodes.push(node.value)
        );

        let pass = (bst.value === firstValue);
        return pass;
    }

    return false;
}

JSC.test(
    "BST insert method: (2) RR",
    function (verdict, rootValue, firstValue, secondValue) {
        let ver = insertTwoRR(rootValue, firstValue, secondValue)
        return verdict(ver);
    },
    [
        JSC.integer(1,2),
        JSC.integer(5, 10),
        JSC.integer(100, 1000),

    ],
    function (rootValue, firstValue, secondValue) {
        if(rootValue < firstValue && firstValue < secondValue){
            return "RightRight";
        }
        return "wrong values"
    }
);

/**
 * Test 4
 * ------
 *
 * inserting two nodes after the root RL-rotation
 */
function insertTwoRL(rootValue: number, firstValue: number, secondValue: number){

    // test RL rotation
    if(rootValue < firstValue && firstValue > secondValue){

        let bst = BST(rootValue);
        bst.insert(firstValue);
        bst.insert(secondValue);

        let nodes = [];
        inOrder(bst, node=>
            nodes.push(node.value)
        );

        let pass = (bst.value === secondValue);
        return pass;
    }

    return false;
}

JSC.test(
    "BST insert method: (2) RL",
    function (verdict, rootValue, firstValue, secondValue) {
        let ver = insertTwoRL(rootValue, firstValue, secondValue)
        return verdict(ver);
    },
    [
        JSC.integer(1,2),
        JSC.integer(100, 1000),
        JSC.integer(5, 10)
    ],
    function (rootValue, firstValue, secondValue) {
        if(rootValue < firstValue && firstValue > secondValue){
            return "RightLeft";
        }
        return "wrong values"
    }
);

/**
 * Test 5
 * ------
 *
 * inserting two nodes after the root LR-rotation
 */
function insertTwoLR(rootValue: number, firstValue: number, secondValue: number){

    // test LR rotation
    if(rootValue > firstValue && firstValue < secondValue){

        let bst = BST(rootValue);
        bst.insert(firstValue);
        bst.insert(secondValue);

        let nodes = [];
        inOrder(bst, node=>
            nodes.push(node.value)
        );

        let pass = (bst.value === secondValue);
        return pass;
    }

    return false;
}


JSC.test(
    "BST insert method: (2) LR",
    function (verdict, rootValue, firstValue, secondValue) {
        let ver = insertTwoLR(rootValue, firstValue, secondValue)
        return verdict(ver);
    },
    [
        JSC.integer(100, 1000),
        JSC.integer(1,2),
        JSC.integer(5, 10)
    ],
    function (rootValue, firstValue, secondValue) {
        if(rootValue > firstValue && firstValue < secondValue){
            return "LeftRight";
        }
        return "wrong values"
    }
);

/**
 * Test 6
 * ------
 *
 * inserting a random number node after the root LR-rotation
 * then check if the tree is balanced
 */

function checkIsAVL(node){
    if(node === null) return true;
    return !(node.balanceFactor === undefined ||
    node.heightLeft === undefined ||
    node.heightRight === undefined ||
    node.value === undefined ||
    node.left === undefined ||
    node.right === undefined ||
    node.inOrder === undefined ||
    node.insert === undefined)
}
//
function insertMany([first, ...values]){
    let bst = BST(first);
    values.forEach(val=>bst.insert);
    let pass = isTreeBalanced(bst) === null;

    inOrder(bst, node=>{
        if(!checkIsAVL(node)){pass = false;}
    });
    return pass;
}

JSC.test(
    "BST insert method: many",
    function (verdict, values) {
        let ver = insertMany(values);
        return verdict(ver);
    },
    [
        JSC.array(Math.ceil(Math.random()*200), JSC.integer(1000))
    ],
    function (values) {
        return "values";
    }
);