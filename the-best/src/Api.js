import axios from 'axios';
const api_key = 'd18a4f16ec6506238fafbda0ee9d740d'
const Api = axios.create({
    baseURL: (`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=pt-br&query=`)
});

export default Api;