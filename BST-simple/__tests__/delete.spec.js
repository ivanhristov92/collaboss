"use strict";
var JSC = require("jscheck");
var BST_1 = require("../BST");
var _ = require("ramda");
var inOrder_1 = require("../inOrder");
/**
 * configuration
 */
JSC.on_report(console.log);
JSC.on_lost(console.log);
function checkIsBST(node) {
    if (node === null)
        return true;
    var pass = true;
    if (node.left) {
        pass = node.left.value < node.value;
    }
    if (node.right) {
        pass = node.right.value > node.value;
    }
    return pass;
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
            if (_find === null) {
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
                    pass = false;
                }
            });
        }
    });
    inOrder_1.default(bst, function (node) {
        if (!checkIsBST(node)) {
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
    //
    // let randomIndex = Math.floor(Math.random()*(values.length-1));
    // let pick = values[randomIndex];
    var bst2 = bst.remove(first);
    var found = find(bst2, first);
    if (found) {
        pass = false;
    }
    return pass;
}
JSC.test("BST insert method: many", function (verdict, values) {
    var ver = insertMany(values);
    return verdict(ver);
}, [
    JSC.array(Math.ceil(Math.random() * 40), JSC.integer(-100000, 100000))
], function (values) {
    return "values";
});
//
// function deleteOne(values){
//     let [first, ...rest] = values;
//
//     let bst = BST(first);
//
//     let added = {};
//
//     rest.forEach(val => {
//         var before = bst;
//         let isAdded = bst.insert(val);
//         if(isAdded){
//             added[isAdded.value] = isAdded;
//             bst = isAdded;
//             let _find = find(bst, val);
//             if(_find === null){
//                 pass = false;
//             }
//
//         }
//     });
//     let pass = true;
//
//     let nodeValues = arguments[0];
//     let randomIndex = Math.floor(Math.random()*(nodeValues.length-1));
//
//     let pick = nodeValues[randomIndex];
//
//     let found = find(bst, pick);
//     if(!found){
//         let g;
//     }
//
//     bst.remove(pick);
//
//     return pass;
// }
//
// JSC.test(
//     "BST delete method: (1)",
//     function (verdict, values) {
//         let ver = deleteOne(values);
//         return verdict(ver);
//     },
//     [
//         JSC.array(Math.ceil(Math.random()*20), JSC.integer(1000))
//     ],
//     function (values) {
//         return "values";
//     }
// ); 
//# sourceMappingURL=delete.spec.js.map