const periodicTable = document.querySelector(".table")

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

function createElementDiv(element, target) {

    let elObj = findElementByName(data.elements, 'name', element)
    let ele = elObj[0]
    let atomicnumber = ele.number
    let atomicmass = ele.atomic_mass
    let symbol = ele.symbol
    let name = ele.name
    let category = ele.category.replace(/ /g, "_")


    //if category is unknown
    if(category.search("unknown") !== -1){
        category = "unknown"
    }

    //if atomic mass is too big
    if (String(atomicmass).length >= 7) {
        atomicmass = Number(atomicmass).toFixed(2)
    }

    let eleDiv = `
    <div class="${category} element flex-col flex-center">
    <div class="flex-row element_info">
        <div class="atomicnumber">${atomicnumber}</div>
        <div class="atomicmass">${atomicmass}u</div>
    </div>
    <div class="symbol">${symbol}</div>
    <div class="name">${name}</div>
    </div>
    ` 

    target.insertAdjacentHTML("beforeend", eleDiv)
}

// scan for elements

const elements = document.getElementsByTagName("element")

for(let i = 0; i < elements.length; i++){
    let name = elements[i].id
    let target = elements[i].parentElement
    createElementDiv(name, target)
    
}

