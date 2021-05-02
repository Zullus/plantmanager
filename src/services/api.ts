import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://192.168.0.63:3333' //usar o IP da máquina para os teste (Win)
    baseURL: 'http://192.168.0.65:3333' //usar o IP da máquina para os teste (Linux)
});

export default api;
