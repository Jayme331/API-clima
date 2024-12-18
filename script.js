document.getElementById('search-btn').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;
    if (!city) {
        alert('Please enter a city name.');
        return;
    }
  
    const apiKey = 'acbb054d3d1fa846574db573152356c6'; // Substitua pela sua chave de API
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    // Dicionário para traduzir descrições do clima
    const weatherTranslations = {
        "clear sky": "céu limpo",
        "few clouds": "poucas nuvens",
        "scattered clouds": "nuvens dispersas",
        "broken clouds": "nuvens quebradas",
        "shower rain": "chuva leve",
        "rain": "chuva",
        "thunderstorm": "tempestade",
        "snow": "neve",
        "mist": "névoa"
    };
  
    try {
        // Fetch weather data
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
  
        if (weatherData.cod !== 200) {
            alert('City not found. Please try again.');
            return;
        }
  
        // Display weather info
        const { name, main, weather, coord } = weatherData;
  
        // Traduza a descrição do clima
        const description = weather[0].description;
        const translatedDescription = weatherTranslations[description] || description;
  
        document.getElementById('city-name').textContent = name;
        document.getElementById('weather-info').textContent = 
            `Aproximadamente: ${main.temp}°C | ${translatedDescription}`;
  
        // Display map using Google Maps
        const { lon, lat } = coord;
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBkQbbO5Qz9mOCrYY427r7O-M8wwy9hmNE&callback=initMap`;
        script.async = true;
        document.body.appendChild(script);
  
        // Initialize Google Map
        window.initMap = () => {
            const mapOptions = {
                center: { lat, lng: lon },
                zoom: 12
            };
  
            const map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
            new google.maps.Marker({
                position: { lat, lng: lon },
                map: map,
                title: 'Selected Location'
            });
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data. Please try again.');
    }
  });
  
