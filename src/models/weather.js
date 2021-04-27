export default class Weather {
  constructor(
    city,
    country,
    temp,
    humidity,
    wind,
    description,
    main,
    icon,
    weatherId
  ) {
    this.city = city;
    this.country = country;
    this.temp = temp;
    this.humidity = humidity;
    this.wind = wind;
    this.description = description;
    this.main = main;
    this.icon = icon;
    this.weatherId = weatherId;
  }
}