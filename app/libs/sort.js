var Node_sort = require('node-sort');
var _sort = new Node_sort();

var sort = function(array){
    if(!array instanceof Array){
        return false;
    }
    return _sort.mergeSort(array);
}

module.exports = sort;