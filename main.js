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

function createElementDiv(element) {
    let elObj = findElementByName(data.elements, 'name', element)
    let ele = elObj[0]
    let atomicnumber = ele.number
    let atomicmass = ele.atomic_mass
    let symbol = ele.symbol
    let name = ele.name
    let category = ele.category.replace(/ /g, "_")

    let eleDiv = `
    <div id=${name} class="${category} element flex-col flex-center">
    <div class="flex-row element_info">
        <div class="atomicnumber">${atomicnumber}</div>
        <div class="atomicmass">${atomicmass}</div>
    </div>
    <div class="symbol">${symbol}</div>
    <div class="name">${name}</div>
    </div>
    `
    console.log(eleDiv)
    periodicTable.insertAdjacentHTML("beforeend", eleDiv)
}

createElementDiv("Nitrogen")


