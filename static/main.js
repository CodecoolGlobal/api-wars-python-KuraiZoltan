
const nextButton = document.querySelector('#next')
const prevButton = document.querySelector('#previous')
let url = 'https://swapi.py4e.com/api/planets'
getPlanetData(url)
function getPlanetData(url) {
    let XML = new XMLHttpRequest()
    XML.open('GET', url, true)
    XML.onload = function() {
        if(XML.status === 200) {
             let planets = JSON.parse(this.response)
            getTable(planets.results)
        nextButton.addEventListener('click', () => {
            url = planets.next
            getPlanetData(url)
        })
        prevButton.addEventListener('click', () => {
            url = planets.previous
            getPlanetData(url)
        })


        }
    }
    XML.send()
}



function getTable(planets) {
    const rows = document.querySelectorAll('[data-row]');
             for (let i = 0; i < planets.length; i++) {
                rows[i].innerHTML = `<td>${planets[i].name}</td>
                <td>${planets[i].diameter} km</td>
                <td>${planets[i].climate}</td>
                <td>${planets[i].terrain}</td>
                <td>${'unknown' === planets[i].surface_water ? planets[i].surface_water : planets[i].surface_water} %</td>
                <td>${'unknown' === planets[i].population ? planets[i].population : planets[i].population} people</td>
                <td>${planets[i].residents.length} resident(s)</td>`
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

