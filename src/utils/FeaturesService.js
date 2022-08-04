import * as genreGroups from './genreGroups';
import Features from '../models/features';

export default class FeaturesService {

  #wind;
  #temp;

  constructor() {
    this.#wind = 0;
    this.#temp = 0;
  }
  
  convertWeatherToFeatures(weather) {
    this.#wind = Number(weather.wind);
    this.#temp = Number(weather.temp);
    let audioFeatures = new Features('','','','',[]);

    if (weather.weatherId === '800') {
      audioFeatures.genreGroup.push(...genreGroups.clearGenres);
    } else {
      const genreGroup = genreGroups.groupMapper[weather.weatherId.charAt(0)];
      audioFeatures.genreGroup.push(...genreGroups[genreGroup]);
    }
    this.#parseDescription(weather.description, audioFeatures);
    this.#energyFromWind(audioFeatures);
    this.#propsFromTemp(audioFeatures);
    return audioFeatures;
  }

  #parseDescription(description, audioFeatures) {
    switch (description) {
      case ('Clear'):
        audioFeatures.maxValence = 0.6;
        audioFeatures.maxEnergy = 0.5;
        audioFeatures.mode = 1;
        break;
      case ('Clouds'):
        audioFeatures.maxValence = 0.45;
        audioFeatures.maxEnergy = 0.45;
        audioFeatures.mode = 0;
        break;
      case ('Snow'):
        audioFeatures.maxValence = 0.4;
        audioFeatures.maxEnergy = 0.6;
        audioFeatures.mode = 1;
        break;
      case ('Rain'):
        audioFeatures.maxValence = 0.35;
        audioFeatures.maxEnergy = 0.35;
        audioFeatures.mode = 0;
        break;
      case ('Drizzle'):
        audioFeatures.maxValence = 0.4;
        audioFeatures.maxEnergy = 0.35;
        audioFeatures.mode = 0;
        break;
      case ('Thunderstorm'):
        audioFeatures.maxValence = 0.7;
        audioFeatures.maxEnergy = 0.7;
        audioFeatures.mode = 1;
        break;
      default:
        audioFeatures.maxValence = 0.5;
        audioFeatures.maxEnergy = 0.5;
        audioFeatures.mode = 1;
    }
  }

  #energyFromWind(audioFeatures) {
    switch (true) {
      case (this.#wind < 5):
        audioFeatures.maxEnergy += 0.025;
        break;
      case (this.#wind < 10):
        audioFeatures.maxEnergy += 0.05;
        break;
      case (this.#wind < 15):
        audioFeatures.maxEnergy += 0.075;
        break;
      case (this.#wind < 20):
        audioFeatures.maxEnergy += 0.075;
        break;
      default:
        audioFeatures.maxEnergy += 0;
        break;
    }
  }

  #propsFromTemp(audioFeatures) {
    switch (true) {
      case (this.#temp <= 5):
        audioFeatures.maxTempo = 80;
        audioFeatures.maxValence -= 0.05;
        break;
      case (this.#temp <= 10):
        audioFeatures.maxTempo = 90;
        audioFeatures.maxValence -= 0.025;
        break;
      case (this.#temp <= 15):
        audioFeatures.maxTempo = 100;
        break;
      case (this.#temp <= 20):
        audioFeatures.maxTempo = 110;
        audioFeatures.maxValence += 0.25;
        break;
      case (this.#temp <= 25):
        audioFeatures.maxTempo = 120;
        audioFeatures.maxValence += 0.5;
        break;
      case (this.#temp <= 30):
        audioFeatures.maxTempo = 130;
        audioFeatures.maxValence += 0.1;
        break;
      case (this.#temp > 30):
        audioFeatures.maxTempo = 140;
        audioFeatures.maxValence += 0.2;
        break;
      default:
        audioFeatures.maxValence += 0;
        break;
    }
  }
}
