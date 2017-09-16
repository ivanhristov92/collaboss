/**
 * Created by qfintern on 8/30/17.
 */

var queueFactory = (function queueModule(){
    function Queue(){
        this._list = [];
    }

    Queue.prototype.enqueue = function(value){
        this._list.push(value);
    };
    Queue.prototype.dequeue = function(){
        return this._list.shift()
    };

    return function queueFactory(){
        return new Queue();
    }
}());



