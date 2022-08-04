<script>
	import Form from './Form.svelte';
  import Tracks from './Tracks.svelte';
  import WeatherResults from './WeatherResults.svelte';
  import Weather from '../models/weather';
  import FeaturesService from '../utils/FeaturesService';

  const apiKey = process.env.API_KEY;
  const baseUrl = process.env.BASE_URL;
  const features = new FeaturesService();

  let tracks = [];
  let audioFeatures = [];
  let weather = new Weather();

  const populateWeatherObject = async (weatherData) => {
    weather.temp = String(Math.round(weatherData.main.temp));
    weather.city = weatherData.name;
    weather.country = weatherData.sys.country;
    weather.humidity = weatherData.main.humidity.toString();
    weather.description = weatherData.weather[0].description;
    weather.main = weatherData.weather[0].main;
    weather.wind = weatherData.wind.speed.toString();
    weather.icon = weatherData.weather[0].icon;
    weather.weatherId = weatherData.weather[0].id.toString();
  }

  const handleSubmit = async (city, country) => {
    const resp = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`);
    const data = await resp.json();
    await populateWeatherObject(data);
    audioFeatures = features.convertWeatherToFeatures(weather);
    await getTracks(audioFeatures);
  }

  const getTracks = async (audioFeatures) => {
    const genresRand = audioFeatures.genreGroup.sort(() => 0.5 - Math.random());
    const genres = genresRand.slice(0, 5).join();
    const response = await fetch(`${baseUrl}getRecommendations?seed_genres=${genres}&limit=12&min_popularity=10&target_valence=${audioFeatures.maxValence}&target_energy=${audioFeatures.maxEnergy}&max_tempo=${audioFeatures.maxTempo}&mode=${audioFeatures.mode}`);
    const data = await response.json(); 
    tracks = data.tracks;
  }
</script>

<div id="main-content">
  <Form handleSubmit={handleSubmit}/>
  <WeatherResults temp={weather.temp} humidity={weather.humidity} icon={weather.icon}/>
  <Tracks tracks={tracks}/>
</div>

<style>
  #main-content {
    background: #eee;
    margin: 2px;
  }
</style>