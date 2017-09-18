"use strict";
/**
 * Created by Game Station on 3.9.2017 г..
 */
var JSC = require("jscheck");
var BST_1 = require("../BST");
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
 * deleting one node after the root
 */
function find(root, value) {
    return (function traverse(_root, _find) {
        if (_root === null) {
            return null;
        }
        if (_root.value === _find) {
            return _root;
        }
        if (_root.value < _find) {
            // go right
            return traverse(_root.right, _find);
        }
        else if (_root.value > _find) {
            // go left
            return traverse(_root.left, _find);
        }
    }(root, value));
}
function deleteOne(values) {
    var first = values[0], rest = values.slice(1);
    var bst = BST_1.BST(first);
    var added = {};
    rest.forEach(function (val) {
        var before = bst;
        var isAdded = bst.insert(val);
        if (isAdded) {
            added[isAdded.value] = isAdded;
            bst = isAdded;
            var _find = find(bst, val);
            if (_find === null) {
                pass = false;
            }
        }
    });
    var pass = true;
    var nodeValues = arguments[0];
    var randomIndex = Math.floor(Math.random() * (nodeValues.length - 1));
    var pick = nodeValues[randomIndex];
    var found = find(bst, pick);
    if (!found) {
        var g = void 0;
    }
    bst.remove(pick);
    return pass;
}
JSC.test("BST delete method: (1)", function (verdict, values) {
    var ver = deleteOne(values);
    return verdict(ver);
}, [
    JSC.array(Math.ceil(Math.random() * 20), JSC.integer(1000))
], function (values) {
    return "values";
});
//# sourceMappingURL=delete.spec.BAK.js.map