import apiFactory from './api';
import config from './config/config.json';

const api = apiFactory({
    apiUrl: config.API_URL,
    onError: error => console.log('Connection error: ', error)
});

export default api;
