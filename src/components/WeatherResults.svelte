<script>
  export let icon;
  export let temp;
  export let humidity;
</script>

<style>
  #weather-results ul {
    list-style: none;
    margin: 0 0 0 3px;
    padding: 0;
}
</style>

<div id="weather-results">
  {#if icon}
  <ul>
    <li>{temp}C</li>
    <li>{humidity}%</li>
    <li><img src="http://openweathermap.org/img/w/{icon}.png" alt=""/></li>
  </ul>
  {/if}
</div>