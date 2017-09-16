"use strict";
var JSC = require("jscheck");
var BST_1 = require("../BST");
var calculateHeights_1 = require('../calculateHeights');
var _ = require("ramda");
var inOrder_1 = require("../inOrder");
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
    bst = bst.insert(leafValue);
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
        bst = bst.insert(firstValue);
        if (typeof bst.insert !== 'function') {
            var g = void 0;
        }
        bst = bst.insert(secondValue);
        var nodes_1 = [];
        inOrder_1.default(bst, function (node) {
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
        bst = bst.insert(firstValue);
        bst = bst.insert(secondValue);
        var nodes_2 = [];
        inOrder_1.default(bst, function (node) {
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
        bst = bst.insert(firstValue);
        bst = bst.insert(secondValue);
        var nodes_3 = [];
        inOrder_1.default(bst, function (node) {
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
        bst = bst.insert(firstValue);
        bst = bst.insert(secondValue);
        var nodes_4 = [];
        inOrder_1.default(bst, function (node) {
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
        node.right === undefined);
}
function find(root, value) {
    return (function traverse(_root) {
        if (_root === null) {
            return null;
        }
        var a = traverse(_root.left);
        if (a) {
            return a;
        }
        if (_root.value === value) {
            return _root;
        }
        return traverse(_root.right);
    }(root));
}
function insertMany(values) {
    var unique = _.uniq(values).sort();
    var first = unique[0], rest = unique.slice(1);
    var bst = BST_1.BST(first);
    var pass = true;
    var added = [];
    var order = [];
    var ordered = [];
    rest.forEach(function (val, i) {
        var isAdded = bst.insert(val);
        if (isAdded) {
            bst = isAdded;
            var _find = find(bst, val);
            if (!_find) {
                pass = false;
            }
            else {
                added[val] = bst;
                order[val] = i;
                ordered[order.length] = bst;
            }
            Object.keys(added).forEach(function (val) {
                var k = Number(val);
                var found = find(bst, k);
                if (!found) {
                    var c = void 0;
                }
            });
        }
    });
    if (calculateHeights_1.calculateHeights(bst).balanced !== true) {
        pass = false;
    }
    ;
    inOrder_1.default(bst, function (node) {
        if (!checkIsAVL(node)) {
            pass = false;
        }
    });
    var nodes = [];
    inOrder_1.default(bst, function (node) {
        nodes.push(node.value);
    });
    nodes = nodes.sort();
    if (nodes.length !== unique.length) {
        pass = false;
    }
    return pass;
}
JSC.test("BST insert method: many", function (verdict, values) {
    var ver = insertMany(values);
    return verdict(ver);
}, [
    JSC.array(Math.ceil(Math.random() * 20), JSC.integer(1000))
], function (values) {
    return "values";
});
//# sourceMappingURL=insert.spec.js.map