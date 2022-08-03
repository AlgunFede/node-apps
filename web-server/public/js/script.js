

const weatherForm = document.querySelector('form');
const inputText = document.querySelector('input');


// Select divs will be fill with data

const msg = document.getElementById('msg-1')
const secMsg = document.getElementById('msg-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = inputText.value;
    
    msg.textContent = 'Loading...';
    secMsg.textContent = '';

    

    fetch('http://localhost:3000/weather?address=' + inputValue).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                msg.textContent = data.error
            } else {
                const temperature = data.forecastData.temperature;
                const city = data.forecastData.city;
                const humidity = data.forecastData.humidity;
                const rain = data.forecastData.rain;
                msg.textContent = `The current temperature in ${city} is ${temperature} Celsius degrees.`;
                secMsg.textContent = `Humidity: ${humidity}%. Chance of rain ${rain}%`
            }
        })
    })
    
})