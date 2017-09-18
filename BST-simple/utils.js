/**
 * Created by Game Station on 3.9.2017 г..
 */

exports.log = function log(){
    if(process.env.DEBUG){
        console.log(arguments[0], arguments[1] || "", arguments[2] || "")
    }
};

exports.newIm = function(){
    var newObj = {};
    Object.keys(arguments).forEach(k=>{
        Object.assign(newObj, arguments[k]);
    });

    return Object.freeze(newObj);
}

exports.newImWith = function(withObj){
    return function(){
        var newObj = withObj;
        Object.keys(arguments).forEach(function(k){
            (newObj = Object.assign(newObj, arguments[k]))
        });

        return Object.freeze(newObj);
    }
};