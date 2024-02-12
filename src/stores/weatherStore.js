
import axios from 'axios'
import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weather', {
    state: () => ({
        weather: {},
        forecast: {},
        temp: '',
        location: 'Male,Maldives', // default location
        notFound: false,
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
        },
        getMatchingTemperature: (state) => (type) => {
            if (type === '°F') {
                state.temp = state.weather.current.temp_f + '°F'
            }
            else {
                state.temp = state.weather.current.temp_c + '°C'
            }
            return state.temp  
        },
        getLocation: (state) => () => {
            state.location = state.weather.location.name + ',' + state.weather.location.country // get location from the API
            return state.location
        },
    },
    actions: {
        async fetchWeather(location='Maldives') {
            try {
                const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=ada7181c6d27402281863954240502&q=${location}`)
                this.weather = response.data
                this.notFound = false // reset notFound
                this.getLocation()  // update location
                await this.fetchForecast(location) // update forecast
            } catch (error) {
                this.notFound = true
                console.error(error)
            }
        },
        async fetchForecast(location='Maldives') {
            try {
                const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=ada7181c6d27402281863954240502&q=${location}&days=4`)
                this.forecast = response.data
            } catch (error) {
                console.error(error)
            }
        }
    }
})