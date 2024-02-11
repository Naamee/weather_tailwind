import axios from 'axios'
import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weather', {
    state: () => ({
        weather: {},
        codes: {
            1000: ['daySunny', 'nightClear'],
            1003: ['dayPartlyCloudy', 'nightPartlyCloudy'],
            1006: ['dayCloudy', 'nightCloudy'],
            1009: ['dayOvercast', 'nightOvercast'],
            1030: ['dayMist', 'nightMist'],
            1063: ['dayPatchyRainPossible', 'nightPatchyRainPossible'],
            1066: ['dayPatchySnowPossible', 'nightPatchySnowPossible'],
            1069: ['dayPatchySleetPossible', 'nightPatchySleetPossible'],
            1072: ['dayPatchyFreezingDrizzlePossible', 'nightPatchyFreezingDrizzlePossible'],
            1087: ['dayThunderyOutbreaksPossible', 'nightThunderyOutbreaksPossible'],
            1114: ['dayBlowingSnow', 'nightBlowingSnow'],
            1117: ['dayBlizzard', 'nightBlizzard'],
            1135: ['dayFog', 'nightFog'],
            1147: ['dayFreezingFog', 'nightFreezingFog'],
            1150: ['dayPatchyLightDrizzle', 'nightPatchyLightDrizzle'],
            1153: ['dayLightDrizzle', 'nightLightDrizzle'],
            1168: ['dayFreezingDrizzle', 'nightFreezingDrizzle'],
            1171: ['dayHeavyFreezingDrizzle', 'nightHeavyFreezingDrizzle'],
            1180: ['dayPatchyLightRain', 'nightPatchyLightRain'],
            1183: ['dayLightRain', 'nightLightRain'],
            1186: ['dayModerateRainAtTimes', 'nightModerateRainAtTimes'],
            1189: ['dayModerateRain', 'nightModerateRain'],
            1192: ['dayHeavyRainAtTimes', 'nightHeavyRainAtTimes'],
            1195: ['dayHeavyRain', 'nightHeavyRain'],
            1198: ['dayLightFreezingRain', 'nightLightFreezingRain'],
            1201: ['dayModerateOrHeavyFreezingRain', 'nightModerateOrHeavyFreezingRain'],
            1204: ['dayLightSleet', 'nightLightSleet'],
            1207: ['dayModerateOrHeavySleet', 'nightModerateOrHeavySleet'],
            1210: ['dayPatchyLightSnow', 'nightPatchyLightSnow'],
            1213: ['dayLightSnow', 'nightLightSnow'],
            1216: ['dayPatchyModerateSnow', 'nightPatchyModerateSnow'],
            1219: ['dayModerateSnow', 'nightModerateSnow'],
            1222: ['dayPatchyHeavySnow', 'nightPatchyHeavySnow'],
            1225: ['dayHeavySnow', 'nightHeavySnow'],
            1237: ['dayIcePellets', 'nightIcePellets'],
            1240: ['dayLightRainShowers', 'nightLightRainShowers'],
            1243: ['dayModerateOrHeavyRainShowers', 'nightModerateOrHeavyRainShowers'],
            1246: ['dayTorrentialRainShowers', 'nightTorrentialRainShowers'],
            1249: ['dayLightSleetShowers', 'nightLightSleetShowers'],
            1252: ['dayModerateOrHeavySleetShowers', 'nightModerateOrHeavySleetShowers'],
            1255: ['dayLightSnowShowers', 'nightLightSnowShowers'],
            1258: ['dayModerateOrHeavySnowShowers', 'nightModerateOrHeavySnowShowers'],
            1261: ['dayLightShowersOfIcePellets', 'nightLightShowersOfIcePellets'],
            1264: ['dayModerateOrHeavyShowersOfIcePellets', 'nightModerateOrHeavyShowersOfIcePellets'],
            1273: ['dayPatchyLightRainWithThunder', 'nightPatchyLightRainWithThunder'],
            1276: ['dayModerateOrHeavyRainWithThunder', 'nightModerateOrHeavyRainWithThunder'],
            1279: ['dayPatchyLightSnowWithThunder', 'nightPatchyLightSnowWithThunder'],
            1282: ['dayModerateOrHeavySnowWithThunder', 'nightModerateOrHeavySnowWithThunder']
        }
    }),
    getters:{
        getWeather(state) {
            return state.weather
        },
        getCurrentWeatherCode(state) {
            return state.weather.current.condition.code
        },
        getMatchingWeatherCode: (state) => (code) => {
            return state.codes[code];
        }
    },
    actions: {
        async fetchWeather(location) {
            try {
                const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=ada7181c6d27402281863954240502&q=${location}`)
                this.weather = response.data
            } catch (error) {
                console.error(error)
            }
        },
    }
})