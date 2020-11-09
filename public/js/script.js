console.log(`JS file loaded`);

fetch('http://localhost:3000/weather?address=zhubei').then((res) => {
    res.json().then((data) => {
        console.log(data.weather)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            console.log(data.weather.forecast)
            document.querySelector('#weather-display1').textContent = `${data.weather.forecast}`
            document.querySelector('#weather-display2').textContent = `${data.weather.forecastDetails}`
        })
    })


    console.log(location)
})