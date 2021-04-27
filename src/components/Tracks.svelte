<script>
  export let tracks = [];
</script>

<div id="spotify-results-container">
  {#each tracks as track}
  <div class="spotify-results">
    <ul>
      <li><img src="{track.album.images[2].url}" alt="{track.album.name}" /></li>
      <li>{track.artists[0].name}</li>
      <li><a href="{track.external_urls.spotify}">{track.name}</a> from {track.album.name}</li>
    </ul>
  </div>
  {/each}
</div>

<style>
.spotify-results ul {
  list-style: none;
  margin: 0 0 0 3px;
  padding: 0;
}

#spotify-results-container {
  margin: 40px 0 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.spotify-results {
  width: 200px;
  height: 200px;
  background: #ccc;
  margin: 5px;
  box-sizing: border-box;
  padding: 5px;
  font-size: 0.8rem;
  border: 3px solid #888;
}

.spotify-results a {
  color: darkred;
  text-decoration: none;
}

.spotify-results a:hover {
  color: #eee;
  text-decoration: underline;
}

.spotify-results:hover {
  background: #545454;
  color: #eee;
}
</style>