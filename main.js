
function addUnderscores(string) {
    return string.replace(/ /g, "_")
}

function capitalize(string) {
    if (string !== null) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

function handleMissing(string){
    if (string === null || string === "undefined" || string.search("unknown") !== -1){
        return "unknown"
    }
    return string
}

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
    let category = addUnderscores(ele.category)


    //if category is unknown
    if (category.search("unknown") !== -1) {
        category = "unknown"
    }

    //if atomic mass is too big
    if (String(atomicmass).length >= 7) {
        atomicmass = Number(atomicmass).toFixed(2)
    }

    let eleDiv = `
    <div class="${category} element flex-col flex-center">
    <div class="flex-row element_info">
        <div>${atomicnumber}</div>
        <div>${atomicmass}u</div>
    </div>
    <div class="symbol">${symbol}</div>
    <div>${name}</div>
    </div>
    `

    target.insertAdjacentHTML("beforeend", eleDiv)
}

function removeCard() {
    let card = periodicTable.querySelector(".card")
    card.classList.remove("grow")
    card.classList.add("shrink")
    setTimeout(() => {
        periodicTable.removeChild(card)
    }, 1000)
}

function getElementInfo(elementObj) {
    let elementInfo = findElementByName(data.elements, 'name', elementObj.id)[0]


    let cardDiv = `
    <div class="card ${addUnderscores(handleMissing(elementInfo.category))} grow flex-col">
        <img class="x-icon" src="x-icon.jpg"></nav>
        <div class="flex-col">
            <div>
                <div>Name: ${elementInfo.name}</div>
                <div>Atomic Number: ${elementInfo.number}</div>
                <div>Discovered by: ${handleMissing(elementInfo.discovered_by)}</div>
                <div>Named by: ${handleMissing(elementInfo.named_by)}</div>
                <div>Appearance: ${capitalize(elementInfo.appearance)}</div>
                <div>Atomic Mass: ${elementInfo.atomic_mass}u</div>
                <div>Boiling point: ${elementInfo.boil}K</div>   
                <div>Category: ${capitalize(elementInfo.category)}</div>
                <div>Density: ${elementInfo.density} kg/m³</div>
                <div>Melting point: ${elementInfo.melt}K</div>
            </div>
            <div>
                <div>Summary: ${elementInfo.summary}</div>
            </div>
        </div>
    </div>
    `

    // if theres already a card
    if (periodicTable.querySelector(".card") !== null) {
        removeCard()
    }

    periodicTable.classList.add("unclickable")
    periodicTable.insertAdjacentHTML("beforeend", cardDiv)
    setTimeout(() => {
        periodicTable.classList.remove("unclickable")
    }, 1000)
    document.querySelector(".x-icon").onclick = () => {
        removeCard()
    }

}

periodicTable = document.querySelector(".table")
body = document.getElementsByTagName('body')[0]

// gets table info

var request = new XMLHttpRequest()
request.open("GET", "data.json", false)
request.send(null)
var data = JSON.parse(request.responseText)


// scan for elements

const elements = document.getElementsByTagName("element")

for (let i = 0; i < elements.length; i++) {
    let name = elements[i].id
    let target = elements[i]
    createElementDiv(name, target)
    elements[i].onclick = () => { getElementInfo(elements[i]) }
}


// remove card if clicked outside table 

window.addEventListener('click', function (e) {
    if (document.querySelector('.table').contains(e.target)) {
        // Clicked in box
    } else {
        removeCard()
    }
});



