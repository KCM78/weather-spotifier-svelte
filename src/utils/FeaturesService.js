import * as genreGroups from './genreGroups';
import Features from '../models/features';

export default class FeaturesService {

  convertWeatherToFeatures(weather) {
    const wind = Number(weather.wind);
    const temp = Number(weather.temp);
    let audioFeatures = new Features('','','','',[]);

    // this is horrible
    if (weather.weatherId.startsWith('2')) {
      audioFeatures.genreGroup.push(...genreGroups.thunderstormGenres);
    } else if (weather.weatherId.startsWith('3')) {
      audioFeatures.genreGroup.push(...genreGroups.drizzleGenres);
    } else if (weather.weatherId.startsWith('5')) {
      audioFeatures.genreGroup.push(...genreGroups.rainGenres);
    } else if (weather.weatherId.startsWith('6')) {
      audioFeatures.genreGroup.push(...genreGroups.snowGenres);
    } else if (weather.weatherId.startsWith('7')) {
      audioFeatures.genreGroup.push(...genreGroups.atmosphereGenres);
    } else if (weather.weatherId === '800') {
      audioFeatures.genreGroup.push(...genreGroups.clearGenres);
    } else if (weather.weatherId.startsWith('8')) {
      audioFeatures.genreGroup.push(...genreGroups.cloudGenres);
    }

    switch (weather.description) {
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

    switch (true) {
      case (wind < 5):
        audioFeatures.maxEnergy += 0.025;
        break;
      case (wind < 10):
        audioFeatures.maxEnergy += 0.05;
        break;
      case (wind < 15):
        audioFeatures.maxEnergy += 0.075;
        break;
      case (wind < 20):
        audioFeatures.maxEnergy += 0.075;
        break;
      default:
        audioFeatures.maxEnergy += 0;
        break;
    }

    switch (true) {
      case (temp <= 5):
        audioFeatures.maxTempo = 80;
        audioFeatures.maxValence -= 0.05;
        break;
      case (temp <= 10):
        audioFeatures.maxTempo = 90;
        audioFeatures.maxValence -= 0.025;
        break;
      case (temp <= 15):
        audioFeatures.maxTempo = 100;
        break;
      case (temp <= 20):
        audioFeatures.maxTempo = 110;
        audioFeatures.maxValence += 0.25;
        break;
      case (temp <= 25):
        audioFeatures.maxTempo = 120;
        audioFeatures.maxValence += 0.5;
        break;
      case (temp <= 30):
        audioFeatures.maxTempo = 130;
        audioFeatures.maxValence += 0.1;
        break;
      case (temp > 30):
        audioFeatures.maxTempo = 140;
        audioFeatures.maxValence += 0.2;
        break;
      default:
        audioFeatures.maxValence += 0;
        break;
    }
    return audioFeatures;
  }
}
