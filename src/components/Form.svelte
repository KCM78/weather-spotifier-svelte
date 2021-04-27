<script>
  import WeatherResults  from './WeatherResults.svelte';
  import Tracks from './Tracks.svelte';
  import FeaturesService from '../utils/FeaturesService';
  import Weather from '../models/weather';

  let city = '';
  let country = '';
  let audioFeatures = [];
  let tracks = [];
  let weather = new Weather();

  const apiKey = process.env.API_KEY;
  const baseUrl = process.env.BASE_URL;
  const features = new FeaturesService();

  async function handleSubmit() {
    const resp = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`);
    const data = await resp.json();
    weather.temp = String(Math.round(data.main.temp));
    weather.city = data.name;
    weather.country = data.sys.country;
    weather.humidity = data.main.humidity.toString();
    weather.description = data.weather[0].description;
    weather.main = data.weather[0].main;
    weather.wind = data.wind.speed.toString();
    weather.icon = data.weather[0].icon;
    weather.weatherId = data.weather[0].id.toString();
    audioFeatures = features.convertWeatherToFeatures(weather);
    getTracks(audioFeatures);
  }

  async function getTracks(audioFeatures) {
    const genresRand = audioFeatures.genreGroup.sort(() => 0.5 - Math.random());
    const genres = genresRand.slice(0, 5).join();
    const response = await fetch(`${baseUrl}getRecommendations?seed_genres=${genres}&limit=12&min_popularity=10&target_valence=${audioFeatures.maxValence}&target_energy=${audioFeatures.maxEnergy}&max_tempo=${audioFeatures.maxTempo}&mode=${audioFeatures.mode}`);
    const data = await response.json(); 
    tracks = data.tracks;
  }
</script>

<style>
form input, button {
  font-size: 1.2rem;
  color: #545454;
  text-transform: uppercase;
}

input {
  border: 1px solid #ccc;
  margin: 2px;
  background: #f1f1f1;
  height: 30px;
  width: 308px;
  padding: 5px;
}

input:focus {
  outline: none;
  border: 1px solid #545454;
}

button {
  height: 42px;
  border: 1px solid #ccc;
  background: #ccc;
  cursor: pointer;
}

button:focus {
  outline: none;
}

button:hover {
  background: #545454;
  color: #fff;
}
</style>

<form on:submit|preventDefault="{handleSubmit}">
  <input bind:value={city} type="text" id="city" placeholder="City..." />
  <input bind:value={country} type="text" id="country" placeholder="Country..." />
  <button type="submit">Get Weather</button>
</form>
<WeatherResults temp={weather.temp} humidity={weather.humidity} icon={weather.icon}/>
<Tracks tracks={tracks}/>