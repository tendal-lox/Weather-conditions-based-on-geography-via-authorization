'use strict'

const axios = require('axios')
const async = require('async')
const logger = require('pino')({
    mixin() {return {appName: 'axiosApiCall'}},
    transport: {target: 'pino-pretty'}
})

axios.interceptors.response.use(response => {
    return response
}, error => {
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout'))
        logger.error('Request timeout, Resending request')

    return Promise.reject(error)
})

async function axiosRequestHandler(url) {
    return async.retry({times: 6, interval: 2000}, async () => {
        const result = await axios({
            method: 'get',
            url: `${url}`,
            timeout: 900
        })
        return result.data
    })
}

exports.getAllMembersRequest = async () => {
        logger.info('request sent')

        const listOfMembers = await axiosRequestHandler('https://jsonplaceholder.typicode.com/users')

        logger.info('response received')
        
        return listOfMembers.data 
}

exports.getWeatherRequest = async () => {
        logger.info('location request sent')
        const usersLocation = await axiosRequestHandler('https://api.maptiler.com/geolocation/ip.json?key=AvJuF9UtksREsRzZk66k')
        logger.info('location response received')

        logger.info('weather request sent')
        const weatherStatus = await axiosRequestHandler(
            `https://api.open-meteo.com/v1/forecast?latitude=${usersLocation.latitude}&longitude=${usersLocation.longitude}&current_weather=true`
        )
        logger.info('weather response received')

        return weatherStatus
}