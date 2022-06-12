const nextButton = document.querySelector('#next')
const prevButton = document.querySelector('#previous')

function getPlanetData(url = 'https://swapi.py4e.com/api/planets/?page=1') {
    let XML = new XMLHttpRequest()

    XML.open('GET', url, true)
    XML.onload = function() {
        if(XML.status === 200) {
            let response = JSON.parse(this.response)
            nextButton.dataset.url = response.next
            prevButton.dataset.url = response.previous
            console.log(response)
            getTable(response.results)
        }
    }
    XML.send()
}

document.onload = getPlanetData()

nextButton.addEventListener('click', event => {
    let url = event.target.dataset.url
    console.log(url)
    getPlanetData(url)
})
prevButton.addEventListener('click', event => {
    let url = event.target.dataset.url
    console.log(url)
    getPlanetData(url)
})

function getTable(planets) {
    const rows = document.querySelectorAll('[data-row]');
             for (let i = 0; i < planets.length; i++) {
                rows[i].innerHTML = `<td>${planets[i].name}</td>
                <td>${planets[i].diameter} km</td>
                <td>${planets[i].climate}</td>
                <td>${planets[i].terrain}</td>
                <td>${'unknown' === planets[i].surface_water ? planets[i].surface_water : planets[i].surface_water + '%'} </td>
                <td>${'unknown' === planets[i].population ? planets[i].population : planets[i].population + ' people'} </td>
                <td>${planets[i].residents.length} resident(s)</td>
                <td><button>Vote</button></td>`
            }

}

























// const nextButton = document.querySelector('#next')
// const prevButton = document.querySelector('#previous')
// const tBody = document.querySelector('tbody')
// getData()
//
// function getData() {
//     fetch('https://swapi.py4e.com/api/planets')
//         .then(res => res.json())
//         .then(datas => {
//             for (let element of datas.results) {
//
//                 let tableRow = document.createElement('tr');
//                 let tableName = document.createElement('td');
//                 tableRow.appendChild(tableName);
//                 tBody.appendChild(tableRow)
//                 tableName.innerHTML = element['name']
//
//                 let tableDiameter = document.createElement('td');
//                 tableRow.appendChild(tableDiameter)
//                 tableDiameter.innerHTML = element['diameter']
//
//                 let tableClimate = document.createElement('td');
//                 tableRow.appendChild(tableClimate)
//                 tableClimate.innerHTML = element['climate']
//
//                 let tableTerrain = document.createElement('td');
//                 tableRow.appendChild(tableTerrain)
//                 tableTerrain.innerHTML = element['terrain']
//
//                 let tableSWP = document.createElement('td');
//                 tableRow.appendChild(tableSWP)
//                 tableSWP.innerHTML = element['surface_water']
//
//                 let tablePopulation = document.createElement('td');
//                 tableRow.appendChild(tablePopulation)
//                 tablePopulation.innerHTML = element['population']
//
//                 let tableResidents = document.createElement('td');
//                 tableRow.appendChild(tableResidents)
//                 tableResidents.innerHTML = element['residents'].length
//
//                 let tableVote = document.createElement('td');
//                 tableRow.appendChild(tableVote);
//                 tableVote.innerHTML = '<button>Vote</button>'
//             }
//         })

