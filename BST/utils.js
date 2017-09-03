/**
 * Created by Game Station on 3.9.2017 г..
 */

exports.log = function log(){
    if(process.env.DEBUG){
        console.log(arguments[0], arguments[1] || "", arguments[2] || "")
    }
};