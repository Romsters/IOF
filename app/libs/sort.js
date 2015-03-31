var Node_sort = require('node-sort');
var _sort = new Node_sort();

var sort = function(array){
    if(!array instanceof Array){
        return false;
    }
    return _sort.mergeSort(array, comparator);
}

function comparator(s1, s2){
    return s1.localeCompare(s2);
}

module.exports = sort;