"use strict";
var JSC = require("jscheck");
var BST_1 = require("../BST");
var calculateHeights_1 = require('../calculateHeights');
var inOrder = require("../inOrder");
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
function insertOne(rootValue, leafValue) {
    var bst = BST_1.BST(rootValue);
    bst.insert(leafValue);
    if (rootValue < leafValue) {
        return bst.right.value === leafValue;
    }
    else if (rootValue > leafValue) {
        return bst.left.value === leafValue;
    }
    return bst.left === null && bst.right === null;
}
JSC.test("BST insert method: (1)", function (verdict, rootValue, leafValue) {
    return verdict(insertOne(rootValue, leafValue));
}, [
    JSC.integer(1000),
    JSC.integer(1000),
], function (rootValue, leafValue) {
    if (rootValue < leafValue) {
        return "Right";
    }
    else if (rootValue > leafValue) {
        return "Left";
    }
    else {
        return "Equal";
    }
});
/**
 * Test 2
 * ------
 *
 * inserting two nodes after the root LL-rotation
 */
function insertTwoLL(rootValue, firstValue, secondValue) {
    // let bst = BST(rootValue);
    // bst.insert(firstValue);
    // bst.insert(secondValue);
    // test LL rotation
    if (rootValue > firstValue && firstValue > secondValue) {
        var bst = BST_1.BST(rootValue);
        bst.insert(firstValue);
        bst.insert(secondValue);
        var nodes_1 = [];
        inOrder(bst, function (node) {
            return nodes_1.push(node.value);
        });
        var pass = (bst.value === firstValue);
        return pass;
    }
    return false;
}
JSC.test("BST insert method: (2) LL", function (verdict, rootValue, firstValue, secondValue) {
    var ver = insertTwoLL(rootValue, firstValue, secondValue);
    return verdict(ver);
}, [
    JSC.integer(100, 1000),
    JSC.integer(5, 10),
    JSC.integer(1, 2),
], function (rootValue, firstValue, secondValue) {
    if (rootValue > firstValue && firstValue > secondValue) {
        return "LeftLeft";
    }
    return "wrong values";
});
/**
 * Test 3
 * ------
 *
 * inserting two nodes after the root RR-rotation
 */
function insertTwoRR(rootValue, firstValue, secondValue) {
    // test RR rotation
    if (rootValue < firstValue && firstValue < secondValue) {
        var bst = BST_1.BST(rootValue);
        bst.insert(firstValue);
        bst.insert(secondValue);
        var nodes_2 = [];
        inOrder(bst, function (node) {
            return nodes_2.push(node.value);
        });
        var pass = (bst.value === firstValue);
        return pass;
    }
    return false;
}
JSC.test("BST insert method: (2) RR", function (verdict, rootValue, firstValue, secondValue) {
    var ver = insertTwoRR(rootValue, firstValue, secondValue);
    return verdict(ver);
}, [
    JSC.integer(1, 2),
    JSC.integer(5, 10),
    JSC.integer(100, 1000),
], function (rootValue, firstValue, secondValue) {
    if (rootValue < firstValue && firstValue < secondValue) {
        return "RightRight";
    }
    return "wrong values";
});
/**
 * Test 4
 * ------
 *
 * inserting two nodes after the root RL-rotation
 */
function insertTwoRL(rootValue, firstValue, secondValue) {
    // test RL rotation
    if (rootValue < firstValue && firstValue > secondValue) {
        var bst = BST_1.BST(rootValue);
        bst.insert(firstValue);
        bst.insert(secondValue);
        var nodes_3 = [];
        inOrder(bst, function (node) {
            return nodes_3.push(node.value);
        });
        var pass = (bst.value === secondValue);
        return pass;
    }
    return false;
}
JSC.test("BST insert method: (2) RL", function (verdict, rootValue, firstValue, secondValue) {
    var ver = insertTwoRL(rootValue, firstValue, secondValue);
    return verdict(ver);
}, [
    JSC.integer(1, 2),
    JSC.integer(100, 1000),
    JSC.integer(5, 10)
], function (rootValue, firstValue, secondValue) {
    if (rootValue < firstValue && firstValue > secondValue) {
        return "RightLeft";
    }
    return "wrong values";
});
/**
 * Test 5
 * ------
 *
 * inserting two nodes after the root LR-rotation
 */
function insertTwoLR(rootValue, firstValue, secondValue) {
    // test LR rotation
    if (rootValue > firstValue && firstValue < secondValue) {
        var bst = BST_1.BST(rootValue);
        bst.insert(firstValue);
        bst.insert(secondValue);
        var nodes_4 = [];
        inOrder(bst, function (node) {
            return nodes_4.push(node.value);
        });
        var pass = (bst.value === secondValue);
        return pass;
    }
    return false;
}
JSC.test("BST insert method: (2) LR", function (verdict, rootValue, firstValue, secondValue) {
    var ver = insertTwoLR(rootValue, firstValue, secondValue);
    return verdict(ver);
}, [
    JSC.integer(100, 1000),
    JSC.integer(1, 2),
    JSC.integer(5, 10)
], function (rootValue, firstValue, secondValue) {
    if (rootValue > firstValue && firstValue < secondValue) {
        return "LeftRight";
    }
    return "wrong values";
});
/**
 * Test 6
 * ------
 *
 * inserting a random number node after the root LR-rotation
 * then check if the tree is balanced
 */
function checkIsAVL(node) {
    if (node === null)
        return true;
    return !(node.balanceFactor === undefined ||
        node.heightLeft === undefined ||
        node.heightRight === undefined ||
        node.value === undefined ||
        node.left === undefined ||
        node.right === undefined ||
        node.inOrder === undefined ||
        node.delete === undefined ||
        node.insert === undefined);
}
//
function insertMany(_a) {
    var first = _a[0], values = _a.slice(1);
    var bst = BST_1.BST(first);
    values.forEach(function (val) { return bst.insert; });
    var pass = calculateHeights_1.calculateHeights(bst) === null;
    inOrder(bst, function (node) {
        if (!checkIsAVL(node)) {
            pass = false;
        }
    });
    return pass;
}
JSC.test("BST insert method: many", function (verdict, values) {
    var ver = insertMany(values);
    return verdict(ver);
}, [
    JSC.array(Math.ceil(Math.random() * 200), JSC.integer(1000))
], function (values) {
    return "values";
});
//# sourceMappingURL=insert.spec.js.map