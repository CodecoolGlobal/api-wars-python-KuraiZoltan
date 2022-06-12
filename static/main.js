const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#previous');
let tbody = document.querySelector('#residents-table');
const popup = document.querySelector('#popup');
const closeButton = document.querySelector('#close-button')

function getPlanetData(url = 'https://swapi.py4e.com/api/planets/?page=1') {
    let XML = new XMLHttpRequest()

    XML.open('GET', url, true)
    XML.onload = function() {
        if(XML.status === 200) {
            let response = JSON.parse(this.response)
            if ('results' in response) {
                nextButton.dataset.url = response.next
                prevButton.dataset.url = response.previous
                getTable(response.results)
            } else {
                getResidentsTable(response)
            }
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
                <td>${0 === planets[i].residents.length ? 'No known residents' : 
                    '<button type="submit" class="popup" data-residents="['+planets[i].residents+']" data-name="'+planets[i].name+'">' +
                    '' + planets[i].residents.length + ' resident(s)</button>'}</td>
                <td><button>Vote</button></td>`
            }
             const buttons = document.querySelectorAll('.popup')
            for (let button of buttons) {
                button.addEventListener('click', event => {
                    let residentsList = button.dataset.residents
                    tbody.innerHTML = ''
                    popup.style.display = 'block'
                    getResidentData(residentsList)
                })
            }
}

function getResidentData(residentsList) {
    residentsList = residentsList.slice(1, residentsList.length - 1).split(',')
    console.log(residentsList)
    for (let residentUrl of residentsList) {
        getPlanetData(residentUrl)
    }
    closeButton.addEventListener('click', () => {
        tbody.innerHTML = ''
        popup.style.display = 'none'
    })
}

function getResidentsTable(response) {
    let row = document.createElement('tr')
    row.innerHTML = `
                <td>${response.name}</td>
                <td>${response.height}</td>
                <td>${response.mass}</td>
                <td>${response.hair_color}</td>
                <td>${response.skin_color}</td>
                <td>${response.eye_color}</td>
                <td>${response.birth_year}</td>
                <td>${response.gender}</td>
    `
    tbody.appendChild(row)
    console.log(response)
}


