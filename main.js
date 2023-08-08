// gets table info

var request = new XMLHttpRequest()
request.open("GET", "data.json", false)
request.send(null)
var data = JSON.parse(request.responseText)

function findElementByName(array, key, value) {
    return array.filter(function (object) {
        return object[key] === value;
    });
};

let element = findElementByName(data.elements, 'name', 'Hydrogen')
console.log(element[0])