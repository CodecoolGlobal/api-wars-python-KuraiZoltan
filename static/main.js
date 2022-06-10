
fetch('https://swapi.py4e.com/api/planets')
    .then(res => res.json())
    .then(datas => console.log(datas.results))