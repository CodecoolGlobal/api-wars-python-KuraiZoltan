
const tBody = document.querySelector('tbody')
fetch('https://swapi.py4e.com/api/planets')
    .then(res => res.json())
    .then(datas => {
        for (let element of datas.results) {

            let tableRow = document.createElement('tr');
            let tableName= document.createElement('td');
            tableRow.appendChild(tableName);
            tBody.appendChild(tableRow)
            tableName.innerHTML = element['name']

            let tableDiameter= document.createElement('td');
            tableRow.appendChild(tableDiameter)
            tableDiameter.innerHTML = element['diameter']

            let tableClimate= document.createElement('td');
            tableRow.appendChild(tableClimate)
            tableClimate.innerHTML = element['climate']

            let tableTerrain= document.createElement('td');
            tableRow.appendChild(tableTerrain)
            tableTerrain.innerHTML = element['terrain']

            let tableSWP= document.createElement('td');
            tableRow.appendChild(tableSWP)
            tableSWP.innerHTML = element['surface_water']

            let tablePopulation= document.createElement('td');
            tableRow.appendChild(tablePopulation)
            tablePopulation.innerHTML = element['population']

            let tableResidents= document.createElement('td');
            tableRow.appendChild(tableResidents)
            tableResidents.innerHTML = element['residents'].length
        }
    })
