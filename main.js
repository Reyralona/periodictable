
function addUnderscores(string) {
    return string.replace(/ /g, "_")
}

function capitalize(string) {
    if (string !== null) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

function handleMissing(string) {
    if (String(string) === "null" || String(string) === "undefined" || String(string).search("unknown") !== -1) {
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
    <div class="symbol" translate="no">${symbol}</div>
    <div>${name}</div>
    </div>
    `

    target.insertAdjacentHTML("beforeend", eleDiv)
}

function removeCard() {
    if (cardIsShowing()) {
        let card = periodicTable.querySelector(".card")
        card.classList.remove("grow")
        card.classList.add("shrink")
        setTimeout(() => {
            periodicTable.removeChild(card)
        }, 1000)
    }

}

function getElementInfo(elementObj) {
    // if theres already a card
    removeCard()

    let elementInfo = findElementByName(data.elements, 'name', elementObj.id)[0]
    let cardDiv = `
    <div class="card ${addUnderscores(handleMissing(elementInfo.category))} grow flex-col">
        <img class="x-icon" type="button" onclick="removeCard()" src="x-icon.jpg"></nav>
        <div class="flex-col">
            <table>
                <tr>
                    <th>Name</th>
                    <td>${elementInfo.name}</td>
                </tr>
                <tr>
                    <th>Atomic Number</th>
                    <td>${elementInfo.number}</td>
                </tr>
                <tr>
                    <th>Discovered by</th>
                    <td>${capitalize(handleMissing(elementInfo.discovered_by))}</td>
                </tr>
                <tr>
                    <th>Named by</th>
                    <td> ${capitalize(handleMissing(elementInfo.named_by))}</td>
                </tr>
                <tr>
                    <th>Appearance</th>
                    <td>${capitalize(elementInfo.appearance)}</td>
                </tr>
                <tr>
                    <th>Atomic Mass</th>
                    <td>${handleMissing(elementInfo.atomic_mass)}u</td>
                </tr>
                <tr>
                    <th>Boiling point</th>
                    <td>${handleMissing(elementInfo.boil)}K</td>
                </tr>
                <tr>
                    <th>Category</th>
                    <td>${capitalize(elementInfo.category)}</td>
                </tr>
                <tr>
                    <th>Density</th>
                    <td>${handleMissing(elementInfo.density)} kg/m³</td>
                </tr>
                <tr>
                    <th>Melting point</th>
                    <td>${handleMissing(elementInfo.melt)}K</td>
                </tr>
            </table>
            <table>
                <th style="text-align: center">Summary</th>
                <tr>
                    <td>${elementInfo.summary}</td>
                </tr>     
            </table>
        </div>
    </div>
    `

    periodicTable.classList.add("unclickable")
    periodicTable.insertAdjacentHTML("beforeend", cardDiv)

    setTimeout(() => {
        periodicTable.classList.remove("unclickable")
    }, 500)
}

function cardIsShowing(){
    return document.querySelector('.card') !== null
}

function clickedOn(el, e){
    return document.querySelector(`${el}`).contains(e.target)
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
    if (!clickedOn('.table', e)) {
        removeCard()
    }
});

