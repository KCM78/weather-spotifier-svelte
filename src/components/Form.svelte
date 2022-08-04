<script>
  export let handleSubmit;
  let city = '';
  let country = '';
</script>

<form on:submit|preventDefault="{handleSubmit(city, country)}">
  <input bind:value={city} type="text" id="city" placeholder="City..." />
  <input bind:value={country} type="text" id="country" placeholder="Country..." />
  <button type="submit">Get Weather</button>
</form>

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
